import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import StickyWhatsApp from "./components/StickyWhatsApp";
import CharacterAssistant from "./components/CharacterAssistant";

// Lazy load all sections for optimal performance
const Stats = lazy(() => import("./components/Stats"));
const ConstructionJourney = lazy(() => import("./components/ConstructionJourney"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const InnovationSplit = lazy(() => import("./components/InnovationSplit"));
const Gallery = lazy(() => import("./components/Gallery"));
const Industries = lazy(() => import("./components/Industries"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const TechDashboard = lazy(() => import("./components/TechDashboard"));
const Contact = lazy(() => import("./components/Contact"));
const CTASection = lazy(() => import("./components/CTASection"));

// Loading fallback
const LoadingFallback = () => (
  <div
    style={{
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--muted)",
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
    }}
  >
    <span style={{ opacity: 0.4 }}>Loading...</span>
  </div>
);

function App() {
  return (
    <div className="app">
      {/* Global noise grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Hero — eager loaded for fast first paint */}
      <Hero />

      {/* Stats */}
      <Suspense fallback={<LoadingFallback />}>
        <Stats />
      </Suspense>

      {/* Construction Journey */}
      <Suspense fallback={<LoadingFallback />}>
        <ConstructionJourney />
      </Suspense>

      {/* About */}
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>

      {/* Services */}
      <Suspense fallback={<LoadingFallback />}>
        <Services />
      </Suspense>

      {/* Innovation Split */}
      <Suspense fallback={<LoadingFallback />}>
        <InnovationSplit />
      </Suspense>

      {/* Gallery */}
      <Suspense fallback={<LoadingFallback />}>
        <Gallery />
      </Suspense>

      {/* Industries */}
      <Suspense fallback={<LoadingFallback />}>
        <Industries />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>

      {/* Technology Dashboard */}
      <Suspense fallback={<LoadingFallback />}>
        <TechDashboard />
      </Suspense>

      {/* Contact */}
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>

      {/* CTA Before Footer */}
      <Suspense fallback={<LoadingFallback />}>
        <CTASection />
      </Suspense>

      {/* Footer — eager loaded */}
      <Footer />

      {/* Sticky Floating WhatsApp Contact Action Button */}
      <StickyWhatsApp />

      {/* Floating Animated Character Assistant (Transparent WebM) */}
      <CharacterAssistant />
    </div>
  );
}

export default App;
