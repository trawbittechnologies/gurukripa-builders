"use client";

import { motion } from "framer-motion";
import { Home, Building, Factory, Waypoints, HeartPulse, GraduationCap } from "lucide-react";

const industries = [
  {
    icon: <Home size={24} />,
    title: "RESIDENTIAL",
    desc: "Custom villas, apartments and dream homes built to last generations.",
  },
  {
    icon: <Building size={24} />,
    title: "COMMERCIAL",
    desc: "Offices, retail spaces and commercial complexes designed for business success.",
  },
  {
    icon: <Factory size={24} />,
    title: "INDUSTRIAL",
    desc: "Warehouses, factories and industrial facilities built for operational excellence.",
  },
  {
    icon: <Waypoints size={24} />,
    title: "INFRASTRUCTURE",
    desc: "Roads, bridges and civic infrastructure powering Kerala's future growth.",
  },
  {
    icon: <HeartPulse size={24} />,
    title: "HEALTHCARE",
    desc: "Hospitals and clinics built to the highest safety and hygiene standards.",
  },
  {
    icon: <GraduationCap size={24} />,
    title: "EDUCATION",
    desc: "Schools and institutions creating inspiring spaces for the next generation.",
  },
];

const Industries = () => {
  return (
    <section className="industries-section">
      <div className="container">
        <div className="industries-header">
          <div>
            <span className="section-label">Sectors We Serve</span>
            <h2 className="section-title">
              INDUSTRIES &amp;
              <br />
              <span className="gold-text">DOMAINS</span>
            </h2>
          </div>
          <p className="section-desc" style={{ maxWidth: 340 }}>
            From intimate family homes to large-scale infrastructure,
            we build across every sector with the same dedication to excellence.
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              className="industry-card"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="industry-icon">{industry.icon}</div>
              <h3 className="industry-title">{industry.title}</h3>
              <p className="industry-desc">{industry.desc}</p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
