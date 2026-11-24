import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";
import HeroSection from "../components/home/HeroSection";
import ValueStrip from "../components/home/ValueStrip";
import ServicesSection from "../components/home/ServicesSection";
import IndustryDemosSection from "../components/home/IndustryDemosSection";
import SelectedWorkSection from "../components/home/SelectedWorkSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import ProcessSection from "../components/home/ProcessSection";
import WhyVeltrixSection from "../components/home/WhyVeltrixSection";
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

      {/* 2. SERVICES OVERVIEW */}
      <ServicesSection />

      {/* 3. DEDICATED INDUSTRY LIVE DEMOS */}
      <IndustryDemosSection />

      {/* 4. WORK & CASE STUDIES */}
      <SelectedWorkSection />

      {/* 5. CLIENT TESTIMONIALS & CASE IMPACT */}
      <TestimonialsSection />

      {/* 6. PROCESS & METHODOLOGY */}
      <ProcessSection />

      {/* 7. WHY VELTRIX HUB */}
      <WhyVeltrixSection />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. FINAL CTA */}
      <FinalCTA />
    </PageTransition>
  );
}
