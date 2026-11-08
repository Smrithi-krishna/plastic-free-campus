import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/public/LandingPage';
import StudentLogin from '../pages/student/StudentLogin';
import StudentRegister from '../pages/student/StudentRegister';
import StaffLogin from '../pages/staff/StaffLogin';
import StudentDashboard from '../pages/student/StudentDashboard';
import StaffDashboard from '../pages/staff/StaffDashboard';

// Student Portal Pages
import MyQR from '../pages/student/MyQR';
import FindContainers from '../pages/student/FindContainers';
import BorrowContainer from '../pages/student/BorrowContainer';
import ReturnContainer from '../pages/student/ReturnContainer';
import MyContainers from '../pages/student/MyContainers';
import Wallet from '../pages/student/Wallet';
import TransactionHistory from '../pages/student/TransactionHistory';
import Rewards from '../pages/student/Rewards';
import Badges from '../pages/student/Badges';
import SwagStore from '../pages/student/SwagStore';
import Certificates from '../pages/student/Certificates';
import ImpactDashboard from '../pages/student/ImpactDashboard';
import Leaderboard from '../pages/student/Leaderboard';
import Notifications from '../pages/student/Notifications';
import StudentProfile from '../pages/student/StudentProfile';

// Staff Portal Pages
import IssueContainer from '../pages/staff/IssueContainer';
import VerifyStudent from '../pages/staff/VerifyStudent';
import VerifyReturn from '../pages/staff/VerifyReturn';
import RefundManagement from '../pages/staff/RefundManagement';
import ContainerInventory from '../pages/staff/ContainerInventory';
import AddContainer from '../pages/staff/AddContainer';
import CleaningManagement from '../pages/staff/CleaningManagement';
import DamagedContainers from '../pages/staff/DamagedContainers';
import OverdueContainers from '../pages/staff/OverdueContainers';
import StaffTransactionHistory from '../pages/staff/TransactionHistory';
import ReturnPoints from '../pages/staff/ReturnPoints';
import StaffReports from '../pages/staff/StaffReports';

import StudentLayout from '../layouts/StudentLayout';
import StaffLayout from '../layouts/StaffLayout';
import DesignSystem from '../pages/public/DesignSystem';
import PhasePlaceholder from '../pages/public/PhasePlaceholder';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children, allowedRole }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={allowedRole === 'staff' ? '/staff/login' : '/student/login'} replace />;
  }
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/design-system" element={<DesignSystem />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/staff/login" element={<StaffLogin />} />

      {/* Protected Student Portal */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        
        {/* QR Code Routes */}
        <Route path="qr" element={<MyQR />} />
        <Route path="my-qr" element={<MyQR />} />
        
        <Route path="find" element={<FindContainers />} />
        <Route path="borrow" element={<BorrowContainer />} />
        <Route path="return" element={<ReturnContainer />} />
        
        {/* Container List Routes */}
        <Route path="containers" element={<MyContainers />} />
        <Route path="my-containers" element={<MyContainers />} />
        
        <Route path="wallet" element={<Wallet />} />
        <Route path="transactions" element={<TransactionHistory />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="badges" element={<Badges />} />
        
        {/* Swag Store Routes */}
        <Route path="swag" element={<SwagStore />} />
        <Route path="swag-store" element={<SwagStore />} />
        
        <Route path="certificates" element={<Certificates />} />
        <Route path="impact" element={<ImpactDashboard />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="*" element={<PhasePlaceholder portal="student" />} />
      </Route>

      {/* Protected Staff Portal */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute allowedRole="staff">
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="issue" element={<IssueContainer />} />
        <Route path="verify-student" element={<VerifyStudent />} />
        <Route path="verify-return" element={<VerifyReturn />} />
        <Route path="refunds" element={<RefundManagement />} />
        <Route path="inventory" element={<ContainerInventory />} />
        
        {/* Add Container Routes */}
        <Route path="add-container" element={<AddContainer />} />
        <Route path="inventory/new" element={<AddContainer />} />
        
        <Route path="cleaning" element={<CleaningManagement />} />
        <Route path="damaged" element={<DamagedContainers />} />
        <Route path="overdue" element={<OverdueContainers />} />
        <Route path="transactions" element={<StaffTransactionHistory />} />
        <Route path="return-points" element={<ReturnPoints />} />
        <Route path="reports" element={<StaffReports />} />
        <Route path="*" element={<PhasePlaceholder portal="staff" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}