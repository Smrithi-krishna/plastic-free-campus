import React from 'react';
import { Leaf, Award, TrendingUp, ShieldCheck } from 'lucide-react';

export default function ImpactDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          My Environmental Impact
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Your personal contribution to reducing campus single-use plastic waste.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '22px', padding: '1.75rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>Single-Use Plastics Avoided</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--brand)', marginBottom: '0.25rem' }}>84 items</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Equivalent to 3.2 kg of pure plastic waste prevented</div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '22px', padding: '1.75rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>Carbon Footprint Saved</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.25rem' }}>14.5 kg CO₂</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calculated via standard lifecycle analyses</div>
        </div>
      </div>
    </div>
  );
}