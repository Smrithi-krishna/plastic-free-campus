// Custom icons for the concepts lucide does not cover: the containers and Green Points.
const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export function CupIcon({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M5.5 5h13l-1.4 14.1a1.5 1.5 0 0 1-1.5 1.4H8.4a1.5 1.5 0 0 1-1.5-1.4L5.5 5Z" />
      <path d="M4.5 5h15" />
      <path d="M6.2 11h11.6" />
    </svg>
  );
}

export function BoxIcon({ size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      <path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" />
      <path d="M3 6.5h18V10H3z" />
      <path d="M10 14h4" />
    </svg>
  );
}

/** Green Points mark: a leaf on a lime disc. Deliberately unlike any currency symbol. */
export function PointsMark({ size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <circle cx="12" cy="12" r="11" fill="var(--points-fg)" />
      <path d="M6.8 16.2C6.8 10.8 10 7.6 17.2 7.4c.1 6.3-3 9.4-7.6 9.4-1 0-1.9-.2-2.8-.6Z" fill="var(--points-bg)" />
      <path d="M6.6 17.6c2-3.2 4.3-5.2 7.4-6.6" stroke="var(--points-fg)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
