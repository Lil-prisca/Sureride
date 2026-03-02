const STATS = [
  { icon: "📋", label: "Total Submissions", key: "total",     color: "#3b82f6" },
  { icon: "⏳", label: "Pending",           key: "pending",   color: "#f59e0b" },
  { icon: "📞", label: "Contacted",         key: "contacted", color: "#8b5cf6" },
  { icon: "✅", label: "Approved",          key: "approved",  color: "#10b981" },
];

const StatsBar = ({ data }) => {
  const counts = {
    total:     data.length,
    pending:   data.filter(d => d.status === "pending").length,
    contacted: data.filter(d => d.status === "contacted").length,
    approved:  data.filter(d => d.status === "approved").length,
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
      {STATS.map((s) => (
        <div key={s.key} className="neu-card card-lift"
          style={{ borderRadius: "1.25rem", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
          {/* Accent top bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, transparent)`, borderRadius: "1.25rem 1.25rem 0 0" }} />

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#94a3b8", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{s.label}</p>
              <p className="font-display" style={{ fontSize: "2.2rem", fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>{counts[s.key]}</p>
            </div>
            <div className="neu-sm" style={{ width: 42, height: 42, borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
              {s.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
