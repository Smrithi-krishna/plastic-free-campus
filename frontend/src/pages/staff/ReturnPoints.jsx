import React from 'react';
import { MapPin } from 'lucide-react';

const POINTS = [
  { name: 'Central Campus Automated Drop-Bin', status: 'Active', capacity: '85%' },
  { name: 'North Block Canteen Counter', status: 'Active', capacity: '40%' },
  { name: 'Library Kiosk Return Bin', status: 'Active', capacity: '60%' }
];

export default function ReturnPoints() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Return Points & Drop-Bins
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Monitor drop-bin capacity levels across campus return stations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {POINTS.map((point, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin size={22} color="var(--brand)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>{point.name}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status: <strong style={{ color: 'var(--brand)' }}>{point.status}</strong></span>
              <span style={{ color: 'var(--text-muted)' }}>Bin Fill: <strong style={{ color: 'var(--text-main)' }}>{point.capacity}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}