"""Request / response shapes (what the React frontend sends and receives)."""
from datetime import datetime, timezone
from typing import Annotated, Literal

from pydantic import AfterValidator, BaseModel, ConfigDict, Field

# Databases hand back naive datetimes that are really UTC. Mark them as UTC so the
# browser converts them to local time (IST) instead of showing UTC as if it were local.
UTCDateTime = Annotated[
    datetime, AfterValidator(lambda d: d.replace(tzinfo=timezone.utc) if d.tzinfo is None else d)
]

ContainerType = Literal["cup", "small_box", "large_box"]
Role = Literal["student", "outlet_staff", "admin"]


class ORM(BaseModel):
    model_config = ConfigDict(from_attributes=True)


# ---- Auth ----
class Register(BaseModel):
    """Student self-sign-up."""
    name: str = Field(min_length=1, max_length=100)
    roll_no: str = Field(min_length=1, max_length=30)
    email: str | None = None
    password: str = Field(min_length=6, max_length=128)


class LoginJSON(BaseModel):
    roll_no: str
    password: str


class ChangePassword(BaseModel):
    old_password: str
    new_password: str = Field(min_length=6, max_length=128)


# ---- Users ----
class UserCreate(BaseModel):
    """Admin creates any account (students, staff, other admins)."""
    name: str = Field(min_length=1, max_length=100)
    roll_no: str = Field(min_length=1, max_length=30)
    email: str | None = None
    password: str = Field(min_length=6, max_length=128)
    role: Role = "student"
    outlet_id: int | None = None


class UserUpdate(BaseModel):
    role: Role | None = None
    outlet_id: int | None = None
    is_active: bool | None = None


class UserOut(ORM):
    id: int
    name: str
    roll_no: str
    email: str | None
    role: str
    outlet_id: int | None
    outlet_name: str | None = None
    is_active: bool
    wallet_balance: int
    green_points: int


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class TopUp(BaseModel):
    amount: int = Field(gt=0, le=5000)


class WalletSummary(BaseModel):
    balance: int
    held_deposits: int
    active_count: int
    green_points: int


# ---- Outlets ----
class OutletCreate(BaseModel):
    name: str
    location: str | None = None


class OutletOut(ORM):
    id: int
    name: str
    location: str | None


# ---- Containers ----
class ContainerCreate(BaseModel):
    code: str = Field(min_length=1, max_length=40)
    type: ContainerType = "cup"
    deposit_amount: int | None = Field(default=None, ge=0)  # default comes from settings
    outlet_id: int | None = None


class ContainerOut(ORM):
    id: int
    code: str
    type: str
    deposit_amount: int
    status: str
    outlet_id: int | None
    current_user_id: int | None
    issued_at: UTCDateTime | None
    issued_outlet_id: int | None
    issued_outlet_name: str | None = None
    due_at: UTCDateTime | None = None
    is_overdue: bool = False


class Availability(BaseModel):
    outlet_id: int | None
    outlet_name: str
    type: str
    deposit_amount: int
    available: int
    total: int


# ---- Issue / borrow / return ----
class IssueRequest(BaseModel):
    roll_no: str
    container_code: str
    outlet_id: int | None = None


class BorrowRequest(BaseModel):
    """Student self-service borrow at an outlet."""
    container_code: str
    outlet_id: int


class ReturnRequest(BaseModel):
    container_code: str
    outlet_id: int | None = None


class TransactionOut(ORM):
    id: int
    user_id: int
    roll_no: str | None = None
    student_name: str | None = None
    container_id: int | None
    container_code: str | None = None
    container_type: str | None = None
    outlet_id: int | None
    outlet_name: str | None = None
    kind: str
    amount: int
    points: int
    performed_by_id: int | None
    created_at: UTCDateTime


class Stats(BaseModel):
    total_users: int
    total_containers: int
    containers_available: int
    containers_in_use: int
    containers_overdue: int
    total_issues: int
    total_returns: int
    issues_today: int
    returns_today: int
    return_rate_percent: float
    plastic_items_saved: int
