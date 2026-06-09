import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Training from "./pages/Training";
import About from "./pages/About";
import Contact from "./pages/Contact";

// ─── SCROLL MANAGEMENT UTILITY ───────────────────────────────────────
function ScrollToTopAndSection() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is an anchor link section hash (e.g., /#/about#team or just /#contact-form)
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
      // Automatically snap to the top when navigating to a fresh page route
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Listen to both route changes and anchor jumps

  return null;
}

// ─── ANIMATED ROUTES ─────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/training" element={<Training />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

// ─── MAIN APP COMPONENT ──────────────────────────────────────────────
export default function App() {
  return (
    <HashRouter>
      {/* Placed inside HashRouter so useLocation can track page changes */}
      <ScrollToTopAndSection />

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
