import React, { useState } from 'react';
import { QrCode, ShieldCheck, RefreshCw, Copy, Check, Smartphone } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function MyQR() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const studentId = user?.id || 'STU9842';

  const handleCopy = () => {
    navigator.clipboard.writeText(`PFC-STUDENT-${studentId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          My Student Digital QR ID
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Present this secure QR code at campus canteens to instantly borrow or return reusable containers.
        </p>
      </div>

      <div style={{ 
        backgroundColor: 'var(--surface-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '24px', 
        padding: '3rem 2rem', 
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
      }}>
        <div style={{ 
          width: '220px', 
          height: '220px', 
          margin: '0 auto 1.75rem auto', 
          backgroundColor: '#ffffff', 
          border: '4px solid var(--brand)', 
          borderRadius: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)'
        }}>
          <QrCode size={160} color="#111827" />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            {user?.name || 'Alex Johnson'}
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            ID: <strong style={{ color: 'var(--brand)' }}>{studentId}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-main)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={18} color="var(--brand)" /> : <Copy size={18} />}
            <span>{copied ? 'Copied ID Code!' : 'Copy Student ID'}</span>
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <Smartphone size={24} color="var(--brand)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Quick Scanning Tip</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Make sure your screen brightness is turned up when scanning at canteen checkpoints. Your QR token auto-refreshes for security.
          </p>
        </div>
      </div>
    </div>
  );
}