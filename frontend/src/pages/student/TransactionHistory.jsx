import React from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TXN-901', title: 'Container Return Refund', type: 'Credit', amount: '+₹50.00', date: 'Yesterday, 2:15 PM', status: 'Completed', canteen: 'North Block Cafeteria' },
  { id: 'TXN-902', title: 'Container Borrow Deposit Hold', type: 'Debit', amount: '-₹50.00', date: 'Today, 12:30 PM', status: 'Held', canteen: 'Central Campus Canteen' },
  { id: 'TXN-895', title: 'Wallet Top-Up via UPI', type: 'Credit', amount: '+₹200.00', date: '3 days ago', status: 'Completed', canteen: 'Online Gateway' },
  { id: 'TXN-880', title: 'Container Return Refund', type: 'Credit', amount: '+₹50.00', date: '5 days ago', status: 'Completed', canteen: 'Library Snack Kiosk' },
];

export default function TransactionHistory() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Transaction History
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Complete ledger of your deposits, refunds, and wallet top-ups.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {TRANSACTIONS.map((txn, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: txn.type === 'Credit' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: txn.type === 'Credit' ? 'var(--brand)' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {txn.type === 'Credit' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{txn.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{txn.canteen} • {txn.date}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: txn.type === 'Credit' ? 'var(--brand)' : 'var(--text-main)' }}>{txn.amount}</div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', backgroundColor: txn.status === 'Completed' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)', color: txn.status === 'Completed' ? 'var(--brand)' : '#d97706' }}>
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}