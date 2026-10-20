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
  ChevronRight,
  Workflow
} from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [activeNav, setActiveNav] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal & Toast States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('project');
  const [selectedProjectType, setSelectedProjectType] = useState('Web & App Development');
  const [showToast, setShowToast] = useState(false);

  // Projects Filter State
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  // Team Active Index
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  // Refs for animations
  const heroContentRef = useRef(null);

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
          stagger: 0.15, 
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  // Team carousel navigation
  const handleTeamNav = (dir) => {
    setActiveTeamIndex((prev) => (dir === 'next' ? (prev === 0 ? 1 : 0) : (prev === 1 ? 0 : 1)));
  };

  // Contact form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All Projects'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="app-root">
      {/* Interactive 3D WebGL Canvas Layer */}
      <ThreeCanvas />

      {/* Atmospheric Background Mesh Glows */}
      <div className="ambient-mesh-layer" aria-hidden="true">
        <div className="glow-sphere glow-1"></div>
        <div className="glow-sphere glow-2"></div>
        <div className="glow-sphere glow-3"></div>
      </div>

      {/* STICKY HEADER & NAVBAR */}
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          {/* Authentic Brand Lockup with Real Logo Asset */}
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
              Services
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
              Philosophy
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

          {/* Nav Actions */}
          <div className="nav-actions">
            <button 
              className="btn btn-gold nav-cta" 
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
        {/* HERO SECTION */}
        <section className="hero-section" id="home" ref={heroContentRef}>
          <div className="hero-container">
            {/* Top Eyebrow Badge Pill */}
            <div className="hero-anim-item badge-pill hero-badge">
              <Sparkles className="sparkle-icon" size={13} />
              <span className="badge-text-gold">Creative Engineering Studio</span>
              <span className="badge-divider">&bull;</span>
              <span className="badge-sanskrit-accent">यथा कल्पना तथा रचना</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="hero-anim-item hero-title">
              Where Bold Imagination<br />
              <span className="text-gradient-gold">Meets Precision Engineering</span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="hero-anim-item hero-subtitle">
              At <strong>To Inspire</strong>, we design, develop, and deliver bespoke digital platforms, scalable software architectures, and immersive interactive web experiences that solve genuine problems.
            </p>

            {/* Action Group */}
            <div className="hero-anim-item hero-cta-group">
              <a href="#work" className="btn btn-gold">
                <span>Explore Engineering</span>
                <ArrowRight className="icon-arrow" size={16} />
              </a>
              <button 
                className="btn btn-glass" 
                onClick={() => { setIsModalOpen(true); setModalType('project'); }}
              >
                <span>Initiate Consultation</span>
                <span className="btn-beacon-dot"></span>
              </button>
            </div>

            {/* Live Engineering Telemetry Strip */}
            <div className="hero-anim-item hero-telemetry-strip">
              <div className="telemetry-item">
                <span className="telemetry-label">Architecture</span>
                <strong className="telemetry-value">WebGL &bull; React &bull; Vite</strong>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-item">
                <span className="telemetry-label">Studio Origin</span>
                <strong className="telemetry-value">Bhubaneswar, Odisha</strong>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-item">
                <span className="telemetry-label">Status</span>
                <strong className="telemetry-value text-emerald">
                  <span className="live-indicator-pulse"></span>
                  Accepting Q4 / Q1 Projects
                </strong>
              </div>
              <div className="telemetry-divider"></div>
              <div className="telemetry-item">
                <span className="telemetry-label">Verified Deliverables</span>
                <strong className="telemetry-value">5 Production Platforms</strong>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: SERVICES / WHAT WE DO */}
        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-head-dual">
              <div>
                <div className="badge-pill">Capabilities</div>
                <h2 className="section-heading">
                  Engineered for Impact.<br />
                  <span className="text-gradient-gold">Constructed for Longevity.</span>
                </h2>
              </div>
              <p className="section-lead-paragraph">
                From zero-to-one product development to advanced 3D interactive web applications, we combine architectural discipline with deliberate art direction.
              </p>
            </div>

            <div className="services-grid">
              {/* Service Card 1 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Monitor size={22} className="service-icon" />
                </div>
                <div className="service-meta">01 / ARCHITECTURE</div>
                <h3 className="service-title">Web & App Engineering</h3>
                <p className="service-text">
                  Bespoke, high-throughput web applications crafted with React, modern state architectures, clean APIs, and fluid performance across all viewports.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Next.js & Vite</span>
                  <span className="service-tag">Cloud Native</span>
                  <span className="service-tag">Responsive</span>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Cpu size={22} className="service-icon" />
                </div>
                <div className="service-meta">02 / INTELLIGENCE</div>
                <h3 className="service-title">AI & Smart Automation</h3>
                <p className="service-text">
                  Purposeful AI integrations and automated workflows designed to accelerate business decisions without superficial gimmickry or hallucinations.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Custom Agents</span>
                  <span className="service-tag">LLM Orchestration</span>
                  <span className="service-tag">Automated Pipelines</span>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Palette size={22} className="service-icon" />
                </div>
                <div className="service-meta">03 / DIRECTION</div>
                <h3 className="service-title">UI/UX & Creative Direction</h3>
                <p className="service-text">
                  Distinguished visual systems, tailored typography hierarchies, and tactile micro-interactions that leave a memorable, professional impression.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Editorial Systems</span>
                  <span className="service-tag">Interactive 3D</span>
                  <span className="service-tag">Design Systems</span>
                </div>
              </div>

              {/* Service Card 4 */}
              <div className="service-card glass-panel">
                <div className="service-icon-box">
                  <Workflow size={22} className="service-icon" />
                </div>
                <div className="service-meta">04 / STRATEGY</div>
                <h3 className="service-title">Consulting & Deployment</h3>
                <p className="service-text">
                  Comprehensive code audits, performance tuning, secure deployment pipelines, and proactive technical leadership for growing businesses.
                </p>
                <div className="service-tags">
                  <span className="service-tag">Vercel & AWS</span>
                  <span className="service-tag">Audit & Security</span>
                  <span className="service-tag">DevOps CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FEATURED ENGINEERING / OUR WORK */}
        <section className="section projects-section" id="work">
          <div className="container">
            <div className="section-head-center">
              <div className="badge-pill">Production Portfolio</div>
              <h2 className="section-heading text-center">
                Crafted with Rigor.<br />
                <span className="text-gradient-gold">Proven in Real Production.</span>
              </h2>
              <p className="section-description text-center">
                Explore authentic digital platforms and applications built, deployed, and maintained by the To Inspire engineering team.
              </p>

              {/* Category Filter Bar */}
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
                        title="View Live Web Application"
                      >
                        <span>Launch App</span>
                        <ExternalLink size={14} />
                      </a>
                      <a 
                        href={proj.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-btn secondary"
                        title="View Source Code Repository"
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

        {/* SECTION: PHILOSOPHY & ABOUT */}
        <section className="section about-section" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-narrative">
                <div className="badge-pill">Our Philosophy</div>
                <h2 className="section-heading">
                  Rooted in Conviction.<br />
                  <span className="text-gradient-gold">Driven by Craftsmanship.</span>
                </h2>
                
                <p className="about-lead">
                  True engineering is not about chasing fleeting design fads or assembling generic templates. It is the deliberate art of transforming clear ideas into resilient, beautiful software that endures.
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
                      <p className="point-text">Clean modular systems, rigorous accessibility compliance, and silky 60fps WebGL execution across desktop and mobile.</p>
                    </div>
                  </div>

                  <div className="philosophy-item">
                    <div className="point-icon-box">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="point-title">Founder Accountability</h4>
                      <p className="point-text">Every line of code and design decision is personally overseen and delivered by our founding engineers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Motto Shrine Card */}
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

        {/* SECTION: FOUNDERS & TEAM */}
        <section className="section team-section" id="team">
          <div className="container">
            <div className="section-head-dual">
              <div>
                <div className="badge-pill">Leadership</div>
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
                    <div className="team-badge-overlay">
                      <span className="team-role-pill">{member.role}</span>
                    </div>
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

        {/* SECTION: CTA INITIATE BANNER */}
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
                    className="btn btn-gold" 
                    onClick={() => { setIsModalOpen(true); setModalType('project'); }}
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="icon-arrow" size={16} />
                  </button>
                  <button 
                    className="btn btn-glass" 
                    onClick={() => { setIsModalOpen(true); setModalType('contact'); }}
                  >
                    <span>Send Direct Message</span>
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
                <span>As Conceived, So Created &bull; V3.0</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-links">
                <li><a href="#home">Overview</a></li>
                <li><a href="#services">Services & Architecture</a></li>
                <li><a href="#work">Production Work</a></li>
                <li><a href="#about">Studio Philosophy</a></li>
                <li><a href="#team">Founding Team</a></li>
                <li><a href="#contact">Initiate Project</a></li>
              </ul>
            </div>

            {/* Verified Projects */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Live Deliverables</h4>
              <ul className="footer-links">
                <li><a href="https://doseloop.vercel.app/" target="_blank" rel="noopener noreferrer">DOSELOOP ↗</a></li>
                <li><a href="https://expense-so.vercel.app/" target="_blank" rel="noopener noreferrer">ExpenseSO ↗</a></li>
                <li><a href="https://freshers-party-beige.vercel.app/" target="_blank" rel="noopener noreferrer">Freshers Party ↗</a></li>
                <li><a href="https://cross-fire-three.vercel.app/" target="_blank" rel="noopener noreferrer">CrossFire ↗</a></li>
                <li><a href="https://teacherinvitation.vercel.app/" target="_blank" rel="noopener noreferrer">Teacher Invitation ↗</a></li>
              </ul>
            </div>

            {/* Founder Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Founders & Connect</h4>
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
              <span>TrueInspires V3.0</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ENGAGEMENT & CONTACT MODAL */}
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
                  {modalType === 'project' ? 'Initiate Project' : 'Direct Conversation'}
                </span>
                <h3 className="modal-title">
                  {modalType === 'project' ? 'Let’s Build Something Meaningful' : 'Connect with the Founders'}
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
                    {['Web & App Development', 'AI & Automation', 'UI/UX Design', 'Architecture Consulting'].map((type) => (
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
                <label className="form-label" htmlFor="clientMsg">Project Details & Objectives</label>
                <textarea 
                  id="clientMsg" 
                  rows={4} 
                  className="form-input textarea" 
                  placeholder="Tell us about your objectives, timeline, or scope..." 
                  required
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-glass" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <span>Send Proposal Request</span>
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
            <div className="toast-title">Message Transmitted</div>
            <div className="toast-desc">Thank you. The To Inspire founders will respond within 24 hours.</div>
          </div>
        </div>
      )}
    </div>
  );
}
