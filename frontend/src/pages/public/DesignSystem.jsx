import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, RotateCcw } from 'lucide-react';
import '../../assets/styles/design-system.css';
import Logo from '../../components/common/Logo';
import ThemeToggle from '../../components/common/ThemeToggle';
import DemoTag from '../../components/common/DemoTag';
import { BoxIcon, CupIcon, PointsMark } from '../../components/common/Icons';
import { useToast } from '../../components/common/Notification';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import { SelectField, TextField } from '../../components/ui/Field';
import Modal from '../../components/ui/Modal';
import StatCard from '../../components/dashboard/StatCard';
import StatusBadge from '../../components/dashboard/StatusBadge';
import QRDisplay from '../../components/qr/QRDisplay';
import QRScanner from '../../components/qr/QRScanner';
import { CONTAINER_TYPES } from '../../utils/constants';
import { DEFAULT_CONFIG, loadConfig, resetConfig, saveConfig } from '../../utils/config';
import { formatDue, formatINR, formatPoints } from '../../utils/formatters';
import { buildContainerQR, buildStudentQR } from '../../utils/qr';
import { isPositiveAmount } from '../../utils/validators';

const SWATCHES = [
  ['--brand', 'Brand forest'], ['--action', 'Action emerald'], ['--surface-tint', 'Sage'], ['--surface-sunken', 'Pale green'],
  ['--text', 'Text'], ['--text-muted', 'Muted text'], ['--border', 'Border'], ['--points-fg', 'Green Points'],
  ['--ok-fg', 'Success'], ['--info-fg', 'Info'], ['--warn-fg', 'Warning'], ['--danger-fg', 'Danger'],
];

const hoursFromNow = (h) => new Date(Date.now() + h * 3600000).toISOString();
const ROWS = [
  { id: 'PFC-CUP-0142', type: 'Reusable cup', holder: 'Asha R.', due: hoursFromNow(20), status: 'borrowed', deposit: 20 },
  { id: 'PFC-SBX-0031', type: 'Small food box', holder: 'Kiran M.', due: hoursFromNow(-6), status: 'overdue', deposit: 50 },
  { id: 'PFC-LBX-0007', type: 'Large food box', holder: 'Not issued', due: null, status: 'cleaning', deposit: 100 },
];

const toDraft = (c) => ({
  ...c.deposits,
  ...Object.fromEntries(Object.entries(c.points.onTimeReturn).map(([k, v]) => [`pts_${k}`, v])),
  borrowHours: c.borrowHours,
});

export default function DesignSystem() {
  const { push } = useToast();
  const [modal, setModal] = useState(false);
  const [config, setConfig] = useState(loadConfig);
  const [draft, setDraft] = useState(() => toDraft(loadConfig()));
  const [errors, setErrors] = useState({});
  const [scanned, setScanned] = useState(null);

  const saveDeposits = (e) => {
    e.preventDefault();
    const bad = {};
    Object.entries(draft).forEach(([k, v]) => {
      const msg = isPositiveAmount(v);
      if (msg) bad[k] = msg;
    });
    setErrors(bad);
    if (Object.keys(bad).length) return;
    const n = (k) => Number(draft[k]);
    const saved = saveConfig({
      deposits: { cup: n('cup'), small_box: n('small_box'), large_box: n('large_box') },
      borrowHours: n('borrowHours'),
      points: { onTimeReturn: { cup: n('pts_cup'), small_box: n('pts_small_box'), large_box: n('pts_large_box') } },
    });
    setConfig(saved);
    push({ title: 'Demo settings saved', message: 'New values apply to borrows from now on.' });
  };

  const columns = [
    { key: 'id', header: 'Container', mono: true },
    { key: 'type', header: 'Type' },
    { key: 'holder', header: 'Held by' },
    { key: 'due', header: 'Due', render: (r) => (r.due ? formatDue(r.due).text : 'Not issued') },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'deposit', header: 'Deposit', align: 'right', render: (r) => formatINR(r.deposit) },
  ];

  return (
    <div className="container">
      <header className="ds-head">
        <Logo />
        <div className="ds-row">
          <Link to="/student/dashboard">Student shell</Link>
          <Link to="/staff/dashboard">Staff shell</Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="ds-section">
        <h2>Type</h2>
        <div className="ds-stack">
          <p className="display">Borrow it. Return it. Reuse it.</p>
          <h1>Page title in Fraunces</h1>
          <h3>Section title in Fraunces</h3>
          <p className="prose">Body text is set in Instrument Sans at a comfortable measure. Identifiers such as <span className="mono">PFC-CUP-0142</span> use JetBrains Mono so they can be read out and typed without mistakes.</p>
        </div>
      </section>

      <section className="ds-section">
        <h2>Colour</h2>
        <div className="ds-swatches">
          {SWATCHES.map(([v, name]) => (
            <div className="ds-swatch" key={v}>
              <i style={{ background: `var(${v})` }} />
              <span>{name}<br /><span className="mono">{v}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2>Actions</h2>
        <div className="ds-stack">
          <div className="ds-row">
            <Button icon={Plus}>Issue container</Button>
            <Button variant="secondary">View history</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="danger">Mark as damaged</Button>
            <Button loading>Saving</Button>
            <Button disabled>Unavailable</Button>
          </div>
          <div className="ds-row">
            <StatusBadge status="available" /><StatusBadge status="borrowed" /><StatusBadge status="overdue" />
            <StatusBadge status="cleaning" /><StatusBadge status="damaged" /><StatusBadge status="refunded" />
            <StatusBadge label="Draft" tone="neutral" />
          </div>
          <div className="ds-row">
            <CupIcon size={28} /><BoxIcon size={28} /><PointsMark size={28} />
            <span className="points-pill"><PointsMark size={20} />{formatPoints(240)}</span>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2>Figures</h2>
        <div className="ds-stack">
          <div className="ds-figures">
            <StatCard tone="money" label="Refundable deposit held" value={formatINR(70)} hint="2 containers out" />
            <StatCard tone="points" label="Green Points" value="240" hint="60 more for the next reward" />
            <StatCard label="Containers returned" value="18" hint="This semester" demo />
          </div>
          <p className="muted">Deposits and Green Points are styled differently on purpose. Points are never shown in rupees.</p>
        </div>
      </section>

      <section className="ds-section">
        <h2>Demo settings</h2>
        <form className="ds-stack" onSubmit={saveDeposits} noValidate>
          <p className="prose muted">Deposits, the borrow period and Green Points are configuration, not hard-coded. They are demo values and not confirmed policy. This form saves to the browser and is read through <span className="mono">loadConfig()</span> everywhere.</p>
          <h3>Refundable deposits</h3>
          <div className="form-grid">
            {Object.values(CONTAINER_TYPES).map((t) => (
              <TextField key={t.id} label={t.label} type="number" inputMode="numeric" min="1" value={draft[t.id]} error={errors[t.id]}
                hint={`Demo default ${formatINR(DEFAULT_CONFIG.deposits[t.id])}`} onChange={(e) => setDraft((d) => ({ ...d, [t.id]: e.target.value }))} />
            ))}
          </div>
          <h3>Borrow period</h3>
          <div className="form-grid">
            <TextField label="Borrow period (hours)" type="number" inputMode="numeric" min="1" value={draft.borrowHours} error={errors.borrowHours}
              hint={`Demo default ${DEFAULT_CONFIG.borrowHours} hours`} onChange={(e) => setDraft((d) => ({ ...d, borrowHours: e.target.value }))} />
          </div>
          <h3>Green Points for an on-time return</h3>
          <div className="form-grid">
            {Object.values(CONTAINER_TYPES).map((t) => (
              <TextField key={t.id} label={t.short} type="number" inputMode="numeric" min="1" value={draft[`pts_${t.id}`]} error={errors[`pts_${t.id}`]}
                hint={`Demo default ${DEFAULT_CONFIG.points.onTimeReturn[t.id]} points`} onChange={(e) => setDraft((d) => ({ ...d, [`pts_${t.id}`]: e.target.value }))} />
            ))}
          </div>
          <div className="ds-row">
            <Button type="submit">Save demo settings</Button>
            <Button variant="ghost" icon={RotateCcw} onClick={() => { const c = resetConfig(); setConfig(c); setDraft(toDraft(c)); setErrors({}); push({ tone: 'info', title: 'Demo settings reset to defaults' }); }}>Reset to defaults</Button>
          </div>
          <p className="muted">Current: {Object.values(CONTAINER_TYPES).map((t) => `${t.short} ${formatINR(config.deposits[t.id])}`).join(', ')}. Borrow period {config.borrowHours} h. Points per return: {Object.values(CONTAINER_TYPES).map((t) => `${t.short} ${config.points.onTimeReturn[t.id]}`).join(', ')}.</p>
        </form>
      </section>

      <section className="ds-section">
        <h2>Table</h2>
        <div className="ds-stack">
          <DataTable columns={columns} rows={ROWS} caption="Sample containers" />
          <DemoTag>Demo data, resize below 640px to see the stacked layout</DemoTag>
        </div>
      </section>

      <section className="ds-section">
        <h2>QR</h2>
        <div className="ds-two">
          <QRDisplay value={buildStudentQR('PFC-STU-1042')} code="PFC-STU-1042" caption="Asha R. (demo student)" />
          <div className="ds-stack">
            <QRScanner
              expect="any"
              onScan={(p) => setScanned(p)}
              samples={[
                { label: 'Student PFC-STU-1042', value: buildStudentQR('PFC-STU-1042') },
                { label: 'Cup PFC-CUP-0142', value: buildContainerQR('PFC-CUP-0142') },
              ]}
            />
            {scanned && <p role="status">Read a <strong>{scanned.kind}</strong> code: <span className="mono">{scanned.id}</span></p>}
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2>Feedback</h2>
        <div className="ds-row">
          <Button variant="secondary" onClick={() => setModal(true)}>Open dialog</Button>
          <Button variant="secondary" onClick={() => push({ title: 'Container issued', message: 'PFC-CUP-0142 to Asha R. Deposit ₹20 recorded.' })}>Success toast</Button>
          <Button variant="secondary" onClick={() => push({ tone: 'danger', title: 'Code not recognised', message: 'Check the label and try again.' })}>Error toast</Button>
        </div>
        <Modal open={modal} onClose={() => setModal(false)} title="Confirm return" footer={<><Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button><Button onClick={() => { setModal(false); push({ title: 'Return verified' }); }}>Verify return</Button></>}>
          <p>Check the container is clean and undamaged before confirming. The deposit of {formatINR(20)} will be refunded and 10 Green Points credited.</p>
        </Modal>
      </section>
    </div>
  );
}
