import { useState, useEffect } from "react";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["Why Invest", "why"],
    ["Returns", "roi"],
    ["How It Works", "how"],
    ["Register", "register"],
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1rem 3rem",
        transition: "all 0.4s",
        ...(scrolled
          ? {
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }
          : {}),
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "1.7rem",
            letterSpacing: "-0.02em",
          }}
        >
          <span>
            <img src="../assets/logo.png" alt=" logo" />
          </span>
          {/* <span style={{ color: "#1e293b" }}>Sure</span> */}
          {/* <span className="text-gradient">Ride</span> */}
        </div>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="nav-link">
              {label}
            </a>
          ))}
          <a
            href="#register"
            className="btn-red"
            style={{
              color: "white",
              fontWeight: 600,
              fontSize: "0.875rem",
              padding: "0.65rem 1.4rem",
              borderRadius: "0.75rem",
              letterSpacing: "0.04em",
            }}
          >
            Become an Investor
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 2,
                background: "#334155",
                borderRadius: 2,
                transition: "all 0.3s",
                transform:
                  open && i === 0
                    ? "rotate(45deg) translate(4px,4px)"
                    : open && i === 2
                      ? "rotate(-45deg) translate(4px,-4px)"
                      : "none",
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu${open ? " open" : ""}`}
        style={{ marginTop: "0.75rem" }}
      >
        <div
          className="glass"
          style={{
            borderRadius: "1rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              style={{
                color: "#475569",
                fontWeight: 500,
                padding: "0.65rem 0.75rem",
                borderRadius: "0.5rem",
                display: "block",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="btn-red"
            style={{
              color: "white",
              fontWeight: 600,
              padding: "0.75rem",
              borderRadius: "0.75rem",
              textAlign: "center",
              marginTop: "0.25rem",
              display: "block",
            }}
          >
            Become an Investor
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
