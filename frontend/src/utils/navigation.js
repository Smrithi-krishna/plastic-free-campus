import {
  LayoutDashboard, QrCode, Search, PackageOpen, Undo2, Package, Wallet, ReceiptText, Gift, Award,
  ShoppingBag, ScrollText, Leaf, Trophy, Bell, UserRound, ScanLine, UserCheck, ClipboardCheck, Boxes,
  Plus, Droplets, ShieldAlert, Clock, Banknote, MapPin, TrendingUp,
} from 'lucide-react';

export const STUDENT_NAV = [
  {
    title: 'Home',
    items: [
      { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/student/my-qr', label: 'My QR code', icon: QrCode },
    ],
  },
  {
    title: 'Containers',
    items: [
      { to: '/student/find', label: 'Find containers', icon: Search },
      { to: '/student/borrow', label: 'Borrow', icon: PackageOpen },
      { to: '/student/return', label: 'Return', icon: Undo2 },
      { to: '/student/my-containers', label: 'My containers', icon: Package },
    ],
  },
  {
    title: 'Money and rewards',
    items: [
      { to: '/student/wallet', label: 'Wallet', icon: Wallet },
      { to: '/student/transactions', label: 'Transactions', icon: ReceiptText },
      { to: '/student/rewards', label: 'Rewards', icon: Gift },
      { to: '/student/badges', label: 'Badges', icon: Award },
      { to: '/student/swag-store', label: 'Swag store', icon: ShoppingBag },
      { to: '/student/certificates', label: 'Certificates', icon: ScrollText },
    ],
  },
  {
    title: 'Community',
    items: [
      { to: '/student/impact', label: 'Impact', icon: Leaf },
      { to: '/student/leaderboard', label: 'Leaderboard', icon: Trophy },
    ],
  },
  {
    title: 'Account',
    items: [
      { to: '/student/notifications', label: 'Notifications', icon: Bell },
      { to: '/student/profile', label: 'Profile', icon: UserRound },
    ],
  },
];

// Bottom tab bar on phones. The fifth tab opens the full list.
export const STUDENT_TABS = [
  { to: '/student/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/student/my-qr', label: 'My QR', icon: QrCode },
  { to: '/student/borrow', label: 'Borrow', icon: PackageOpen },
  { to: '/student/wallet', label: 'Wallet', icon: Wallet },
];

export const STAFF_NAV = [
  {
    title: 'Counter',
    items: [
      { to: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/staff/issue', label: 'Issue container', icon: PackageOpen },
      { to: '/staff/verify-student', label: 'Verify student', icon: UserCheck },
      { to: '/staff/verify-return', label: 'Verify return', icon: ClipboardCheck },
    ],
  },
  {
    title: 'Inventory',
    items: [
      { to: '/staff/inventory', label: 'Container inventory', icon: Boxes, end: true },
      { to: '/staff/inventory/new', label: 'Add container', icon: Plus },
      { to: '/staff/cleaning', label: 'Cleaning', icon: Droplets },
      { to: '/staff/damaged', label: 'Damaged', icon: ShieldAlert },
      { to: '/staff/overdue', label: 'Overdue', icon: Clock },
      { to: '/staff/return-points', label: 'Return points', icon: MapPin },
    ],
  },
  {
    title: 'Money',
    items: [
      { to: '/staff/refunds', label: 'Refund management', icon: Banknote },
      { to: '/staff/transactions', label: 'Transactions', icon: ReceiptText },
    ],
  },
  {
    title: 'Reports',
    items: [{ to: '/staff/reports', label: 'Staff reports', icon: TrendingUp }],
  },
];

export const findNavItem = (groups, pathname) =>
  groups.flatMap((g) => g.items).find((i) => i.to === pathname);

// Used by the staff quick-scan field
export const STAFF_ROUTES = {
  student: '/staff/verify-student',
  container: '/staff/verify-return',
};

// Keep ScanLine exported for the staff top bar
export { ScanLine };
