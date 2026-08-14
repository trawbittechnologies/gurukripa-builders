import { useState, useEffect } from "react";

const DEFAULT_CONFIG = {
  images: {
    hero: "/hero-new.png",
    about: "/about-new.png",
    logo: "/logo.png",
  },
  gallery: [
    "/gallery/IMG-20250713-WA0024(1).jpg",
    "/gallery/IMG-20250713-WA0024.jpg",
    "/gallery/IMG-20250713-WA0025.jpg",
    "/gallery/IMG-20250713-WA0026.jpg",
    "/gallery/IMG-20250713-WA0027.jpg",
    "/gallery/IMG-20250713-WA0028.jpg",
    "/gallery/IMG-20250713-WA0029.jpg",
    "/gallery/IMG-20250713-WA0030.jpg",
    "/gallery/IMG-20250713-WA0031.jpg",
    "/gallery/IMG-20250713-WA0032.jpg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.53 AM (1).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.53 AM (2).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.53 AM (3).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.54 AM (1).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.54 AM (2).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.54 AM (3).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.54 AM.jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.55 AM (1).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.55 AM (2).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.55 AM.jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.56 AM (1).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.56 AM.jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.57 AM (1).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.57 AM (2).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.57 AM (3).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.57 AM.jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.58 AM (1).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.58 AM (2).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.58 AM (3).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.58 AM.jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.59 AM (1).jpeg",
    "/gallery/WhatsApp Image 2025-12-27 at 11.11.59 AM.jpeg",
  ],
  company: {
    name: "Gurukripa Builders",
    tagline: "Building Visions, Constructing Reality",
    description:
      "Pioneering the future of construction with advanced engineering, premium design, and unwavering commitment to quality.",
  },
  contact: {
    phone: "+91 7558988689",
    email: "gurukripa9070@gmail.com",
    address: "City Center, Cheemeni, Cheruvathur, Kerala 671313",
    instagram: "https://www.instagram.com/gurukripa_builders_chmni",
  },
};

/**
 * Custom hook with instant initial state & non-blocking background sync
 */
export const useConfig = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/config.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load config");
        return res.json();
      })
      .then((data) => {
        setConfig(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { config, loading, error };
};

export default useConfig;
