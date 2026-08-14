import { motion } from "framer-motion";

/* ─── Framer Motion Variants ─────────────────────────── */
const maskReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.05,
      delay: 0.5 + i * 0.13,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: 1.5 + i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

import {
  Building2,
  Users,
  Trophy,
  Star,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

/* ─── Floating Stats ─────────────────────────── */
const statCards = [
  { icon: <Building2 size={18} />, value: "96+", label: "Projects\nDelivered" },
  { icon: <Users size={18} />, value: "138+", label: "Happy\nFamilies" },
  { icon: <Trophy size={18} />, value: "4+", label: "Years of\nExcellence" },
  { icon: <Star size={18} />, value: "100%", label: "Client\nSatisfaction" },
];

/* ─── Ripple helper ─────────────────────────── */
const addRipple = (e) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${e.clientX - rect.left}px`;
  ripple.style.top = `${e.clientY - rect.top}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
};

/* ─── Hero Lines ─────────────────────────── */
const heroLines = ["WE CREATE", "REALITY", "FROM YOUR VISION"];

/* ─── Hero Component ─────────────────────────── */
const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* Background Video */}
      <div className="hero-bg-video-wrapper">
        <video
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero.jpg"
        >
          {/* Construction crane in a city - generic construction video */}
          <source
            src="/Drone_shot_construction_site_cranes_202606251213%20(1).mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overlays */}
      <div className="hero-gradient-overlay" />
      <div className="hero-vignette" />

      {/* Blueprint grid overlay */}
      <div className="hero-blueprint-grid" aria-hidden="true" />

      {/* Social Strip */}
      <div
        className="hero-social-strip"
        style={{
          position: "absolute",
          left: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          zIndex: 10,
        }}
      >
        <a
          href="#"
          aria-label="Facebook"
          style={{ color: "var(--text-secondary)", transition: "color 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
        >
          <Facebook size={20} />
        </a>
        <a
          href="https://instagram.com/gurukripa_builders_chmni"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{ color: "var(--text-secondary)", transition: "color 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
        >
          <Instagram size={20} />
        </a>
        <a
          href="#"
          aria-label="Twitter"
          style={{ color: "var(--text-secondary)", transition: "color 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
        >
          <Twitter size={20} />
        </a>
      </div>


      {/* Hero Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">
            Est. 2020 · Kerala, India · Premium Construction
          </span>
        </motion.div>

        {/* Headline — mask reveal per line */}
        <h1
          className="hero-title"
          aria-label="We Create Reality From Your Vision"
        >
          {heroLines.map((line, i) => (
            <span key={i} className="hero-title-clip">
              <motion.span
                className={`hero-title-line${i === 1 ? " gold" : ""}`}
                custom={i}
                variants={maskReveal}
                initial="hidden"
                animate="visible"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Bottom row */}
        <motion.div
          className="hero-bottom"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.15 }}
        >
          <p className="hero-desc">
            We developed landmark real estate projects that deliver lasting
            value to investors and communities.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary" onClick={addRipple}>
              Get Started
            </a>
            <a href="#contact" className="btn btn-outline" onClick={addRipple}>
              Get a Quote
            </a>
          </div>

          <div
            className="social-proof"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              className="avatars"
              style={{ display: "flex", marginLeft: "10px" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#FE2201",
                  border: "2px solid var(--bg)",
                  marginLeft: "-10px",
                  zIndex: 3,
                }}
              ></div>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#73828F",
                  border: "2px solid var(--bg)",
                  marginLeft: "-10px",
                  zIndex: 2,
                }}
              ></div>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#AC5E37",
                  border: "2px solid var(--bg)",
                  marginLeft: "-10px",
                  zIndex: 1,
                }}
              ></div>
            </div>
            <div>
              <div style={{ display: "flex", color: "#FFCC00", gap: "4px" }}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  fontWeight: "500",
                  marginTop: "4px",
                }}
              >
                5.9K+ Reviews
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Stats Cards */}
      <div className="hero-stats-cards">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            className="hero-stat-card"
            custom={i}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="hero-stat-card-icon">{card.icon}</div>
            <div>
              <div className="hero-stat-card-value">{card.value}</div>
              <div
                className="hero-stat-card-label"
                style={{ whiteSpace: "pre-line" }}
              >
                {card.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
      >
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
