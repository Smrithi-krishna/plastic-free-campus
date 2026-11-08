import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function VerifyStudent() {
  const [query, setQuery] = useState('');
  const [student, setStudent] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    if (query.toUpperCase() === 'STU9842' || query.toLowerCase().includes('alex')) {
      setStudent({
        id: 'STU9842',
        name: 'Alex Johnson',
        email: 'alex@student.edu',
        points: 450,
        activeContainers: 1,
        status: 'Good Standing'
      });
    } else {
      setStudent({
        id: query.toUpperCase(),
        name: 'Sample Student',
        email: 'student@campus.edu',
        points: 210,
        activeContainers: 0,
        status: 'Good Standing'
      });
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Verify Student Account
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Look up student membership status, active container holdings, and Green Points balance.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              required
              placeholder="Enter Student ID or Name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.6rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            Verify
          </button>
        </form>

        {searched && student && (
          <div style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {student.name[0]}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{student.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--brand)', fontWeight: 600 }}>ID: {student.id}</span>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)' }}>
                {student.status}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Green Points:</span> <strong style={{ color: 'var(--text-main)' }}>{student.points} pts</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Active Containers:</span> <strong style={{ color: 'var(--text-main)' }}>{student.activeContainers} checked out</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}