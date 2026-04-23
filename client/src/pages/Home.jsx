import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle, Clock, Bell, Shield,
  ArrowRight, ChevronRight, Zap, BarChart2, Users
} from 'lucide-react';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────────
   Design tokens (Stitch: Luminous Efficiency)
   Primary:   #0058be  /  on-primary: #ffffff
   Surface:   #f9f9ff  /  on-surface: #191b23
   Container: #ecedf7  /  Card bg:    #ffffff
   Outline:   #c2c6d6  /  Radius: 12px
───────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const features = [
  {
    icon: CheckCircle,
    color: '#0058be',
    bg: '#d8e2ff',
    title: 'Dual Approval System',
    description:
      'Ensure accuracy and compliance with a two-step approval process — manager first, then HR — for every request.',
  },
  {
    icon: Clock,
    color: '#924700',
    bg: '#ffdcc6',
    title: 'Real-Time Tracking',
    description:
      'Monitor overtime hours, statuses, and approvals in real time with live dashboard updates.',
  },
  {
    icon: Bell,
    color: '#505f76',
    bg: '#d0e1fb',
    title: 'Smart Notifications',
    description:
      'Automated alerts keep managers and employees in the loop at every stage of the workflow.',
  },
  {
    icon: Shield,
    color: '#0058be',
    bg: '#d8e2ff',
    title: 'Secure Access',
    description:
      'Role-based permissions and enterprise-grade encryption protect sensitive workforce data.',
  },
];

const steps = [
  {
    num: '01',
    icon: Users,
    title: 'Submit Request',
    description:
      'Employees submit overtime details — date, hours, reason — through a clean, guided form.',
  },
  {
    num: '02',
    icon: CheckCircle,
    title: 'Authorities Approve',
    description:
      'Managers and HR review requests in their queue, with full context and one-click decisions.',
  },
  {
    num: '03',
    icon: BarChart2,
    title: 'Overtime Recorded',
    description:
      'Approved records sync instantly to payroll-ready reports with a permanent audit trail.',
  },
];

const stats = [
  { value: '10k+', label: 'Requests Processed' },
  { value: '98%', label: 'Approval Accuracy' },
  { value: '3 min', label: 'Avg. Approval Time' },
  { value: '500+', label: 'Companies Trust Us' },
];

export default function Home() {
  return (
    <div style={{ background: '#f9f9ff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(145deg, #f0f4ff 0%, #f9f9ff 60%)', paddingTop: 96, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto' }}
          >
            {/* pill badge */}
            <motion.div variants={fadeUp} custom={0} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#d8e2ff', borderRadius: 9999, padding: '6px 16px', marginBottom: 28 }}>
              <Zap size={14} color="#0058be" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0058be', letterSpacing: '0.02em' }}>Overtime Management — Simplified</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} style={{ fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 700, color: '#191b23', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 24 }}>
              Track &amp; Approve Overtime{' '}
              <span style={{ color: '#0058be' }}>Efficiently</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} style={{ fontSize: 18, color: '#424754', lineHeight: 1.7, marginBottom: 40 }}>
              A simple and secure system for managing employee overtime with a
              dual approval workflow — built for modern, data-driven workplaces.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/register"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#0058be', color: '#fff',
                  padding: '13px 28px', borderRadius: 12,
                  fontWeight: 600, fontSize: 16, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,88,190,0.28)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#004395'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,88,190,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0058be'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,88,190,0.28)'; }}
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#ffffff', color: '#191b23',
                  border: '1px solid #c2c6d6',
                  padding: '13px 28px', borderRadius: 12,
                  fontWeight: 600, fontSize: 16, textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0058be'; e.currentTarget.style.color = '#0058be'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#c2c6d6'; e.currentTarget.style.color = '#191b23'; }}
              >
                Learn More <ChevronRight size={18} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
            style={{ marginTop: 64 }}
          >
            <div style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e1e2ec',
              boxShadow: '0 8px 48px rgba(0,0,0,0.08)',
              padding: 32,
              maxWidth: 900,
              margin: '0 auto',
            }}>
              {/* mock header bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffdcc6' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#d0e1fb' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#d8e2ff' }} />
                <div style={{ flex: 1, height: 8, background: '#ecedf7', borderRadius: 4, marginLeft: 12 }} />
              </div>
              {/* mock stat row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16, marginBottom: 24 }}>
                {['Pending', 'Approved', 'Rejected', 'Total Hours'].map((label, i) => (
                  <div key={i} style={{ background: '#f2f3fd', borderRadius: 12, padding: '16px 20px' }}>
                    <div style={{ fontSize: 11, color: '#727785', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#191b23' }}>{['12', '87', '3', '342h'][i]}</div>
                  </div>
                ))}
              </div>
              {/* mock table rows */}
              {['Priya Sharma', 'Arjun Mehta', 'Neha Kapoor'].map((name, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #ecedf7' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: ['#d8e2ff','#ffdcc6','#d0e1fb'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: ['#0058be','#924700','#505f76'][i] }}>{name[0]}</div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#191b23' }}>{name}</div>
                  <div style={{ fontSize: 13, color: '#424754' }}>{['4h','2.5h','6h'][i]} overtime</div>
                  <div style={{ fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 99, background: ['#d8e2ff','#d0e1fb','#ffdcc6'][i], color: ['#0058be','#505f76','#924700'][i] }}>{['Pending','Approved','Pending'][i]}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────── */}
      <section style={{ background: '#0058be', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#adc6ff', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0058be', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Why TimeFlow</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#191b23', letterSpacing: '-0.02em', marginBottom: 16 }}>Powerful Features</h2>
            <p style={{ fontSize: 18, color: '#424754', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Everything you need to manage overtime smoothly — from submission to payroll.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e1e2ec',
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    transition: 'all 0.25s',
                    cursor: 'default',
                  }}
                  whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,88,190,0.10)' }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={24} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#191b23', marginBottom: 10, letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: '#424754', lineHeight: 1.65 }}>{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#f2f3fd' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0058be', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Simple Process</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#191b23', letterSpacing: '-0.02em', marginBottom: 16 }}>How It Works</h2>
            <p style={{ fontSize: 18, color: '#424754', lineHeight: 1.7 }}>A streamlined 3-step process from request to record.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, position: 'relative' }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e1e2ec',
                    borderRadius: 16,
                    padding: '40px 32px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    position: 'relative',
                  }}
                >
                  <div style={{ fontSize: 56, fontWeight: 800, color: '#ecedf7', lineHeight: 1, marginBottom: 20, letterSpacing: '-0.04em' }}>{step.num}</div>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#d8e2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={22} color="#0058be" />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#191b23', marginBottom: 12, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: '#424754', lineHeight: 1.65 }}>{step.description}</p>
                  {i < steps.length - 1 && (
                    <div style={{ position: 'absolute', right: -18, top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'flex' }}>
                      <ArrowRight size={24} color="#0058be" style={{ display: 'none' }} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg, #0058be 0%, #004395 100%)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Start Managing Overtime Today
            </h2>
            <p style={{ fontSize: 18, color: '#adc6ff', lineHeight: 1.7, marginBottom: 40 }}>
              Join thousands of companies streamlining their HR processes with TimeFlow.
              Set up in minutes — no credit card required.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/register"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#ffffff', color: '#0058be',
                  padding: '14px 32px', borderRadius: 12,
                  fontWeight: 700, fontSize: 16, textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f2f3fd'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; }}
              >
                Create Free Account <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: '#ffffff',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  padding: '14px 32px', borderRadius: 12,
                  fontWeight: 600, fontSize: 16, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}