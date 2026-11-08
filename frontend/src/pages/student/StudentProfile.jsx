import React from 'react';
import { User, Mail, Shield, Award } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function StudentProfile() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Student Profile
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Your student account credentials and eco-profile details.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '20px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 800 }}>
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{user?.name || 'Alex Johnson'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Student ID: <strong style={{ color: 'var(--brand)' }}>{user?.id || 'STU9842'}</strong></p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Campus Email</span>
            <strong style={{ color: 'var(--text-main)' }}>{user?.email || 'alex@student.edu'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Account Role</span>
            <strong style={{ color: 'var(--brand)' }}>Student Member</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
            <span style={{ color: 'var(--text-muted)' }}>Current Status</span>
            <strong style={{ color: 'var(--brand)' }}>Active in Loop Ecosystem</strong>
          </div>
        </div>
      </div>
    </div>
  );
}