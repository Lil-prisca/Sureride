import { useReveal } from "../hooks";

const CARDS = [
  {
    icon: "📈",
    title: "Consistent Monthly Returns",
    desc: "Receive your commission every month without lifting a finger. We handle operations, maintenance, and rider management.",
  },
  {
    icon: "🛡️",
    title: "Real Assets, Real Security",
    desc: "Backed by physical motorcycles — tangible assets you can trust. No crypto volatility. No speculation. Just steady income.",
  },
  {
    icon: "🤝",
    title: "Fully Managed For You",
    desc: "You invest. We do everything else. Our team places, manages, and monitors every bike so you stay hands-free.",
  },
  {
    icon: "🌍",
    title: "Tap a Booming Market",
    desc: "Millions of Nigerians rely on motorcycles daily. We built the infrastructure to monetise that demand and share profits with you.",
  },
  {
    icon: "📋",
    title: "Transparent & Accountable",
    desc: "Regular reports on your bike's performance. No hidden figures — clear, honest numbers every payment cycle.",
  },
  {
    icon: "🚀",
    title: "Get In Early",
    desc: "We're at the ground floor. Early investors get the best commission rates as we scale across more cities.",
  },
];

const WhyInvest = () => {
  useReveal();

  return (
    <section id="why" className="mesh-bg" style={{ padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "4rem" }}
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
              The Opportunity
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
            <span className="text-gradient-dark">Why Invest With </span>
            <span className="text-gradient">Sure Ride?</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1.05rem",
              maxWidth: 520,
              margin: "0 auto",
              fontWeight: 300,
              lineHeight: 1.78,
            }}
          >
            Nigeria's motorcycle economy is massive, underserved, and growing
            fast. We put everyday investors right at the center of it.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {CARDS.map((c, i) => (
            <div
              key={i}
              className="reveal neu-card card-lift"
              data-delay={i * 80}
              style={{
                borderRadius: "1.5rem",
                padding: "1.75rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="glass-overlay" />
              <div className="card-top-line" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  className="neu-sm"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  className="font-display"
                  style={{
                    color: "#1e293b",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: "0.6rem",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.875rem",
                    lineHeight: 1.78,
                    fontWeight: 300,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;
