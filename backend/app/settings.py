"""Business rules in one place. Values match frontend/src/utils/config.js.

These are DEMO VALUES, not confirmed policy. Override with environment variables.
"""
import os


def _int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, default))
    except ValueError:
        return default


CONTAINER_TYPES = ("cup", "small_box", "large_box")

DEPOSITS = {
    "cup": _int("DEPOSIT_CUP", 20),
    "small_box": _int("DEPOSIT_SMALL_BOX", 50),
    "large_box": _int("DEPOSIT_LARGE_BOX", 100),
}

# Green points for returning within the borrow period
POINTS_ON_TIME = {"cup": 10, "small_box": 15, "large_box": 20}
SIGNUP_BONUS_POINTS = 50

BORROW_HOURS = _int("BORROW_HOURS", 48)

# Lets students add money to their own wallet without a payment gateway.
# Fine for a demo; set DEMO_SELF_TOPUP=false once real payments exist.
DEMO_SELF_TOPUP = os.getenv("DEMO_SELF_TOPUP", "true").lower() in ("1", "true", "yes")
