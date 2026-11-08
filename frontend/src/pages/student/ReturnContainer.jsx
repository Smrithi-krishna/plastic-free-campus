import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, CheckCircle2, QrCode, AlertCircle, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function ReturnContainer() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [containerId, setContainerId] = useState('CNT-101');
  const [returnPoint, setReturnPoint] = useState('Central Campus Automated Drop-Bin');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReturn = (e) => {
    e.preventDefault();
    setError('');

    if (!containerId.trim()) {
      setError('Please specify container ID to return.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      const existing = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');
      const updated = existing.filter(item => item.id !== containerId);
      localStorage.setItem('pfc_borrowed', JSON.stringify(updated));

      setTimeout(() => {
        navigate('/student/containers');
      }, 1800);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Return Container
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Drop container into any automated campus bin or scan QR at staff return counter for instant deposit refund.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
        
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Return Verified!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
              Container <strong>{containerId}</strong> successfully returned. ₹50 refunded to your wallet + <strong style={{ color: 'var(--brand)' }}>+50 Green Points</strong> earned!
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--brand)', fontWeight: 600 }}>Returning to My Containers...</div>
          </div>
        ) : (
          <form onSubmit={handleReturn} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.875rem' }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Container ID / QR Code
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <QrCode size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  value={containerId}
                  onChange={(e) => setContainerId(e.target.value)}
                  placeholder="e.g. CNT-101"
                  style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.6rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Return Station / Drop-Bin Location
              </label>
              <select
                value={returnPoint}
                onChange={(e) => setReturnPoint(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }}
              >
                <option value="Central Campus Automated Drop-Bin">Central Campus Automated Drop-Bin</option>
                <option value="North Block Canteen Counter">North Block Canteen Counter</option>
                <option value="Library Kiosk Return Bin">Library Kiosk Return Bin</option>
                <option value="Hostel Block A Return Station">Hostel Block A Return Station</option>
              </select>
            </div>

            <div style={{ padding: '1rem', borderRadius: '14px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand)', fontWeight: 700 }}>
                <Award size={18} />
                <span>Bonus Reward: +50 Green Points upon successful return</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '12px',
                backgroundColor: 'var(--brand)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                marginTop: '0.5rem'
              }}
            >
              <span>{loading ? 'Processing Return & Refunding...' : 'Confirm Return & Refund Deposit'}</span>
              {!loading && <RefreshCw size={18} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}