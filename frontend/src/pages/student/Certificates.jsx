import React from 'react';
import { Award, Download, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Certificates() {
  const { user } = useAuth();
  const studentName = user?.name || 'Alex Johnson';
  const studentId = user?.id || 'STU9842';

  const handleDownload = (title) => {
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body {
            background-color: #f0fdf4;
            font-family: 'Georgia', serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .certificate {
            background: #ffffff;
            border: 10px solid #10b981;
            padding: 50px;
            width: 800px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            position: relative;
          }
          .header {
            color: #065f46;
            font-size: 20px;
            letter-spacing: 2px;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          .title {
            font-size: 36px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 20px;
          }
          .subtitle {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 30px;
          }
          .recipient {
            font-size: 32px;
            font-weight: bold;
            color: #047857;
            border-bottom: 2px solid #10b981;
            display: inline-block;
            padding: 0 30px 5px 30px;
            margin-bottom: 20px;
          }
          .body-text {
            font-size: 16px;
            color: #374151;
            line-height: 1.6;
            margin-bottom: 40px;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            padding: 0 40px;
          }
          .signature {
            border-top: 1px solid #9ca3af;
            padding-top: 10px;
            font-size: 14px;
            color: #4b5563;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">Rajagiri School of Engineering & Technology</div>
          <div class="title">Certificate of Sustainability Excellence</div>
          <div class="subtitle">Plastic-Free Campus Initiative</div>
          
          <p class="body-text">This is proudly presented to</p>
          <div class="recipient">${studentName} (${studentId})</div>
          <p class="body-text">
            For outstanding dedication and active participation in the zero single-use plastic reusable container loop ecosystem during the Fall 2026 term.
          </p>

          <div class="footer">
            <div class="signature">Sustainability Cell Coordinator</div>
            <div class="signature">Verified Digital ID</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([certificateHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
              Verified by Rajagiri Sustainability Cell • Issued Fall 2026
            </p>
          </div>
        </div>
        <button
          onClick={() => handleDownload('Certificate_of_Sustainability_Excellence')}
          style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--brand)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)' }}
        >
          <Download size={18} />
          <span>Download Certificate</span>
        </button>
      </div>
    </div>
  );
}