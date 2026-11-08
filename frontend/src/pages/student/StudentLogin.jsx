import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function StudentLogin() {
  const navigate = useNavigate();
  const { loginStudent } = useAuth();
  
  const [formData, setFormData] = useState({ studentId: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.studentId.trim() || !formData.password.trim()) {
      setError('Please fill in both Student ID and Password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      loginStudent({
        id: formData.studentId,
        name: 'Alex Johnson',
        email: `${formData.studentId.toLowerCase()}@student.edu`,
        points: 450,
        walletBalance: 120.00
      });
      setLoading(false);
      navigate('/student/dashboard');
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
              <Shield size={26} />
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Student Portal</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Sign in to manage reusable containers & wallet
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
                Student ID / Roll No.
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="e.g. STU9842"
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
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
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
              <span>{loading ? 'Authenticating...' : 'Sign In as Student'}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
            <Link to="/student/register" style={{ color: 'var(--brand, #10b981)', fontWeight: 700, textDecoration: 'none' }}>
              Register Student Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}