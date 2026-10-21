import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Lenis from 'lenis';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Code2, Cpu, House, Layers, Mail, Menu, Moon, Pause, Play, Share2, SlidersHorizontal, Sun, Users, X } from 'lucide-react';
import { projects, projectCategories } from './data/projects';
import { teamMembers } from './data/team';
import { BrandMark } from './components/BrandMark';
import SpatialScene from './components/SpatialScene';
import { FloatingProjects, ProjectPreview } from './components/ProjectPreview';
import { ContactDialog, InfoDialog, ProjectDialog } from './components/StudioDialog';

const featuredIds = ['argus-ai', 'riskrule', 'doseloop'];
const capabilities = [
  { title: 'Web experiences', icon: Code2, description: 'Thoughtful interfaces. Solid engineering.', detail: 'Responsive web applications, product interfaces, and interactive experiences. We bring design and engineering together, from the first sketch to the final interaction.', tags: ['React & Next.js', 'TypeScript', 'Responsive interfaces'] },
  { title: 'Edge intelligence', icon: Cpu, description: 'Intelligence close to the problem.', detail: 'On-device computer vision for industrial safety and hazard detection. Systems designed around real-time alerts and local-network resilience.', tags: ['Computer vision', 'ONNX & OpenVINO', 'Real-time systems'] },
  { title: 'Connected systems', icon: Share2, description: 'The connections that make a product work.', detail: 'APIs, databases, cloud infrastructure, and event operations. Reliable foundations that connect people, information, and the tools they use.', tags: ['API integration', 'PostgreSQL & Supabase', 'Cloud systems'] },
];
const studio = { title: 'A small studio. A shared ambition.', description: 'Independent software & applied systems · Odisha, India', detail: 'True Inspire is founded by Chandan Mahapatra and S Akash Dora. We design and build web experiences, edge AI systems, and connected products. Different perspectives, the same care for the work.', tags: ['Bhubaneswar / Jeypore', 'Design & engineering', 'यथा कल्पना तथा रचना'] };
const sectionLinks = [{ id: 'home', label: 'Home', icon: House }, { id: 'work', label: 'Selected work', icon: Layers }, { id: 'team', label: 'Members', icon: Users }, { id: 'contact', label: 'Contact', icon: Mail }];

function Brand() {
  return <a className="brand" href="#home" aria-label="True Inspire home"><BrandMark /><span>TRUE INSPIRE</span></a>;
}

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('All Work');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const menuButton = useRef(null);
  const explicitTheme = useRef(false);
  const themeTransition = useRef(null);
  const lenisRef = useRef(null);

  // Synchronize theme token on root element and meta tag
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080608' : '#F7F1E8');
  }, [theme]);

  // System theme, reduced motion, and storage sync
  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: light)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const followSystem = () => {
      if (explicitTheme.current) return;
      try { if (['light', 'dark'].includes(localStorage.getItem('to-inspire-theme'))) return; } catch { /* Storage is optional. */ }
      setTheme(preference.matches ? 'light' : 'dark');
    };
    const syncTheme = (event) => {
      if (event.key !== 'to-inspire-theme' && event.key !== null) return;
      explicitTheme.current = false;
      setTheme(['light', 'dark'].includes(event.newValue) ? event.newValue : preference.matches ? 'light' : 'dark');
    };
    const syncMotion = () => setReducedMotion(motion.matches);
    preference.addEventListener('change', followSystem);
    motion.addEventListener('change', syncMotion);
    window.addEventListener('storage', syncTheme);
    return () => { preference.removeEventListener('change', followSystem); motion.removeEventListener('change', syncMotion); window.removeEventListener('storage', syncTheme); };
  }, []);

  // Lenis smooth-scroll initialization
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global anchor click interception for buttery-smooth scrolling
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        setMenuOpen(false);
        lenis.scrollTo(target, { offset: -70 });
        history.pushState(null, '', href);
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Pause Lenis when modal dialog is open to prevent background scrolling
  useEffect(() => {
    if (dialog) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [dialog]);

  // Track header scroll state for glass elevation
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal observer for section entrance choreography
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    const targets = document.querySelectorAll('.reveal-target');
    targets.forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [category]);

  // Mobile menu keyboard accessibility
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    const desktop = window.matchMedia('(min-width: 761px)');
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => { window.removeEventListener('keydown', onKey); desktop.removeEventListener('change', onResize); };
  }, [menuOpen]);

  // Active section indicator
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-12% 0px -58% 0px', threshold: 0 });
    sectionLinks.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  function chooseTheme(next) {
    if (next === theme) return;
    explicitTheme.current = true;
    try { localStorage.setItem('to-inspire-theme', next); } catch { /* Storage is optional. */ }
    themeTransition.current?.skipTransition();
    if (reducedMotion || !document.startViewTransition) {
      setTheme(next);
      return;
    }
    // Capture both the DOM and the WebGL scene in the same short crossfade.
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    themeTransition.current = transition;
    transition.finished.finally(() => {
      if (themeTransition.current === transition) themeTransition.current = null;
    }).catch(() => { /* A newer toggle can supersede this visual transition. */ });
  }

  function openDialog(value) {
    const returnFocus = menuOpen ? menuButton.current : document.activeElement;
    setMenuOpen(false);
    setDialog({ ...value, returnFocus });
  }

  const openContact = () => openDialog({ type: 'contact' });
  const visible = projects.filter(project => category === 'All Work' || project.category === category);
  const featured = featuredIds.map(id => visible.find(project => project.id === id)).filter(Boolean);
  const otherWork = visible.filter(project => !featuredIds.includes(project.id));
  const motionPaused = paused || reducedMotion;

  return <div className="site" data-motion={motionPaused ? 'paused' : 'playing'}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work</a><button onClick={() => openDialog({ type: 'info', info: studio })}>Studio</button><a href="#team">Members</a></nav>
        <div className="header-actions">
          <div className="theme-switch" aria-label="Color theme"><button className="icon-button" aria-label="Use light mode" aria-pressed={theme === 'light'} onClick={() => chooseTheme('light')}><Sun size={17} /></button><button className="icon-button" aria-label="Use dark mode" aria-pressed={theme === 'dark'} onClick={() => chooseTheme('dark')}><Moon size={17} /></button></div>
          <button className="icon-button mobile-theme-toggle" aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => chooseTheme(theme === 'dark' ? 'light' : 'dark')}><Sun className="theme-sun" size={19} /><Moon className="theme-moon" size={19} /></button>
          <button className="button button--small header-contact" onClick={openContact}>Let’s talk <ArrowUpRight size={15} /></button>
          <button ref={menuButton} className="icon-button menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}>
        <a href="#work" onClick={() => setMenuOpen(false)}>Work <ArrowUpRight size={17} /></a><button onClick={() => openDialog({ type: 'info', info: studio })}>Studio <ArrowUpRight size={17} /></button><a href="#team" onClick={() => setMenuOpen(false)}>Members <ArrowUpRight size={17} /></a><button className="button" onClick={openContact}>Let’s talk <ArrowUpRight size={17} /></button>
      </nav>
    </header>
    <nav className="side-nav" aria-label="Page sections">{sectionLinks.map(({ id, label, icon: Icon }) => <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : ''} aria-label={label} aria-current={activeSection === id ? 'location' : undefined}><Icon size={18} /><span>{label}</span></a>)}<i aria-hidden="true" /></nav>
    <main id="main" tabIndex="-1">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-atmosphere" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-stage shell">
          <SpatialScene theme={theme} paused={motionPaused} />
          <FloatingProjects />
        </div>
        <div className="hero-copy shell">
          <h1 id="hero-title" lang="sa">यथा कल्पना<br /><span>तथा रचना</span></h1>
          <p className="hero-description">We design and engineer digital experiences.<br className="desktop-break" /> From intelligent systems to thoughtful interfaces.</p>
          <div className="hero-actions"><a className="button" href="#work">Explore our work <ArrowUpRight size={17} /></a><a className="button button--outline" href="#team">Meet the makers</a></div>
          <a className="founder-byline" href="#team"><span className="avatar-stack">{teamMembers.map(member => <img key={member.id} src={member.photo} width="38" height="38" alt="" />)}</span><span>Chandan Mahapatra &amp; S Akash Dora</span><ArrowUpRight size={13} /></a>
          <div><a href="#work" className="hero-scroll-cue" aria-label="Scroll to selected work"><span>Scroll to explore</span><ChevronDown size={14} /></a></div>
        </div>
        <div className="capability-dock" aria-label="Explore our capabilities">{capabilities.map(({ icon: Icon, ...info }) => <button key={info.title} onClick={() => openDialog({ type: 'info', info })}><span className="dock-icon"><Icon size={24} strokeWidth={1.6} /></span><span>{info.title}</span><ChevronRight size={16} className="dock-arrow" /></button>)}</div>
        <div className="motion-row"><button className="motion-toggle" disabled={reducedMotion} onClick={() => setPaused(!paused)} aria-label={reducedMotion ? 'Reduced motion enabled' : paused ? 'Play scene animation' : 'Pause scene animation'}>{motionPaused ? <Play size={12} /> : <Pause size={12} />}<span>{reducedMotion ? 'Reduced motion' : paused ? 'Play motion' : 'Pause motion'}</span></button></div>
      </section>

      <section className="work-section shell reveal-target" id="work" aria-labelledby="work-title" tabIndex="-1">
        <div className="section-heading-row"><div><p className="section-label">01 / SELECTED WORK</p><h2 id="work-title">Proof, in every project.</h2></div><p className="section-intro">Real problems. Thoughtful technology.<br />From applied AI to intuitive products,<br />we build what matters.</p><button className={`icon-button filter-toggle${filtersOpen ? ' is-active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)} aria-label="Filter projects" aria-expanded={filtersOpen} aria-controls="project-filters"><SlidersHorizontal size={18} /></button></div>
        <div className="project-filters" id="project-filters" hidden={!filtersOpen} aria-label="Filter projects by category">{projectCategories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <p className="sr-only" role="status">{visible.length} projects shown for {category}.</p>
        {featured.length > 0 && <div className="project-grid">{featured.map(project => <article className={`project project--${project.id}`} key={project.id}>
          <button className="project-visual-button" aria-label={`View ${project.title} project details`} onClick={() => openDialog({ type: 'project', project })}><ProjectPreview type={project.id} /><span className="project-view"><ArrowUpRight size={17} /></span></button>
          <div className="project-copy"><div><h3><button onClick={() => openDialog({ type: 'project', project })}>{project.title}</button></h3><p>{project.category}</p></div><button className="icon-button project-arrow" aria-label={`Read about ${project.title}`} onClick={() => openDialog({ type: 'project', project })}><ArrowRight size={18} /></button></div>
        </article>)}</div>}
        <p className="preview-note">Illustrative product previews. Explore each project for details and links.</p>
        {otherWork.length > 0 && <div className="project-index"><span>Also from the studio</span>{otherWork.map(project => <button key={project.id} onClick={() => openDialog({ type: 'project', project })}>{project.isUpcoming ? <span>Social platform <small>· In development</small></span> : project.id === 'tejas-2026' ? 'TEJAS 2026' : project.title}{!project.isUpcoming && <ArrowUpRight size={13} />}</button>)}</div>}
      </section>

      <section className="team-section shell reveal-target" id="team" aria-labelledby="team-title" tabIndex="-1">
        <div className="team-intro"><p className="section-label">02 / THE PEOPLE</p><h2 id="team-title">Two minds.<br />One shared ambition.</h2><p>Different perspectives. A shared belief in technology that creates real value.<br />We build, learn, and ship together.</p></div>
        <div className="founders">{teamMembers.map(member => <article className={`founder founder--${member.id}`} key={member.id}>
          <div className="founder-photo"><img src={member.photo} alt={`${member.name}, Co-Founder and Developer`} width="320" height="320" loading="lazy" /></div>
          <div className="founder-info"><h3>{member.name}</h3><p className="founder-role">{member.role}</p><p className="founder-focus">{member.id === 'chandan' ? 'Full-stack systems · Product engineering' : 'Edge AI · Computer vision'}</p><div className="social-links"><a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} on GitHub`}>GitHub <ArrowUpRight size={13} /></a><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>LinkedIn <ArrowUpRight size={13} /></a></div></div>
        </article>)}</div>
      </section>

      <section className="contact-section shell reveal-target" id="contact" aria-labelledby="contact-title">
        <div className="contact-orb" aria-hidden="true"><BrandMark /></div>
        <div className="contact-copy"><p className="section-label">03 / YOUR NEXT CHAPTER</p><h2 id="contact-title">What could we<br /><span>build together?</span></h2><p>Every great project starts with a conversation.</p></div>
        <button className="contact-trigger" onClick={openContact}><span>Let’s talk</span><span className="contact-trigger-icon"><ArrowUpRight size={24} /></span></button>
      </section>
    </main>
    <footer className="site-footer shell"><div className="footer-main"><div className="footer-brand"><Brand /><span>Independent minds. Shared possibilities.<br />Odisha, India</span></div><nav className="footer-nav" aria-label="Footer navigation"><a href="#work">Work</a><a href="#team">Members</a><a href="#home" className="back-to-top">Back to top <ArrowUpRight size={15} /></a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} True Inspire</span><span className="sanskrit" lang="sa">यथा कल्पना तथा रचना</span><span>Designed with intent. Built with care.</span></div></footer>
    {dialog?.type === 'contact' && <ContactDialog returnFocus={dialog.returnFocus} onClose={() => setDialog(null)} />}
    {dialog?.type === 'project' && <ProjectDialog project={dialog.project} returnFocus={dialog.returnFocus} onClose={() => setDialog(null)} />}
    {dialog?.type === 'info' && <InfoDialog info={dialog.info} returnFocus={dialog.returnFocus} onClose={() => setDialog(null)} />}
  </div>;
}
