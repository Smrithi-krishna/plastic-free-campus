import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, KeyRound, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function StaffLogin() {
  const navigate = useNavigate();
  const { loginStaff } = useAuth();

  const [formData, setFormData] = useState({ staffId: '', accessPin: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.staffId.trim() || !formData.accessPin.trim()) {
      setError('Please provide your Staff ID and PIN.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      loginStaff({
        id: formData.staffId,
        name: 'Manager Sarah',
        location: 'Central Campus Canteen',
        role: 'staff'
      });
      setLoading(false);
      navigate('/staff/dashboard');
    }, 600);
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
        <div style={{ 
          maxWidth: '440px', 
          width: '100%', 
          backgroundColor: 'var(--surface-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '24px', 
          padding: '2.5rem', 
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '52px', 
              height: '52px', 
              borderRadius: '16px', 
              backgroundColor: 'var(--brand-subtle, rgba(16, 185, 129, 0.15))', 
              color: 'var(--brand, #10b981)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1rem auto' 
            }}>
              <Building2 size={26} />
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Staff & Canteen Portal</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Access container issuing, returns, cleaning & inventory
            </p>
          </div>

          {error && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.85rem 1rem', 
              borderRadius: '12px', 
              backgroundColor: 'rgba(239, 68, 68, 0.15)', 
              border: '1px solid rgba(239, 68, 68, 0.3)', 
              color: '#ef4444', 
              fontSize: '0.875rem',
              marginBottom: '1.5rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Staff / Canteen ID
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Building2 size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  value={formData.staffId}
                  onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                  placeholder="e.g. CAN-01"
                  style={{ 
                    width: '100%', 
                    padding: '0.85rem 1rem 0.85rem 2.6rem', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border)', 
                    backgroundColor: 'var(--surface)', 
                    color: 'var(--text-main)', 
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Security Access PIN
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <KeyRound size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  required
                  value={formData.accessPin}
                  onChange={(e) => setFormData({ ...formData, accessPin: e.target.value })}
                  placeholder="••••"
                  maxLength={6}
                  style={{ 
                    width: '100%', 
                    padding: '0.85rem 1rem 0.85rem 2.6rem', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border)', 
                    backgroundColor: 'var(--surface)', 
                    color: 'var(--text-main)', 
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '0.9rem', 
                borderRadius: '12px', 
                backgroundColor: 'var(--brand, #10b981)', 
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
              <span>{loading ? 'Verifying PIN...' : 'Access Staff Portal'}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <p>Authorized Canteen Staff & Recycling Coordinators Only.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}