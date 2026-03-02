import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import AdminNav from "../../components/admin/AdminNav";
import StatsBar from "../../components/admin/StatsBar";
import SubmissionsTable from "../../components/admin/SubmissionsTable";

const Dashboard = ({ session }) => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  const fetchData = async () => {
    setLoading(true);
    const { data: rows, error: err } = await supabase
      .from("investor_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) setError(err.message);
    else setData(rows || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpdate = (id, status) => {
    setData(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleDelete = (id) => {
    setData(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f7" }}>
      <AdminNav adminEmail={session?.user?.email} submissionCount={data.length} />

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Page title */}
        <div style={{ marginBottom: "2rem" }}>
          <div className="glass-red" style={{ display: "inline-flex", borderRadius: "9999px", padding: "0.3rem 0.9rem", marginBottom: "0.75rem" }}>
            <span style={{ color: "#dc2626", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Investor Submissions</span>
          </div>
          <h1 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1 }}>
            <span className="text-gradient-dark">Investor </span>
            <span className="text-gradient">Dashboard</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "0.4rem", fontWeight: 300 }}>
            Manage and track all investor interest submissions in real-time.
          </p>
        </div>

        {/* Stats */}
        {!loading && <StatsBar data={data} />}

        {/* Content */}
        {loading ? (
          <div className="neu-card" style={{ borderRadius: "1.25rem", padding: "4rem", textAlign: "center" }}>
            <div className="spinner" style={{ width: 36, height: 36, border: "3px solid #e2e8f0", borderTopColor: "#dc2626", borderRadius: "50%", margin: "0 auto 1rem" }} />
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Loading submissions...</p>
          </div>
        ) : error ? (
          <div className="glass-red" style={{ borderRadius: "1.25rem", padding: "2rem", textAlign: "center" }}>
            <p style={{ color: "#dc2626", fontWeight: 600, marginBottom: "1rem" }}>⚠️ {error}</p>
            <button onClick={fetchData} className="btn-red"
              style={{ color: "white", fontWeight: 600, fontSize: "0.875rem", padding: "0.6rem 1.4rem", borderRadius: "0.75rem", border: "none", cursor: "pointer" }}>
              Try Again
            </button>
          </div>
        ) : (
          <SubmissionsTable data={data} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
