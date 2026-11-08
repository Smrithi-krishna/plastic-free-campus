import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/Button';

const LINKS = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#deposits', label: 'Deposits and points' },
  { href: '/#impact', label: 'Impact' },
  { href: '/#portals', label: 'Portals' },
];

/** Public site navigation (landing page and login selection). */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <div className="container site-nav__inner">
        <Logo />
        <nav className="site-nav__links" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="site-nav__actions">
          <ThemeToggle />
          <Button to="/login" variant="secondary" size="sm">Log in</Button>
          <button
            type="button"
            className="icon-btn site-nav__menu-btn"
            aria-expanded={open}
            aria-controls="site-nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="site-nav-sheet" className="site-nav__sheet container" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
