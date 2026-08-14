import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const contactItems = [
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: (
      <a href="tel:917558988689">+91 7558988689</a>
    ),
  },
  {
    icon: <Mail size={20} />,
    value: (
      <a href="mailto:gurukripa9070@gmail.com">gurukripa9070@gmail.com</a>
    ),
    label: "Email",
  },
  {
    icon: <MapPin size={20} />,
    label: "Address",
    value: (
      <span>City Center, Cheemeni,<br />Cheruvathur, Kerala 671313</span>
    ),
  },
  {
    icon: <Instagram size={20} />,
    label: "Instagram",
    value: (
      <a
        href="https://instagram.com/gurukripa_builders_chmni"
        target="_blank"
        rel="noopener noreferrer"
      >
        @gurukripa_builders_chmni
      </a>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Contact = () => {
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
              Ready to build your vision? Reach out and let's discuss your
              project — we're here to help every step of the way.
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

              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/917558988689?text=Hi%2C%20I%27m%20interested%20in%20your%20construction%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 8, justifyContent: "center" }}
                variants={itemVariants}
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </motion.a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="map-wrapper"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              title="Gurukripa Builders Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.1498051377775!2d75.22915817521181!3d12.238134288013846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6a07f33e5c16060f%3A0xf743f1beb37a67ee!2sGurukripa%20builders!5e1!3m2!1sen!2sin!4v1752645500513!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
