import PageTransition from "../components/PageTransition";
import HeroSection from "../components/home/HeroSection";
import ValueStrip from "../components/home/ValueStrip";
import ProblemSection from "../components/home/ProblemSection";
import WhatsAppSection from "../components/home/WhatsAppSection";
import ReadinessSection from "../components/home/ReadinessSection";
import ServicesSection from "../components/home/ServicesSection";
import ProcessSection from "../components/home/ProcessSection";
import WhyVeltrixSection from "../components/home/WhyVeltrixSection";
import SelectedWorkSection from "../components/home/SelectedWorkSection";
import QualitativeProofSection from "../components/home/QualitativeProofSection";
import AcademySection from "../components/home/AcademySection";
import CACSection from "../components/home/CACSection";
import FAQSection from "../components/home/FAQSection";
import FinalCTA from "../components/home/FinalCTA";

export default function Home() {
  return (
    <PageTransition>
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
