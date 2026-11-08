import { useCallback, useState } from 'react';
import { Camera, CameraOff, ScanLine } from 'lucide-react';
import Button from '../ui/Button';
import { TextField } from '../ui/Field';
import { useQRScanner } from '../../hooks/useQRScanner';
import { parseQR } from '../../utils/qr';

/**
 * Staff scanning surface.
 *  expect:  'student' | 'container' | 'any'  (rejects the wrong kind with a clear message)
 *  onScan:  receives { kind, id }
 *  samples: [{ label, value }] demo codes that act like a scan, for demos without a camera
 */
export default function QRScanner({ expect = 'any', onScan, samples = [] }) {
  const [camera, setCamera] = useState(false);
  const [manual, setManual] = useState('');
  const [error, setError] = useState('');

  const handle = useCallback(
    (raw) => {
      const parsed = parseQR(raw);
      if (!parsed) return setError('That is not a Plastic-Free Campus code. Check the label and try again.');
      if (expect !== 'any' && parsed.kind !== expect) {
        return setError(expect === 'student' ? 'That is a container code. Scan the student QR here.' : 'That is a student code. Scan the container QR here.');
      }
      setError('');
      setManual('');
      onScan(parsed);
    },
    [expect, onScan],
  );

  const { videoRef, status } = useQRScanner({ enabled: camera, onScan: handle });

  const idleMessage = {
    idle: 'Point the camera at a QR code, or type or pick a code below.',
    starting: 'Starting camera…',
    denied: 'Camera access was blocked. Allow it in the browser settings, or use a code below.',
    unsupported: 'Camera scanning is not available in this browser. Type a code or pick a demo code.',
  }[status];

  return (
    <div className="scanner">
      <div className="scanner__view">
        <video ref={videoRef} muted playsInline hidden={status !== 'scanning'} />
        {status !== 'scanning' && (
          <div className="scanner__idle">
            <ScanLine size={28} aria-hidden="true" />
            <p>{idleMessage}</p>
          </div>
        )}
        <svg className="scan-frame" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M8 28V12a4 4 0 0 1 4-4h16" />
          <path d="M72 8h16a4 4 0 0 1 4 4v16" />
          <path d="M92 72v16a4 4 0 0 1-4 4H72" />
          <path d="M28 92H12a4 4 0 0 1-4-4V72" />
        </svg>
        {status === 'scanning' && <span className="scan-sweep" aria-hidden="true" />}
      </div>

      <div>
        <Button variant="secondary" size="sm" icon={camera ? CameraOff : Camera} onClick={() => setCamera((v) => !v)} aria-pressed={camera}>
          {camera ? 'Stop camera' : 'Use camera'}
        </Button>
      </div>

      <form
        className="input-row"
        onSubmit={(e) => {
          e.preventDefault();
          handle(manual);
        }}
      >
        <TextField
          label="Type or paste a code"
          placeholder={expect === 'student' ? 'PFC-STU-1042' : 'PFC-CUP-0142'}
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
        <Button type="submit" disabled={!manual.trim()}>Check code</Button>
      </form>

      {samples.length > 0 && (
        <div>
          <p className="field__hint" style={{ marginBottom: '0.4rem' }}>Demo codes</p>
          <div className="scanner__samples">
            {samples.map((s) => (
              <button key={s.value} type="button" className="chip-btn" onClick={() => handle(s.value)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className={`scanner__status${error ? ' scanner__status--error' : ''}`} role="status" aria-live="polite">{error}</p>
    </div>
  );
}
