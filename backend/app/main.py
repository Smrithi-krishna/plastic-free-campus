"""Plastic-Free Campus — reusable container deposit system API.

Run:  uvicorn app.main:app --reload
Docs: http://127.0.0.1:8000/docs   (click "Authorize" to log in)
All routes live under /api, matching the frontend's VITE_API_URL default.
"""
import os
from datetime import timedelta

from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from . import models, schemas, settings
from .auth import (
    create_token,
    get_current_user,
    hash_password,
    require_roles,
    require_self_or_staff,
    verify_password,
)
from .database import Base, SessionLocal, engine, get_db
from .models import now

Base.metadata.create_all(bind=engine)


def bootstrap_admin():
    """Create the first admin from env vars if no admin exists yet."""
    roll, pwd = os.getenv("ADMIN_ROLL_NO"), os.getenv("ADMIN_PASSWORD")
    if not (roll and pwd):
        return
    with SessionLocal() as db:
        if db.scalar(select(models.User).where(models.User.role == "admin")):
            return
        db.add(models.User(name="Administrator", roll_no=roll, role="admin",
                           password_hash=hash_password(pwd)))
        db.commit()


bootstrap_admin()

app = FastAPI(title="Plastic-Free Campus API", version="0.3.0")

# Local React dev server + the team's GitHub Pages site
origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,https://smrithi-krishna.github.io",
).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api")

Admin = Depends(require_roles("admin"))
StaffOrAdmin = Depends(require_roles("outlet_staff", "admin"))
StudentOnly = Depends(require_roles("student"))
LoggedIn = Depends(get_current_user)


# ---------- helpers ----------
def user_by_roll(db: Session, roll_no: str) -> models.User:
    user = db.scalar(select(models.User).where(func.upper(models.User.roll_no) == roll_no.strip().upper()))
    if not user:
        raise HTTPException(404, f"No account with ID {roll_no}")
    return user


def container_by_code(db: Session, code: str) -> models.Container:
    c = db.scalar(select(models.Container).where(func.upper(models.Container.code) == code.strip().upper()))
    if not c:
        raise HTTPException(404, f"No container with code {code}")
    return c


def outlet_names(db: Session) -> dict[int, str]:
    return {o.id: o.name for o in db.scalars(select(models.Outlet))}


def resolve_outlet(actor: models.User, requested: int | None) -> int | None:
    """Staff always act at their own outlet; admins may name one."""
    if actor.role == "outlet_staff":
        if actor.outlet_id is None:
            raise HTTPException(400, "Your staff account isn't linked to an outlet. Ask the admin.")
        return actor.outlet_id
    return requested


def check_outlet(db: Session, outlet_id: int | None):
    if outlet_id is not None and not db.get(models.Outlet, outlet_id):
        raise HTTPException(404, f"No outlet with id {outlet_id}")


def user_out(db: Session, u: models.User) -> schemas.UserOut:
    out = schemas.UserOut.model_validate(u)
    if u.outlet_id:
        o = db.get(models.Outlet, u.outlet_id)
        out.outlet_name = o.name if o else None
    return out


def container_out(c: models.Container, names: dict[int, str]) -> schemas.ContainerOut:
    due = c.issued_at + timedelta(hours=settings.BORROW_HOURS) if c.issued_at else None
    # Build through model_validate so every datetime gets its UTC marker
    return schemas.ContainerOut.model_validate({
        **{k: getattr(c, k) for k in schemas.ContainerOut.model_fields if hasattr(c, k)},
        "issued_outlet_name": names.get(c.issued_outlet_id) if c.issued_outlet_id else None,
        "due_at": due,
        "is_overdue": bool(due and now() > due),
    })


def tx_out(db: Session, txs) -> list[schemas.TransactionOut]:
    names = outlet_names(db)
    result = []
    for t in txs:
        out = schemas.TransactionOut.model_validate(t)
        out.outlet_name = names.get(t.outlet_id) if t.outlet_id else None
        u = db.get(models.User, t.user_id)
        out.roll_no, out.student_name = (u.roll_no, u.name) if u else (None, None)
        if t.container_id:
            c = db.get(models.Container, t.container_id)
            out.container_code, out.container_type = (c.code, c.type) if c else (None, None)
        result.append(out)
    return result


def do_issue(db: Session, student: models.User, code: str, outlet_id: int | None,
             actor: models.User) -> models.Transaction:
    """Shared by staff issue and student self-borrow."""
    if student.role != "student":
        raise HTTPException(400, "Containers can only be issued to student accounts")
    if not student.is_active:
        raise HTTPException(403, "This student's account is disabled")
    c = container_by_code(db, code)
    if c.status != "available":
        raise HTTPException(409, f"Container {c.code} is not available (status: {c.status})")
    if student.wallet_balance < c.deposit_amount:
        raise HTTPException(
            402, f"Insufficient balance: need ₹{c.deposit_amount}, have ₹{student.wallet_balance}. Top up first."
        )
    student.wallet_balance -= c.deposit_amount
    c.status = "issued"
    c.current_user_id = student.id
    c.issued_at = now()
    c.issued_outlet_id = outlet_id
    tx = models.Transaction(
        user_id=student.id, container_id=c.id, outlet_id=outlet_id,
        kind="issue", amount=-c.deposit_amount, performed_by_id=actor.id,
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx


# ---------- health ----------
@app.get("/", tags=["health"])
@api.get("/health", tags=["health"])
def root():
    return {"status": "ok", "service": "plastic-free-campus"}


# ---------- auth ----------
@api.post("/auth/register", response_model=schemas.Token, status_code=201, tags=["auth"])
def register(body: schemas.Register, db: Session = Depends(get_db)):
    """Students sign themselves up (always a *student* account) and are logged in straight away."""
    roll = body.roll_no.strip().upper()
    if db.scalar(select(models.User).where(func.upper(models.User.roll_no) == roll)):
        raise HTTPException(409, "This student ID is already registered")
    if body.email and db.scalar(select(models.User).where(models.User.email == body.email)):
        raise HTTPException(409, "This email is already registered")
    user = models.User(
        name=body.name.strip(), roll_no=roll, email=body.email or None,
        role="student", password_hash=hash_password(body.password),
        green_points=settings.SIGNUP_BONUS_POINTS,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return schemas.Token(access_token=create_token(user), user=user_out(db, user))


def _login(db: Session, roll_no: str, password: str) -> schemas.Token:
    user = db.scalar(select(models.User).where(func.upper(models.User.roll_no) == roll_no.strip().upper()))
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(401, "Wrong ID or password")
    if not user.is_active:
        raise HTTPException(403, "This account has been disabled")
    return schemas.Token(access_token=create_token(user), user=user_out(db, user))


@api.post("/auth/login", response_model=schemas.Token, tags=["auth"])
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Form login (used by the Authorize button in /docs). Username = student/staff ID."""
    return _login(db, form.username, form.password)


@api.post("/auth/login-json", response_model=schemas.Token, tags=["auth"])
def login_json(body: schemas.LoginJSON, db: Session = Depends(get_db)):
    """Same as /auth/login but takes JSON — used by the React app."""
    return _login(db, body.roll_no, body.password)


@api.get("/auth/me", response_model=schemas.UserOut, tags=["auth"])
def me(user: models.User = LoggedIn, db: Session = Depends(get_db)):
    return user_out(db, user)


@api.post("/auth/change-password", tags=["auth"])
def change_password(body: schemas.ChangePassword, user: models.User = LoggedIn,
                    db: Session = Depends(get_db)):
    if not verify_password(body.old_password, user.password_hash):
        raise HTTPException(400, "Old password is incorrect")
    user.password_hash = hash_password(body.new_password)
    db.commit()
    return {"detail": "Password changed"}


# ---------- the logged-in student's own data ----------
@api.get("/me/wallet", response_model=schemas.WalletSummary, tags=["me"])
def my_wallet(user: models.User = LoggedIn, db: Session = Depends(get_db)):
    held = db.scalars(select(models.Container).where(models.Container.current_user_id == user.id)).all()
    return schemas.WalletSummary(
        balance=user.wallet_balance,
        held_deposits=sum(c.deposit_amount for c in held),
        active_count=len(held),
        green_points=user.green_points,
    )


@api.post("/me/topup", response_model=schemas.WalletSummary, tags=["me"])
def my_topup(body: schemas.TopUp, user: models.User = StudentOnly, db: Session = Depends(get_db)):
    """DEMO: student adds money with no payment gateway. Disable with DEMO_SELF_TOPUP=false."""
    if not settings.DEMO_SELF_TOPUP:
        raise HTTPException(403, "Self top-up is turned off. Please top up at a canteen counter.")
    user.wallet_balance += body.amount
    db.add(models.Transaction(user_id=user.id, kind="topup", amount=body.amount, performed_by_id=user.id))
    db.commit()
    return my_wallet(user, db)


@api.get("/me/containers", response_model=list[schemas.ContainerOut], tags=["me"])
def my_containers(user: models.User = LoggedIn, db: Session = Depends(get_db)):
    names = outlet_names(db)
    cs = db.scalars(select(models.Container).where(models.Container.current_user_id == user.id)
                    .order_by(models.Container.issued_at.desc())).all()
    return [container_out(c, names) for c in cs]


@api.get("/me/transactions", response_model=list[schemas.TransactionOut], tags=["me"])
def my_transactions(user: models.User = LoggedIn, db: Session = Depends(get_db)):
    txs = db.scalars(select(models.Transaction).where(models.Transaction.user_id == user.id)
                     .order_by(models.Transaction.id.desc())).all()
    return tx_out(db, txs)


@api.post("/me/borrow", response_model=schemas.TransactionOut, tags=["me"])
def my_borrow(body: schemas.BorrowRequest, user: models.User = StudentOnly, db: Session = Depends(get_db)):
    """Student scans a container at an outlet and borrows it; the deposit comes from their wallet."""
    check_outlet(db, body.outlet_id)
    tx = do_issue(db, user, body.container_code, body.outlet_id, actor=user)
    return tx_out(db, [tx])[0]


# ---------- users (staff/admin) ----------
@api.post("/users", response_model=schemas.UserOut, status_code=201, tags=["users"])
def create_user(body: schemas.UserCreate, db: Session = Depends(get_db), _=Admin):
    """Admin only: create any account, including staff and admins."""
    roll = body.roll_no.strip().upper()
    if db.scalar(select(models.User).where(func.upper(models.User.roll_no) == roll)):
        raise HTTPException(409, "This ID is already registered")
    if body.role == "outlet_staff":
        if body.outlet_id is None:
            raise HTTPException(400, "Outlet staff must be linked to an outlet_id")
        check_outlet(db, body.outlet_id)
    data = body.model_dump(exclude={"password"})
    data["roll_no"] = roll
    if body.role != "outlet_staff":
        data["outlet_id"] = None
    user = models.User(**data, password_hash=hash_password(body.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user_out(db, user)


@api.get("/users", response_model=list[schemas.UserOut], tags=["users"])
def list_users(role: str | None = None, db: Session = Depends(get_db), _=StaffOrAdmin):
    q = select(models.User).order_by(models.User.id)
    if role:
        q = q.where(models.User.role == role)
    return [user_out(db, u) for u in db.scalars(q)]


@api.get("/users/{roll_no}", response_model=schemas.UserOut, tags=["users"])
def get_user(roll_no: str, db: Session = Depends(get_db), me: models.User = LoggedIn):
    require_self_or_staff(roll_no, me)
    return user_out(db, user_by_roll(db, roll_no))


@api.patch("/users/{roll_no}", response_model=schemas.UserOut, tags=["users"])
def update_user(roll_no: str, body: schemas.UserUpdate, db: Session = Depends(get_db),
                me: models.User = Admin):
    """Admin only: change role, outlet, or disable an account."""
    user = user_by_roll(db, roll_no)
    changes = body.model_dump(exclude_unset=True)
    if user.id == me.id and (changes.get("role", "admin") != "admin" or changes.get("is_active") is False):
        raise HTTPException(400, "You can't demote or disable your own admin account")
    new_role = changes.get("role", user.role)
    new_outlet = changes.get("outlet_id", user.outlet_id)
    if new_role == "outlet_staff":
        if new_outlet is None:
            raise HTTPException(400, "Outlet staff must be linked to an outlet_id")
        check_outlet(db, new_outlet)
    else:
        changes["outlet_id"] = None
    for k, v in changes.items():
        setattr(user, k, v)
    db.commit()
    db.refresh(user)
    return user_out(db, user)


@api.post("/users/{roll_no}/topup", response_model=schemas.UserOut, tags=["users"])
def top_up(roll_no: str, body: schemas.TopUp, db: Session = Depends(get_db),
           me: models.User = StaffOrAdmin):
    """Staff/admin adds money after collecting cash/UPI at the counter."""
    user = user_by_roll(db, roll_no)
    user.wallet_balance += body.amount
    db.add(models.Transaction(user_id=user.id, kind="topup", amount=body.amount,
                              outlet_id=me.outlet_id, performed_by_id=me.id))
    db.commit()
    db.refresh(user)
    return user_out(db, user)


@api.get("/users/{roll_no}/containers", response_model=list[schemas.ContainerOut], tags=["users"])
def user_containers(roll_no: str, db: Session = Depends(get_db), me: models.User = LoggedIn):
    """Containers this user currently has (not yet returned)."""
    require_self_or_staff(roll_no, me)
    user = user_by_roll(db, roll_no)
    names = outlet_names(db)
    cs = db.scalars(select(models.Container).where(models.Container.current_user_id == user.id)).all()
    return [container_out(c, names) for c in cs]


@api.get("/users/{roll_no}/transactions", response_model=list[schemas.TransactionOut], tags=["users"])
def user_transactions(roll_no: str, db: Session = Depends(get_db), me: models.User = LoggedIn):
    require_self_or_staff(roll_no, me)
    user = user_by_roll(db, roll_no)
    txs = db.scalars(select(models.Transaction).where(models.Transaction.user_id == user.id)
                     .order_by(models.Transaction.id.desc())).all()
    return tx_out(db, txs)


# ---------- outlets ----------
@api.post("/outlets", response_model=schemas.OutletOut, status_code=201, tags=["outlets"])
def create_outlet(body: schemas.OutletCreate, db: Session = Depends(get_db), _=Admin):
    if db.scalar(select(models.Outlet).where(models.Outlet.name == body.name)):
        raise HTTPException(409, "Outlet name already exists")
    outlet = models.Outlet(**body.model_dump())
    db.add(outlet)
    db.commit()
    db.refresh(outlet)
    return outlet


@api.get("/outlets", response_model=list[schemas.OutletOut], tags=["outlets"])
def list_outlets(db: Session = Depends(get_db)):
    """Public: students can see where to borrow/return."""
    return db.scalars(select(models.Outlet).order_by(models.Outlet.id)).all()


# ---------- containers ----------
@api.get("/availability", response_model=list[schemas.Availability], tags=["containers"])
def availability(db: Session = Depends(get_db)):
    """Public: how many of each container type are free at each outlet."""
    names = outlet_names(db)
    rows = {}
    for c in db.scalars(select(models.Container).where(models.Container.status != "retired")):
        key = (c.outlet_id, c.type)
        r = rows.setdefault(key, {"available": 0, "total": 0, "deposit": c.deposit_amount})
        r["total"] += 1
        r["available"] += c.status == "available"
    return [
        schemas.Availability(
            outlet_id=oid, outlet_name=names.get(oid, "Unassigned"), type=t,
            deposit_amount=r["deposit"], available=r["available"], total=r["total"],
        )
        for (oid, t), r in sorted(rows.items(), key=lambda kv: (kv[0][0] or 0, kv[0][1]))
    ]


@api.post("/containers", response_model=schemas.ContainerOut, status_code=201, tags=["containers"])
def create_container(body: schemas.ContainerCreate, db: Session = Depends(get_db),
                     me: models.User = StaffOrAdmin):
    """Register a new container. Staff add to their own outlet; admins may pick one."""
    code = body.code.strip().upper()
    if db.scalar(select(models.Container).where(func.upper(models.Container.code) == code)):
        raise HTTPException(409, f"Container code {code} already exists")
    outlet_id = me.outlet_id if me.role == "outlet_staff" else body.outlet_id
    check_outlet(db, outlet_id)
    deposit = body.deposit_amount if body.deposit_amount is not None else settings.DEPOSITS[body.type]
    c = models.Container(code=code, type=body.type, deposit_amount=deposit, outlet_id=outlet_id)
    db.add(c)
    db.commit()
    db.refresh(c)
    return container_out(c, outlet_names(db))


@api.get("/containers", response_model=list[schemas.ContainerOut], tags=["containers"])
def list_containers(status: str | None = None, overdue: bool = False,
                    db: Session = Depends(get_db), _=StaffOrAdmin):
    q = select(models.Container).order_by(models.Container.code)
    if status:
        q = q.where(models.Container.status == status)
    names = outlet_names(db)
    out = [container_out(c, names) for c in db.scalars(q)]
    return [c for c in out if c.is_overdue] if overdue else out


@api.get("/containers/{code}", response_model=schemas.ContainerOut, tags=["containers"])
def get_container(code: str, db: Session = Depends(get_db), _=StaffOrAdmin):
    return container_out(container_by_code(db, code), outlet_names(db))


# ---------- the core flow: issue & return (staff at the counter) ----------
@api.post("/issue", response_model=schemas.TransactionOut, tags=["deposit flow"])
def issue_container(body: schemas.IssueRequest, db: Session = Depends(get_db),
                    me: models.User = StaffOrAdmin):
    """Staff scans student's QR + container QR. Deposit is taken from the wallet."""
    outlet_id = resolve_outlet(me, body.outlet_id)
    check_outlet(db, outlet_id)
    student = user_by_roll(db, body.roll_no)
    tx = do_issue(db, student, body.container_code, outlet_id, actor=me)
    return tx_out(db, [tx])[0]


@api.post("/return", response_model=schemas.TransactionOut, tags=["deposit flow"])
def return_container(body: schemas.ReturnRequest, db: Session = Depends(get_db),
                     me: models.User = StaffOrAdmin):
    """Staff checks a returned container. Deposit goes back; points if returned on time."""
    outlet_id = resolve_outlet(me, body.outlet_id)
    check_outlet(db, outlet_id)
    c = container_by_code(db, body.container_code)
    if c.status != "issued" or c.current_user_id is None:
        raise HTTPException(409, f"Container {c.code} is not currently borrowed")

    on_time = c.issued_at is None or now() <= c.issued_at + timedelta(hours=settings.BORROW_HOURS)
    points = settings.POINTS_ON_TIME.get(c.type, 0) if on_time else 0

    user = db.get(models.User, c.current_user_id)
    user.wallet_balance += c.deposit_amount
    user.green_points += points
    c.status = "available"
    c.current_user_id = None
    c.issued_at = None
    c.issued_outlet_id = None
    if outlet_id is not None:
        c.outlet_id = outlet_id  # it now lives where it was returned
    tx = models.Transaction(
        user_id=user.id, container_id=c.id, outlet_id=outlet_id,
        kind="return", amount=c.deposit_amount, points=points, performed_by_id=me.id,
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx_out(db, [tx])[0]


@api.get("/transactions", response_model=list[schemas.TransactionOut], tags=["deposit flow"])
def recent_transactions(limit: int = 100, db: Session = Depends(get_db), me: models.User = StaffOrAdmin):
    """Latest activity. Staff see their own outlet; admins see everything."""
    q = select(models.Transaction).order_by(models.Transaction.id.desc()).limit(min(limit, 500))
    if me.role == "outlet_staff":
        q = q.where(models.Transaction.outlet_id == me.outlet_id)
    return tx_out(db, db.scalars(q).all())


# ---------- dashboard ----------
@api.get("/stats", response_model=schemas.Stats, tags=["dashboard"])
def stats(db: Session = Depends(get_db)):
    """Public: good for a campus impact display."""
    def count(model, *where):
        return db.scalar(select(func.count()).select_from(model).where(*where)) or 0

    T = models.Transaction
    today_start = now().replace(hour=0, minute=0, second=0, microsecond=0)
    overdue_cutoff = now() - timedelta(hours=settings.BORROW_HOURS)
    issues = count(T, T.kind == "issue")
    returns = count(T, T.kind == "return")
    return schemas.Stats(
        total_users=count(models.User, models.User.role == "student"),
        total_containers=count(models.Container),
        containers_available=count(models.Container, models.Container.status == "available"),
        containers_in_use=count(models.Container, models.Container.status == "issued"),
        containers_overdue=count(models.Container, models.Container.status == "issued",
                                 models.Container.issued_at < overdue_cutoff),
        total_issues=issues,
        total_returns=returns,
        issues_today=count(T, T.kind == "issue", T.created_at >= today_start),
        returns_today=count(T, T.kind == "return", T.created_at >= today_start),
        return_rate_percent=round(returns / issues * 100, 1) if issues else 0.0,
        plastic_items_saved=issues,  # each borrow replaces one disposable item
    )


app.include_router(api)
