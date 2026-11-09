import React, { useState } from 'react';
import { ShieldCheck, Search, Award, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';

export default function VerifyStudent() {
  const [studentQuery, setStudentQuery] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!studentQuery.trim()) return;

    setSearched(true);
    const points = localStorage.getItem('pfc_user_points') || '450';
    const borrowed = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');

    setStudentData({
      id: studentQuery.toUpperCase(),
      name: studentQuery.toUpperCase().includes('STU') ? 'Alex Johnson' : studentQuery,
      email: 'student@campus.edu',
      points: points,
      activeContainers: borrowed.length,
      status: 'Active Eco-Member'
    });
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Verify Student Profile & Status
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Scan or enter a student ID to inspect membership status, active checkouts, and Green Points at the counter.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              required
              placeholder="Enter Student ID (e.g. STU9842)"
              value={studentQuery}
              onChange={(e) => setStudentQuery(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.6rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            Verify ID
          </button>
        </form>
      </div>

      {searched && studentData && (
        <div style={{ backgroundColor: 'var(--surface-card)', border: '2px solid var(--brand)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>{studentData.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ID: <strong style={{ color: 'var(--brand)' }}>{studentData.id}</strong> • {studentData.status}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Green Points</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand)' }}>{studentData.points} pts</div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Active Checkouts</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2563eb' }}>{studentData.activeContainers} Units</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}