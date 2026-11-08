import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Built on the native <dialog>: focus is trapped, Esc closes, and the page behind is inert.
 * On phones it becomes a bottom sheet (see .modal in components.css).
 */
export default function Modal({ open, onClose, title, children, footer }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // click on the backdrop
      }}
    >
      <div className="modal__inner">
        <header className="modal__head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="modal__body">{open ? children : null}</div>
        {footer && <footer className="modal__foot">{footer}</footer>}
      </div>
    </dialog>
  );
}
