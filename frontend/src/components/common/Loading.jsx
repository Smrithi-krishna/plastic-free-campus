export default function Loading({ label = 'Loading' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function Skeleton({ width = '100%', height = '1rem', style }) {
  return <div className="skeleton" style={{ width, height, ...style }} aria-hidden="true" />;
}
