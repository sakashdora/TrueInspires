# GENERATIVE AI DESIGN STANDARDS V2.0
**Brand**: To Inspire (TrueInspires)  
**Motto**: "यथा कल्पना तथा रचना" (*As the imagination, so the creation* / *As conceived, so created*)  
**Version**: 2.0.0 (Creative Engineering Overhaul)  
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
  - Celebrate the team's verified software projects (DOSELOOP, ExpenseSO, Freshers Party, CrossFire, Teacher Invitation).
  - Accurate founder representation: Chandan Mahapatra and S Akash Dora.

---

## 4. Visual Identity & Color System

The palette directly derives from the physical nuances of the master logo:

| Token | Hex Value | Semantic Role |
| :--- | :--- | :--- |
| `--color-obsidian-950` | `#08090C` | Deepest atmospheric foundation / dark background |
| `--color-obsidian-900` | `#0E1015` | Section background & elevated card surface |
| `--color-obsidian-800` | `#161922` | Card borders, interactive hover states |
| `--color-gold-champagne`| `#D4AF37` | Primary brand accent, star crest, active indicators |
| `--color-gold-light`    | `#F3E3B5` | Metallic highlights, gradient stops, illuminated text |
| `--color-gold-bronze`   | `#8A6D3B` | Deep metallic shadows, architectural hairlines |
| `--color-alabaster`     | `#FAF8F5` | Primary text on dark surfaces, off-white brand parchment |
| `--color-muted-steel`   | `#8E95A5` | Secondary captions, metadata, supporting paragraphs |

---

## 5. Standards for AI-Assisted Asset & Code Generation

1. **Evidence-Based Code**: All generated code must be directly executable, lint-free, and cross-browser tested.
2. **Zero Hallucination Policy**: Never invent fake testimonials, fake logos of fortune 500 companies, or nonexistent awards.
3. **Progressive WebGL Enhancement**: 3D scenes must run smoothly on standard integrated GPUs (60 FPS target), gracefully handle context loss, and provide accessible DOM fallbacks when WebGL is absent.
