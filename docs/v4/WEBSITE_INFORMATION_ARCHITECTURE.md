# WEBSITE INFORMATION ARCHITECTURE & WIREFRAME BLUEPRINT V4.0
**Brand**: To Inspire (TrueInspires)  
**Document**: `docs/v4/WEBSITE_INFORMATION_ARCHITECTURE.md`  
**Purpose**: Complete Structural Blueprint, Section Inventory, User Journeys & Multi-Viewport Specifications  

---

## 1. Global Page Layout & Environmental Layering

The website operates across four distinct visual and interactive strata:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ STRATUM 4: INTERACTION & OVERLAY LAYER (Z-INDEX: 200 - 300)            │
│ Modal Consultation Dialog • Toast Notifications • Mobile Navigation    │
├────────────────────────────────────────────────────────────────────────┤
│ STRATUM 3: STICKY FLOATING HEADER & CONTROLS (Z-INDEX: 100)            │
│ Authentic Logo • Nav Links • Tactile Theme Toggle • "Initiate" CTA     │
├────────────────────────────────────────────────────────────────────────┤
│ STRATUM 2: EDITORIAL CONTENT & DOM SURFACES (Z-INDEX: 10)              │
│ Hero • Capabilities • Verified Projects • Creed • Founders • Footer    │
├────────────────────────────────────────────────────────────────────────┤
│ STRATUM 1: REAL-TIME WEBGL & AMBIENT CANVAS (Z-INDEX: 0, FIXED)        │
│ Fixed Three.js Viewport • Diamond Star • Gyro Rings • Stardust Field   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Section-by-Section Wireframe & Content Specifications

### Section 01: Sticky Floating Navigation Bar
- **Position**: `sticky; top: 0; width: 100%; backdrop-filter: blur(18px)`.
- **Components**:
  1. **Brand Lockup (Left)**: Authentic `true_inspire.jpeg` logo in a 44×44px bevelled capsule flanked by the title `"TO INSPIRE"` in tracked serif capitals and the Sanskrit subtitle `"यथा कल्पना तथा रचना"`.
  2. **Navigation Anchor Links (Center)**: `Overview` (#home), `Capabilities` (#services), `Engineering` (#work), `Creed` (#about), `Founders` (#team), `Initiate` (#contact).
  3. **Dual-Theme Tactile Control (Right)**: An integrated toggle switch allowing seamless toggling between **Atmospheric Dark** (moon/star icon) and **Editorial Light** (sun icon) with local persistence.
  4. **Primary Action**: Tactile pill button `"Build Together"` opening the direct founder consultation modal.

---

### Section 02: Hero Section (The Engineering Proclamation)
- **Visual Composition**:
  - Center-stage alignment allowing the background 3D WebGL diamond star to breathe directly behind the headline.
  - Top Badge: Architectural pill containing `"Autonomous Engineering Studio • यथा कल्पना तथा रचना"`.
  - Main Headline (Cormorant Garamond, clamp scaling):
    ```text
    Software Engineered with Deliberate Craft
    & Architectural Rigor
    ```
  - Subtitle (Plus Jakarta Sans, high legibility):
    *"Founded by Chandan Mahapatra and S Akash Dora in Odisha, To Inspire architects bespoke web applications, edge AI systems, and high-throughput financial telemetry platforms."*
  - Dual Action Cluster:
    - Primary Button: `"Review Engineering Capabilities"` (Smooth scroll to `#work`).
    - Secondary Button: `"Direct Founder Consultation"` (Triggers modal).
  - **Live Engineering Telemetry Strip**:
    - Four real-time indicators:
      1. `Architecture`: *WebGL + React 18 + Vite*
      2. `Studio Origin`: *Bhubaneswar & Jeypore, Odisha*
      3. `Status`: *Live • Accepting Q4 Engagements*
      4. `Verified Platforms`: *6 Production Codebases*

---

### Section 03: Four Pillars of Studio Engineering (#services)
- **Visual Layout**: Asymmetric 2-column header (Headline on left, contextual narrative on right) followed by a 4-column responsive card grid.
- **Card 01 — Full-Stack Web & Cloud Platforms**:
  - Focus: High-throughput React/Next.js architectures, relational database schemas, and zero-downtime serverless pipelines.
  - Tags: `Next.js & Vite`, `PostgreSQL`, `Supabase`, `Cloud-Native`.
- **Card 02 — Edge Computer Vision & AI Systems**:
  - Focus: Edge-native ONNX and OpenVINO inference engines for real-time hazard detection, sensor triage, and LLM behavioral agents.
  - Tags: `YOLOv11s ONNX`, `OpenVINO`, `NestJS WS`, `LLM Triage`.
- **Card 03 — Dual-Theme Art Direction & Editorial Systems**:
  - Focus: Bespoke typography hierarchies, WebGL 3D choreography, and micro-interactions engineered for zero cognitive fatigue.
  - Tags: `Three.js WebGL`, `Editorial Type`, `WCAG AA`, `Tactile UI`.
- **Card 04 — Architecture Audits & Production DevOps**:
  - Focus: Code integrity analysis, security shielding, Vercel/AWS infrastructure hardening, and performance telemetry.
  - Tags: `Security Shield`, `Vercel & AWS`, `Performance Tuning`, `CI/CD`.

---

### Section 04: Verified Production Showcase (#work)
- **Visual Layout**: Center headline with category filter tabs:
  `[All Platforms]  [Edge AI & Vision]  [FinTech & Telemetry]  [Digital Health]  [Event Systems]  [Commerce]`
- **The Six Verified Production Platforms**:
  1. **ARGUS AI (PPE Safety)**: Edge-native computer vision industrial safety triage platform (YOLOv11s ONNX, NestJS 11 WebSocket, 100% offline LAN resilience).
  2. **TradeVault / RiskRule**: Institutional trading journal & discipline analytics platform (FIFO lot accounting, broker sync via Dhan/AngelOne, Lunar AI coach).
  3. **DoseLoop**: Calm medication companion & adherence engine (Custom 4-state dose machine, Family Circle caregiver visibility, SOS emergency ping).
  4. **HarvestIQ**: Cryptocurrency tax-loss harvesting dashboard (Virtualized loss ranking tables, cost basis calculations, live WebSocket feed).
  5. **CrossFire 2026**: High-capacity state-level campus talent hunt operations platform (Cryptographic QR door scanning, live judge scoring matrix).
  6. **PURE GO**: Luxury direct-to-consumer product launch & commerce engine (Razorpay SDK integration, Framer Motion layouts).
- **Card Anatomy**:
  - Category Badge & Lead Engineer Attribution.
  - Project Title & Problem Statement.
  - Architectural Summary & Key Technical Innovations.
  - Technology Stack Chips.
  - Direct Action Links: `[Launch Application ↗]` (Live demo) & `[Inspect Source ↗]` (GitHub repository).

---

### Section 05: The Creed & Studio Philosophy (#about)
- **Visual Layout**: 2-Column Split Layout.
  - Left Column: Narrative essay on rejecting generic AI templates, committing to 60fps performance, and treating code as a physical craft.
  - Three Core Commitments:
    1. *Intellectual Honesty*: No inflated metrics, fake customer logos, or decorative code.
    2. *Architectural Precision*: Modular components, strict WCAG AA contrast, and zero layout shift.
    3. *Founder Accountability*: Every release is directly architected by Chandan and Akash.
  - Right Column (The Creed Shrine Card):
    - Sculptural Four-Pointed Star Monogram (`✦`).
    - Prominent Sanskrit Callout: **"यथा कल्पना तथा रचना"** (Large Cormorant Garamond).
    - Translation: *"As the imagination, so the creation."*
    - Commentary: The unbroken bridge between intellectual conception and physical execution.
    - Attribution: *To Inspire Founding Collective • Est. 2024*.

---

### Section 06: Direct Technical Leadership (#team)
- **Visual Layout**: Founder profile cards celebrating authentic engineering credentials:
  1. **Chandan Mahapatra (Co-Founder & Developer)**:
     - Focus: Full-Stack Architecture, Distributed Systems, AI-Assisted Workflows, and FinTech Telemetry.
     - Projects Led: DoseLoop, HarvestIQ, PURE GO. Published author of the research paper *"Cracking the Transmission Curve"*.
     - Social Links: Verified LinkedIn and GitHub (`im-chandanmahapatra`).
  2. **S Akash Dora (Co-Founder & Developer)**:
     - Focus: Computer Vision, Edge AI, Cloud Infrastructure, DevOps & High-Capacity Event Systems.
     - Projects Led: ARGUS AI (BPUT Hackathon PS06), CrossFire 2026, TradeVault.
     - Social Links: Verified LinkedIn and GitHub (`sakashdora`).

---

### Section 07: Direct Consultation Monolith (#contact)
- **Visual Layout**: Full-width architectural banner with subtle vertical watermark of *"यथा कल्पना तथा रचना"*.
- **Content**:
  - Headline: *"Ready to Build Something with Lasting Architectural Integrity?"*
  - Narrative: Discuss your product roadmap directly with Chandan and Akash.
  - Dual CTAs: `"Initiate Project Proposal"` & `"Direct Inquiry (Email)"`.

---

### Section 08: Institutional Footer
- **4-Column Grid**:
  - Column 1: Master logo lockup, studio mission, and origin stamp (*Bhubaneswar, Odisha*).
  - Column 2: Navigation anchor links.
  - Column 3: Direct links to all 6 live production applications.
  - Column 4: Founder social profiles & direct email.
- **Bottom Bar**: Copyright, Sanskrit creed, and V4.0 build identifier.

---

## 3. Responsive Breakpoint Matrix

| Viewport | Container Max-Width | Layout Adaptations | Typography Scaling |
| :--- | :--- | :--- | :--- |
| **Desktop (≥ 1280px)** | `1320px` (28px padding) | Full 4-column grids, fixed WebGL background, full navigation links | Hero Title: `4.5rem` |
| **Tablet (768px - 1024px)**| `100%` (24px padding) | 2-column grids for services and projects, stacked philosophy layout | Hero Title: `3.2rem` |
| **Mobile (≤ 768px)** | `100%` (18px padding) | 1-column stacked cards, slide-down mobile nav drawer, vertical telemetry strip | Hero Title: `2.4rem` |
