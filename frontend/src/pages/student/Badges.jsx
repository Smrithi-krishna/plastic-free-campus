import React from 'react';
import { Award, CheckCircle2, Lock } from 'lucide-react';

const BADGES = [
  { title: 'Zero Plastic Pioneer', desc: 'Completed first 10 successful container cycles', unlocked: true, date: 'Unlocked Oct 2026' },
  { title: 'Streak Master', desc: 'Maintained 30 days of zero overdue returns', unlocked: true, date: 'Unlocked Nov 2026' },
  { title: 'Campus Ambassador', desc: 'Referred 5 peers to the Plastic-Free initiative', unlocked: false, progress: '3/5 peers' },
  { title: 'Eco Centurion', desc: 'Completed 100 successful container returns', unlocked: false, progress: '42/100 returns' },
];

export default function Badges() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Badges & Achievements
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Milestone badges unlocked through sustainable campus dining habits.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {BADGES.map((badge, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: badge.unlocked ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface)', color: badge.unlocked ? 'var(--brand)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {badge.unlocked ? <Award size={26} /> : <Lock size={22} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{badge.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{badge.desc}</p>
              </div>
            </div>
            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.8rem', fontWeight: 700, color: badge.unlocked ? 'var(--brand)' : 'var(--text-muted)' }}>
              {badge.unlocked ? badge.date : `Progress: ${badge.progress}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}