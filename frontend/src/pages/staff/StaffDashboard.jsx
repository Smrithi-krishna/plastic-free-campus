import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, QrCode, CheckCircle2, AlertTriangle, Users, PackageCheck, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function StaffDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Staff Welcome Banner */}
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
            backgroundColor: 'rgba(59, 130, 246, 0.12)', 
            color: '#2563eb',
            fontWeight: 700,
            fontSize: '0.8rem',
            marginBottom: '0.75rem'
          }}>
            <Building2 size={14} />
            <span>Authorized Canteen Station</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            {user?.name || 'Manager Sarah'} • Staff Portal
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Location: <strong style={{ color: 'var(--text-main)' }}>{user?.location || 'Central Campus Canteen'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            to="/staff/issue" 
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
            <span>Issue Container</span>
          </Link>
        </div>
      </div>

      {/* Staff Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Issued Today</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--brand, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PackageCheck size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>142</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--brand)', fontWeight: 600 }}>+18% compared to yesterday</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pending Returns</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>38</div>
          <div style={{ fontSize: '0.8rem', color: '#d97706' }}>Due for return today</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Clean Stock Available</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>215</div>
          <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>Sanitized & Ready</div>
        </div>

      </div>

      {/* Quick Staff Tools */}
      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
          Staff Management Operations
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <Link to="/staff/issue" style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <QrCode size={22} style={{ color: 'var(--brand)' }} /> Issue Container
          </Link>

          <Link to="/staff/verify-return" style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <RefreshCw size={22} style={{ color: '#2563eb' }} /> Verify Return
          </Link>

          <Link to="/staff/inventory" style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <PackageCheck size={22} style={{ color: '#d97706' }} /> Container Inventory
          </Link>
        </div>
      </div>

    </div>
  );
}