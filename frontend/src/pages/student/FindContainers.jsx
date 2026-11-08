import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, QrCode, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_CONTAINERS = [
  { id: 'CNT-101', name: 'Stainless Steel Lunchbox (Large)', canteen: 'Central Campus Canteen', stock: 42, status: 'Available', deposit: '₹50' },
  { id: 'CNT-102', name: 'Insulated Thermal Soup Bowl', canteen: 'North Block Cafeteria', stock: 15, status: 'Available', deposit: '₹40' },
  { id: 'CNT-103', name: 'Stainless Steel Tumbler (500ml)', canteen: 'Library Snack Kiosk', stock: 68, status: 'Available', deposit: '₹30' },
  { id: 'CNT-104', name: 'Bento Compartment Box', canteen: 'Central Campus Canteen', stock: 3, status: 'Low Stock', deposit: '₹60' },
  { id: 'CNT-105', name: 'Eco-Cup with Lid', canteen: 'Hostel Mess Block A', stock: 0, status: 'Out of Stock', deposit: '₹20' },
];

export default function FindContainers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCanteen, setFilterCanteen] = useState('All');

  const filtered = MOCK_CONTAINERS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.canteen.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCanteen = filterCanteen === 'All' || item.canteen === filterCanteen;
    return matchesSearch && matchesCanteen;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Find Available Containers
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Check real-time stock across campus canteens and pick your reusable meal container.
          </p>
        </div>
        <Link 
          to="/student/borrow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            backgroundColor: 'var(--brand)',
            color: '#ffffff',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          <QrCode size={18} />
          <span>Borrow Now</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '18px', padding: '1.25rem' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search container type or canteen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--text-muted)" />
          <select
            value={filterCanteen}
            onChange={(e) => setFilterCanteen(e.target.value)}
            style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, outline: 'none' }}
          >
            <option value="All">All Canteens</option>
            <option value="Central Campus Canteen">Central Campus Canteen</option>
            <option value="North Block Cafeteria">North Block Cafeteria</option>
            <option value="Library Snack Kiosk">Library Snack Kiosk</option>
            <option value="Hostel Mess Block A">Hostel Mess Block A</option>
          </select>
        </div>
      </div>

      {/* Containers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ backgroundColor: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: item.stock > 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: item.stock > 0 ? 'var(--brand)' : '#ef4444' }}>
                  {item.status}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>Deposit: {item.deposit}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>{item.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <MapPin size={16} />
                <span>{item.canteen}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Stock: <strong style={{ color: item.stock > 5 ? 'var(--brand)' : '#d97706' }}>{item.stock} units</strong>
              </span>
              <Link 
                to={`/student/borrow?container=${item.id}`}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: item.stock > 0 ? 'var(--brand)' : 'var(--border)',
                  color: item.stock > 0 ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  pointerEvents: item.stock > 0 ? 'auto' : 'none'
                }}
              >
                {item.stock > 0 ? 'Borrow' : 'Unavailable'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}