import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ConstructionJourney from "@/components/ConstructionJourney";
import About from "@/components/About";
import Services from "@/components/Services";
import InnovationSplit from "@/components/InnovationSplit";
import Gallery from "@/components/Gallery";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import TechDashboard from "@/components/TechDashboard";
import Contact from "@/components/Contact";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="app">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Stats Counter Section */}
      <Stats />

      {/* 7-Step Construction Journey */}
      <ConstructionJourney />

      {/* About Us Section */}
      <About />

      {/* Services & Expertise */}
      <Services />

      {/* Innovation Split */}
      <InnovationSplit />

      {/* Creative Portfolio Gallery */}
      <Gallery />

      {/* Industries Covered */}
      <Industries />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Technology & Digital Twins */}
      <TechDashboard />

      {/* Dynamic Contact & Lead Intake */}
      <Contact />

      {/* Call to Action Pre-Footer */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
