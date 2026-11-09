# Plastic-Free Campus — Backend

FastAPI backend for the reusable container deposit system. All routes live under `/api`, which is where the frontend looks by default (`frontend/src/services/api.js`).

## Run it

```bash
cd backend
python -m venv venv
venv\Scripts\activate             # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python seed.py                    # demo outlets, containers and accounts
uvicorn app.main:app --reload
```

API docs: **http://127.0.0.1:8000/docs**. Click **Authorize** and log in with an ID below to try protected routes.

It uses a local SQLite file by default. For MySQL, set `DATABASE_URL` (see `.env.example`). To reset demo data, delete `plastic_free_campus.db` and run `python seed.py` again.

### Demo accounts

| Role | ID | Password |
|---|---|---|
| Student | `PFC-STU-1001` (₹130, one cup out), `PFC-STU-1002` (one overdue box), `PFC-STU-1003` (₹0) | `student123` |
| Counter staff — Central Campus Canteen | `CAN-01` | `246810` |
| Counter staff — Library Snack Kiosk | `CAN-02` | `246810` |
| Admin | `ADMIN-01` | `admin123` |

IDs are case-insensitive. Codes follow the frontend's formats: students `PFC-STU-####`, containers `PFC-CUP-####`, `PFC-SBX-####` and `PFC-LBX-####`.

## Roles

- **student** — signs up, borrows at a counter (self-service), sees only their own wallet, containers and history
- **outlet_staff** — issues containers, verifies returns, tops up wallets, adds containers; everything is recorded at *their* outlet
- **admin** — everything, plus creating staff accounts and outlets

Returns can only be confirmed by staff, so a student can't get a refund without handing the container in.

## Rules (`app/settings.py`)

Demo values matching `frontend/src/utils/config.js`:

| | Cup | Small box | Large box |
|---|---|---|---|
| Deposit | ₹20 | ₹50 | ₹100 |
| Points for returning within 48 h | 10 | 15 | 20 |

New students get 50 signup points. `DEMO_SELF_TOPUP=true` lets students add money without a payment gateway. Set it to `false` once real payments exist.

## Endpoints (all under `/api`)

🔓 public · 👤 logged in · 🎓 student · 🧑‍🍳 staff or admin · 🛡️ admin

| | Method | Path | Used by |
|---|---|---|---|
| 🔓 | POST | `/auth/register` | Student register page; returns a token + user |
| 🔓 | POST | `/auth/login-json` | Both login pages `{roll_no, password}` |
| 👤 | GET | `/auth/me` | Refreshing wallet/points |
| 👤 | GET | `/me/wallet` | Wallet, dashboard |
| 🎓 | POST | `/me/topup` | Wallet page (demo top-up) |
| 👤 | GET | `/me/containers` | My Containers, Return, dashboard |
| 👤 | GET | `/me/transactions` | Transaction History, dashboard |
| 🎓 | POST | `/me/borrow` | Borrow page `{container_code, outlet_id}` |
| 🔓 | GET | `/outlets` | Borrow / Return station lists |
| 🔓 | GET | `/availability` | Find Containers (stock per canteen and type) |
| 🔓 | GET | `/stats` | Staff dashboard |
| 🧑‍🍳 | POST | `/issue` | Issue Container `{roll_no, container_code}` |
| 🧑‍🍳 | POST | `/return` | Verify Return `{container_code}` |
| 🧑‍🍳 | GET | `/transactions` | Staff activity ledger |
| 🧑‍🍳 | GET | `/containers?status=&overdue=` | Inventory |
| 🧑‍🍳 | POST | `/containers` | Add Container `{code, type}` |
| 👤 | GET | `/users/{id}`, `/users/{id}/containers` | Verify Student (students: only themselves) |
| 🧑‍🍳 | POST | `/users/{id}/topup` | Counter top-up on Verify Student |
| 🛡️ | POST / PATCH | `/users`, `/users/{id}`, `/outlets` | Admin setup |

## Tests

```bash
pytest -q
```

One end-to-end test covers signup, login, every permission rule, borrow, issue, return, points and top-ups.
