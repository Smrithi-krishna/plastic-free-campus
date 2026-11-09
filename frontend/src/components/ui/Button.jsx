import { Link } from 'react-router-dom';

/**
 * variant: primary | secondary | ghost | danger     size: md | sm
 * Pass `to` to render a router link styled as a button.
 */
export default function Button({ variant = 'primary', size = 'md', to, loading = false, icon: Icon, children, className = '', ...rest }) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}${className ? ` ${className}` : ''}`;
  const content = (
    <>
      {loading ? <span className="spinner" aria-hidden="true" /> : Icon ? <Icon size={18} aria-hidden="true" /> : null}
      {children}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  return (
    <button type="button" className={cls} {...rest} disabled={loading || rest.disabled} aria-busy={loading || undefined}>
      {content}
    </button>
  );
}
