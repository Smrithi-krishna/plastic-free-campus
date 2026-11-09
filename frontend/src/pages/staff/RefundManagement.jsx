import React from 'react';
import { DollarSign, CheckCircle2 } from 'lucide-react';

const REFUNDS = [
  { id: 'REF-501', student: 'Alex Johnson', container: 'CNT-101', amount: '₹50.00', status: 'Completed', time: 'Today, 1:20 PM' },
  { id: 'REF-502', student: 'Rahul Menon', container: 'CNT-104', amount: '₹50.00', status: 'Completed', time: 'Today, 11:10 AM' },
  { id: 'REF-503', student: 'Sneha Pillai', container: 'CNT-102', amount: '₹50.00', status: 'Pending Review', time: 'Yesterday' }
];

export default function RefundManagement() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Deposit Refund Management
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Monitor automated and manual deposit refunds to student digital wallets.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {REFUNDS.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.student} ({item.container})</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.time}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: 'var(--brand)' }}>{item.amount}</div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', backgroundColor: item.status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: item.status === 'Completed' ? 'var(--brand)' : '#d97706' }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}