import {
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Facebook,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="container">
        {/* Top section — brand + CTA */}
        <div className="footer-top-bar">
          <div className="footer-brand-block">
            <div
              className="footer-brand-name"
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div>
                GURUKRIPA <span>BUILDERS</span>
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                }}
              >
                A Gurukripa Group of Company
              </div>
            </div>
            <p className="footer-tagline">
              Constructing dreams into reality with precision, quality, and
              timeless design. Your trusted partner for residential and
              commercial excellence in Kerala.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">Est. 2020</span>
              <span className="footer-badge">Kerala, India</span>
              <span className="footer-badge">96+ Projects</span>
            </div>
          </div>

          <div className="footer-cta-side">
            <p className="footer-cta-text">
              READY TO
              <br />
              <span className="gold-text">BUILD?</span>
            </p>
            <a href="#contact" className="btn btn-primary">
              Start a Project
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="footer-grid">
          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              <li>Residential Construction</li>
              <li>Commercial Projects</li>
              <li>Interior Design</li>
              <li>Renovation</li>
              <li>Landscaping</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-item-icon" />
                <span>City Center, Cheemeni, Cheruvathur, Kerala 671313</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={15} className="footer-contact-item-icon" />
                <a href="tel:917558988689" style={{ color: "inherit" }}>
                  +91 7558988689
                </a>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} className="footer-contact-item-icon" />
                <a
                  href="mailto:gurukripa9070@gmail.com"
                  style={{ color: "inherit" }}
                >
                  gurukripa9070@gmail.com
                </a>
              </div>
              <div className="footer-contact-item">
                <Instagram size={15} className="footer-contact-item-icon" />
                <a
                  href="https://instagram.com/gurukripa_builders_chmni"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  @gurukripa_builders_chmni
                </a>
              </div>
            </div>
          </div>

          {/* Working hours */}
          <div>
            <h4 className="footer-col-title">Working Hours</h4>
            <ul className="footer-links">
              <li>Mon – Sat: 9:00 AM – 6:00 PM</li>
              <li>Sunday: By Appointment</li>
              <li style={{ marginTop: 16, color: "var(--muted)" }}>
                24/7 project monitoring available for active sites
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Gurukripa Builders. All Rights
            Reserved.
            <span style={{ margin: "0 16px", color: "var(--muted-faint)" }}>
              ·
            </span>
            Built with <span style={{ color: "var(--gold)" }}>♥</span> in Kerala
          </p>
          <div className="footer-bottom-right">
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" className="footer-social-link">
                <Facebook size={15} />
              </a>
              <a
                href="https://instagram.com/gurukripa_builders_chmni"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-link"
              >
                <Instagram size={15} />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
