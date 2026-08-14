"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  User,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

// ─── Humanized Project Consultant Knowledge Base ───────────
const KNOWLEDGE_BASE = {
  greetings: {
    keywords: ["hello", "hi", "hey", "namaste", "start", "morning", "evening", "who are you"],
    response:
      "Hello! Welcome to Gurukripa Builders. How can we help with your home construction or renovation plans today?",
  },
  services: {
    keywords: ["service", "do", "offer", "work", "construction", "build", "villa", "interior", "renovation"],
    response:
      "We provide complete end-to-end building services across Kerala: 1. Premium Villas & Homes 2. Commercial Buildings 3. Custom Interior Design 4. Landscape Architecture 5. Renovations. Which would you like to discuss?",
  },
  cost: {
    keywords: ["price", "cost", "rate", "quote", "expensive", "budget", "sqft", "estimate"],
    response:
      "We offer transparent, itemized quotes tailored to your plot size and material selections (Standard, Premium, Luxury). For a direct estimate, feel free to call or WhatsApp us at +91 7558988689.",
  },
  contact: {
    keywords: ["contact", "call", "phone", "email", "address", "location", "office", "reach", "where"],
    response:
      "Our main office is at City Center, Cheemeni, Cheruvathur, Kerala 671313. You can reach us on Call/WhatsApp at +91 7558988689 or email gurukripa9070@gmail.com.",
  },
  projects: {
    keywords: ["project", "gallery", "portfolio", "past", "done", "photos", "delivered"],
    response:
      "We have delivered over 96+ successful projects across Kerala. Feel free to browse our Gallery section on this page to see our recent work.",
  },
  time: {
    keywords: ["time", "duration", "how long", "finish", "when", "months"],
    response:
      "A typical residential home is completed in 6 to 10 months with strict quality checks at every structural milestone.",
  },
  default: {
    response:
      "Thank you for reaching out! For detailed site consultations or architectural drawings, please contact us directly at +91 7558988689.",
  },
};

const findResponse = (input) => {
  const lower = input.toLowerCase();
  for (const key in KNOWLEDGE_BASE) {
    if (key === "default") continue;
    if (KNOWLEDGE_BASE[key].keywords.some((w) => lower.includes(w))) {
      return KNOWLEDGE_BASE[key].response;
    }
  }
  return KNOWLEDGE_BASE.default.response;
};

const CharacterAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Gurukripa Builders. How can I help you plan your construction project?",
      sender: "consultant",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }
    return () => document.body.classList.remove("chat-open");
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowBubble(false);
      }
    }, 14000);
    return () => clearTimeout(timer);
  }, [hasInteracted, isOpen]);

  const handleSend = (textToSend = input) => {
    const query = textToSend.trim();
    if (!query) return;

    setHasInteracted(true);
    const userMsg = {
      id: Date.now(),
      text: query,
      sender: "user",
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const consultantReply = {
        id: Date.now() + 1,
        text: findResponse(query),
        sender: "consultant",
        time: "Just now",
      };
      setMessages((prev) => [...prev, consultantReply]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleQuickAction = (actionText) => {
    setHasInteracted(true);
    setIsOpen(true);
    setShowBubble(false);
    handleSend(actionText);
  };

  return (
    <div className="character-assistant-root">
      {/* ─── Minimal & Modern Humanized Helpdesk ────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="assistant-chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="assistant-chat-header">
              <div className="assistant-header-left">
                <div className="assistant-avatar-badge">
                  <User size={16} className="assistant-avatar-icon" />
                  <span className="online-indicator" />
                </div>
                <div className="assistant-header-info">
                  <div className="assistant-name">Project Consultant</div>
                  <span className="assistant-status">Gurukripa Builders · Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="assistant-close-btn"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Topic Chips */}
            <div className="assistant-quick-topics">
              <button onClick={() => handleQuickAction("What are your construction services?")}>
                Services
              </button>
              <button onClick={() => handleQuickAction("What is the cost / price per sqft?")}>
                Estimate
              </button>
              <button onClick={() => handleQuickAction("How long does construction take?")}>
                Timeline
              </button>
              <button onClick={() => handleQuickAction("Where is your office located?")}>
                Location
              </button>
            </div>

            {/* Messages Container */}
            <div className="assistant-messages-container">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`assistant-msg ${msg.sender === "user" ? "user" : "consultant"}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="assistant-msg-bubble">
                    <p>{msg.text}</p>
                    <span className="assistant-msg-time">{msg.time}</span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="assistant-msg consultant typing">
                  <div className="assistant-msg-bubble typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="assistant-input-bar">
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="assistant-send-btn"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="assistant-chat-footer">
              <a
                href="https://wa.me/917558988689?text=Hi%2C%20I%20would%20like%20to%20consult%20on%20a%20construction%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="assistant-wa-link"
              >
                <Phone size={12} /> Call / WhatsApp (+91 7558988689)
                <ArrowUpRight size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Character & Humanized Speech Bubble ─── */}
      <div className="character-floating-wrapper">
        {/* Minimal Speech Bubble */}
        <AnimatePresence>
          {!isOpen && showBubble && (
            <motion.div
              className="character-speech-bubble"
              initial={{ opacity: 0, scale: 0.94, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.94, x: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="speech-bubble-close"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                aria-label="Dismiss message"
              >
                <X size={12} />
              </button>

              <div className="speech-bubble-content">
                <p className="speech-bubble-text">
                  Planning a construction or interior project?
                </p>
                <button
                  className="speech-action-btn"
                  onClick={() => {
                    setIsOpen(true);
                    setShowBubble(false);
                    setHasInteracted(true);
                  }}
                >
                  <MessageSquare size={13} /> Chat with Us
                </button>
              </div>

              {/* Tail pointing toward character */}
              <div className="speech-bubble-tail" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Character Stage */}
        <motion.div
          className="character-avatar-stage"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowBubble(false);
            setHasInteracted(true);
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Click to chat with Project Consultant"
          role="button"
          tabIndex={0}
        >
          <div className="character-floor-shadow" />
          <div className="character-aura-glow" />

          {/* WebM Transparent Video Character */}
          <video
            src="/transparent-video (16).webm"
            autoPlay
            loop
            muted
            playsInline
            className="character-video-element"
            suppressHydrationWarning
          />

          {/* Hover-Only Tooltip (Only visible on hover, zero clutter when idle) */}
          <div className="character-hover-badge">
            <MessageCircle size={11} className="badge-icon" />
            <span>Click to Chat</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterAssistant;
