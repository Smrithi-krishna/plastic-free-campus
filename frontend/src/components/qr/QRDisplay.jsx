import { QRCodeSVG } from 'qrcode.react';

/**
 * Always dark-on-white, even in dark mode, because scanners need the contrast.
 * `value` is the encoded payload; `code` is shown underneath in monospace for manual entry.
 */
export default function QRDisplay({ value, size = 208, code, caption }) {
  return (
    <figure className="qr" style={{ width: '100%', maxWidth: size + 30 }}>
      <div className="qr__tile">
        <QRCodeSVG value={value} size={size} level="M" fgColor="#12392b" bgColor="#ffffff" marginSize={0} title={`QR code for ${code ?? value}`} />
      </div>
      <figcaption>
        {code && <span className="mono" style={{ color: 'var(--text)', fontWeight: 500 }}>{code}</span>}
        {code && caption && <br />}
        {caption}
      </figcaption>
    </figure>
  );
}
