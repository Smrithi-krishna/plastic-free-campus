import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, QrCode, CheckCircle2, Clock, MapPin, ArrowUpRight } from 'lucide-react';

const INITIAL_BORROWED = [
  { id: 'CNT-101', name: 'Stainless Steel Lunchbox (Large)', canteen: 'Central Campus Canteen', borrowDate: 'Today, 12:30 PM', dueDate: 'In 36 hours', deposit: '₹50', status: 'Active' }
];

export default function MyContainers() {
  const [borrowed, setBorrowed] = useState(() => {
    const saved = localStorage.getItem('pfc_borrowed');
    return saved ? JSON.parse(saved) : INITIAL_BORROWED;
  });

  useEffect(() => {
    localStorage.setItem('pfc_borrowed', JSON.stringify(borrowed));
  }, [borrowed]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            My Borrowed Containers
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Track your active container checkouts, return due dates, and deposit holds in real-time.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link 
            to="/student/borrow"
            style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}
          >
            Borrow New
          </Link>
          <Link 
            to="/student/return"
            style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}
          >
            Return Container
          </Link>
        </div>
      </div>

      {borrowed.length === 0 ? (
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <CheckCircle2 size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Active Containers</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            You have returned all borrowed containers. Ready for your next meal?
          </p>
          <Link 
            to="/student/find"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}
          >
            <span>Find Available Containers</span>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {borrowed.map((item, index) => (
            <div key={index} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '22px', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '9999px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                    {item.status || 'Active'}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>Deposit: {item.deposit || '₹50'}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{item.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={16} />
                    <span>{item.canteen}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={16} />
                    <span>Borrowed: {item.borrowDate}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d97706' }}>
                  Due: {item.dueDate}
                </span>
                <Link 
                  to="/student/return"
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--brand)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textDecoration: 'none'
                  }}
                >
                  Return
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}