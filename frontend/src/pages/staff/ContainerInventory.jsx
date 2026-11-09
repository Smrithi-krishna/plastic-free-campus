import React from 'react';
import { Package, CheckCircle2 } from 'lucide-react';

const INVENTORY = [
  { id: 'CNT-101', name: 'Stainless Steel Lunchbox (Large)', total: 50, available: 42, status: 'Healthy Stock' },
  { id: 'CNT-102', name: 'Insulated Thermal Soup Bowl', total: 30, available: 15, status: 'Moderate Stock' },
  { id: 'CNT-103', name: 'Stainless Steel Tumbler (500ml)', total: 80, available: 68, status: 'Healthy Stock' },
  { id: 'CNT-104', name: 'Bento Compartment Box', total: 40, available: 3, status: 'Low Stock' }
];

export default function ContainerInventory() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Container Inventory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Real-time stock tracking of all reusable containers across campus stations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {INVENTORY.map((item, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: item.available > 10 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: item.available > 10 ? 'var(--brand)' : '#d97706' }}>
                  {item.status}
                </span>
                <Package size={20} color="var(--brand)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{item.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID: {item.id}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Available: <strong style={{ color: 'var(--text-main)' }}>{item.available}</strong></span>
              <span style={{ color: 'var(--text-muted)' }}>Total Fleet: <strong style={{ color: 'var(--text-main)' }}>{item.total}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}