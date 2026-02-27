import { useRef } from "react";
import { useReveal, useBarAnimate } from "../hooks";

const TIERS = [
  { label: "Starter", pct: "X%", bar: "40%", amount: "₦100k – ₦300k" },
  { label: "Growth",  pct: "X%", bar: "58%", amount: "₦300k – ₦500k" },
  { label: "Premium", pct: "X%", bar: "74%", amount: "₦500k – ₦1M"   },
  { label: "Elite",   pct: "X%", bar: "92%", amount: "₦1M+"           },
];

const BREAKDOWN = [
  { label: "Investment Duration",  val: "12 Months",      red: false },
  { label: "Payment Frequency",   val: "Monthly",         red: false },
  { label: "Monthly Commission",  val: "Up to XX%",       red: true  },
  { label: "Capital After Cycle", val: "Returned to You", red: false },
  { label: "Management Fee",      val: "Zero",            red: false },
];

const ROI = () => {
  useReveal();
  const barRef = useRef(null);
  useBarAnimate(barRef);

  return (
    <section id="roi" style={{ padding: "7rem 1.5rem", background: "#f0f2f7" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="glass-red" style={{ display: "inline-flex", borderRadius: "9999px", padding: "0.4rem 1rem", marginBottom: "1rem" }}>
            <span style={{ color: "#dc2626", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Your Returns</span>
          </div>
          <h2 className="font-display" style={{ fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.05, marginBottom: "1rem" }}>
            <span className="text-gradient-dark">Earn Every Month, </span>
            <span className="text-gradient">Rain or Shine</span>
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto", fontWeight: 300, lineHeight: 1.78 }}>
            When our bikes are on the road earning, so are you. Commission is calculated and paid to you directly every month.
          </p>
        </div>

        <div className="roi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          {/* Bar chart */}
          <div className="reveal-left neu-card" style={{ borderRadius: "1.5rem", padding: "2.5rem" }} ref={barRef}>
            <h3 style={{ color: "#94a3b8", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2rem" }}>
              Commission By Investment Tier
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
              {TIERS.map((t, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div>
                      <span style={{ color: "#334155", fontWeight: 600, fontSize: "0.9rem" }}>{t.label}</span>
                      <span style={{ color: "#94a3b8", fontSize: "0.75rem", marginLeft: "0.75rem" }}>{t.amount}</span>
                    </div>
                    <span className="font-display text-gradient" style={{ fontWeight: 800, fontSize: "1.1rem" }}>{t.pct}</span>
                  </div>
                  <div className="neu-inset" style={{ borderRadius: "9999px", height: 10, overflow: "hidden" }}>
                    <div className="bar-fill" data-width={t.bar} />
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.72rem", marginTop: "1.5rem", fontStyle: "italic" }}>
              * Exact percentages confirmed upon registration. Bars are illustrative.
            </p>
          </div>

          {/* Breakdown */}
          <div className="reveal-right" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {BREAKDOWN.map((item, i) => (
              <div key={i} className="neu-card roi-row"
                style={{ borderRadius: "1rem", padding: "1.2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: 500 }}>{item.label}</span>
                <span className={`font-display${item.red ? " text-gradient" : ""}`}
                  style={{ fontWeight: 700, fontSize: "1.25rem", color: item.red ? undefined : "#1e293b" }}>
                  {item.val}
                </span>
              </div>
            ))}

            <div className="glass-red" style={{ borderRadius: "1.5rem", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💰</div>
              <p style={{ color: "#475569", fontSize: "0.875rem", lineHeight: 1.75 }}>
                The more you invest, the higher your tier — and the more you earn every single month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROI;
