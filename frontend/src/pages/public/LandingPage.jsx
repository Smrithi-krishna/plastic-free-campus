import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, QrCode, RefreshCw, Sparkles, 
  Leaf, Award, DollarSign, TrendingUp, Users, CheckCircle2, 
  Smartphone, Building2, ChevronRight, Recycle
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function LandingPage() {
  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface)', color: 'var(--text-main)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '2rem 1rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Hero Section */}
          <section style={{ padding: '3rem 0 4rem 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
              
              {/* Hero Left Content */}
              <div>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.35rem 0.85rem', 
                  borderRadius: '9999px', 
                  backgroundColor: 'var(--brand-subtle, rgba(16, 185, 129, 0.15))', 
                  color: 'var(--brand, #10b981)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  marginBottom: '1.25rem'
                }}>
                  <Sparkles size={16} />
                  <span>Campus Sustainability Initiative</span>
                </div>

                <h1 style={{ 
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
                  fontWeight: 800, 
                  lineHeight: 1.15, 
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-main)'
                }}>
                  Zero Single-Use Plastic. <br />
                  <span style={{ color: 'var(--brand, #10b981)' }}>Pure Campus Impact.</span>
                </h1>

                <p style={{ 
                  fontSize: '1.125rem', 
                  color: 'var(--text-muted)', 
                  lineHeight: 1.6, 
                  marginBottom: '2rem',
                  maxWidth: '580px',
                  fontWeight: 400
                }}>
                  Join our smart reusable container ecosystem. Borrow durable stainless steel containers from campus canteens, enjoy your meals, return via QR verification, and earn rewards while keeping our campus pristine.
                </p>

                {/* Hero Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                  <Link 
                    to="/student/login" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      padding: '0.85rem 1.75rem', 
                      borderRadius: '12px',
                      backgroundColor: 'var(--brand, #10b981)',
                      color: '#ffffff',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                    }}
                  >
                    <span>Student Portal</span>
                    <ArrowRight size={18} />
                  </Link>

                  <Link 
                    to="/staff/login" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      padding: '0.85rem 1.75rem', 
                      borderRadius: '12px',
                      border: '2px solid var(--border)',
                      backgroundColor: 'var(--surface-card)',
                      color: 'var(--text-main)',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <Building2 size={18} style={{ color: 'var(--brand, #10b981)' }} />
                    <span>Staff & Canteen Portal</span>
                  </Link>
                </div>

                {/* Impact Metrics Quick Bar */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '1.5rem', 
                  paddingTop: '1.5rem', 
                  borderTop: '1px solid var(--border)' 
                }}>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>15,420+</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 500 }}>Containers Saved</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand, #10b981)' }}>98.4%</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 500 }}>Return Rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>1.2t</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem', fontWeight: 500 }}>Plastic Avoided</div>
                  </div>
                </div>
              </div>

              {/* Hero Right Visual Card (Always white background -> Dark text inside) */}
              <div>
                <div style={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '24px', 
                  padding: '1.75rem', 
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginBottom: '1.25rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '42px', 
                        height: '42px', 
                        borderRadius: '12px', 
                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                        color: 'var(--brand, #10b981)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Recycle size={22} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111827' }}>Smart Loop System</div>
                        <div style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 500 }}>Zero-waste campus dining</div>
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '0.25rem 0.65rem', 
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#065f46'
                    }}>
                      Active Loop
                    </span>
                  </div>

                  {/* 3 Step Quick Overview */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem', borderRadius: '14px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--brand, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <QrCode size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>1. Scan & Borrow</div>
                        <div style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 500 }}>Scan canteen QR code to instantly check out a container.</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem', borderRadius: '14px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <RefreshCw size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>2. Enjoy & Return</div>
                        <div style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 500 }}>Drop back at return points within 48 hours.</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem', borderRadius: '14px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Award size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>3. Earn Green Points</div>
                        <div style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 500 }}>Get deposit refunded + bonus points for rewards.</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '0.85rem 1rem', 
                    borderRadius: '14px', 
                    backgroundColor: 'rgba(16, 185, 129, 0.08)', 
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    fontSize: '0.875rem'
                  }}>
                    <span style={{ color: '#374151', fontWeight: 600 }}>Ready to join campus loop?</span>
                    <Link to="/student/register" style={{ color: 'var(--brand, #10b981)', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      Register Now <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* How the Circular Loop Works */}
          <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                How the Circular Loop Works
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 400 }}>
                A seamless 5-stage lifecycle designed for speed, hygiene, and complete accountability.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '18px', padding: '1.5rem', textAlign: 'center', position: 'relative', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--brand, #10b981)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-2.25rem auto 1rem auto', fontSize: '0.875rem', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)' }}>1</div>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--brand, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <QrCode size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111827' }}>Borrow</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.5, fontWeight: 500 }}>
                  Select meal at canteen, open your student app, and scan container QR code.
                </p>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '18px', padding: '1.5rem', textAlign: 'center', position: 'relative', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--brand, #10b981)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-2.25rem auto 1rem auto', fontSize: '0.875rem', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)' }}>2</div>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Smartphone size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111827' }}>Scan</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.5, fontWeight: 500 }}>
                  Instant digital verification logs container to student ID with small refundable deposit.
                </p>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '18px', padding: '1.5rem', textAlign: 'center', position: 'relative', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--brand, #10b981)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-2.25rem auto 1rem auto', fontSize: '0.875rem', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)' }}>3</div>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <RefreshCw size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111827' }}>Return</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.5, fontWeight: 500 }}>
                  Drop off container at any campus return point or canteen drop-bin within 48 hours.
                </p>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '18px', padding: '1.5rem', textAlign: 'center', position: 'relative', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--brand, #10b981)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-2.25rem auto 1rem auto', fontSize: '0.875rem', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)' }}>4</div>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111827' }}>Clean</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.5, fontWeight: 500 }}>
                  Staff collect & sanitize containers using commercial high-temp sterilization.
                </p>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '18px', padding: '1.5rem', textAlign: 'center', position: 'relative', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--brand, #10b981)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '-2.25rem auto 1rem auto', fontSize: '0.875rem', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)' }}>5</div>
                <div style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Leaf size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111827' }}>Reuse</h3>
                <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.5, fontWeight: 500 }}>
                  Sanitized containers return to circulation, ready for the next student meal.
                </p>
              </div>
            </div>
          </section>

          {/* Deposits & Rewards Section */}
          <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: 'var(--brand, #10b981)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Fair & Transparent Economy
                </span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.5rem 0 1.25rem 0', color: 'var(--text-main)' }}>
                  Refundable Deposits & Green Rewards
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.75rem', fontWeight: 400 }}>
                  We keep borrowing affordable and accountable. A small deposit is held when borrowing and refunded instantly to your app wallet upon return. Plus, earn bonus <strong style={{ color: 'var(--text-main)' }}>Green Points</strong> on every on-time return!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--brand, #10b981)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>Instant Deposit Refund</strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 400 }}>Returned immediately to your wallet or linked payment account upon return verification.</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--brand, #10b981)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>Green Points Multiplier</strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 400 }}>Earn points for every container saved, streak milestones, and eco-challenges.</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <CheckCircle2 size={20} style={{ color: 'var(--brand, #10b981)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>Exclusive Swag & Vouchers</strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 400 }}>Redeem points for café discounts, eco-friendly merch, and green certificates.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <DollarSign size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.35rem', color: '#111827' }}>Wallet & Deposits</h3>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.4, fontWeight: 500 }}>Track active deposits and instant refunds in real time.</p>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--brand, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Award size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.35rem', color: '#111827' }}>Swag & Badges</h3>
                  <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.4, fontWeight: 500 }}>Unlock achievements and redeem custom campus rewards.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Portal Entry Callout */}
          <section style={{ 
            padding: '3rem 2rem', 
            borderRadius: '24px', 
            backgroundColor: 'var(--surface-card)', 
            border: '2px solid var(--brand, #10b981)', 
            textAlign: 'center', 
            margin: '2rem 0 4rem 0'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Ready to Transform Campus Dining?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', fontWeight: 400 }}>
              Choose your portal below to sign in or register for the Plastic-Free Campus ecosystem.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', maxWidth: '500px', margin: '0 auto' }}>
              <Link 
                to="/student/login" 
                style={{ 
                  flex: '1 1 200px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  padding: '0.9rem 1.5rem', 
                  borderRadius: '12px', 
                  backgroundColor: 'var(--brand, #10b981)', 
                  color: '#ffffff', 
                  fontWeight: 800, 
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                }}
              >
                <Users size={18} />
                <span>Student Portal</span>
              </Link>

              <Link 
                to="/staff/login" 
                style={{ 
                  flex: '1 1 200px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  padding: '0.9rem 1.5rem', 
                  borderRadius: '12px', 
                  border: '2px solid var(--border)', 
                  backgroundColor: 'var(--surface-card)', 
                  color: 'var(--text-main)', 
                  fontWeight: 800, 
                  textDecoration: 'none' 
                }}
              >
                <Building2 size={18} style={{ color: 'var(--brand, #10b981)' }} />
                <span>Staff Portal</span>
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}