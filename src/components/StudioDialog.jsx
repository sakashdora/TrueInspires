import { useEffect, useId, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, X } from 'lucide-react';
import { teamMembers } from '../data/team';

function Dialog({ children, title, eyebrow, onClose, returnFocus }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const element = ref.current;
    const previousFocus = returnFocus || document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected && previousFocus.getClientRects().length) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog ref={ref} className="studio-dialog" aria-labelledby={titleId} onKeyDown={(event) => {
      if (event.key !== 'Tab') return;
      const controls = [...event.currentTarget.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')].filter((element) => element.getClientRects().length);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
      <div className="dialog-header"><div><p className="micro-label">{eyebrow}</p><h2 id={titleId}>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={22} /></button></div>
      {children}
    </dialog>
  );
}

export function ContactDialog({ onClose, returnFocus }) {
  return (
    <Dialog title="Tell us what’s on your mind." eyebrow="A conversation starts here" onClose={onClose} returnFocus={returnFocus}>
      <p className="dialog-intro">An idea, a technical challenge, or something you’re still figuring out. We’d like to hear it.</p>
      <p className="contact-dialog-label">Connect with the founders on LinkedIn</p>
      <div className="contact-people">{teamMembers.map(member => <a className="contact-person" key={member.id} href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`Connect with ${member.name} on LinkedIn (opens in a new tab)`}>
        <img src={member.photo} alt="" width="64" height="64" />
        <span><strong>{member.name}</strong><small>{member.role}</small><span className="contact-person-link"><Linkedin size={14} />Connect on LinkedIn</span></span>
        <ArrowUpRight size={20} />
      </a>)}</div>
    </Dialog>
  );
}

export function ProjectDialog({ project, onClose, returnFocus }) {
  const repositoryOnly = project.live?.includes('github.com');
  return (
    <Dialog title={project.title} eyebrow={project.category} onClose={onClose} returnFocus={returnFocus}>
      <p className="project-dialog-subtitle">{project.subtitle}</p>
      <p className="dialog-intro">{project.description}</p>
      <p className="project-dialog-credit">{project.collaboration}</p>
      <div className="project-tech-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="project-dialog-actions">
        {project.isUpcoming ? <p className="development-note"><span />In active development. We’ll share more when it’s ready.</p> : project.destinations ? project.destinations.map((destination) => (
          <a className="button" key={destination.url} href={destination.url} target="_blank" rel="noreferrer">{destination.label}<ArrowUpRight size={16} /></a>
        )) : (
          <>{project.live && !repositoryOnly && <a className="button" href={project.live} target="_blank" rel="noreferrer">Visit {project.title}<ArrowUpRight size={16} /></a>}{project.github && <a className={repositoryOnly ? 'button' : 'text-link'} href={project.github} target="_blank" rel="noreferrer"><Github size={16} />Explore source<ArrowUpRight size={15} /></a>}</>
        )}
      </div>
    </Dialog>
  );
}

export function InfoDialog({ info, onClose, returnFocus }) {
  return <Dialog title={info.title} eyebrow="True Inspire / Studio" onClose={onClose} returnFocus={returnFocus}>
    <p className="project-dialog-subtitle">{info.description}</p>
    <p className="dialog-intro">{info.detail}</p>
    <div className="project-tech-list">{info.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <a className="text-link" href="#team" onClick={onClose}>Meet the founders<ArrowUpRight size={16} /></a>
  </Dialog>;
}
