import React, { useState, useEffect } from 'react';
import { AlertTriangle, PlusCircle, CheckCircle2 } from 'lucide-react';

const INITIAL_DAMAGED = [
  { id: 'CNT-089', name: 'Insulated Soup Bowl', reason: 'Cracked handle border', date: 'Yesterday', status: 'Pending Repair' },
  { id: 'CNT-045', name: 'Stainless Lunchbox', reason: 'Dented locking latch', date: '3 days ago', status: 'Scrapped' },
];

export default function DamagedContainers() {
  const [damagedList, setDamagedList] = useState(() => {
    const saved = localStorage.getItem('pfc_damaged');
    return saved ? JSON.parse(saved) : INITIAL_DAMAGED;
  });

  const [containerId, setContainerId] = useState('');
  const [reason, setReason] = useState('Dented frame / latch damage');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('pfc_damaged', JSON.stringify(damagedList));
  }, [damagedList]);

  const handleReportDamaged = (e) => {
    e.preventDefault();
    if (!containerId.trim()) return;

    const newItem = {
      id: containerId.toUpperCase(),
      name: `Container (${containerId.toUpperCase()})`,
      reason: reason,
      date: 'Just now',
      status: 'Pending Inspection'
    };

    setDamagedList([newItem, ...damagedList]);
    setContainerId('');
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Damaged Container Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Flag damaged units, track repairs, or decommission unserviceable stock.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '12px', backgroundColor: '#ef4444', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}
        >
          <PlusCircle size={18} />
          <span>Flag Damaged Container</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleReportDamaged} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>Flag Damaged Container Unit</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              required
              placeholder="Container ID (e.g. CNT-105)"
              value={containerId}
              onChange={(e) => setContainerId(e.target.value)}
              style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
            />
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, outline: 'none' }}
            >
              <option value="Dented frame / latch damage">Dented frame / latch damage</option>
              <option value="Deep surface scratches">Deep surface scratches</option>
              <option value="Missing lid / gasket seal">Missing lid / gasket seal</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: '#ef4444', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Save Flagged Damage Report
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {damagedList.map((item, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
                {item.status}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{item.id} - {item.name}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Reason: {item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}