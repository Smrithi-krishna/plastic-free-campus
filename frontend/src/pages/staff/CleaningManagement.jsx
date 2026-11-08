import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export default function CleaningManagement() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Cleaning & Sterilization Log
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Track high-temperature sanitization batches and sanitation readiness.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
          <ShieldCheck size={30} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>All Stations Sanitized</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>215 containers ready for reissue in active circulation.</p>
      </div>
    </div>
  );
}