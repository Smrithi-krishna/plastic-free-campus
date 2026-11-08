import React from 'react';
import { Award, Download, CheckCircle2 } from 'lucide-react';

export default function Certificates() {
  const handleDownload = (title) => {
    alert(`Downloading official PDF certificate: ${title}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Eco Certificates
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Download verified digital certificates recognizing your contribution to a plastic-free campus.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Certificate of Sustainability Excellence - Fall 2026
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Verified by Rajagiri Sustainability Cell • Issued Oct 30, 2026
            </p>
          </div>
        </div>
        <button
          onClick={() => handleDownload('Certificate of Sustainability Excellence - Fall 2026')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)' }}
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}