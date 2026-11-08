import { STATUS } from '../../utils/constants';

/** Pass a status key from utils/constants.js, or label + tone for one-offs. Always shows text, never colour alone. */
export default function StatusBadge({ status, label, tone }) {
  const known = STATUS[status];
  const text = label ?? known?.label ?? status;
  const t = tone ?? known?.tone ?? 'neutral';
  return <span className={`badge badge--${t}`}>{text}</span>;
}
