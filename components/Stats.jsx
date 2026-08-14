"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useData } from "@/context/DataContext";

// Animated counter hook
const useCounter = (target, isInView, duration = 2200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !target) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
};

const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(stat.numeric || parseInt(stat.value) || 0, isInView, 2000 + index * 200);

  const suffix = stat.value ? stat.value.replace(/[0-9]/g, "") : "+";

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-divider" />
      <span className="stat-number-display">
        {count}
        {suffix}
      </span>
      <p className="stat-label" style={{ whiteSpace: "pre-line" }}>{stat.label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const { data } = useData();
  const statsList = data?.stats || [
    { value: "96+", numeric: 96, label: "Projects Delivered" },
    { value: "138+", numeric: 138, label: "Happy Families" },
    { value: "4+", numeric: 4, label: "Years of Excellence" },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          style={{ textAlign: "center", marginBottom: "0px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label" style={{ justifyContent: "center" }}>
            By The Numbers
          </span>
        </motion.div>
        <div className="stats-grid">
          {statsList.slice(0, 3).map((stat, index) => (
            <StatItem key={stat.id || index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
