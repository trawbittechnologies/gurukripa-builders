"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Building2,
  Calendar,
  Layers,
  CheckCircle2,
  BarChart,
  ArrowRight,
} from "lucide-react";

const techCards = [
  {
    icon: <Cpu size={22} />,
    title: "ADVANCED PLANNING",
    desc: "Data-driven systems optimize project timelines and resource allocation.",
  },
  {
    icon: <Building2 size={22} />,
    title: "BIM DESIGN",
    desc: "3D Building Information Modeling for precise design and coordination.",
  },
  {
    icon: <Calendar size={22} />,
    title: "SMART SCHEDULING",
    desc: "Dynamic task scheduling that adapts in real-time to site conditions.",
  },
  {
    icon: <Layers size={22} />,
    title: "GREEN BUILDING",
    desc: "Sustainable construction practices reducing environmental impact by 40%.",
  },
];

const ModernVisual = () => (
  <div className="modern-innovation-visual">
    <div className="visual-image-wrapper">
      {/* High-quality modern architectural image */}
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        alt="Modern Engineering"
        className="visual-main-image"
      />
      <div className="visual-overlay-gradient"></div>
    </div>

    {/* Floating Glass Stat 1 - Top Right */}
    <motion.div
      className="modern-glass-stat stat-top-right"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="stat-icon-wrapper">
        <BarChart size={18} />
      </div>
      <div className="stat-content">
        <div className="stat-value gold-text">96+</div>
        <div className="stat-label">Projects Completed</div>
      </div>
    </motion.div>

    {/* Floating Glass Stat 2 - Bottom Left */}
    <motion.div
      className="modern-glass-stat stat-bottom-left"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="stat-header">
        <CheckCircle2 size={18} color="var(--gold)" />
        <span>Efficiency Matrix</span>
      </div>
      <div className="stat-bar-container">
        <motion.div
          className="stat-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
        ></motion.div>
      </div>
      <div className="stat-subtext">40% Faster Delivery</div>
    </motion.div>

    {/* Center Glow Element */}
    <div className="visual-center-glow"></div>
  </div>
);

const InnovationSplit = () => {
  return (
    <section className="innovation-section section" id="innovation">
      <div className="container">
        <div className="innovation-layout">
          {/* Left — Modern visual */}
          <motion.div
            className="innovation-left-wrapper"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ModernVisual />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            className="innovation-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="section-label">Future of Construction</span>
            <h2 className="section-title">
              ENGINEERING
              <br />
              <span className="gold-text">INNOVATION</span>
            </h2>
            <p className="section-desc">
              We harness cutting-edge technology and data-driven insights to
              deliver smarter, faster, and more sustainable construction
              solutions for our clients.
            </p>

            <div className="innovation-modern-cards">
              {techCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="modern-tech-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="modern-tech-icon">{card.icon}</div>
                  <div className="modern-tech-content">
                    <h3 className="modern-tech-title">{card.title}</h3>
                    <p className="modern-tech-desc">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="innovation-cta"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Learn More <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSplit;
