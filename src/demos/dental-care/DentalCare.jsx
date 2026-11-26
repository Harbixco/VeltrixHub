import React, { useState, useEffect } from 'react';
import DemoTopBar from '../DemoTopBar';
import './dental-care.css';

export default function DentalCare() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = (window.location.hash || '').replace('#', '').toLowerCase();
      if (["services","about","technology","reviews","contact"].includes(hash)) return hash;
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
      if (["services","about","technology","reviews","contact"].includes(hash)) {
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

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (idx) => setOpenFaq((prev) => (prev === idx ? null : idx));

  const dentalReviews = [
    {
      quote: "I've always had dental anxiety, but everyone at Apex made me feel so comfortable. I actually look forward to my cleanings now.",
      author: "Sarah M.",
      role: "Patient since 2022",
      avatar: "SM",
      avatarClass: ""
    },
    {
      quote: "My new smile looks so natural. The whole process was thoughtfully explained, and the team was wonderful from day one.",
      author: "David K.",
      role: "Patient since 2023",
      avatar: "DK",
      avatarClass: "avatar-sage"
    },
    {
      quote: "They fit me in the same day when I had an emergency. Kind, professional, and genuinely caring—exactly what you hope for.",
      author: "Jessica R.",
      role: "Patient since 2021",
      avatar: "JR",
      avatarClass: "avatar-blue"
    },
    {
      quote: "Gentle cleanings, transparent treatment plans, and modern equipment. Truly the best dental experience our family has had.",
      author: "Michael T.",
      role: "Patient since 2020",
      avatar: "MT",
      avatarClass: ""
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % dentalReviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [dentalReviews.length]);

  const dentalFaqs = [
    {
      q: "Do you accept new patients and handle same-day dental emergencies?",
      a: "Yes, we are always welcoming new patients of all ages. We keep daily reserved appointment slots specifically for dental emergencies such as chipped or broken teeth, acute toothache, lost fillings, and swollen gums. Contact us immediately or send a WhatsApp message for same-day emergency relief."
    },
    {
      q: "What should I expect during my first dental examination and cleaning?",
      a: "Your first appointment takes about 60 minutes. We conduct a gentle comprehensive oral exam, low-radiation 3D digital imaging, periodontal gum health screening, and a preventative ultrasonic cleaning. Our dentists discuss any findings with you openly and answer all questions before proposing any treatment plan."
    },
    {
      q: "I experience dental anxiety. What comfort and sedation options do you offer?",
      a: "Our clinic is specifically designed to eliminate dental fear. We offer warm aromatherapy, noise-cancelling headphones, gentle warm blankets, and painless micro-anesthesia. For patients needing additional relaxation, we provide nitrous oxide (laughing gas) and mild oral conscious sedation."
    },
    {
      q: "Which dental insurance plans do you accept, and do you have payment options?",
      a: "We work with all major PPO dental insurances and file all paperwork directly on your behalf to maximize your benefits. For patients without insurance, we offer an affordable in-house Dental Wellness Plan and flexible monthly financing with 0% interest through CareCredit."
    },
    {
      q: "How often should I have my teeth checked and cleaned?",
      a: "The American Dental Association recommends a checkup and professional cleaning at least twice a year (every 6 months) for most healthy individuals. Patients with a history of periodontal disease, heavy plaque formation, or diabetes may benefit from visits every 3 to 4 months."
    },
    {
      q: "How does professional teeth whitening compare to over-the-counter kits?",
      a: "Professional in-office whitening delivers dramatic results—often 4 to 8 shades brighter in a single 60-minute visit—using concentrated, enamel-safe bleaching gel activated by clinical LED light, protected by custom gum barriers to prevent sensitivity. We also provide customized take-home trays with medical-grade gel."
    }
  ];

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="dental-care-demo" id="home">
      {/* ── TOP DEMO BAR WITH RETURN BUTTON ── */}
      <DemoTopBar demoName="Apex Dental Care" />

      {/* Demo Notice Banner */}
      <div className="demo-banner" role="note">
        <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
        <span><strong>DEMO WEBSITE</strong> — Sample healthcare website template created by Veltrix Hub.</span>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="nav-container">
          <a className="brand" href="#home" onClick={(e) => navigateTo('home', e)}>
            <span className="brand-mark" aria-hidden="true">
              <i className="fa-solid fa-tooth"></i>
            </span>
            <span className="brand-name">
              apex<span> dental care</span>
            </span>
          </a>

          <button
            className={`menu-toggle mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} aria-hidden="true"></div>
          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-title">Dental Care Menu</span>
              <button type="button" className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation menu">
                &times;
              </button>
            </div>
            <a href="#home" onClick={(e) => { setMobileMenuOpen(false); navigateTo('home', e); }}>Home</a>
            <a href="#about" onClick={(e) => { setMobileMenuOpen(false); navigateTo('about', e); }}>About Us</a>
            <a href="#services" onClick={(e) => { setMobileMenuOpen(false); navigateTo('services', e); }}>Services</a>
            <a href="#technology" onClick={(e) => { setMobileMenuOpen(false); navigateTo('technology', e); }}>Technology</a>
            <a href="#faq" onClick={(e) => { setMobileMenuOpen(false); navigateTo('faq', e); }}>FAQ</a>
            <a href="#contact" onClick={(e) => { setMobileMenuOpen(false); navigateTo('contact', e); }}>Contact</a>
            <a className="button button-small nav-cta glowing-btn" href="#contact" onClick={(e) => { setMobileMenuOpen(false); navigateTo('contact', e); }}>
              Book an Appointment <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
          </nav>
        </div>
      </header>

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
              {currentView === 'services' && 'Family & Cosmetic Dental Services'}
              {currentView === 'about' && 'About Our Practice & Team'}
              {(currentView === 'why-us' || currentView === 'difference' || currentView === 'technology') && 'Why Patients Choose Veltrix Hub Dental'}
              {(currentView === 'projects' || currentView === 'gallery' || currentView === 'results') && 'Smile Transformations & Practice Tour'}
              {(currentView === 'reviews' || currentView === 'testimonials') && 'Patient Stories & Dental Reviews'}
              {currentView === 'faq' && 'Frequently Asked Questions'}
              {(currentView === 'contact' || currentView === 'appointment' || currentView === 'consultation') && 'Book Your Dental Appointment'}
            </h1>
            </div>
        </section>
      )}

      {/* HOMEPAGE VIEW: High-converting, clean customer essentials */}
      {currentView === 'home' && (
        <>
        <section className="hero section-wrap" id="home">
          <div className="hero-content">
            <h1>
              Your Comfort,<br />Our <span>Priority.</span>
            </h1>
            <p className="hero-location">Modern Family &amp; Cosmetic Dentistry</p>

            {/* Mobile Hero Photo Frame */}
            <div className="mobile-hero-image" style={{ margin: '1.25rem 0 1.5rem', borderRadius: '16px', overflow: 'hidden', height: '240px', boxShadow: '0 12px 30px rgba(11,25,44,0.12)', border: '2px solid rgba(255,255,255,0.8)' }}>
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=85"
                alt="Bright, welcoming modern dental clinic"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <p className="hero-copy">
              Experience gentle, modern family and cosmetic dental care tailored for your comfort, from routine cleanings to advanced smile transformations.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="button" onClick={(e) => scrollTo(e, 'contact')}>
                Schedule Your Visit <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a href="#services" className="button button-outline" onClick={(e) => scrollTo(e, 'services')}>
                Explore Services
              </a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" alt="" />
              </div>
              <div>
                <strong>Good care. Great smiles.</strong>
                <span>Trusted by hundreds of local families</span>
              </div>
              <div className="proof-rating">
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <strong>5.0</strong>
                <span>Google rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame floating-anim">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85"
                alt="Bright, welcoming modern dental clinic"
              />
            </div>
            <div className="image-note">
              <span className="note-icon">
                <i className="fa-solid fa-heart" aria-hidden="true"></i>
              </span>
              <span>
                <strong>Care that feels different</strong>
                <small>Thoughtful from hello to follow-up</small>
              </span>
            </div>
            <div className="hero-image-index" aria-hidden="true">
              01 <span></span> 03
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="services section-wrap section-tint" id="services">
          <div className="section-heading reveal" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem', background: '#ffffff', padding: '1.75rem 1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(11,25,44,0.04)', marginBottom: '2rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: '#e0f2fe', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <i className="fa-solid fa-tooth"></i> Comprehensive Clinical Dentistry
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
              Expert Care, <span style={{ color: '#0ea5e9' }}>Made Personal.</span>
            </h2>
            <p style={{ fontSize: '0.975rem', color: '#64748b', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
              Whether it’s your routine preventive cleaning or an advanced cosmetic smile transformation, we design every treatment around your comfort, schedule, and peace of mind.
            </p>
          </div>

          <div className="services-grid">
            {[
              {
                id: '01',
                title: 'Preventive Care & Cleanings',
                desc: 'Thoughtful checkups, gentle cleanings, and digital X-rays to keep your smile feeling its best.',
                icon: 'fa-tooth',
                image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '02',
                title: 'Cosmetic Dentistry',
                desc: 'Professional whitening, custom veneers, and smile makeovers designed around you.',
                icon: 'fa-wand-magic-sparkles',
                image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '03',
                title: 'Implants & Restorations',
                desc: 'Beautifully natural-looking solutions that restore your confidence and comfort.',
                icon: 'fa-shield-heart',
                image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '04',
                title: 'Orthodontics & Aligners',
                desc: 'Subtle, comfortable clear aligners that fit your life while straightening your smile.',
                icon: 'fa-face-smile',
                image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '05',
                title: 'Emergency Dental Care',
                desc: 'When the unexpected happens, our team is here with prompt, compassionate care.',
                icon: 'fa-kit-medical',
                image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=720&q=80',
              },
            ].map((srv) => (
              <article key={srv.id} className="service-card reveal">
                <div className="service-photo">
                  <img src={srv.image} alt={srv.title} loading="lazy" />
                  <span className="service-number">{srv.id}</span>
                </div>
                <div className="service-body">
                  <div className="service-icon">
                    <i className={`fa-solid ${srv.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      setSelectedService(srv.title);
                      scrollTo(e, 'contact');
                    }}
                  >
                    Learn more <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── TECHNOLOGY ── */}
        <section className="reviews-section section-tint" id="reviews">
          <div className="section-wrap">
            <div className="section-heading reviews-heading reveal">
              <div>
                <h2>Smiles say it best.</h2>
              </div>
              <div className="reviews-rating">
                <span className="rating-stars" aria-label="5 out of 5 stars">★★★★★</span>
                <strong>5.0</strong>
                <small>Patient-rated care</small>
              </div>
            </div>

            <div className="dental-reviews-slider-wrap">
              <div className="dental-reviews-slider">
                {dentalReviews.map((rev, idx) => (
                  <article
                    key={idx}
                    className={`dental-review-slide ${idx === reviewIndex ? 'is-active' : ''}`}
                    aria-hidden={idx !== reviewIndex}
                  >
                    <div className="review-top">
                      <span className="rating-stars">★★★★★</span>
                      <i className="fa-brands fa-google" aria-hidden="true"></i>
                    </div>
                    <blockquote>“{rev.quote}”</blockquote>
                    <div className="reviewer">
                      <span className={`reviewer-avatar ${rev.avatarClass || ''}`}>{rev.avatar}</span>
                      <div>
                        <strong>{rev.author}</strong>
                        <small>{rev.role}</small>
                      </div>
                      <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    </div>
                  </article>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="dental-slider-controls">
                <div className="dental-slider-dots">
                  {dentalReviews.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      className={`dental-slider-dot ${dotIdx === reviewIndex ? 'is-active' : ''}`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      onClick={() => setReviewIndex(dotIdx)}
                    />
                  ))}
                </div>
                <div className="dental-slider-arrows">
                  <button
                    type="button"
                    className="dental-slider-arrow"
                    aria-label="Previous review"
                    onClick={() => setReviewIndex((prev) => (prev - 1 + dentalReviews.length) % dentalReviews.length)}
                  >
                    <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    className="dental-slider-arrow"
                    aria-label="Next review"
                    onClick={() => setReviewIndex((prev) => (prev + 1) % dentalReviews.length)}
                  >
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT / BOOKING ── */}
        <section className="contact-section section-wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-info">
              <h2>Let’s make room for a brighter smile.</h2>
              <p>Tell us a little about what you need. Our friendly team will be in touch to find a time that works for you.</p>
              <p className="contact-phone">
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>{' '}
                <a
                  href="https://wa.me/2348087098270"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  +234 808 709 8270
                </a>
              </p>
              <div className="office-details">
                <p>
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  <span>240 Medical Plaza, Suite 300, Metro Health District</span>
                </p>
                <p>
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  <span>Monday–Friday, 8:00 am–5:00 pm<br />Saturday by appointment</span>
                </p>
                <p>
                  <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                  <span>info@veltrixhub.ng</span>
                </p>
              </div>
              <p className="emergency-note">
                <i className="fa-solid fa-heart-pulse" aria-hidden="true"></i> Dental emergency? Message us on WhatsApp for same-day care.
              </p>
            </div>

            <form id="bookingForm" className="booking-form" onSubmit={handleBookingSubmit}>
              <div className="form-heading">
                <h3>Request an appointment</h3>
                <p>Share a few details and we’ll be in touch soon.</p>
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Full Name <span>*</span></label>
                <input type="text" id="fullName" name="name" required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">WhatsApp / Phone Number <span>*</span></label>
                <input type="tel" id="phone" name="phone" required placeholder="Your WhatsApp or phone number" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address <span>*</span></label>
                <input type="email" id="email" name="email" required placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Needed <span>*</span></label>
                <select
                  id="service"
                  name="service"
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Select a service</option>
                  <option>Preventive Care & Cleanings</option>
                  <option>Cosmetic Dentistry</option>
                  <option>Implants & Restorations</option>
                  <option>Orthodontics & Aligners</option>
                  <option>Emergency Dental Care</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <button type="submit" className="button form-submit">
                Request my appointment <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </button>
              <p className="form-disclaimer">
                Demonstration appointment form. In live deployment, synced with your practice management software.
              </p>

              {formSubmitted && (
                <div className="success-message" role="status">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span><strong>Thank you!</strong> Your appointment request has been logged in this demonstration preview.</span>
                </div>
              )}
            </form>
          </div>
        </section>
        </>
      )}

      {/* SERVICES VIEW */}
      {currentView === 'services' && (
        <>
        <section className="services section-wrap section-tint" id="services">
          <div className="section-heading reveal">
            <div>
              <h2>Expert care, made personal.</h2>
            </div>
            <p>Whether it’s your twice-a-year visit or the smile you’ve been dreaming of, we make the next step feel simple.</p>
          </div>

          <div className="services-grid">
            {[
              {
                id: '01',
                title: 'Preventive Care & Cleanings',
                desc: 'Thoughtful checkups, gentle cleanings, and digital X-rays to keep your smile feeling its best.',
                icon: 'fa-tooth',
                image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '02',
                title: 'Cosmetic Dentistry',
                desc: 'Professional whitening, custom veneers, and smile makeovers designed around you.',
                icon: 'fa-wand-magic-sparkles',
                image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '03',
                title: 'Implants & Restorations',
                desc: 'Beautifully natural-looking solutions that restore your confidence and comfort.',
                icon: 'fa-shield-heart',
                image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '04',
                title: 'Orthodontics & Aligners',
                desc: 'Subtle, comfortable clear aligners that fit your life while straightening your smile.',
                icon: 'fa-face-smile',
                image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '05',
                title: 'Emergency Dental Care',
                desc: 'When the unexpected happens, our team is here with prompt, compassionate care.',
                icon: 'fa-kit-medical',
                image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=720&q=80',
              },
            ].map((srv) => (
              <article key={srv.id} className="service-card reveal">
                <div className="service-photo">
                  <img src={srv.image} alt={srv.title} loading="lazy" />
                  <span className="service-number">{srv.id}</span>
                </div>
                <div className="service-body">
                  <div className="service-icon">
                    <i className={`fa-solid ${srv.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      setSelectedService(srv.title);
                      scrollTo(e, 'contact');
                    }}
                  >
                    Learn more <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Services Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>Comprehensive Dental Care for the Whole Family</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>From routine preventive cleanings to complete cosmetic restorations, our gentle team prioritizes your comfort.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="button" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Book Your Visit &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* ABOUT / STORY VIEW */}
      {currentView === 'about' && (
        <>
        <section className="about-section section-wrap" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=85"
              alt="Dental care team welcoming a patient into a bright treatment room"
              loading="lazy"
            />
            <div className="about-image-caption">
              <i className="fa-solid fa-sparkles" aria-hidden="true"></i> A little more human. A lot more you.
            </div>
          </div>
          <div className="about-copy">
            <h2>Because going to the dentist should feel <em>good.</em></h2>
            <p>
              We believe great dentistry starts with listening. Our dedicated team pairs thoughtful, personal care with the latest technology—so every visit feels clear, calm, and entirely on your terms.
            </p>
            <a href="#technology" className="text-link" onClick={(e) => scrollTo(e, 'technology')}>
              Get to know our approach <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
            <div className="about-stat">
              <strong>01</strong>
              <span>One friendly team, here for every chapter of your smile.</span>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="technology-section section-wrap" id="technology">
          <div className="tech-image">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1100&q=85"
              alt="Advanced digital dental technology in a calm, modern treatment room"
              loading="lazy"
            />
            <div className="tech-image-label">
              <span className="pulse-dot"></span> Thoughtfully advanced
            </div>
          </div>
          <div className="tech-content">
            <h2>Modern technology.<br /><em>More peace of mind.</em></h2>
            <p>
              Innovative tools help us make your care more precise, more comfortable, and easier to understand at every step.
            </p>
            <div className="tech-features">
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-solid fa-cube" aria-hidden="true"></i></span>
                <div>
                  <h3>Digital 3D Scans</h3>
                  <p>Quick, comfortable digital impressions—no messy molds.</p>
                </div>
              </div>
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-solid fa-feather-pointed" aria-hidden="true"></i></span>
                <div>
                  <h3>Comfort-First Options</h3>
                  <p>Gentle techniques and personalized comfort options.</p>
                </div>
              </div>
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-solid fa-mug-hot" aria-hidden="true"></i></span>
                <div>
                  <h3>Little Luxuries</h3>
                  <p>Warm blankets, headphones, and a moment to settle in.</p>
                </div>
              </div>
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-regular fa-credit-card" aria-hidden="true"></i></span>
                <div>
                  <h3>Flexible Financing</h3>
                  <p>Clear estimates and flexible ways to plan your care.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>A Warm, Stress-Free Dental Experience</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Our modern practice features comforting amenities, low-radiation imaging, and friendly clinicians.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="button" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Schedule Your Appointment &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* WHY US VIEW */}
      {(currentView === 'why-us' || currentView === 'difference' || currentView === 'technology') && (
        <>
        <section className="technology-section section-wrap" id="technology">
          <div className="tech-image">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1100&q=85"
              alt="Advanced digital dental technology in a calm, modern treatment room"
              loading="lazy"
            />
            <div className="tech-image-label">
              <span className="pulse-dot"></span> Thoughtfully advanced
            </div>
          </div>
          <div className="tech-content">
            <h2>Modern technology.<br /><em>More peace of mind.</em></h2>
            <p>
              Innovative tools help us make your care more precise, more comfortable, and easier to understand at every step.
            </p>
            <div className="tech-features">
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-solid fa-cube" aria-hidden="true"></i></span>
                <div>
                  <h3>Digital 3D Scans</h3>
                  <p>Quick, comfortable digital impressions—no messy molds.</p>
                </div>
              </div>
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-solid fa-feather-pointed" aria-hidden="true"></i></span>
                <div>
                  <h3>Comfort-First Options</h3>
                  <p>Gentle techniques and personalized comfort options.</p>
                </div>
              </div>
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-solid fa-mug-hot" aria-hidden="true"></i></span>
                <div>
                  <h3>Little Luxuries</h3>
                  <p>Warm blankets, headphones, and a moment to settle in.</p>
                </div>
              </div>
              <div className="tech-feature-item">
                <span className="feature-icon"><i className="fa-regular fa-credit-card" aria-hidden="true"></i></span>
                <div>
                  <h3>Flexible Financing</h3>
                  <p>Clear estimates and flexible ways to plan your care.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>Thoughtful Technology Tailored for Comfort</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Mess-free 3D digital impressions, single-visit restorations, and clear upfront treatment plans.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="button" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Reserve Your Visit &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* PROJECTS / PORTFOLIO VIEW */}
      {(currentView === 'projects' || currentView === 'gallery' || currentView === 'results') && (
        <>
        <section className="services section-wrap section-tint" id="services">
          <div className="section-heading reveal">
            <div>
              <h2>Expert care, made personal.</h2>
            </div>
            <p>Whether it’s your twice-a-year visit or the smile you’ve been dreaming of, we make the next step feel simple.</p>
          </div>

          <div className="services-grid">
            {[
              {
                id: '01',
                title: 'Preventive Care & Cleanings',
                desc: 'Thoughtful checkups, gentle cleanings, and digital X-rays to keep your smile feeling its best.',
                icon: 'fa-tooth',
                image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '02',
                title: 'Cosmetic Dentistry',
                desc: 'Professional whitening, custom veneers, and smile makeovers designed around you.',
                icon: 'fa-wand-magic-sparkles',
                image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '03',
                title: 'Implants & Restorations',
                desc: 'Beautifully natural-looking solutions that restore your confidence and comfort.',
                icon: 'fa-shield-heart',
                image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '04',
                title: 'Orthodontics & Aligners',
                desc: 'Subtle, comfortable clear aligners that fit your life while straightening your smile.',
                icon: 'fa-face-smile',
                image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=720&q=80',
              },
              {
                id: '05',
                title: 'Emergency Dental Care',
                desc: 'When the unexpected happens, our team is here with prompt, compassionate care.',
                icon: 'fa-kit-medical',
                image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=720&q=80',
              },
            ].map((srv) => (
              <article key={srv.id} className="service-card reveal">
                <div className="service-photo">
                  <img src={srv.image} alt={srv.title} loading="lazy" />
                  <span className="service-number">{srv.id}</span>
                </div>
                <div className="service-body">
                  <div className="service-icon">
                    <i className={`fa-solid ${srv.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      setSelectedService(srv.title);
                      scrollTo(e, 'contact');
                    }}
                  >
                    Learn more <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Gallery Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>Ready for a Healthier, More Confident Smile?</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Explore custom teeth whitening, clear aligners, and aesthetic restorations tailored just for you.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="button" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Schedule a Consultation &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* REVIEWS / TESTIMONIALS VIEW */}
      {(currentView === 'reviews' || currentView === 'testimonials') && (
        <>
        <section className="reviews-section section-tint" id="reviews">
          <div className="section-wrap">
            <div className="section-heading reviews-heading reveal">
              <div>
                <h2>Smiles say it best.</h2>
              </div>
              <div className="reviews-rating">
                <span className="rating-stars" aria-label="5 out of 5 stars">★★★★★</span>
                <strong>5.0</strong>
                <small>Patient-rated care</small>
              </div>
            </div>
            <div className="reviews-grid">
              <article className="review-card reveal">
                <div className="review-top">
                  <span className="rating-stars">★★★★★</span>
                  <i className="fa-brands fa-google" aria-hidden="true"></i>
                </div>
                <blockquote>“I’ve always had dental anxiety, but everyone at Apex made me feel so comfortable. I actually look forward to my cleanings now.”</blockquote>
                <div className="reviewer">
                  <span className="reviewer-avatar">SM</span>
                  <div><strong>Sarah M.</strong><small>Patient since 2022</small></div>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
              </article>

              <article className="review-card reveal">
                <div className="review-top">
                  <span className="rating-stars">★★★★★</span>
                  <i className="fa-brands fa-google" aria-hidden="true"></i>
                </div>
                <blockquote>“My new smile looks so natural. The whole process was thoughtfully explained, and the team was wonderful from day one.”</blockquote>
                <div className="reviewer">
                  <span className="reviewer-avatar avatar-sage">DK</span>
                  <div><strong>David K.</strong><small>Patient since 2023</small></div>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
              </article>

              <article className="review-card reveal">
                <div className="review-top">
                  <span className="rating-stars">★★★★★</span>
                  <i className="fa-brands fa-google" aria-hidden="true"></i>
                </div>
                <blockquote>“They fit me in the same day when I had an emergency. Kind, professional, and genuinely caring—exactly what you hope for.”</blockquote>
                <div className="reviewer">
                  <span className="reviewer-avatar avatar-blue">JR</span>
                  <div><strong>Jessica R.</strong><small>Patient since 2021</small></div>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Reviews Bottom CTA */}
          <section className="section-padding text-center" style={{ backgroundColor: '#f8fafc', padding: '3.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>Join Happy Patients Across Our Community</h2>
              <p style={{ margin: '0 0 1.75rem', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>Read why families trust us for routine hygiene, preventive dental wellness, and restorative care.</p>
              <button onClick={(e) => navigateTo('contact', e)} className="button" style={{ padding: '0.85rem 2.25rem', fontSize: '0.95rem' }}>
                Book Your Visit Today &rarr;
              </button>
            </div>
          </section>
        </>
      )}

      {/* FAQ VIEW */}
      {currentView === 'faq' && (
        <>
          <section className="dental-faq-view section-wrap" style={{ padding: '3.5rem 1.5rem 4.5rem', maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: '#e0f2fe', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                <i className="fa-solid fa-circle-question"></i> Help & Patient Guidance
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
                Frequently Asked <span style={{ color: '#0ea5e9' }}>Questions</span>
              </h2>
              <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, margin: 0, maxWidth: '600px', marginInline: 'auto' }}>
                Clear answers to common questions about dental visits, treatments, insurance coverage, comfort options, and emergency care.
              </p>
            </div>

            <div className="dental-faq-list">
              {dentalFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`dental-faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="dental-faq-trigger"
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(idx)}
                    >
                      <span className="dental-faq-question">{faq.q}</span>
                      <span className="dental-faq-icon">
                        <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true"></i>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="dental-faq-content">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick WhatsApp / Consultation Support Card */}
            <div className="dental-faq-cta-box" style={{ marginTop: '3rem', padding: '2.25rem 2rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem', boxShadow: '0 10px 30px rgba(15,23,42,0.12)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0ea5e9', display: 'grid', placeItems: 'center', fontSize: '1.25rem', color: '#ffffff' }}>
                <i className="fa-solid fa-comments"></i>
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>Still have questions or need emergency dental care?</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem', maxWidth: '540px', lineHeight: 1.6 }}>
                  Our team is ready to assist you directly with scheduling, insurance verification, treatment estimates, and same-day emergency triage.
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <a
                  href="https://wa.me/2348087098270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                  style={{ background: '#25D366', color: '#ffffff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.75rem', fontWeight: 700, borderRadius: '8px' }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={(e) => navigateTo('contact', e)}
                  className="button"
                  style={{ background: '#ffffff', color: '#0f172a', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.75rem', fontWeight: 700, borderRadius: '8px' }}
                >
                  Request Appointment <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* CONTACT / APPOINTMENT / CONSULTATION VIEW */}
      {(currentView === 'contact' || currentView === 'appointment' || currentView === 'consultation') && (
        <>
        <section className="contact-section section-wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-info">
              <h2>Let’s make room for a brighter smile.</h2>
              <p>Tell us a little about what you need. Our friendly team will be in touch to find a time that works for you.</p>
              <p className="contact-phone">
                <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>{' '}
                <a
                  href="https://wa.me/2348087098270"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  +234 808 709 8270
                </a>
              </p>
              <div className="office-details">
                <p>
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  <span>240 Medical Plaza, Suite 300, Metro Health District</span>
                </p>
                <p>
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  <span>Monday–Friday, 8:00 am–5:00 pm<br />Saturday by appointment</span>
                </p>
                <p>
                  <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                  <span>info@veltrixhub.ng</span>
                </p>
              </div>
              <p className="emergency-note">
                <i className="fa-solid fa-heart-pulse" aria-hidden="true"></i> Dental emergency? Message us on WhatsApp for same-day care.
              </p>
            </div>

            <form id="bookingForm" className="booking-form" onSubmit={handleBookingSubmit}>
              <div className="form-heading">
                <h3>Request an appointment</h3>
                <p>Share a few details and we’ll be in touch soon.</p>
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Full Name <span>*</span></label>
                <input type="text" id="fullName" name="name" required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">WhatsApp / Phone Number <span>*</span></label>
                <input type="tel" id="phone" name="phone" required placeholder="Your WhatsApp or phone number" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address <span>*</span></label>
                <input type="email" id="email" name="email" required placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Needed <span>*</span></label>
                <select
                  id="service"
                  name="service"
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Select a service</option>
                  <option>Preventive Care & Cleanings</option>
                  <option>Cosmetic Dentistry</option>
                  <option>Implants & Restorations</option>
                  <option>Orthodontics & Aligners</option>
                  <option>Emergency Dental Care</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <button type="submit" className="button form-submit">
                Request my appointment <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </button>
              <p className="form-disclaimer">
                Demonstration appointment form. In live deployment, synced with your practice management software.
              </p>

              {formSubmitted && (
                <div className="success-message" role="status">
                  <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                  <span><strong>Thank you!</strong> Your appointment request has been logged in this demonstration preview.</span>
                </div>
              )}
            </form>
          </div>
        </section>
        </>
      )}

      </main>

            <footer className="site-footer">
        <div className="footer-content section-wrap">
          <div className="footer-brand">
            <a className="brand brand-light" href="#home" onClick={(e) => navigateTo('home', e)}>
              <span className="brand-mark" aria-hidden="true">
                <i className="fa-solid fa-tooth"></i>
              </span>
              <span className="brand-name">
                apex<span> dental care</span>
              </span>
            </a>
            <p>Thoughtful, modern dentistry for the way you want to feel.</p>
          </div>
          <div className="footer-col">
            <h2>Explore</h2>
            <a href="#about" onClick={(e) => navigateTo('about', e)}>About us</a>
            <a href="#services" onClick={(e) => navigateTo('services', e)}>Our services</a>
            <a href="#technology" onClick={(e) => navigateTo('technology', e)}>Our approach</a>
            <a href="#faq" onClick={(e) => navigateTo('faq', e)}>FAQ</a>
          </div>
          <div className="footer-col">
            <h2>Visit us</h2>
            <p>240 Medical Plaza, Suite 300<br />Metro Health District</p>
            <p>Mon–Fri, 8:00 am–5:00 pm</p>
            <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer">
              +234 808 709 8270
            </a>
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
          <div className="footer-emergency">
            <span className="footer-emergency-icon">
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
            </span>
            <h2>Here when you need us.</h2>
            <p>For urgent dental concerns, message our office on WhatsApp for same-day emergency care.</p>
            <a
              href="https://wa.me/2348087098270"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-demo-number"
              style={{ textDecoration: 'none' }}
            >
              +234 808 709 8270
            </a>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <p>© 2026 Apex Dental Care <span>•</span> Veltrix Hub Demo Template</p>
          <a href="#home" onClick={(e) => navigateTo('home', e)}>
            Back to top <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

