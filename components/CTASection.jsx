"use client";

import { motion } from "framer-motion";

const CTASection = () => {
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

  return (
    <section className="cta-section">
      {/* Background */}
      <div className="cta-bg" />
      <div className="cta-overlay" />
      <div className="cta-grid-overlay" />

      {/* Side line */}
      <div className="cta-line-left" />

      {/* Corner marks */}
      <div className="cta-corner tl" />
      <div className="cta-corner br" />

      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Ready to Build?
          </motion.span>

          <h2 className="cta-headline">
            BUILDING
            <br />
            <span className="gold">TOMORROW&apos;S</span>
            <br />
            LANDMARKS.
          </h2>

          <p className="cta-desc">
            Your dream project starts with a single conversation. Let&apos;s transform
            your vision into a lasting landmark together.
          </p>

          <div className="cta-actions">
            <a href="#contact" className="btn btn-primary" onClick={addRipple}>
              Start Your Project
            </a>
            <a href="#gallery" className="btn btn-outline" onClick={addRipple}>
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
