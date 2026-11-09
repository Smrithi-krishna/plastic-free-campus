import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, PlusCircle } from 'lucide-react';

const INITIAL_CLEANING = [
  { batchId: 'BAT-401', items: 18, station: 'Central Sanitization Hub', status: 'In Wash Cycle' },
  { batchId: 'BAT-402', items: 12, station: 'North Block Kitchen', status: 'Drying & Inspection' },
];

export default function CleaningManagement() {
  const [cleaningBatches, setCleaningBatches] = useState(() => {
    const saved = localStorage.getItem('pfc_cleaning');
    return saved ? JSON.parse(saved) : INITIAL_CLEANING;
  });

  const [batchId, setBatchId] = useState('');
  const [itemsCount, setItemsCount] = useState('15');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('pfc_cleaning', JSON.stringify(cleaningBatches));
  }, [cleaningBatches]);

  const handleAddBatch = (e) => {
    e.preventDefault();
    if (!batchId.trim()) return;

    const newBatch = {
      batchId: batchId.toUpperCase(),
      items: parseInt(itemsCount, 10) || 10,
      station: 'Central Sanitization Hub',
      status: 'In Wash Cycle'
    };

    setCleaningBatches([newBatch, ...cleaningBatches]);
    setBatchId('');
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Sanitization & Cleaning Hub
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Track washing batches and restore sanitized containers back into active canteen stock.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}
        >
          <PlusCircle size={18} />
          <span>New Washing Batch</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddBatch} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>Register New Cleaning Batch</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              required
              placeholder="Batch ID (e.g. BAT-403)"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
            />
            <input
              type="number"
              min="1"
              required
              placeholder="Number of Container Units"
              value={itemsCount}
              onChange={(e) => setItemsCount(e.target.value)}
              style={{ padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Start Cleaning Batch
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {cleaningBatches.map((item, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}>
                {item.status}
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand)' }}>{item.items || 10} Units</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Batch {item.batchId || item.id}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Station: {item.station || 'Central Sanitization Hub'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}