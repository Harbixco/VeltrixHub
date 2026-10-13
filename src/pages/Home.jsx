import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";
import HeroSection from "../components/home/HeroSection";
import ValueStrip from "../components/home/ValueStrip";
import ProblemSection from "../components/home/ProblemSection";
import WhatsAppSection from "../components/home/WhatsAppSection";
import ReadinessSection from "../components/home/ReadinessSection";
import ServicesSection from "../components/home/ServicesSection";
import ProcessSection from "../components/home/ProcessSection";
import WhyVeltrixSection from "../components/home/WhyVeltrixSection";
import SelectedWorkSection from "../components/home/SelectedWorkSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import QualitativeProofSection from "../components/home/QualitativeProofSection";
import AcademySection from "../components/home/AcademySection";
import CACSection from "../components/home/CACSection";
import FAQSection from "../components/home/FAQSection";
import FinalCTA from "../components/home/FinalCTA";

export default function Home() {
  return (
    <PageTransition>
      <SEO
        title="Veltrix Hub – Become Visible. Build Trust. Grow Your Business."
        description="We help businesses build a professional online presence that attracts customers, earns trust, and creates real business growth through bespoke web design, e-commerce, and branding."
        keywords="website development Nigeria, professional web designer, business websites, e-commerce development, CAC registration Nigeria"
      />
      {/* 1. HERO */}
      <HeroSection />

      {/* VALUE STRIP */}
      <ValueStrip />

      {/* 2. PROBLEM */}
      <ProblemSection />

      {/* 3. WHATSAPP */}
      <WhatsAppSection />

      {/* 4. BUSINESS READINESS */}
      <ReadinessSection />

      {/* 5. SERVICES */}
      <ServicesSection />

      {/* 6. PROCESS */}
      <ProcessSection />

      {/* 7. WHY VELTRIX HUB */}
      <WhyVeltrixSection />

      {/* 8. PROJECTS */}
      <SelectedWorkSection />

      {/* 8.5. CLIENT TESTIMONIALS & CASE IMPACT */}
      <TestimonialsSection />

      {/* 9. QUALITATIVE PROOF / TRUST */}
      <QualitativeProofSection />

      {/* 10. ACADEMY & CAC SUPPORTING */}
      <AcademySection />
      <CACSection />

      {/* 11. FAQ */}
      <FAQSection />

      {/* 12. FINAL CTA */}
      <FinalCTA />
    </PageTransition>
  );
}
