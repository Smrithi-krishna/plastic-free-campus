import { Link } from 'react-router-dom';

export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="var(--brand)" />
      <path d="M9.5 9h13l-1.3 13.2a1.6 1.6 0 0 1-1.6 1.4h-7.2a1.6 1.6 0 0 1-1.6-1.4L9.5 9Z" fill="none" stroke="var(--on-brand)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 9h15" stroke="var(--on-brand)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12.6 20.2c0-3.6 2-5.6 6.6-5.8.1 4.1-2 6-4.9 6-.6 0-1.1-.1-1.7-.2Z" fill="#12a66a" />
    </svg>
  );
}

export default function Logo({ to = '/', size = 32 }) {
  return (
    <Link to={to} className="logo" aria-label="Plastic-Free Campus home">
      <LogoMark size={size} />
      <span className="logo__word">Plastic-Free Campus</span>
    </Link>
  );
}
