import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeCanvas from './components/ThreeCanvas';
import { projects, projectCategories } from './data/projects';
import { teamMembers } from './data/team';
import { 
  ArrowRight, 
  ArrowUp,
  ExternalLink, 
  Github, 
  Linkedin, 
  Sparkles, 
  Send, 
  Layers, 
  Code2, 
  Rocket, 
  X, 
  ShieldCheck, 
  Monitor, 
  Cpu, 
  Palette, 
  MessageSquare, 
  CheckCircle2, 
  Terminal, 
  Compass, 
  Sun, 
  Moon,
  Workflow,
  Clock
} from 'lucide-react';

export default function App() {
  // Dual-Theme State with Local Persistence and System Preference Detection
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('to-inspire-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  // Navigation & UI States
  const [activeNav, setActiveNav] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal & Toast States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('Web Architecture');
  const [showToast, setShowToast] = useState(false);

  // Dynamic Cursor Light Spotlight Handler
  const handleCtaMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--cta-mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--cta-mouse-y', `${y}px`);
  };

  // Projects Filter State
  const [selectedCategory, setSelectedCategory] = useState('All Work');

  // Team Active Index for Mobile Carousel
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  // Refs for animations
  const heroContentRef = useRef(null);

  // Sync theme to document element and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('to-inspire-theme', theme);
  }, [theme]);

  // Toggle Theme Handler
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open on small screens
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-locked');
    } else {
      document.body.classList.remove('mobile-menu-locked');
    }
    return () => document.body.classList.remove('mobile-menu-locked');
  }, [mobileMenuOpen]);

  // Scroll detection for sticky navbar & active section indicator
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'services', 'work', 'about', 'team', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim-item', 
        { y: 28, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.0, 
          stagger: 0.12, 
          ease: 'power3.out',
          delay: 0.15
        }
      );
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  // Team carousel navigation
  const handleTeamNav = (dir) => {
    setActiveTeamIndex(prev => (dir === 'next' ? (prev === 0 ? 1 : 0) : (prev === 1 ? 0 : 1)));
  };

  // Contact form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All Work'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="app-root">
      {/* Interactive 3D WebGL Canvas Layer (Reacts to Dual Themes) */}
      <ThreeCanvas theme={theme} />

      {/* Atmospheric Background Mesh Glows */}
      <div className="ambient-mesh-layer" aria-hidden="true">
        <div className="glow-sphere glow-1"></div>
        <div className="glow-sphere glow-2"></div>
        <div className="glow-sphere glow-3"></div>
      </div>

      {/* STICKY FLOATING HEADER & NAVBAR */}
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          {/* Authentic Brand Lockup with Real Master Logo Asset */}
          <a href="#home" className="brand-logo" aria-label="True Inspire Home">
            <div className="brand-logo-frame">
              <img 
                src="/assets/true_inspire.jpeg" 
                alt="True Inspire Logo" 
                className="brand-logo-img" 
              />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">TRUE INSPIRE</span>
              <span className="brand-sanskrit">यथा कल्पना तथा रचना</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a 
              href="#home" 
              className={`nav-link ${activeNav === 'home' ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Overview
            </a>
            <a 
              href="#services" 
              className={`nav-link ${activeNav === 'services' ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Capabilities
            </a>
            <a 
              href="#work" 
              className={`nav-link ${activeNav === 'work' ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </a>
            <a 
              href="#about" 
              className={`nav-link ${activeNav === 'about' ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Creed
            </a>
            <a 
              href="#team" 
              className={`nav-link ${activeNav === 'team' ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Founders
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>

            {/* Mobile Drawer Action Button */}
            <div className="mobile-drawer-cta">
              <button 
                className="btn btn-brand w-full" 
                onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }}
              >
                <span>Get in Touch</span>
                <ArrowRight className="icon-arrow" size={15} />
              </button>
            </div>
          </nav>

          {/* Nav Actions: Theme Toggle & CTA */}
          <div className="nav-actions">
            {/* Tactile Dual-Theme Switcher Button */}
            <button 
              className="theme-switch-btn" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={15} className="switch-icon-active" />
                  <span className="switch-label">Light</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="switch-icon-active" />
                  <span className="switch-label">Dark</span>
                </>
              )}
            </button>

            <button 
              className="btn btn-brand nav-cta desktop-only-cta" 
              onClick={() => setIsModalOpen(true)}
            >
              <span>Get in Touch</span>
              <ArrowRight className="icon-arrow" size={15} />
            </button>

            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-backdrop" 
          onClick={() => setMobileMenuOpen(false)} 
          aria-hidden="true"
        />
      )}

      <main className="main-content">
        {/* HERO SECTION */}
        <section className="hero-section" id="home" ref={heroContentRef}>
          <div className="hero-container">
            {/* Top Eyebrow Badge Pill */}
            <div className="hero-anim-item badge-pill hero-badge">
              <span className="badge-dot"></span>
              <span>Software Engineering &amp; Applied Systems</span>
              <span className="badge-divider">&bull;</span>
              <span>Odisha, India</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="hero-anim-item hero-title">
              Software Engineered with Deliberate Craft<br />
              <span className="text-gradient-gold">&amp; Architectural Rigor</span>
            </h1>

            {/* Creative Pitch Subtitle */}
            <p className="hero-anim-item hero-subtitle">
              An independent engineering collective translating bold imagination into resilient software—architecting high-performance web platforms, edge intelligence, and bespoke digital experiences.
            </p>

            {/* Action Group */}
            <div className="hero-anim-item hero-cta-group">
              <a href="#work" className="btn btn-brand">
                <span>Explore Our Work</span>
                <ArrowRight className="icon-arrow" size={16} />
              </a>
              <a href="#contact" className="btn btn-glass">
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: CAPABILITIES (#services) */}
        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-head-dual">
              <div>
                <div className="badge-pill">Capabilities</div>
                <h2 className="section-heading">
                  Technical Focus &amp;<br />
                  <span className="text-gradient-gold">Core Capabilities</span>
                </h2>
              </div>
              <p className="section-lead-paragraph">
                We design and build reliable software to solve operational challenges—from low-latency on-device computer vision to high-throughput financial analytics.
              </p>
            </div>

            <div className="services-grid">
              {/* Pillar 1 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Monitor size={22} />
                </div>
                <div className="service-meta">01 / WEB ARCHITECTURE</div>
                <h3 className="service-title">Full-Stack Web Applications</h3>
                <p className="service-text">
                  Responsive React and Next.js applications engineered with clean component hierarchies, relational database modeling, and performant state management.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Next.js &amp; Vite</span>
                  <span className="service-tag">TypeScript</span>
                  <span className="service-tag">PostgreSQL</span>
                  <span className="service-tag">Supabase</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Cpu size={22} />
                </div>
                <div className="service-meta">02 / VISION &amp; AI</div>
                <h3 className="service-title">Edge Computer Vision &amp; AI</h3>
                <p className="service-text">
                  On-device ONNX and OpenVINO inference pipelines for industrial safety compliance, video hazard triage, and low-latency real-time telemetry.
                </p>
                <div className="service-tags">
                  <span className="service-tag">YOLOv11s ONNX</span>
                  <span className="service-tag">OpenVINO</span>
                  <span className="service-tag">NestJS WS</span>
                  <span className="service-tag">Offline LAN</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Palette size={22} />
                </div>
                <div className="service-meta">03 / DIGITAL CRAFT</div>
                <h3 className="service-title">Interactive Digital Experiences</h3>
                <p className="service-text">
                  Bespoke art direction, accessible typography, and smooth Three.js WebGL interactions designed to run consistently across desktop and mobile devices.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Three.js WebGL</span>
                  <span className="service-tag">Dual Themes</span>
                  <span className="service-tag">WCAG 2.1 AA</span>
                  <span className="service-tag">Micro-Interactions</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Workflow size={22} />
                </div>
                <div className="service-meta">04 / RELIABILITY</div>
                <h3 className="service-title">Systems &amp; Platform Operations</h3>
                <p className="service-text">
                  Comprehensive performance profiling, event access validation systems, cloud deployments, and resilient codebases maintained for long-term stability.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Vercel &amp; Cloud</span>
                  <span className="service-tag">QR Verification</span>
                  <span className="service-tag">API Integration</span>
                  <span className="service-tag">Performance Tuning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SELECTED WORK / PORTFOLIO (#work) */}
        <section className="section projects-section" id="work">
          <div className="container">
            <div className="section-head-center">
              <div className="badge-pill">Selected Work</div>
              <h2 className="section-heading text-center">
                Engineering &amp; Digital Experiences<br />
                <span className="text-gradient-gold">Built Collaboratively</span>
              </h2>
              <p className="section-description text-center">
                Every platform below was designed, developed, and deployed through collaborative engineering by our team.
              </p>

              {/* Category Filter Tabs */}
              <div className="projects-filter-bar">
                {projectCategories.map((cat) => (
                  <button 
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map((proj) => (
                <div key={proj.id} className={`project-card glass-panel ${proj.isUpcoming ? 'project-card-upcoming' : ''}`}>
                  <div className="project-card-top">
                    <div className="project-category-row">
                      <span className="project-category-badge">{proj.category}</span>
                      <span className="project-collab-tag">{proj.collaboration}</span>
                    </div>

                    <h3 className="project-title">{proj.title}</h3>
                    <h4 className="project-subtitle">{proj.subtitle}</h4>
                    <p className="project-desc">{proj.description}</p>
                  </div>

                  <div className="project-card-bottom">
                    <div className="project-tags">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      {proj.isUpcoming ? (
                        /* Upcoming project - non-broken, honest status badge */
                        <div className="upcoming-status-badge">
                          <span className="status-dot-pulse"></span>
                          <span>In Active Development &bull; Coming Soon</span>
                        </div>
                      ) : proj.isDualDestination ? (
                        /* TEJAS 2026 - Discoverable Student & Faculty Invitation Links */
                        <div className="dual-destinations-group">
                          {proj.destinations.map((dest) => (
                            <a 
                              key={dest.label}
                              href={dest.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="project-btn primary"
                              title={`Open ${dest.label} (${dest.audience})`}
                            >
                              <span>{dest.label}</span>
                              <ExternalLink size={13} />
                            </a>
                          ))}
                        </div>
                      ) : (
                        /* Standard Verified Project Links */
                        <>
                          {proj.live && (
                            <a 
                              href={proj.live} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="project-btn primary"
                              title={`Visit ${proj.title} Live Application`}
                            >
                              <span>Launch App</span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {proj.github && (
                            <a 
                              href={proj.github} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="project-btn secondary"
                              title="Inspect Source Code Repository"
                            >
                              <Github size={14} />
                              <span>Source</span>
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CREED & PHILOSOPHY (#about) */}
        <section className="section about-section" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-narrative">
                <div className="badge-pill">Our Creed</div>
                <h2 className="section-heading">
                  Rooted in Conviction.<br />
                  <span className="text-gradient-gold">Driven by Craftsmanship.</span>
                </h2>
                
                <p className="about-lead">
                  True engineering is the deliberate practice of translating clear ideas into reliable, well-structured software that solves real problems and endures over time.
                </p>

                <div className="philosophy-points">
                  <div className="philosophy-item">
                    <div className="point-icon-box">
                      <Compass size={18} />
                    </div>
                    <div>
                      <h4 className="point-title">Grounded Craftsmanship</h4>
                      <p className="point-text">We build what creates real value—writing clean, maintainable software without inflating claims or assembling generic templates.</p>
                    </div>
                  </div>

                  <div className="philosophy-item">
                    <div className="point-icon-box">
                      <Terminal size={18} />
                    </div>
                    <div>
                      <h4 className="point-title">Architectural Rigor</h4>
                      <p className="point-text">Modular architectures, strict accessibility standards, and responsive performance tuned across desktop and mobile screens.</p>
                    </div>
                  </div>

                  <div className="philosophy-item">
                    <div className="point-icon-box">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="point-title">Collaborative Accountability</h4>
                      <p className="point-text">Every platform, application, and digital experience is built and supported directly through collaborative work by our team.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Creed Showcase Card */}
              <div className="about-quote-card glass-panel">
                <div className="quote-star-monogram">
                  <span className="star-glyph">✦</span>
                </div>
                <div className="sanskrit-prominent-callout">
                  यथा कल्पना तथा रचना
                </div>
                <div className="sanskrit-translation">
                  &ldquo;As the imagination, so the creation.&rdquo;
                </div>
                <p className="quote-explanation">
                  This motto defines how we approach our work. Whatever we conceive in our planning is brought into reality with attention to detail and sound engineering.
                </p>
                <div className="quote-founder-signature">
                  <span>True Inspire Team</span>
                  <span className="signature-dot">&bull;</span>
                  <span className="signature-date">Odisha, India</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FOUNDING ENGINEERS (#team) */}
        <section className="section team-section" id="team">
          <div className="container">
            <div className="section-head-dual">
              <div>
                <div className="badge-pill">Founders</div>
                <h2 className="section-heading">
                  The Team Behind<br />
                  <span className="text-gradient-gold">True Inspire</span>
                </h2>
              </div>
              <div className="team-controls-block">
                <p className="section-lead-paragraph">
                  Engineers collaborating on every design, architecture, and deployment.
                </p>
                <div className="carousel-controls">
                  <button 
                    className="carousel-arrow prev" 
                    onClick={() => handleTeamNav('prev')} 
                    aria-label="Previous Founder"
                  >
                    &#10094;
                  </button>
                  <button 
                    className="carousel-arrow next" 
                    onClick={() => handleTeamNav('next')} 
                    aria-label="Next Founder"
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            </div>

            <div className="team-grid">
              {teamMembers.map((member, idx) => (
                <div 
                  key={member.id} 
                  className={`team-card glass-panel ${activeTeamIndex === idx ? 'focused-card' : ''}`}
                >
                  <div className="team-photo-frame">
                    <img src={member.photo} alt={member.name} className="team-photo" />
                  </div>

                  <div className="team-content">
                    <div className="team-title-row">
                      <h3 className="team-name">{member.name}</h3>
                      <div className="team-socials">
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="team-social-icon" 
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin size={15} />
                        </a>
                        <a 
                          href={member.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="team-social-icon" 
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github size={15} />
                        </a>
                      </div>
                    </div>

                    <span className="team-role-label">{member.role}</span>
                    <p className="team-bio">{member.bio}</p>

                    <div className="team-tags">
                      {member.tags.map((tag) => (
                        <span key={tag} className="team-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: CONTACT (#contact) */}
        <section className="section cta-section" id="contact">
          <div className="container">
            <div 
              className="cta-monolith glass-panel"
              onMouseMove={handleCtaMouseMove}
            >
              <div className="cta-content-column">
                <h2 className="cta-headline">
                  <span className="cta-subhead-sans">LET'S DISCUSS</span>
                  <span className="cta-display-serif text-gradient-gold">Your Next Project</span>
                </h2>

                <p className="cta-text">
                  Whether you are planning a high-throughput web application, on-device edge AI intelligence, or a bespoke digital experience, we bring architectural rigor to every collaboration.
                </p>

                {/* Interactive Project Intent Chips */}
                <div className="cta-intent-chips">
                  <span className="cta-intent-label">Select an area to explore:</span>
                  <div className="intent-pills-row">
                    {['Web Architecture', 'Edge AI & Vision', 'Interactive 3D', 'FinTech Telemetry'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className="intent-pill"
                        onClick={() => {
                          setSelectedProjectType(type);
                          setIsModalOpen(true);
                        }}
                      >
                        <span>{type}</span>
                        <span className="pill-plus">+</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Action */}
                <div className="cta-actions-row">
                  <button 
                    className="btn btn-brand cta-primary-btn" 
                    onClick={() => { setSelectedProjectType('General Inquiry'); setIsModalOpen(true); }}
                  >
                    <span>Start a Conversation</span>
                    <ArrowRight className="icon-arrow" size={16} />
                  </button>
                </div>
              </div>

              <div className="cta-sanskrit-flank" aria-hidden="true">
                <span className="sanskrit-monolith-text">यथा कल्पना तथा रचना</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CLEAN MINIMAL FOOTER */}
      <footer className="footer-wrap">
        <div className="container">
          <div className="footer-minimal-inner">
            {/* Left: Studio Identity & Origin */}
            <div className="footer-brand-pane">
              <a href="#home" className="brand-logo footer-logo">
                <div className="brand-logo-frame">
                  <img src="/assets/true_inspire.jpeg" alt="True Inspire Logo" className="brand-logo-img" />
                </div>
                <div className="brand-text-block">
                  <span className="brand-name">TRUE INSPIRE</span>
                  <span className="brand-sanskrit">यथा कल्पना तथा रचना</span>
                </div>
              </a>
              <p className="footer-minimal-tagline">
                Creative Engineering Studio &bull; Software &amp; Applied Systems &bull; Odisha, India
              </p>
            </div>

            {/* Right: Inline Navigation & Back to Top */}
            <div className="footer-nav-pane">
              <nav className="footer-inline-nav" aria-label="Footer Navigation">
                <a href="#home">Overview</a>
                <a href="#services">Capabilities</a>
                <a href="#work">Work</a>
                <a href="#about">Creed</a>
                <a href="#team">Team</a>
                <a href="#contact">Contact</a>
              </nav>

              <button 
                type="button" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="footer-back-to-top"
                aria-label="Scroll back to top"
              >
                <span>Back to top</span>
                <ArrowUp size={13} className="icon-back-to-top" />
              </button>
            </div>
          </div>

          {/* Hairline Divider & Bottom Metadata */}
          <div className="footer-minimal-bottom">
            <div className="footer-copyright-block">
              <span>&copy; {new Date().getFullYear()} TRUE INSPIRE. All rights reserved.</span>
              <span className="footer-meta-sep">&bull;</span>
              <span className="footer-motto-tag">यथा कल्पना तथा रचना</span>
            </div>

            <div className="footer-channels-block">
              <a 
                href="https://github.com/im-chandanmahapatra" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-channel-item"
                title="True Inspire GitHub"
              >
                <Github size={13} />
                <span>GitHub</span>
              </a>
              <span className="footer-channel-sep">/</span>
              <a 
                href="https://www.linkedin.com/in/chandan-mahapatra/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-channel-item"
                title="True Inspire LinkedIn"
              >
                <Linkedin size={13} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* CLEAN, AUTHENTIC CONTACT MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div 
            className="modal-container glass-panel" 
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">Direct Contact</span>
                <h3 className="modal-title" id="contact-modal-title">Get in Touch with True Inspire</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="clientName">Your Name</label>
                  <input 
                    type="text" 
                    id="clientName" 
                    className="form-input" 
                    placeholder="e.g. Alex Carter" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="clientEmail">Email Address</label>
                  <input 
                    type="email" 
                    id="clientEmail" 
                    className="form-input" 
                    placeholder="alex@example.com" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="projectType">Area of Interest</label>
                <input 
                  type="text" 
                  id="projectType" 
                  className="form-input" 
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  placeholder="e.g. Full-Stack Web App, Edge AI, Digital Experience..." 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="clientMsg">Message or Project Outline</label>
                <textarea 
                  id="clientMsg" 
                  rows={4} 
                  className="form-input textarea" 
                  placeholder="Share details about what you would like to build or discuss..." 
                  required
                ></textarea>
              </div>

              <div className="modal-actions">
                <div className="modal-buttons">
                  <button type="button" className="btn btn-glass" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-brand">
                    <span>Send Message</span>
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="toast-notification glass-panel">
          <div className="toast-icon-circle">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="toast-title">Message Sent</div>
            <div className="toast-desc">Thank you. The True Inspire team will get back to you shortly.</div>
          </div>
        </div>
      )}
    </div>
  );
}
