"use client";

import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";
import { Building, Paintbrush, Leaf, Search, ClipboardCheck, HardHat } from "lucide-react";

const defaultFeatures = [
  { icon: <Building size={18} />, label: "Residential & Commercial" },
  { icon: <Paintbrush size={18} />, label: "Premium Interiors" },
  { icon: <Leaf size={18} />, label: "Landscape Design" },
  { icon: <Search size={18} />, label: "Detailed Supervision" },
  { icon: <ClipboardCheck size={18} />, label: "Planning & Estimation" },
  { icon: <HardHat size={18} />, label: "Full Execution" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const About = () => {
  const { data } = useData();
  const company = data?.company || {};
  const aboutImage = data?.images?.about || "/about-new.png";

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-layout">
          {/* Left — Image */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-image-wrapper">
              <img
                src={aboutImage}
                alt={`${company.name || "Gurukripa Builders"} — Modern Architecture & Construction`}
                loading="lazy"
              />
              <div className="about-image-overlay" />
              <div className="about-corner tl" />
              <div className="about-corner br" />
            </div>

            {/* Floating badge */}
            <div className="about-badge">
              <span className="about-badge-number">{company.established ? `${new Date().getFullYear() - parseInt(company.established)}+` : "4+"}</span>
              <span className="about-badge-text">
                Years of
                <br />
                Excellence
              </span>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            className="about-right"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <span className="section-label">Who We Are</span>
            </motion.div>

            <motion.h2 className="about-heading" variants={itemVariants}>
              RELIABLE
              <br />
              CONSTRUCTION
              <br />
              <span className="gold-text">PARTNERS.</span>
            </motion.h2>

            {/* Pull quote */}
            <motion.p className="about-pull-quote" variants={itemVariants}>
              {company.aboutQuote || "\"We don't just build structures — we create spaces where life unfolds.\""}
            </motion.p>

            <motion.p className="about-text" variants={itemVariants}>
              {company.aboutBio ||
                "We are a team of experienced professionals committed to delivering quality construction and design solutions. Our services span the entire project lifecycle — from planning and estimating to supervision and execution."}
            </motion.p>

            <motion.p className="about-text" variants={itemVariants}>
              With a strong focus on precision, creativity, and customer satisfaction, we bring each project to life with attention to detail and a dedication to excellence.
            </motion.p>

            {/* Features pills */}
            <motion.ul className="about-features" variants={containerVariants}>
              {defaultFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  className="about-feature-item"
                  variants={itemVariants}
                >
                  <span className="about-feature-icon">{f.icon}</span>
                  {f.label}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants}>
              <a href="#contact" className="btn btn-primary">
                Start a Project
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
