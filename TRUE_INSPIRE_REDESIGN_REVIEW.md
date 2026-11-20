# True Inspire — strategic review and redesign blueprint

Status: proposal only. No implementation approval inferred. Reviewed 20 November 2026.

## Decision

Prioritize a clear offer, actual project imagery, and a reliable enquiry path before adding more effects. Recommend **Studio in Focus**: an expressive blue and white editorial website whose central visual material is the work itself. Keep the authentic emblem and **Yatha Kalpana Tatha Rachna — यथा कल्पना तथा रचना**. Let the identity explain the relationship between an idea and its implementation.

The current website is complete as a collection of pages, but incomplete as a client acquisition system. The decorative hero is more memorable than the studio's offer. Project title plates are honestly disclosed, yet do not demonstrate interface quality. Contact currently requires visiting a founder's LinkedIn profile. Another round of glass, gradients, or motion alone will not resolve these issues.

## Evidence and limits

Inspected current App.jsx, project and team records, entry point, package configuration, Vite configuration, prerender script, HTML metadata, hosting configuration and asset inventory. Reviewed design-assets.md and PREMIUM_REDESIGN_SPEC.md, plus historical v4 material. Some combined historical-document output was truncated; a complete line-by-line historical-document review is **not claimed**. Old claims about production platforms, accessibility, awards or availability are not independent evidence.

Browser evidence available from the preceding implementation sessions includes desktop and 390px screenshots of the current homepage/header/menu, desktop coverflow, responsive width checks at 320/390/768/1024/1440, menu Escape and Work navigation, and console-error inspection. These are prior-session observations, not a fresh comprehensive route/browser audit in this review. No field performance measurements, screen-reader certification, external project functionality audit or deployed HTTP-status verification was performed. Research below distinguishes inspected source from recommendations and inaccessible sources. This review should not be interpreted as all requested acceptance checks having passed.

## 1. Current state and score

| Category | Weight | Judgment /10 | Evidence |
|---|---:|---:|---|
| Identity and clarity | 20% | 4.5 | Studio explanation is subordinate to an abstract headline; website service scope and technically specialized project evidence are poorly connected. |
| Originality and art direction | 20% | 4.5 | Attractive blue atmosphere, but the lens/meadow composition imitates a familiar inspiration layout and has little relationship to actual work. |
| Homepage hierarchy | 15% | 6 | Complete progression exists; repeated italic headline endings and large section spacing dilute emphasis. |
| Portfolio credibility | 10% | 3.5 | Five real repository records and collaboration credits; no approved product screenshots in the active gallery. |
| Enquiry | 10% | 2 | Contact route exists but offers only LinkedIn profiles; no brief intake, delivery or success state. |
| Motion | 10% | 5 | GSAP/Lenis and CSS coverflow exist; motion does not yet tell a project story. |
| Responsive/accessibility | 5% | 5 | Prior width checks passed; tiny labels, hidden focusable cards and menu containment need more investigation. |
| SEO/performance | 10% | 5 | Prerendered HTML is valuable; domain-dependent metadata and deployment verification remain incomplete. |

Weighted judgment: **4.5/10**, a qualitative editorial assessment, not a measured UX score. The older document's 8.5 rating is not substantiated by client conversion evidence and should not guide approval.

### Actual application

React 18 + Vite, with pathname-based page selection and normal anchors. There is a genuine homepage: hero, selected work, services disclosure, process selector, founders, closing CTA and footer. Routes: `/`, `/work/`, `/services/`, `/studio/`, `/contact/`, five `/work/{slug}/` cases and an error view. Five public project records: ARGUS AI, RiskRule, TEJAS 2026, DoseLoop, CrossFire 2026. The social-media project is explicitly upcoming and excluded from public cases. Preserve the slugs, TEJAS dual destinations, repository/live distinction, collaboration attribution and founder links.

Historical ThreeCanvas, SpatialScene, ProjectPreview, BrandMark and StudioDialog files are not evidence that those experiences are active. Three.js is installed but not imported by App.jsx. There are no current privacy or dedicated enquiry-success pages. A blog, pricing page, mega-menu and separate process route are unnecessary for the present offer.

### Confirmed weaknesses and risks

- ContactPage has no form, submission endpoint or business email. This is the highest business-impact omission.
- ProjectArtwork renders title plates instead of screenshots. Do not describe these as product previews or implementation evidence.
- Homepage header is absolute until a hero-height threshold, then fixed. It disappears during intermediate scrolling and reappears abruptly: the previous claim of a smooth stable sticky transition was too broad.
- Header's mobile mode sets main/footer inert, but does not implement a complete focus loop. Its absolute menu can be displaced if opened at an intermediate scroll position. Validate keyboard traversal and background scroll with Lenis.
- Mobile links omit active-route attributes; desktop Work is not active on nested case pages; home links have no section tracking.
- Carousel pointer capture on the stage may suppress direct card selection, as it previously suppressed arrow clicks. Dedicated selectors work, but direct card clicks require targeted retesting. Mobile distant cards have opacity zero yet retain keyboard focusability because their data distance is still two.
- Carousel counter derives from data, but heading and archive copy hardcode five. Missing/empty data is not handled. Wraparound jumps cards from one extreme to the other; evaluate intermediate frames, not just final states.
- Lenis checks breakpoint/reduced-motion only at mount; changing preferences or viewport does not rebuild that instance. GSAP does use matchMedia for hero parallax.
- Main heading formulas and serif endings repeat too frequently. Important labels are often 10–13px; some metadata is smaller. Normal body and control text need a clearer size hierarchy.
- Documentation is stale: PREMIUM_REDESIGN_SPEC describes a pale logo plaque and three-project light gallery; code now has a gold mark, typeset name and five-project dark coverflow. Asset documentation calls blue-horizon historical despite its current Work-page use.

## 2. Positioning and credible offer

Proposed positioning: **True Inspire is an independent design and development studio in Odisha, creating websites, event experiences and custom web products through direct collaboration with its founders.**

Proposed hero: **Websites with a point of view. Built to work.** Supporting text: “We design and develop websites and web products for businesses, events and growing teams. Work directly with Chandan and Akash, from the first brief to launch.” This is proposed copy, subject to confirming the operating model.

Primary offerings: website design/development; event websites and registration experiences; custom web applications. Evidence: current site implementation, TEJAS/CrossFire, RiskRule/DoseLoop. Supporting capabilities: responsive design, interface motion, technical search foundations and performance work. ARGUS belongs in the portfolio as specialist engineering evidence, not as the first thing a café owner must understand.

Schools and hospitality can be presented as intended audiences, not proven completed sectors. Do not advertise e-commerce/payment integration, SEO ranking results, maintenance service-level agreements or conversion uplift without evidence and delivery capacity. Maintenance can become an optional offering after ownership, response expectations and pricing are defined.

Differentiation should be specific: founders who both design and implement, project decisions shown in public cases, and clear ownership from brief through release. Avoid claims such as enterprise scale, award-winning, zero downtime or guaranteed growth.

## 3. Identity and three directions

| Direction | Composition and palette | Benefit | Risk |
|---|---|---|---|
| A — Studio in Focus (recommended) | White reading canvas, navy framing, vivid blue accents; actual interface crops arranged like a design presentation; restrained gold emblem | Makes business and work legible while retaining expressive visual energy | Depends on obtaining good project captures; temporary artwork cannot carry the design alone |
| B — Optical Theatre | Full dark cinematic canvas, one optical lens, depth gallery, blue/cyan and limited violet | Strong immersive first impression; closest continuity with current site | Repeats current decorative direction, weak product evidence and GPU/contrast risks |
| C — Independent Edition | Warm neutral paper, black typography, authentic gold, occasional saturated project-color spreads; typographic editorial layout | Strong cultural and founder identity, inexpensive rendering, useful long-form cases | May feel too restrained for the desired colorful experience unless real work supplies color |

Choose A because it makes the studio's output the attraction and scales to every supporting page. Use B only as a contained portfolio transition; do not combine three full visual systems.

The source emblem is black/gold. Existing alternate transparent light/dark assets are available; the gold variant is a prepared derivative, not automatically an approved brand master. The current typeset navbar name is not the original wordmark. Inspect original vectors if available; obtain owner approval for any alternate lockup. The noisy transparent PNG extraction should not be reused at large scale. Prepare faithful exports only after approval. Test the emblem at 16/32px for favicon legibility; simplify only with permission.

Keep the exact Devanagari phrase and user-supplied transliteration. Put both in the studio story and footer, with a brief owner-approved interpretation such as “As imagined, so created.” Treat that as a proposed English interpretation, not a scholarly translation. The header needs the mark and name, not a tiny unreadable motto. Use language metadata and a Devanagari-capable font for live text.

Proposed tokens: navy #061B32; ink #102D48; canvas #F7F9FC; blue #1479C9; cyan #46D7F5 for accents; violet limited to project imagery; gold retained in the original logo. Test every actual text/background pairing before approval. Keep Manrope for continuity; reserve Instrument Serif for one brand statement and selected editorial moments. Body 16–18px; controls 14–16px; metadata normally 12–14px; headings 42–88px with readable tracking. Grid maximum 1280px, 20–56px gutters, 8px spacing rhythm, 64–112px section spacing. Use modest 8–16px panel corners; reserve pills for compact actions. One focus-ring treatment, one button hierarchy, no scattered glass surfaces.

## 4. Homepage blueprint

| Order | Priority | Content and composition | Interaction/conversion |
|---|---|---|---|
| Header | Essential | Mark/name; Work, Services, Studio; Start a project | Stable fixed top position; opacity changes only; direct contact route |
| Hero | Essential | Plain studio offer, short founder/location statement, one real project composition | View work and Start a project; subtle image arrival, no preloader |
| Selected work | Essential | Three strongest cases, actual UI images, short problem and studio role | Large lead image plus two readable neighbors; keyboard/touch selection; direct case links |
| Services | Essential | Three primary offerings, who each suits, concrete scope and related case | Accessible disclosures; enquiry preselection only as optional convenience |
| Collaboration | Essential | Brief → scope → design/build → review/launch; explain client inputs | Static readable steps; optional image change on focus/click; no long pinned section |
| Studio and creed | Essential | Authentic portraits, direct founder involvement, tagline and concise interpretation | Studio route and founder profiles; no invented testimonials |
| Project invitation | Essential | Short invitation and expected next step | Contact page with brief form; no intermediate CTA dead end |
| Footer | Essential | Complete lockup/motto, navigation, verified contact, privacy once needed | Accessible links and honest business details |
| Testimonials / client-logo strip | Optional after evidence | Only supplied, permissioned endorsements | Omit now |
| Metrics strip / technology ticker / repeated manifesto | Unnecessary | Adds claims or length without answering a client question | Omit |

Recommend an editorial showcase over the current five-plate coverflow until actual screenshots exist. Once assets arrive, retain restrained perspective as an optional desktop enhancement with visible DOM links. On phones use a large single card and adjacent peek, native vertical scrolling, and explicit controls. Temporary artwork must remain labelled; make it a secondary presentation rather than a simulated interface. No invented dashboards.

## 5. Routes and page roles

Preserve current routes. Journey: offer → relevant work → case evidence → short enquiry. `/work/` is a readable archive; homepage is a curated selection. Cases need brief, audience, constraints, personal/team role, image sequence, decisions, actual scope, collaboration credit and supported live/source links. Outcomes require supplied evidence; otherwise discuss what was delivered. Add breadcrumbs to cases.

`/services/` explains scope, exclusions, example work and next step. `/studio/` describes the founders and creed without duplicating the homepage. `/contact/` becomes the real intake. Add `/privacy/` when data handling is defined. No new category pages until there is substantial unique content. Header stays in one position throughout scroll; on light pages use ink text with a pale surface. Home links may remain anchors, but “Start a project” should consistently reach intake. Mobile menu requires focus containment, inert background, Escape, click closure, scroll restoration and closure when crossing desktop breakpoint.

## 6. Component research and decisions

Research accessed 20 November 2026. No packages installed or snippets copied. Exact transferred bundle costs must be measured from the chosen implementation; installation size is not browser payload.

| Source / specific technique | Use and decision | Practical implications |
|---|---|---|
| [React Bits CircularGallery source](https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Components/CircularGallery/CircularGallery.jsx) | Inspected source includes GLSL shaders, image defaults and arrow-key mapping. Useful depth reference, but reject as default portfolio renderer. | Canvas adds GPU/texture and maintenance costs. Requires DOM alternatives, tested touch, keyboard and reduced-motion behavior. Custom CSS perspective better fits five cases and existing React/CSS. |
| [React Bits license](https://raw.githubusercontent.com/DavidHDev/react-bits/main/LICENSE.md) | Current file is MIT plus Commons Clause, not unrestricted MIT. | Website/product use is permitted under stated conditions; retain notices and do not resell component packs. Recheck pinned revision before adoption. |
| [Hover.dev Clip Path Links / Hover Image Links](https://www.hover.dev/components/links) | Listed as free examples; adapt only the reveal principle for desktop archive links. | Page exposes examples, not a fully audited source transfer. Library advertises React/Tailwind/Motion. Adding Motion for one hover is unnecessary: custom CSS 180–240ms reveal. Static label/image must remain available on touch and focus. License of chosen source still needs verification. |
| [21st.dev Hover Preview](https://21st.dev/) | Catalog lists Hover Preview; inspiration for an optional archive pointer preview. Not an approved dependency. | Per-author source/license/accessibility not established. Custom implementation is simpler, with visible thumbnails on mobile and no hover-only information. |
| [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) | Recommended existing tool for desktop image reveals and media-conditioned timelines. | Register cleanup, revert on breakpoint/preference change; no essential content hidden. Existing dependency, low additional cost for a small timeline. Confirm installed-version license before launch. |
| [Lenis source/documentation](https://github.com/darkroomengineering/lenis) | Retain only if user testing prefers it; integrate one RAF owner with GSAP. | Native touch and reduced motion. Explicitly coordinate anchors, menu locking and resize; test nested scroll regions. MIT repository; preserve applicable notices. Maintenance moderate compared with native scroll. |
| [Three.js](https://threejs.org/) | Reject for the critical page path now. | A dedicated interactive model could justify it later; current photographic lens does not. GPU, context-loss fallback, textures and continuous rendering add cost. Existing installation alone is no reason to ship it. |
| [OriginKit](https://www.originkit.dev/) | Not shortlisted. | Site returned no readable content in research; component names, license and dependencies unverified. Do not label it free-to-use without inspecting the selected source. |

Additional premium-site discovery attempts at Awwwards and aktive.studio failed to return usable content. No design conclusions are attributed to those inaccessible pages. This is a practical implementation shortlist, not a completed competitive visual benchmark across live agency sites.

## 7. Motion architecture

Use React for state, CSS for hover/focus and short transitions, GSAP/ScrollTrigger for coordinated image storytelling. Do not add Motion or WebGL for the same effect. Essential motion: clear menu state, form progress/feedback, selected-project transition. Optional: hero image arrival and one brief project image reveal. Avoid scroll pinning on mobile, autoplay, cursor replacement and animated paragraphs.

Timing proposal: hover 180–240ms; menu 220–300ms; project movement 550–700ms with controlled ease-out. Text must not overlap while changing; reserve caption height. Reduced motion uses immediate selection and normal scroll. MatchMedia should clean up when preferences change, not only at initial mount. Native links and content must survive animation failure. Test rapid input, pointer cancellation, horizontal-versus-vertical gestures and zero/one/two project datasets. Pause decorative work outside the viewport.

## 8. Enquiry and privacy plan

Minimum required fields: name, email, brief description. Optional service, organization, budget range including “not sure”, and desired timing. No attachment upload initially. Labels remain visible; errors are connected to fields and summarized above the form. Preserve entries on failure, move focus to errors, prevent duplicate submissions, announce pending/success states. Success means the server accepted delivery, not merely a button click.

Recommended architecture: a small hosted serverless endpoint validates and limits requests, then sends transactional email to an owner-approved inbox through an approved provider. Keep secrets server-side, escape message content, impose field/body limits, rate-limit, use a honeypot, and log only operational identifiers. Consider Turnstile if abuse warrants it; [server-side token validation is mandatory](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/). Define retries, delivery-failure alerts and duplicate prevention. Provider, domain authentication, inbox, retention and operational owner are unresolved. LinkedIn remains an existing alternate channel; no email or response-time promise is invented.

Privacy notice must identify the actual operator, purpose, processors, retention and contact for requests. Avoid adding prospects to marketing lists by default. No active analytics/cookie-writing code was found in the searched active source; Google Fonts does make external requests. That is not proof the deployed host or future integrations set no cookies. Audit network/storage on production before deciding on a banner. UK [ICO guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/) describes consent rules and essential exceptions; relevance depends on markets and jurisdiction. Indian and other applicable requirements must be assessed once business location, customer markets and processors are confirmed. No legal compliance certification is claimed. Self-hosting licensed fonts can reduce third-party requests.

## 9. Technical readiness

Positive: prerender generates route-specific HTML, titles and descriptions; meaningful internal routes exist; no default Vite title; favicon variants exist; hero is a compressed WebP; portraits include dimensions; production source maps are disabled. Prior successful build produced 11 pages. Current package scripts provide no lint/typecheck/test command; absence of those scripts is not a passing test result.

Configuration requirements: PUBLIC_SITE_URL controls canonical URLs, sitemap, Organization schema and social image URLs. Prior build reported it unset. Do not invent a domain. Check generated production artifacts after configuring it. robots.txt exists; llms.txt was not found and is optional, not a substitute for SEO. Add social images designed for sharing, appropriate metadata and case breadcrumbs; LocalBusiness requires verified business facts. Verify favicon fidelity visually at actual sizes.

Deployment checks: unknown routes must return HTTP 404, not merely render an error title with status 200. Check redirects, slash conventions, HTTPS and canonical host. No production host was tested. External project links exist in data but uptime, permissions and current content require verification. Retain repository links as repository links.

Performance: prior build output was approximately 150KB application/motion JS, 142KB React chunk and 21KB UI chunk before compression, plus about 56KB CSS. These are build artifacts from prior checks, not field results. Measure initial transfer and parse costs; inspect whether all routes preload the homepage hero unnecessarily. Three.js appears outside active imports; do not confuse installed size with shipped size. Remove obsolete components only after approval and import analysis. Avoid stripping legally required notices; Vite currently sets legalComments to none, so audit license distribution separately.

Accessibility: verify landmark/focus behavior, menu focus loop, text contrast on glass, visible focus on dark sections, 44px target design goal, 200% zoom and reflow, Devanagari reading, carousel hidden controls, service disclosures and live announcements. Existing reduced-motion CSS is useful but does not prove JS preference changes work. Lighthouse, real-device GPU behavior, screen-reader testing and Core Web Vitals remain outstanding. Proposed production targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile, to be measured rather than promised.

## 10. Roadmap and approval gates

1. **Foundation and evidence:** approve positioning and primary audiences; confirm brand assets, domain, contact operator and project roles; gather approved screenshots. Output: content matrix and one agreed creative direction.
2. **Conversion:** agree intake provider/inbox, privacy handling and delivery owner; prototype the short form and failure/success states. Reliable contact is a prerequisite for public launch.
3. **Visual system:** approve desktop/mobile homepage composition and a representative case page using actual imagery. Establish tokens, typography, button and header states before building all pages.
4. **Implementation after explicit approval:** apply homepage and supporting-page system, preserve routes/credits, replace only approved imagery. Build accessible static flows before decorative motion.
5. **Motion refinement:** one selected-work experience, responsive timeline cleanup, pointer/keyboard parity, reduced motion and menu behavior. Evaluate on a mid-range phone.
6. **Release verification:** domain metadata, response codes, delivery test, storage/network audit, accessibility and performance checks; compare the same weighted rubric against evidence. Publish only under separately authorized deployment scope.

Highest risks: absent screenshot rights/assets; unsupported business claims; endpoint without operational ownership; animation work consuming time before clarity is approved; historical documents treated as evidence. Avoid numerical quality promises: acceptance is a clear first impression, credible project evidence and successful enquiry delivery.

## 11. Inputs genuinely needed from the owner

- Which work should the studio win first: business websites, events, or custom applications? Which are currently delivered reliably?
- Supply approved project captures and confirm role/credit, display permission and the most useful project journey for each case.
- Confirm the master logo/vector, approved alternate mark and exact preferred tagline interpretation.
- Confirm public domain, receiving inbox/contact channel, enquiry owner and feasible response expectation.
- Confirm target markets and data retention preference before selecting form processors and privacy wording.
- Provide any permissioned testimonials or outcomes; omit them until supplied.

**Approval requested for the proposed direction and priorities only. This document does not authorize development.** Production application code, styles, packages and assets were not changed during this review.
