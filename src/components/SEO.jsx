import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Dynamic SEO Component for Veltrix Hub
 * Updates Document Title, Meta Description, Keywords, Canonical URL, and Social Meta (OG/Twitter)
 */
export default function SEO({
  title,
  description,
  keywords,
  ogImage = "https://veltrixhub.ng/og-image.jpg",
  ogType = "website",
  canonical,
  noIndex = false,
}) {
  const location = useLocation();
  const siteBrand = "Veltrix Hub";
  
  // Format page title nicely
  const formattedTitle = title
    ? title.includes(siteBrand)
      ? title
      : `${title} | ${siteBrand}`
    : "Veltrix Hub – Become Visible. Build Trust. Grow Your Business.";

  const canonicalUrl =
    canonical ||
    `https://veltrixhub.ng${location.pathname === "/" ? "" : location.pathname}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = formattedTitle;

    // Helper: update or inject meta tag
    const setMeta = (attrKey, attrVal, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Primary Meta Tags
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("property", "twitter:description", description);
    }

    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    // Robots indexing
    setMeta(
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 3. Open Graph & Twitter Cards
    setMeta("property", "og:title", formattedTitle);
    setMeta("property", "twitter:title", formattedTitle);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "twitter:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");

    // 4. Canonical Tag
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);
  }, [formattedTitle, description, keywords, ogImage, ogType, canonicalUrl, noIndex]);

  return null;
}
