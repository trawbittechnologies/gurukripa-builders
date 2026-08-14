import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 * StickyWhatsApp Component
 * Floating Action Button (FAB) anchored to bottom-right corner.
 * Provides direct WhatsApp contact link with subtle hover/pulse effects.
 */
const StickyWhatsApp = ({
  phoneNumber = "917558988689",
  message = "Hi Gurukripa Builders, I would like to inquire about your construction services.",
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className="sticky-whatsapp-wrapper"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
      }}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="sticky-whatsapp-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          color: "#ffffff",
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4), 0 4px 12px rgba(0, 0, 0, 0.25)",
          textDecoration: "none",
          transition: "box-shadow 0.3s ease, transform 0.2s ease",
          position: "relative",
        }}
      >
        {/* Pulse radar glow animation */}
        <span
          className="whatsapp-pulse-ring"
          style={{
            position: "absolute",
            inset: "-4px",
            borderRadius: "50%",
            border: "2px solid #25D366",
            opacity: 0.6,
            animation: "whatsappPulse 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite",
            pointerEvents: "none",
          }}
        />

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.173 8.173 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.95-.19-.3a8.18 8.18 0 0 1-1.25-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.3z" />
        </svg>

        {/* Hover Tooltip */}
        <span
          className="whatsapp-tooltip"
          style={{
            position: "absolute",
            right: "68px",
            background: "rgba(10, 10, 10, 0.9)",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
            pointerEvents: "none",
            opacity: 0,
            transform: "translateX(8px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          Chat with us on WhatsApp
        </span>
      </motion.a>
    </motion.div>
  );
};

export default StickyWhatsApp;
