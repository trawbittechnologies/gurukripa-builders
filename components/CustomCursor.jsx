"use client";

import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring) return;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let glowX = -200;
    let glowY = -200;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      // Lerp ring toward mouse — slightly laggy
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      // Glow follows even more slowly
      if (glow) {
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Click states
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const onEnter = (e) => {
      setIsHovering(true);
      setIsViewMode(e.target.closest("[data-cursor='view']") !== null);
    };
    const onLeave = () => {
      setIsHovering(false);
      setIsViewMode(false);
    };

    const addTargetListeners = () => {
      const targets = document.querySelectorAll(
        "a, button, .btn, .gallery-masonry-item, .service-card, .contact-card, .nav-link, .nav-cta-btn, [data-cursor], .testimonial-card, .industry-card, .tech-card"
      );
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    addTargetListeners();

    const observer = new MutationObserver(addTargetListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Mouse glow */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />

      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{
          width: isClicking ? "4px" : "6px",
          height: isClicking ? "4px" : "6px",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? "hovering" : ""} ${isClicking ? "clicking" : ""} ${isViewMode ? "show-label" : ""}`}
        aria-hidden="true"
      >
        {isViewMode && (
          <span className="cursor-label">VIEW</span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
