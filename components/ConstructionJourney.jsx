"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MapPin, PenTool, Pickaxe, Hammer, Home, Sparkles, Key } from "lucide-react";

const steps = [
  {
    num: "01",
    emoji: <MapPin size={24} />,
    title: "Site Survey & Analysis",
    desc: "Comprehensive topographic analysis, soil testing, and environmental assessment to ensure a solid foundation.",
  },
  {
    num: "02",
    emoji: <PenTool size={24} />,
    title: "Architectural Planning",
    desc: "Collaborative design process producing detailed blueprints, 3D visualizations, and securing necessary permits.",
  },
  {
    num: "03",
    emoji: <Pickaxe size={24} />,
    title: "Foundation & Earthwork",
    desc: "Precision excavation, deep piling, and robust concrete work forming the indestructible base of your structure.",
  },
  {
    num: "04",
    emoji: <Hammer size={24} />,
    title: "Structural Engineering",
    desc: "Erecting the skeleton with high-grade steel framework and reinforced cement concrete columns.",
  },
  {
    num: "05",
    emoji: <Home size={24} />,
    title: "Exterior Finishing",
    desc: "Architectural facade installation, advanced roofing systems, and comprehensive weatherproofing.",
  },
  {
    num: "06",
    emoji: <Sparkles size={24} />,
    title: "Interior Mastercraft",
    desc: "Premium flooring, bespoke cabinetry, smart home integration, and meticulous detail finishing.",
  },
  {
    num: "07",
    emoji: <Key size={24} />,
    title: "Final Handover",
    desc: "Rigorous 100-point quality inspection, final polish, and ceremonial key delivery to your new legacy.",
  },
];

const ConstructionJourney = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="journey-section section" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div className="journey-header">
          <motion.span
            className="section-label"
            style={{ justifyContent: "center" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Blueprint to Reality
          </motion.span>
          <motion.h2
            className="section-title"
            style={{ textAlign: "center" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            THE CONSTRUCTION
            <br />
            <span className="gold-text">JOURNEY</span>
          </motion.h2>
        </div>

        {/* Timeline Track */}
        <div className="journey-timeline-container">
          {/* Center Line Background */}
          <div className="journey-line-bg"></div>
          {/* Animated Glow Line */}
          <motion.div 
            className="journey-line-progress" 
            style={{ scaleY, originY: 0 }} 
          />

          <div className="journey-steps-wrapper">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`journey-step-row ${isEven ? 'row-left' : 'row-right'}`}>
                  {/* Step Card */}
                  <motion.div 
                    className="journey-step-card glass-card animated-border"
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="step-num-watermark">{step.num}</div>
                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </motion.div>

                  {/* Center Node */}
                  <div className="journey-step-node">
                    <motion.div 
                      className="node-circle"
                      initial={{ scale: 0, opacity: 0, rotate: -90 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-150px" }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
                    >
                      <div className="node-icon">{step.emoji}</div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionJourney;
