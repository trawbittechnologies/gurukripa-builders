"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Shield } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/#gallery" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const { data } = useData();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const company = data?.company || {
    name: "Gurukripa Builders",
    tagline: "A Gurukripa Group of Company",
  };
  const contact = data?.contact || {
    phone: "+91 7558988689",
    phoneClean: "917558988689",
    email: "gurukripa9070@gmail.com",
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sectionIds = ["home", "about", "services", "gallery", "testimonials", "contact"];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  const addRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo" onClick={closeMenu}>
            <div>GURUKRIPA <span>BUILDERS</span></div>
            <div className="nav-logo-tagline">{company.tagline || "A Gurukripa Group of Company"}</div>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links-desktop">
            {navLinks.map((link) => {
              const sectionKey = link.href.replace("/#", "");
              const isActive = pathname === "/" && activeSection === sectionKey;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions-desktop" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link
              href="/#contact"
              className="nav-cta-btn"
              onClick={(e) => {
                addRipple(e);
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{ position: "relative", overflow: "hidden" }}
            >
              Get a Quote
            </Link>

            <Link
              href="/admin"
              className="admin-portal-link"
              title="Admin Portal"
              style={{
                color: "var(--text-secondary)",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s, background 0.2s",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border)",
              }}
            >
              <Shield size={16} />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="nav-mobile-actions">
            <button
              className={`mobile-menu-btn ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`} aria-hidden={!isOpen}>
        <div className="mobile-menu-links">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -48 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={link.href}
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <Link
              href="/admin"
              className="mobile-nav-link"
              onClick={closeMenu}
              style={{ color: "var(--gold)", fontSize: "1.3rem" }}
            >
              ⚡ Admin Panel
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mobile-menu-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Link
            href="/#contact"
            className="btn btn-primary"
            onClick={(e) => {
              closeMenu();
              if (pathname === "/") {
                e.preventDefault();
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }
            }}
            style={{ width: "100%", justifyContent: "center", marginBottom: "16px" }}
          >
            Get a Free Quote
          </Link>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href={`tel:${contact.phoneClean || "917558988689"}`} className="mobile-contact-link">
              {contact.phone || "+91 7558988689"}
            </a>
            <a href={`mailto:${contact.email || "gurukripa9070@gmail.com"}`} className="mobile-contact-link">
              {contact.email || "gurukripa9070@gmail.com"}
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
