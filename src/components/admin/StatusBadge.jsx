const STATUS_STYLES = {
  pending:   { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  color: "#d97706", label: "⏳ Pending"   },
  contacted: { bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.3)",  color: "#7c3aed", label: "📞 Contacted" },
  approved:  { bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)",  color: "#059669", label: "✅ Approved"  },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em",
      padding: "0.3rem 0.75rem", borderRadius: "9999px", whiteSpace: "nowrap",
      backdropFilter: "blur(8px)",
    }}>
      {s.label}
    </span>
  );
};

export default StatusBadge;
