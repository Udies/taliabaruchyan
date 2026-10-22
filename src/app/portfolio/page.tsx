import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "פורטפוליו קולנועי",
  description:
    "פורטפוליו של טליה ברוכיאן — במאית, תסריטאית ומפיקה. סרטים עלילתיים ותיעודיים, סדרות וקליפים.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid />
        <AboutSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
