# MOTION, 3D, AND IMPLEMENTATION SYSTEM V2.0
**Brand**: To Inspire (TrueInspires)  
**Version**: 2.0.0 (Interactive WebGL Architecture & Motion Choreography)  
**Status**: Active Production Blueprint  
**Maintainers**: CTO & Creative Technologist  

---

## 1. Selected Creative Direction: "The Architectural Monolith & Golden Luminary"

### 1.1 Evaluated Alternatives & Final Decision
- **Direction A: The Bioluminescent Cyber-Studio (REJECTED)**:
  - Heavy reliance on electric cyan/purple gradients, generic particle tunnels, and floating glass cards. Diminishes the brand into a clichéd AI template.
- **Direction B: The Ivory Editorial Stationery (REJECTED AS SOLE MODE)**:
  - Warm cream and paper-like stationery. Highly dignified, but lacks the dynamic technological energy required for a high-end software and creative engineering startup.
- **Direction C: The Architectural Monolith & Golden Luminary (SELECTED & ADOPTED)**:
  - **Aesthetic**: Deep obsidian stone foundation (`#08090C`), champagne gold metallic highlights (`#D4AF37`), sharp architectural lines, dramatic studio rim lighting, and a real-time 3D sculptural emblem reflecting the authentic logo's four-pointed diamond star and winged torch.
  - **Integration**: The 3D scene directly unifies the hero statement with the brand slogan "यथा कल्पना तथा रचना", transitioning fluidly down into the portfolio and founder showcases.

---

## 2. 3D Architecture & Three.js Scene Graph

### 2.1 Scene Setup & Renderer Configuration
- **Engine**: Three.js (r182+)
- **Renderer Settings**:
  - `antialias: true`
  - `alpha: true` (transparent canvas overlaying the obsidian atmosphere)
  - `powerPreference: "high-performance"`
  - `toneMapping: THREE.ACESFilmicToneMapping` (cinematic contrast)
  - `toneMappingExposure: 1.15`
  - Clamped Pixel Ratio: `Math.min(window.devicePixelRatio, 2)` (prevents thermal throttling on 4K/retina mobile screens).

### 2.2 Geometry Composition
The signature 3D emblem is procedurally sculpted to mirror the physical logo:
1. **The Luminary Diamond Star (Apex)**:
   - Octahedral / double-pyramid diamond geometry with bevelled facets (`OctahedronGeometry` or custom prism).
   - High metallic finish (`metalness: 0.95`, `roughness: 0.15`) catching golden specular reflections.
2. **The Winged Kinetic Rings & Torus Orbitals**:
   - Sweeping golden arcs (`TorusGeometry` segments) symbolizing the "TI" wing strokes and dynamic creative flight.
   - Smooth continuous gyroscopic rotation.
3. **The Ambient Particle Stardust Field**:
   - 450 procedural stardust points distributed in a spherical volume (`BufferGeometry` with custom point coordinates).
   - Gentle floating drift synchronized with mouse parallax and scroll position.

### 2.3 Studio Lighting Rig
- **Key Light**: Warm golden directional light (`#FFF2D6`, intensity: 2.5) positioned at `(4, 5, 4)` casting crisp highlights across faceted edges.
- **Rim Light**: Cool metallic cyan/slate accent (`#88B4E8`, intensity: 1.2) positioned at `(-5, -4, -3)` ensuring separation from the dark background.
- **Ambient Fill**: Subtle deep slate ambient light (`#202430`, intensity: 0.7) preserving shadow detail without washing out contrast.

---

## 3. Scroll-Driven Camera & Stage Choreography

The 3D canvas is fixed (`position: fixed; inset: 0; pointer-events: none; z-index: 1`) while the DOM scrolls smoothly above it. The scene transforms across five choreographed stages:

```text
┌───────────────┬───────────────────────────────────┬─────────────────────────────────────────┐
│ Section ID    │ Camera Position & Angle           │ 3D Emblem Transformation & Lighting     │
├───────────────┼───────────────────────────────────┼─────────────────────────────────────────┤
│ #home (Hero)  │ pos(0, 0, 5.2), rot(0, 0, 0)      │ Centered, breathing rotation, full gold │
│ #services     │ pos(0.8, -0.2, 4.8), rot(0.2, y)  │ Glides right flank, angular tilt        │
│ #work (Work)  │ pos(-1.0, 0, 4.5), rot(-0.1, y)   │ Flanks left, subtle opacity, deep field │
│ #about        │ pos(0, -0.4, 4.2), rot(0.3, y)    │ Aligns with "यथा कल्पना तथा रचना" motto │
│ #team         │ pos(0.9, -0.1, 5.0), rot(0, y)    │ Frames founder cards, gentle orbital    │
│ #contact      │ pos(0, 0, 4.8), rot(0, y)         │ Centers above contact CTA card          │
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
