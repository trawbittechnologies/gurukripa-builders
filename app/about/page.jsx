import Navbar from "@/components/Navbar";
import About from "@/components/About";
import ConstructionJourney from "@/components/ConstructionJourney";
import InnovationSplit from "@/components/InnovationSplit";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us — Gurukripa Builders Kerala",
  description: "Learn about Gurukripa Builders, our mission, vision, architectural craftsmanship, and 4+ years of construction excellence in Kerala.",
};

export default function AboutPage() {
  return (
    <div className="app" style={{ paddingTop: "80px" }}>
      <Navbar />
      <div style={{ padding: "40px 0 20px 0", textAlign: "center" }}>
        <span className="section-label" style={{ justifyContent: "center" }}>Our Story & Values</span>
        <h1 className="section-title" style={{ marginBottom: "10px" }}>ABOUT <span className="gold-text">GURUKRIPA</span></h1>
      </div>
      <About />
      <ConstructionJourney />
      <InnovationSplit />
      <CTASection />
      <Footer />
    </div>
  );
}
