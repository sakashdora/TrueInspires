# True Inspire — Blue Horizon website system

**Updated:** 20 November 2026
**Status:** Implemented locally. This file describes the rendered site, its design rules, and the remaining evidence gaps.
**Preview:** `http://127.0.0.1:5190/` (the earlier `localhost:5173/design-preview/` is a separate concept preview)

## 1. Direction and brand

The homepage now uses a cinematic **flowered blue horizon and optical lens** as its opening image. The latest reference guided the sky, flower foreground, right-side luminous focal point, left copy, and translucent information rail. The lens holds the original TI emblem instead of a floating person. The copy and four capabilities are real studio language, without the reference's AI claims or invented statistics.

The supplied True Inspire black/gold logo remains the brand master. The homepage puts the exact emblem and wordmark on a small pale plaque within a transparent, blurred glass navbar. Interior pages and the scrolled home header use a solid light surface. The lens and closing use the original black/gold emblem. The Sanskrit motto in the original full lockup is visible in the footer and as HTML text in the hero. Neither the logo nor its lettering is redrawn with a font.

The prior ivory contact-sheet proposal is historical context, not the active direction. Older files under `docs/v4/` are research, and some contain obsolete project or art-direction suggestions. This document and the shipped code are authoritative for this version.

## 2. Visual system

| Role | Value | Use |
| --- | --- | --- |
| Midnight | `#06274B` | Process, contact, primary controls, deep field |
| Deep ink | `#102D48` | Main type on light surfaces |
| Electric blue | `#1479C9` | Editorial emphasis, links, active states |
| Ice cyan | `#46D7F5` | Primary action on dark surfaces; precise light accents |
| Cloud white | `#F7F9FC` | Navigation and reading canvas |
| Soft violet | `#B99AFF` | Limited to the TEJAS project identity |
| Logo gold | asset only, with `#A77B38` as a minor supporting token | Keeps the real black/gold identity intact |
| Rule | `#C8D6E4` | Dividers and card edges |
| Muted type | `#5D7082` | Secondary copy on cloud white |

White, midnight, and electric blue carry the page. Cyan is restricted to actions and controlled highlights; it is not a neon wash over every section. Project title plates have individual palettes, and editorial copy states clearly that these are artwork rather than screenshots.

**Type:** Manrope 400/600/700 for body, controls, and direct headline words; Instrument Serif regular/italic for the expressive phrase in each major heading and the project plates. These are loaded through Google Fonts in `index.html`, with system fallbacks. The original logo image includes its own Devanagari lettering. Display type uses a tight `0.91–1.0` line height and controlled negative tracking. Reading copy sits around 15–19 px and 1.6–1.75 line height.

**Grid:** Content width caps at 1328 px. Desktop gutters are 56 px, falling to 36 px below 1100 px, 22 px below 768 px, and 18 px at the narrowest breakpoint. Major sections typically have 93–155 px vertical spacing. Work, services, process, people, and closing each use a different composition so the site does not repeat one card grid.

**Surface:** Square controls, thin rules, minimal shadow, and a single restrained circular line treatment on project plates and interior intros. The reference-led hero alone uses a rounded blue glass navigation bar and capability rail, plus a cyan pill action. Its original atmosphere is compressed to a 134 KB WebP at `public/assets/flower-orbit-hero.webp`. The earlier 50 KB `blue-horizon-hero.webp` is retained as a historical asset and is no longer loaded.

## 3. Actual page sequence

1. **Navigation:** Work, Services, Studio, and Start a project. The home header is transparent glass over the hero, with the original logo on a light plaque. It becomes solid on scroll; interior pages are solid by default. At ≤767 px, a full-height midnight menu opens with Escape and visible close control. Underlying main/footer are inert while open.
2. **Hero:** Full-bleed blue sky, flower meadow, and a luminous glass lens with the original emblem. The left headline reads “From imagination to creation.” The description names cafés, schools, events, and digital products. Work and contact actions are real links. The bottom glass rail lists four offered capabilities, with no fabricated project totals or satisfaction metrics.
3. **Selected work:** The homepage has a light gallery with three selected projects, previous/next controls, keyboard arrows, touch swipe, and a link to the archive. The `/work/` route was rebuilt after review: atmospheric blue introduction, a glass-backed RiskRule feature, then an asymmetric four-project gallery with translucent information panels, actual category/role data, and a clear route into each case study. The former small-thumbnail row list is no longer rendered.
4. **Services:** Five real categories in a disclosure list; adjacent editorial phrase changes with the selected category. Café and school are service areas, not implied completed case studies.
5. **Process:** Midnight section with four stages and a changing document artifact. The interaction communicates what a client can expect, without false performance metrics.
6. **People and studio:** The homepage uses existing founder portraits and profile links. The `/studio/` route has a new deep-blue opening with both portraits, an editorial practice statement, concise evidence-based founder profiles, verified LinkedIn/GitHub links, and a closing contact action.
7. **Closing and footer:** A cyan action within a deep blue invitation. The real emblem appears as an identity element. Light footer restores the full original logo and verified navigation/social paths.

The routes `/`, `/work/`, five `/work/{slug}/` pages, `/services/`, `/studio/`, `/contact/`, and `/404.html` use the same tokens and typography. The work route shares the hero's transparent glass navigation; other interior pages use cloud-white reading surfaces with blue editorial accents. Case studies state collaboration credit, actual project description, technical highlights, and available live or repository links. The contact route currently connects to the founders' verified public LinkedIn profiles; there is no form endpoint or approved business email in this repository.

## 4. Interaction and motion

| Moment | Implementation | Reduced-motion / touch behavior |
| --- | --- | --- |
| Hero atmosphere | One GSAP ScrollTrigger parallax of the image, desktop ≥1024 px only; no content starts hidden | Static image with all text visible |
| Section headings | Short GSAP y/opacity entrance near viewport | No entrance when reduced motion is requested |
| Project selection | CSS plate transition; controlled React state; buttons, arrow keys, and horizontal touch gesture | Same controls, no forced autoplay |
| Process stage | Clickable buttons update the document title and stage label | Immediate content update |
| Links and portraits | CSS 200–700 ms hover/focus transitions | Transitions effectively disabled |
| Scrolling | One Lenis instance on desktop, synchronized to GSAP; native mobile and reduced-motion scroll | Native scrolling |

No added Motion/React, carousel, or Three.js code is in the active render path. Existing unused Three.js components remain in the repository, but the page does not import them. The generated hero is decorative only and can be replaced with approved original photography without changing the page structure.

## 5. Responsive and accessibility rules

| Width | Main behavior |
| --- | --- |
| 320–359 px | 18 px gutter; hero type 43 px with no isolated “of”; one-column work and founder layouts |
| 360–767 px | 22 px gutter; full-height menu; two hero actions become vertical below 500 px |
| 768–900 px | Desktop nav, one-column work/process layouts, compact wordmark |
| 901–1100 px | Split portfolio, responsive heading scale, 36 px gutter |
| ≥1101 px | 56 px gutter, split compositions and bounded hero parallax |

There is one H1 per route. Navigation uses real links; controls use native buttons or disclosure summaries. Focus rings are visible. The gallery has region labeling, keyboard arrows, touch input, and live caption text. The menu traps access to page content via `inert` and closes on Escape. All content is readable before JavaScript animation. The site should still receive a full WCAG audit before public launch; this document does not claim certification.

## 6. SEO and delivery

`npm run build` runs Vite's client build, a server render build, and `scripts/prerender.mjs`. It writes useful HTML for all 11 public/error routes with unique page title, description, and H1. The production build includes Open Graph metadata. When a verified domain is supplied as `PUBLIC_SITE_URL`, the build also emits canonical URLs, a sitemap, and Organization JSON-LD using the authentic logo. The 404 page is marked noindex. No public domain is assumed.

The critical hero WebP is preloaded. Founder portraits have fixed dimensions and lazy loading on the homepage. Large 3D libraries are excluded from the active route import graph. Real-world Core Web Vitals, deployed HTTP 404 status, and a full assistive-technology pass remain unmeasured.

## 7. Verification and final review

**Performed on 20 November 2026:** The initial blue redesign passed `npm run build` and emitted 11 prerendered pages. `git diff --check` passed. The local browser preview was visually inspected at 320, 390, 768, 1024, and 1440 px. All 11 routes were visited at each width (55 route-width combinations); each had an H1, no placeholder `href="#"`, and no document-level horizontal overflow. The gallery advanced to TEJAS, service selection opened the school content and changed the side phrase, and the mobile menu opened. The reference-led hero and new studio route were later visually inspected at 320, 390, 1024, and 1440 px; their inspected layouts had no document-level horizontal overflow. The homepage glass bar was confirmed in computed CSS, and the mobile menu retained full viewport height. The three most damaging defects found and fixed in the initial redesign were:

1. The mobile menu was only 60 px tall because header backdrop filtering created a containing block for its fixed position. Mobile headers now disable that filter; the menu fills the viewport.
2. The 320 px hero isolated “of” on its own line. The narrowest breakpoint now keeps the headline in two balanced lines.
3. A 320 px `min-width` on `body` caused 15 px horizontal scrolling when the browser reserved space for its vertical scrollbar. The minimum width was removed; the 320 px document now fits its content width.

**Rubric, evidence-based judgment:** originality/art direction 9.0 (25%); typography/layout/imagery 8.5 (20%); interaction/motion 8.2 (15%); responsive 8.6 (15%); brand/content 8.4 (10%); performance/accessibility 7.5 (10%); function 8.5 (5%). Weighted result **about 8.5/10** for the inspected local implementation. This is a subjective design assessment, not a measured Lighthouse or field-data score. Real project screen captures, a direct business contact destination, deployed-domain metadata, and measured accessibility/performance are the remaining inputs for a stronger public release.

**Asset truth:** No approved project screenshots were found in this checkout. The title plates explicitly identify themselves as editorial artwork. The live RiskRule product was inspected, but browser security blocked transferring a screenshot into the repository; this restriction was respected. The older ARGUS factory image is generated illustration and is not used as customer evidence. Existing founder portraits are used as provided.

**Work route review after further owner feedback:** The owner scored the previous white list layout 2/10 and asked for at least 7/10 with transparent glass. The list was replaced by a large featured RiskRule treatment and four project panels, with glass information surfaces, real links, and visible artwork disclosure. The new page was inspected at 320, 390, 768, 1024, and 1440 px; all returned no document-level overflow. The TEJAS card navigated to its case study and produced the correct route title and H1 after hydration. The visual score is subjective; a real project image gallery would strengthen this page further.
