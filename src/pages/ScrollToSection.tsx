import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToSection() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // 1. Handle anchor links/hashes (e.g., /#services)
      const scrollToElement = () => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
      // Short delay to allow the DOM/layout to fully render
      const timer = setTimeout(scrollToElement, 200);
      return () => clearTimeout(timer);
    } else {
      // 2. Handle normal page changes automatically scrolling to the top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Triggers whenever the route path or hash changes

  return null;
}
