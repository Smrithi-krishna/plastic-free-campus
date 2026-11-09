"""Run from the backend folder:  pytest -q"""
import os

os.environ["DATABASE_URL"] = "sqlite:///./test.db"
os.environ["ADMIN_ROLL_NO"] = "ADMIN-01"
os.environ["ADMIN_PASSWORD"] = "admin123"
if os.path.exists("test.db"):
    os.remove("test.db")

from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402

client = TestClient(app)
A = "/api"


def login(roll, pw):
    r = client.post(f"{A}/auth/login-json", json={"roll_no": roll, "password": pw})
    assert r.status_code == 200, r.text
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


def test_full_flow():
    assert client.get(f"{A}/health").json()["status"] == "ok"
    admin = login("ADMIN-01", "admin123")

    # admin sets up an outlet and a counter staff account
    outlet = client.post(f"{A}/outlets", json={"name": "Canteen"}, headers=admin).json()
    r = client.post(f"{A}/users", headers=admin, json={
        "name": "Counter", "roll_no": "CAN-01", "password": "246810",
        "role": "outlet_staff", "outlet_id": outlet["id"]})
    assert r.status_code == 201
    staff = login("can-01", "246810")  # IDs are case-insensitive

    # staff registers containers at their own outlet; deposit comes from the type
    r = client.post(f"{A}/containers", headers=staff, json={"code": "pfc-cup-0001", "type": "cup"})
    assert r.status_code == 201
    assert r.json()["code"] == "PFC-CUP-0001" and r.json()["deposit_amount"] == 20
    assert r.json()["outlet_id"] == outlet["id"]
    client.post(f"{A}/containers", headers=staff, json={"code": "PFC-LBX-0001", "type": "large_box"})

    avail = client.get(f"{A}/availability").json()
    assert {a["type"]: a["available"] for a in avail} == {"cup": 1, "large_box": 1}

    # student signs up -> gets a token, a student role and the signup bonus, whatever they send
    r = client.post(f"{A}/auth/register", json={
        "name": "Stu", "roll_no": "pfc-stu-1001", "password": "secret1", "role": "admin"})
    assert r.status_code == 201
    body = r.json()
    assert body["user"]["role"] == "student" and body["user"]["roll_no"] == "PFC-STU-1001"
    assert body["user"]["green_points"] == 50
    stu = {"Authorization": f"Bearer {body['access_token']}"}
    client.post(f"{A}/auth/register", json={"name": "Other", "roll_no": "PFC-STU-1002", "password": "secret2"})

    # permissions
    assert client.post(f"{A}/auth/login-json", json={"roll_no": "PFC-STU-1001", "password": "x"}).status_code == 401
    assert client.get(f"{A}/me/wallet").status_code == 401
    assert client.post(f"{A}/issue", headers=stu, json={"roll_no": "PFC-STU-1001", "container_code": "PFC-CUP-0001"}).status_code == 403
    assert client.post(f"{A}/return", headers=stu, json={"container_code": "PFC-CUP-0001"}).status_code == 403
    assert client.post(f"{A}/containers", headers=stu, json={"code": "PFC-CUP-0009"}).status_code == 403
    assert client.get(f"{A}/users/PFC-STU-1002", headers=stu).status_code == 403
    assert client.post(f"{A}/me/borrow", headers=staff, json={"container_code": "PFC-CUP-0001", "outlet_id": 1}).status_code == 403

    # staff issue: no money -> 402; student tops up (demo); issue works
    assert client.post(f"{A}/issue", headers=staff, json={"roll_no": "PFC-STU-1001", "container_code": "PFC-CUP-0001"}).status_code == 402
    w = client.post(f"{A}/me/topup", headers=stu, json={"amount": 200}).json()
    assert w["balance"] == 200
    r = client.post(f"{A}/issue", headers=staff, json={"roll_no": "PFC-STU-1001", "container_code": "PFC-CUP-0001"})
    assert r.status_code == 200 and r.json()["outlet_name"] == "Canteen" and r.json()["container_code"] == "PFC-CUP-0001"

    # student self-borrows the large box
    r = client.post(f"{A}/me/borrow", headers=stu, json={"container_code": "PFC-LBX-0001", "outlet_id": outlet["id"]})
    assert r.status_code == 200
    w = client.get(f"{A}/me/wallet", headers=stu).json()
    assert w == {"balance": 80, "held_deposits": 120, "active_count": 2, "green_points": 50}
    mine = client.get(f"{A}/me/containers", headers=stu).json()
    assert {c["code"] for c in mine} == {"PFC-CUP-0001", "PFC-LBX-0001"}
    assert mine[0]["due_at"].endswith(("Z", "+00:00")) and not mine[0]["is_overdue"]
    assert client.post(f"{A}/issue", headers=staff, json={"roll_no": "PFC-STU-1001", "container_code": "PFC-CUP-0001"}).status_code == 409

    # return on time -> refund + points
    r = client.post(f"{A}/return", headers=staff, json={"container_code": "PFC-CUP-0001"})
    assert r.status_code == 200 and r.json()["points"] == 10
    w = client.get(f"{A}/me/wallet", headers=stu).json()
    assert w["balance"] == 100 and w["green_points"] == 60 and w["active_count"] == 1

    kinds = [t["kind"] for t in client.get(f"{A}/me/transactions", headers=stu).json()]
    assert kinds == ["return", "issue", "issue", "topup"]
    assert len(client.get(f"{A}/transactions", headers=staff).json()) == 3  # staff issue, self-borrow, return — all at this outlet

    s = client.get(f"{A}/stats").json()
    assert s["total_issues"] == 2 and s["total_returns"] == 1 and s["containers_in_use"] == 1

    # admin disables the student -> their token stops working
    assert client.patch(f"{A}/users/PFC-STU-1001", headers=admin, json={"is_active": False}).status_code == 200
    assert client.get(f"{A}/auth/me", headers=stu).status_code == 401
