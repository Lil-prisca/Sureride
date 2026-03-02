import { useState } from "react";
import { supabase } from "../../lib/supabase";
import StatusBadge from "./StatusBadge";

const CopyBtn = ({ value, label }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      className="neu-sm"
      style={{
        border: "none",
        cursor: "pointer",
        borderRadius: "0.5rem",
        padding: "0.25rem 0.6rem",
        fontSize: "0.72rem",
        fontWeight: 600,
        color: copied ? "#059669" : "#64748b",
        transition: "color 0.2s",
        background: "none",
        whiteSpace: "nowrap",
      }}
      title={`Copy ${label}`}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
};

const SubmissionsTable = ({ data, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Filter + search + sort
  const filtered = data
    .filter((r) => filterStatus === "all" || r.status === filterStatus)
    .filter((r) => {
      const q = search.toLowerCase();
      return (
        !q ||
        `${r.first_name} ${r.last_name} ${r.email} ${r.phone}`
          .toLowerCase()
          .includes(q)
      );
    })
    .sort((a, b) => {
      const av = a[sortBy] ?? "";
      const bv = b[sortBy] ?? "";
      return sortDir === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
    });

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("investor_leads")
      .update({ status })
      .eq("id", id);
    if (!error) onUpdate(id, status);
    setUpdatingId(null);
  };

  const deleteRow = async (id) => {
    setDeletingId(id);
    const { error } = await supabase
      .from("investor_leads")
      .delete()
      .eq("id", id);
    if (!error) onDelete(id);
    setDeletingId(false);
    setConfirmDelete(null);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Investment Range",
      "Status",
      "Submitted At",
    ];
    const rows = filtered.map((r) => [
      r.first_name,
      r.last_name,
      r.email,
      r.phone,
      r.investment_range,
      r.status,
      new Date(r.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v ?? ""}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "justride_investors.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ col }) => (
    <span
      style={{
        marginLeft: 4,
        opacity: sortBy === col ? 1 : 0.3,
        fontSize: "0.65rem",
      }}
    >
      {sortBy === col ? (sortDir === "asc" ? "▲" : "▼") : "▲"}
    </span>
  );

  const thStyle = (col) => ({
    padding: "0.85rem 1rem",
    textAlign: "left",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    color: sortBy === col ? "#dc2626" : "#94a3b8",
  });

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", flex: 1 }}
        >
          {/* Search */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minWidth: 200,
              maxWidth: 320,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "0.9rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "0.9rem",
              }}
            >
              🔍
            </span>
            <input
              className="input-neu"
              style={{
                borderRadius: "0.75rem",
                padding: "0.65rem 1rem 0.65rem 2.4rem",
                fontSize: "0.875rem",
                color: "#334155",
              }}
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status filter */}
          <select
            className="input-neu"
            style={{
              borderRadius: "0.75rem",
              padding: "0.65rem 1rem",
              fontSize: "0.875rem",
              color: "#334155",
              appearance: "none",
              minWidth: 150,
            }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">⏳ Pending</option>
            <option value="contacted">📞 Contacted</option>
            <option value="approved">✅ Approved</option>
          </select>
        </div>

        {/* Export */}
        <button
          onClick={exportCSV}
          className="btn-red"
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: "0.85rem",
            padding: "0.65rem 1.4rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* Results count */}
      <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "1rem" }}>
        Showing <strong style={{ color: "#334155" }}>{filtered.length}</strong>{" "}
        of {data.length} submissions
      </p>

      {/* Table */}
      <div
        className="neu-card"
        style={{ borderRadius: "1.25rem", overflow: "hidden" }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                {[
                  ["first_name", "Name"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["investment_range", "Range"],
                  ["status", "Status"],
                  ["created_at", "Submitted"],
                ].map(([col, label]) => (
                  <th
                    key={col}
                    style={thStyle(col)}
                    onClick={() => toggleSort(col)}
                  >
                    {label}
                    <SortIcon col={col} />
                  </th>
                ))}
                <th style={{ ...thStyle("actions"), cursor: "default" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "3rem",
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                    }}
                  >
                    No submissions found
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                      background:
                        i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.3)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(220,38,38,0.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.3)")
                    }
                  >
                    {/* Name */}
                    <td
                      style={{ padding: "0.9rem 1rem", whiteSpace: "nowrap" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #dc2626, #f97316)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              color: "white",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                            }}
                          >
                            {r.first_name?.charAt(0)}
                            {r.last_name?.charAt(0)}
                          </span>
                        </div>
                        <span
                          style={{
                            color: "#1e293b",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          {r.first_name} {r.last_name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span style={{ color: "#475569", fontSize: "0.85rem" }}>
                          {r.email}
                        </span>
                        <CopyBtn value={r.email} label="email" />
                      </div>
                    </td>

                    {/* Phone */}
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span style={{ color: "#475569", fontSize: "0.85rem" }}>
                          {r.phone}
                        </span>
                        <CopyBtn value={r.phone} label="phone" />
                      </div>
                    </td>

                    {/* Range */}
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <span
                        className="glass-red"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#dc2626",
                          padding: "0.25rem 0.65rem",
                          borderRadius: "9999px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.investment_range}
                      </span>
                    </td>

                    {/* Status */}
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <StatusBadge status={r.status} />
                        {updatingId === r.id && (
                          <span
                            style={{ fontSize: "0.7rem", color: "#94a3b8" }}
                          >
                            saving...
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td
                      style={{
                        padding: "0.9rem 1rem",
                        color: "#94a3b8",
                        fontSize: "0.8rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {new Date(r.created_at).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "0.9rem 1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          flexWrap: "wrap",
                        }}
                      >
                        {["pending", "contacted", "approved"].map(
                          (s) =>
                            r.status !== s && (
                              <button
                                key={s}
                                onClick={() => updateStatus(r.id, s)}
                                disabled={updatingId === r.id}
                                style={{
                                  fontSize: "0.68rem",
                                  fontWeight: 600,
                                  padding: "0.28rem 0.6rem",
                                  borderRadius: "0.4rem",
                                  border: "none",
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                  background:
                                    s === "pending"
                                      ? "rgba(245,158,11,0.12)"
                                      : s === "contacted"
                                        ? "rgba(139,92,246,0.12)"
                                        : "rgba(16,185,129,0.12)",
                                  color:
                                    s === "pending"
                                      ? "#d97706"
                                      : s === "contacted"
                                        ? "#7c3aed"
                                        : "#059669",
                                }}
                              >
                                {s === "pending"
                                  ? "⏳"
                                  : s === "contacted"
                                    ? "📞"
                                    : "✅"}{" "}
                                {s}
                              </button>
                            ),
                        )}
                        <button
                          onClick={() => setConfirmDelete(r.id)}
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            padding: "0.28rem 0.6rem",
                            borderRadius: "0.4rem",
                            border: "none",
                            cursor: "pointer",
                            background: "rgba(220,38,38,0.08)",
                            color: "#dc2626",
                            transition: "all 0.2s",
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            className="neu-card"
            style={{
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: 380,
              width: "100%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🗑️</div>
            <h3
              className="font-display"
              style={{
                color: "#1e293b",
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Delete Submission?
            </h3>
            <p
              style={{
                color: "#64748b",
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              This action cannot be undone. The submission will be permanently
              removed.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setConfirmDelete(null)}
                className="neu"
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "0.75rem",
                  padding: "0.65rem 1.4rem",
                  fontWeight: 600,
                  color: "#64748b",
                  fontSize: "0.875rem",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteRow(confirmDelete)}
                disabled={deletingId === confirmDelete}
                className="btn-red"
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "0.75rem",
                  padding: "0.65rem 1.4rem",
                  fontWeight: 600,
                  color: "white",
                  fontSize: "0.875rem",
                }}
              >
                {deletingId ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTable;
