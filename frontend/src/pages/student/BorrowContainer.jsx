import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QrCode, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function BorrowContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const preselect = queryParams.get('container') || 'CNT-101';

  const [containerId, setContainerId] = useState(preselect);
  const [canteen, setCanteen] = useState('Central Campus Canteen');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBorrow = (e) => {
    e.preventDefault();
    setError('');

    if (!containerId.trim()) {
      setError('Please provide a valid container ID or scan QR.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const existing = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');
      const newBorrow = {
        id: containerId,
        name: containerId === 'CNT-102' ? 'Insulated Thermal Soup Bowl' : 'Stainless Steel Lunchbox (Large)',
        canteen: canteen,
        borrowDate: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dueDate: 'Within 48 hours',
        deposit: '₹50',
        status: 'Active'
      };
      localStorage.setItem('pfc_borrowed', JSON.stringify([newBorrow, ...existing]));

      setTimeout(() => {
        navigate('/student/containers');
      }, 1500);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Borrow Container
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Scan the container QR code at the canteen counter to verify checkout and secure deposit.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
        
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Borrow Successful!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Container <strong>{containerId}</strong> successfully assigned to your student profile. ₹50 held as refundable deposit.
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--brand)', fontWeight: 600 }}>Redirecting to My Containers...</div>
          </div>
        ) : (
          <form onSubmit={handleBorrow} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.875rem' }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Container QR / ID Code
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
                Select Canteen Station
              </label>
              <select
                value={canteen}
                onChange={(e) => setCanteen(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }}
              >
                <option value="Central Campus Canteen">Central Campus Canteen</option>
                <option value="North Block Cafeteria">North Block Cafeteria</option>
                <option value="Library Snack Kiosk">Library Snack Kiosk</option>
                <option value="Hostel Mess Block A">Hostel Mess Block A</option>
              </select>
            </div>

            <div style={{ padding: '1rem', borderRadius: '14px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Simulated Deposit:</span>
                <strong style={{ color: 'var(--text-main)' }}>₹50.00 (Refundable)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Return Window:</span>
                <strong style={{ color: 'var(--brand)' }}>48 Hours</strong>
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
              <span>{loading ? 'Verifying & Holding Deposit...' : 'Confirm & Borrow Container'}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}