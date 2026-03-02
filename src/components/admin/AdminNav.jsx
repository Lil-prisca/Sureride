import { useState } from "react";
import { supabase } from "../../lib/supabase";

const AdminNav = ({ adminEmail, submissionCount }) => {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
  };

  return (
    <nav
      className="glass"
      style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "1rem 2.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.65)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        {/* Logo + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div className="font-display" style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#1e293b" }}>Just</span>
            <span className="text-gradient">Ride</span>
          </div>
          <div className="glass-red" style={{ borderRadius: "9999px", padding: "0.25rem 0.85rem" }}>
            <span style={{ color: "#dc2626", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Admin Dashboard
            </span>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Submission count pill */}
          <div className="neu-sm" style={{ borderRadius: "9999px", padding: "0.4rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#dc2626", display: "inline-block" }} />
            <span style={{ color: "#475569", fontSize: "0.8rem", fontWeight: 600 }}>
              {submissionCount} Submissions
            </span>
          </div>

          {/* Admin email */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #dc2626, #f97316)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "0.8rem", fontWeight: 700 }}>
                {adminEmail?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span style={{ color: "#64748b", fontSize: "0.82rem", fontWeight: 500 }}>{adminEmail}</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="neu"
            style={{ borderRadius: "0.75rem", padding: "0.5rem 1.1rem", border: "none", cursor: "pointer", color: "#64748b", fontSize: "0.82rem", fontWeight: 600, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#dc2626"}
            onMouseLeave={e => e.target.style.color = "#64748b"}
          >
            {loggingOut ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
