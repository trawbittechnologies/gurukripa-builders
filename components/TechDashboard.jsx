"use client";

import { motion } from "framer-motion";
import {
  Satellite,
  Layers,
  Calendar,
  Wifi,
  Box,
  Building2,
} from "lucide-react";

const techItems = [
  {
    icon: <Satellite size={22} />,
    title: "DRONE MONITORING",
    desc: "Real-time aerial site monitoring with HD drone footage and progress tracking.",
    tag: "Live",
  },
  {
    icon: <Layers size={22} />,
    title: "DIGITAL TWIN",
    desc: "Virtual 3D replicas of construction sites enabling remote management and analysis.",
    tag: "Advanced",
  },
  {
    icon: <Calendar size={22} />,
    title: "PROJECT SCHEDULING",
    desc: "Intelligent scheduling that dynamically adapts to weather, resources and delays.",
    tag: "Smart",
  },
  {
    icon: <Wifi size={22} />,
    title: "IoT CONSTRUCTION",
    desc: "Smart sensors monitoring structural integrity, humidity, and equipment health.",
    tag: "Smart",
  },
  {
    icon: <Box size={22} />,
    title: "3D PRINTING",
    desc: "Rapid prototyping of architectural components for faster and cost-effective builds.",
    tag: "Innovation",
  },
  {
    icon: <Building2 size={22} />,
    title: "BIM INTEGRATION",
    desc: "Full Building Information Modeling for design, clash detection and coordination.",
    tag: "Pro",
  },
];

const TechDashboard = () => {
  return (
    <section className="tech-section">
      <div className="container">
        <motion.div
          className="tech-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label" style={{ justifyContent: "center" }}>
            Technology Stack
          </span>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            OUR <span className="gold-text">TECHNOLOGY</span>
          </h2>
          <p
            className="section-desc"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            We equip every project with the latest construction technology to
            deliver superior results, faster timelines, and greater
            transparency.
          </p>
        </motion.div>

        <div className="tech-grid">
          {techItems.map((item, i) => (
            <motion.div
              key={i}
              className="tech-card"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="tech-card-icon">{item.icon}</div>
              <h3 className="tech-card-title">{item.title}</h3>
              <p className="tech-card-desc">{item.desc}</p>
              <div className="tech-card-tag">{item.tag}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechDashboard;
