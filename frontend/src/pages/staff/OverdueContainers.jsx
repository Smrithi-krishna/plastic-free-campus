import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const OVERDUE = [
  { id: 'CNT-012', student: 'Karan Sharma', due: '2 days overdue', contact: 'karan@student.edu' }
];

export default function OverdueContainers() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Overdue Containers
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Containers exceeding the 48-hour return window. Automated reminders sent.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {OVERDUE.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '14px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.id} - {item.student}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.contact}</div>
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                {item.due}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}