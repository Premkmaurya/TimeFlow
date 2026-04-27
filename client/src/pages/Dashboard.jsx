import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequest, reset } from "../features/overtime/overtimeSlice";
import axiosInstance from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, Plus, CheckCircle, XCircle, Clock3,
  LayoutDashboard, ListOrdered, LogOut, ChevronRight,
  TrendingUp, AlertCircle, Inbox, User,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout, reset as authReset } from "../features/auth/authSlice";
import OvertimeFormModal from "../components/dashboard/OvertimeFormModal";

/* ─── Design tokens (Luminous Efficiency) ────── */
const S = {
  primary: "#0058be",
  primaryDark: "#004395",
  primaryLight: "#d8e2ff",
  surface: "#f9f9ff",
  surfaceLowest: "#ffffff",
  surfaceContainer: "#ecedf7",
  surfaceContainerLow: "#f2f3fd",
  onSurface: "#191b23",
  onSurfaceVar: "#424754",
  outline: "#c2c6d6",
  outlineVar: "#e1e2ec",
  tertiary: "#924700",
  tertiaryLight: "#ffdcc6",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  font: "Inter, system-ui, -apple-system, sans-serif",
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07 } }),
};

/* ─── Status helpers ────────────────────────── */
const STATUS_CONFIG = {
  approved: {
    label: "Approved",
    bg: "#dcfce7", color: "#15803d",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    bg: S.errorContainer, color: S.error,
    icon: XCircle,
  },
  pending: {
    label: "Pending",
    bg: "#fef3c7", color: "#92400e",
    icon: Clock3,
  },
  pending_second: {
    label: "Pending 2nd",
    bg: "#ede9fe", color: "#5b21b6",
    icon: Clock3,
  },
};

const getStatus = (status) =>
  STATUS_CONFIG[status] || STATUS_CONFIG.pending;

/* ─── Sidebar nav items ─────────────────────── */
const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "requests", label: "My Requests", icon: ListOrdered },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const employees = useSelector((state) => state.overtime.employees);
  const isLoading = useSelector((state) => state.overtime.isLoading);

  const [activeNav, setActiveNav] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ── fetchRequest returns a flat array of the current user's requests ── */
  const userRequests = Array.isArray(employees) ? employees : [];

  const totalApproved = userRequests
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => sum + Number(r.hours), 0);

  const totalPending = userRequests.filter(
    (r) => r.status === "pending" || r.status === "pending_second"
  ).length;

  const totalRejected = userRequests.filter((r) => r.status === "rejected").length;

  useEffect(() => {
    if (user) dispatch(fetchRequest());
    return () => { dispatch(reset()); };
  }, [user, dispatch]);

  const onSubmitOvertime = async (data) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/overtime", data);
      setShowModal(false);
      dispatch(fetchRequest()); // refresh the list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/");
  };
  /* ── End original logic ── */

  /* ─── Stat cards ─────────────────────────── */
  const stats = [
    {
      label: "Approved Hours",
      value: `${totalApproved}h`,
      icon: TrendingUp,
      iconBg: S.primaryLight,
      iconColor: S.primary,
      delta: "Total this period",
    },
    {
      label: "Pending Requests",
      value: totalPending,
      icon: Clock3,
      iconBg: "#fef3c7",
      iconColor: "#92400e",
      delta: "Awaiting review",
    },
    {
      label: "Total Submitted",
      value: userRequests.length,
      icon: ListOrdered,
      iconBg: S.surfaceContainer,
      iconColor: S.onSurfaceVar,
      delta: "All time",
    },
    {
      label: "Rejected",
      value: totalRejected,
      icon: XCircle,
      iconBg: S.errorContainer,
      iconColor: S.error,
      delta: "Need review",
    },
  ];

  const recentRequests = [...userRequests]
    .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
    .slice(0, 5);

  return (
    <div style={{
      display: "flex",
      height: "100%",
      background: S.surfaceContainerLow,
      fontFamily: S.font,
      minHeight: "100vh",
    }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 19 }}
        />
      )}

      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside className={`dash-sidebar${sidebarOpen ? ' dash-sidebar--open' : ''}`} style={{
        width: 240,
        flexShrink: 0,
        background: S.surfaceLowest,
        borderRight: `1px solid ${S.outlineVar}`,
        display: "flex",
        flexDirection: "column",
        padding: "24px 12px",
        position: "sticky",
        top: 0,
        height: "100vh",
        boxSizing: "border-box",
        zIndex: 20,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", marginBottom: 32 }}>
          <div style={{ width: 32, height: 32, background: S.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg viewBox="0 0 28 28" fill="none" width="22" height="22">
              <circle cx="14" cy="14" r="8" stroke="white" strokeWidth="2.5" fill="none" />
              <path d="M14 8v6l4 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: S.onSurface, letterSpacing: "-0.02em", lineHeight: 1 }}>TimeFlow</div>
            <div style={{ fontSize: 10, color: S.onSurfaceVar, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Management System</div>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: active ? S.primaryLight : "transparent",
                  color: active ? S.primary : S.onSurfaceVar,
                  fontWeight: active ? 600 : 500,
                  fontSize: 14,
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  fontFamily: S.font,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = S.surfaceContainer; e.currentTarget.style.color = S.onSurface; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = S.onSurfaceVar; } }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ borderTop: `1px solid ${S.outlineVar}`, paddingTop: 16 }}>
          {/* User info */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: S.primaryLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: S.primary }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: S.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{ fontSize: 11, color: S.onSurfaceVar, textTransform: "capitalize" }}>{user?.role}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px",
              borderRadius: 10, border: "none",
              background: "transparent",
              color: S.error,
              fontWeight: 500, fontSize: 14,
              cursor: "pointer",
              width: "100%", textAlign: "left",
              fontFamily: S.font,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = S.errorContainer; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────── */}
      <main className={`dash-main${sidebarOpen ? ' dash-main--shifted' : ''}`} style={{
        flex: 1, padding: "32px 36px", overflowY: "auto",
        transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Mobile top bar */}
        <div className="dash-mobile-topbar" style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button onClick={() => setSidebarOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: S.onSurface, fontFamily: S.font }}
          >
            <svg viewBox="0 0 28 28" fill="none" width="22" height="22"><circle cx="14" cy="14" r="8" stroke={S.primary} strokeWidth="2.5" fill="none"/><path d="M14 8v6l4 2" stroke={S.primary} strokeWidth="2.5" strokeLinecap="round"/></svg>
            TimeFlow
            TimeFlow
          </button>
          <button onClick={() => setSidebarOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.onSurface, padding: 4, display: 'flex', alignItems: 'center' }}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Top header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            marginBottom: 28,
          }}
        >
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: S.onSurface, letterSpacing: "-0.02em", margin: 0, marginBottom: 4 }}>
              Welcome back, {user?.firstName}
            </h1>
            <p style={{ fontSize: 14, color: S.onSurfaceVar, margin: 0 }}>
              Here's your overtime overview for this period.
            </p>
          </div>

          <button
            id="submit-overtime-btn"
            onClick={() => setShowModal(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: S.primary,
              color: "#ffffff",
              border: "none",
              borderRadius: 12,
              padding: "11px 20px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: S.font,
              boxShadow: "0 4px 16px rgba(0,88,190,0.28)",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = S.primaryDark; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = S.primary; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Plus size={18} />
            Submit Overtime
          </button>
        </motion.div>

        {/* ── Stat cards ── */}
        <div className="dash-stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial="hidden"
                animate="show"
                custom={i}
                variants={fadeUp}
                style={{
                  background: S.surfaceLowest,
                  border: `1px solid ${S.outlineVar}`,
                  borderRadius: 16,
                  padding: "20px 20px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: S.onSurfaceVar, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {s.label}
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={s.iconColor} />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: S.onSurface, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>
                  {isLoading ? "—" : s.value}
                </div>
                <div style={{ fontSize: 12, color: S.onSurfaceVar }}>{s.delta}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Requests Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            background: S.surfaceLowest,
            border: `1px solid ${S.outlineVar}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          }}
        >
          {/* Table header */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "18px 24px",
            borderBottom: `1px solid ${S.outlineVar}`,
          }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: S.onSurface, margin: 0, letterSpacing: "-0.01em" }}>
                {activeNav === "overview" ? "Recent Activity" : "All My Requests"}
              </h2>
              <p style={{ fontSize: 13, color: S.onSurfaceVar, margin: 0, marginTop: 2 }}>
                {activeNav === "overview"
                  ? `Showing your last ${Math.min(recentRequests.length, 5)} submissions`
                  : `${userRequests.length} total request${userRequests.length !== 1 ? "s" : ""}`
                }
              </p>
            </div>
            {activeNav === "overview" && userRequests.length > 5 && (
              <button
                onClick={() => setActiveNav("requests")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: 13, fontWeight: 600, color: S.primary,
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: S.font,
                }}
              >
                View all <ChevronRight size={15} />
              </button>
            )}
          </div>

          {isLoading ? (
            <div style={{ padding: "48px", textAlign: "center", color: S.onSurfaceVar }}>
              <Clock size={28} color={S.outline} style={{ marginBottom: 12 }} />
              <p style={{ margin: 0, fontSize: 14 }}>Loading your requests…</p>
            </div>
          ) : (activeNav === "overview" ? recentRequests : userRequests).length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
              <thead>
                <tr style={{ background: S.surfaceContainerLow }}>
                  {["Date", "Hours", "Reason", "Status"].map((col) => (
                    <th key={col} style={{
                      padding: "11px 20px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 700,
                      color: S.onSurfaceVar,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${S.outlineVar}`,
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(activeNav === "overview" ? recentRequests : userRequests).map((req, idx) => {
                  const st = getStatus(req.status);
                  const Icon = st.icon;
                  return (
                    <tr
                      key={req.id || idx}
                      style={{
                        borderBottom: `1px solid ${S.outlineVar}`,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = S.surfaceContainerLow}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 20px", fontSize: 14, color: S.onSurface, whiteSpace: "nowrap" }}>
                        {new Date(req.requestDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 14, whiteSpace: "nowrap" }}>
                        <span style={{ fontWeight: 700, color: S.primary }}>{req.hours}h</span>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 14, color: S.onSurfaceVar, maxWidth: 260 }}>
                        <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {req.reason}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          background: st.bg, color: st.color,
                          borderRadius: 99, padding: "4px 10px",
                          fontSize: 12, fontWeight: 600,
                        }}>
                          <Icon size={13} />
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          ) : (
            <div style={{ padding: "60px 24px", textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: S.surfaceContainer,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Inbox size={24} color={S.onSurfaceVar} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: S.onSurface, margin: 0, marginBottom: 8 }}>No requests yet</h3>
              <p style={{ fontSize: 14, color: S.onSurfaceVar, margin: 0, marginBottom: 20 }}>
                You haven't submitted any overtime requests yet.
              </p>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: S.primaryLight, color: S.primary,
                  border: "none", borderRadius: 10, padding: "10px 20px",
                  fontWeight: 600, fontSize: 14, cursor: "pointer",
                  fontFamily: S.font,
                }}
              >
                <Plus size={16} /> Submit Your First Request
              </button>
            </div>
          )}
        </motion.div>
      </main>

      {/* ── Modal ─────────────────────────────────── */}
      <OvertimeFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={onSubmitOvertime}
        isSubmitting={isSubmitting}
      />
      <style>{`
        @media (max-width: 900px) {
          .dash-sidebar {
            position: fixed !important;
            left: -260px;
            top: 0;
            height: 100vh;
            transition: left 0.28s cubic-bezier(0.4,0,0.2,1);
            box-shadow: 4px 0 24px rgba(0,0,0,0.10);
          }
          .dash-sidebar--open {
            left: 0 !important;
          }
          .dash-mobile-topbar { display: flex !important; }
          .dash-main { padding: 16px 16px 80px !important; }
          .dash-main--shifted {
            transform: translateX(240px);
          }
        }
        @media (max-width: 700px) {
          .dash-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 420px) {
          .dash-stat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
