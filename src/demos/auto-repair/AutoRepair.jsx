import React, { useState, useEffect } from 'react';
import DemoTopBar from '../DemoTopBar';
import CountUpNumber from '../../components/CountUpNumber';
import {
  Gauge,
  Disc,
  Droplets,
  Cog,
  CircleDot,
  Zap,
  Sliders,
  Wrench,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import './auto-repair.css';

/**
 * AutoRepair Component
 * Converted React landing page for Veltrix Hub Precision Auto Care demo
 * Accessible at: http://localhost:3000/auto-repair
 */
export default function AutoRepair() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = (window.location.hash || '').replace('#', '').toLowerCase();
      if (["services","about","difference","reviews","appointment","faq","contact"].includes(hash)) return hash;
      if (['services', 'about', 'reviews', 'testimonials', 'projects', 'gallery', 'faq', 'contact'].includes(hash)) return hash;
    }
    return 'home';
  });

  const navigateTo = (view, e) => {
    if (e && e.preventDefault) e.preventDefault();
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view === 'home' ? '' : view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = (window.location.hash || '').replace('#', '').toLowerCase();
      if (["services","about","difference","reviews","appointment","faq","contact"].includes(hash)) {
        setCurrentView(hash);
      } else if (['services', 'about', 'reviews', 'testimonials', 'projects', 'gallery', 'faq', 'contact'].includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const servicesList = [
    {
      id: '01',
      title: 'Engine diagnostics',
      desc: 'Clear answers for check engine lights, strange sounds, and rough idling. We identify the exact issue before quoting any work.',
      icon: <Gauge size={24} strokeWidth={2} />,
    },
    {
      id: '02',
      title: 'Brake repair',
      desc: 'Reliable stopping power with ceramic pad installation, rotor resurfacing, and complete hydraulic fluid inspection.',
      icon: <Disc size={24} strokeWidth={2} />,
    },
    {
      id: '03',
      title: 'Oil & filter',
      desc: 'Premium full synthetic and blend motor oils paired with OEM filters, topped off with a courtesy multi-point safety check.',
      icon: <Droplets size={24} strokeWidth={2} />,
    },
    {
      id: '04',
      title: 'Transmission',
      desc: 'Complete fluid exchange, diagnostic solenoid checks, and thorough clutch or gearbox service for smooth gear shifts.',
      icon: <Cog size={24} strokeWidth={2} />,
    },
    {
      id: '05',
      title: 'Tires & alignment',
      desc: 'Computerized four-wheel laser alignment, wheel balancing, and tire rotations to ensure stable highway tracking and even tread wear.',
      icon: <CircleDot size={24} strokeWidth={2} />,
    },
    {
      id: '06',
      title: 'Battery care',
      desc: 'High-accuracy digital charge testing, terminal cleaning, and dependable AGM battery replacements with long-term warranties.',
      icon: <Zap size={24} strokeWidth={2} />,
    },
    {
      id: '07',
      title: 'Suspension',
      desc: 'Shock absorbers, struts, ball joints, and control arms replaced to restore comfortable road handling and cornering control.',
      icon: <Sliders size={24} strokeWidth={2} />,
    },
    {
      id: '08',
      title: 'Vehicle maintenance',
      desc: 'Scheduled 30,000 / 60,000 / 90,000 mile milestone inspections to keep your vehicle running smoothly and protect manufacturer warranties.',
      icon: <Wrench size={24} strokeWidth={2} />,
    },
  ];

  const heroSlides = [
    {
      image: '/demos/auto-repair/images/workshop.jpg',
      alt: 'Bright, modern automotive workshop bay with car on lift',
    },
    {
      image: '/demos/auto-repair/images/technician.jpg',
      alt: 'Certified master technician running advanced computer diagnostics',
    },
    {
      image: '/demos/auto-repair/images/alt-service.jpg',
      alt: 'Precision engine servicing and maintenance',
    },
    {
      image: '/demos/auto-repair/images/alt-workshop.jpg',
      alt: 'Clean automotive service center with certified mechanics',
    },
  ];

  const reviews = [
    {
      quote:
        'They took the time to explain everything and never made me feel pressured. My car is running beautifully—and I finally feel good about bringing it in.',
      name: 'Jamie M.',
      role: 'Customer since 2021',
      avatar: 'JM',
    },
    {
      quote:
        'Professional, kind and genuinely thorough. I appreciated the updates throughout the day and the honest advice about what could wait.',
      name: 'Casey L.',
      role: 'Customer since 2022',
      avatar: 'CL',
    },
    {
      quote:
        'From the first hello to picking up my keys, the whole experience felt easy. It’s a relief to have a shop I can trust.',
      name: 'Taylor R.',
      role: 'Customer since 2023',
      avatar: 'TR',
    },
  ];

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Auto-advance reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    setAppointmentSubmitted(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const renderContactSection = () => (
    <section className="contact-section" id="contact">
      <div className="container contact-unified-container">
        {/* Left Column: Contact details (5th image) */}
        <div className="contact-sidebar">
          <div className="contact-sidebar__header">
            <span className="contact-badge">GET IN TOUCH</span>
            <h2>Visit or Message Us</h2>
            <p>Drop by our shop, call our service desk, or send us a quick note below. We reply promptly.</p>
          </div>

          <div className="contact-details-grid">
            <div className="contact-detail-card">
              <span className="contact-detail-label">PHONE & WHATSAPP</span>
              <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer" className="contact-detail-val">
                +234 808 709 8270
              </a>
            </div>
            <div className="contact-detail-card">
              <span className="contact-detail-label">SEND US A NOTE</span>
              <a href="mailto:info@veltrixhub.ng" className="contact-detail-val">
                info@veltrixhub.ng
              </a>
            </div>
            <div className="contact-detail-card">
              <span className="contact-detail-label">FIND THE SHOP</span>
              <p className="contact-detail-text">
                124 Industrial Parkway<br />
                Metro District, Suite 100
              </p>
            </div>
            <div className="contact-detail-card">
              <span className="contact-detail-label">WHEN WE'RE HERE</span>
              <p className="contact-detail-text">
                Monday–Friday <b>8:00 am – 6:00 pm</b><br />
                Saturday <b>9:00 am – 2:00 pm</b><br />
                Sunday <b>Closed</b>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact form */}
        <div className="contact-form-wrapper">
          <form className="contact-form" id="contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-form__heading">
              <h3 style={{ margin: '0 0 0.5rem', color: '#ffffff', fontSize: '1.4rem', fontWeight: 800 }}>Send a Direct Message</h3>
              <p style={{ margin: '0 0 1.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>Have a question about a sound or estimate? Send us your message and we'll get right back to you.</p>
            </div>

            <div className="contact-form-row">
              <label className="field">
                <span>Your name <b>*</b></span>
                <input name="name" type="text" placeholder="John Doe" autoComplete="name" required minLength="2" />
              </label>
              <label className="field">
                <span>Email address <b>*</b></span>
                <input name="email" type="email" placeholder="john@example.com" autoComplete="email" required />
              </label>
            </div>

            <label className="field contact-form__message">
              <span>Your message <b>*</b></span>
              <textarea name="message" rows="4" placeholder="Tell us about your vehicle, model year, or any symptoms you've noticed..." required minLength="5"></textarea>
            </label>

            <div className="contact-form__submit">
              <button className="button button--accent" type="submit">
                Send Message <span>↗</span>
              </button>
            </div>

            {contactSubmitted && (
              <div className="form-success contact-form__success" role="status">
                <span>✓</span>
                <div>
                  <b>Message received!</b>
                  <p>In this demonstration preview, your message has been logged. In production, our service advisor receives immediate notification.</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="auto-repair-demo" id="top">
      {/* ── TOP DEMO BAR WITH RETURN BUTTON ── */}
      <DemoTopBar demoName="Veltrix Hub Precision Auto Care" />

      {/* Demo Notice Banner */}
      <div className="demo-banner" role="note">
        <span className="demo-banner__tag">DEMO WEBSITE</span>
        <span>Concept website only — Veltrix Hub is not an operating repair business.</span>
      </div>

      {/* Site Header - Styled after /painting */}
      <header className="site-header" role="banner">
        <div className="container-wide">
          <div className="nav-container">
            {/* Logo */}
            <a href="#home" onClick={(e) => navigateTo('home', e)} className="site-logo" aria-label="Veltrix Hub Home">
              <div className="logo-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <span className="logo-text">VELTRIX HUB</span>
                <span className="logo-tagline">Auto Repair & Care</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="nav-links" role="navigation" aria-label="Main Navigation">
              <a href="#services" onClick={(e) => navigateTo('services', e)} className={`nav-link ${currentView === 'services' ? 'active' : ''}`}>Services</a>
              <a href="#about" onClick={(e) => navigateTo('about', e)} className={`nav-link ${currentView === 'about' ? 'active' : ''}`}>Our Story</a>
              <a href="#difference" onClick={(e) => navigateTo('difference', e)} className={`nav-link ${currentView === 'difference' || currentView === 'why-us' ? 'active' : ''}`}>Why Veltrix Hub</a>
              <a href="#reviews" onClick={(e) => navigateTo('reviews', e)} className={`nav-link ${currentView === 'reviews' ? 'active' : ''}`}>Reviews</a>
              <a href="#faq" onClick={(e) => navigateTo('faq', e)} className={`nav-link ${currentView === 'faq' ? 'active' : ''}`}>FAQ</a>
              <a href="#contact" onClick={(e) => navigateTo('contact', e)} className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}>Contact</a>
            </nav>

            {/* Nav Actions */}
            <div className="nav-actions">
              <a href="#appointment" onClick={(e) => navigateTo('appointment', e)} className="btn btn-primary btn-sm">
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book Appointment
              </a>
              <button
                className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay & Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} aria-hidden="true"></div>
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`} role="dialog" aria-label="Mobile Navigation">
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Auto Care Menu</span>
          <button type="button" className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation menu">
            &times;
          </button>
        </div>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('home', e); }} href="#home" className={`nav-link ${currentView === 'home' ? 'active' : ''}`}>Home</a>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('services', e); }} href="#services" className={`nav-link ${currentView === 'services' ? 'active' : ''}`}>Services</a>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('about', e); }} href="#about" className={`nav-link ${currentView === 'about' ? 'active' : ''}`}>Our Story</a>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('difference', e); }} href="#difference" className={`nav-link ${currentView === 'difference' || currentView === 'why-us' ? 'active' : ''}`}>Why Veltrix Hub</a>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('reviews', e); }} href="#reviews" className={`nav-link ${currentView === 'reviews' ? 'active' : ''}`}>Customer Reviews</a>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('faq', e); }} href="#faq" className={`nav-link ${currentView === 'faq' ? 'active' : ''}`}>FAQ</a>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('contact', e); }} href="#contact" className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}>Contact & Location</a>
        <a onClick={(e) => { setMobileMenuOpen(false); navigateTo('appointment', e); }} href="#appointment" className="btn btn-primary nav-cta">
          Book Appointment
        </a>
      </aside>

      <main id="main">

      {/* Section Header Banner */}
      {currentView !== 'home' && (
        <section className="view-page-banner" style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '2.25rem 1.5rem',
          color: '#ffffff',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: '0', letterSpacing: '-0.02em', color: '#ffffff' }}>
              {currentView === 'services' && 'Auto Repair Services & Maintenance'}
              {currentView === 'about' && 'About Our Auto Repair Shop'}
              {(currentView === 'why-us' || currentView === 'difference' || currentView === 'technology') && 'Why Drivers Choose Veltrix Hub Auto'}
              {(currentView === 'projects' || currentView === 'gallery' || currentView === 'results') && 'Our Shop Facility & Diagnostics'}
              {(currentView === 'reviews' || currentView === 'testimonials') && 'Driver Feedback & Real Reviews'}
              {currentView === 'faq' && 'Frequently Asked Questions'}
              {(currentView === 'contact' || currentView === 'appointment' || currentView === 'consultation') && 'Schedule Service & Contact Us'}
            </h1>
            </div>
        </section>
      )}

      {/* HOMEPAGE VIEW: High-converting, clean customer essentials */}
      {currentView === 'home' && (
        <>
        <section className="hero" aria-label="Veltrix Hub auto care">
          <div className="hero__slides" aria-hidden="true">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`hero__slide ${idx === heroIndex ? 'is-active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ))}
          </div>
          <div className="hero__shade"></div>

          <div className="hero__content container">
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              <span>CERTIFIED MECHANICS • SAME-DAY DIAGNOSTICS</span>
            </div>
            <h1>
              Precision Care for<br />
              <span>Every Single Mile.</span>
            </h1>
            <p className="hero-copy">
              Honest diagnostics, upfront transparent estimates, and certified technicians who treat your vehicle with genuine care. From routine fluid changes to complex engine rebuilds, we get you safely back on the road.
            </p>
            <div className="hero__actions">
              <a className="button button--accent" href="#appointment" onClick={(e) => scrollToSection(e, 'appointment')}>
                Schedule Your Visit <span aria-hidden="true">↗</span>
              </a>
              <a className="button button--outline-hero" href="#services" onClick={(e) => scrollToSection(e, 'services')}>
                Explore Services <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero__proof">
              <span className="proof-stars" aria-label="Five out of five stars">★★★★★</span>
              <span>Rated 5.0 by local drivers • 12-Month / 12,000-Mile Parts & Labor Warranty</span>
            </div>
          </div>

          <div className="hero__bottom container">
            <div className="hero__controls">
              <button
                type="button"
                className="hero-arrow hero-prev"
                aria-label="Previous slide"
                onClick={() => setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              >
                ←
              </button>
              <button
                type="button"
                className="hero-arrow hero-next"
                aria-label="Next slide"
                onClick={() => setHeroIndex((prev) => (prev + 1) % heroSlides.length)}
              >
                →
              </button>
            </div>
          </div>
          <a className="hero__scroll" href="#services" onClick={(e) => scrollToSection(e, 'services')}>
            <span>Scroll to discover</span>
            <span className="scroll-line"></span>
          </a>
        </section>

        {/* ── TRUST STRIP ── */}
        <div className="trust-strip" aria-label="Veltrix Hub commitments">
          <div className="container trust-strip__inner">
            <div>
              <span className="trust-number">01</span>
              <span>Clarity before<br />the wrench turns</span>
            </div>
            <div>
              <span className="trust-number">02</span>
              <span>Quality parts.<br />Careful work.</span>
            </div>
            <div>
              <span className="trust-number">03</span>
              <span>Here for the<br />long road</span>
            </div>
            <a href="#difference" onClick={(e) => scrollToSection(e, 'difference')}>
              The Veltrix Hub standard <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* ── SERVICES SECTION ── */}

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading section-heading--split reveal">
              <div>
                <h2>
                  Complete auto care.<br /><em>Every turn.</em>
                </h2>
              </div>
              <p>
                From the quick essentials to the complex fixes, our technicians bring precision and a personal touch to every service.
              </p>
            </div>

            <div className="services-grid">
              {servicesList.map((service) => (
                <div
                  key={service.id}
                  className="service-card reveal"
                  onClick={(e) => {
                    setSelectedService(service.title);
                    scrollToSection(e, 'appointment');
                  }}
                >
                  <span className="service-card__number">{service.id}</span>
                  <span className="service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </div>
              ))}
            </div>

            <div className="services-foot">
              <span>Not sure what your vehicle needs?</span>
              <a className="text-link" href="#appointment" onClick={(e) => scrollToSection(e, 'appointment')}>
                Tell us what's going on <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── WORKSHOP & DIAGNOSTICS VISUAL GALLERY ── */}
        <section className="section" style={{ background: '#0e1724', padding: '4.5rem 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="container">
            <div className="section-heading section-heading--split reveal" style={{ marginBottom: '2.5rem' }}>
              <div>
                <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Facility & Equipment</span>
                <h2 style={{ color: '#ffffff', marginTop: '0.35rem' }}>
                  State-of-the-art bays.<br /><em>Certified hands.</em>
                </h2>
              </div>
              <p style={{ color: '#94a3b8' }}>
                Take an inside look at our modern diagnostics facility, certified mechanics, and specialized automotive tooling in active service.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {[
                {
                  img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
                  title: 'Computer Diagnostics & ECU Analysis',
                  tag: 'Diagnostics Bay'
                },
                {
                  img: '/demos/auto-repair/images/brake-disc-caliper.jpg',
                  title: 'Brake Disc & Hydraulic Calipers',
                  tag: 'Safety Systems'
                },
                {
                  img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
                  title: 'Laser Wheel Alignment & Balance',
                  tag: 'Suspension'
                },
                {
                  img: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
                  title: 'Certified Engine Overhauls & Tuning',
                  tag: 'Powertrain'
                },
                {
                  img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
                  title: 'European & Luxury Sports Servicing',
                  tag: 'Performance'
                },
                {
                  img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
                  title: 'Multi-Point Inspection & Final Signoff',
                  tag: 'Quality Control'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '240px', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,17,28,0.92) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f59e0b', marginBottom: '0.25rem' }}>{item.tag}</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>{item.title}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION ── */}
        <section className="reviews-section section" id="reviews">
          <div className="container reviews-layout">
            <div className="reviews-intro">
              <h2>
                Trust is earned<br /><em>one visit at a time.</em>
              </h2>
              <div className="review-score">
                <strong>5.0</strong>
                <span>
                  <b>★★★★★</b>
                  <small>Based on customer feedback</small>
                </span>
              </div>
            </div>

            <div className="review-carousel" aria-roledescription="carousel" aria-label="Customer testimonials">
              <div className="review-track">
                {reviews.map((rev, idx) => (
                  <blockquote
                    key={idx}
                    className={`review-slide ${idx === reviewIndex ? 'is-active' : ''}`}
                  >
                    <span className="quote-mark">“</span>
                    <p>{rev.quote}</p>
                    <footer>
                      <span className="review-avatar">{rev.avatar}</span>
                      <span>
                        <b>{rev.name}</b>
                        <small>{rev.role}</small>
                      </span>
                      <span className="review-stars" aria-label="5 out of 5 stars">
                        ★★★★★
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>

              <div className="review-controls">
                <span className="review-dots" aria-label="Choose testimonial">
                  {reviews.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={dotIdx === reviewIndex ? 'is-active' : ''}
                      aria-label={`Show testimonial ${dotIdx + 1}`}
                      onClick={() => setReviewIndex(dotIdx)}
                    />
                  ))}
                </span>
                <div>
                  <button
                    className="review-prev"
                    aria-label="Previous testimonial"
                    onClick={() => setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                  >
                    ←
                  </button>
                  <button
                    className="review-next"
                    aria-label="Next testimonial"
                    onClick={() => setReviewIndex((prev) => (prev + 1) % reviews.length)}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT & LOCATION SECTION ── */}
        {renderContactSection()}
        </>
      )}

      {/* SERVICES VIEW */}
      {currentView === 'services' && (
        <>
        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading section-heading--split reveal">
              <div>
                <h2>
                  Complete auto care.<br /><em>Every turn.</em>
                </h2>
              </div>
              <p>
                From the quick essentials to the complex fixes, our technicians bring precision and a personal touch to every service.
              </p>
            </div>

            <div className="services-grid">
              {servicesList.map((service) => (
                <div
                  key={service.id}
                  className="service-card reveal"
                  onClick={(e) => {
                    setSelectedService(service.title);
                    scrollToSection(e, 'appointment');
                  }}
                >
                  <span className="service-card__number">{service.id}</span>
                  <span className="service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </div>
              ))}
            </div>

            <div className="services-foot">
              <span>Not sure what your vehicle needs?</span>
              <a className="text-link" href="#appointment" onClick={(e) => scrollToSection(e, 'appointment')}>
                Tell us what's going on <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── WORKSHOP & DIAGNOSTICS VISUAL GALLERY ── */}
        <section className="section" style={{ background: '#0e1724', padding: '4.5rem 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="container">
            <div className="section-heading section-heading--split reveal" style={{ marginBottom: '2.5rem' }}>
              <div>
                <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Facility & Equipment</span>
                <h2 style={{ color: '#ffffff', marginTop: '0.35rem' }}>
                  State-of-the-art bays.<br /><em>Certified hands.</em>
                </h2>
              </div>
              <p style={{ color: '#94a3b8' }}>
                Take an inside look at our modern diagnostics facility, certified mechanics, and specialized automotive tooling in active service.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {[
                {
                  img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
                  title: 'Computer Diagnostics & ECU Analysis',
                  tag: 'Diagnostics Bay'
                },
                {
                  img: '/demos/auto-repair/images/brake-disc-caliper.jpg',
                  title: 'Brake Disc & Hydraulic Calipers',
                  tag: 'Safety Systems'
                },
                {
                  img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
                  title: 'Laser Wheel Alignment & Balance',
                  tag: 'Suspension'
                },
                {
                  img: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
                  title: 'Certified Engine Overhauls & Tuning',
                  tag: 'Powertrain'
                },
                {
                  img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
                  title: 'European & Luxury Sports Servicing',
                  tag: 'Performance'
                },
                {
                  img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
                  title: 'Multi-Point Inspection & Final Signoff',
                  tag: 'Quality Control'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '240px', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,17,28,0.92) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f59e0b', marginBottom: '0.25rem' }}>{item.tag}</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700 }}>{item.title}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--ink)' }}>Need Service or Have Questions About a Repair?</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Talk directly with an ASE-certified technician or reserve your service appointment online.</p>
              <button onClick={(e) => navigateTo('appointment', e)} className="button button-gold" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Schedule an Appointment &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* ABOUT / STORY VIEW */}
      {currentView === 'about' && (
        <>
        <section className="about-section" id="about">
          <div className="container about-layout">
            <div className="about-visual">
              <img
                src="/demos/auto-repair/images/alt-workshop.jpg"
                alt="Technician working under the hood of a vehicle in a repair workshop"
                loading="lazy"
              />
              <div className="about-visual__label">
                <span>VELTRIX HUB</span>
                <b>Built on trust.<br />Driven by care.</b>
              </div>
              <div className="about-visual__stamp">
                <span>CARE<br />IN EVERY<br />DETAIL</span>
                <svg viewBox="0 0 80 80" aria-hidden="true">
                  <circle cx="40" cy="40" r="36" />
                  <path d="M20 42h40M40 22v40M26 28l28 28m0-28L26 56" />
                </svg>
              </div>
            </div>

            <div className="about-copy">
              <h2>
                Good service<br />is a <em>feeling.</em>
              </h2>
              <p className="about-lead">
                It’s the calm of knowing what’s happening with your car—and why. That’s the kind of auto care we believe in.
              </p>
              <p>
                Veltrix Hub brings together skilled hands, modern diagnostic tools and a simple promise: listen first, explain clearly, and treat every vehicle like it carries someone we care about.
              </p>
              <a className="button button--outline-light" href="#difference" onClick={(e) => scrollToSection(e, 'difference')}>
                Get to know us <span aria-hidden="true">↗</span>
              </a>

              <div className="about-stats">
                <div>
                  <strong>
                    <CountUpNumber end={15} suffix="+" duration={1.8} />
                  </strong>
                  <span>years of<br />experience</span>
                </div>
                <div>
                  <strong>
                    <CountUpNumber end={4} suffix="k+" duration={2} />
                  </strong>
                  <span>vehicles<br />cared for</span>
                </div>
                <div>
                  <strong>
                    <CountUpNumber end={98} suffix="%" duration={1.8} />
                  </strong>
                  <span>customers<br />recommend us</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFFERENCE SECTION ── */}
        <section className="difference-section section" id="difference">
          <div className="container">
            <div className="section-heading section-heading--center reveal">
              <h2>
                Car care, without<br /><em>the guesswork.</em>
              </h2>
              <p>Every visit is shaped around your time, your questions and what’s right for your vehicle.</p>
            </div>

            <div className="difference-grid">
              <article className="difference-card reveal">
                <span className="difference-card__num">01 / HONESTY</span>
                <div className="difference-icon" aria-hidden="true">◉</div>
                <h3>Clear, upfront guidance</h3>
                <p>We explain what we find and talk through your options before work begins.</p>
              </article>
              <article className="difference-card reveal">
                <span className="difference-card__num">02 / CRAFT</span>
                <div className="difference-icon" aria-hidden="true">✳</div>
                <h3>Work with intention</h3>
                <p>Experienced technicians, modern diagnostic equipment and attention to detail.</p>
              </article>
              <article className="difference-card reveal">
                <span className="difference-card__num">03 / RESPECT</span>
                <div className="difference-icon" aria-hidden="true">↗</div>
                <h3>Your time matters</h3>
                <p>Thoughtful scheduling and helpful updates keep you in the loop at every step.</p>
              </article>
              <article className="difference-card reveal">
                <span className="difference-card__num">04 / CARE</span>
                <div className="difference-icon" aria-hidden="true">♡</div>
                <h3>People come first</h3>
                <p>We’re here to make the repair experience a little more human, every time.</p>
              </article>
            </div>
          </div>
        </section>

        {/* About Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--ink)' }}>Experience Honest, Transparent Auto Care</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>We walk you through digital inspection photos and never recommend unnecessary repairs.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="button button-gold" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Contact Our Shop &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* WHY US VIEW */}
      {(currentView === 'why-us' || currentView === 'difference' || currentView === 'technology') && (
        <>
        <section className="difference-section section" id="difference">
          <div className="container">
            <div className="section-heading section-heading--center reveal">
              <h2>
                Car care, without<br /><em>the guesswork.</em>
              </h2>
              <p>Every visit is shaped around your time, your questions and what’s right for your vehicle.</p>
            </div>

            <div className="difference-grid">
              <article className="difference-card reveal">
                <span className="difference-card__num">01 / HONESTY</span>
                <div className="difference-icon" aria-hidden="true">◉</div>
                <h3>Clear, upfront guidance</h3>
                <p>We explain what we find and talk through your options before work begins.</p>
              </article>
              <article className="difference-card reveal">
                <span className="difference-card__num">02 / CRAFT</span>
                <div className="difference-icon" aria-hidden="true">✳</div>
                <h3>Work with intention</h3>
                <p>Experienced technicians, modern diagnostic equipment and attention to detail.</p>
              </article>
              <article className="difference-card reveal">
                <span className="difference-card__num">03 / RESPECT</span>
                <div className="difference-icon" aria-hidden="true">↗</div>
                <h3>Your time matters</h3>
                <p>Thoughtful scheduling and helpful updates keep you in the loop at every step.</p>
              </article>
              <article className="difference-card reveal">
                <span className="difference-card__num">04 / CARE</span>
                <div className="difference-icon" aria-hidden="true">♡</div>
                <h3>People come first</h3>
                <p>We’re here to make the repair experience a little more human, every time.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Difference Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--ink)' }}>Ready to Experience the Veltrix Hub Difference?</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>From complimentary loaner vehicles to our 24-month warranty, your peace of mind comes first.</p>
              <button onClick={(e) => navigateTo('appointment', e)} className="button button-gold" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Reserve Your Visit &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* PROJECTS / PORTFOLIO VIEW */}
      {(currentView === 'projects' || currentView === 'gallery' || currentView === 'results') && (
        <>
        <section className="gallery-section">
          <div className="container gallery-heading">
            <div>
              <h2>
                Our work.<br /><em>Our workshop.</em>
              </h2>
            </div>
            <a className="text-link text-link--light" href="#appointment" onClick={(e) => scrollToSection(e, 'appointment')}>
              See us in person <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="gallery-grid">
            <figure className="gallery-item gallery-item--wide">
              <img
                src="/demos/auto-repair/images/alt-service.jpg"
                alt="Organized selection of tools in an automotive repair workshop"
                loading="lazy"
              />
              <figcaption>
                <span>01</span> The workshop
              </figcaption>
            </figure>
            <figure className="gallery-item">
              <img
                src="/demos/auto-repair/images/workshop.jpg"
                alt="Close-up of engine belt and pulley components"
                loading="lazy"
              />
              <figcaption>
                <span>02</span> The details
              </figcaption>
            </figure>
            <figure className="gallery-item">
              <img
                src="/demos/auto-repair/images/sports-car.jpg"
                alt="Dark performance car on the road"
                loading="lazy"
              />
              <figcaption>
                <span>03</span> Ready for the road
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Gallery Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--ink)' }}>Equipped with Modern Diagnostic Bays</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Our facility handles everything from brake fluid flushes to engine timing and electrical diagnostics.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="button button-gold" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Ask a Technician &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* REVIEWS / TESTIMONIALS VIEW */}
      {(currentView === 'reviews' || currentView === 'testimonials') && (
        <>
        <section className="reviews-section section" id="reviews">
          <div className="container reviews-layout">
            <div className="reviews-intro">
              <h2>
                Trust is earned<br /><em>one visit at a time.</em>
              </h2>
              <div className="review-score">
                <strong>5.0</strong>
                <span>
                  <b>★★★★★</b>
                  <small>Based on customer feedback</small>
                </span>
              </div>
            </div>

            <div className="review-carousel" aria-roledescription="carousel" aria-label="Customer testimonials">
              <div className="review-track">
                {reviews.map((rev, idx) => (
                  <blockquote
                    key={idx}
                    className={`review-slide ${idx === reviewIndex ? 'is-active' : ''}`}
                  >
                    <span className="quote-mark">“</span>
                    <p>{rev.quote}</p>
                    <footer>
                      <span className="review-avatar">{rev.avatar}</span>
                      <span>
                        <b>{rev.name}</b>
                        <small>{rev.role}</small>
                      </span>
                      <span className="review-stars" aria-label="5 out of 5 stars">
                        ★★★★★
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>

              <div className="review-controls">
                <span className="review-dots" aria-label="Choose testimonial">
                  {reviews.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={dotIdx === reviewIndex ? 'is-active' : ''}
                      aria-label={`Show testimonial ${dotIdx + 1}`}
                      onClick={() => setReviewIndex(dotIdx)}
                    />
                  ))}
                </span>
                <div>
                  <button
                    className="review-prev"
                    aria-label="Previous testimonial"
                    onClick={() => setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                  >
                    ←
                  </button>
                  <button
                    className="review-next"
                    aria-label="Next testimonial"
                    onClick={() => setReviewIndex((prev) => (prev + 1) % reviews.length)}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--ink)' }}>Join Families Who Trust Us With Every Mile</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Read genuine customer stories and discover why 98% of first-time drivers become regulars.</p>
              <button onClick={(e) => navigateTo('appointment', e)} className="button button-gold" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Book Your Visit Today &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* FAQ VIEW */}
      {currentView === 'faq' && (
        <>
        <section className="faq-section section" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro">
              <h2>
                A few things<br />you might <em>wonder.</em>
              </h2>
              <p>Still have a question? We’re always happy to help.</p>
              <a className="text-link" href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                Get in touch <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="faq-list">
              <details>
                <summary>
                  Do I need an appointment?
                  <span></span>
                </summary>
                <p>
                  An appointment helps us plan for your visit and give your vehicle the attention it deserves. Use the form above to request a time.
                </p>
              </details>
              <details>
                <summary>
                  Will you explain repairs before starting?
                  <span></span>
                </summary>
                <p>
                  Always. We’ll share what we find, answer your questions and discuss the recommended work before moving forward.
                </p>
              </details>
              <details>
                <summary>
                  Can I bring in a vehicle if I’m not sure what’s wrong?
                  <span></span>
                </summary>
                <p>
                  Absolutely. Tell us what you’ve noticed, and our technicians can inspect the vehicle and help identify next steps.
                </p>
              </details>
              <details>
                <summary>
                  What kinds of vehicles do you service?
                  <span></span>
                </summary>
                <p>
                  Veltrix Hub provides turn-key digital templates for local auto repair shops, European vehicle specialists, tire shops, and performance garages.
                </p>
              </details>
              <details>
                <summary>
                  Is this a real repair shop?
                  <span></span>
                </summary>
                <p>
                  No. This is an interactive demo template built by Veltrix Hub to showcase how our client websites function and convert visitors into appointments.
                </p>
              </details>
            </div>
          </div>
        </section>
        </>
      )}

      {/* FAQ VIEW */}
      {currentView === 'faq' && (
        <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--ink)' }}>Still Have Questions About Your Vehicle?</h2>
            <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Call our service desk or message us on WhatsApp for transparent answers and quick estimates.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+2348087098270" className="button button-gold" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem', textDecoration: 'none' }}>
                Call Direct: +234 808 709 8270
              </a>
              <button onClick={(e) => navigateTo('appointment', e)} className="button button--outline" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Book an Appointment &rarr;
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT / APPOINTMENT / CONSULTATION VIEW */}
      {(currentView === 'contact' || currentView === 'appointment' || currentView === 'consultation') && (
        <>
        {renderContactSection()}
        </>
      )}

      </main>

      {/* Site Footer - Styled after /painting */}
      <footer className="site-footer" id="contact" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            {/* Col 1: Brand Info */}
            <div className="footer-col">
              <div className="site-logo" style={{ marginBottom: "1.25rem" }}>
                <div className="logo-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div>
                  <span className="logo-text" style={{ color: "#ffffff" }}>VELTRIX HUB</span>
                  <span className="logo-tagline" style={{ color: "#e55035" }}>Auto Repair & Care</span>
                </div>
              </div>
              <p style={{ fontSize: "0.9375rem", marginBottom: "1.5rem", lineHeight: "1.65", color: "#94A3B8" }}>
                Full-service auto repair shop delivering honest digital inspections, precision diagnostics, and manufacturer-certified maintenance for all makes and models.
              </p>
              <div style={{ fontSize: "0.8125rem", color: "#64748B" }}>
                ASE Certified • 24-Month / 24,000-Mile Warranty • Modern Diagnostics
              </div>
            </div>

            {/* Col 2: Services Directory */}
            <div className="footer-col">
              <h4>Our Services</h4>
              <div className="footer-links">
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">Computer Diagnostics</a>
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">Brake Repair & Replacement</a>
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">Engine & Transmission Care</a>
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">Oil, Lube & Filter Service</a>
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">Suspension & Steering</a>
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">A/C & Climate Systems</a>
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">Tire Service & Alignment</a>
              </div>
            </div>

            {/* Col 3: Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <div className="footer-links">
                <a href="#home" onClick={(e) => navigateTo('home', e)} className="footer-link">Home</a>
                <a href="#services" onClick={(e) => navigateTo('services', e)} className="footer-link">All Services</a>
                <a href="#about" onClick={(e) => navigateTo('about', e)} className="footer-link">Our Story</a>
                <a href="#difference" onClick={(e) => navigateTo('difference', e)} className="footer-link">Why Veltrix Hub</a>
                <a href="#reviews" onClick={(e) => navigateTo('reviews', e)} className="footer-link">Customer Reviews</a>
                <a href="#faq" onClick={(e) => navigateTo('faq', e)} className="footer-link">FAQs</a>
                <a href="#contact" onClick={(e) => navigateTo('contact', e)} className="footer-link">Contact & Directions</a>
              </div>
            </div>

            {/* Col 4: Direct Contact & Social Links */}
            <div className="footer-col">
              <h4>Direct Contact</h4>
              <div className="footer-contact-info">
                <div className="footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "#64748B" }}>WhatsApp / Phone</span>
                    <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer" style={{ color: "#ffffff", fontWeight: "600" }}>+234 808 709 8270</a>
                  </div>
                </div>

                <div className="footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "#64748B" }}>Email Inquiry</span>
                    <a href="mailto:info@veltrixhub.ng" style={{ color: "#ffffff", fontWeight: "600" }}>info@veltrixhub.ng</a>
                  </div>
                </div>

                <div className="footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "#64748B" }}>Workshop Location</span>
                    <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.9375rem" }}>Lagos, Nigeria & Surrounding</span>
                  </div>
                </div>

                <div className="footer-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", color: "#64748B" }}>Operating Hours</span>
                    <span style={{ color: "#CBD5E1", fontSize: "0.875rem" }}>Mon - Fri: 7:30 AM – 6:00 PM | Sat: 8:00 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
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

          <div className="footer-bottom">
            <div>
              © 2026 Veltrix Hub Auto Repair. All rights reserved.
            </div>
            <div>
              Demonstration Website • Powered by Veltrix Hub
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

