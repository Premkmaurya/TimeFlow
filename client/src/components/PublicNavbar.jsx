import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const PublicNavbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(249,249,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #e1e2ec',
      boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: 20, fontWeight: 800, color: '#0058be',
            textDecoration: 'none', letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 28, background: '#0058be', borderRadius: 8, marginRight: 2 }}>
            <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
              <circle cx="14" cy="14" r="8" stroke="white" strokeWidth="2.5" fill="none" />
              <path d="M14 8v6l4 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          TimeFlow
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '6px 16px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#0058be' : '#424754',
                  background: active ? '#d8e2ff' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#ecedf7'; e.currentTarget.style.color = '#191b23'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#424754'; } }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            to="/login"
            style={{
              fontSize: 14, fontWeight: 500, color: '#424754', textDecoration: 'none',
              padding: '6px 16px', borderRadius: 8, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0058be'; e.currentTarget.style.background = '#ecedf7'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#424754'; e.currentTarget.style.background = 'transparent'; }}
          >
            Log in
          </Link>
          <Link
            to="/register"
            style={{
              fontSize: 14, fontWeight: 600, color: '#ffffff',
              background: '#0058be', textDecoration: 'none',
              padding: '8px 18px', borderRadius: 10,
              boxShadow: '0 2px 10px rgba(0,88,190,0.24)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#004395'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,88,190,0.32)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0058be'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,88,190,0.24)'; }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;