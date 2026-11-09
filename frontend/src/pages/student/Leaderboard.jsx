import React from 'react';
import { Award, Trophy } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LEADERS = [
  { rank: 1, name: 'Ananya Nair', points: 920, dept: 'Computer Science' },
  { rank: 2, name: 'Rahul Menon', points: 850, dept: 'Electronics' },
  { rank: 3, name: 'Alex Johnson (You)', points: 450, dept: 'Computer Science', isUser: true },
  { rank: 4, name: 'Sneha Pillai', points: 410, dept: 'Mechanical' },
  { rank: 5, name: 'Devika Warrier', points: 380, dept: 'Civil' },
];

export default function Leaderboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Campus Leaderboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Top sustainability contributors across campus for this month.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {LEADERS.map((item) => (
            <div key={item.rank} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderRadius: '14px', backgroundColor: item.isUser ? 'rgba(16, 185, 129, 0.1)' : 'var(--surface)', border: item.isUser ? '1px solid var(--brand)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.rank <= 3 ? 'var(--brand)' : 'var(--border)', color: '#ffffff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>
                  {item.rank}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.dept}</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--brand)' }}>
                {item.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}