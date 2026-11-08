import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';

const NOTIFICATIONS = [
  { title: 'Return Reminder', desc: 'Your container CNT-101 is due for return in 36 hours.', time: '2 hours ago', unread: true },
  { title: 'Deposit Refunded', desc: '₹50 refunded to your wallet for container CNT-103.', time: 'Yesterday', unread: false },
  { title: 'Green Points Earned', desc: '+50 points added for your on-time return.', time: '2 days ago', unread: false },
];

export default function Notifications() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Notifications
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Updates regarding your container checkouts, deposits, and rewards.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {NOTIFICATIONS.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem', borderRadius: '14px', backgroundColor: item.unread ? 'rgba(16, 185, 129, 0.05)' : 'var(--surface)', border: '1px solid var(--border)' }}>
              <Bell size={20} color="var(--brand)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}