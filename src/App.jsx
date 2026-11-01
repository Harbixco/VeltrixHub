// 1. Switched HashRouter to BrowserRouter here
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

// ─── SCROLL MANAGEMENT UTILITY ───────────────────────────────────────
function ScrollToTopAndSection() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Handles landing on a section anchor link (e.g., /about#our-team)
      const scrollToElement = () => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
      const timer = setTimeout(scrollToElement, 100);
      return () => clearTimeout(timer);
    } else {
      // Automatically snap to the top cleanly when navigating to a fresh page route
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
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/training" element={<Training />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/demos" element={<Navigate to="/demos/fashion" replace />} />
      <Route path="/demos/fashion" element={<FashionDemoPage />} />
      <Route path="/demos/boutique" element={<Navigate to="/demos/fashion" replace />} />
      <Route path="/demos/cosmetics" element={<Navigate to="/demos/fashion" replace />} />

      {/* Luxury Perfumes & Scent Parfumerie Showcase */}
      <Route path="/demos/perfumes" element={<PerfumesDemoPage />} />
      <Route path="/demos/perfume" element={<Navigate to="/demos/perfumes" replace />} />
      <Route path="/demos/fragrances" element={<Navigate to="/demos/perfumes" replace />} />
      <Route path="/demos/scents" element={<Navigate to="/demos/perfumes" replace />} />

      {/* Tech Gadgets Showcase - Dedicated Pages */}
      <Route path="/demos/tech-gadgets" element={<TechGadgetsPage />} />
      <Route path="/demos/tech-gadgets/products" element={<ProductsPage />} />
      <Route path="/demos/tech-gadgets/categories" element={<CategoriesPage />} />
      <Route path="/demos/tech-gadgets/brands" element={<BrandsPage />} />
      <Route path="/demos/tech-gadgets/about" element={<AboutPage />} />
      <Route path="/demos/tech-gadgets/contact" element={<Navigate to="/demos/tech-gadgets/faqs" replace />} />
      <Route path="/demos/tech-gadgets/tracking" element={<TrackingPage />} />
      <Route path="/demos/tech-gadgets/shipping" element={<ShippingPage />} />
      <Route path="/demos/tech-gadgets/warranty" element={<WarrantyPage />} />
      <Route path="/demos/tech-gadgets/verification" element={<VerificationPage />} />
      <Route path="/demos/tech-gadgets/faqs" element={<FaqsPage />} />
      <Route path="/demos/tech-gadgets/terms" element={<TermsPage />} />

      {/* Alternate routes & case fallbacks */}
      <Route path="/demos/contact" element={<Navigate to="/demos/tech-gadgets/faqs" replace />} />
      <Route path="/demos/Tech-Gadgets" element={<Navigate to="/demos/tech-gadgets" replace />} />
      <Route path="/demos/Tech-Gadgets/*" element={<Navigate to="/demos/tech-gadgets" replace />} />
      <Route path="/demos/gadgets" element={<Navigate to="/demos/tech-gadgets" replace />} />
      <Route path="/demos/gadgets/*" element={<Navigate to="/demos/tech-gadgets" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// ─── MAIN APP CONTENT & LAYOUT ───────────────────────────────────────
function AppLayout() {
  const location = useLocation();
  const isDemo = location.pathname.startsWith("/demos");

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
