import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { projects } from './data/projects';
import { teamMembers } from './data/team';

const published = projects.filter(project => !project.isUpcoming);
const featuredProjects = published;
const services = [
  { id: 'websites', title: 'Websites & landing pages', eyebrow: '01 / Core', summary: 'Clear, conversion-minded websites for businesses, portfolios, and new offers.', detail: 'Information architecture, visual direction, responsive development, and a practical route to enquiry.', scope: 'Strategy / content structure / responsive build', related: 'chaiwala', status: 'Core offer' },
  { id: 'commerce', title: 'E-commerce & online stores', eyebrow: '02 / Project fit', summary: 'Product catalogues and ordering experiences scoped around the operational reality.', detail: 'We can explore storefronts, food ordering, or catalogue experiences when fulfilment, payments, and operations are confirmed together.', scope: 'Discovery required / catalogue & ordering UX', related: null, status: 'Discuss feasibility' },
  { id: 'apps', title: 'Web applications & SaaS', eyebrow: '03 / Core', summary: 'Useful browser-based products, dashboards, and interfaces with real state.', detail: 'Product design and front-end systems for interfaces where data, workflows, and decisions need to work together.', scope: 'Product UX / dashboards / application interfaces', related: 'riskrule', status: 'Core offer' },
  { id: 'education', title: 'School & education platforms', eyebrow: '04 / Project fit', summary: 'Helpful digital spaces for institutions, students, families, and programmes.', detail: 'We can shape school sites and education-facing platforms around audience needs, content, and administration requirements.', scope: 'Audience flows / information design / portals', related: 'tejas-2026', status: 'Discuss feasibility' },
  { id: 'events', title: 'Event websites & digital invitations', eyebrow: '05 / Core', summary: 'Invitations, information hubs, RSVP journeys, and event operations.', detail: 'Digital experiences for launches, college events, and programmes with more than one audience or moment.', scope: 'Invitations / RSVP journeys / event operations', related: 'crossfire', status: 'Core offer' },
  { id: 'systems', title: 'ERP & business systems', eyebrow: '06 / Project fit', summary: 'Operational tools for teams that need a clearer shared view of work.', detail: 'We can assess internal dashboards and workflow systems where the right process and access model are defined first.', scope: 'Workflow discovery / operational dashboards', related: 'argus-ai', status: 'Discuss feasibility' },
  { id: 'experience', title: 'UI/UX & interactive experiences', eyebrow: '07 / Core', summary: 'Interfaces with personality, prototype clarity, and useful motion.', detail: 'Visual systems, interaction design, and in-browser prototypes that make a digital idea easier to understand and use.', scope: 'UI systems / prototypes / interaction direction', related: 'doseloop', status: 'Core offer' },
];
const process = [
  { title: 'Discover', artifact: 'The brief', description: 'We ask what the website needs to do, who it is for, and what already exists.' },
  { title: 'Define', artifact: 'The direction', description: 'We shape the page structure, content priorities, and visual language before building.' },
  { title: 'Design & build', artifact: 'The working preview', description: 'A responsive site takes form in the browser, where real interactions can be tested.' },
  { title: 'Refine & launch', artifact: 'The launch checklist', description: 'We check the details, fix what breaks, and make the site ready for people to use.' },
];
const projectHighlights = {
  'chaiwala': ['Brand-led landing experience', 'A clear introduction to the Chaiwala story', 'A responsive route into the live site'],
  'riskrule': ['Multi-broker trade synchronization', 'FIFO lot accounting', 'Rule-based trade discipline analytics'],
  'tejas-2026': ['Student invitation experience', 'Faculty invitation and mentor greetings', 'Event agenda across two audience flows'],
  'crossfire': ['Participant intake across six tracks', 'QR door check-in', 'Judge scoring and calculated leaderboards'],
  'doseloop': ['Four-state dose engine', 'Caregiver circle sharing', 'Scheduled medication reminders'],
  'argus-ai': ['PPE compliance monitoring', 'Fire, smoke, and zone hazard triage', 'Offline LAN resilience and siren relays'],
};
const studioSummaries = {
  chandan: 'Builds React and Next.js systems, trading telemetry, and stateful healthcare interfaces. His work includes RiskRule, DoseLoop, and the TEJAS 2026 digital experiences.',
  akash: 'Works across edge computer vision, cloud infrastructure, and event operations. He led ARGUS AI and CrossFire 2026 and contributed to RiskRule.',
};

const prettyNumber = index => String(index + 1).padStart(2, '0');
const projectPath = project => `/work/${project.id}/`;

function Identity({ footer = false }) {
  if (footer) return <a href="/" className="identity-full" aria-label="True Inspire home"><img src="/assets/true-inspire-logo-blue-primary.png" width="1536" height="1024" alt="True Inspire — यथा कल्पना तथा रचना" /></a>;
  return <a href="/" className="identity" aria-label="True Inspire home"><img src="/assets/true-inspire-logo-blue-navbar.png" width="900" height="178" alt="True Inspire" /></a>;
}

function Header({ floating = false, isHome = false, currentPath = '/' }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const button = useRef(null);
  const firstLink = useRef(null);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > (floating ? Math.max(70, (document.querySelector('.hero, .work-page-hero')?.offsetHeight || window.innerHeight) - 110) : 70));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [floating]);
  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const main = document.getElementById('main');
    const footer = document.querySelector('.site-footer');
    const priorOverflow = document.body.style.overflow;
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    document.body.style.overflow = 'hidden';
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); if (main) main.inert = false; if (footer) footer.inert = false; document.body.style.overflow = priorOverflow; };
  }, [open]);
  const nav = isHome
    ? [{ label: 'Work', href: '#work' }, { label: 'Services', href: '#services' }, { label: 'Studio', href: '#studio' }]
    : [{ label: 'Work', href: '/work/' }, { label: 'Services', href: '/services/' }, { label: 'Studio', href: '/studio/' }];
  const ctaHref = isHome ? '#contact' : '/contact/';
  const isActive = href => !isHome && href.replace(/\/$/, '') === currentPath;
  const closeMenu = () => setOpen(false);
  return <header className={`site-header${floating ? ' site-header--home' : ''}${compact ? ' is-compact' : ''}${open ? ' menu-is-open' : ''}`}>
    <div className="header-inner wrap">
      <Identity />
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => <a href={item.href} key={item.label} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a>)}</nav>
      <a className="button button-small header-cta" href={ctaHref}>Start a project <ArrowUpRight size={16} /></a>
      <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      <a ref={firstLink} href={nav[0].href} onClick={closeMenu}>Work <span>01</span></a><a href={nav[1].href} onClick={closeMenu}>Services <span>02</span></a><a href={nav[2].href} onClick={closeMenu}>Studio <span>03</span></a><a href={ctaHref} onClick={closeMenu}>Start a project <span>04</span></a>
      <p>Independent web design & development studio<br />Odisha, India</p>
    </nav>
  </header>;
}

function ProjectArtwork({ project, small = false }) {
  return <div className={`project-art project-art--${project.id}${small ? ' project-art--small' : ''}`} aria-hidden="true">
    <div className="art-registration"><span>TI / PROJECT ARCHIVE</span><span>✦</span></div>
    <div className="art-main"><span className="art-kicker">{project.category}</span><strong>{project.id === 'tejas-2026' ? 'TEJAS' : project.id === 'argus-ai' ? 'ARGUS' : project.title}</strong><span className="art-subtitle">{project.subtitle}</span></div>
    <div className="art-bottom"><span>{project.collaboration}</span><span>TRUE INSPIRE / {project.id.toUpperCase()}</span></div>
    <span className="art-line art-line-one" /><span className="art-line art-line-two" />
  </div>;
}

function Hero() {
  const scene = useRef(null);
  const tiltScene = event => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    scene.current?.style.setProperty('--scene-rotate-x', `${(-y * 9).toFixed(2)}deg`);
    scene.current?.style.setProperty('--scene-rotate-y', `${(x * 11).toFixed(2)}deg`);
  };
  const resetScene = () => {
    scene.current?.style.setProperty('--scene-rotate-x', '0deg');
    scene.current?.style.setProperty('--scene-rotate-y', '0deg');
  };
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-atmosphere" aria-hidden="true" />
    <div className="hero-gridlines" aria-hidden="true"><i /><i /><i /><i /></div>
    <div className="hero-content wrap hero-rebuild">
      <div className="hero-copy">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-line" />INDEPENDENT DIGITAL STUDIO / ODISHA</p>
        <h1 id="hero-title">Websites and<br /><em>digital experiences</em><br />built to be used.</h1>
        <p className="hero-description">True Inspire designs and develops clear business websites, event journeys, and useful web products — from the first brief to a working release.</p>
        <div className="hero-actions"><a className="button button-ice" href="/contact/">Start a project <ArrowUpRight size={17} /></a><a className="hero-text-link" href="#services"><span className="hero-link-icon"><ArrowDown size={15} /></span>Explore what we build</a></div>
      </div>
      <div className="hero-composition" ref={scene} onPointerMove={tiltScene} onPointerLeave={resetScene} aria-label="True Inspire visual identity">
        <div className="hero-3d-stage">
          <div className="hero-composition-glow" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--outer" aria-hidden="true" /><div className="hero-orbit hero-orbit--inner" aria-hidden="true" />
          <div className="hero-brand-plate"><div className="hero-brand-plate-shine" aria-hidden="true" /><img src="/assets/true-inspire-logo-blue-monogram.png" width="440" height="470" alt="" /><span>TRUE INSPIRE</span><small lang="hi">यथा कल्पना<br />तथा रचना</small></div>
          <div className="hero-signal hero-signal--one"><span>WEB</span><strong>Make the first<br />impression useful.</strong></div>
          <div className="hero-signal hero-signal--two"><span>SYSTEMS</span><strong>Let the work<br />move clearly.</strong></div>
          <div className="hero-signal hero-signal--three"><span>EXPERIENCES</span><strong>Make the moment<br />feel considered.</strong></div>
        </div>
      </div>
    </div>
    <aside className="hero-bottom hero-contact-dock wrap" aria-label="Contact True Inspire">
      <div className="hero-contact-copy"><span>LET’S MAKE SOMETHING USEFUL</span><strong>Have a project, a deadline, or an idea that needs a better digital shape?</strong></div>
      <a className="hero-contact-primary" href="/contact/">Start a project <ArrowUpRight size={16} /></a>
      <a className="hero-contact-secondary" href="/contact/">Talk to a founder <ArrowUpRight size={15} /></a>
    </aside>
  </section>;
}

function Gallery() {
  const [active, setActive] = useState(0);
  const drag = useRef({ x: null, pointerId: null });
  const dragged = useRef(false);
  const projectCount = featuredProjects.length;
  const step = delta => setActive(current => (current + delta + projectCount) % projectCount);
  const relativePosition = index => {
    let distance = index - active;
    if (distance > projectCount / 2) distance -= projectCount;
    if (distance < -projectCount / 2) distance += projectCount;
    return distance;
  };
  const handlePointerDown = event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragged.current = false;
    drag.current = { x: event.clientX, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const handlePointerUp = event => {
    if (drag.current.x === null) return;
    const distance = event.clientX - drag.current.x;
    if (Math.abs(distance) > 42) {
      dragged.current = true;
      step(distance < 0 ? 1 : -1);
    }
    drag.current = { x: null, pointerId: null };
  };
  const handleCardSelection = index => {
    if (dragged.current) { dragged.current = false; return; }
    setActive(index);
  };
  const activeProject = featuredProjects[active];
  return <section className="work-section" id="work" aria-labelledby="work-title">
    <div className="work-heading wrap"><div><p className="eyebrow eyebrow-light">Selected work / {String(projectCount).padStart(2, '0')} projects</p><h2 id="work-title">Built for the<br /><em>world outside.</em></h2></div><p>Different briefs. Distinct answers. Choose a project or drag through the archive.</p></div>
    <div className="coverflow-shell wrap">
      <div className="coverflow-stage" role="region" aria-roledescription="carousel" aria-label="Selected projects" tabIndex="0" onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); step(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); } if (event.key === 'Home') { event.preventDefault(); setActive(0); } if (event.key === 'End') { event.preventDefault(); setActive(projectCount - 1); } }} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { drag.current = { x: null, pointerId: null }; }}>
        <div className="coverflow-atmosphere" style={{ '--project-accent': activeProject.accentColor }} aria-hidden="true" />
        {featuredProjects.map((project, index) => {
          const position = relativePosition(index);
          return <article key={project.id} className={`coverflow-card${position === 0 ? ' is-active' : ''}`} data-position={position} style={{ '--project-accent': project.accentColor }} aria-hidden={Math.abs(position) > 2}>
            <button type="button" className="coverflow-card-button" onClick={() => handleCardSelection(index)} aria-label={position === 0 ? `${project.title} is selected` : `Select ${project.title}`} aria-pressed={position === 0} tabIndex={Math.abs(position) > 2 ? -1 : 0}><ProjectArtwork project={project} /></button>
          </article>;
        })}
        <div className="coverflow-controls" aria-label="Carousel controls" onPointerDown={event => event.stopPropagation()}><button type="button" onClick={() => step(-1)} aria-label="Previous project"><ArrowLeft size={19} /></button><span aria-live="polite">{prettyNumber(active)} <i /> {String(projectCount).padStart(2, '0')}</span><button type="button" onClick={() => step(1)} aria-label="Next project"><ArrowRight size={19} /></button></div>
      </div>
      <div className="coverflow-details" aria-live="polite"><div><p>{activeProject.category}</p><h3>{activeProject.title}</h3><span>{activeProject.collaboration}</span></div><p>{activeProject.subtitle}</p><a className="coverflow-action" href={projectPath(activeProject)}>View case study <ArrowUpRight size={17} /></a></div>
      <div className="coverflow-selectors" aria-label="Choose a project">{featuredProjects.map((project, index) => <button key={project.id} type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} aria-current={active === index ? 'true' : undefined}><span>{prettyNumber(index)}</span><strong>{project.title}</strong></button>)}<p>Editorial project title artwork · Explore each case study for verified scope and live links.</p></div>
    </div>
  </section>;
}

function ServiceVisual({ service, related }) {
  const deliverables = service.scope.split(' / ');
  return <div className={`service-visual service-visual--${service.id}`} aria-hidden="true">
    <div className="service-visual-glare" />
    <div className="service-visual-orbit" />
    <div className="service-visual-sheet"><span>{service.eyebrow}</span>{related?.id === 'chaiwala' ? <img className="chaiwala-service-logo" src="/assets/chaiwala-wordmark.png" width="1440" height="320" alt="" /> : <strong>{service.title.split(' & ')[0]}</strong>}<i>{service.status === 'Core offer' ? 'MAKE IT USEFUL' : 'SCOPE IT FIRST'}</i></div>
    <div className="service-visual-metric"><b>{related ? related.title : 'NEW BRIEF'}</b><span>{related ? related.category : 'DISCOVERY FIRST'}</span></div>
    <div className="service-visual-deliverables">{deliverables.map((item, index) => <span key={item}>{String(index + 1).padStart(2, '0')} / {item}</span>)}</div>
  </div>;
}

function ServicesSection() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const related = service.related ? projects.find(project => project.id === service.related) : null;
  const enquiryHref = `/contact/?service=${encodeURIComponent(service.title)}`;
  return <section className="services-rebuild services-constellation" id="services" aria-labelledby="services-title"><div className="services-starfield" aria-hidden="true" /><div className="wrap"><div className="services-rebuild-intro"><div><p className="eyebrow eyebrow-light">Services / 07 ways in</p><h2 id="services-title">Start with<br /><em>the right tension.</em></h2></div><p>There is no fixed package to force your idea into. Choose the point of entry that feels most true, then we’ll scope the useful next move together.</p></div><div className="services-rebuild-layout"><div className="service-selector-shell"><div className="service-selector-title"><span>SELECT A DIRECTION</span><small>01—07</small></div><div className="service-selector" role="tablist" aria-label="Service categories">{services.map((item, index) => <button key={item.id} role="tab" type="button" aria-selected={active === index} aria-controls="service-detail" id={`service-tab-${item.id}`} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.title}</strong><i>{item.status === 'Core offer' ? 'Core' : 'Fit'}</i></button>)}</div></div><article key={service.id} className={`service-feature service-feature--${service.id}`} id="service-detail" role="tabpanel" aria-labelledby={`service-tab-${service.id}`}><div className="service-feature-copy"><div className="service-feature-top"><span>SELECTED / {service.eyebrow}</span><span className={service.status === 'Core offer' ? 'service-status' : 'service-status service-status--fit'}>{service.status}</span></div><p className="service-feature-kicker">TRUE INSPIRE / SERVICE DISCOVERY</p><h3>{service.title}</h3><p className="service-feature-summary">{service.summary}</p><p>{service.detail}</p><small>What this can include / {service.scope}</small><div className="service-feature-actions"><a className="button" href={enquiryHref}>Start this conversation <ArrowUpRight size={17} /></a>{related ? <a className="underlined-link" href={projectPath(related)}>View the related build <ArrowUpRight size={16} /></a> : <a className="underlined-link" href="/work/">View selected work <ArrowUpRight size={16} /></a>}</div></div><ServiceVisual service={service} related={related} /></article></div></div></section>;
}

function ProcessSection() {
  const [active, setActive] = useState(0);
  return <section className="process-section" id="process" aria-labelledby="process-title"><div className="wrap process-grid"><div className="process-intro"><p className="eyebrow">Our process / From idea to launch</p><h2 id="process-title">Thought through.<br /><em>Built to last.</em></h2><p>Good work takes a clear conversation, a point of view, and the patience to refine what matters.</p></div><div className="process-content"><div key={active} className="artifact" aria-live="polite"><span>TRUE INSPIRE / WORKING DOCUMENT</span><strong>{process[active].artifact}</strong><div className="artifact-rule"><i /></div><small>0{active + 1} / 04 — {process[active].title}</small></div><div className="process-steps">{process.map((step, index) => <button key={step.title} type="button" aria-pressed={active === index} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)}><span>{prettyNumber(index)}</span><span><strong>{step.title}</strong><small>{step.description}</small></span></button>)}</div></div></div></section>;
}

function CreedSection() {
  return <section className="creed-section" aria-labelledby="creed-title"><div className="wrap creed-grid"><p className="eyebrow">The studio creed</p><div><p className="creed-devanagari" lang="hi">यथा कल्पना तथा रचना</p><h2 id="creed-title">The idea deserves<br /><em>the same care in the build.</em></h2><p>True Inspire brings design and development into the same conversation, so the experience remains considered from the first structure through the working release.</p></div><div className="creed-mark" aria-hidden="true"><img src="/assets/true-inspire-logo-blue-monogram.png" width="440" height="470" alt="" /></div></div></section>;
}

function StudioTeaser() {
  return <section className="studio-teaser" id="studio" aria-labelledby="studio-teaser-title"><div className="wrap studio-teaser-grid"><div className="studio-teaser-mark" aria-hidden="true"><div className="studio-teaser-orbit" /><img src="/assets/true-inspire-logo-blue-monogram.png" width="440" height="470" alt="" /></div><div className="studio-teaser-copy"><p className="eyebrow">The studio / <span lang="hi">यथा कल्पना तथा रचना</span></p><h2 id="studio-teaser-title">As imagined.<br /><em>So carefully made.</em></h2><p>True Inspire is a direct design-and-build practice. Strategy, visual direction, interaction, and development stay in the same conversation until the work is ready to use.</p><div className="studio-principles"><span>Clear purpose</span><span>Working detail</span><span>Direct collaboration</span></div><a className="underlined-link" href="/studio/">How the studio works <ArrowUpRight size={16} /></a></div></div></section>;
}

function Closing() {
  return <section className="closing" id="contact" aria-labelledby="closing-title"><div className="closing-noise" aria-hidden="true" /><div className="wrap closing-grid"><div className="closing-copy"><p className="eyebrow eyebrow-light">Start a conversation / True Inspire</p><h2 id="closing-title">The next useful<br /><em>thing starts here.</em></h2><p>Bring the rough outline, a deadline, or a question that needs a better digital shape. We’ll turn it into a clear starting brief together.</p><div className="closing-actions"><a className="button button-ice" href="/contact/">Start a project <ArrowUpRight size={18} /></a><a className="closing-work-link" href="/work/">See how we work <ArrowUpRight size={16} /></a></div><div className="closing-reassurance"><span>01 / Share the brief</span><span>02 / Get a useful next step</span></div></div><div className="closing-composition" aria-hidden="true"><div className="closing-rings"><i /><i /><i /></div><div className="closing-brand-card"><span>TRUE INSPIRE</span><img src="/assets/true-inspire-logo-blue-monogram.png" width="440" height="470" alt="" /><small lang="hi">यथा कल्पना तथा रचना</small></div><div className="closing-note closing-note--one">CLARITY<br />BEFORE CLICKS</div><div className="closing-note closing-note--two">DESIGN<br />THAT WORKS</div></div></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-grid"><div className="footer-identity"><Identity footer /><p>Independent web design & development studio<br />Odisha, India</p></div><nav aria-label="Footer navigation"><a href="/work/">Work</a><a href="/services/">Services</a><a href="/studio/">Studio</a><a href="/contact/">Start a project</a><a href="/privacy/">Privacy</a></nav><div className="footer-contact"><span>Verified founder profiles</span>{teamMembers.map(person => <a key={person.id} href={person.linkedin} target="_blank" rel="noreferrer">{person.name} <ArrowUpRight size={14} /></a>)}</div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} True Inspire</span><span>Designing the imagined into the usable.</span><a href="#top">Back to top ↑</a></div></footer>;
}

function Home() { return <><Hero /><ServicesSection /><Gallery /><ProcessSection /><CreedSection /><StudioTeaser /><Closing /></>; }

function Breadcrumbs({ current, parent }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>{parent && <><span aria-hidden="true">/</span><a href={parent.href}>{parent.label}</a></>}<span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>;
}

function PageIntro({ label, title, text }) { const current = label.split('/')[0].trim(); return <div className="page-intro wrap"><Breadcrumbs current={current} /><p className="eyebrow">{label}</p><h1>{title}</h1><p>{text}</p></div>; }

function WorkPage() {
  const lead = projects.find(project => project.id === 'riskrule');
  const remaining = published.filter(project => project.id !== lead.id);
  return <main id="main" className="work-page">
    <section className="work-page-hero" aria-labelledby="work-page-title"><div className="wrap work-page-hero-grid"><div className="work-page-hero-copy"><Breadcrumbs current="Work" /><p className="eyebrow eyebrow-light">True Inspire / Selected work</p><h1 id="work-page-title">Work made<br /><em>for the real world.</em></h1><p>Products, invitations, and systems built for actual use. Each project has a different job to do and a different story behind it.</p><a href="#projects" className="work-page-scroll">Explore {published.length} projects <ArrowDown size={17} /></a></div><a className="work-feature-panel" href={projectPath(lead)} aria-label="Explore RiskRule case study"><div className="work-feature-top"><span>Featured project / 01</span><span>{lead.category}</span></div><ProjectArtwork project={lead} /><div className="work-feature-caption"><div><span>{lead.collaboration}</span><strong>{lead.title}</strong></div><ArrowUpRight size={24} /></div><small>Editorial project artwork · Read the case study for actual scope.</small></a></div></section>
    <section className="work-page-projects" id="projects" aria-labelledby="project-archive-title"><div className="wrap"><div className="work-page-projects-head"><div><p className="eyebrow">02–05 / Project archive</p><h2 id="project-archive-title">Different briefs.<br /><em>Distinct answers.</em></h2></div><p>Explore the work by what each project needed to do, from a two-audience invitation to a factory safety system.</p></div><div className="work-project-grid">{remaining.map((project, index) => <a key={project.id} className={`work-project-card work-project-card--${project.id}`} href={projectPath(project)} aria-label={`Explore ${project.title} case study`}><ProjectArtwork project={project} /><div className="work-project-glass"><div><span>0{index + 2} / {project.category}</span><strong>{project.title}</strong><p>{projectHighlights[project.id][0]}</p></div><ArrowUpRight size={22} /></div></a>)}</div><p className="work-page-disclosure">Project visuals are editorial title artwork. Each case page identifies the actual scope and links to a live project or repository where available.</p></div></section>
    <section className="work-page-end"><div className="wrap"><p className="eyebrow">Your project / Next</p><h2>Have a brief that<br /><em>doesn’t fit a template?</em></h2><a className="button" href="/contact/">Start a conversation <ArrowUpRight size={17} /></a></div></section>
  </main>;
}

function ProjectPage({ project }) { const repositoryOnly = project.live?.includes('github.com'); return <main id="main" className="interior case-page"><div className="wrap"><Breadcrumbs current={project.title} parent={{ label: 'Work', href: '/work/' }} /><a className="back-link" href="/work/"><ArrowLeft size={17} /> All work</a><div className="case-heading"><p className="eyebrow">Selected work / {project.category}</p><h1>{project.title}</h1><p>{project.subtitle}</p></div><ProjectArtwork project={project} /><p className="art-disclosure">Editorial project artwork. Visit the project for its real interface and details.</p><div className="case-content"><div><span className="eyebrow">The project</span><h2>What it does.</h2></div><div><p>{project.description}</p><p className="case-credit">{project.collaboration}</p><div className="case-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="case-actions">{project.destinations ? project.destinations.map(dest => <a key={dest.url} className="button" href={dest.url} target="_blank" rel="noreferrer">{dest.label} <ArrowUpRight size={16} /></a>) : <>{project.live && <a className="button" href={project.live} target="_blank" rel="noreferrer">{repositoryOnly ? 'Explore repository' : 'Visit live project'} <ArrowUpRight size={16} /></a>}{project.github && !repositoryOnly && <a className="underlined-link" href={project.github} target="_blank" rel="noreferrer">Explore source <ArrowUpRight size={16} /></a>}</>}</div></div></div><div className="case-highlights"><p className="eyebrow">Inside the work</p><div>{projectHighlights[project.id].map((highlight, index) => <div key={highlight}><span>{prettyNumber(index)}</span><h2>{highlight}</h2></div>)}</div></div><a href="/work/" className="next-project">Back to the project archive <ArrowUpRight size={20} /></a></div></main>; }

function ServicesPage() { return <main id="main" className="interior"><PageIntro label="Services / True Inspire" title={<>The right shape<br /><em>for your idea.</em></>} text="We design and build digital places with a clear purpose, from an independent business website to a full product experience." /><div className="service-page-list wrap">{services.map((service, index) => <article key={service.title}><span>0{index + 1}</span><div><h2>{service.title}</h2><p>{service.detail}</p><small>{service.scope}</small></div></article>)}</div><div className="page-cta wrap"><h2>Tell us what you need.</h2><a className="button" href="/contact/">Start a conversation <ArrowUpRight size={17} /></a></div></main>; }

function StudioPage() { return <main id="main" className="studio-page studio-page-rebuilt">
  <section className="studio-rebuild-hero" aria-labelledby="studio-title"><div className="wrap studio-rebuild-grid"><div><Breadcrumbs current="Studio" /><p className="eyebrow eyebrow-light">True Inspire / Studio practice</p><h1 id="studio-title">The idea and<br /><em>the implementation</em><br />belong together.</h1><p><span lang="hi">यथा कल्पना तथा रचना</span> — as imagined, so created. We make digital work feel intentional from the first structure to the final interaction.</p><a className="button button-ice" href="/contact/">Discuss a project <ArrowUpRight size={17} /></a></div><div className="studio-rebuild-symbol" aria-hidden="true"><span lang="hi">यथा<br />कल्पना</span><div><img src="/assets/true-inspire-logo-blue-monogram.png" width="440" height="470" alt="" /></div><span lang="hi">तथा<br />रचना</span></div></div></section>
  <section className="studio-method wrap" aria-labelledby="method-title"><p className="eyebrow">How we work</p><h2 id="method-title">No hand-off between<br /><em>the concept and the craft.</em></h2><div className="studio-method-grid"><article><span>01</span><h3>Start with the useful question.</h3><p>What should this website, invitation, or product actually help someone do?</p></article><article><span>02</span><h3>Give it a distinct shape.</h3><p>Structure, language, interface, and interaction are considered as one experience.</p></article><article><span>03</span><h3>Build it where it can be tested.</h3><p>The work takes form in the browser, where the details can earn their place.</p></article></div></section>
  <section className="studio-capabilities"><div className="wrap"><p className="eyebrow">Working capabilities</p><div className="studio-capabilities-copy"><h2>Design direction,<br /><em>development thinking.</em></h2><p>True Inspire works across business websites, event experiences, application interfaces, and technical web foundations. The exact fit is scoped with the project rather than implied by a generic package.</p></div><div className="studio-capability-list"><span>Information architecture</span><span>Interface systems</span><span>Responsive web development</span><span>Interaction & motion</span><span>Application interfaces</span><span>Technical foundations</span></div></div></section>
  <section className="studio-contact-strip"><div className="wrap"><p className="eyebrow eyebrow-light">A direct conversation</p><h2>Bring the rough idea.<br /><em>We’ll find its working form.</em></h2><a className="button button-ice" href="/contact/">Start a project <ArrowUpRight size={17} /></a></div></section>
</main>; }

function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [brief, setBrief] = useState(() => ({ name: '', email: '', service: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('service') || '' : '', details: '', budget: '', timeline: '' }));
  const update = event => setBrief(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async event => {
    event.preventDefault();
    const nextErrors = {};
    if (!brief.name.trim()) nextErrors.name = 'Tell us your name.';
    if (!/^\S+@\S+\.\S+$/.test(brief.email)) nextErrors.email = 'Add a valid email address.';
    if (!brief.details.trim()) nextErrors.details = 'Give us a short outline of the project.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setStatus('error'); return; }
    const formattedBrief = `TRUE INSPIRE PROJECT BRIEF\n\nName: ${brief.name}\nEmail: ${brief.email}\nService: ${brief.service || 'Not selected'}\nProject: ${brief.details}\nBudget: ${brief.budget || 'Not selected'}\nTimeline: ${brief.timeline || 'Not selected'}`;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable');
      await navigator.clipboard.writeText(formattedBrief);
      setStatus('ready');
    }
    catch { setStatus('ready-no-copy'); }
  };
  return <main id="main" className="interior contact-page"><PageIntro label="Contact / True Inspire" title={<>Start with<br /><em>a useful brief.</em></>} text="Share the essentials. We will format your brief so you can send it through a verified founder profile while the studio’s direct enquiry delivery is being configured." /><div className="contact-layout wrap"><form className="brief-form" noValidate onSubmit={submit} aria-describedby="brief-note"><div className="brief-form-head"><p className="eyebrow">Project brief / 01</p><p id="brief-note">This form does not send your details to a server. It prepares a private brief on your device for you to share.</p></div>{status === 'error' && <div className="form-message form-message--error" role="alert">Please correct the highlighted fields.</div>}<div className="brief-form-grid"><label>Name<input name="name" value={brief.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <small id="name-error">{errors.name}</small>}</label><label>Email<input type="email" name="email" value={brief.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <small id="email-error">{errors.email}</small>}</label><label>What do you need?<select name="service" value={brief.service} onChange={update}><option value="">Choose a service (optional)</option>{services.map(service => <option key={service.title} value={service.title}>{service.title}</option>)}</select></label><label>Budget range<select name="budget" value={brief.budget} onChange={update}><option value="">Not sure yet</option><option value="Under ₹50,000">Under ₹50,000</option><option value="₹50,000–₹1,50,000">₹50,000–₹1,50,000</option><option value="₹1,50,000+">₹1,50,000+</option></select></label><label className="brief-form-wide">Project outline<textarea name="details" rows="6" value={brief.details} onChange={update} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? 'details-error' : undefined} placeholder="What are you trying to make, who is it for, and what needs to happen?" />{errors.details && <small id="details-error">{errors.details}</small>}</label><label className="brief-form-wide">Ideal timeline<input name="timeline" value={brief.timeline} onChange={update} placeholder="For example: next month or flexible" /></label></div><div className="brief-form-actions"><button className="button" type="submit">Prepare project brief <ArrowUpRight size={17} /></button>{status === 'ready' && <p className="form-message" role="status">Your brief is copied. Choose a founder below, open LinkedIn, and paste it into a message.</p>}{status === 'ready-no-copy' && <p className="form-message" role="status">Your brief is ready. Copy the details from the fields and send them through a founder profile below.</p>}</div></form><aside className="contact-aside"><p className="eyebrow">Direct conversation / 02</p><h2>Talk to the people who build the work.</h2><p>Choose the founder whose background feels closest to your project. A direct enquiry delivery service has not been configured yet, so LinkedIn is the verified contact route.</p><div className="contact-links">{teamMembers.map(person => <a key={person.id} href={person.linkedin} target="_blank" rel="noreferrer"><span>Connect with</span><strong>{person.name}</strong><small>{person.role}</small><ArrowUpRight size={22} /></a>)}</div><a className="contact-privacy" href="/privacy/">How this page handles your information <ArrowUpRight size={15} /></a></aside></div></main>;
}

function PrivacyPage() { return <main id="main" className="interior privacy-page"><PageIntro label="Privacy / True Inspire" title={<>A clear note<br /><em>about your information.</em></>} text="This is the current privacy notice for the website experience. It will be updated when a hosted enquiry delivery service is configured." /><div className="privacy-content wrap"><section><h2>What this site does today</h2><p>The project-brief form does not send form entries to a True Inspire server. It prepares a brief in your browser for you to share through the founder links you choose to open.</p></section><section><h2>Third-party links</h2><p>Founder profiles, live projects, repositories, fonts, and other external links are governed by their own services once you leave this site.</p></section><section><h2>Cookies and analytics</h2><p>No first-party analytics or advertising tracker is configured in this source. This statement will be reviewed before new analytics, a form provider, or other third-party tools are added.</p></section><section><h2>Future enquiries</h2><p>Before direct form delivery is enabled, True Inspire will publish the receiving contact, the service provider, the purpose of processing, and retention details.</p></section></div></main>; }

export default function App({ initialPath }) {
  const pathname = initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const isHome = cleanPath === '/';
  const project = cleanPath.startsWith('/work/') ? projects.find(item => cleanPath === `/work/${item.id}` && !item.isUpcoming) : null;
  useEffect(() => {
    const titles = { '/': 'True Inspire — Web Design & Development Studio in Odisha', '/work': 'Selected Work — True Inspire', '/services': 'Website & Product Services — True Inspire', '/studio': 'Our Studio — True Inspire', '/contact': 'Start a Project — True Inspire', '/privacy': 'Privacy — True Inspire' };
    document.title = project ? `${project.title} — True Inspire Work` : titles[cleanPath] || 'Page Not Found — True Inspire';
  }, [cleanPath, project]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    if (reduced.matches || !desktop.matches) return;
    let cancelled = false;
    let cleanup = () => {};
    void (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ duration: 0.85, smoothWheel: true, wheelMultiplier: 0.9 });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = time => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => { gsap.ticker.remove(tick); lenis.destroy(); };
    })();
    return () => { cancelled = true; cleanup(); };
  }, []);
  useEffect(() => {
    if (!isHome || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let cleanup = () => {};
    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px)', () => {
        const tween = gsap.to('.hero-atmosphere', { yPercent: 9, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.4 } });
        return () => tween.kill();
      });
      const reveals = gsap.utils.toArray('.work-heading h2, .section-top h2, .process-intro h2, .people-heading h2, .closing h2').map(element => gsap.fromTo(element, { y: 18, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } }));
      cleanup = () => { reveals.forEach(tween => tween.kill()); media.revert(); };
    })();
    return () => { cancelled = true; cleanup(); };
  }, [isHome]);
  let content;
  if (isHome) content = <main id="main"><Home /></main>;
  else if (cleanPath === '/work') content = <WorkPage />;
  else if (project) content = <ProjectPage project={project} />;
  else if (cleanPath === '/services') content = <ServicesPage />;
  else if (cleanPath === '/studio') content = <StudioPage />;
  else if (cleanPath === '/contact') content = <ContactPage />;
  else if (cleanPath === '/privacy') content = <PrivacyPage />;
  else content = <main id="main" className="interior"><PageIntro label="404 / Page not found" title={<>This page<br /><em>isn’t here.</em></>} text="The address may have changed. The work is still easy to find." /><div className="wrap page-cta"><a className="button" href="/">Return home <ArrowUpRight size={17} /></a></div></main>;
  return <div className="site" id="top"><a className="skip-link" href="#main">Skip to content</a><Header floating={isHome || cleanPath === '/work'} isHome={isHome} currentPath={cleanPath} />{content}<Footer /></div>;
}
