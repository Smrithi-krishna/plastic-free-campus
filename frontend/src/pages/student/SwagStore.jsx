import React, { useState } from 'react';
import { Gift, CheckCircle2, ShoppingBag } from 'lucide-react';

const ITEMS = [
  { id: 1, name: 'Eco-Friendly Campus Hoodie', cost: 350, stock: 12, category: 'Merchandise' },
  { id: 2, name: 'Stainless Steel Water Bottle', cost: 250, stock: 25, category: 'Accessories' },
  { id: 3, name: 'Central Canteen ₹50 Food Voucher', cost: 100, stock: 150, category: 'Vouchers' },
  { id: 4, name: 'Organic Cotton Tote Bag', cost: 150, stock: 40, category: 'Accessories' },
];

export default function SwagStore() {
  const [points, setPoints] = useState(450);
  const [msg, setMsg] = useState('');

  const handleRedeem = (item) => {
    if (points < item.cost) {
      setMsg('Not enough Green Points!');
      setTimeout(() => setMsg(''), 2500);
      return;
    }
    setPoints(prev => prev - item.cost);
    setMsg(`Successfully redeemed ${item.name}! Check your notifications for pickup/voucher details.`);
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Swag & Reward Store
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Spend your Green Points on exclusive sustainable merch and canteen discounts.
          </p>
        </div>
        <div style={{ padding: '0.75rem 1.25rem', borderRadius: '14px', backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', fontWeight: 800, color: 'var(--brand)' }}>
          Available Points: {points} pts
        </div>
      </div>

      {msg && (
        <div style={{ padding: '1rem', borderRadius: '14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--brand)', fontWeight: 700 }}>
          {msg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {ITEMS.map((item) => (
          <div key={item.id} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '22px', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563eb' }}>
                {item.category}
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.75rem 0 0.35rem 0' }}>{item.name}</h3>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand)' }}>{item.cost} Green Points</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stock: {item.stock} left</span>
              <button
                onClick={() => handleRedeem(item)}
                style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', backgroundColor: points >= item.cost ? 'var(--brand)' : 'var(--border)', color: points >= item.cost ? '#ffffff' : 'var(--text-muted)', fontWeight: 700, border: 'none', cursor: points >= item.cost ? 'pointer' : 'not-allowed' }}
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}