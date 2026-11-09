import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, ShieldCheck, RefreshCw, PlusCircle, CreditCard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Wallet() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(120.00);
  const [heldDeposits, setHeldDeposits] = useState(50.00);
  const [amount, setAmount] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddFunds = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    setBalance(prev => prev + val);
    setSuccessMsg(`Successfully added ₹${val.toFixed(2)} to your wallet!`);
    setAmount('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Digital Wallet & Deposits
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Manage your refundable container deposits, wallet balance, and instant top-ups.
        </p>
      </div>

      {successMsg && (
        <div style={{ padding: '1rem', borderRadius: '14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--brand)', fontWeight: 700 }}>
          {successMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Available Balance</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WalletIcon size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            ₹{balance.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Instant refunds credited upon container returns.
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Held Container Deposits</span>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            ₹{heldDeposits.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#d97706', fontWeight: 600 }}>
            1 active container checkout deposit held
          </div>
        </div>
      </div>

      {/* Top-up Card */}
      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
          Quick Wallet Top-Up
        </h3>
        <form onSubmit={handleAddFunds} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '245px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <CreditCard size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
            <input
              type="number"
              min="10"
              step="10"
              required
              placeholder="Enter amount (e.g. 100)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.6rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '12px',
              backgroundColor: 'var(--brand)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
            }}
          >
            <PlusCircle size={18} />
            <span>Add Funds</span>
          </button>
        </form>
      </div>
    </div>
  );
}