import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Loader2, Clock, Send } from "lucide-react";

/* ── Design tokens ── */
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

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: S.onSurfaceVar,
  marginBottom: 6,
  letterSpacing: "0.01em",
};

export default function OvertimeFormModal({ open, onClose, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { requestDate: "", hours: "", reason: "" },
  });


  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  const inputBase = (hasError) => ({
    width: "100%",
    padding: "11px 14px",
    fontSize: 14,
    border: `1.5px solid ${hasError ? S.error : S.outline}`,
    borderRadius: 10,
    outline: "none",
    background: hasError ? S.errorContainer : S.surfaceLowest,
    color: S.onSurface,
    transition: "all 0.2s",
    fontFamily: S.font,
    boxSizing: "border-box",
  });

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(25,27,35,0.50)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          {/* Modal card — click stops propagation so backdrop click does nothing */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 520,
              background: S.surfaceLowest,
              borderRadius: 20,
              boxShadow: "0 24px 80px rgba(0,0,0,0.20)",
              fontFamily: S.font,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px 16px",
              borderBottom: `1px solid ${S.outlineVar}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: S.primaryLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Clock size={20} color={S.primary} />
                </div>
                <div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: S.onSurface, margin: 0, letterSpacing: "-0.01em" }}>
                    Submit Overtime Request
                  </h2>
                  <p style={{ fontSize: 12, color: S.onSurfaceVar, margin: 0, marginTop: 1 }}>
                    Fill in the details below to log extra hours
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: S.onSurfaceVar, borderRadius: 8, padding: 4,
                  display: "flex", alignItems: "center",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = S.outlineVar; e.currentTarget.style.color = S.onSurface; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = S.onSurfaceVar; }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleFormSubmit)} style={{ padding: "20px 24px 24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Date + Hours row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {/* Date */}
                  <div>
                    <label style={labelStyle}>Overtime Date</label>
                    <input
                      id="ot-date"
                      type="date"
                      {...register("requestDate", { required: "Date is required" })}
                      style={inputBase(!!errors.requestDate)}
                    />
                    {errors.requestDate && (
                      <p style={{ fontSize: 12, color: S.error, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <AlertCircle size={12} /> {errors.requestDate.message}
                      </p>
                    )}
                  </div>

                  {/* Hours */}
                  <div>
                    <label style={labelStyle}>Hours Worked</label>
                    <input
                      id="ot-hours"
                      type="number"
                      step="0.5"
                      placeholder="e.g. 2.5"
                      {...register("hours", {
                        required: "Hours is required",
                        min: { value: 0.5, message: "Minimum 0.5 hrs" },
                        pattern: { value: /^[0-9]+\.?[0-9]*$/, message: "Enter a valid number" },
                      })}
                      style={inputBase(!!errors.hours)}
                    />
                    {errors.hours && (
                      <p style={{ fontSize: 12, color: S.error, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <AlertCircle size={12} /> {errors.hours.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label style={labelStyle}>Reason / Justification</label>
                  <textarea
                    id="ot-reason"
                    rows={4}
                    placeholder="Briefly describe why overtime was needed…"
                    {...register("reason", {
                      required: "Reason is required",
                      minLength: { value: 10, message: "Minimum 10 characters" },
                    })}
                    style={{
                      ...inputBase(!!errors.reason),
                      resize: "vertical",
                      minHeight: 96,
                    }}
                  />
                  {errors.reason && (
                    <p style={{ fontSize: 12, color: S.error, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                      <AlertCircle size={12} /> {errors.reason.message}
                    </p>
                  )}
                </div>

                {/* Info note */}
                <div style={{
                  background: S.primaryLight, borderRadius: 10, padding: "10px 14px",
                  display: "flex", gap: 8, alignItems: "flex-start",
                }}>
                  <AlertCircle size={14} color={S.primary} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: S.primary, margin: 0, lineHeight: 1.5 }}>
                    Your request will go through a dual-approval process before being recorded.
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={handleClose}
                    style={{
                      padding: "10px 20px",
                      border: `1.5px solid ${S.outline}`,
                      borderRadius: 10,
                      background: S.surfaceLowest,
                      color: S.onSurface,
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      fontFamily: S.font,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = S.outlineVar; }}
                    onMouseLeave={e => { e.currentTarget.style.background = S.surfaceLowest; }}
                  >
                    Cancel
                  </button>
                  <button
                    id="ot-submit"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "10px 22px",
                      border: "none",
                      borderRadius: 10,
                      background: isSubmitting ? "#adc6ff" : S.primary,
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      fontFamily: S.font,
                      boxShadow: isSubmitting ? "none" : "0 4px 14px rgba(0,88,190,0.28)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = S.primaryDark; }}
                    onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = S.primary; }}
                  >
                    {isSubmitting
                      ? <><Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} /> Submitting…</>
                      : <><Send size={16} /> Submit Request</>
                    }
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
