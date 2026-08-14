import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import useConfig from "../hooks/useConfig";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "interiors", label: "Interiors" },
];

const INITIAL_RENDER_COUNT = 8;

const Gallery = () => {
  const { config, loading } = useConfig();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);

  // Raw image list from config
  const rawImages = config?.gallery || [];

  // Map images with category and metadata
  const categorizedImages = useMemo(() => {
    return rawImages.map((img, idx) => {
      let category = "residential";
      let catLabel = "Residential Project";
      let title = `Residence ${idx + 1}`;

      if (idx % 3 === 1) {
        category = "commercial";
        catLabel = "Commercial Complex";
        title = `Commercial Space ${idx + 1}`;
      } else if (idx % 3 === 2) {
        category = "interiors";
        catLabel = "Interior & Living";
        title = `Interior Design ${idx + 1}`;
      }

      return {
        src: img,
        category,
        catLabel,
        title,
        id: idx,
      };
    });
  }, [rawImages]);

  // Filtered images based on current tab
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return categorizedImages;
    return categorizedImages.filter((item) => item.category === selectedCategory);
  }, [categorizedImages, selectedCategory]);

  // Reset index and render limit when category changes
  const handleCategoryChange = (catId) => {
    if (catId === selectedCategory) return;
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setDirection(0);
    setVisibleCount(INITIAL_RENDER_COUNT);
  };

  const paginate = (newDirection) => {
    if (filteredImages.length === 0) return;
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = filteredImages.length - 1;
      if (nextIndex >= filteredImages.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredImages.length]);

  if (loading || rawImages.length === 0) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="container">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">GALLERY</h2>
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "var(--muted)",
              fontSize: "0.875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Loading gallery...
          </div>
        </div>
      </section>
    );
  }

  const activeImage = filteredImages[currentIndex] || filteredImages[0];
  const displayedThumbnails = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  return (
    <section id="gallery" className="gallery-section" style={{ overflow: "hidden" }}>
      <div className="container">
        {/* Header with Title and Slider Controls */}
        <div className="gallery-header">
          <div>
            <span className="section-label">Our Work</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              CREATIVE GALLERY
            </h2>
          </div>
          <div className="gallery-controls-top">
            <button
              className="slider-btn"
              onClick={() => paginate(-1)}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="slider-btn"
              onClick={() => paginate(1)}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Categorized Filter Tabs */}
        <div
          className="gallery-filters"
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? categorizedImages.length
                : categorizedImages.filter((item) => item.category === cat.id).length;

            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`gallery-filter-btn ${isActive ? "active" : ""}`}
                style={{
                  padding: "9px 22px",
                  borderRadius: "30px",
                  border: isActive
                    ? "1px solid var(--gold)"
                    : "1px solid var(--border)",
                  backgroundColor: isActive ? "var(--gold-dim)" : "var(--surface)",
                  color: isActive ? "var(--gold)" : "var(--muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    opacity: 0.75,
                    backgroundColor: isActive
                      ? "rgba(254, 34, 1, 0.2)"
                      : "rgba(255, 255, 255, 0.06)",
                    padding: "2px 7px",
                    borderRadius: "12px",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Slider */}
        <div className="gallery-slider-wrapper">
          <div className="gallery-slider-track">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              {activeImage && (
                <motion.div
                  key={`${selectedCategory}-${currentIndex}`}
                  custom={direction}
                  variants={{
                    enter: (dir) => ({
                      x: dir > 0 ? 800 : -800,
                      opacity: 0,
                      scale: 0.9,
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                      scale: 1,
                    },
                    exit: (dir) => ({
                      zIndex: 0,
                      x: dir < 0 ? 800 : -800,
                      opacity: 0,
                      scale: 0.9,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 220, damping: 26 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.35 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -8000) {
                      paginate(1);
                    } else if (swipe > 8000) {
                      paginate(-1);
                    }
                  }}
                  className="gallery-slide-main"
                >
                  <img
                    src={activeImage.src}
                    alt={activeImage.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="slide-overlay">
                    <h3 className="slide-title">{activeImage.title}</h3>
                    <p className="slide-category">{activeImage.catLabel}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lazy Thumbnail Grid (Initially 8 items) */}
          <div className="gallery-thumbnails">
            {displayedThumbnails.map((item, idx) => (
              <div
                key={item.id}
                className={`thumb-item ${idx === currentIndex ? "active" : ""}`}
                onClick={() => {
                  if (idx === currentIndex) return;
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
              >
                <img
                  src={item.src}
                  alt={`Thumbnail ${item.title}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Load More Button for Remaining Thumbnails */}
          {hasMore && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              <motion.button
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(prev + INITIAL_RENDER_COUNT, filteredImages.length)
                  )
                }
                className="btn btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontSize: "0.8rem",
                  padding: "10px 24px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <Plus size={16} />
                Load More ({filteredImages.length - visibleCount} projects)
              </motion.button>
            </div>
          )}

          {!hasMore && filteredImages.length > INITIAL_RENDER_COUNT && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => setVisibleCount(INITIAL_RENDER_COUNT)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: "6px 12px",
                }}
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
