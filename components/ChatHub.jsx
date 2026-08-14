"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Knowledge Base (unchanged) ────────────────────────
const KNOWLEDGE_BASE = {
  greetings: {
    keywords: ["hello", "hi", "hey", "start", "morning", "evening"],
    response:
      "Hello! Welcome to Gurukripa Builders. I am your automated assistant. Ask me about our services, pricing, completed projects, or contact info!",
  },
  services: {
    keywords: ["service", "do", "offer", "work", "construction", "build"],
    response:
      "We offer end-to-end construction services including: 1. Residential & Villas 2. Commercial Buildings 3. Interior Design 4. Landscape Architecture 5. Renovation & Remodeling. Which one interests you?",
  },
  cost: {
    keywords: [
      "price",
      "cost",
      "rate",
      "quote",
      "expensive",
      "cheap",
      "budget",
    ],
    response:
      "Our construction packages start from competitive rates tailored to your material choices (Standard, Premium, Luxury). For an exact quote, please provide your plot size or contact us directly at +91 7558988689.",
  },
  contact: {
    keywords: [
      "contact",
      "call",
      "phone",
      "email",
      "address",
      "location",
      "reach",
    ],
    response:
      "You can visit us at City Center, Cheemeni, Cheruvathur, Kerala. Or Call/WhatsApp: +91 7558988689. Email: gurukripa9070@gmail.com.",
  },
  projects: {
    keywords: ["project", "gallery", "portfolio", "past", "done", "photos"],
    response:
      "We have completed over 96+ residential and commercial projects across Kerala. Check out our 'Gallery' section on the homepage to see our work!",
  },
  time: {
    keywords: ["time", "long", "duration", "finish", "when"],
    response:
      "A typical residential project takes 6-12 months depending on size and complexity. We are known for on-time delivery with strict quality control.",
  },
  default: {
    response:
      "I'm not sure specifically about that, but I can help you connect with a human expert. Please call us at +91 7558988689 for detailed queries.",
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

// ─── ChatHub Component ──────────────────────────────────
const ChatHub = () => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return false;
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! I am the Gurukripa Bot. How can I assist you with your construction needs today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: findResponse(userMsg.text), sender: "bot" },
      ]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <motion.button
        className="chat-toggle-btn"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={22} /> : <Bot size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-avatar">
                <Bot size={18} />
              </div>
              <div className="chat-info">
                <h4>Architect Bot</h4>
                <span>Automated Assistant</span>
              </div>
              <button
                onClick={toggleChat}
                className="chat-close"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === "user" ? "user" : "bot"}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Ask about rate, design..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatHub;
