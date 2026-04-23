import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchEmployees,
  approveRequest,
  rejectRequest,
} from "../features/overtime/overtimeSlice";
import { logout, reset as authReset } from "../features/auth/authSlice";
import {
  Users, LogOut, CheckCircle, XCircle, Clock3,
  ChevronRight, Inbox, Search, BarChart2, Clock,
  TrendingUp, UserCheck,
} from "lucide-react";

/* ─── Design tokens ─────────────────────── */
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
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  font: "Inter, system-ui, -apple-system, sans-serif",
};

const STATUS = {
  approved: { label: "Approved", bg: "#dcfce7", color: "#15803d", icon: CheckCircle },
  rejected: { label: "Rejected", bg: S.errorContainer, color: S.error, icon: XCircle },
  pending: { label: "Pending", bg: "#fef3c7", color: "#92400e", icon: Clock3 },
  pending_second: { label: "Pending 2nd", bg: "#ede9fe", color: "#5b21b6", icon: Clock3 },
};
const getStatus = (s) => STATUS[s] || STATUS.pending;

const initials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

export default function AuthorityPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const employeeList = useSelector((s) => s.overtime.employeeList);
  const isLoading = useSelector((s) => s.overtime.isLoading);

  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  /* ── original logic ── */
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleApprove = (reqId) => dispatch(approveRequest(reqId));
  const handleReject = (reqId) => dispatch(rejectRequest(reqId));

  const onLogout = () => {
    dispatch(logout());
    dispatch(authReset());
    navigate("/login");
  };
  /* ── end original logic ── */

  const filtered = employeeList.filter((e) =>
    (e.name || e.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const selected = employeeList.find((e) => e.id === selectedId);

  /* summary stats */
  const totalEmployees = employeeList.length;
  const pendingCount = employeeList.reduce((n, e) =>
    n + (e.requests || []).filter((r) => r.status === "pending").length, 0);
  const approvedHours = employeeList.reduce((n, e) =>
    n + (e.requests || []).filter((r) => r.status === "approved")
      .reduce((s, r) => s + Number(r.hours), 0), 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: S.surfaceContainerLow, fontFamily: S.font }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 240, flexShrink: 0, background: S.surfaceLowest,
        borderRight: `1px solid ${S.outlineVar}`,
        display: "flex", flexDirection: "column",
        padding: "24px 12px", position: "sticky", top: 0, height: "100vh",
        boxSizing: "border-box", zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", marginBottom: 32 }}>
          <div style={{ width: 32, height: 32, background: S.primary, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
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

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {/* Employee list */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            style={{ background: S.surfaceLowest, border: `1px solid ${S.outlineVar}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${S.outlineVar}` }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: S.onSurface, margin: 0, marginBottom: 10 }}>Employees</h2>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <Search size={14} color={S.onSurfaceVar} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  placeholder="Search employees…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: "100%", padding: "8px 10px 8px 30px", border: `1.5px solid ${S.outline}`, borderRadius: 10, fontSize: 13, fontFamily: S.font, color: S.onSurface, background: S.surfaceContainerLow, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
              {isLoading ? (
                <div style={{ padding: 24, textAlign: "center", color: S.onSurfaceVar, fontSize: 13 }}>Loading…</div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", color: S.onSurfaceVar, fontSize: 13 }}>No employees found</div>
              ) : filtered.map((emp) => {
                const pending = (emp.requests || []).filter(r => r.status === "pending").length;
                const active = selectedId === emp.id;
                return (
                  <button key={emp.id} onClick={() => setSelectedId(emp.id)}
                    style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 12, border: `1.5px solid ${active ? S.primary : "transparent"}`, background: active ? S.primaryLight : "transparent", cursor: "pointer", fontFamily: S.font, textAlign: "left", marginBottom: 4, transition: "all 0.15s" }}
                    onMouseEnter={e => { if (!active) e.currentTarget.style.background = S.surfaceContainerLow; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: active ? S.primary : S.surfaceContainer, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: active ? "#fff" : S.onSurfaceVar }}>{initials(emp.name)}</span>
                    </div>
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: active ? S.primary : S.onSurface, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.name}</div>
                      <div style={{ fontSize: 11, color: S.onSurfaceVar, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{emp.email}</div>
                    </div>
                    {pending > 0 && (
                      <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 700, borderRadius: 99, padding: "2px 7px", flexShrink: 0 }}>{pending}</span>
                    )}
                    <ChevronRight size={14} color={S.onSurfaceVar} />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </nav>

        {/* User + logout */}
        <div style={{ borderTop: `1px solid ${S.outlineVar}`, paddingTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: S.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: S.primary }}>
                {initials(`${user?.firstName} ${user?.lastName}`)}
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
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: "transparent", color: S.error, fontWeight: 500, fontSize: 14, cursor: "pointer", width: "100%", fontFamily: S.font, transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = S.errorContainer}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: S.onSurface, letterSpacing: "-0.02em", margin: 0, marginBottom: 4 }}>
            Team Approvals
          </h1>
          <p style={{ fontSize: 14, color: S.onSurfaceVar, margin: 0 }}>
            Review and action overtime requests from your team.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Employees", value: isLoading ? "—" : totalEmployees, icon: UserCheck, iconBg: S.primaryLight, iconColor: S.primary, sub: "In your team" },
            { label: "Pending Actions", value: isLoading ? "—" : pendingCount, icon: Clock3, iconBg: "#fef3c7", iconColor: "#92400e", sub: "Awaiting your review" },
            { label: "Approved Hours", value: isLoading ? "—" : `${approvedHours}h`, icon: TrendingUp, iconBg: "#dcfce7", iconColor: "#15803d", sub: "Total this period" },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ background: S.surfaceLowest, border: `1px solid ${S.outlineVar}`, borderRadius: 16, padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: S.onSurfaceVar, textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.label}</div>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={c.iconColor} />
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: S.onSurface, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{c.value}</div>
                <div style={{ fontSize: 12, color: S.onSurfaceVar }}>{c.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Content: employee list + detail */}
        <div>
          {/* Detail panel */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
            style={{ background: S.surfaceLowest, border: `1px solid ${S.outlineVar}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ height: "100%", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: S.surfaceContainer, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Users size={24} color={S.onSurfaceVar} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: S.onSurface, margin: 0, marginBottom: 8 }}>Select an Employee</h3>
                  <p style={{ fontSize: 14, color: S.onSurfaceVar, margin: 0, textAlign: "center" }}>
                    Choose an employee from the list to review their overtime requests.
                  </p>
                </motion.div>
              ) : (
                <motion.div key={selected.id}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", flexDirection: "column", height: "100%" }}>

                  {/* Employee header */}
                  <div style={{ padding: "20px 24px", borderBottom: `1px solid ${S.outlineVar}`, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: S.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: S.primary }}>{initials(selected.name)}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: S.onSurface, letterSpacing: "-0.01em" }}>{selected.name}</div>
                      <div style={{ fontSize: 13, color: S.onSurfaceVar }}>{selected.email}</div>
                    </div>
                    {/* Mini stats */}
                    <div style={{ display: "flex", gap: 20 }}>
                      {[
                        { label: "Total Hours", value: `${selected.totalOvertimeHours ?? 0}h`, color: S.primary },
                        { label: "Requests", value: (selected.requests || []).length, color: S.onSurface },
                      ].map((st, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 20, fontWeight: 800, color: st.color, letterSpacing: "-0.02em" }}>{st.value}</div>
                          <div style={{ fontSize: 11, color: S.onSurfaceVar, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{st.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requests table */}
                  <div style={{ flex: 1, overflowY: "auto" }}>
                    {(selected.requests || []).length === 0 ? (
                      <div style={{ padding: 48, textAlign: "center", color: S.onSurfaceVar }}>
                        <Inbox size={28} color={S.outline} style={{ marginBottom: 12 }} />
                        <p style={{ margin: 0, fontSize: 14 }}>No requests from this employee.</p>
                      </div>
                    ) : (
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: S.surfaceContainerLow }}>
                            {["Date", "Hours", "Reason", "Status", "Actions"].map(col => (
                              <th key={col} style={{ padding: "11px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: S.onSurfaceVar, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${S.outlineVar}` }}>{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(selected.requests || []).map((req, idx) => {
                            const st = getStatus(req.status);
                            const Icon = st.icon;
                            const isPending = req.status === "pending" || req.status === "pending_second";
                            return (
                              <tr key={req.id || idx}
                                style={{ borderBottom: `1px solid ${S.outlineVar}`, transition: "background 0.15s" }}
                                onMouseEnter={e => e.currentTarget.style.background = S.surfaceContainerLow}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                              >
                                <td style={{ padding: "14px 20px", fontSize: 13, color: S.onSurface, whiteSpace: "nowrap" }}>
                                  {new Date(req.requestDate || req.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                </td>
                                <td style={{ padding: "14px 20px", fontSize: 14, whiteSpace: "nowrap" }}>
                                  <span style={{ fontWeight: 700, color: S.primary }}>{req.hours}h</span>
                                </td>
                                <td style={{ padding: "14px 20px", fontSize: 13, color: S.onSurfaceVar, maxWidth: 200 }}>
                                  <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{req.reason}</span>
                                </td>
                                <td style={{ padding: "14px 20px" }}>
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: st.bg, color: st.color, borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>
                                    <Icon size={12} /> {st.label}
                                  </span>
                                </td>
                                <td style={{ padding: "14px 20px" }}>
                                  {isPending ? (
                                    <div style={{ display: "flex", gap: 8 }}>
                                      <button onClick={() => handleApprove(req.id)}
                                        style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8, border: "none", background: "#dcfce7", color: "#15803d", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: S.font, transition: "all 0.15s" }}
                                        onMouseEnter={e => e.currentTarget.style.background = "#bbf7d0"}
                                        onMouseLeave={e => e.currentTarget.style.background = "#dcfce7"}
                                      >
                                        <CheckCircle size={13} /> Approve
                                      </button>
                                      <button onClick={() => handleReject(req.id)}
                                        style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8, border: "none", background: S.errorContainer, color: S.error, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: S.font, transition: "all 0.15s" }}
                                        onMouseEnter={e => e.currentTarget.style.background = "#ffc9c6"}
                                        onMouseLeave={e => e.currentTarget.style.background = S.errorContainer}
                                      >
                                        <XCircle size={13} /> Reject
                                      </button>
                                    </div>
                                  ) : (
                                    <span style={{ fontSize: 12, color: S.onSurfaceVar }}>—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  );
}