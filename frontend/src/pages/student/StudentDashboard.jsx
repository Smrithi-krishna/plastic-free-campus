import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Wallet, Award, ArrowUpRight, ArrowDownRight, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [points, setPoints] = useState(450);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem('pfc_user_points');
    if (savedPoints) setPoints(parseInt(savedPoints, 10));

    const savedBorrowed = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');
    setActiveCount(savedBorrowed.length);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div style={{ 
        backgroundColor: 'var(--surface-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '24px', 
        padding: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <div>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '9999px', 
            backgroundColor: 'rgba(16, 185, 129, 0.12)', 
            color: 'var(--brand, #10b981)',
            fontWeight: 700,
            fontSize: '0.8rem',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={14} />
            <span>Active Student Loop Member</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Welcome back, {user?.name || 'Alex'}! 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Student ID: <strong style={{ color: 'var(--text-main)' }}>{user?.id || 'STU9842'}</strong> • Campus Eco-Dining Ecosystem
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            to="/student/qr" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.75rem 1.25rem', 
              borderRadius: '12px', 
              backgroundColor: 'var(--brand, #10b981)', 
              color: '#ffffff', 
              fontWeight: 700, 
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <QrCode size={18} />
            <span>My QR Code</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Green Points</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--brand, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            {points} pts
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--brand, #10b981)', fontWeight: 600 }}>
            Earn +50 pts per return
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Wallet Balance</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            ₹120.00
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Refundable deposits active
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Containers</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            {activeCount} Borrowed
          </div>
          <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 600 }}>
            {activeCount > 0 ? 'Due within 48 hours' : 'All returned!'}
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link to="/student/borrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <QrCode size={20} style={{ color: 'var(--brand)' }} /> Borrow New Container
              </span>
              <ArrowUpRight size={18} style={{ color: 'var(--text-muted)' }} />
            </Link>

            <Link to="/student/return" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <RefreshCw size={20} style={{ color: '#2563eb' }} /> Return Container
              </span>
              <ArrowDownRight size={18} style={{ color: 'var(--text-muted)' }} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}