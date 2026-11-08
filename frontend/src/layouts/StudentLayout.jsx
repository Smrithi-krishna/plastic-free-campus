import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Bell, LogOut, Menu } from 'lucide-react';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/Sidebar';
import ThemeToggle from '../components/common/ThemeToggle';
import Modal from '../components/ui/Modal';
import { STUDENT_NAV, STUDENT_TABS } from '../utils/navigation';

/** Student portal shell: light rail on desktop and tablet, top bar plus tab bar on phones. */
export default function StudentLayout() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="shell-student">
      <a href="#main" className="skip-link">Skip to content</a>

      <aside className="rail">
        <Logo to="/student/dashboard" />
        <div className="rail__nav">
          <Sidebar groups={STUDENT_NAV} variant="student" label="Student" />
        </div>
        <div className="rail__foot">
          <Link to="/">Sign out <LogOut size={14} aria-hidden="true" style={{ verticalAlign: '-2px' }} /></Link>
          <ThemeToggle />
        </div>
      </aside>

      <div>
        <header className="student-top">
          <Logo to="/student/dashboard" size={28} />
          <div className="student-top__actions">
            <Link to="/student/notifications" className="icon-btn" aria-label="Notifications"><Bell size={18} aria-hidden="true" /></Link>
            <ThemeToggle />
          </div>
        </header>
        <main id="main" className="student-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <nav className="tabbar" aria-label="Student quick navigation">
        {STUDENT_TABS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}>
            <Icon size={20} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
        <button type="button" onClick={() => setMoreOpen(true)} aria-haspopup="dialog">
          <Menu size={20} aria-hidden="true" />
          More
        </button>
      </nav>

      <Modal open={moreOpen} onClose={() => setMoreOpen(false)} title="All pages">
        <Sidebar groups={STUDENT_NAV} variant="student" label="Student, all pages" onNavigate={() => setMoreOpen(false)} />
        <p style={{ marginTop: '1.25rem' }}><Link to="/" onClick={() => setMoreOpen(false)}>Sign out</Link></p>
      </Modal>
    </div>
  );
}
