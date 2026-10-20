# GENERATIVE AI DESIGN STANDARDS V2.0
**Brand**: To Inspire (TrueInspires)  
**Motto**: "यथा कल्पना तथा रचना" (*As the imagination, so the creation* / *As conceived, so created*)  
**Version**: 2.1.0 (Production Dual-Theme Architecture)  
**Status**: Active Production Standard  
**Maintainers**: CTO, Creative Technologist, Senior UI/UX Designer & Performance Engineer  

---

## 1. Executive Intent & Problem Statement

Generative AI tools and boilerplate templates have saturated the modern web with monotonous, derivative design artifacts. Websites built from casual AI prompts suffer from a predictable visual vocabulary:
- Ubiquitous dark-purple and cyan gradients with arbitrary floating spheres or neon blobs.
- Faux-metrics and SaaS cards filled with hollow marketing claims ("Revolutionizing the future with AI").
- Stock SVG icons dropped inside circular pills with no cohesive aesthetic narrative.
- Neglect or distortion of authentic corporate identity, logo artwork, and founder credentials.
- Flashing, unmotivated animations that disorient users rather than clarifying information architecture.

This standard establishes mandatory, non-negotiable guidelines for engineering digital experiences for **To Inspire**. It strictly forbids superficial decorative trends in favor of disciplined art direction, authentic company data, and high-performance WebGL craftsmanship.

---

## 2. Brand Preservation & Asset Integrity

### 2.1 The Authentic Brand Asset
- **Source Asset**: `public/assets/true_inspire.jpeg` (Dimensions: 1024×1024 px, high-resolution master).
- **Core Elements**:
  1. **Monogram**: A sculptural winged emblem combining stylized letters "T" and "I" (embodying the torch of inspiration and upward creative flight).
  2. **Apex Crest**: A four-pointed diamond star perched above the central stem, symbolizing radiant vision and clarity.
  3. **Tonal Gradient**: Rich champagne gold / burnished bronze metallic gradient (`#D4AF37` / `#96723C`) on the left wing stroke; deep charcoal obsidian black (`#141416`) on the right wing stroke.
  4. **Wordmark**: "TRUE INSPIRE" in widely tracked, sharp Roman serif capitals (`#121110`).
  5. **Motto**: "यथा कल्पना तथा रचना" (Devanagari script), bordered by twin golden hairlines.

### 2.2 Rejection Criteria for Brand Misuse
- **DO NOT** replace the authentic logo with generated vectors, stock abstract shapes, or generic geometric rectangles.
- **DO NOT** stretch, crop, skew, or distort the aspect ratio of the logo mark.
- **DO NOT** re-color the logo into arbitrary neon blues, greens, or purples.
- **DO NOT** truncate or omit the Devanagari motto where brand context permits; celebrate it as a core cultural and philosophical pillar of the studio.

---

## 3. Typography & Editorial Composition Principles

### 3.1 Typographic Hierarchy
1. **Primary Editorial Display**: `'Cormorant Garamond'`, Georgia, serif.
   - Purpose: Hero headlines, narrative section anchors, and philosophical statements.
   - Proportions: Generous line-height (`1.05 - 1.2`), optical kerning, elegant italic flourishes for emphatic words.
2. **Interface & Body Typography**: `'Plus Jakarta Sans'`, system-ui, -apple-system, sans-serif.
   - Purpose: Navigation links, body copy, interactive buttons, modal text, and form inputs.
   - Proportions: Crisp geometric legibility, tight tracking on UI controls, comfortable `1.6` line-height on paragraphs.
3. **Technical Telemetry & Metadata Accent**: `'Space Grotesk'`, monospace/grotesque.
   - Purpose: Numerical stats, project tags, coordinates, build badges, and status pills.
   - Proportions: Tracked uppercase, high technical precision.

### 3.2 Anti-Generic Copywriting Rules
- **Prohibited Clichés**:
  - "Unlocking the limitless power of tomorrow"
  - "Transforming the future with cutting-edge AI"
  - "Revolutionizing synergy across the ecosystem"
- **Mandated Tone**:
  - Direct, honest, grounded in real deliverables.
  - Celebrate the team's verified software projects (ARGUS AI, TradeVault/RiskRule, DoseLoop, HarvestIQ, CrossFire 2026, PURE GO).
  - Accurate founder representation: Chandan Mahapatra and S Akash Dora.

---

## 4. Dual-Theme Semantic Color Systems

The visual identity operates across two independently art-directed environments:

### 4.1 Dark Theme ("Atmospheric Espresso & Champagne Gold")
- **Foundation**: Deep obsidian (`#08080C`) and espresso (`#110F14`).
- **Primary Accent**: Champagne gold (`#D4AF37`) and illuminated light gold (`#F3E2B3`).
- **Depth**: Subdued midnight slate blue (`#181C26`, `#70A5F5`).
- **Atmosphere**: Haute horlogerie and aerospace precision.

### 4.2 Light Theme ("Warm Alabaster, Soft Lavender & Editorial Violet")
- **Foundation**: Uncoated warm alabaster cotton paper (`#FAF7F2`) and warm parchment (`#F2EDE4`).
- **Primary Accent**: Royal violet (`#7C3AED`) and soft heather lavender (`#EDE9FE`).
- **Typography**: Deep midnight plum (`#241528`) for commanding, fatigue-free reading.
- **Atmosphere**: Independent high-end literary editorial publishing.

---

## 5. Standards for AI-Assisted Asset & Code Generation

1. **Evidence-Based Code**: All generated code must be directly executable, lint-free, and cross-browser tested.
2. **Zero Hallucination Policy**: Never invent fake testimonials, fake logos of fortune 500 companies, or nonexistent awards.
3. **Progressive WebGL Enhancement**: 3D scenes must run smoothly on standard integrated GPUs (60 FPS target), gracefully handle context loss, and provide accessible DOM fallbacks when WebGL is absent.
4. **Accessible Contrast Ratios**: All foreground/background color combinations must satisfy WCAG 2.1 AA standards (contrast ≥ 4.5:1 for body copy).
