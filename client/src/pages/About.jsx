import { motion } from 'framer-motion';
import {
  AlertTriangle, CheckCircle, Target,
  LayoutGrid, Bell, GitMerge, TrendingUp, Shield
} from 'lucide-react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

/* ─── Design tokens: Luminous Efficiency ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const problems = [
  {
    icon: LayoutGrid,
    title: 'Manual Tracking Issues',
    description:
      'Spreadsheets and paper logs lead to errors, lost data, and a fragmented view of resource allocation.',
  },
  {
    icon: Bell,
    title: 'No Transparency',
    description:
      'Without a centralized system, teams operate in silos — making it impossible to gauge true workload.',
  },
  {
    icon: GitMerge,
    title: 'Approval Bottlenecks',
    description:
      'Informal requests result in delayed payments, unrecorded overtime, and operational friction.',
  },
];

const solutions = [
  {
    icon: CheckCircle,
    title: 'Structured Approval Workflows',
    description:
      'We replace informal requests with automated, multi-tier approval routing. Every request has a clear path, designated approvers, and a permanent audit trail.',
  },
  {
    icon: TrendingUp,
    title: 'Clear Tracking & Dashboards',
    description:
      'Real-time dashboards provide instant visibility into all overtime activity — by team, department, or individual.',
  },
  {
    icon: Shield,
    title: 'Smart Notifications',
    description:
      'Automated alerts ensure pending actions are never overlooked, keeping the entire team perfectly in sync.',
  },
];

const values = [
  { label: 'Transparency', desc: 'Every decision is visible and documented.' },
  { label: 'Efficiency', desc: 'Automate routine approvals, focus on what matters.' },
  { label: 'Fairness', desc: 'Equitable, consistent rules for every employee.' },
  { label: 'Compliance', desc: 'Audit-ready records built in from day one.' },
];

export default function About() {
  return (
    <div style={{ background: '#f9f9ff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ───────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(145deg, #f0f4ff 0%, #f9f9ff 60%)', padding: '96px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#d8e2ff', borderRadius: 9999, padding: '6px 16px', marginBottom: 28 }}>
              <Target size={14} color="#0058be" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0058be', letterSpacing: '0.02em' }}>Our Story</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#191b23', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 24 }}>
              About <span style={{ color: '#0058be' }}>TimeFlow</span>
            </h1>
            <p style={{ fontSize: 18, color: '#424754', lineHeight: 1.75, maxWidth: 640, margin: '0 auto' }}>
              We build tools that respect your time. TimeFlow was created to eliminate the friction
              between doing great work and managing the logistics around it — starting with overtime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ──────────────────────── */}
      <section style={{ padding: '80px 24px', background: '#ffffff' }}>
        <div className="about-mission-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0058be', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Our Mission</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: '#191b23', letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.25 }}>
              Simplify workforce management — without compromise.
            </h2>
            <p style={{ fontSize: 16, color: '#424754', lineHeight: 1.75, marginBottom: 24 }}>
              We believe administrative tasks shouldn't stand in the way of productivity.
              By creating transparent, structured systems, we empower teams to focus on what truly matters.
            </p>
            <p style={{ fontSize: 16, color: '#424754', lineHeight: 1.75 }}>
              TimeFlow was born from real frustration with the status quo — manual tracking,
              opaque approvals, and a complete lack of accountability. We saw an opportunity
              to build something genuinely better.
            </p>
          </motion.div>

          {/* values grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="about-values-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                style={{
                  background: '#f2f3fd',
                  border: '1px solid #e1e2ec',
                  borderRadius: 16,
                  padding: 28,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0058be', marginBottom: 8 }}>{v.label}</div>
                <div style={{ fontSize: 14, color: '#424754', lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM ───────────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#f2f3fd' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#ba1a1a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>The Challenge</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#191b23', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Traditional Overtime Management Is Broken
            </h2>
            <p style={{ fontSize: 18, color: '#424754', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              Transitioning from chaotic spreadsheets to clear, actionable workflows.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {problems.map((p, i) => {
              const Icon = p.icon;
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
                  }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: '#ffdad6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={24} color="#ba1a1a" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#191b23', marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 15, color: '#424754', lineHeight: 1.65 }}>{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR SOLUTION ──────────────────────────── */}
      <section style={{ padding: '96px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0058be', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Our Approach</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#191b23', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How TimeFlow Solves It
            </h2>
            <p style={{ fontSize: 18, color: '#424754', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
              A comprehensive, automated system that addresses every pain point head-on.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,88,190,0.10)' }}
                  style={{
                    background: '#f9f9ff',
                    border: '1px solid #e1e2ec',
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s',
                  }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: '#d8e2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={24} color="#0058be" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#191b23', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: '#424754', lineHeight: 1.65 }}>{s.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #0058be 0%, #004395 100%)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Ready to transform your workflow?
            </h2>
            <p style={{ fontSize: 18, color: '#adc6ff', lineHeight: 1.7, marginBottom: 36 }}>
              Start your free trial today and see how TimeFlow can eliminate overtime management headaches.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/register"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#ffffff', color: '#0058be',
                  padding: '13px 28px', borderRadius: 12,
                  fontWeight: 700, fontSize: 16, textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                }}
              >
                Get Started Free
              </Link>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: '#ffffff',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  padding: '13px 28px', borderRadius: 12,
                  fontWeight: 600, fontSize: 16, textDecoration: 'none',
                }}
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-mission-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 600px) {
          .about-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Footer />
    </div>
  );
}