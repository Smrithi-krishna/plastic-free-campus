import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ScanLine, X } from 'lucide-react';
import Logo from '../components/common/Logo';
import Sidebar from '../components/common/Sidebar';
import ThemeToggle from '../components/common/ThemeToggle';
import { useToast } from '../components/common/Notification';
import { STAFF_NAV, STAFF_ROUTES } from '../utils/navigation';
import { parseQR } from '../utils/qr';

/**
 * Staff portal shell: forest top bar with a scan field that is always within reach,
 * task-grouped navigation, compact density. Under 1000px the navigation becomes a drawer.
 */
export default function StaffLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { push } = useToast();

  useEffect(() => setNavOpen(false), [pathname]);
  useEffect(() => {
    if (!navOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setNavOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const quickScan = (e) => {
    e.preventDefault();
    const parsed = parseQR(code);
    if (!parsed) {
      push({ tone: 'danger', title: 'Code not recognised', message: 'Use a student code like PFC-STU-1042 or a container code like PFC-CUP-0142.' });
      return;
    }
    setCode('');
    navigate(`${STAFF_ROUTES[parsed.kind]}?code=${encodeURIComponent(parsed.id)}`);
  };

  return (
    <div className="shell-staff">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className="staff-top">
        <button type="button" className="icon-btn staff-top__menu" onClick={() => setNavOpen((v) => !v)} aria-expanded={navOpen} aria-controls="staff-nav" aria-label={navOpen ? 'Close navigation' : 'Open navigation'}>
          {navOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
        <Logo to="/staff/dashboard" size={28} />
        <form className="scan-field" onSubmit={quickScan} role="search">
          <ScanLine size={16} aria-hidden="true" />
          <label className="sr-only" htmlFor="quick-scan">Scan or type a student or container code</label>
          <input id="quick-scan" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Scan or type a code" autoComplete="off" spellCheck="false" />
        </form>
        <div className="staff-top__user">
          <span>Counter staff</span>
          <ThemeToggle />
          <Link to="/" style={{ color: 'inherit' }}>Sign out</Link>
        </div>
      </header>

      <div className="staff-scrim" data-open={navOpen} onClick={() => setNavOpen(false)} aria-hidden="true" />
      <aside id="staff-nav" className="staff-nav" data-open={navOpen}>
        <Sidebar groups={STAFF_NAV} variant="staff" label="Staff" />
      </aside>

      <main id="main" className="staff-main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}
