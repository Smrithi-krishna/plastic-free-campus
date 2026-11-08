import DemoTag from '../common/DemoTag';
import { PointsMark } from '../common/Icons';

/**
 * tone: 'neutral' | 'money' | 'points'
 * Money (deposits, refunds) and Green Points are always styled differently so they are never confused.
 * Set `demo` on any simulated statistic.
 */
export default function StatCard({ label, value, hint, tone = 'neutral', icon: Icon, demo = false }) {
  return (
    <div className={`figure figure--${tone}`}>
      <p className="figure__label">
        {tone === 'points' ? <PointsMark size={16} /> : Icon ? <Icon size={16} aria-hidden="true" /> : null}
        <span>{label}</span>
        {demo && <DemoTag />}
      </p>
      <p className="figure__value num">{value}</p>
      {hint && <p className="figure__hint">{hint}</p>}
    </div>
  );
}
