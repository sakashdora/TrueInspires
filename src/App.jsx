import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  BarChart2, 
  Lightbulb, 
  Users, 
  Zap, 
  CheckCircle, 
  Code2, 
  Rocket, 
  FileText, 
  X, 
  Layers, 
  HeartHandshake, 
  ShieldCheck, 
  ChevronDown,
  Monitor,
  Cpu,
  Palette,
  MessageSquare,
  Clock,
  Activity,
  Check
} from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [activeNav, setActiveNav] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal & Toast States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('contact');
  const [selectedProjectType, setSelectedProjectType] = useState('Web & App');
  const [showToast, setShowToast] = useState(false);

  // Projects Filter State
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  // Team Carousel Highlight State
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  // Dashboard Mockup State
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [period, setPeriod] = useState('This Month');
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false);
  const [progressVal, setProgressVal] = useState(76);

  // Refs for Animations
  const heroStageRef = useRef(null);
  const mockupRef = useRef(null);
  const chartLineRef = useRef(null);

  // Period Data Presets
  const periodData = {
    'This Week': { pct: 89, tasks: '12/14', time: '4 Days' },
    'This Month': { pct: 76, tasks: '24/32', time: '2 Weeks' },
    'This Quarter': { pct: 92, tasks: '68/74', time: '6 Weeks' },
    'All Time': { pct: 98, tasks: '184/188', time: 'Completed' }
  };

  // Scroll detection for sticky navbar & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'work', 'about', 'team', 'contact'];
      const scrollPos = window.scrollY + 180;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entry & Continuous Physics Animations
  useEffect(() => {
    // 1. Hero floating items continuous hover physics
    const floatAnims = [
      gsap.to('#planeBadge', { y: '-=10', rotation: 4, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' }),
      gsap.to('#cardIdeas', { y: '-=8', duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 }),
      gsap.to('#cardClients', { y: '+=8', duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 }),
      gsap.to('#chartBadge', { y: '-=10', rotation: -3, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 }),
      gsap.to('#cardSolutions', { y: '-=8', duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.6 }),
      gsap.to('#cardProjects', { y: '+=8', duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.2 })
    ];

    // 2. Animated Chart Drawing
    if (chartLineRef.current) {
      try {
        const len = chartLineRef.current.getTotalLength ? chartLineRef.current.getTotalLength() : 500;
        gsap.set(chartLineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(chartLineRef.current, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.out',
          delay: 0.4
        });
      } catch (e) {
        console.warn(e);
      }
    }

    // 3. Parallax tilt on mouse movement in Hero
    const handleMouseMove = (e) => {
      if (window.innerWidth <= 800) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      gsap.to('#cardIdeas', { x: deltaX * 14, y: deltaY * 14, duration: 0.8, ease: 'power1.out', overwrite: 'auto' });
      gsap.to('#cardClients', { x: deltaX * 10, y: deltaY * 10, duration: 0.8, ease: 'power1.out', overwrite: 'auto' });
      gsap.to('#cardSolutions', { x: -deltaX * 14, y: -deltaY * 14, duration: 0.8, ease: 'power1.out', overwrite: 'auto' });
      gsap.to('#cardProjects', { x: -deltaX * 10, y: -deltaY * 10, duration: 0.8, ease: 'power1.out', overwrite: 'auto' });
      
      if (mockupRef.current) {
        gsap.to(mockupRef.current, {
          rotateY: deltaX * 2.5,
          rotateX: -deltaY * 2.5,
          transformPerspective: 1000,
          duration: 0.9,
          ease: 'power1.out'
        });
      }
    };

    const heroStage = heroStageRef.current;
    if (heroStage) {
      heroStage.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      floatAnims.forEach(a => a.kill());
      if (heroStage) {
        heroStage.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Update Period Dropdown Handler
  const handlePeriodChange = (val) => {
    setPeriod(val);
    setPeriodMenuOpen(false);
    if (periodData[val]) {
      const target = periodData[val].pct;
      const counter = { val: progressVal };
      gsap.to(counter, {
        val: target,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => setProgressVal(Math.round(counter.val))
      });
    }
  };

  // Team Carousel Arrows Handler
  const handleTeamNav = (dir) => {
    setActiveTeamIndex(prev => (dir === 'next' ? (prev === 0 ? 1 : 0) : (prev === 1 ? 0 : 1)));
  };

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  // Filtered Projects
  const filteredProjects = selectedCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="app-root">
      {/* Ambient Mesh Glow Blobs */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* STICKY NAVBAR */}
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#home" className="brand-logo" aria-label="TrueInspires Home">
            <svg className="logo-mark" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="4" width="7" height="24" rx="3.5" fill="#0A192F" />
              <rect x="12.5" y="8" width="7" height="20" rx="3.5" fill="#1E6BFF" />
              <rect x="22" y="14" width="7" height="14" rx="3.5" fill="#38BDF8" />
            </svg>
            <span className="logo-text">TrueInspires</span>
          </a>

          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#home" className={`nav-link ${activeNav === 'home' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" className={`nav-link ${activeNav === 'about' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#services" className={`nav-link ${activeNav === 'services' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#work" className={`nav-link ${activeNav === 'work' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Our Work</a>
            <a href="#team" className={`nav-link ${activeNav === 'team' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Team</a>
            <a href="#contact" className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>

          <div className="nav-actions">
            <button className="btn btn-blue nav-cta" onClick={() => { setIsModalOpen(true); setModalType('project'); }}>
              <span>Let's Build</span>
              <ArrowRight className="icon-arrow" size={16} />
            </button>
            <button 
              className="mobile-menu-toggle" 
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

      <main>
        {/* HERO SECTION */}
        <section className="hero-section" id="home">
          {/* Subtle curved connecting paths */}
          <svg className="hero-connecting-lines" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 240 180 C 350 200, 420 260, 470 290" stroke="rgba(30, 107, 255, 0.22)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 230 330 C 330 330, 390 320, 470 320" stroke="rgba(30, 107, 255, 0.2)" strokeWidth="2" />
            <path d="M 1200 180 C 1090 200, 1020 260, 970 290" stroke="rgba(30, 107, 255, 0.22)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 1210 330 C 1110 330, 1050 320, 970 320" stroke="rgba(30, 107, 255, 0.2)" strokeWidth="2" />
          </svg>

          <div className="hero-container" ref={heroStageRef}>
            {/* Top Pill Tag */}
            <div className="badge-pill hero-badge">
              <Sparkles className="sparkle-icon" size={14} />
              <span>Innovate &bull; Build &bull; Inspire</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              We Build Digital Products<br />
              <span className="text-gradient-blue">That Inspire Growth</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              At TrueInspires, we design, develop and deliver innovative digital solutions that solve real problems and create meaningful impact.
            </p>

            {/* Dual CTAs */}
            <div className="hero-cta-group">
              <button className="btn btn-dark" onClick={() => { setIsModalOpen(true); setModalType('project'); }}>
                <span>Start a Project</span>
                <ArrowRight className="icon-arrow" size={16} />
              </button>
              <button className="btn btn-outline" onClick={() => { setIsModalOpen(true); setModalType('talk'); }}>
                <span>Talk to Us</span>
                <span className="btn-icon-circle">
                  <svg viewBox="0 0 24 24" fill="#1E6BFF">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </span>
              </button>
            </div>

            {/* STAGE: Floating Elements & macOS Dashboard Mockup */}
            <div className="hero-stage">
              {/* Floating Badge 1: Paper plane */}
              <div className="float-item float-badge-plane" id="planeBadge">
                <div className="circular-icon-badge">
                  <Send size={18} />
                </div>
              </div>

              {/* Floating Card 1: Ideas to Impact */}
              <div className="float-item float-card-ideas glass-card" id="cardIdeas">
                <div className="card-icon-box bg-blue-subtle">
                  <Lightbulb size={18} color="#1E6BFF" />
                </div>
                <div className="card-text">
                  <span className="card-title">Ideas to Impact</span>
                  <span className="card-subtitle">Faster Together</span>
                </div>
              </div>

              {/* Floating Card 2: 20+ Happy Clients */}
              <div className="float-item float-card-clients glass-card" id="cardClients">
                <div className="card-icon-box bg-blue-subtle">
                  <Users size={18} color="#1E6BFF" />
                </div>
                <div className="card-text">
                  <span className="card-title">20+</span>
                  <span className="card-subtitle">Happy Clients</span>
                </div>
                <div className="avatar-stack">
                  <img src="/assets/avatar1.jpg" alt="Client 1" className="avatar-sm" />
                  <img src="/assets/avatar2.jpg" alt="Client 2" className="avatar-sm" />
                  <img src="/assets/avatar3.jpg" alt="Client 3" className="avatar-sm" />
                  <span className="avatar-sm avatar-add">+</span>
                </div>
              </div>

              {/* Floating Badge 2: Bar Chart */}
              <div className="float-item float-badge-chart" id="chartBadge">
                <div className="circular-icon-badge">
                  <BarChart2 size={18} />
                </div>
              </div>

              {/* Floating Card 3: Real Solutions */}
              <div className="float-item float-card-solutions glass-card" id="cardSolutions">
                <div className="card-icon-box bg-blue-subtle">
                  <BarChart2 size={18} color="#1E6BFF" />
                </div>
                <div className="card-text">
                  <span className="card-title">Real Solutions</span>
                  <span className="card-subtitle">For Real People</span>
                </div>
              </div>

              {/* Floating Card 4: 50+ Projects Delivered */}
              <div className="float-item float-card-projects glass-card" id="cardProjects">
                <div className="card-icon-box bg-blue-subtle">
                  <Zap size={18} color="#1E6BFF" />
                </div>
                <div className="card-text">
                  <span className="card-title">50+</span>
                  <span className="card-subtitle">Projects Delivered</span>
                </div>
                <div className="card-sparkline">
                  <svg viewBox="0 0 100 24" fill="none" stroke="#1E6BFF" strokeWidth="2">
                    <path d="M0 18 Q 20 22, 35 12 T 70 8 T 100 4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Central App Dashboard Mockup */}
              <div className="dashboard-mockup" ref={mockupRef} id="dashboardMockup">
                <div className="mockup-header">
                  <div className="window-controls">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="mockup-search-dots">
                    <span className="mini-dot"></span>
                    <span className="mini-dot"></span>
                    <span className="mini-dot"></span>
                  </div>
                </div>

                <div className="mockup-body">
                  {/* Left Sidebar */}
                  <aside className="mockup-sidebar">
                    <ul className="sidebar-menu">
                      {['Dashboard', 'Projects', 'Team', 'Messages', 'Analytics', 'Settings'].map(tab => (
                        <li 
                          key={tab} 
                          className={`menu-item ${activeTab === tab ? 'active' : ''}`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab === 'Dashboard' && <Layers size={15} />}
                          {tab === 'Projects' && <FileText size={15} />}
                          {tab === 'Team' && <Users size={15} />}
                          {tab === 'Messages' && <MessageSquare size={15} />}
                          {tab === 'Analytics' && <BarChart2 size={15} />}
                          {tab === 'Settings' && <Activity size={15} />}
                          <span>{tab}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="sidebar-footer">
                      <img src="/assets/alex.jpg" alt="Alex Carter" className="user-avatar" />
                      <div className="user-info">
                        <span className="user-name">Alex Carter</span>
                        <span className="user-role">Product Owner</span>
                      </div>
                    </div>
                  </aside>

                  {/* Main Content Area */}
                  <section className="mockup-content">
                    <div className="panel-header">
                      <h3 className="panel-title">{activeTab} Progress</h3>
                      <div className="dropdown-wrapper">
                        <button className="dropdown-btn" onClick={() => setPeriodMenuOpen(!periodMenuOpen)}>
                          <span>{period}</span>
                          <ChevronDown size={13} />
                        </button>
                        {periodMenuOpen && (
                          <ul className="dropdown-menu show">
                            {['This Week', 'This Month', 'This Quarter', 'All Time'].map(p => (
                              <li key={p} className={period === p ? 'active' : ''} onClick={() => handlePeriodChange(p)}>
                                {p}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Area Graph */}
                    <div className="chart-container">
                      <div className="chart-y-axis">
                        <span>100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span>0</span>
                      </div>
                      <div className="chart-plot">
                        <svg viewBox="0 0 500 130" className="progress-svg" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#1E6BFF" stopOpacity="0.32" />
                              <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.12" />
                              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.01" />
                            </linearGradient>
                          </defs>
                          <line x1="0" y1="10" x2="500" y2="10" stroke="#F1F5F9" strokeWidth="1" />
                          <line x1="0" y1="40" x2="500" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                          <line x1="0" y1="70" x2="500" y2="70" stroke="#F1F5F9" strokeWidth="1" />
                          <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                          
                          <path d="M 0 115 Q 120 120, 200 95 T 320 38 T 420 48 T 500 60 L 500 130 L 0 130 Z" fill="url(#chartGradient)" />
                          <path ref={chartLineRef} d="M 0 115 Q 120 120, 200 95 T 320 38 T 420 48 T 500 60" fill="none" stroke="#1E6BFF" strokeWidth="3" strokeLinecap="round" />
                          
                          <g className="chart-marker" transform="translate(320, 38)">
                            <circle r="6" fill="#1E6BFF" />
                            <circle r="12" fill="#1E6BFF" opacity="0.25" className="anim-pulse" />
                          </g>
                        </svg>

                        <div className="chart-badge" style={{ left: '64%', top: '12px' }}>
                          <span>{progressVal}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Metric Chips */}
                    <div className="metrics-grid">
                      <div className="metric-chip">
                        <div className="metric-icon-box bg-emerald">
                          <CheckCircle size={14} />
                        </div>
                        <div className="metric-data">
                          <span className="metric-label">Tasks</span>
                          <strong className="metric-val">{periodData[period]?.tasks || '24/32'}</strong>
                        </div>
                      </div>

                      <div className="metric-chip">
                        <div className="metric-icon-box bg-blue">
                          <Users size={14} />
                        </div>
                        <div className="metric-data">
                          <span className="metric-label">Team</span>
                          <strong className="metric-val">5 Members</strong>
                        </div>
                      </div>

                      <div className="metric-chip">
                        <div className="metric-icon-box bg-cyan">
                          <Activity size={14} />
                        </div>
                        <div className="metric-data">
                          <span className="metric-label">Status</span>
                          <strong className="metric-val">On Track</strong>
                        </div>
                      </div>

                      <div className="metric-chip">
                        <div className="metric-icon-box bg-purple">
                          <Clock size={14} />
                        </div>
                        <div className="metric-data">
                          <span className="metric-label">Timeline</span>
                          <strong className="metric-val">{periodData[period]?.time || '2 Weeks'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Stepper Roadmap */}
                    <div className="stepper-section">
                      <h4 className="stepper-title">From Idea to Impact</h4>
                      <div className="stepper-track">
                        <div className="step-node completed">
                          <span className="step-check">&#10003;</span>
                          <span className="step-name">Ideation</span>
                        </div>
                        <div className="step-line active"></div>
                        <div className="step-node completed">
                          <span className="step-check">&#10003;</span>
                          <span className="step-name">Development</span>
                        </div>
                        <div className="step-line active"></div>
                        <div className="step-node active-step">
                          <span className="step-dot"></span>
                          <span className="step-name">Deployment</span>
                        </div>
                        <div className="step-line"></div>
                        <div className="step-node pending">
                          <span className="step-ring"></span>
                          <span className="step-name">Growth</span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: WHAT WE DO */}
        <section className="section services-section" id="services">
          <div className="container services-grid-layout">
            <div className="section-header-left">
              <div className="badge-pill">What We Do</div>
              <h2 className="section-heading">
                Complete Solutions<br />for a Digital Tomorrow
              </h2>
              <p className="section-description">
                From idea validation to full-scale development, we help you build, launch and grow with smart and scalable solutions.
              </p>
              <a href="#work" className="btn btn-blue inline-flex">
                <span>Explore Services</span>
                <ArrowRight className="icon-arrow" size={16} />
              </a>
            </div>

            <div className="services-cards-grid">
              <div className="service-card">
                <div className="service-icon-box bg-blue-light">
                  <Monitor size={22} color="#1E6BFF" />
                </div>
                <h3 className="service-title">Web & App Development</h3>
                <p className="service-text">
                  Modern, scalable and high-performance applications tailored to your needs.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon-box bg-purple-light">
                  <Cpu size={22} color="#8B5CF6" />
                </div>
                <h3 className="service-title">AI & Automation</h3>
                <p className="service-text">
                  Smart automation and AI solutions to improve efficiency and decision making.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon-box bg-pink-light">
                  <Palette size={22} color="#EC4899" />
                </div>
                <h3 className="service-title">UI/UX Design</h3>
                <p className="service-text">
                  Clean, modern and user-centric designs that create great experiences.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon-box bg-green-light">
                  <MessageSquare size={22} color="#10B981" />
                </div>
                <h3 className="service-title">Consulting & Support</h3>
                <p className="service-text">
                  End-to-end guidance, deployment and continuous support for long-term success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FEATURED PROJECTS & CASE STUDIES (Our Work) */}
        <section className="section projects-section" id="work">
          <div className="container text-center-wrap">
            <div className="badge-pill">Our Work</div>
            <h2 className="section-heading text-center">Crafted with Precision. Delivered with Impact.</h2>
            <p className="section-description text-center">
              Explore real-world software, web applications and digital platforms engineered by our team.
            </p>

            {/* Category Filter Bar */}
            <div className="projects-filter-bar">
              {projectCategories.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map(proj => (
                <div key={proj.id} className="project-card">
                  <div>
                    <div className="project-card-header">
                      <span className={`project-badge-tag ${proj.badgeColor}`} style={{ color: proj.accentColor }}>
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="project-title">{proj.title}</h3>
                    <h4 className="project-subtitle">{proj.subtitle}</h4>
                    <p className="project-desc">{proj.description}</p>

                    <div className="project-tags">
                      {proj.tags.map(t => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-actions">
                    <a 
                      href={proj.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-icon-link primary"
                      title="View Live Web Application"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-icon-link secondary"
                      title="View GitHub Repository"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: ABOUT US */}
        <section className="section about-section" id="about">
          <div className="container about-grid-layout">
            <div className="about-content">
              <div className="badge-pill">About Us</div>
              <h2 className="section-heading">
                Driven by Purpose,<br />Built on Innovation
              </h2>
              <p className="section-description">
                TrueInspires is a team of passionate creators, developers and problem solvers. We believe in the power of technology to simplify, empower and inspire people and businesses.
              </p>

              <div className="values-row">
                <div className="value-item">
                  <div className="value-icon-circle">
                    <Lightbulb size={20} color="#1E6BFF" />
                  </div>
                  <div className="value-text">
                    <h4 className="value-title">Innovation</h4>
                    <p className="value-desc">Always learning, always building better.</p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="value-icon-circle">
                    <HeartHandshake size={20} color="#1E6BFF" />
                  </div>
                  <div className="value-text">
                    <h4 className="value-title">Client First</h4>
                    <p className="value-desc">Your goals drive our solutions.</p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="value-icon-circle">
                    <ShieldCheck size={20} color="#1E6BFF" />
                  </div>
                  <div className="value-text">
                    <h4 className="value-title">Quality</h4>
                    <p className="value-desc">We deliver what we commit.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-quote-card">
              <div className="quote-icon-circle">
                <svg viewBox="0 0 24 24" fill="#1E6BFF" width="18" height="18">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="quote-bg-abstract" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none">
                  <path d="M30 40 Q 50 10, 80 40 T 70 90 T 20 70 Z" fill="#1E6BFF" opacity="0.9" />
                </svg>
              </div>
              <blockquote className="quote-text">
                &ldquo;We started TrueInspires with a simple belief &mdash; technology should create real value and inspire progress.&rdquo;
              </blockquote>
              <span className="quote-author">&mdash; TrueInspires Team</span>
            </div>
          </div>
        </section>

        {/* SECTION: OUR TEAM */}
        <section className="section team-section" id="team">
          <div className="container">
            <div className="team-header-row">
              <div>
                <div className="badge-pill">Our Team</div>
                <h2 className="section-heading">Meet the Minds Behind TrueInspires</h2>
                <p className="section-description">
                  A passionate team of builders, thinkers and problem solvers working together to create impact.
                </p>
              </div>
              <div className="carousel-controls">
                <button className="carousel-arrow prev" onClick={() => handleTeamNav('prev')} aria-label="Previous Team Member">
                  &#10094;
                </button>
                <button className="carousel-arrow next" onClick={() => handleTeamNav('next')} aria-label="Next Team Member">
                  &#10095;
                </button>
              </div>
            </div>

            <div className="team-cards-grid">
              {teamMembers.map((member, idx) => (
                <div 
                  key={member.id} 
                  className={`team-card ${activeTeamIndex === idx ? 'focused' : ''}`}
                  style={{
                    borderColor: activeTeamIndex === idx ? '#1E6BFF' : '#E5EDF7',
                    boxShadow: activeTeamIndex === idx ? '0 20px 42px -10px rgba(30,107,255,0.18)' : 'var(--shadow-sm)'
                  }}
                >
                  <div className="team-photo-wrap">
                    <img src={member.photo} alt={member.name} className="team-photo" />
                  </div>
                  <div className="team-details">
                    <div className="team-name-row">
                      <h3 className="team-name">{member.name}</h3>
                      <div className="team-social-links">
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="team-social-btn" 
                          aria-label={`${member.name} LinkedIn Profile`}
                          title={`${member.name} on LinkedIn`}
                        >
                          <Linkedin size={15} />
                        </a>
                        <a 
                          href={member.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="team-social-btn" 
                          aria-label={`${member.name} GitHub`}
                          title={`${member.name} on GitHub`}
                        >
                          <Github size={15} />
                        </a>
                      </div>
                    </div>

                    <span className="team-role">{member.role}</span>
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-tags">
                      {member.tags.map(tag => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: HOW WE WORK */}
        <section className="section process-section">
          <div className="container text-center-wrap">
            <div className="badge-pill">How We Work</div>
            <h2 className="section-heading text-center">A Simple Process. Real Results.</h2>
            <p className="section-description text-center">
              We follow a clear and collaborative process to turn your ideas into successful products.
            </p>

            <div className="process-steps-row">
              <div className="process-step-item">
                <div className="process-icon-circle bg-blue-step">
                  <Lightbulb size={24} color="#1E6BFF" />
                </div>
                <div className="process-text">
                  <h4 className="step-title"><strong>01</strong> Discover</h4>
                  <p className="step-desc">Understand your goals, challenges and opportunities.</p>
                </div>
              </div>

              <div className="process-arrow-col" aria-hidden="true">
                <ArrowRight className="process-arrow" color="#94A3B8" size={20} />
              </div>

              <div className="process-step-item">
                <div className="process-icon-circle bg-purple-step">
                  <FileText size={24} color="#8B5CF6" />
                </div>
                <div className="process-text">
                  <h4 className="step-title"><strong>02</strong> Plan</h4>
                  <p className="step-desc">Create a clear strategy and roadmap.</p>
                </div>
              </div>

              <div className="process-arrow-col" aria-hidden="true">
                <ArrowRight className="process-arrow" color="#94A3B8" size={20} />
              </div>

              <div className="process-step-item">
                <div className="process-icon-circle bg-teal-step">
                  <Code2 size={24} color="#0D9488" />
                </div>
                <div className="process-text">
                  <h4 className="step-title"><strong>03</strong> Build</h4>
                  <p className="step-desc">Develop, test and iterate with full transparency.</p>
                </div>
              </div>

              <div className="process-arrow-col" aria-hidden="true">
                <ArrowRight className="process-arrow" color="#94A3B8" size={20} />
              </div>

              <div className="process-step-item">
                <div className="process-icon-circle bg-orange-step">
                  <Rocket size={24} color="#F97316" />
                </div>
                <div className="process-text">
                  <h4 className="step-title"><strong>04</strong> Deliver</h4>
                  <p className="step-desc">Launch and support for long-term success.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CTA BANNER */}
        <section className="section cta-section" id="contact">
          <div className="container">
            <div className="cta-banner-card">
              <div className="cta-text-wrap">
                <div className="badge-pill bg-white">Let's Build Together</div>
                <h2 className="cta-heading">Have an Idea? Let's Bring It to Life.</h2>
                <p className="cta-subheading">
                  Whether you're a startup, a business or an individual, we're here to help you turn your ideas into impactful digital solutions.
                </p>
              </div>
              <div className="cta-actions">
                <button className="btn btn-dark" onClick={() => { setIsModalOpen(true); setModalType('project'); }}>
                  <span>Start a Project</span>
                  <ArrowRight className="icon-arrow" size={16} />
                </button>
                <button className="btn btn-white" onClick={() => { setIsModalOpen(true); setModalType('contact'); }}>
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-wrap">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <a href="#home" className="brand-logo footer-logo">
                <svg className="logo-mark" viewBox="0 0 32 32" fill="none">
                  <rect x="3" y="4" width="7" height="24" rx="3.5" fill="#0A192F" />
                  <rect x="12.5" y="8" width="7" height="20" rx="3.5" fill="#1E6BFF" />
                  <rect x="22" y="14" width="7" height="14" rx="3.5" fill="#38BDF8" />
                </svg>
                <span className="logo-text">TrueInspires</span>
              </a>
              <p className="footer-tagline">Designing, Developing, Delivering.</p>
              <p className="footer-desc">
                We build digital solutions that inspire people and create real impact.
              </p>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#work">Our Work</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title">Our Projects</h4>
              <ul className="footer-links">
                <li><a href="https://doseloop.vercel.app/" target="_blank" rel="noopener noreferrer">DOSELOOP ↗</a></li>
                <li><a href="https://expense-so.vercel.app/" target="_blank" rel="noopener noreferrer">ExpenseSO ↗</a></li>
                <li><a href="https://freshers-party-beige.vercel.app/" target="_blank" rel="noopener noreferrer">Freshers Party ↗</a></li>
                <li><a href="https://cross-fire-three.vercel.app/" target="_blank" rel="noopener noreferrer">CrossFire ↗</a></li>
                <li><a href="https://teacherinvitation.vercel.app/" target="_blank" rel="noopener noreferrer">Teacher Invitation ↗</a></li>
              </ul>
            </div>

            <div className="footer-social-col">
              <h4 className="footer-col-title">Connect With Us</h4>
              <div className="social-icons-row">
                <a 
                  href="https://www.linkedin.com/in/chandan-mahapatra/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn" 
                  aria-label="Chandan Mahapatra LinkedIn"
                  title="Chandan Mahapatra on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sakashdora" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn" 
                  aria-label="S Akash Dora LinkedIn"
                  title="S Akash Dora on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://github.com/sakashdora" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn" 
                  aria-label="GitHub Team Repositories"
                  title="GitHub Repositories"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="mailto:contact@trueinspires.com" 
                  className="social-icon-btn" 
                  aria-label="Email TrueInspires"
                  title="Email Us"
                >
                  <Mail size={18} />
                </a>
              </div>
              <p className="footer-subtext">Let's create something amazing together.</p>
            </div>
          </div>

          <div className="footer-bottom-row">
            <span className="copyright">&copy; 2026 TrueInspires. All rights reserved.</span>
            <span className="tagline-badge">Innovate &bull; Build &bull; Inspire</span>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODAL */}
      <div className={`modal-backdrop ${isModalOpen ? 'active' : ''}`} aria-hidden={!isModalOpen}>
        <div className="modal-card">
          <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
            <X size={18} />
          </button>
          <div className="modal-badge badge-pill">Let's Build Together</div>
          <h3 className="modal-title">
            {modalType === 'talk' ? 'Schedule a Technical Consultation' : 'Start Your Project with TrueInspires'}
          </h3>
          <p className="modal-desc">
            Tell us about your idea and we'll reply within 24 hours with an actionable blueprint.
          </p>

          <form className="modal-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Select Project Scope</label>
              <div className="chip-options">
                {['Web & App', 'AI & Automation', 'UI/UX Design', 'Full MVP'].map(chip => (
                  <button 
                    key={chip}
                    type="button" 
                    className={`chip ${selectedProjectType === chip ? 'active' : ''}`}
                    onClick={() => setSelectedProjectType(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="modalUserName">Your Name</label>
                <input type="text" id="modalUserName" placeholder="e.g. Alex Carter" required />
              </div>
              <div className="form-group">
                <label htmlFor="modalUserEmail">Work Email</label>
                <input type="email" id="modalUserEmail" placeholder="alex@company.com" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modalDetails">Project Overview & Timeline</label>
              <textarea id="modalDetails" rows="3" placeholder="Briefly describe what you'd like to build..." required></textarea>
            </div>

            <button type="submit" className="btn btn-blue btn-full">
              <span>Send Project Brief</span>
              <ArrowRight className="icon-arrow" size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`} role="alert">
        <div className="toast-icon">&#10003;</div>
        <div className="toast-content">
          <strong>Message Sent!</strong>
          <span>Thank you! The TrueInspires team will get back to you shortly.</span>
        </div>
      </div>
    </div>
  );
}
