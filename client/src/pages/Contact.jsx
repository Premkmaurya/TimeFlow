import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Loader2, Globe, MessageSquare, CheckCircle2, Phone } from 'lucide-react';
import Footer from '../components/Footer';

/* ─── Design tokens: Luminous Efficiency ───── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const contactChannels = [
  {
    icon: Mail,
    color: '#0058be',
    bg: '#d8e2ff',
    label: 'Email Support',
    value: 'support@timeflow.com',
    href: 'mailto:support@timeflow.com',
    desc: 'Typical response within 4 hours',
  },
  {
    icon: Globe,
    color: '#924700',
    bg: '#ffdcc6',
    label: 'Help Center',
    value: 'help.timeflow.com',
    href: 'https://help.timeflow.com',
    desc: 'Browse docs and FAQs',
  },
  {
    icon: MessageSquare,
    color: '#505f76',
    bg: '#d0e1fb',
    label: 'Live Chat',
    value: 'Chat with us',
    href: '#',
    desc: 'Available Mon – Fri, 9am – 6pm',
  },
];

const subjectOptions = [
  'General Enquiry',
  'Technical Support',
  'Billing & Payments',
  'Feature Request',
  'Enterprise Sales',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '12px 16px',
    fontSize: 15,
    border: focused === name ? '1.5px solid #0058be' : '1px solid #c2c6d6',
    borderRadius: 12,
    outline: 'none',
    background: '#ffffff',
    color: '#191b23',
    transition: 'all 0.2s',
    boxShadow: focused === name ? '0 0 0 3px rgba(0,88,190,0.10)' : 'none',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#424754',
    marginBottom: 8,
    letterSpacing: '0.01em',
  };

  return (
    <div style={{ background: '#f9f9ff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(145deg, #f0f4ff 0%, #f9f9ff 60%)', padding: '96px 24px 72px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#d8e2ff', borderRadius: 9999, padding: '6px 16px', marginBottom: 28 }}>
              <Mail size={14} color="#0058be" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0058be', letterSpacing: '0.02em' }}>We're here to help</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#191b23', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Contact <span style={{ color: '#0058be' }}>Us</span>
            </h1>
            <p style={{ fontSize: 18, color: '#424754', lineHeight: 1.75 }}>
              We'd love to hear from you. Reach out with questions, feedback,
              or inquiries — and we'll get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CHANNELS ──────────────────────── */}
      <section style={{ padding: '0 24px', marginTop: -32 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {contactChannels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <motion.a
                key={i}
                href={ch.href}
                initial="hidden"
                animate="show"
                custom={i}
                variants={fadeUp}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e1e2ec',
                  borderRadius: 16,
                  padding: '28px 24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.2s',
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0,88,190,0.12)' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: ch.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} color={ch.color} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#727785', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{ch.label}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: ch.color, marginBottom: 4 }}>{ch.value}</div>
                <div style={{ fontSize: 13, color: '#727785' }}>{ch.desc}</div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              background: '#ffffff',
              border: '1px solid #e1e2ec',
              borderRadius: 20,
              padding: '48px 40px',
              boxShadow: '0 8px 48px rgba(0,0,0,0.07)',
            }}
            className="contact-form-card"
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#191b23', letterSpacing: '-0.01em', marginBottom: 8 }}>Send a Message</h2>
            <p style={{ fontSize: 14, color: '#727785', marginBottom: 36 }}>Fill in the form below and our team will respond within one business day.</p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '48px 0' }}
                >
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#d8e2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <CheckCircle2 size={36} color="#0058be" />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#191b23', marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ fontSize: 16, color: '#424754', marginBottom: 28 }}>
                    Thanks for reaching out. We'll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ background: '#0058be', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                >
                  {/* name + email row */}
                  <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="contact-name"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused('')}
                        style={inputStyle('name')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        style={inputStyle('email')}
                      />
                    </div>
                  </div>

                  {/* subject */}
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <select
                      name="subject"
                      id="contact-subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused('')}
                      style={{ ...inputStyle('subject'), appearance: 'none' }}
                    >
                      <option value="" disabled>Select a subject…</option>
                      {subjectOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  {/* message */}
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      name="message"
                      id="contact-message"
                      required
                      rows={6}
                      placeholder="Tell us how we can help…"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 140 }}
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={loading}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      background: loading ? '#adc6ff' : '#0058be',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 12,
                      padding: '14px 32px',
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: loading ? 'none' : '0 4px 16px rgba(0,88,190,0.28)',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                  >
                    {loading ? (
                      <><Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> Sending…</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM INFO ROW ──────────────────────── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="contact-info-grid" style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { icon: Phone, label: 'Response Time', value: 'Within 4 hours', sub: 'Mon – Fri, 9am – 6pm IST' },
            { icon: Mail, label: 'General Enquiries', value: 'hello@timeflow.com', sub: 'For non-urgent questions' },
          ].map((item, i) => {
            const Icon = item.icon;
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
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#d8e2ff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color="#0058be" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#727785', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#191b23', marginBottom: 2 }}>{item.value}</div>
                  <div style={{ fontSize: 13, color: '#727785' }}>{item.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* spinner keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .contact-form-card { padding: 32px 20px !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
          .contact-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}