"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Contact = () => {
  const { data } = useData();
  const contact = data?.contact || {
    phone: "+91 7558988689",
    phoneClean: "917558988689",
    email: "gurukripa9070@gmail.com",
    address: "City Center, Cheemeni, Cheruvathur, Kerala 671313",
    instagram: "https://instagram.com/gurukripa_builders_chmni",
    instagramHandle: "@gurukripa_builders_chmni",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.1498051377775!2d75.22915817521181!3d12.238134288013846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6a07f33e5c16060f%3A0xf743f1beb37a67ee!2sGurukripa%20builders!5e1!3m2!1sen!2sin!4v1752645500513!5m2!1sen!2sin",
  };

  const services = data?.services || [];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus({ type: "error", message: "Please provide your name and phone number." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to submit inquiry");

      setStatus({
        type: "success",
        message: "Thank you! Your message has been received. Our architectural engineer will contact you shortly.",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        location: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to send message. Please try again or WhatsApp us." });
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <Phone size={20} />,
      label: "Phone",
      value: <a href={`tel:${contact.phoneClean || "917558988689"}`}>{contact.phone}</a>,
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: <a href={`mailto:${contact.email}`}>{contact.email}</a>,
    },
    {
      icon: <MapPin size={20} />,
      label: "Address",
      value: <span>{contact.address}</span>,
    },
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      value: (
        <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
          {contact.instagramHandle || "@gurukripa_builders_chmni"}
        </a>
      ),
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <span className="section-label">Get in Touch</span>
        <h2 className="section-title">
          START A
          <br />
          <span className="gold-text">CONVERSATION</span>
        </h2>

        <div className="contact-layout">
          {/* Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="section-desc" style={{ marginBottom: 0 }}>
              Ready to build your dream residence or commercial landmark? Send us an inquiry
              or reach out directly — our engineering team is here for you.
            </p>

            <div className="contact-info-cards">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="contact-card"
                  variants={itemVariants}
                >
                  <div className="contact-card-icon">{item.icon}</div>
                  <div>
                    <div className="contact-card-label">{item.label}</div>
                    <div className="contact-card-value">{item.value}</div>
                  </div>
                </motion.div>
              ))}

              <motion.a
                href={`https://wa.me/${contact.phoneClean || "917558988689"}?text=${encodeURIComponent(contact.whatsappMessage || "Hi, I'm interested in your construction services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 8, justifyContent: "center" }}
                variants={itemVariants}
              >
                <MessageCircle size={18} />
                WhatsApp Direct Connect
              </motion.a>
            </div>
          </motion.div>

          {/* Interactive Dynamic Form + Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Contact Inquiry Form */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-gold)",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "18px", color: "var(--text)" }}>
                Book a Free Consultation & Quote
              </h3>

              {status.message && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    marginBottom: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.88rem",
                    background: status.type === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                    color: status.type === "success" ? "#22C55E" : "#EF4444",
                    border: `1px solid ${status.type === "success" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                  }}
                >
                  {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }} suppressHydrationWarning>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="admin-input"
                      style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9847000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="admin-input"
                      style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="admin-input"
                      style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Desired Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="admin-select"
                      style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                    >
                      <option value="">Select Service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Full Turnkey Build">Full Turnkey Build</option>
                      <option value="Other / General Inquiry">Other / General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Project Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Cheruvathur / Cheemeni"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="admin-input"
                      style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Estimated Budget</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹40 - 60 Lakhs"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="admin-input"
                      style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "4px" }}>Project Details / Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your plot, timeline, or design ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="admin-textarea"
                    style={{ padding: "10px 14px", fontSize: "0.88rem" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ justifyContent: "center", cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Submit Consultation Request
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="map-wrapper" style={{ height: "240px" }}>
              <iframe
                title="Gurukripa Builders Location"
                src={contact.mapEmbedUrl}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: "100%", height: "100%", border: 0, borderRadius: "12px" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
