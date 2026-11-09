import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, Edit3, Save, X } from 'lucide-react';

const INITIAL_INVENTORY = [
  { id: 'CNT-101', name: 'Stainless Steel Lunchbox (Large)', canteen: 'Central Campus Canteen', stock: 42, deposit: '₹50' },
  { id: 'CNT-102', name: 'Insulated Thermal Soup Bowl', canteen: 'North Block Cafeteria', stock: 15, deposit: '₹40' },
  { id: 'CNT-103', name: 'Stainless Steel Tumbler (500ml)', canteen: 'Library Snack Kiosk', stock: 68, deposit: '₹30' },
  { id: 'CNT-104', name: 'Bento Compartment Box', canteen: 'Central Campus Canteen', stock: 13, deposit: '₹60' },
];

export default function ContainerInventory() {
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('pfc_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [editingItem, setEditingItem] = useState(null);
  const [newStockVal, setNewStockVal] = useState('');

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('pfc_inventory');
      if (saved) setInventory(JSON.parse(saved));
    };
    window.addEventListener('focus', handleStorage);
    return () => window.removeEventListener('focus', handleStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('pfc_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setNewStockVal(item.stock.toString());
  };

  const handleSaveStock = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = inventory.map(item => {
      if (item.id === editingItem.id) {
        return { ...item, stock: parseInt(newStockVal, 10) || 0 };
      }
      return item;
    });

    setInventory(updated);
    setEditingItem(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Container Inventory Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            View live stock counts across campus canteens and adjust available quantities.
          </p>
        </div>
        <Link 
          to="/staff/add-container"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}
        >
          <PlusCircle size={18} />
          <span>Add New Stock Unit</span>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {inventory.map((item) => (
          <div key={item.id} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand)' }}>{item.id}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>Deposit: {item.deposit}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>{item.name}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.canteen}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available Stock:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand)' }}>{item.stock} units</div>
              </div>
              <button
                onClick={() => handleOpenEdit(item)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.9rem', borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <Edit3 size={15} />
                <span>Update Stock</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Update Stock Quantity</h3>
              <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStock} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  New Available Units Count
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newStockVal}
                  onChange={(e) => setNewStockVal(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '1rem', fontWeight: 700, outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Save size={18} />
                <span>Save Quantity Changes</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}