import { Activity, ArrowUpRight, Bell, BookOpen, Check, ChevronRight, Code2, LayoutGrid, ShieldCheck, SlidersHorizontal, Video } from 'lucide-react';

function Chart({ small = false }) {
  return <svg className={small ? 'mini-chart' : 'journal-chart'} viewBox="0 0 400 125" preserveAspectRatio="none" aria-hidden="true"><path className="chart-area" d="M0 112 L20 100 L40 103 L60 82 L78 94 L98 67 L118 76 L139 61 L160 68 L180 43 L201 52 L222 30 L244 44 L266 23 L287 36 L309 13 L330 22 L350 7 L374 16 L400 2 L400 125 L0 125Z" /><path className="chart-line" d="M0 112 L20 100 L40 103 L60 82 L78 94 L98 67 L118 76 L139 61 L160 68 L180 43 L201 52 L222 30 L244 44 L266 23 L287 36 L309 13 L330 22 L350 7 L374 16 L400 2" /></svg>;
}

export function FloatingProjects() {
  return <div className="floating-projects" aria-hidden="true">
    <div className="floating-panel code-panel"><div className="window-bar"><span className="window-dots"><i /><i /><i /></span><Code2 size={13} /></div><div className="code-tab"><Code2 size={13} /> app.py <span>×</span></div><div className="code-body"><div><i>1</i><span><b>from</b> vision <b>import</b> detect</span></div><div><i>2</i><span><b>import</b> cv2</span></div><div><i>3</i><span /></div><div><i>4</i><span>frame = cv2.imread(<em>'factory.jpg'</em>)</span></div><div><i>5</i><span>results = detect(frame)</span></div><div><i>6</i><span /></div><div><i>7</i><span><b>for</b> item <b>in</b> results:</span></div><div><i>8</i><span>&nbsp;&nbsp;print(item.label)</span></div></div><div className="processing-pill"><span /> Edge intelligence</div></div>
    <div className="floating-panel vision-panel"><div className="float-title"><span><ShieldCheck size={16} />ARGUS AI</span><small><i />Preview</small></div><div className="mini-feed"><img src="/assets/argus-factory.webp" width="1400" height="933" alt="" fetchpriority="high" /><span>PPE detected</span><i /></div></div>
    <div className="floating-panel analytics-panel"><div className="float-title"><span><Activity size={15} />RiskRule</span></div><Chart small /><div className="mini-row"><BookOpen size={12} /><span>Trading journal</span><ChevronRight size={12} /></div><div className="mini-row"><ShieldCheck size={12} /><span>Rules & review</span><ChevronRight size={12} /></div></div>
  </div>;
}

// These deliberately contain no measured results or prescription data.
export function ProjectPreview({ type }) {
  if (type === 'argus-ai') return <div className="argus-preview product-preview" aria-hidden="true">
    <div className="preview-toolbar"><span><ShieldCheck size={18} /> ARGUS AI</span><small><i />Preview</small></div>
    <div className="argus-body"><div className="preview-sidebar"><span className="selected"><Video />Vision</span><span><Activity />Analytics</span><span><Video />Cameras</span><span><SlidersHorizontal />Settings</span></div><div className="argus-feed"><img src="/assets/argus-factory.webp" alt="" width="1400" height="933" loading="lazy" /><div className="detection detection--one"><span>PPE detected</span></div><div className="detection detection--two"><span>PPE detected</span></div><div className="feed-caption"><span><i />Camera view</span><span><i />Safety overview</span></div></div></div>
  </div>;
  if (type === 'riskrule') return <div className="risk-preview product-preview" aria-hidden="true">
    <div className="preview-toolbar"><span><Activity size={18} />RiskRule</span><small><i />Preview</small></div>
    <div className="risk-body"><div className="preview-sidebar"><span className="selected"><BookOpen />Journal</span><span><Activity />Analytics</span><span><LayersIcon />Strategies</span><span><SlidersHorizontal />Reports</span></div><div className="risk-content"><div className="risk-top"><span>Performance</span><ArrowUpRight size={12} /></div><div className="chart-grid"><Chart /></div><div className="journal-labels"><span>Journal overview</span><span>Trading discipline</span></div></div></div>
  </div>;
  return <div className="dose-preview product-preview" aria-hidden="true"><i className="dose-pearl dose-pearl--one" /><i className="dose-pearl dose-pearl--two" /><i className="dose-leaf" /><div className="dose-phone"><div className="phone-island" /><div className="dose-phone-top"><span>9:41</span><span>•••</span></div><h4>Good morning</h4><p>Your daily routine</p><div className="dose-reminder"><span><BookOpen size={19} /></span><strong>Morning routine</strong></div><div className="dose-reminder"><span><Bell size={19} /></span><strong>Daily reminder</strong></div><div className="dose-complete"><Check size={13} />Mark complete</div><div className="dose-bottom"><LayoutGrid size={16} /><Bell size={16} /><Activity size={16} /></div></div></div>;
}

function LayersIcon() { return <LayoutGrid />; }
