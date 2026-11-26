import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import {
  Wrench,
  Droplets,
  Flame,
  Search,
  Bath,
  Siren,
  ChevronDown,
} from 'lucide-react';
import CountUpNumber from '../../components/CountUpNumber';
import DemoTopBar from '../DemoTopBar';
import heroPlumbingImg from '../../assets/plumbing/plumbing-hero.jpg';
import residentialPlumbingImg from '../../assets/plumbing/plumbing-residential.jpg';
import drainPlumbingImg from '../../assets/plumbing/plumbing-drain.jpg';
import heaterCommercialPlumbingImg from '../../assets/plumbing/plumbing-heater-commercial.jpg';
import solderingPlumbingImg from '../../assets/plumbing/plumbing-soldering.jpg';
import inspectionPlumbingImg from '../../assets/plumbing/plumbing-inspection.jpg';
import './plumbing.css';

/**
 * PlumbingServices Component
 * Converted React JS landing page from /plumb/ (ProFlow Plumbing)
 * Accessible at: http://localhost:3000/plumbing-services
 */
export default function PlumbingServices() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = (window.location.hash || '').replace('#', '').toLowerCase();
      if (['services', 'residential', 'commercial', 'drain', 'water-damage', 'faq', 'about', 'contact'].includes(hash)) {
        return hash === 'about' ? 'faq' : hash;
      }
    }
    return 'home';
  });

  const navigateTo = (view, e) => {
    if (e && e.preventDefault) e.preventDefault();
    const target = view === 'about' ? 'faq' : view;
    setCurrentView(target);
    if (typeof window !== 'undefined') {
      window.location.hash = target === 'home' ? '' : target;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash || '').replace('#', '').toLowerCase();
      if (['services', 'residential', 'commercial', 'drain', 'water-damage', 'faq', 'about', 'contact'].includes(hash)) {
        setCurrentView(hash === 'about' ? 'faq' : hash);
      } else {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: '',
    problem: '',
  });

  const faqs = [
    {
      q: 'How fast can a plumber arrive in an emergency?',
      a: 'We average under 60 minutes for emergency response across the metro area. Our dispatch crew is on call 24 hours a day, 7 days a week, including weekends and holidays. For burst pipes or active flooding, reach out immediately on WhatsApp.',
    },
    {
      q: 'Do you provide upfront pricing before starting work?',
      a: 'Yes, 100%. Before turning a wrench, our technician inspects the issue and gives you a clear, flat-rate quote. There are zero hidden fees, overtime surcharges, or surprises when the job is done.',
    },
    {
      q: 'Are your plumbers licensed, bonded, and insured?',
      a: 'Every plumber on our team is state-licensed and covered by comprehensive liability insurance. All our repairs and installations come with a full 1-year workmanship warranty for total peace of mind.',
    },
    {
      q: 'What should I do immediately if a pipe bursts in my house?',
      a: 'First, locate your main water shut-off valve (usually in the utility room, garage, or outside near the meter) and turn it completely clockwise. Then shut off electricity to the affected area if water is near outlets, and message our WhatsApp emergency dispatch immediately.',
    },
    {
      q: 'Do you handle both residential and commercial properties?',
      a: 'Yes. We service single-family homes, apartments, restaurants, office complexes, and retail facilities with tailored preventive maintenance agreements, backflow testing, and commercial drain jetting.',
    },
    {
      q: 'Can I send photos or videos of the plumbing issue on WhatsApp?',
      a: 'Yes! Sending a quick video or photo of your leaking pipe, water heater, or fixture to our WhatsApp line helps our technicians diagnose the issue and bring the exact replacement parts on their first trip.',
    },
  ];

  const slides = [
    {
      badge: 'Emergency service, day or night',
      title: 'Plumbing trouble?',
      titleEm: "We're on our way.",
      desc: 'Fast, dependable help for leaks, burst pipes, and urgent repairs. Reach a real technician directly on WhatsApp and get help moving quickly.',
      ctaPrimary: 'WhatsApp for Emergency Help',
      ctaPrimaryHref: 'https://wa.me/2348087098270',
      ctaSecondary: 'Request a Quote',
      ctaSecondaryHref: '#contact',
      image: heroPlumbingImg,
    },
    {
      badge: 'Built right, from the pipes up',
      title: 'Reliable work.',
      titleEm: 'Lasting results.',
      desc: 'From pipe repairs to new installations, our plumbing team gets the details right and keeps your home or business flowing.',
      ctaPrimary: 'Explore Our Services',
      ctaPrimaryHref: '#services',
      ctaSecondary: 'Get a Free Estimate',
      ctaSecondaryHref: '#contact',
      image: heaterCommercialPlumbingImg,
    },
    {
      badge: 'Comfort starts at home',
      title: 'Small drips?',
      titleEm: "We'll make them stop.",
      desc: 'Get help with faucets, fixtures, and everyday plumbing repairs—with friendly service and clear, upfront estimates.',
      ctaPrimary: 'Schedule a Home Visit',
      ctaPrimaryHref: '#contact',
      ctaSecondary: 'WhatsApp a Plumber',
      ctaSecondaryHref: 'https://wa.me/2348087098270',
      image: residentialPlumbingImg,
    },
  ];

 // Carousel autoplay
 useEffect(() => {
 if (isPaused) return;
 const timer = setInterval(() => {
 setActiveSlide((prev) => (prev + 1) % slides.length);
 }, 4500);
 return () => clearInterval(timer);
 }, [isPaused, slides.length]);

 const handleFormSubmit = (e) => {
 e.preventDefault();
 setFormSubmitted(true);
 };

 const scrollToSection = (e, id) => {
 e.preventDefault();
 setMobileNavOpen(false);
 const element = document.querySelector(id);
 if (element) {
 const offset = 100;
 const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
 window.scrollTo({
 top: elementPosition - offset,
 behavior: 'smooth',
 });
 }
 };

 return (
 <div className="plumbing-demo" id="top">
 {/* ── TOP DEMO BAR WITH RETURN BUTTON ── */}
 <DemoTopBar demoName="ProFlow Plumbing Services" />

 {/* ── DEMO RIBBON ── */}
 

 {/* ════════════════════════════════════════
 HEADER
 ════════════════════════════════════════ */}
 {/* ════════════════════════════════════════
 HEADER
 ════════════════════════════════════════ */}
 <header className="pf-header">
 <div className="pf-header-top">
 <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            24/7 Emergency Support
          </span>
 <span>•</span>
 <span>Licensed &amp; Insured</span>
 <span>•</span>
 <span>Free Estimates</span>
 </div>

 <div className="pf-nav-wrap">
 <a href="#top" onClick={(e) => navigateTo('home', e)} className="pf-logo">
 <div className="pf-logo-icon">
 <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
 </svg>
 </div>
 <div className="pf-logo-text">
 ProFlow<span>Plumbing Services</span>
 </div>
 </a>

          <nav className="pf-nav">
            <a href="#top" onClick={(e) => navigateTo('home', e)} style={{ fontWeight: currentView === 'home' ? '700' : 'normal', color: '#f59e0b' }}>Home</a>
            <a href="#residential" onClick={(e) => navigateTo('residential', e)} style={{ fontWeight: currentView === 'residential' ? '700' : 'normal', color: '#f59e0b' }}>Residential</a>
            <a href="#commercial" onClick={(e) => navigateTo('commercial', e)} style={{ fontWeight: currentView === 'commercial' ? '700' : 'normal', color: '#f59e0b' }}>Commercial</a>
            <a href="#drain" onClick={(e) => navigateTo('drain', e)} style={{ fontWeight: currentView === 'drain' ? '700' : 'normal', color: '#f59e0b' }}>Drain Cleaning</a>
            <a href="#water-damage" onClick={(e) => navigateTo('water-damage', e)} style={{ fontWeight: currentView === 'water-damage' ? '700' : 'normal', color: '#f59e0b' }}>Water Damage</a>
            <a href="#faq" onClick={(e) => navigateTo('faq', e)} style={{ fontWeight: (currentView === 'faq' || currentView === 'about') ? '700' : 'normal', color: '#f59e0b' }}>FAQ</a>
            <a href="#contact" onClick={(e) => navigateTo('contact', e)} className="pf-nav-cta" style={{ color: "#ffffff", background: "#f59e0b" }}>
              <span style={{ color: "#ffffff", fontWeight: "700" }}>Get Free Quote</span>
            </a>
          </nav>

          <button
            className={`pf-hamburger mobile-toggle ${mobileNavOpen ? 'is-open' : ''}`}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileNavOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`pf-mobile-nav ${mobileNavOpen ? 'is-open' : ''}`}>
        <div className="pf-mobile-nav-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.95rem', color: '#f59e0b', letterSpacing: '0.06em' }}>Plumbing Menu</span>
          <button type="button" onClick={() => setMobileNavOpen(false)} style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(245,158,11,0.6)', borderRadius: '8px', color: '#f59e0b', fontSize: '1.75rem', cursor: 'pointer', lineHeight: 1, width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close menu">&times;</button>
        </div>
        <a href="#top" onClick={(e) => { setMobileNavOpen(false); navigateTo('home', e); }}>Home</a>
        <a href="#residential" onClick={(e) => { setMobileNavOpen(false); navigateTo('residential', e); }}>Residential Plumbing</a>
        <a href="#commercial" onClick={(e) => { setMobileNavOpen(false); navigateTo('commercial', e); }}>Commercial Plumbing</a>
        <a href="#drain" onClick={(e) => { setMobileNavOpen(false); navigateTo('drain', e); }}>Drain & Sewer Cleaning</a>
        <a href="#water-damage" onClick={(e) => { setMobileNavOpen(false); navigateTo('water-damage', e); }}>Water Damage Mitigation</a>
        <a href="#faq" onClick={(e) => { setMobileNavOpen(false); navigateTo('faq', e); }}>FAQ</a>
        <a href="#contact" onClick={(e) => { setMobileNavOpen(false); navigateTo('contact', e); }} className="pf-mobile-cta" style={{ color: "#ffffff", background: "#f59e0b" }}>
          <span style={{ color: "#ffffff", fontWeight: "700" }}>Get Free Quote</span>
        </a>
        </div>
      </header>

      {/* Section Header Banner */}
      {currentView !== 'home' && (
        <section className="pf-view-banner">
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 800, margin: '0', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {currentView === 'residential' && 'Residential Plumbing Services'}
              {currentView === 'commercial' && 'Commercial Plumbing & Facility Maintenance'}
              {currentView === 'drain' && 'Emergency Drain Cleaning & Sewer Line Repairs'}
              {currentView === 'water-damage' && 'Emergency Water Damage & Flood Mitigation'}
              {(currentView === 'faq' || currentView === 'about') && 'Frequently Asked Questions & Answers'}
              {currentView === 'contact' && 'Request Your Free Estimate & Dispatch'}
            </h1>
          </div>
        </section>
      )}

 {/* HOMEPAGE VIEW: Clean, customer-centric essentials */}
 {currentView === 'home' && (
 <>
 <section
 className="pf-hero"
 onMouseEnter={() => setIsPaused(true)}
 onMouseLeave={() => setIsPaused(false)}
 >
 <div className="pf-hero-slides">
 {slides.map((slide, sIdx) => {
 const isActive = sIdx === activeSlide;
 const isBefore = sIdx === (activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
 return (
 <div
 key={sIdx}
 className={`pf-hero-slide ${isActive ? 'is-active' : ''} ${isBefore ? 'is-before' : ''}`}
 style={{ backgroundImage: `url(${slide.image})` }}
 />
 );
 })}
 </div>

 <div className="pf-hero-grid">
 <div className="pf-hero-content">
 <div className="pf-hero-carousel">
 {slides.map((slide, sIdx) => {
 const isActive = sIdx === activeSlide;
 const isBefore = sIdx === (activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
 return (
 <div
 key={sIdx}
 className={`pf-hero-copy ${isActive ? 'is-active' : ''} ${isBefore ? 'is-before' : ''}`}
 aria-hidden={!isActive}
 >
 
 <h1>
 {slide.title}
 <em>{slide.titleEm}</em>
 </h1>
 <p>{slide.desc}</p>
 <div className="pf-hero-btns">
 <a
 href={slide.ctaPrimaryHref}
 {...(slide.ctaPrimaryHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
 onClick={(e) => slide.ctaPrimaryHref.startsWith('#') && scrollToSection(e, slide.ctaPrimaryHref)}
 className="pf-btn-primary"
 >
 {slide.ctaPrimaryHref.includes('wa.me') ? (
 <FaWhatsapp size={18} />
 ) : (
 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <line x1="5" y1="12" x2="19" y2="12" />
 <polyline points="12 5 19 12 12 19" />
 </svg>
 )}
 <span>{slide.ctaPrimary}</span>
 </a>
 <a
 href={slide.ctaSecondaryHref}
 {...(slide.ctaSecondaryHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
 onClick={(e) => slide.ctaSecondaryHref.startsWith('#') && scrollToSection(e, slide.ctaSecondaryHref)}
 className="pf-btn-outline"
 >
 <span>{slide.ctaSecondary}</span>
 </a>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Hero Card */}
 <div className="pf-hero-card">
 <h3>Contact Us Anytime</h3>

 <a
 href="https://wa.me/2348087098270"
 target="_blank"
 rel="noopener noreferrer"
 className="pf-contact-item"
 style={{ textDecoration: 'none' }}
 >
 <div className="pf-contact-icon">
 <FaWhatsapp style={{ width: '20px', height: '20px', fill: 'var(--amber)', stroke: 'none' }} />
 </div>
 <div>
 <div className="pf-contact-label">Phone & WhatsApp</div>
 <div className="pf-contact-val">+234 808 709 8270</div>
 </div>
 </a>

 <div className="pf-contact-item">
 <div className="pf-contact-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
 <polyline points="22,6 12,13 2,6" />
 </svg>
 </div>
 <div>
 <div className="pf-contact-label">Email Us</div>
 <div className="pf-contact-val">info@veltrixhub.ng</div>
 </div>
 </div>

 <div className="pf-contact-item">
 <div className="pf-contact-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <polyline points="12 6 12 12 16 14" />
 </svg>
 </div>
 <div>
 <div className="pf-contact-label">Working Hours</div>
 <div className="pf-contact-val">24/7 Emergency Service</div>
 </div>
 </div>

 <div className="pf-contact-item">
 <div className="pf-contact-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
 <circle cx="12" cy="10" r="3" />
 </svg>
 </div>
 <div>
 <div className="pf-contact-label">Service Area</div>
 <div className="pf-contact-val">Metro Area &amp; Surrounding Cities</div>
 </div>
 </div>
 </div>
 </div>
 </section>



 <section className="pf-section pf-section-alt" id="services">
 <div className="pf-container">
 <div className="pf-section-head reveal">
 <h2 className="pf-section-title">Complete Plumbing Solutions</h2>
 <p className="pf-section-sub">
 From minor leaks to major installations, our certified plumbers handle every job with precision and care.
 </p>
 </div>

 <div className="pf-services-grid">
          <div className="pf-service-card reveal">
            <div className="pf-svc-icon">
              <Siren className="w-6 h-6 text-amber-500" />
            </div>
            <div className="pf-svc-content">
              <h3>Emergency Repair</h3>
              <p>Burst pipes, major leaks, or no water — we respond fast, 24 hours a day, 7 days a week. Same-day service guaranteed.</p>
            </div>
          </div>

          <div className="pf-service-card reveal">
            <div className="pf-svc-icon">
              <Droplets className="w-6 h-6 text-amber-500" />
            </div>
            <div className="pf-svc-content">
              <h3>Drain Cleaning</h3>
              <p>Slow or blocked drains cleared using professional-grade hydro-jetting and snake equipment — no mess, no damage.</p>
            </div>
          </div>

          <div className="pf-service-card reveal">
            <div className="pf-svc-icon">
              <Flame className="w-6 h-6 text-amber-500" />
            </div>
            <div className="pf-svc-content">
              <h3>Water Heater Services</h3>
              <p>Installation, repair, and replacement of all water heater types including tankless systems. Hot water restored fast.</p>
            </div>
          </div>

          <div className="pf-service-card reveal">
            <div className="pf-svc-icon">
              <Wrench className="w-6 h-6 text-amber-500" />
            </div>
            <div className="pf-svc-content">
              <h3>Pipe Installation</h3>
              <p>New construction, remodeling, or pipe replacement. We install copper, PVC, and PEX piping to code — every time.</p>
            </div>
          </div>

          <div className="pf-service-card reveal">
            <div className="pf-svc-icon">
              <Search className="w-6 h-6 text-amber-500" />
            </div>
            <div className="pf-svc-content">
              <h3>Leak Detection</h3>
              <p>Advanced non-invasive technology to locate hidden leaks behind walls and under slabs before they cause serious damage.</p>
            </div>
          </div>

          <div className="pf-service-card reveal">
            <div className="pf-svc-icon">
              <Bath className="w-6 h-6 text-amber-500" />
            </div>
            <div className="pf-svc-content">
              <h3>Bathroom & Kitchen</h3>
              <p>Full bathroom and kitchen plumbing — toilets, faucets, sinks, garbage disposals, and remodel plumbing support.</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
 <div className="pf-stats-row">
 <div className="pf-stat-box">
 <div className="pf-stat-num">
 <CountUpNumber end={15} duration={1400} suffix="+" />
 </div>
 <div className="pf-stat-label">Years in Business</div>
 </div>
 <div className="pf-stat-box">
 <div className="pf-stat-num">
 <CountUpNumber end={4800} duration={1800} suffix="+" />
 </div>
 <div className="pf-stat-label">Jobs Completed</div>
 </div>
 <div className="pf-stat-box">
 <div className="pf-stat-num">4.9<span>★</span></div>
 <div className="pf-stat-label">Average Rating</div>
 </div>
 <div className="pf-stat-box">
 <div className="pf-stat-num">
 <CountUpNumber end={60} duration={1500} suffix="min" />
 </div>
 <div className="pf-stat-label">Avg Response Time</div>
 </div>
 </div>
 </div>
 </section>

        {/* ════════════════════════════════════════
        FIELD ACTIVITIES & PLUMBING IN ACTION
        ════════════════════════════════════════ */}
        <section className="pf-section pf-activities-section" id="activities">
          <div className="pf-container">
            <div className="pf-section-head center reveal">
              <div className="pf-section-label">Real Field Workmanship</div>
              <h2 className="pf-section-title">Plumbing Activities in Action</h2>
              <p className="pf-section-sub">
                Authentic field photos of our certified plumbers completing emergency repairs, fixture installations, and system diagnostics across residential and commercial sites.
              </p>
            </div>

            <div className="pf-activities-grid">
              {/* Activity 1 */}
              <div className="pf-activity-card reveal">
                <div className="pf-activity-img-wrap">
                  <img
                    src={heroPlumbingImg}
                    alt="Plumber repairing brass and copper kitchen pipe fittings"
                    loading="lazy"
                  />
                  <span className="pf-activity-tag">Emergency Dispatch</span>
                </div>
                <div className="pf-activity-body">
                  <div className="pf-activity-meta">
                    <span className="pf-activity-location">Residential • Sink Repair</span>
                    <span className="pf-activity-status">Completed</span>
                  </div>
                  <h3>Under-Sink Leak Detection &amp; Repiping</h3>
                  <p>Diagnosed a hidden compression fitting failure, replaced corroded brass lines, and restored proper water flow with zero water damage.</p>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="pf-activity-card reveal">
                <div className="pf-activity-img-wrap">
                  <img
                    src={residentialPlumbingImg}
                    alt="Plumber installing chrome mixer tap on luxury marble vanity"
                    loading="lazy"
                  />
                  <span className="pf-activity-tag">Remodel &amp; Upgrade</span>
                </div>
                <div className="pf-activity-body">
                  <div className="pf-activity-meta">
                    <span className="pf-activity-location">Bathroom • Fixture Setup</span>
                    <span className="pf-activity-status">Completed</span>
                  </div>
                  <h3>Luxury Vanity &amp; Mixer Faucet Installation</h3>
                  <p>Installed modern chrome mixer faucet with reinforced stainless braided supply lines and high-pressure shut-off valves.</p>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="pf-activity-card reveal">
                <div className="pf-activity-img-wrap">
                  <img
                    src={drainPlumbingImg}
                    alt="Plumber operating compact motorized drain auger snake on clean tile floor"
                    loading="lazy"
                  />
                  <span className="pf-activity-tag">Same-Day Clearing</span>
                </div>
                <div className="pf-activity-body">
                  <div className="pf-activity-meta">
                    <span className="pf-activity-location">Utility Floor • Drain Line</span>
                    <span className="pf-activity-status">Completed</span>
                  </div>
                  <h3>Motorized Drain Snaking &amp; Clog Removal</h3>
                  <p>Deployed heavy-duty motorized auger to clear stubborn grease and sediment buildup from the main utility drain line.</p>
                </div>
              </div>

              {/* Activity 4 */}
              <div className="pf-activity-card reveal">
                <div className="pf-activity-img-wrap">
                  <img
                    src={heaterCommercialPlumbingImg}
                    alt="Commercial tankless water heater manifolds and brass valves"
                    loading="lazy"
                  />
                  <span className="pf-activity-tag">Commercial Heating</span>
                </div>
                <div className="pf-activity-body">
                  <div className="pf-activity-meta">
                    <span className="pf-activity-location">Facility • Water Heating</span>
                    <span className="pf-activity-status">Completed</span>
                  </div>
                  <h3>Commercial Tankless Water Heater Manifold</h3>
                  <p>Configured high-efficiency tankless water heating system with calibrated pressure relief valves and isolated copper manifolds.</p>
                </div>
              </div>

              {/* Activity 5 */}
              <div className="pf-activity-card reveal">
                <div className="pf-activity-img-wrap">
                  <img
                    src={solderingPlumbingImg}
                    alt="Plumber soldering brass elbow joint connecting copper pipes in utility room"
                    loading="lazy"
                  />
                  <span className="pf-activity-tag">Master Pipe Fitting</span>
                </div>
                <div className="pf-activity-body">
                  <div className="pf-activity-meta">
                    <span className="pf-activity-location">Supply Lines • Soldering</span>
                    <span className="pf-activity-status">Completed</span>
                  </div>
                  <h3>High-Temperature Copper Joint Soldering</h3>
                  <p>Precision torch brazing and soldering of heavy-duty copper lines ensuring airtight seals tested under 120 PSI pressure.</p>
                </div>
              </div>

              {/* Activity 6 */}
              <div className="pf-activity-card reveal">
                <div className="pf-activity-img-wrap">
                  <img
                    src={inspectionPlumbingImg}
                    alt="Plumber using video pipe inspection camera monitor system"
                    loading="lazy"
                  />
                  <span className="pf-activity-tag">Advanced Diagnostics</span>
                </div>
                <div className="pf-activity-body">
                  <div className="pf-activity-meta">
                    <span className="pf-activity-location">Sewer Line • Video Scan</span>
                    <span className="pf-activity-status">Completed</span>
                  </div>
                  <h3>HD Video Pipeline &amp; Root Inspection</h3>
                  <p>Inserted flexible diagnostic camera through cleanout to locate underground tree root intrusion without digging up property.</p>
                </div>
              </div>
            </div>

            {/* Bottom activities action card */}
            <div
              className="pf-activities-cta reveal"
              style={{
                marginTop: '3rem',
                padding: '2rem 1.5rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #0A1628 0%, #172A45 100%)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                boxShadow: '0 16px 36px rgba(10, 22, 40, 0.15)',
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Need Similar Plumbing Work Handled at Your Property?
              </h3>
              <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)', maxWidth: '600px', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Share pictures or a description of your issue directly on WhatsApp. Our master dispatchers respond in under 5 minutes with upfront estimates.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
                <a
                  href="https://wa.me/2348087098270?text=Hello%20ProFlow%20Plumbing%2C%20I%20saw%20your%20recent%20plumbing%20work%20and%20I%20need%20a%20quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-btn pf-btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 2rem' }}
                >
                  <FaWhatsapp size={18} />
                  <span>Send Job Photos on WhatsApp</span>
                </a>
                <button
                  onClick={(e) => navigateTo('contact', e)}
                  className="pf-btn pf-btn-outline"
                  style={{ padding: '0.85rem 2rem' }}
                >
                  Request Online Quote &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

<section className="pf-section" style={{ background: 'var(--navy)' }} id="about">
 <div className="pf-container">
 <div className="pf-section-head center reveal">
 <h2 className="pf-section-title" style={{ color: 'var(--white)' }}>Why Homeowners Choose Us</h2>
 <p className="pf-section-sub" style={{ color: 'rgba(255,255,255,.6)' }}>
 We built our reputation one job at a time — by showing up on time, being honest about pricing, and doing work we're proud to put our name on.
 </p>
 </div>

 <div className="pf-why-grid">
 <div className="pf-why-card reveal">
 <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
 <h3>Fast Response Time</h3>
 <p>We average under 60 minutes to reach your location for emergencies — because we know time is critical when it comes to water damage.</p>
 </div>

 <div className="pf-why-card reveal">
 <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
 <h3>Licensed &amp; Fully Insured</h3>
 <p>Every technician on our team is state-licensed and fully insured. You're protected — and so is your home — on every single job.</p>
 </div>

 <div className="pf-why-card reveal">
 <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
 <h3>Upfront, Flat Pricing</h3>
 <p>We give you a clear price before any work begins. No hidden fees, no surprise charges on the final bill — ever.</p>
 </div>

 <div className="pf-why-card reveal">
 <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
 <h3>Workmanship Guarantee</h3>
 <p>All repairs and installations come with a 1-year labor guarantee. If something isn't right, we come back and fix it — no charge.</p>
 </div>

 <div className="pf-why-card reveal">
 <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
 <h3>Experienced Local Team</h3>
 <p>Our plumbers average 12 years of hands-on experience. We've seen every plumbing problem imaginable and know exactly how to fix it.</p>
 </div>

 <div className="pf-why-card reveal">
 <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
 <h3>Clear Communication</h3>
 <p>We explain what we find, what needs to be done, and why — in plain language, not plumber jargon. You're always in control.</p>
 </div>
 </div>
 </div>
 </section>

 <section className="pf-section pf-section-alt">
 <div className="pf-container">
 <div className="pf-section-head center reveal">
 <h2 className="pf-section-title">What Our Clients Say</h2>
 <p className="pf-section-sub">
 Don't just take our word for it — here's what real customers have to say about ProFlow Plumbing.
 </p>
 </div>

 <div className="pf-testi-grid">
 <div className="pf-testi-card reveal">
 <div className="pf-stars">
 {[...Array(5)].map((_, i) => (
 <svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
 ))}
 </div>
 <blockquote>
 "Pipe burst at 11pm on a Sunday. ProFlow had someone at my door in 45 minutes. They stopped the flooding, fixed the pipe, and even cleaned up the mess. Absolutely incredible service — I won't call anyone else."
 </blockquote>
 <div className="pf-reviewer">
 <div className="pf-avatar" style={{ background: '#1a3a5c' }}>MR</div>
 <div className="pf-reviewer-info">
 <strong>Michael R.</strong>
 <span>Homeowner — Austin, TX</span>
 </div>
 </div>
 </div>

 <div className="pf-testi-card reveal">
 <div className="pf-stars">
 {[...Array(5)].map((_, i) => (
 <svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
 ))}
 </div>
 <blockquote>
 "We use ProFlow for all three of our restaurant locations. They understand that our business can't afford downtime. Always responsive, always professional, and their preventive maintenance contract has saved us twice."
 </blockquote>
 <div className="pf-reviewer">
 <div className="pf-avatar" style={{ background: '#7c3aed' }}>SL</div>
 <div className="pf-reviewer-info">
 <strong>Sandra L.</strong>
 <span>Restaurant Owner — Denver, CO</span>
 </div>
 </div>
 </div>

 <div className="pf-testi-card reveal">
 <div className="pf-stars">
 {[...Array(5)].map((_, i) => (
 <svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
 ))}
 </div>
 <blockquote>
 "Had a slow drain that two other plumbers couldn't fix. ProFlow came in with a camera, found a root intrusion 30 feet down the line, and cleared it the same day. The pricing was completely upfront — no surprises. Highly recommend."
 </blockquote>
 <div className="pf-reviewer">
 <div className="pf-avatar" style={{ background: '#065f46' }}>JT</div>
 <div className="pf-reviewer-info">
 <strong>James T.</strong>
 <span>Homeowner — Charlotte, NC</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 <section className="pf-section" id="contact">
 <div className="pf-container">
 <div className="pf-section-head reveal">
 <h2 className="pf-section-title">Request a Free Quote</h2>
 <p className="pf-section-sub">
 Fill out the form and we'll get back to you within 30 minutes during business hours — or message us directly on WhatsApp for immediate assistance.
 </p>
 </div>

 <div className="pf-contact-wrap">
 <div className="pf-contact-info">
 <h3>We are Here When You Need Us</h3>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <FaWhatsapp style={{ width: '20px', height: '20px', fill: 'var(--amber-dark)', stroke: 'none' }} />
 </div>
 <div>
 <strong>Phone & WhatsApp</strong>
 <span>
 <a
 href="https://wa.me/2348087098270"
 target="_blank"
 rel="noopener noreferrer"
 style={{ color: 'inherit', textDecoration: 'underline' }}
 >
 +234 808 709 8270
 </a>{' '}
 — 24/7 Emergency Support
 </span>
 </div>
 </div>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
 <polyline points="22,6 12,13 2,6" />
 </svg>
 </div>
 <div>
 <strong>Email</strong>
 <span>info@veltrixhub.ng</span>
 </div>
 </div>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <polyline points="12 6 12 12 16 14" />
 </svg>
 </div>
 <div>
 <strong>Business Hours</strong>
 <span>Mon–Fri: 7am–7pm | Sat: 8am–5pm | Emergency: 24/7</span>
 </div>
 </div>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
 <circle cx="12" cy="10" r="3" />
 </svg>
 </div>
 <div>
 <strong>Service Area</strong>
 <span>Metro Area &amp; Surrounding Communities</span>
 </div>
 </div>
 </div>

 <form className="pf-contact-form" onSubmit={handleFormSubmit}>
 <h3>Get Your Free Estimate</h3>

 {formSubmitted ? (
 <div className="p-6 rounded-xl bg-white/10 text-center space-y-2">
 <div className="text-amber-400 font-bold text-lg font-['Bebas_Neue'] tracking-wider">
 Quote Request Received!
 </div>
 <p className="text-xs text-white/90">
 Thank you {formData.firstName}! A certified plumbing technician will review your request and contact you at {formData.phone || formData.email} within 30 minutes.
 </p>
 <button
 type="button"
 onClick={() => setFormSubmitted(false)}
 className="mt-3 text-xs text-amber-400 hover:text-white underline font-semibold"
 >
 Submit Another Request
 </button>
 </div>
 ) : (
 <>
 <div className="pf-form-row">
 <div className="pf-field">
 <label htmlFor="firstName">First Name</label>
 <input
 id="firstName"
 name="firstName"
 type="text"
 placeholder="John"
 required
 value={formData.firstName}
 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
 />
 </div>
 <div className="pf-field">
 <label htmlFor="lastName">Last Name</label>
 <input
 id="lastName"
 name="lastName"
 type="text"
 placeholder="Smith"
 required
 value={formData.lastName}
 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
 />
 </div>
 </div>

 <div className="pf-form-row">
 <div className="pf-field">
 <label htmlFor="phone">WhatsApp / Phone Number</label>
 <input
 id="phone"
 name="phone"
 type="tel"
 placeholder="Your WhatsApp or phone number"
 required
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 />
 </div>
 <div className="pf-field">
 <label htmlFor="email">Email Address</label>
 <input
 id="email"
 name="email"
 type="email"
 placeholder="john@email.com"
 required
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 />
 </div>
 </div>

 <div className="pf-field">
 <label htmlFor="service">Service Needed</label>
 <select
 id="service"
 name="service"
 required
 value={formData.service}
 onChange={(e) => setFormData({ ...formData, service: e.target.value })}
 >
 <option value="">Select a service...</option>
 <option>Emergency Repair</option>
 <option>Drain Cleaning</option>
 <option>Water Heater Service</option>
 <option>Pipe Installation / Repair</option>
 <option>Residential Plumbing</option>
 <option>Commercial Plumbing</option>
 <option>Water Damage / Flood</option>
 <option>Leak Detection</option>
 <option>Other</option>
 </select>
 </div>

 <div className="pf-field">
 <label htmlFor="problem">Describe the Problem</label>
 <textarea
 id="problem"
 name="problem"
 placeholder="Tell us what's happening — the more detail, the better we can prepare..."
 value={formData.problem}
 onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
 />
 </div>

 <button className="pf-submit-btn" type="submit">
 Send My Free Quote Request →
 </button>
 <p className="pf-form-status">
 Fast response guaranteed • Upfront flat pricing • No obligation
 </p>
 </>
 )}
 </form>
 </div>
 </div>
 </section>
 </>
 )}

 {/* RESIDENTIAL VIEW */}
 {currentView === 'residential' && (
 <>
 <section className="pf-section" id="residential">
 <div className="pf-container">
 <div className="pf-two-col">
 <div className="pf-col-text">
 <h2 className="pf-section-title">Residential Plumbing</h2>
 <p className="pf-section-sub">
 Your home deserves plumbing that works perfectly. We handle everything from routine maintenance to urgent repairs — with care, respect for your property, and zero surprises on the bill.
 </p>

 <div className="pf-feature-list">
 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Whole-Home Plumbing Inspections</strong>
 <p>Complete assessment of your plumbing system to catch problems before they become expensive emergencies.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Toilet, Faucet &amp; Fixture Repairs</strong>
 <p>Running toilets, dripping faucets, and broken fixtures fixed quickly using quality parts that last.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Water Pressure Issues</strong>
 <p>Low or inconsistent pressure diagnosed and resolved — from pressure regulators to blocked supply lines.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Remodel &amp; New Installation</strong>
 <p>Full plumbing support for bathroom and kitchen remodels — rough-in to final connection.</p>
 </div>
 </div>
 </div>

 <a href="#contact" className="pf-btn-primary" style={{ width: 'fit-content' }}>
 Schedule Home Visit
 </a>
 </div>

 <div className="pf-col-img">
 <img
 src={residentialPlumbingImg}
 alt="Plumber repairing pipes beneath a sink"
 loading="lazy"
 />
 <div className="pf-img-badge">Trusted by 2,000+ Homeowners</div>
 </div>
 </div>
 </div>
 </section>
  {/* Residential Bottom CTA */}
  <section className="pf-section text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
    <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--navy)' }}>Need a Reliable Home Plumber?</h2>
      <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>From leaky faucets to complete repiping, we offer upfront pricing and tidy, respectful service.</p>
      <button onClick={(e) => navigateTo('contact', e)} className="pf-btn pf-btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
        Schedule Residential Service &rarr;
      </button>
    </div>
  </section>
 </>
 )}

 {/* COMMERCIAL VIEW */}
 {currentView === 'commercial' && (
 <>
 <section className="pf-section pf-section-alt" id="commercial">
 <div className="pf-container">
 <div className="pf-two-col reverse">
 <div className="pf-col-text">
 <h2 className="pf-section-title">Commercial Plumbing</h2>
 <p className="pf-section-sub">
 Downtime costs money. Our commercial team responds fast, works efficiently, and minimizes disruption to your business operations — whether it's a restaurant, office building, or retail space.
 </p>

 <div className="pf-feature-list">
 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Restaurants &amp; Food Service</strong>
 <p>Grease trap cleaning, commercial kitchen drain service, and health code compliant plumbing installations.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Office &amp; Retail Buildings</strong>
 <p>Multi-restroom service, water line maintenance, and scheduled preventive maintenance contracts available.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>New Construction &amp; Fit-Outs</strong>
 <p>Complete commercial plumbing from ground up — working with contractors and developers on all project sizes.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Backflow Prevention &amp; Testing</strong>
 <p>Annual backflow device testing and certification to keep your business compliant with local codes.</p>
 </div>
 </div>
 </div>

 <a href="#contact" className="pf-btn-primary" style={{ width: 'fit-content' }}>
 Get Commercial Quote
 </a>
 </div>

 <div className="pf-col-img">
 <img
 src={heaterCommercialPlumbingImg}
 alt="Commercial plumbing pipes and valves"
 loading="lazy"
 />
 <div className="pf-img-badge">Serving 500+ Local Businesses</div>
 </div>
 </div>
 </div>
 </section>
  {/* Commercial Bottom CTA */}
  <section className="pf-section text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
    <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--navy)' }}>Commercial Plumbing &amp; Preventative Maintenance</h2>
      <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Keep your facilities fully compliant and running smoothly with priority commercial accounts.</p>
      <button onClick={(e) => navigateTo('contact', e)} className="pf-btn pf-btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
        Book Commercial Consultation &rarr;
      </button>
    </div>
  </section>
 </>
 )}

 {/* DRAIN VIEW */}
 {currentView === 'drain' && (
 <>
 <section className="pf-section" id="drain">
 <div className="pf-container">
 <div className="pf-two-col">
 <div className="pf-col-text">
 <h2 className="pf-section-title">Drain Cleaning &amp; Repair</h2>
 <p className="pf-section-sub">
 Blocked, slow, or foul-smelling drains are more than an inconvenience — they can signal serious pipe damage. We use professional equipment to clear and inspect every drain thoroughly.
 </p>

 <div className="pf-feature-list">
 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Hydro-Jetting Service</strong>
 <p>High-pressure water jetting blasts through grease, scale, and tree root intrusions that snaking can't clear.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Video Drain Inspection</strong>
 <p>We run a camera inside your pipes to see exactly what's happening — no guesswork, no unnecessary digging.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Sewer Line Cleaning</strong>
 <p>Main sewer line blockages cleared fast to prevent sewage backup into your home or business.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Root Intrusion Removal</strong>
 <p>Tree roots growing into sewer lines are one of the top causes of drain failure — we remove them completely.</p>
 </div>
 </div>
 </div>

 <a href="#contact" className="pf-btn-primary" style={{ width: 'fit-content' }}>
 Book Drain Service
 </a>
 </div>

 <div className="pf-col-img">
 <img
 src={drainPlumbingImg}
 alt="Plumber repairing a toilet"
 loading="lazy"
 />
 <div className="pf-img-badge">Same-Day Drain Clearing</div>
 </div>
 </div>
 </div>
 </section>
  {/* Drain Bottom CTA */}
  <section className="pf-section text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
    <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--navy)' }}>Stubborn Clogs or Main Line Backups?</h2>
      <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>We use high-definition video inspection and motorized augers to clear blockages quickly.</p>
      <button onClick={(e) => navigateTo('contact', e)} className="pf-btn pf-btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
        Request Emergency Drain Clearing &rarr;
      </button>
    </div>
  </section>
 </>
 )}

 {/* WATER DAMAGE VIEW */}
 {currentView === 'water-damage' && (
 <>
 <section className="pf-section pf-section-alt" id="water-damage">
 <div className="pf-container">
 <div className="pf-two-col reverse">
 <div className="pf-col-text">
 <h2 className="pf-section-title">Water Damage &amp; Flood Response</h2>
 <p className="pf-section-sub">
 A burst pipe or sudden flood can cause thousands in damage within hours. Our emergency team responds in 60 minutes or less to stop the source and protect your property.
 </p>

 <div className="pf-feature-list">
 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Burst Pipe Emergency Response</strong>
 <p>We locate and stop burst pipes immediately, then assess and repair the full extent of the damage.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Flooding &amp; Water Extraction</strong>
 <p>Fast water removal to minimize structural damage and reduce the risk of mold growth in your walls and floors.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Insurance Claim Support</strong>
 <p>We document everything and provide detailed reports to help you file a successful insurance claim.</p>
 </div>
 </div>

 <div className="pf-feat-item">
 <div className="pf-feat-check">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="20 6 9 17 4 12" />
 </svg>
 </div>
 <div>
 <strong>Pipe Replacement &amp; Restoration</strong>
 <p>Full replacement of damaged pipes and support throughout the property restoration process.</p>
 </div>
 </div>
 </div>

 <a
 href="https://wa.me/2348087098270"
 target="_blank"
 rel="noopener noreferrer"
 className="pf-btn-primary"
 style={{ width: 'fit-content', background: '#DC2626' }}
 >
 <FaWhatsapp size={18} />
 <span>WhatsApp Emergency Line Now</span>
 </a>
 </div>

 <div className="pf-col-img">
 <img
 src={heroPlumbingImg}
 alt="Plumber repairing pipes inside a wall"
 loading="lazy"
 />
 <div className="pf-img-badge">60-Min Emergency Response</div>
 </div>
 </div>
 </div>
 </section>

 {/* ════════════════════════════════════════
 EMERGENCY BANNER
 ════════════════════════════════════════ */}
 <div className="pf-emergency">
 <div className="pf-container">
 <h2>Plumbing Emergency? Don't Wait.</h2>
 <p>Every minute counts. Our emergency crew is standing by on WhatsApp right now.</p>
 <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer" className="pf-phone-big">
 +234 808 709 8270
 </a>
 <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer" className="pf-btn-dark">
 <FaWhatsapp size={20} />
 <span>Tap to WhatsApp Now — 24/7 Emergency Support</span>
 </a>
 </div>
 </div>
  {/* Water Damage Bottom CTA */}
  <section className="pf-section text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
    <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--navy)' }}>Burst Pipe or Flooding Emergency?</h2>
      <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Our dispatch team responds 24/7 to shut down leaks and extract standing water before damage spreads.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="tel:+2348087098270" className="pf-btn pf-btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
          Call Emergency Dispatch
        </a>
        <button onClick={(e) => navigateTo('contact', e)} className="pf-btn pf-btn-outline" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
          Request Flood Help Online &rarr;
        </button>
      </div>
    </div>
  </section>
 </>
 )}

 {/* FAQ VIEW */}
      {(currentView === 'faq' || currentView === 'about') && (
        <>
          <section className="pf-section pf-section-alt" id="faq">
            <div className="pf-container">
              <div className="pf-section-head center reveal">
                <h2 className="pf-section-title">Frequently Asked Questions</h2>
                <p className="pf-section-sub">
                  Quick answers to common questions about our emergency response times, upfront pricing, warranties, and scheduling.
                </p>
              </div>

              <div className="pf-faq-container" style={{ maxWidth: '840px', margin: '0 auto' }}>
                {faqs.map((faq, fIdx) => {
                  const isOpen = openFaq === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className={`pf-faq-item reveal ${isOpen ? 'is-open' : ''}`}
                      style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        border: isOpen ? '1.5px solid var(--amber)' : '1px solid #e2e8f0',
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        boxShadow: isOpen ? '0 8px 24px -4px rgba(245, 158, 11, 0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : fIdx)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          padding: '1.25rem 1.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                        aria-expanded={isOpen}
                      >
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.4 }}>
                          {faq.q}
                        </span>
                        <ChevronDown
                          className="w-5 h-5"
                          style={{
                            color: isOpen ? 'var(--amber)' : '#94a3b8',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s ease, color 0.25s ease',
                            flexShrink: 0,
                          }}
                        />
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            padding: '0 1.5rem 1.25rem',
                            color: '#475569',
                            fontSize: '0.95rem',
                            lineHeight: 1.65,
                            borderTop: '1px solid #f1f5f9',
                            paddingTop: '1rem',
                          }}
                        >
                          <p style={{ margin: 0 }}>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Still have questions WhatsApp block */}
              <div
                className="reveal"
                style={{
                  maxWidth: '840px',
                  margin: '2.5rem auto 0',
                  padding: '2rem',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)',
                  color: '#ffffff',
                  textAlign: 'center',
                  boxShadow: '0 12px 32px rgba(10, 22, 40, 0.15)',
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#ffffff' }}>
                  Have a Question Not Listed Here?
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
                  Speak directly with an on-duty master plumber. We answer WhatsApp inquiries within minutes.
                </p>
                <a
                  href="https://wa.me/2348087098270?text=Hello%20ProFlow%20Plumbing%2C%20I%20have%20a%20question%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-btn pf-btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 2rem' }}
                >
                  <FaWhatsapp size={18} />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </section>

          {/* FAQ Bottom CTA */}
          <section className="pf-section text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--navy)' }}>Ready to Schedule Plumbing Service?</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Transparent estimates, clean work areas, and warranties on all parts and labor.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="pf-btn pf-btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Request Free Quote &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* CONTACT VIEW */}
 {currentView === 'contact' && (
 <>
 <section className="pf-section" id="contact">
 <div className="pf-container">
 <div className="pf-section-head reveal">
 <h2 className="pf-section-title">Request a Free Quote</h2>
 <p className="pf-section-sub">
 Fill out the form and we'll get back to you within 30 minutes during business hours — or message us directly on WhatsApp for immediate assistance.
 </p>
 </div>

 <div className="pf-contact-wrap">
 <div className="pf-contact-info">
 <h3>We are Here When You Need Us</h3>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <FaWhatsapp style={{ width: '20px', height: '20px', fill: 'var(--amber-dark)', stroke: 'none' }} />
 </div>
 <div>
 <strong>Phone & WhatsApp</strong>
 <span>
 <a
 href="https://wa.me/2348087098270"
 target="_blank"
 rel="noopener noreferrer"
 style={{ color: 'inherit', textDecoration: 'underline' }}
 >
 +234 808 709 8270
 </a>{' '}
 — 24/7 Emergency Support
 </span>
 </div>
 </div>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
 <polyline points="22,6 12,13 2,6" />
 </svg>
 </div>
 <div>
 <strong>Email</strong>
 <span>info@veltrixhub.ng</span>
 </div>
 </div>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="10" />
 <polyline points="12 6 12 12 16 14" />
 </svg>
 </div>
 <div>
 <strong>Business Hours</strong>
 <span>Mon–Fri: 7am–7pm | Sat: 8am–5pm | Emergency: 24/7</span>
 </div>
 </div>

 <div className="pf-info-row">
 <div className="pf-info-icon">
 <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
 <circle cx="12" cy="10" r="3" />
 </svg>
 </div>
 <div>
 <strong>Service Area</strong>
 <span>Metro Area &amp; Surrounding Communities</span>
 </div>
 </div>
 </div>

 <form className="pf-contact-form" onSubmit={handleFormSubmit}>
 <h3>Get Your Free Estimate</h3>

 {formSubmitted ? (
 <div className="p-6 rounded-xl bg-white/10 text-center space-y-2">
 <div className="text-amber-400 font-bold text-lg font-['Bebas_Neue'] tracking-wider">
 Quote Request Received!
 </div>
 <p className="text-xs text-white/90">
 Thank you {formData.firstName}! A certified plumbing technician will review your request and contact you at {formData.phone || formData.email} within 30 minutes.
 </p>
 <button
 type="button"
 onClick={() => setFormSubmitted(false)}
 className="mt-3 text-xs text-amber-400 hover:text-white underline font-semibold"
 >
 Submit Another Request
 </button>
 </div>
 ) : (
 <>
 <div className="pf-form-row">
 <div className="pf-field">
 <label htmlFor="firstName">First Name</label>
 <input
 id="firstName"
 name="firstName"
 type="text"
 placeholder="John"
 required
 value={formData.firstName}
 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
 />
 </div>
 <div className="pf-field">
 <label htmlFor="lastName">Last Name</label>
 <input
 id="lastName"
 name="lastName"
 type="text"
 placeholder="Smith"
 required
 value={formData.lastName}
 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
 />
 </div>
 </div>

 <div className="pf-form-row">
 <div className="pf-field">
 <label htmlFor="phone">WhatsApp / Phone Number</label>
 <input
 id="phone"
 name="phone"
 type="tel"
 placeholder="Your WhatsApp or phone number"
 required
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 />
 </div>
 <div className="pf-field">
 <label htmlFor="email">Email Address</label>
 <input
 id="email"
 name="email"
 type="email"
 placeholder="john@email.com"
 required
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 />
 </div>
 </div>

 <div className="pf-field">
 <label htmlFor="service">Service Needed</label>
 <select
 id="service"
 name="service"
 required
 value={formData.service}
 onChange={(e) => setFormData({ ...formData, service: e.target.value })}
 >
 <option value="">Select a service...</option>
 <option>Emergency Repair</option>
 <option>Drain Cleaning</option>
 <option>Water Heater Service</option>
 <option>Pipe Installation / Repair</option>
 <option>Residential Plumbing</option>
 <option>Commercial Plumbing</option>
 <option>Water Damage / Flood</option>
 <option>Leak Detection</option>
 <option>Other</option>
 </select>
 </div>

 <div className="pf-field">
 <label htmlFor="problem">Describe the Problem</label>
 <textarea
 id="problem"
 name="problem"
 placeholder="Tell us what's happening — the more detail, the better we can prepare..."
 value={formData.problem}
 onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
 />
 </div>

 <button className="pf-submit-btn" type="submit">
 Send My Free Quote Request →
 </button>
 <p className="pf-form-status">
 Fast response guaranteed • Upfront flat pricing • No obligation
 </p>
 </>
 )}
 </form>
 </div>
 </div>
 </section>
 </>
 )}
 <footer className="pf-footer">
 <div className="pf-footer-grid">
 <div className="pf-footer-brand">
 <a href="#top" className="pf-logo">
 <div className="pf-logo-icon">
 <svg viewBox="0 0 24 24" fill="#0A1628">
 <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
 </svg>
 </div>
 <div className="pf-logo-text">
 ProFlow<span>Plumbing Services</span>
 </div>
 </a>
 <p>
 Family-owned and operated since 2008. Serving homeowners and businesses with honest, reliable plumbing services you can count on. Powered by Veltrix Hub.
 </p>
 </div>

 <div className="pf-footer-col">
 <h4>Services</h4>
 <a href="#services" >Emergency Repairs</a>
 <a href="#services" >Drain Cleaning</a>
 <a href="#services" >Water Heaters</a>
 <a href="#services" >Pipe Installation</a>
 <a href="#services" >Leak Detection</a>
 </div>

 <div className="pf-footer-col">
 <h4>Service Type</h4>
 <a href="#residential" onClick={(e) => navigateTo('residential', e)} >Residential</a>
 <a href="#commercial" onClick={(e) => navigateTo('commercial', e)} >Commercial</a>
 <a href="#drain" onClick={(e) => navigateTo('drain', e)} >Drain Services</a>
 <a href="#water-damage" onClick={(e) => navigateTo('water-damage', e)} >Water Damage</a>
 </div>

 <div className="pf-footer-col">
 <h4>Contact</h4>
 <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer">
 +234 808 709 8270
 </a>
 <a href="mailto:info@veltrixhub.ng">info@veltrixhub.ng</a>
 <a href="#contact" onClick={(e) => navigateTo('contact', e)} >Get Free Quote</a>
 <a href="#faq" onClick={(e) => navigateTo('faq', e)} >FAQ</a>
          <div className="footer-social-links" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '1.25rem' }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Facebook"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Instagram"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="X (formerly Twitter)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Pinterest"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
 </div>
 </div>

 <div className="pf-footer-bottom">
 <span>© {new Date().getFullYear()} ProFlow Plumbing Services. All rights reserved. Demo site engineered by Veltrix Hub.</span>
 <span>
 Licensed &amp; Insured | <a href="/">Veltrix Hub Main Platform</a>
 </span>
 </div>
 </footer>

 {/* ── STICKY MOBILE WHATSAPP CTA ── */}
 <div className="pf-sticky-cta">
 <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer">
 <FaWhatsapp style={{ width: '20px', height: '20px', fill: 'var(--navy)', stroke: 'none' }} />
 <span>WhatsApp Us — +234 808 709 8270</span>
 </a>
 </div>
 </div>
 );
}

