import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ThreeCanvas from './components/ThreeCanvas';
import { projects, projectCategories } from './data/projects';
import { teamMembers } from './data/team';
import { 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
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
  Workflow
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
  const [modalType, setModalType] = useState('project');
  const [selectedProjectType, setSelectedProjectType] = useState('Edge AI & Vision');
  const [showToast, setShowToast] = useState(false);

  // Projects Filter State
  const [selectedCategory, setSelectedCategory] = useState('All Platforms');

  // Team Active Index
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
        { y: 32, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.1, 
          stagger: 0.14, 
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
  const filteredProjects = selectedCategory === 'All Platforms'
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
          <a href="#home" className="brand-logo" aria-label="To Inspire Home">
            <div className="brand-logo-frame">
              <img 
                src="/assets/true_inspire.jpeg" 
                alt="To Inspire Logo" 
                className="brand-logo-img" 
              />
            </div>
            <div className="brand-text-block">
              <span className="brand-name">TO INSPIRE</span>
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
              Engineering
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
              Initiate
            </a>
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
              className="btn btn-brand nav-cta" 
              onClick={() => { setIsModalOpen(true); setModalType('project'); }}
            >
              <span>Build Together</span>
              <ArrowRight className="icon-arrow" size={15} />
            </button>
            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* HERO SECTION (THE ENGINEERING PROCLAMATION) */}
        <section className="hero-section" id="home" ref={heroContentRef}>
          <div className="hero-container">
            {/* Top Eyebrow Badge Pill */}
            <div className="hero-anim-item badge-pill hero-badge">
              <Sparkles className="sparkle-icon" size={13} />
              <span>Autonomous Engineering Studio</span>
              <span className="badge-divider">&bull;</span>
              <span className="badge-sanskrit-accent">यथा कल्पना तथा रचना</span>
            </div>

            {/* Main Editorial Headline (Anti-Generic Copy) */}
            <h1 className="hero-anim-item hero-title">
              Software Engineered with Deliberate Craft<br />
              <span className="text-gradient-gold">&amp; Architectural Rigor</span>
            </h1>

            {/* Factual Subtitle */}
            <p className="hero-anim-item hero-subtitle">
              Founded by <strong>Chandan Mahapatra</strong> and <strong>S Akash Dora</strong> in Odisha, To Inspire architects bespoke web applications, edge AI surveillance systems, and high-throughput financial telemetry platforms.
            </p>

            {/* Action Group */}
            <div className="hero-anim-item hero-cta-group">
              <a href="#work" className="btn btn-brand">
                <span>Review Engineering Capabilities</span>
                <ArrowRight className="icon-arrow" size={16} />
              </a>
              <button 
                className="btn btn-glass" 
                onClick={() => { setIsModalOpen(true); setModalType('consult'); }}
              >
                <span>Direct Founder Consultation</span>
                <span className="btn-beacon-dot"></span>
              </button>
            </div>

            {/* Live Verified Studio Telemetry Strip */}
            <div className="hero-anim-item hero-telemetry-strip">
              <div className="telemetry-item">
                <span className="telemetry-label">Architecture</span>
                <strong className="telemetry-value">WebGL &bull; React 18 &bull; Vite</strong>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-item">
                <span className="telemetry-label">Studio Origin</span>
                <strong className="telemetry-value">Bhubaneswar &amp; Jeypore, Odisha</strong>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-item">
                <span className="telemetry-label">Status</span>
                <strong className="telemetry-value text-emerald">
                  <span className="live-indicator-pulse"></span>
                  Live &bull; Accepting Q4 Engagements
                </strong>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-item">
                <span className="telemetry-label">Verified Platforms</span>
                <strong className="telemetry-value">6 Production Codebases</strong>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FOUR PILLARS OF STUDIO ENGINEERING (#services) */}
        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-head-dual">
              <div>
                <div className="badge-pill">Capabilities</div>
                <h2 className="section-heading">
                  Four Pillars of<br />
                  <span className="text-gradient-gold">Studio Engineering</span>
                </h2>
              </div>
              <p className="section-lead-paragraph">
                From zero-latency edge computer vision to high-throughput financial analytics, we build resilient, beautiful software that solves verifiable operational problems.
              </p>
            </div>

            <div className="services-grid">
              {/* Pillar 1 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Monitor size={22} />
                </div>
                <div className="service-meta">01 / ARCHITECTURE</div>
                <h3 className="service-title">Full-Stack Web &amp; Cloud Platforms</h3>
                <p className="service-text">
                  High-throughput React and Next.js architectures, relational database schemas, and zero-downtime serverless pipelines built for longevity and speed.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Next.js &amp; Vite</span>
                  <span className="service-tag">PostgreSQL</span>
                  <span className="service-tag">Supabase</span>
                  <span className="service-tag">Cloud-Native</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Cpu size={22} />
                </div>
                <div className="service-meta">02 / VISION &amp; AI</div>
                <h3 className="service-title">Edge Computer Vision &amp; AI Systems</h3>
                <p className="service-text">
                  Edge-native ONNX and OpenVINO inference engines for sub-second industrial hazard detection, sensor triage, and behavioral LLM assistant pipelines.
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
                <div className="service-meta">03 / ART DIRECTION</div>
                <h3 className="service-title">Dual-Theme Art Direction &amp; Systems</h3>
                <p className="service-text">
                  Bespoke typography hierarchies, real-time WebGL 3D choreography, and micro-interactions calibrated for WCAG 2.1 AA contrast and zero cognitive fatigue.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Three.js WebGL</span>
                  <span className="service-tag">Editorial Type</span>
                  <span className="service-tag">Tactile UI</span>
                  <span className="service-tag">Dual Themes</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Workflow size={22} />
                </div>
                <div className="service-meta">04 / RELIABILITY</div>
                <h3 className="service-title">Architecture Audits &amp; DevOps</h3>
                <p className="service-text">
                  Comprehensive code integrity analysis, anti-inspection security shielding, Vercel/AWS infrastructure hardening, and real-time performance telemetry.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Security Shield</span>
                  <span className="service-tag">Vercel &amp; AWS</span>
                  <span className="service-tag">CI/CD Hardening</span>
                  <span className="service-tag">60 FPS Tuning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: VERIFIED PRODUCTION SHOWCASE (#work) */}
        <section className="section projects-section" id="work">
          <div className="container">
            <div className="section-head-center">
              <div className="badge-pill">Verified Showcase</div>
              <h2 className="section-heading text-center">
                Real Software.<br />
                <span className="text-gradient-gold">Proven in Production.</span>
              </h2>
              <p className="section-description text-center">
                Six verified platforms engineered, deployed, and maintained by the To Inspire collective.
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
                <div key={proj.id} className="project-card glass-panel">
                  <div className="project-card-top">
                    <div className="project-category-row">
                      <span className="project-category-badge">{proj.category}</span>
                      <span className="project-author-tag">By {proj.author}</span>
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
                      <a 
                        href={proj.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-btn primary"
                        title="View Live Web Application or Demo"
                      >
                        <span>Launch App</span>
                        <ExternalLink size={14} />
                      </a>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: THE CREED & STUDIO PHILOSOPHY (#about) */}
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
                  True engineering is not about assembling generic templates or chasing fleeting design fads. It is the deliberate art of transforming clear ideas into resilient, beautiful software that endures.
                </p>

                <div className="philosophy-points">
                  <div className="philosophy-item">
                    <div className="point-icon-box">
                      <Compass size={18} />
                    </div>
                    <div>
                      <h4 className="point-title">Intellectual Honesty</h4>
                      <p className="point-text">We build what creates real human and business value—never writing code for decoration or inflating claims.</p>
                    </div>
                  </div>

                  <div className="philosophy-item">
                    <div className="point-icon-box">
                      <Terminal size={18} />
                    </div>
                    <div>
                      <h4 className="point-title">Architectural Precision</h4>
                      <p className="point-text">Clean modular systems, strict WCAG AA contrast compliance, and silky 60fps WebGL execution across desktop and mobile.</p>
                    </div>
                  </div>

                  <div className="philosophy-item">
                    <div className="point-icon-box">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="point-title">Founder Accountability</h4>
                      <p className="point-text">Every line of code and architectural design is personally overseen and delivered by our founding engineers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Creed Shrine Card */}
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
                  This ancient maxim defines our studio creed. Whatever we conceive in the mind must be translated into material reality with uncompromising technical fidelity.
                </p>
                <div className="quote-founder-signature">
                  <span>To Inspire Founding Collective</span>
                  <span className="signature-dot">&bull;</span>
                  <span className="signature-date">Est. 2024</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: DIRECT TECHNICAL LEADERSHIP (#team) */}
        <section className="section team-section" id="team">
          <div className="container">
            <div className="section-head-dual">
              <div>
                <div className="badge-pill">Founders</div>
                <h2 className="section-heading">
                  The Engineers Behind<br />
                  <span className="text-gradient-gold">To Inspire</span>
                </h2>
              </div>
              <div className="team-controls-block">
                <p className="section-lead-paragraph">
                  Direct founder involvement on every client partnership. Meet the builders driving our technical strategy.
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

        {/* SECTION: CTA INITIATE MONOLITH (#contact) */}
        <section className="section cta-section" id="contact">
          <div className="container">
            <div className="cta-monolith glass-panel">
              <div className="cta-content-column">
                <div className="badge-pill">Initiate Engagement</div>
                <h2 className="cta-headline">
                  Ready to Build Something<br />
                  <span className="text-gradient-gold">Truly Distinctive?</span>
                </h2>
                <p className="cta-text">
                  Whether you are architecting a ground-up platform or elevating an existing product, let's explore how deliberate engineering can accelerate your vision.
                </p>
                <div className="cta-actions-row">
                  <button 
                    className="btn btn-brand" 
                    onClick={() => { setIsModalOpen(true); setModalType('project'); }}
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="icon-arrow" size={16} />
                  </button>
                  <button 
                    className="btn btn-glass" 
                    onClick={() => { setIsModalOpen(true); setModalType('consult'); }}
                  >
                    <span>Direct Inquiry</span>
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

      {/* FOOTER */}
      <footer className="footer-wrap">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <a href="#home" className="brand-logo footer-logo">
                <div className="brand-logo-frame">
                  <img src="/assets/true_inspire.jpeg" alt="To Inspire Logo" className="brand-logo-img" />
                </div>
                <div className="brand-text-block">
                  <span className="brand-name">TO INSPIRE</span>
                  <span className="brand-sanskrit">यथा कल्पना तथा रचना</span>
                </div>
              </a>
              <p className="footer-desc">
                Autonomous creative engineering, expressive typography, and robust software architectures crafted in Bhubaneswar, India.
              </p>
              <div className="footer-origin-badge">
                <span className="badge-dot"></span>
                <span>As Conceived, So Created &bull; V4.0</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-links">
                <li><a href="#home">Overview</a></li>
                <li><a href="#services">Capabilities</a></li>
                <li><a href="#work">Verified Engineering</a></li>
                <li><a href="#about">Studio Creed</a></li>
                <li><a href="#team">Founding Team</a></li>
                <li><a href="#contact">Initiate Engagement</a></li>
              </ul>
            </div>

            {/* Verified Platforms */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Live Deliverables</h4>
              <ul className="footer-links">
                <li><a href="https://github.com/sakashdora/PPE-PROJECT" target="_blank" rel="noopener noreferrer">ARGUS AI (Vision) ↗</a></li>
                <li><a href="https://github.com/sakashdora/Trade_vault" target="_blank" rel="noopener noreferrer">TradeVault (FinTech) ↗</a></li>
                <li><a href="https://doseloop.vercel.app/" target="_blank" rel="noopener noreferrer">DoseLoop (Health) ↗</a></li>
                <li><a href="https://harvest-tax-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer">HarvestIQ (Tax) ↗</a></li>
                <li><a href="https://cross-fire-three.vercel.app/" target="_blank" rel="noopener noreferrer">CrossFire 2026 ↗</a></li>
                <li><a href="https://github.com/im-chandanmahapatra/pure-go" target="_blank" rel="noopener noreferrer">PURE GO (Commerce) ↗</a></li>
              </ul>
            </div>

            {/* Founders & Connect */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Founders &amp; Connect</h4>
              <ul className="footer-links">
                <li><a href="https://www.linkedin.com/in/chandan-mahapatra/" target="_blank" rel="noopener noreferrer">Chandan Mahapatra (LinkedIn) ↗</a></li>
                <li><a href="https://github.com/im-chandanmahapatra" target="_blank" rel="noopener noreferrer">Chandan (GitHub) ↗</a></li>
                <li><a href="https://www.linkedin.com/in/sakashdora" target="_blank" rel="noopener noreferrer">S Akash Dora (LinkedIn) ↗</a></li>
                <li><a href="https://github.com/sakashdora" target="_blank" rel="noopener noreferrer">S Akash Dora (GitHub) ↗</a></li>
                <li><a href="mailto:myselfazure@gmail.com">Direct Inquiry (Email) ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p>&copy; {new Date().getFullYear()} To Inspire. All rights reserved. Built with deliberate craft.</p>
            <div className="footer-legal-links">
              <span>यथा कल्पना तथा रचना</span>
              <span className="dot-sep">&bull;</span>
              <span>TrueInspires V4.0</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ENGAGEMENT & CONSULTATION MODAL */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div 
            className="modal-container glass-panel" 
            onClick={(e) => e.stopPropagation()} 
            role="dialog" 
            aria-modal="true"
          >
            <div className="modal-header">
              <div>
                <span className="modal-eyebrow">
                  {modalType === 'project' ? 'Initiate Project Proposal' : 'Direct Founder Consultation'}
                </span>
                <h3 className="modal-title">
                  {modalType === 'project' ? 'Let’s Build Something Distinctive' : 'Direct Access to Founding Engineers'}
                </h3>
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
              {modalType === 'project' && (
                <div className="form-group">
                  <label className="form-label">Project Domain</label>
                  <div className="project-type-pills">
                    {['Edge AI & Vision', 'FinTech & Analytics', 'Digital Health', 'Cloud Platforms', 'Event Operations'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={`type-pill ${selectedProjectType === type ? 'active' : ''}`}
                        onClick={() => setSelectedProjectType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                    placeholder="alex@company.com" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="clientMsg">Project Details &amp; Objectives</label>
                <textarea 
                  id="clientMsg" 
                  rows={4} 
                  className="form-input textarea" 
                  placeholder="Outline your product vision, technical scope, or architecture timeline..." 
                  required
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-glass" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brand">
                  <span>Send Direct Proposal</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST NOTIFICATION */}
      {showToast && (
        <div className="toast-notification glass-panel">
          <div className="toast-icon-circle">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="toast-title">Transmission Received</div>
            <div className="toast-desc">Thank you. Chandan or Akash will respond directly within 24 hours.</div>
          </div>
        </div>
      )}
    </div>
  );
}
