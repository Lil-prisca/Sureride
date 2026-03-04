import { useReveal } from "../hooks";

const STEPS = [
  {
    num: "01",
    title: "Register Your Interest",
    desc: "Fill out the form below. Our team will reach out within 24 hours to walk you through the full investment plan and answer every question.",
  },
  {
    num: "02",
    title: "Choose Your Investment Tier",
    desc: "Select how much you'd like to invest. Each tier has a defined commission rate. Higher investment = higher monthly return.",
  },
  {
    num: "03",
    title: "We Deploy Your Bike",
    desc: "Sure Ride Mobility purchases and deploys a motorcycle on your behalf. Our team handles the rider, maintenance, and all daily logistics.",
  },
  {
    num: "04",
    title: "Collect Monthly Commission",
    desc: "Every month your commission is calculated from your bike's earnings and paid directly to you with a clear breakdown.",
  },
  {
    num: "05",
    title: "Renew or Withdraw",
    desc: "At the end of your 12-month cycle, get your capital back. Reinvest, scale up, or walk away — completely your decision.",
  },
];

const HowItWorks = () => {
  useReveal();

  return (
    <section id="how" className="mesh-bg" style={{ padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
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
              The Process
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
            <span className="text-gradient-dark">How It </span>
            <span className="text-gradient">Works</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1.05rem",
              maxWidth: 480,
              margin: "0 auto",
              fontWeight: 300,
              lineHeight: 1.78,
            }}
          >
            Simple, transparent, and designed with investors in mind from day
            one.
          </p>
        </div>

        {/* Steps */}
        <div style={{ position: "relative" }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: "absolute",
              left: 23,
              top: 48,
              bottom: 48,
              width: 2,
              background:
                "linear-gradient(to bottom, #dc2626, rgba(220,38,38,0.08))",
            }}
          />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="reveal step-wrap"
                data-delay={i * 90}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                }}
              >
                {/* Number bubble */}
                <div
                  className="neu-card step-num font-display"
                  style={{
                    minWidth: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    color: "#dc2626",
                    fontSize: "0.85rem",
                    zIndex: 1,
                    flexShrink: 0,
                  }}
                >
                  {s.num}
                </div>

                {/* Card */}
                <div
                  className="neu-card"
                  style={{
                    borderRadius: "1.25rem",
                    padding: "1.5rem",
                    flex: 1,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div className="glass-overlay" />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "linear-gradient(90deg, #dc2626, #f97316)",
                      opacity: 0,
                      transition: "opacity 0.4s",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3
                      className="font-display"
                      style={{
                        color: "#1e293b",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        marginBottom: "0.4rem",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "0.875rem",
                        lineHeight: 1.78,
                        fontWeight: 300,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
