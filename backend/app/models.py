"""Database tables."""
from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def now():
    """Current time in UTC, stored without tzinfo (SQLite and MySQL DATETIME drop it anyway)."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


class User(Base):
    """Anyone who logs in: students, outlet staff, admins."""
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    # Login ID: student ID for students (e.g. PFC-STU-1001), staff ID for staff (e.g. CAN-01)
    roll_no: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    email: Mapped[str | None] = mapped_column(String(120), unique=True, nullable=True)
    password_hash: Mapped[str | None] = mapped_column(String(200), nullable=True)
    role: Mapped[str] = mapped_column(String(20), default="student", index=True)
    # Which outlet a staff member works at (null for students and admins)
    outlet_id: Mapped[int | None] = mapped_column(ForeignKey("outlets.id"), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    wallet_balance: Mapped[int] = mapped_column(Integer, default=0)  # in rupees
    green_points: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    transactions: Mapped[list["Transaction"]] = relationship(
        back_populates="user", foreign_keys="Transaction.user_id"
    )


class Outlet(Base):
    """A canteen / kiosk / counter that hands out and takes back containers."""
    __tablename__ = "outlets"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)
    location: Mapped[str | None] = mapped_column(String(150), nullable=True)


class Container(Base):
    """A reusable cup or box, identified by the code on its QR sticker (e.g. PFC-CUP-0001)."""
    __tablename__ = "containers"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    type: Mapped[str] = mapped_column(String(30), default="cup")  # cup | small_box | large_box
    deposit_amount: Mapped[int] = mapped_column(Integer, default=20)
    # available | issued | retired
    status: Mapped[str] = mapped_column(String(20), default="available", index=True)
    # Home station: where the container is stocked when available
    outlet_id: Mapped[int | None] = mapped_column(ForeignKey("outlets.id"), nullable=True)
    current_user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    issued_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    issued_outlet_id: Mapped[int | None] = mapped_column(ForeignKey("outlets.id"), nullable=True)


class Transaction(Base):
    """Every money / container movement: top-up, issue (deposit), return (refund)."""
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    container_id: Mapped[int | None] = mapped_column(ForeignKey("containers.id"), nullable=True)
    outlet_id: Mapped[int | None] = mapped_column(ForeignKey("outlets.id"), nullable=True)
    kind: Mapped[str] = mapped_column(String(20))  # topup | issue | return
    amount: Mapped[int] = mapped_column(Integer)   # +ve credits wallet, -ve debits
    points: Mapped[int] = mapped_column(Integer, default=0)  # green points earned
    # Who performed it: staff member, or the student themselves for self-service
    performed_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    user: Mapped[User] = relationship(back_populates="transactions", foreign_keys=[user_id])
