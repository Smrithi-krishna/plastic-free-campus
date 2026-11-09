"""Login, passwords, tokens and role checks.

Roles:
  student       - borrows containers, sees only their own data
  outlet_staff  - works at one outlet: issues/returns containers, tops up wallets
  admin         - manages users, outlets, containers; sees everything
"""
import hashlib
import hmac
import os
import secrets
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from . import models
from .database import get_db

SECRET_KEY = os.getenv("SECRET_KEY", "dev-only-change-me-in-production")
ALGORITHM = "HS256"
TOKEN_HOURS = int(os.getenv("TOKEN_HOURS", "12"))

ROLES = ("student", "outlet_staff", "admin")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


# ---------- passwords (PBKDF2, Python standard library) ----------
def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 200_000)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, stored: str | None) -> bool:
    if not stored or "$" not in stored:
        return False
    salt, digest = stored.split("$", 1)
    check = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 200_000)
    return hmac.compare_digest(check.hex(), digest)


# ---------- tokens ----------
def create_token(user: models.User) -> str:
    payload = {
        "sub": str(user.id),
        "role": user.role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    unauthorized = HTTPException(
        status.HTTP_401_UNAUTHORIZED,
        "Not logged in or session expired",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        raise unauthorized
    user = db.get(models.User, user_id)
    if not user or not user.is_active:
        raise unauthorized
    return user


def require_roles(*roles: str):
    """Use as:  user = Depends(require_roles("admin", "outlet_staff"))"""
    def checker(user: models.User = Depends(get_current_user)) -> models.User:
        if user.role not in roles:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "You don't have permission to do this")
        return user
    return checker


def require_self_or_staff(roll_no: str, user: models.User) -> None:
    """Students may only see their own records; staff and admins may see anyone's."""
    if user.role == "student" and user.roll_no.upper() != roll_no.strip().upper():
        raise HTTPException(status.HTTP_403_FORBIDDEN, "You can only view your own account")
