import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Training from "./pages/Training";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import FashionDemoPage from "./pages/demos/fashion";
import PerfumesDemoPage from "./pages/demos/perfumes";
import TechGadgetsPage, {
  ProductsPage,
  CategoriesPage,
  BrandsPage,
  AboutPage,
  TrackingPage,
  ShippingPage,
  WarrantyPage,
  VerificationPage,
  FaqsPage,
  TermsPage,
} from "./pages/demos/Tech-Gadgets";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import AIChatWidget from "./components/AIChatWidget";

// ─── 15 Industry Client Demo Templates ─────────────────────────────
import PlumbingServices from "./demos/plumbing-services/PlumbingServices";
import AutoRepair from "./demos/auto-repair/AutoRepair";
import Contractor from "./demos/contractor/Contractor";
import DentalCare from "./demos/dental-care/DentalCare";
import PersonalInjury from "./demos/personal-injury/PersonalInjury";
import TowingCompany from "./demos/towing-company/TowingCompany";
import TreeRemoval from "./demos/tree-removal/TreeRemoval";
import Cleaning from "./demos/cleaning/Cleaning";
import Electrical from "./demos/electrical/Electrical";
import Flooring from "./demos/Flooring/Flooring";
import Landscaping from "./demos/Landscaping/Landscaping";
import Locksmith from "./demos/Locksmith/Locksmith";
import Painting from "./demos/Painting/Painting";
import PestControl from "./demos/pest-control/PestControl";
import PressureDemo from "./demos/pressure-demo/PressureDemo";

// ─── SCROLL MANAGEMENT UTILITY ───────────────────────────────────────
function ScrollToTopAndSection() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToElement = () => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
      const timer = setTimeout(scrollToElement, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// ─── ANIMATED ROUTES ─────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {/* Veltrix Hub Main Agency Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/training" element={<Training />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* ─── DIRECT ROOT DEMO ROUTES (No /demos/ prefix) ─── */}
      {/* Fashion & Boutique */}
      <Route path="/fashion" element={<FashionDemoPage />} />
      <Route path="/boutique" element={<Navigate to="/fashion" replace />} />
      <Route path="/cosmetics" element={<Navigate to="/fashion" replace />} />

      {/* Perfumes & Scents */}
      <Route path="/perfumes" element={<PerfumesDemoPage />} />
      <Route path="/perfume" element={<Navigate to="/perfumes" replace />} />
      <Route path="/fragrances" element={<Navigate to="/perfumes" replace />} />
      <Route path="/scents" element={<Navigate to="/perfumes" replace />} />

      {/* Tech Gadgets */}
      <Route path="/tech-gadgets" element={<TechGadgetsPage />} />
      <Route path="/tech-gadgets/products" element={<ProductsPage />} />
      <Route path="/tech-gadgets/categories" element={<CategoriesPage />} />
      <Route path="/tech-gadgets/brands" element={<BrandsPage />} />
      <Route path="/tech-gadgets/about" element={<AboutPage />} />
      <Route path="/tech-gadgets/contact" element={<Navigate to="/tech-gadgets/faqs" replace />} />
      <Route path="/tech-gadgets/tracking" element={<TrackingPage />} />
      <Route path="/tech-gadgets/shipping" element={<ShippingPage />} />
      <Route path="/tech-gadgets/warranty" element={<WarrantyPage />} />
      <Route path="/tech-gadgets/verification" element={<VerificationPage />} />
      <Route path="/tech-gadgets/faqs" element={<FaqsPage />} />
      <Route path="/tech-gadgets/terms" element={<TermsPage />} />
      <Route path="/gadgets" element={<Navigate to="/tech-gadgets" replace />} />
      <Route path="/gadgets/*" element={<Navigate to="/tech-gadgets" replace />} />

      {/* Industry Demo Templates */}
      <Route path="/painting" element={<Painting />} />
      <Route path="/cleaning" element={<Cleaning />} />
      <Route path="/plumbing-services" element={<PlumbingServices />} />
      <Route path="/plumbing" element={<Navigate to="/plumbing-services" replace />} />
      <Route path="/auto-repair" element={<AutoRepair />} />
      <Route path="/contractor" element={<Contractor />} />
      <Route path="/general-contractor" element={<Navigate to="/contractor" replace />} />
      <Route path="/dental-care" element={<DentalCare />} />
      <Route path="/dental" element={<Navigate to="/dental-care" replace />} />
      <Route path="/personal-injury" element={<PersonalInjury />} />
      <Route path="/towing-company" element={<TowingCompany />} />
      <Route path="/towing" element={<Navigate to="/towing-company" replace />} />
      <Route path="/tree-removal" element={<TreeRemoval />} />
      <Route path="/electrical" element={<Electrical />} />
      <Route path="/flooring" element={<Flooring />} />
      <Route path="/landscaping" element={<Landscaping />} />
      <Route path="/locksmith" element={<Locksmith />} />
      <Route path="/pest-control" element={<PestControl />} />
      <Route path="/pressure-demo" element={<PressureDemo />} />
      <Route path="/pressure-washing" element={<Navigate to="/pressure-demo" replace />} />

      {/* ─── BACKWARD COMPATIBILITY REDIRECTS (from old /demos/*) ─── */}
      <Route path="/demos" element={<Navigate to="/fashion" replace />} />
      <Route path="/demos/fashion" element={<Navigate to="/fashion" replace />} />
      <Route path="/demos/boutique" element={<Navigate to="/fashion" replace />} />
      <Route path="/demos/cosmetics" element={<Navigate to="/fashion" replace />} />
      <Route path="/demos/perfumes" element={<Navigate to="/perfumes" replace />} />
      <Route path="/demos/perfume" element={<Navigate to="/perfumes" replace />} />
      <Route path="/demos/fragrances" element={<Navigate to="/perfumes" replace />} />
      <Route path="/demos/scents" element={<Navigate to="/perfumes" replace />} />
      <Route path="/demos/tech-gadgets" element={<Navigate to="/tech-gadgets" replace />} />
      <Route path="/demos/tech-gadgets/*" element={<Navigate to="/tech-gadgets" replace />} />
      <Route path="/demos/painting" element={<Navigate to="/painting" replace />} />
      <Route path="/demos/cleaning" element={<Navigate to="/cleaning" replace />} />
      <Route path="/demos/plumbing-services" element={<Navigate to="/plumbing-services" replace />} />
      <Route path="/demos/auto-repair" element={<Navigate to="/auto-repair" replace />} />
      <Route path="/demos/contractor" element={<Navigate to="/contractor" replace />} />
      <Route path="/demos/dental-care" element={<Navigate to="/dental-care" replace />} />
      <Route path="/demos/personal-injury" element={<Navigate to="/personal-injury" replace />} />
      <Route path="/demos/towing-company" element={<Navigate to="/towing-company" replace />} />
      <Route path="/demos/tree-removal" element={<Navigate to="/tree-removal" replace />} />
      <Route path="/demos/electrical" element={<Navigate to="/electrical" replace />} />
      <Route path="/demos/flooring" element={<Navigate to="/flooring" replace />} />
      <Route path="/demos/landscaping" element={<Navigate to="/landscaping" replace />} />
      <Route path="/demos/locksmith" element={<Navigate to="/locksmith" replace />} />
      <Route path="/demos/pest-control" element={<Navigate to="/pest-control" replace />} />
      <Route path="/demos/pressure-demo" element={<Navigate to="/pressure-demo" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// ─── MAIN APP CONTENT & LAYOUT ───────────────────────────────────────
const DEMO_DIRECT_PATHS = [
  "/fashion",
  "/boutique",
  "/cosmetics",
  "/perfumes",
  "/perfume",
  "/fragrances",
  "/scents",
  "/tech-gadgets",
  "/gadgets",
  "/painting",
  "/cleaning",
  "/plumbing-services",
  "/plumbing",
  "/auto-repair",
  "/contractor",
  "/general-contractor",
  "/dental-care",
  "/dental",
  "/personal-injury",
  "/towing-company",
  "/towing",
  "/tree-removal",
  "/electrical",
  "/flooring",
  "/landscaping",
  "/locksmith",
  "/pest-control",
  "/pressure-demo",
  "/pressure-washing",
];

function AppLayout() {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const isDemo =
    currentPath.startsWith("/demos") ||
    DEMO_DIRECT_PATHS.some((path) => currentPath === path || currentPath.startsWith(path + "/"));

  return (
    <div className="min-h-screen flex flex-col">
      {!isDemo && <Navbar />}
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      {!isDemo && <Footer />}
      {!isDemo && <FloatingWhatsApp />}
      {!isDemo && <AIChatWidget />}
    </div>
  );
}

// ─── MAIN APP COMPONENT ──────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopAndSection />
      <AppLayout />
    </BrowserRouter>
  );
}
