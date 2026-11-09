import React from 'react';
import { Award, Gift, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Rewards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Green Rewards & Swag
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Redeem your earned Green Points for canteen discounts, eco-friendly merch, and certificates.
        </p>
      </div>

      {/* Points Banner */}
      <div style={{ backgroundColor: 'var(--surface-card)', border: '2px solid var(--brand)', borderRadius: '24px', padding: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>Eco-Champion Tier</span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>450 Green Points Available</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Keep returning containers on time to unlock premium rewards!</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/student/swag" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Gift size={18} />
            <span>Open Swag Store</span>
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <Link to="/student/badges" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Badges & Milestones</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>View unlocked achievements</p>
          </div>
          <ChevronRight size={22} color="var(--brand)" />
        </Link>

        <Link to="/student/certificates" style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.75rem', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Eco Certificates</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Download official recognition</p>
          </div>
          <ChevronRight size={22} color="var(--brand)" />
        </Link>
      </div>
    </div>
  );
}