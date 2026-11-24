import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const VELTRIX_FOCUS_DEMOS = [
  { name: 'Building Contractors', path: '/contractor', tag: '₦2M-₦10M+' },
  { name: 'Painting & Finishing', path: '/painting', tag: 'Interactive' },
  { name: 'Commercial Cleaning', path: '/cleaning', tag: 'B2B' },
  { name: 'Auto Repair & Diagnostics', path: '/auto-repair', tag: 'Emergency' },
  { name: 'Dental Care Clinics', path: '/dental-care', tag: 'Elective' },
  { name: 'Commercial Law Firm', path: '/personal-injury', tag: 'Retainers' },
  { name: 'Solar & Electrical', path: '/electrical', tag: 'Power' },
  { name: 'Pest Control & Fumigation', path: '/pest-control', tag: 'Quarterly' },
  { name: 'Luxury Fashion Boutique', path: '/fashion', tag: 'Bespoke' },
  { name: 'Tech Gadgets Hub', path: '/tech-gadgets', tag: 'Retail' },
  { name: 'Haute Parfumerie', path: '/perfumes', tag: 'Prestige' },
];

/**
 * DemoTopBar - Veltrix Hub Edition
 * Pinned at the very top of each live demo template.
 * Provides return to Veltrix Hub, instant demo switcher, and WhatsApp CTA.
 */
export default function DemoTopBar({ demoName = 'Client Template Demo' }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleBackToIndex = (e) => {
    window.location.href = '/';
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targetSelectors = [
      '.reveal', '.reveal-on-scroll', '.animate-on-scroll', '.service-card',
      '.pf-service-card', '.pf-why-card', '.pf-testi-card', '.pf-hero-card',
      '.difference-card', '.result-card', '.review-card', '.feature-card',
      '.benefit-card', '.why-benefit-card', '.prep-step-card', '.step-item',
      '.trust-item', '.metric-card', '.gallery-card', '.gallery-item', '.process-step'
    ].join(', ');

    const activate = (el) => {
      el.classList.add('active');
      el.classList.add('is-visible');
      el.classList.add('visible');
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll(targetSelectors).forEach(activate);
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.04, rootMargin: '0px 0px 50px 0px' });

    const scanAndObserve = () => {
      const elements = document.querySelectorAll(targetSelectors);
      elements.forEach(el => {
        if (!el.classList.contains('active') && !el.classList.contains('is-visible')) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            activate(el);
          } else {
            observer.observe(el);
          }
        }
      });
    };

    scanAndObserve();
    const frameId = requestAnimationFrame(scanAndObserve);
    const initialTimer = setTimeout(scanAndObserve, 250);

    const mutationObserver = new MutationObserver(() => { scanAndObserve(); });
    const rootEl = document.getElementById('root') || document.body;
    if (rootEl) {
      mutationObserver.observe(rootEl, { childList: true, subtree: true });
    }

    const handleHashOrScroll = () => { scanAndObserve(); };
    window.addEventListener('hashchange', handleHashOrScroll);
    window.addEventListener('scroll', handleHashOrScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(initialTimer);
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('hashchange', handleHashOrScroll);
      window.removeEventListener('scroll', handleHashOrScroll);
    };
  }, []);

  const whatsappMsg = encodeURIComponent('Hello Veltrix Hub, I saw the ' + demoName + ' demo and I am interested in a website like this for my business.');

  return (
    <aside 
      className="sticky top-0 left-0 right-0 z-[999999] bg-[#050f2c] text-white border-b border-cyan-900/60 px-3 sm:px-6 py-2.5 shadow-lg backdrop-blur-md bg-opacity-95"
      role="banner"
      aria-label="Demo template banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <a
          href="/"
          onClick={handleBackToIndex}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 shadow-sm transition-all duration-200 active:scale-95 shrink-0"
          aria-label="Back to Veltrix Hub"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Veltrix Hub</span>
        </a>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Demo:</span>
          <strong className="text-white font-semibold">{demoName}</strong>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile All Demos Switcher Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-amber-400/40 shadow-sm transition-all active:scale-95 shrink-0"
            aria-label="Toggle all demo templates"
          >
            {drawerOpen ? <FiX className="w-3.5 h-3.5 text-amber-400" /> : <FiMenu className="w-3.5 h-3.5 text-amber-400" />}
            <span className="uppercase text-[11px] tracking-wider font-extrabold">{drawerOpen ? "Close" : "11 Demos"}</span>
          </button>

          <a
            href={'https://wa.me/2348087098270?text=' + whatsappMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 shrink-0"
          >
            <FaWhatsapp className="w-4 h-4 text-white" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Slide-out Demos Drawer */}
      {drawerOpen && (
        <div className="bg-[#070e24] border-t border-slate-800 p-4 shadow-2xl max-h-[75vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                11 Veltrix Hub Focus Templates
              </span>
              <span className="text-[10px] text-slate-400">Click any to preview</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {VELTRIX_FOCUS_DEMOS.map((d) => (
                <a
                  key={d.path}
                  href={d.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-between transition-colors ${
                    window.location.pathname.startsWith(d.path)
                      ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white"
                  }`}
                >
                  <span>{d.name}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">{d.tag}</span>
                </a>
              ))}
            </div>
            <div className="pt-2 text-center">
              <a
                href="/"
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-block"
              >
                &larr; Return to Veltrix Hub Agency Homepage
              </a>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
