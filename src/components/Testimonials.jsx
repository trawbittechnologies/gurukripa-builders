import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Villa Owner · Kasaragod",
    text: "Gurukripa Builders transformed our vision into a stunning family home. Their attention to detail, professional supervision, and timely delivery exceeded all our expectations. Truly world-class.",
    stars: 5,
    project: "3BHK Villa",
  },
  {
    initials: "AM",
    name: "Anitha Mohan",
    role: "Business Owner · Cheruvathur",
    text: "We contracted Gurukripa for our commercial complex and the results were outstanding. They managed the entire project seamlessly — from planning to final handover. Highly recommended.",
    stars: 5,
    project: "Commercial Complex",
  },
  {
    initials: "SN",
    name: "Suresh Nair",
    role: "Homeowner · Cheemeni",
    text: "The interior design team understood exactly what we wanted. Every room feels perfectly crafted. The quality of materials and workmanship is exceptional. We are beyond happy.",
    stars: 5,
    project: "Interior Design",
  },
  {
    initials: "PV",
    name: "Priya Varma",
    role: "NRI Client · Kerala",
    text: "Managing construction from abroad seemed daunting, but Gurukripa's transparent communication and regular updates gave us complete peace of mind. The house looks incredible.",
    stars: 5,
    project: "2BHK Home",
  },
];

const StarRating = ({ count = 5 }) => (
  <div className="testimonial-stars">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={14} fill="currentColor" />
    ))}
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideOffset, setSlideOffset] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const mouseStartX = useRef(0);

  // Measure card width + gap dynamically
  const updateSlideOffset = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector(".testimonial-card");
    if (firstCard) {
      const cardRect = firstCard.getBoundingClientRect();
      const style = window.getComputedStyle(firstCard);
      const marginRight = parseFloat(style.marginRight) || 0;
      // Gap or margin
      const trackStyle = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(trackStyle.gap) || 24;
      const totalOffset = cardRect.width + Math.max(marginRight, gap);
      setSlideOffset(totalOffset);
    }
  }, []);

  useEffect(() => {
    updateSlideOffset();
    window.addEventListener("resize", updateSlideOffset);
    return () => window.removeEventListener("resize", updateSlideOffset);
  }, [updateSlideOffset]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = useCallback((i) => {
    setCurrentIndex(i);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((currentIndex + 1) % testimonials.length);

  // Mouse Drag / Swipe
  const handleMouseDown = (e) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
    setIsAutoPlaying(false);
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Touch Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const currentTranslateX = slideOffset > 0 ? -(currentIndex * slideOffset) : 0;

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <div>
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">
              WHAT CLIENTS
              <br />
              <span className="gold-text">SAY</span>
            </h2>
          </div>

          {/* Google rating badge */}
          <div className="testimonials-rating-badge">
            <div className="testimonials-rating-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="currentColor" />
              ))}
            </div>
            <div>
              <div className="testimonials-rating-text">5.0 / 5.0 Rating</div>
              <div className="testimonials-rating-source">Google Reviews</div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="testimonials-track-wrapper"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => { isDragging.current = false; }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="testimonials-track"
            ref={trackRef}
            animate={{ x: currentTranslateX }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="testimonial-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="testimonial-quote-mark">"</span>
                <p className="testimonial-text">{t.text}</p>
                <StarRating count={t.stars} />
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-author-name">{t.name}</div>
                    <div className="testimonial-author-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="testimonials-nav">
          <button
            className="testimonials-nav-btn"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="testimonials-dots">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`testimonials-dot ${i === currentIndex ? "active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            className="testimonials-nav-btn"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
