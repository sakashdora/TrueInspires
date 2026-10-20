# MOTION, 3D, AND IMPLEMENTATION SYSTEM V2.0
**Brand**: To Inspire (TrueInspires)  
**Version**: 2.1.0 (Production Dual-Theme WebGL Architecture & Motion Choreography)  
**Status**: Active Production Standard  
**Maintainers**: CTO & Creative Technologist  

---

## 1. Implemented Hybrid Architectural Direction

### 1.1 Evaluated Alternatives & Final Decision
- **Direction A: The Bioluminescent Cyber-Studio (REJECTED)**:
  - Heavy reliance on electric cyan/purple gradients, generic particle tunnels, and floating glass cards. Diminishes the brand into a clichéd AI template.
- **Direction B: The Ivory Editorial Stationery (REJECTED AS SOLE MODE)**:
  - Warm cream and paper-like stationery. Highly dignified, but lacks the dynamic technological energy required for a high-end software and creative engineering startup.
- **Direction C: The Hybrid Architectural Synthesis (SELECTED & ADOPTED)**:
  - **Foundational Grammar**: Expressive maximalism for commanding *Cormorant Garamond* headlines, editorial storytelling, and verified project specifications.
  - **Material Depth**: Liquid glass for floating translucent navigation and project card backdrops.
  - **Interaction Craft**: Tactile UI for the dual-theme toggle switch and pressed interactive controls.
  - **Integration**: The real-time 3D scene directly unifies the hero statement with the brand slogan "यथा कल्पना तथा रचना", transitioning fluidly down into the portfolio and founder showcases.

---

## 2. 3D Architecture & Three.js Dual-Theme Scene Graph

### 2.1 Scene Setup & Renderer Configuration
- **Engine**: Three.js (r182+)
- **Renderer Settings**:
  - `antialias: true`
  - `alpha: true` (transparent canvas overlaying the obsidian/alabaster atmosphere)
  - `powerPreference: "high-performance"`
  - `toneMapping: THREE.ACESFilmicToneMapping` (cinematic contrast)
  - `toneMappingExposure: 1.25`
  - Clamped Pixel Ratio: `Math.min(window.devicePixelRatio, 2)` (prevents thermal throttling on 4K/retina mobile screens).

### 2.2 Geometry Composition
The signature 3D emblem is procedurally sculpted to mirror the physical logo:
1. **The Luminary Diamond Star (Apex)**:
   - Octahedral / double-pyramid diamond geometry with bevelled facets (`OctahedronGeometry` scaled to `[0.8, 1.45, 0.8]`).
   - High metallic finish (`metalness: 0.92`, `roughness: 0.18`) catching specular reflections.
2. **The Winged Kinetic Rings & Torus Orbitals**:
   - Sweeping golden arcs (`TorusGeometry` segments) symbolizing the "TI" wing strokes and dynamic creative flight.
   - Smooth continuous gyroscopic rotation.
3. **The Ambient Particle Stardust Field**:
   - 420 procedural stardust points distributed in a spherical volume (`BufferGeometry` with custom point coordinates).
   - Gentle floating drift synchronized with mouse parallax and scroll position.

### 2.3 Dual-Theme Adaptive Lighting Rig
The WebGL scene dynamically reconfigures its lighting and material shaders when the user toggles between Dark and Light modes:

```text
┌──────────────────────┬───────────────────────────────────┬─────────────────────────────────────────┐
│ Lighting Component   │ Dark Theme ("Atmospheric")        │ Light Theme ("Editorial Alabaster")     │
├──────────────────────┼───────────────────────────────────┼─────────────────────────────────────────┤
│ Key Light            │ #FFF1CF (Warm Champagne, int: 3.2)│ #FFFFFF (Crisp Daylight, int: 2.6)      │
│ Rim Light            │ #70A5F5 (Cool Slate Cyan, int:1.8)│ #C4B5FD (Soft Ethereal Lavender, int:1.6│
│ Point Light          │ #D4AF37 (Gold Glint, int: 2.5)    │ #7C3AED (Royal Violet Glint, int: 2.2)  │
│ Ambient Fill         │ #181C26 (Subdued Slate, int: 1.2) │ #EAE5F5 (Warm Lavender Alabaster, int:1.4│
│ Star Mesh Material   │ #DFB75C (Champagne Gold, met:0.92)│ #A855F7 (Amethyst Gold, met: 0.88)      │
│ Stardust Particles   │ #E5C06E (Gold, opacity: 0.65)     │ #7C3AED (Periwinkle Violet, op: 0.45)   │
└──────────────────────┴───────────────────────────────────┴─────────────────────────────────────────┘
```

---

## 3. Scroll-Driven Camera & Stage Choreography

The 3D canvas is fixed (`position: fixed; inset: 0; pointer-events: none; z-index: 0`) while the DOM scrolls smoothly above it. The scene transforms across five choreographed stages:

```text
┌───────────────┬───────────────────────────────────┬─────────────────────────────────────────┐
│ Section ID    │ Camera Position & Angle           │ 3D Emblem Transformation & Lighting     │
├───────────────┼───────────────────────────────────┼─────────────────────────────────────────┤
│ #home (Hero)  │ pos(0, 0, 5.8), rot(0, 0, 0)      │ Centered, breathing rotation, full gold │
│ #services     │ pos(1.2, -0.2, 5.3), rot(0.2, y)  │ Glides right flank, angular tilt        │
│ #work (Work)  │ pos(-1.6, 0, 4.9), rot(-0.1, y)   │ Flanks left, subtle opacity, deep field │
│ #about        │ pos(0, -0.2, 4.7), rot(0.3, y)    │ Aligns with "यथा कल्पना तथा रचना" motto │
│ #team         │ pos(1.1, -0.4, 5.2), rot(0, y)    │ Frames founder cards, gentle orbital    │
│ #contact      │ pos(0, 0, 5.2), rot(0, y)         │ Centers above contact CTA card          │
└───────────────┴───────────────────────────────────┴─────────────────────────────────────────┘
```

### 3.1 Interaction Physics
- **Mouse Parallax**: Smooth spring-damped tracking on mouse coordinates (`lerp` factor: `0.05`), providing tactile responsiveness without jitter.
- **Scroll Synchronization**: Read from `window.scrollY` normalized against document scroll height, updating camera and object transforms every frame via `requestAnimationFrame`.

---

## 4. Accessibility, Fallbacks & Progressive Enhancement

1. **Reduced Motion**: If `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true:
   - Rotations and parallax are disabled; scene renders a static, beautifully composed frame.
2. **WebGL Context Loss Handler**:
   - Listens for `webglcontextlost` and gracefully switches to a stylized vector SVG fallback without crashing the application.
3. **Touch Devices**:
   - Touch drag triggers subtle rotation; orientation sensors utilized where permissions allow; touch event listeners use `{ passive: true }`.
