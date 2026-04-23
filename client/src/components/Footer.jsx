import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#191b23',
      color: '#e1e2ec',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '64px 24px 32px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>

          {/* Brand col */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 28, height: 28, background: '#2170e4', borderRadius: 8 }}>
                <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
                  <circle cx="14" cy="14" r="8" stroke="white" strokeWidth="2.5" fill="none" />
                  <path d="M14 8v6l4 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              TimeFlow
            </div>
            <p style={{ fontSize: 14, color: '#727785', lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              Simplify overtime management with a secure, transparent, and efficient dual-approval workflow — built for modern teams.
            </p>
            <a
              href="mailto:support@timeflow.com"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#adc6ff', textDecoration: 'none', fontWeight: 500 }}
            >
              <Mail size={15} />
              support@timeflow.com
            </a>
          </div>

          {/* Product col */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#727785', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Product</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/register', label: 'Get Started' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} style={{ fontSize: 14, color: '#c2c6d6', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c2c6d6'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#727785', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Company</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} style={{ fontSize: 14, color: '#c2c6d6', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c2c6d6'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support col */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#727785', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>Support</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { href: '#', label: 'Help Center' },
                { href: '#', label: 'Privacy Policy' },
                { href: '#', label: 'Terms of Service' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} style={{ fontSize: 14, color: '#c2c6d6', textDecoration: 'none', transition: 'color 0.15s', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c2c6d6'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #2e3038', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#727785', margin: 0 }}>
            © {year} TimeFlow. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 13, color: '#727785' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;