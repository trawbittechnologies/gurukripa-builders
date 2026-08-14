import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Featured Projects & Portfolio — Gurukripa Builders",
  description: "Browse our luxury residential villas, commercial complexes, and modern interior design projects built across Kerala.",
};

export default function ProjectsPage() {
  return (
    <div className="app" style={{ paddingTop: "80px" }}>
      <Navbar />
      <div style={{ padding: "40px 0 20px 0", textAlign: "center" }}>
        <span className="section-label" style={{ justifyContent: "center" }}>Portfolio & Gallery</span>
        <h1 className="section-title" style={{ marginBottom: "10px" }}>FEATURED <span className="gold-text">PROJECTS</span></h1>
      </div>
      <Gallery />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
