import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, CheckCircle2, AlertCircle, Award } from 'lucide-react';

export default function VerifyReturn() {
  const navigate = useNavigate();
  const [issuedList, setIssuedList] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [condition, setCondition] = useState('Clean / Intact');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const staffIssued = JSON.parse(localStorage.getItem('pfc_staff_issued') || '[]');
    const studentBorrowed = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');
    
    let combined = [...staffIssued, ...studentBorrowed.map(b => ({ ...b, studentId: 'STU9842' }))];
    
    // Fallback mock item so staff can always test return verification
    if (combined.length === 0) {
      combined = [{ id: 'CNT-101', name: 'Stainless Steel Lunchbox (Large)', studentId: 'STU9842', canteen: 'Central Campus Canteen' }];
    }

    setIssuedList(combined);
    setSelectedId(combined[0].id);
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      const staffIssued = JSON.parse(localStorage.getItem('pfc_staff_issued') || '[]');
      const studentBorrowed = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');

      localStorage.setItem('pfc_staff_issued', JSON.stringify(staffIssued.filter(i => i.id !== selectedId)));
      localStorage.setItem('pfc_borrowed', JSON.stringify(studentBorrowed.filter(i => i.id !== selectedId)));

      const currentPts = parseInt(localStorage.getItem('pfc_user_points') || '450', 10);
      localStorage.setItem('pfc_user_points', (currentPts + 50).toString());

      setTimeout(() => {
        setSuccess(false);
        navigate('/staff/dashboard');
      }, 1500);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Verify Container Return
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Inspect returned container condition, clear active checkouts, and process deposit refunds.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Return Verified!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Container <strong>{selectedId}</strong> cleared and deposit refunded.
            </p>
          </div>
        ) : (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Select Active Container to Verify Return
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }}
              >
                {issuedList.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.id} - {item.name || 'Container'} (Student: {item.studentId || 'STU9842'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Inspected Container Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }}
              >
                <option value="Clean / Intact">Clean / Good Condition</option>
                <option value="Needs Washing">Needs Commercial Sanitization</option>
                <option value="Damaged / Needs Repair">Damaged / Flagged</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '0.95rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)', marginTop: '0.5rem' }}
            >
              <span>{loading ? 'Verifying Return...' : 'Confirm Return & Refund Deposit'}</span>
              {!loading && <RefreshCw size={18} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}