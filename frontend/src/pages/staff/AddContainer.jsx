import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AddContainer() {
  const navigate = useNavigate();
  const [containerId, setContainerId] = useState('');
  const [name, setName] = useState('');
  const [canteen, setCanteen] = useState('Central Campus Canteen');
  const [stock, setStock] = useState('25');
  const [deposit, setDeposit] = useState('₹50');
  const [success, setSuccess] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !containerId.trim()) return;

    const newItem = {
      id: containerId.toUpperCase(),
      name: name.trim(),
      canteen,
      stock: parseInt(stock, 10) || 10,
      deposit
    };

    // Load fresh inventory list from localStorage
    const saved = localStorage.getItem('pfc_inventory');
    const existing = saved ? JSON.parse(saved) : [
      { id: 'CNT-101', name: 'Stainless Steel Lunchbox (Large)', canteen: 'Central Campus Canteen', stock: 42, deposit: '₹50' },
      { id: 'CNT-102', name: 'Insulated Thermal Soup Bowl', canteen: 'North Block Cafeteria', stock: 15, deposit: '₹40' },
      { id: 'CNT-103', name: 'Stainless Steel Tumbler (500ml)', canteen: 'Library Snack Kiosk', stock: 68, deposit: '₹30' },
      { id: 'CNT-104', name: 'Bento Compartment Box', canteen: 'Central Campus Canteen', stock: 13, deposit: '₹60' },
    ];

    const updated = [newItem, ...existing.filter(item => item.id !== newItem.id)];
    localStorage.setItem('pfc_inventory', JSON.stringify(updated));

    // Notify other components of localStorage change
    window.dispatchEvent(new Event('storage'));

    setSuccess(true);
    setTimeout(() => {
      navigate('/staff/inventory');
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Add New Container Stock
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Register new reusable container batches into campus inventory stock.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem' }}>
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Stock Item Added!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Container <strong>{name}</strong> registered into inventory.
            </p>
          </div>
        ) : (
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Container Model / Description Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Stainless Steel Salad Bowl"
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Container Barcode / Batch Code ID
              </label>
              <input
                type="text"
                required
                value={containerId}
                onChange={(e) => setContainerId(e.target.value)}
                placeholder="e.g. CNT-106"
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Assigned Canteen Station
              </label>
              <select
                value={canteen}
                onChange={(e) => setCanteen(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, outline: 'none' }}
              >
                <option value="Central Campus Canteen">Central Campus Canteen</option>
                <option value="North Block Cafeteria">North Block Cafeteria</option>
                <option value="Library Snack Kiosk">Library Snack Kiosk</option>
                <option value="Hostel Mess Block A">Hostel Mess Block A</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Initial Stock Units</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Deposit Amount</label>
                <input
                  type="text"
                  required
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{ width: '100%', padding: '0.95rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
            >
              <span>Save & Add to Inventory</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}