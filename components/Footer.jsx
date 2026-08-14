"use client";

import { Phone, Mail, MapPin, Instagram, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useData } from "@/context/DataContext";

const Footer = () => {
  const { data } = useData();
  const company = data?.company || {
    name: "Gurukripa Builders",
    tagline: "Building Visions, Constructing Reality",
    description: "Pioneering the future of construction with advanced engineering, premium design, and unwavering commitment to quality.",
  };
  const contact = data?.contact || {
    phone: "+91 7558988689",
    phoneClean: "917558988689",
    email: "gurukripa9070@gmail.com",
    address: "City Center, Cheemeni, Cheruvathur, Kerala 671313",
    instagram: "https://instagram.com/gurukripa_builders_chmni",
    instagramHandle: "@gurukripa_builders_chmni",
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ marginBottom: "16px", display: "inline-block" }}>
              <div>GURUKRIPA <span>BUILDERS</span></div>
              <div className="nav-logo-tagline">{company.tagline || "A Gurukripa Group of Company"}</div>
            </Link>
            <p className="footer-desc">
              {company.description}
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="footer-social-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={`tel:${contact.phoneClean || "917558988689"}`}
                className="footer-social-btn"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/#home">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/projects">Creative Portfolio</Link></li>
              <li><Link href="/contact">Get in Touch</Link></li>
              <li><Link href="/admin">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Expertise</h4>
            <ul className="footer-links">
              <li><Link href="/services">Planning & Estimation</Link></li>
              <li><Link href="/services">Turnkey Construction</Link></li>
              <li><Link href="/services">Site Supervision</Link></li>
              <li><Link href="/services">Luxury Interior Design</Link></li>
              <li><Link href="/services">Modern Landscaping</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Headquarters</h4>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>{contact.address}</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} />
              <a href={`tel:${contact.phoneClean || "917558988689"}`}>{contact.phone}</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Gurukripa Builders. All rights reserved. Powered by Next.js & Dynamic CMS.
          </div>
          <button onClick={scrollToTop} className="footer-back-to-top" aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
