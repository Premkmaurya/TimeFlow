import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { motion } from "framer-motion";
import {
  LogIn,
  Clock,
  CheckCircle,
  Shield,
  BarChart2,
  Eye,
  EyeOff,
} from "lucide-react";

/* ── Design tokens (Luminous Efficiency / Stitch #15085875783163553981) ── */
const S = {
  primary: "#0058be",
  primaryDark: "#004395",
  primaryLight: "#d8e2ff",
  surface: "#f9f9ff",
  surfaceLowest: "#ffffff",
  onSurface: "#191b23",
  onSurfaceVar: "#424754",
  outline: "#c2c6d6",
  outlineVar: "#e1e2ec",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  font: "Inter, system-ui, -apple-system, sans-serif",
};

const highlights = [
  { icon: CheckCircle, text: "Dual-step approval workflow" },
  { icon: BarChart2, text: "Real-time overtime dashboards" },
  { icon: Clock, text: "Instant status notifications" },
  { icon: Shield, text: "Role-based secure access" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function Login() {
  /* ── original state & logic ── */
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) console.error(message);
    if (isSuccess || user) {
      if (user?.role === "employee") navigate("/dashboard");
      else navigate("/authority");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  /* ── end original logic ── */

  const inputStyle = (name) => ({
    width: "100%",
    padding: "12px 16px",
    paddingRight: name === "password" ? 44 : 16,
    fontSize: 15,
    border: `1.5px solid ${focused === name ? S.primary : S.outline}`,
    borderRadius: 12,
    outline: "none",
    background: S.surfaceLowest,
    color: S.onSurface,
    boxShadow: focused === name ? `0 0 0 3px rgba(0,88,190,0.10)` : "none",
    transition: "all 0.2s",
    fontFamily: S.font,
    boxSizing: "border-box",
  });

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        background: S.surface,
        fontFamily: S.font,
      }}
    >
      {/* ── LEFT PANEL (branding) ───────────────────── */}
      <div
        style={{
          display: "none",
          flex: "0 0 45%",
          height: "100%",
          background: `linear-gradient(145deg, ${S.primary} 0%, ${S.primaryDark} 100%)`,
          padding: "48px 52px",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
        className="login-left-panel"
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
              <circle
                cx="14"
                cy="14"
                r="8"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M14 8v6l4 2"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            TimeFlow
          </span>
        </div>

        {/* Headline */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            Track &amp; Approve Overtime Efficiently
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 16,
              color: "#adc6ff",
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Streamline your team's hours, reduce compliance risks, and automate
            approvals within a unified, executive-grade workspace.
          </motion.p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  animate="show"
                  custom={i}
                  variants={fadeUp}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color="#ffffff" />
                  </div>
                  <span
                    style={{ fontSize: 15, color: "#e1e2ec", fontWeight: 500 }}
                  >
                    {h.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom quote */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 24,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
            }}
          >
            Trusted by 500+ companies to manage overtime fairly and
            transparently.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ──────────────────────── */}
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: S.surface,
          overflowY: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ width: "100%", maxWidth: 440 }}
        >
          {/* Mobile logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: S.primary,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
                <circle
                  cx="14"
                  cy="14"
                  r="8"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M14 8v6l4 2"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: S.primary,
                letterSpacing: "-0.02em",
              }}
            >
              TimeFlow
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 20 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: S.onSurface,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Welcome back
            </h1>
            <p style={{ fontSize: 15, color: S.onSurfaceVar, lineHeight: 1.6 }}>
              Please enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Error banner */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: S.errorContainer,
                border: `1px solid ${S.error}`,
                color: S.error,
                borderRadius: 12,
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 24,
              }}
            >
              {message}
            </motion.div>
          )}

          {/* Form */}
          <form
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: S.onSurfaceVar,
                  marginBottom: 8,
                  letterSpacing: "0.01em",
                }}
              >
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
                placeholder="you@company.com"
                style={inputStyle("email")}
              />
            </div>

            {/* Password */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: S.onSurfaceVar,
                    letterSpacing: "0.01em",
                  }}
                >
                  Password
                </label>
                <button
                  type="button"
                  style={{
                    fontSize: 13,
                    color: S.primary,
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: S.font,
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  required
                  placeholder="Enter your password"
                  style={inputStyle("password")}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: S.onSurfaceVar,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: isLoading ? "#adc6ff" : S.primary,
                color: "#ffffff",
                border: "none",
                borderRadius: 12,
                padding: "14px",
                fontWeight: 700,
                fontSize: 16,
                cursor: isLoading ? "not-allowed" : "pointer",
                boxShadow: isLoading
                  ? "none"
                  : "0 4px 16px rgba(0,88,190,0.28)",
                transition: "all 0.2s",
                fontFamily: S.font,
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                if (!isLoading)
                  e.currentTarget.style.background = S.primaryDark;
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.background = S.primary;
              }}
            >
              <LogIn size={18} />
              {isLoading ? "Signing in…" : "Sign In"}
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "8px 0",
              }}
            >
              <div style={{ flex: 1, height: 1, background: S.outlineVar }} />
              <span
                style={{ fontSize: 13, color: S.onSurfaceVar, fontWeight: 500 }}
              >
                or continue with
              </span>
              <div style={{ flex: 1, height: 1, background: S.outlineVar }} />
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "https://timeflow-8vhk.onrender.com/api/auth/google")
              }
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                background: S.surfaceLowest,
                color: S.onSurface,
                border: `1.5px solid ${S.outline}`,
                borderRadius: 12,
                padding: "12px",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: S.font,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = S.surfaceContainerLow;
                e.currentTarget.style.borderColor = S.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = S.surfaceLowest;
                e.currentTarget.style.borderColor = S.outline;
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </form>

          {/* Footer link */}
          <p
            style={{
              textAlign: "center",
              fontSize: 14,
              color: S.onSurfaceVar,
              marginTop: 16,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: S.primary,
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Register now
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Responsive: show left panel on wider screens */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @media (min-width: 900px) {
          .login-left-panel { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
