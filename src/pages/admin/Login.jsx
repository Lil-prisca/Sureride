import { useState } from "react";
import { supabase } from "../../lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) setError(authError.message);
    setLoading(false);
  };

  return (
    <div
      className="mesh-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div
        className="float-orb"
        style={{
          position: "absolute",
          top: "10%",
          right: "8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="float-orb2"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "2.2rem",
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ color: "#1e293b" }}>Just</span>
            <span className="text-gradient">Ride</span>
          </div>
          <div
            className="glass-red"
            style={{
              display: "inline-flex",
              borderRadius: "9999px",
              padding: "0.3rem 1rem",
            }}
          >
            <span
              style={{
                color: "#dc2626",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Admin Portal
            </span>
          </div>
        </div>

        {/* Card */}
        <div
          className="neu-card"
          style={{
            borderRadius: "1.75rem",
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #dc2626, #f97316)",
              borderRadius: "1.75rem 1.75rem 0 0",
            }}
          />

          <h2
            className="font-display"
            style={{
              color: "#1e293b",
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: "0.4rem",
            }}
          >
            Welcome back
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.875rem",
              marginBottom: "2rem",
              fontWeight: 300,
            }}
          >
            Sign in to access your admin dashboard.
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#94a3b8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                className="input-neu"
                style={{
                  borderRadius: "0.875rem",
                  padding: "0.8rem 1rem",
                  fontSize: "0.9rem",
                  color: "#334155",
                }}
                placeholder="admin@justride.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#94a3b8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  className="input-neu"
                  style={{
                    borderRadius: "0.875rem",
                    padding: "0.8rem 3rem 0.8rem 1rem",
                    fontSize: "0.9rem",
                    color: "#334155",
                  }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "0.9rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    fontSize: "1rem",
                  }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="glass-red"
                style={{
                  borderRadius: "0.75rem",
                  padding: "0.75rem 1rem",
                  marginBottom: "1.2rem",
                }}
              >
                <p
                  style={{
                    color: "#dc2626",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                  }}
                >
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-red"
              disabled={loading}
              style={{
                width: "100%",
                color: "white",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "0.95rem",
                borderRadius: "0.875rem",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <div
                    className="spinner"
                    style={{
                      width: 16,
                      height: 16,
                      border: "2px solid white",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                    }}
                  />
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.78rem",
            marginTop: "1.5rem",
          }}
        >
          🔒 Restricted access — Sure Ride Mobility admins only
        </p>
      </div>
    </div>
  );
};

export default Login;
