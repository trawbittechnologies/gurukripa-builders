import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import TechDashboard from "@/components/TechDashboard";
import Industries from "@/components/Industries";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Construction Services & Expertise — Gurukripa Builders",
  description: "Explore our comprehensive construction services: Planning & Estimation, On-site Supervision, Turnkey Building, Interior Design, and Landscaping.",
};

export default function ServicesPage() {
  return (
    <div className="app" style={{ paddingTop: "80px" }}>
      <Navbar />
      <div style={{ padding: "40px 0 20px 0", textAlign: "center" }}>
        <span className="section-label" style={{ justifyContent: "center" }}>What We Specialize In</span>
        <h1 className="section-title" style={{ marginBottom: "10px" }}>OUR <span className="gold-text">SERVICES</span></h1>
      </div>
      <Services />
      <TechDashboard />
      <Industries />
      <CTASection />
      <Footer />
    </div>
  );
}
