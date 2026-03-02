import { useState } from "react";
import { useReveal } from "../hooks";
import { supabase } from "../lib/supabase";

const Register = () => {
  useReveal();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    range: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.fname || !form.email || !form.phone) return alert("...");
    setLoading(true);
    const { error } = await supabase.from("investor_leads").insert({
      first_name: form.fname,
      last_name: form.lname,
      email: form.email,
      phone: form.phone,
      investment_range: form.range,
      status: "pending",
    });
    setLoading(false);
    if (!error) setSubmitted(true);
    else alert("Something went wrong. Please try again.");
  };

  return (
    <section
      id="register"
      style={{ padding: "7rem 1.5rem", background: "#f0f2f7" }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Header */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <div
            className="glass-red"
            style={{
              display: "inline-flex",
              borderRadius: "9999px",
              padding: "0.4rem 1rem",
              marginBottom: "1rem",
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
              Join Us
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 1.05,
              marginBottom: "1rem",
            }}
          >
            <span className="text-gradient-dark">Become an </span>
            <span className="text-gradient">Investor</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem", fontWeight: 300 }}>
            Register your interest. No commitment — our team will reach out
            within 24 hours.
          </p>
        </div>

        {/* Form card */}
        <div
          className="reveal-scale neu-card"
          style={{
            borderRadius: "1.75rem",
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top gradient bar */}
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

          {!submitted ? (
            <div>
              <h3
                className="font-display"
                style={{
                  color: "#1e293b",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "0.4rem",
                }}
              >
                Register Your Interest
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.875rem",
                  marginBottom: "2rem",
                  fontWeight: 300,
                }}
              >
                No commitment yet — just fill in the form and we'll be in touch.
              </p>

              {/* Name row */}
              <div
                className="name-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {[
                  { label: "First Name", key: "fname", ph: "Chidi" },
                  { label: "Last Name", key: "lname", ph: "Okonkwo" },
                ].map((f) => (
                  <div key={f.key}>
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
                      {f.label}
                    </label>
                    <input
                      className="input-neu"
                      style={{
                        borderRadius: "0.875rem",
                        padding: "0.75rem 1rem",
                        fontSize: "0.9rem",
                        color: "#334155",
                      }}
                      placeholder={f.ph}
                      value={form[f.key]}
                      onChange={set(f.key)}
                    />
                  </div>
                ))}
              </div>

              {/* Email & Phone */}
              {[
                {
                  label: "Email Address",
                  key: "email",
                  ph: "you@example.com",
                  type: "email",
                },
                {
                  label: "Phone Number",
                  key: "phone",
                  ph: "+234 800 000 0000",
                  type: "tel",
                },
              ].map((f) => (
                <div key={f.key} style={{ marginBottom: "1rem" }}>
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
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    className="input-neu"
                    style={{
                      borderRadius: "0.875rem",
                      padding: "0.75rem 1rem",
                      fontSize: "0.9rem",
                      color: "#334155",
                    }}
                    placeholder={f.ph}
                    value={form[f.key]}
                    onChange={set(f.key)}
                  />
                </div>
              ))}

              {/* Investment range */}
              <div style={{ marginBottom: "2rem" }}>
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
                  Investment Range (₦)
                </label>
                <select
                  className="input-neu"
                  style={{
                    borderRadius: "0.875rem",
                    padding: "0.75rem 1rem",
                    fontSize: "0.9rem",
                    color: "#334155",
                    appearance: "none",
                  }}
                  value={form.range}
                  onChange={set("range")}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>₦100,000 – ₦300,000</option>
                  <option>₦300,000 – ₦500,000</option>
                  <option>₦500,000 – ₦1,000,000</option>
                  <option>₦1,000,000+</option>
                </select>
              </div>

              {/* Submit */}
              <button
                className="btn-red"
                onClick={submit}
                disabled={loading}
                style={{
                  width: "100%",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "1rem",
                  borderRadius: "0.875rem",
                  letterSpacing: "0.05em",
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
                    Processing...
                  </>
                ) : (
                  "Submit My Interest 🏍️"
                )}
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                  marginTop: "1rem",
                }}
              >
                🔒 Your data is safe. We will never share your information.
              </p>
            </div>
          ) : (
            <div
              className="fade-in-up"
              style={{ textAlign: "center", padding: "3rem 1rem" }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
              <h3
                className="font-display"
                style={{
                  color: "#1e293b",
                  fontSize: "2rem",
                  fontWeight: 800,
                  marginBottom: "0.75rem",
                }}
              >
                You're on the list!
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontWeight: 300,
                  lineHeight: 1.78,
                  maxWidth: 360,
                  margin: "0 auto 1.5rem",
                }}
              >
                Thanks for your interest in Just Ride. Our team will reach out
                within <strong style={{ color: "#334155" }}>24 hours</strong> to
                walk you through everything.
              </p>
              <div
                className="glass-red"
                style={{
                  borderRadius: "1rem",
                  padding: "0.75rem 1.5rem",
                  display: "inline-block",
                }}
              >
                <p
                  style={{
                    color: "#dc2626",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  🏍️ Welcome to the Just Ride family!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;
