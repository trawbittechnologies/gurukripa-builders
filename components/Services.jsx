"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useData } from "@/context/DataContext";
import {
  Hammer,
  ClipboardList,
  Home,
  Trees,
  Ruler,
  ArrowRight,
  HardHat,
  Sparkles,
} from "lucide-react";

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case "ClipboardList":
      return <ClipboardList size={22} />;
    case "Ruler":
      return <Ruler size={22} />;
    case "Hammer":
      return <Hammer size={22} />;
    case "Home":
      return <Home size={22} />;
    case "Trees":
      return <Trees size={22} />;
    case "Sparkles":
      return <Sparkles size={22} />;
    default:
      return <HardHat size={22} />;
  }
};

// 3D Tilt Card with glassmorphism
const TiltCard = ({ children, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 28 });
  const springY = useSpring(y, { stiffness: 350, damping: 28 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const shadowX = useTransform(springX, [-0.5, 0.5], ["-8px", "8px"]);
  const shadowY = useTransform(springY, [-0.5, 0.5], ["-8px", "8px"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: `${shadowX.get()}px ${shadowY.get()}px 40px rgba(0,0,0,0.3)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

const Services = () => {
  const { data } = useData();
  const services = data?.services || [];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="services-header">
          <div>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">OUR EXPERTISE</h2>
          </div>
          <p className="section-desc" style={{ maxWidth: 360, textAlign: "right" }}>
            End-to-end construction services from the first blueprint to
            the final finishing touch. Premium quality, always on time.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <TiltCard key={service.id || index} index={index}>
              <div className="service-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="service-icon-wrap">{getServiceIcon(service.icon)}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              {service.bullets && service.bullets.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "14px 0" }}>
                  {service.bullets.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "0.72rem",
                        padding: "3px 8px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "10px",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
              <a href="#contact" className="service-link">
                Enquire Now <ArrowRight size={14} />
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
