const Hero = () => (
  <section className="mesh-bg  mn-h-screen flex justify-center items-center relative overflow-hidden pt-28! px-6! pb-16!">
    {/* Floating orbs */}
    <div
      className="float-orb"
      style={{
        position: "absolute",
        top: "8%",
        right: "6%",
        width: 340,
        height: 340,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
    <div
      className="float-orb2"
      style={{
        position: "absolute",
        bottom: "12%",
        left: "3%",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
    <div
      className="float-orb"
      style={{
        position: "absolute",
        top: "45%",
        left: "30%",
        width: 180,
        height: 180,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        animationDelay: "3s",
      }}
    />

    {/* Grid texture */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.28,
        backgroundImage:
          "linear-gradient(rgba(220,38,38,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.07) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }}
    />

    <div className="relative z-1 text-center max-w-[920px] mx-auto">
      {/* Live badge */}
      <div className="glass-red inline-flex items-center gap-2 rounded-full px-4! py-1! mb-8!">
        <span className="relative inline-flex w-2 h-2">
          <span className="pulse-ring  absolute inline-flex w-full h-full rounded-full opacity-75 bg-[#dc2626] inset-0 " />
          {/* <span className="relative w-2, h-2 rounded-[50%]  inline-block bg-[#240f0f]" /> */}
        </span>
        <span
          className=" text-[#dc2626] text-[0.7rem] font-bold space-[0.15em] textTransform- uppercase "
          style={{
            // letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Investor Opportunity — Nigeria
        </span>
      </div>

      {/* Headline */}
      <h1 className="font-display font-extrabold mb-6! text-[clamp(3rem,9vw,7.5rem)]  tracking-[0.02em] leading-[0.95] ">
        <span className="text-gradient-dark block">Your Money</span>
        <span className="text-gradient block">Rides For You</span>
      </h1>

      {/* Subheading */}
      <p
        style={{
          color: "#64748b",
          fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
          fontWeight: 300,
          maxWidth: 520,
          margin: "0 auto 2.5rem",
          lineHeight: 1.78,
        }}
      >
        Invest in motorcycles, earn monthly commission, stay completely
        hands-free. Just Ride handles everything — you just collect.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "4rem",
        }}
      >
        <a
          href="#register"
          className="btn-red"
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            padding: "1rem 2.2rem",
            borderRadius: "1rem",
            letterSpacing: "0.04em",
            display: "inline-block",
          }}
        >
          🏍️ Become an Investor
        </a>
        <a
          href="#how"
          className="neu btn-outline"
          style={{
            color: "#475569",
            fontWeight: 500,
            fontSize: "1rem",
            padding: "1rem 2.2rem",
            borderRadius: "1rem",
            display: "inline-block",
          }}
        >
          See How It Works →
        </a>
      </div>

      {/* Stat cards */}
      <div className="hero-grid  grid grid-cols-1 gap-4 max-w-[740px] mx-auto">
        {[
          { val: "Up to ₦30,000", label: "Monthly Commission" },
          { val: "₦1.2m+", label: "Min. Investment" },
          { val: "100%", label: "Hands-Free Returns" },
          { val: "3 Months", label: "Investment Cycle" },
        ].map((s, i) => (
          <div
            key={i}
            className="glass"
            style={{
              borderRadius: "1.25rem",
              padding: "1.2rem 0.75rem",
              textAlign: "center",
            }}
          >
            <div
              className="font-display text-gradient"
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                marginBottom: "0.3rem",
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          className="bounce-down"
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, #dc2626, transparent)",
          }}
        />
      </div>
    </div>
  </section>
);

export default Hero;
