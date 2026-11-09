import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const STAFF_TXNS = [
  { title: 'Issued Container CNT-101', type: 'Issue', time: 'Today, 12:30 PM', student: 'Alex Johnson' },
  { title: 'Verified Return CNT-103', type: 'Return', time: 'Today, 11:15 AM', student: 'Rahul Menon' }
];

export default function StaffTransactionHistory() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Canteen Station Activity Ledger
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Complete log of all container issues and verified returns at this station.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {STAFF_TXNS.map((txn, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{txn.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Student: {txn.student} • {txn.time}</div>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)' }}>
                {txn.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}