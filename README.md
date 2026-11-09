# 🌿 Plastic-Free Campus Portal

An end-to-end web platform designed to reduce single-use plastic waste across university campuses by promoting reusable containers.

Plastic-Free Campus introduces a digital deposit-and-return system that allows students to borrow reusable containers, return them at authorised campus stations, receive deposit refunds, and earn Green Points for sustainable participation.

The platform also provides canteen staff with tools to manage container inventory, verify transactions, track returns, and monitor campus-wide reuse activity.

## 🚀 Project Overview

Traditional campus canteens often rely on single-use plastic cups, containers, and other disposable packaging. Plastic-Free Campus addresses this problem through a technology-driven reusable-container management system.

Students can borrow reusable containers by paying a refundable deposit. Each container is identified using a unique QR code. When a student returns a container, staff verify the return and process the deposit refund.

The platform encourages sustainable behaviour through reward points, achievements, leaderboards, and environmental impact tracking.

## ✨ Key Features

### 🎓 Student Portal

- **Student Dashboard:** View active borrowings, wallet balance, Green Points, and environmental impact.
- **Digital Student QR:** Personal QR code for identification during container transactions.
- **Container Directory:** Explore container availability across campus stations.
- **Borrow Containers:** Borrow reusable containers through a QR-based checkout workflow.
- **Return Containers:** Track and complete container return transactions.
- **My Containers:** View borrowed containers, due dates, and deposit statuses.
- **Digital Wallet:** View refundable deposits, refunds, and transaction history.
- **Rewards & Swag Store:** Redeem Green Points for eligible rewards.
- **Badges & Achievements:** Earn recognition for sustainable participation.
- **Leaderboard:** Compare Green Points and sustainability achievements.
- **Environmental Impact Dashboard:** Track estimated plastic waste diverted and other environmental indicators.
- **Notifications:** Receive updates about borrowing, returns, and rewards.

### 🍽️ Canteen Staff Portal

- **Staff Dashboard:** Monitor station activity and container availability.
- **Issue Containers:** Verify student identification and record container checkout.
- **Verify Students:** View student borrowing and reward information.
- **Verify Returns:** Scan and verify returned containers.
- **Deposit Refund Management:** Record refundable deposit transactions.
- **Container Inventory:** Monitor available, borrowed, and returned containers.
- **Add New Containers:** Register reusable containers into the system.
- **Cleaning Management:** Track containers awaiting or completing cleaning.
- **Damaged Container Management:** Record and manage damaged containers.
- **Overdue Management:** Identify containers that have not been returned within the configured return period.
- **Transaction History:** Review borrowing and return records.

### 🌱 Sustainability & Rewards

- Green Points reward system.
- Achievement badges and milestones.
- Student leaderboards.
- Reusable-container tracking.
- Estimated plastic waste reduction metrics.
- Campus sustainability monitoring.

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | Frontend framework |
| Vite | Development server and build tool |
| JavaScript | Application programming |
| React Router DOM v6 | Client-side routing |
| Lucide React | Icons |
| Modular CSS | Styling and responsive layouts |
| CSS Custom Properties | Theme tokens and light/dark mode |
| React Context API | Shared application state |

### Backend

| Technology | Purpose |
|---|---|
| Python 3.12 | Backend programming language |
| FastAPI | REST API framework |
| Uvicorn | ASGI server |
| SQLAlchemy | Database ORM |

### Database

| Technology | Purpose |
|---|---|
| MySQL 8.0 | Relational database |
| PyMySQL | Python MySQL driver |

**Database name:** `plastic_free_campus`

### Authentication & Security

- JWT (JSON Web Tokens) for authentication.
- bcrypt for password hashing.
- Role-based access for students and staff.

### Validation

- Pydantic v2 for data validation.
- email-validator for email validation.

### QR Code & IoT Integration

| Technology | Purpose |
|---|---|
| qrcode | QR code generation |
| Pillow | Image processing |
| ESP32 Device-Key API | Device integration |

### Testing

- pytest for backend testing.
- HTTPX for API testing.

## 🏗️ System Architecture

The application follows a frontend–backend–database architecture.

```mermaid
flowchart TD
    A[Student Portal] --> C[React + Vite Frontend]
    B[Staff Portal] --> C
    C --> D[FastAPI Backend]
    D --> E[JWT Authentication]
    D --> F[SQLAlchemy ORM]
    F --> G[(MySQL Database)]
    D --> H[QR Code Services]
    H --> I[QR Scanner / ESP32 Integration]
```

## 🔄 How It Works

1. **Student Registration:** Students create an account and access their personal dashboard.
2. **Container Checkout:** Staff verify the student and scan the reusable container's QR code.
3. **Deposit Recording:** The system records the refundable deposit associated with the borrowing.
4. **Container Return:** Students return containers at an authorised return station.
5. **Return Verification:** Staff inspect and verify the returned container.
6. **Deposit Refund:** The system records the refund in the student's wallet.
7. **Green Points:** Students earn reward points for participating in the reusable-container programme.
8. **Cleaning & Reuse:** Returned containers move through the cleaning process before becoming available again.

## 📁 Project Structure

```text
plastic-free-campus/
│
├── README.md
├── .gitignore
├── .env.example
├── LICENSE
│
├── frontend/
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   ├── public/
│   │   ├── logo.png
│   │   ├── icons/
│   │   └── badges/
│   │
│   └── src/
│       │
│       ├── main.jsx
│       ├── App.jsx
│       ├── routes/
│       │   └── AppRoutes.jsx
│       │
│       ├── assets/
│       │   ├── images/
│       │   └── styles/
│       │
│       ├── components/
│       │   ├── common/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── Notification.jsx
│       │   │   └── Loading.jsx
│       │   │
│       │   ├── qr/
│       │   │   ├── QRScanner.jsx
│       │   │   └── QRDisplay.jsx
│       │   │
│       │   └── dashboard/
│       │       ├── StatCard.jsx
│       │       └── StatusBadge.jsx
│       │
│       ├── pages/
│       │   │
│       │   ├── public/
│       │   │   ├── LandingPage.jsx
│       │   │   └── LoginSelection.jsx
│       │   │
│       │   ├── student/
│       │   │   ├── StudentLogin.jsx
│       │   │   ├── StudentRegister.jsx
│       │   │   ├── StudentDashboard.jsx
│       │   │   ├── MyQR.jsx
│       │   │   ├── FindContainers.jsx
│       │   │   ├── BorrowContainer.jsx
│       │   │   ├── ReturnContainer.jsx
│       │   │   ├── MyContainers.jsx
│       │   │   ├── Wallet.jsx
│       │   │   ├── TransactionHistory.jsx
│       │   │   ├── Rewards.jsx
│       │   │   ├── Badges.jsx
│       │   │   ├── SwagStore.jsx
│       │   │   ├── Certificates.jsx
│       │   │   ├── ImpactDashboard.jsx
│       │   │   ├── Leaderboard.jsx
│       │   │   ├── Notifications.jsx
│       │   │   └── StudentProfile.jsx
│       │   │
│       │   └── staff/
│       │       ├── StaffLogin.jsx
│       │       ├── StaffDashboard.jsx
│       │       ├── IssueContainer.jsx
│       │       ├── VerifyStudent.jsx
│       │       ├── VerifyReturn.jsx
│       │       ├── RefundManagement.jsx
│       │       ├── ContainerInventory.jsx
│       │       ├── AddContainer.jsx
│       │       ├── CleaningManagement.jsx
│       │       ├── DamagedContainers.jsx
│       │       ├── OverdueContainers.jsx
│       │       ├── TransactionHistory.jsx
│       │       ├── ReturnPoints.jsx
│       │       └── StaffReports.jsx
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── containerService.js
│       │   ├── transactionService.js
│       │   ├── walletService.js
│       │   ├── rewardsService.js
│       │   └── notificationService.js
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── UserContext.jsx
│       │
│       ├── hooks/
│       │   ├── useAuth.js
│       │   └── useQRScanner.js
│       │
│       └── utils/
│           ├── constants.js
│           ├── formatters.js
│           └── validators.js
│
├── backend/
│   │
│   ├── requirements.txt
│   ├── .env.example
│   ├── run.py
│   │
│   └── app/
│       │
│       ├── main.py
│       ├── config.py
│       ├── database.py
│       │
│       ├── api/
│       │   ├── auth.py
│       │   ├── students.py
│       │   ├── staff.py
│       │   ├── containers.py
│       │   ├── borrowing.py
│       │   ├── returns.py
│       │   ├── wallets.py
│       │   ├── rewards.py
│       │   ├── badges.py
│       │   ├── vouchers.py
│       │   ├── certificates.py
│       │   ├── leaderboard.py
│       │   ├── impact.py
│       │   ├── notifications.py
│       │   └── reports.py
│       │
│       ├── models/
│       │   ├── student.py
│       │   ├── staff.py
│       │   ├── canteen.py
│       │   ├── container.py
│       │   ├── transaction.py
│       │   ├── wallet.py
│       │   ├── reward.py
│       │   ├── badge.py
│       │   ├── voucher.py
│       │   └── notification.py
│       │
│       ├── schemas/
│       │   ├── student.py
│       │   ├── staff.py
│       │   ├── container.py
│       │   ├── transaction.py
│       │   ├── wallet.py
│       │   └── reward.py
│       │
│       ├── services/
│       │   ├── auth_service.py
│       │   ├── qr_service.py
│       │   ├── borrowing_service.py
│       │   ├── return_service.py
│       │   ├── deposit_service.py
│       │   ├── refund_service.py
│       │   ├── rewards_service.py
│       │   ├── badge_service.py
│       │   ├── certificate_service.py
│       │   ├── impact_service.py
│       │   └── notification_service.py
│       │
│       ├── utils/
│       │   ├── security.py
│       │   ├── permissions.py
│       │   └── validators.py
│       │
│       └── tests/
│           ├── test_auth.py
│           ├── test_borrowing.py
│           ├── test_returns.py
│           ├── test_wallet.py
│           └── test_rewards.py
│
├── database/
   ├── schema.sql
   ├── seed.sql
   └── migrations/
       ├── 001_users.sql
       ├── 002_containers.sql
       ├── 003_transactions.sql
       ├── 004_wallets.sql
       └── 005_rewards.sql

```

*Note: This is the intended high-level structure. Individual files and modules may evolve during development.*

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- Node.js 18 or higher
- npm
- Python 3.12
- MySQL 8.0
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Smrithi-krishna/plastic-free-campus.git
cd plastic-free-campus
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:5173
```

### 3. Backend Setup

Open a separate terminal from the project root and navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

<<<<<<< HEAD
Load demo data (outlets, containers and the demo accounts below), then start the API:

```bash
python seed.py
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000/api`, which is where the frontend looks by default. Interactive API docs are at:
=======
Configure the database connection and other required environment variables using the project's `.env.example` as a reference.

Start the FastAPI application using the project's configured entry point. For example, if the application instance is exposed as `app` in `app.py`:

```bash
uvicorn app:app --reload
```

The API documentation is available at:
>>>>>>> origin/main

```text
http://127.0.0.1:8000/docs
```

<<<<<<< HEAD
With both running, open `http://localhost:5173/plastic-free-campus/`.

**Demo accounts** (from `seed.py`; change them before real use):

| Portal | ID | Password / PIN |
|---|---|---|
| Student | `PFC-STU-1001`, `PFC-STU-1002`, `PFC-STU-1003` | `student123` |
| Staff (Central Campus Canteen) | `CAN-01` | `246810` |
| Staff (Library Snack Kiosk) | `CAN-02` | `246810` |
| Staff portal, admin | `ADMIN-01` | `admin123` |

### 4. Database Setup

By default the backend uses a local SQLite file (`backend/plastic_free_campus.db`), so it runs with no database setup. To use MySQL 8.0:

1. Create the database: `CREATE DATABASE plastic_free_campus;`
2. Set the connection before starting the backend (see `backend/.env.example`):

```bash
# Windows PowerShell
$env:DATABASE_URL="mysql+pymysql://root:yourpassword@localhost:3306/plastic_free_campus"
# macOS / Linux
export DATABASE_URL="mysql+pymysql://root:yourpassword@localhost:3306/plastic_free_campus"
```

3. Run `python seed.py`. Tables are created automatically.

To start over with fresh demo data, delete `backend/plastic_free_campus.db` and run `python seed.py` again.
=======
### 4. Database Setup

1. Install and start MySQL 8.0.
2. Create the database named `plastic_free_campus`, if it has not already been created.
3. Configure the database credentials in the backend environment.
4. Run the project's database initialization or seed command.

For the current project setup, the seed command is:

```bash
python app.py seed
```

Run it from the backend directory if that is where `app.py` is located.
>>>>>>> origin/main

## 🔐 Environment Configuration

The backend requires environment configuration for database connectivity, authentication, and other application settings.

Use `.env.example` as the reference for the required variables.

**Important:** Never commit your actual `.env` file, database passwords, JWT secrets, or device keys to GitHub.

## 🌐 GitHub Pages Deployment

The frontend can be deployed using GitHub Actions.

1. Ensure the Vite configuration contains the repository base path:

```javascript
base: '/plastic-free-campus/',
```

2. Open the GitHub repository.
3. Navigate to **Settings → Pages**.
4. Set the deployment source to **GitHub Actions**.
5. Push changes to the `main` branch.
6. GitHub Actions will build and deploy the frontend.

**Note:** GitHub Pages hosts the static frontend only. The FastAPI backend and MySQL database require separate hosting for a fully connected, live application.

## 🔮 Future Scope

- Integration with real campus canteen systems.
- Deployment of the backend and database on cloud infrastructure.
- Live QR scanning and ESP32-based device integration.
- Additional authorised container return stations.
- Enhanced sustainability analytics and reporting.
- Expansion to multiple campuses.
- Integration with institutional student identification systems.

## 👥 Team

**Project:** Plastic-Free Campus Portal

**Hackathon:** HERHACK 2026

**Team Members:**
1. Nikitha Praveen
2. Raina Bijo
3. Smrithi Krishna
4. Sneha Shaju
5. Theja S Menon

## 📄 License

This project is licensed under the terms of the MIT License. See the `LICENSE` file for details.

---

**🌿 Plastic-Free Campus — Borrow. Return. Reuse. Repeat.**
