import { NavLink } from 'react-router-dom';

/**
 * Grouped navigation list used by both portals.
 * variant "student" is roomy; "staff" is compact (styled in components.css).
 */
export default function Sidebar({ groups, variant = 'student', onNavigate, label }) {
  return (
    <nav className={`nav nav--${variant}`} aria-label={label ?? `${variant} navigation`}>
      {groups.map((group) => (
        <div className="nav__group" key={group.title}>
          <p className="nav__title">{group.title}</p>
          <ul>
            {group.items.map(({ to, label: text, icon: Icon, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className="nav__link" onClick={onNavigate}>
                  <Icon size={variant === 'staff' ? 16 : 18} aria-hidden="true" />
                  <span>{text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
