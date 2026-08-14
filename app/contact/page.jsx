import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us & Free Estimate — Gurukripa Builders",
  description: "Contact Gurukripa Builders for project inquiries, architectural estimation, and site visits in Cheemeni, Cheruvathur, and Kasaragod.",
};

export default function ContactPage() {
  return (
    <div className="app" style={{ paddingTop: "80px" }}>
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
}
