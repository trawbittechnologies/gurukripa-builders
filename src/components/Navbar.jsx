import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
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
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => {
      if (!e.target.closest(".navbar") && !e.target.closest(".mobile-menu")) {
        setIsOpen(false);
      }
    };
    const timeout = setTimeout(() => document.addEventListener("click", handle), 100);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handle);
    };
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  // Add ripple to magnetic buttons
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
          <a href="#home" className="nav-logo" onClick={closeMenu}>
            <div>GURUKRIPA <span>BUILDERS</span></div>
            <div className="nav-logo-tagline">A Gurukripa Group of Company</div>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links-desktop">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.slice(1) ? "active" : ""}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="nav-actions-desktop">
            <a
              href="#contact"
              className="nav-cta-btn"
              onClick={(e) => {
                addRipple(e);
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ position: "relative", overflow: "hidden" }}
            >
              Get a Quote
            </a>
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
            <motion.a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMenu}
              initial={{ opacity: 0, x: -48 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mobile-menu-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => {
              closeMenu();
              e.preventDefault();
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            style={{ width: "100%", justifyContent: "center", marginBottom: "16px" }}
          >
            Get a Free Quote
          </a>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="tel:917558988689" className="mobile-contact-link">
              +91 7558988689
            </a>
            <a href="mailto:gurukripa9070@gmail.com" className="mobile-contact-link">
              gurukripa9070@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
