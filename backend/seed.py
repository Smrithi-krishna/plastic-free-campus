"""Fill the database with sample data for demos.  Run:  python seed.py

IDs follow the frontend's formats (frontend/src/utils/validators.js):
students PFC-STU-####, containers PFC-CUP-#### / PFC-SBX-#### / PFC-LBX-####.

DEMO ACCOUNTS (change these passwords before any real use):
  Staff portal    CAN-01 / 246810   (Central Campus Canteen)
                  CAN-02 / 246810   (Library Snack Kiosk)
                  ADMIN-01 / admin123 (admin, sees everything)
  Student portal  PFC-STU-1001, PFC-STU-1002, PFC-STU-1003 / student123
"""
from datetime import timedelta

from app import models
from app.auth import hash_password
from app.database import Base, SessionLocal, engine
from app.models import now
from app.settings import DEPOSITS

Base.metadata.create_all(bind=engine)
db = SessionLocal()

if db.query(models.User).count():
    print("Database already has data — skipping seed. Delete plastic_free_campus.db to start fresh.")
else:
    central = models.Outlet(name="Central Campus Canteen", location="Ground floor, Main Block")
    north = models.Outlet(name="North Block Cafeteria", location="North Block")
    library = models.Outlet(name="Library Snack Kiosk", location="Near the library entrance")
    db.add_all([central, north, library])
    db.flush()

    student_pw, staff_pw = hash_password("student123"), hash_password("246810")
    admin = models.User(name="Administrator", roll_no="ADMIN-01", role="admin",
                        password_hash=hash_password("admin123"))
    can1 = models.User(name="Central Canteen Counter", roll_no="CAN-01", role="outlet_staff",
                       outlet_id=central.id, password_hash=staff_pw)
    can2 = models.User(name="Library Kiosk Counter", roll_no="CAN-02", role="outlet_staff",
                       outlet_id=library.id, password_hash=staff_pw)
    anjali = models.User(name="Anjali K", roll_no="PFC-STU-1001", email="anjali@example.com",
                         wallet_balance=150, green_points=50, password_hash=student_pw)
    rahul = models.User(name="Rahul M", roll_no="PFC-STU-1002", email="rahul@example.com",
                        wallet_balance=60, green_points=50, password_hash=student_pw)
    fathima = models.User(name="Fathima S", roll_no="PFC-STU-1003",
                          wallet_balance=0, green_points=50, password_hash=student_pw)
    db.add_all([admin, can1, can2, anjali, rahul, fathima])
    db.flush()

    plan = [  # (prefix, type, count per outlet)
        ("CUP", "cup", 6), ("SBX", "small_box", 4), ("LBX", "large_box", 2),
    ]
    n = {"CUP": 0, "SBX": 0, "LBX": 0}
    containers = []
    for outlet in (central, north, library):
        for prefix, ctype, count in plan:
            for _ in range(count):
                n[prefix] += 1
                c = models.Container(code=f"PFC-{prefix}-{n[prefix]:04d}", type=ctype,
                                     deposit_amount=DEPOSITS[ctype], outlet_id=outlet.id)
                db.add(c)
                containers.append(c)
    db.flush()

    # A little history so dashboards aren't empty: Anjali has one cup out, Rahul one overdue box.
    def borrow(student, c, outlet, hours_ago):
        t = now() - timedelta(hours=hours_ago)
        student.wallet_balance -= c.deposit_amount
        c.status, c.current_user_id, c.issued_at, c.issued_outlet_id = "issued", student.id, t, outlet.id
        db.add(models.Transaction(user_id=student.id, container_id=c.id, outlet_id=outlet.id,
                                  kind="issue", amount=-c.deposit_amount, performed_by_id=can1.id,
                                  created_at=t))

    borrow(anjali, containers[0], central, hours_ago=3)        # PFC-CUP-0001
    rahul.wallet_balance += 50
    borrow(rahul, containers[6], central, hours_ago=60)        # PFC-SBX-0001, overdue
    db.commit()
    print("Seeded: 3 outlets, 36 containers, 3 students, 2 counter staff, 1 admin.")
    print("Staff portal:   CAN-01 / 246810   (admin: ADMIN-01 / admin123)")
    print("Student portal: PFC-STU-1001 / student123")
db.close()
