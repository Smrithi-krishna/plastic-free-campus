import { useId } from 'react';

function Wrapper({ id, label, hint, error, children }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

const describe = (id, hint, error) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export function TextField({ label, hint, error, className = '', ...input }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} hint={hint} error={error}>
      <input id={id} className={`input ${className}`.trim()} aria-invalid={error ? 'true' : undefined} aria-describedby={describe(id, hint, error)} {...input} />
    </Wrapper>
  );
}

export function SelectField({ label, hint, error, options, ...select }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} hint={hint} error={error}>
      <select id={id} className="input" aria-invalid={error ? 'true' : undefined} aria-describedby={describe(id, hint, error)} {...select}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </Wrapper>
  );
}
