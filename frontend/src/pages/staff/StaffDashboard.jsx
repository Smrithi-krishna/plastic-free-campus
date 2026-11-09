import React from 'react';
import { Link } from 'react-router-dom';
import { Package, RefreshCw, AlertTriangle, CheckCircle2, PlusCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function StaffDashboard() {
  // Read directly from localStorage on every render so it updates instantly when navigating here
  const studentBorrowed = JSON.parse(localStorage.getItem('pfc_borrowed') || '[]');
  const staffIssued = JSON.parse(localStorage.getItem('pfc_staff_issued') || '[]');
  const activeCheckouts = studentBorrowed.length + staffIssued.length;

  const inventory = JSON.parse(localStorage.getItem('pfc_inventory') || '[]');
  const inventoryCount = inventory.length > 0 
    ? inventory.reduce((acc, curr) => acc + (parseInt(curr.stock, 10) || 0), 0) 
    : 138;

  const damaged = JSON.parse(localStorage.getItem('pfc_damaged') || '[]');
  const cleaning = JSON.parse(localStorage.getItem('pfc_cleaning') || '[]');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Staff Operations Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Real-time oversight for container inventory, active checkouts, returns, and sanitation workflows.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        
        {/* Active Checked Out Card */}
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Checked Out</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
            {activeCheckouts}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>
            {activeCheckouts === 0 ? 'No active checkouts' : `${activeCheckouts} item(s) checked out`}
          </div>
        </div>

        {/* Inventory Stock Card */}
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Inventory Stock</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{inventoryCount} units</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--brand)', fontWeight: 600 }}>Across campus canteens</div>
        </div>

        {/* Cleaning Cycle Card */}
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>In Cleaning Cycle</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{cleaning.length} units</div>
          <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 600 }}>Sanitization in progress</div>
        </div>

        {/* Damaged Card */}
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Flagged / Damaged</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>{damaged.length} units</div>
          <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600 }}>Requires staff inspection</div>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>Counter Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link to="/staff/verify-student" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>
              <span>Verify Student ID & Profile</span>
              <ShieldCheck size={18} color="var(--brand)" />
            </Link>
            <Link to="/staff/issue" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>
              <span>Issue Container to Student</span>
              <ArrowUpRight size={18} color="var(--text-muted)" />
            </Link>
            <Link to="/staff/verify-return" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>
              <span>Verify & Scan Return</span>
              <ArrowUpRight size={18} color="var(--text-muted)" />
            </Link>
            <Link to="/staff/add-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 600 }}>
              <span>Add New Stock Unit</span>
              <PlusCircle size={18} color="var(--text-muted)" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}