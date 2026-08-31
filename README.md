# GPM Associates — Approved Homepage + About + Services + Industries + Innovation + Insights + Governance Library + Contact

A production-quality implementation of the client-approved GPM Associates Homepage, About, Services, Industries & Experience, Innovation, Insights, Governance Library and Contact routes, built with Next.js App Router, React and TypeScript. The approved mockups are the source of truth for copy, section order, layout intent, image role, contact details, CTAs and user flow. The Innovation route’s NDPA Quick Check was rebuilt natively after inspecting the existing quick-check workflow and recreating its decision logic inside the website.

## Architecture

- `app/layout.tsx` defines Next.js-managed Google fonts, exact Homepage metadata and review-only crawler controls.
- `app/page.tsx` is the semantic, server-rendered Homepage.
- `app/about/page.tsx` is the semantic, server-rendered `/about` route with route-specific metadata.
- `app/services/page.tsx` is the six-section, semantic, server-rendered `/services` route with route-specific metadata.
- `app/industries/page.tsx` is the semantic, server-rendered `/industries` route aligned to the approved Industries & Experience mockup, including the exact section sequence, sector cards, anonymised engagement framing and review-only CTA.
- `app/tools/page.tsx` is the semantic, server-rendered `/tools` Innovation route and hosts the natively rebuilt NDPA Quick Check experience.
- `app/insights/page.tsx` is the semantic, server-rendered `/insights` route aligned to the approved Insights mockup, including the editorial hero, filterable intelligence explorer, client-advantage panel, FAQ disclosures and review-only CTA.
- `app/governance-library/page.tsx` is the semantic, server-rendered `/governance-library` route with the Governance Library editorial hero, curated resource catalog, guided package-selection workflow, FAQ disclosures and review-only CTA.
- `app/contact/page.tsx` is the semantic, server-rendered `/contact` route with the advisory hero, direct contact pathways, first-party guided enquiry composer, consent-aware location panel, FAQ disclosures and final urgency CTA.
- `app/components/SiteHeader.tsx` and `app/components/SiteFooter.tsx` provide the shared shell for Homepage + About + Services + Industries + Innovation + Insights + Governance Library + Contact without adding route-specific sections elsewhere.
- `app/components/InnovationQuickCheck.tsx` provides the first-party assessment flow, progress states, result summaries and advisor conversion path for `/tools`.
- `app/components/GlobalQuickCheckLauncher.tsx` mounts one floating site-wide trigger that opens the same native NDPA Quick Check in-place without redirecting users to `/tools`.
- `app/components/InsightsExplorer.tsx` provides the first-party topic filters, visible resource count and featured-card treatment for `/insights`.
- `app/components/GovernanceLibraryCatalog.tsx` provides the first-party topic filters, visible resource count and curated package cards for `/governance-library`.
- `app/components/ContactEnquiryPanel.tsx` provides the first-party guided enquiry composer for `/contact`, drafting a structured `mailto:` message without inventing a backend submit path.
- `app/lib/innovationQuickCheck.ts` defines the inspected question set, conditional visibility, rule precedence and indicative result engine used by the native assessment.
- `app/components/ServicesLifecycle.tsx` progressively enhances the server-rendered lifecycle illustration with continuous automatic motion while remaining static for reduced-motion and no-JavaScript users.
- `app/components/HomepageExperience.tsx` provides automatic, reduced-motion-safe hero movement and keyboard-accessible live-feature tabs.
- `app/components/CookieConsent.tsx` provides first-party preference storage, an accessible settings dialog and explicit external-map gating. No analytics, marketing script or third-party map iframe is loaded.
- `app/components/MobileMenu.tsx` provides the responsive navigation, Escape handling, keyboard containment and focus restoration.
- `app/components/ScrollReveal.tsx` progressively enhances selected content with one-time reveals while failing open for reduced-motion and no-JavaScript users.
- `app/globals.css` owns the responsive design system, focus states and all motion fallbacks.
- `next.config.ts` sets global security headers.
- `tests/*.test.mjs` lock exact copy, section order, user journeys, asset checksums, metadata, indexing and security requirements with Node’s built-in test runner.
- `.github/workflows/ci.yml` runs locked dependency installation, verification and a production build with read-only repository permissions.

## Commands

```bash
npm ci
npm run dev
npm run verify
npm run build
git diff --check
npm audit --audit-level=high
```

Use Node.js 20.9 or newer (CI uses Node.js 22). `npm run verify` runs ESLint with zero warnings, strict TypeScript and the deterministic test suite.

## Homepage + About + Services + Industries + Innovation + Insights + Governance Library + Contact scope and extension points

The approved global navigation already uses the final internal destinations:

- `/about`
- `/services`
- `/industries`
- `/tools`
- `/insights`
- `/governance-library`
- `/contact`

The `/about`, `/services`, `/industries`, `/tools`, `/insights`, `/governance-library` and `/contact` destinations are implemented on this branch. No placeholder page copy or invented route content is included.

## Asset provenance

The Homepage ships one local autoplay hero video plus three checksum-locked local image assets. There are no runtime media-generation services, media CDNs or remote image/video dependencies.

### GPT Image 2 hero

- Production derivative: `public/images/gpm-homepage-single-privacy-professional-v3.webp`
- Production SHA-256: `95c555044b54751c1dba2cb1d09be8a48a3b4d57e5b5a729f8f643ff8f794e66`
- Dimensions: `1672 × 941`
- File size: approximately `75 KB` (`74540` bytes)
- Source provider/model: OpenAI GPT Image 2, `gpt-image-2-medium`
- Generated master SHA-256: `89c7b7677a9c77673484c616d32c1c9f72b53005a66a882e9fea0949d66dc464`

The scene was simplified from the locked GPM imagery concept in response to stakeholder review: one African privacy professional interacts directly with a structured data-lifecycle governance screen. The single-subject composition removes the previous secondary professionals, laptop, books, binders and physical records while retaining a recognisable privacy workflow. Controlled crimson/navy lighting and restrained interface depth provide the futuristic layer without generic meetings, cyber-thriller motifs, readable personal information, logos, seals or unsupported institutional evidence. Her face, hand, screen interaction, desktop/mobile crop resilience and publication safety were visually reviewed before a metadata-light WebP derivative was exported.

The person shown is an illustrative generated subject. She is not GPM personnel, a client or a participant in a real engagement.

### Homepage hero motion video

- Production derivative: `public/videos/gpm-homepage-trusted-data-flow-2026.mp4`
- Production SHA-256: `2f41588777d5f0bd48daa93c31ac2178914ab051a0d5a1f325fb8d3672d14655`
- Dimensions: `1280 × 720`
- Duration: `10.0 seconds`
- File size: `1972007` bytes
- Source input: `/opt/data/cache/videos/video_96e0b25daa86.mp4`
- Production treatment: remuxed local MP4 with audio stripped and `+faststart` enabled for muted inline hero playback
- Runtime behavior: autoplaying, looping, muted, `playsInline`, `preload="metadata"`, with the locked GPT Image 2 hero still used as the reduced-motion fallback poster/image

The motion derivative preserves the approved premium GPM art direction: a single African privacy professional activates a governed data-flow interface with restrained crimson/navy motion, sequential workflow emphasis and no disruptive text, logos, voiceover or novelty effects.

### Client-approved brand and verification assets

- `public/images/gpm-logo-approved.png` — SHA-256 `5f1de6c5842eb6128ef3b28847d6e3664ee2400d01ab8b4ef24cec225cd97b9d`
- `public/images/ndpc-verification-qr-approved.png` — SHA-256 `a7a5e24bac214736bded888bd12c4eccf04697527bf5055b82187dae846c9c76`

Both files were copied byte-for-byte from the approved client mockup. The QR links only to the approved official NDPC verification destination.

### About multidisciplinary image

- Source: `https://gpm-phase1-mockup.dataprotectiongpm.chatgpt.site/about-team.webp`
- Production file: `public/images/gpm-about-team-approved-v1.webp`
- SHA-256: `74e66d49efa6e170e663393a9acee30eb15f5b6a0bb3acad854eb03ecbc96db4`
- Dimensions: `1600 × 1100`
- File size: `70962` bytes

The people shown are illustrative subjects. They are not GPM personnel or staff, clients, or participants in a real engagement.

### Services imagery (new GPT Image 2 generation, 2026-08-25)

Two genuinely new text-to-image production masters were generated with OpenAI GPT Image 2 Medium and accepted for this refinement. No supplied reference, existing GPM production image, or other image was provided to the model as an input. Screenshots were used outside the model only to assess placement, focal position, and crop resilience. The previous local assets (`gpm-privacy-impact-assessment-v2.webp` and `gpm-privacy-capability-workshop-v3.webp`) were not reused, derived, regenerated, or used as references.

**Hero decorative master**
- Generation mode: text-to-image with GPT Image 2 Medium; no model image inputs
- Accepted master: `.hermes/generated/gpm-services-hero-new.png`
- Master SHA-256: `fff1acb52eca1721a3aa89a716a3e615822b75d0baa913cff21f0183f831cf71`
- Master dimensions: `1664 × 936`
- Production derivative: `public/images/gpm-services-privacy-impact-data-flow-lagos-2026.webp`
- Derivative SHA-256: `b3f85dbd00374463e3862fb2f00a9e7966d6a8c3f0669b6cce46f43465f9969b`
- Derivative dimensions: `1664 × 936`
- Derivative file size: `177130` bytes
- Derivative format: metadata-stripped high-quality lossy WebP (`-q:v 95`, compression level 6); no resizing or cropping from the accepted master
- Scene: new editorial photograph of a credible African privacy engineer actively performing a privacy impact assessment in a Lagos operations workspace; the narrative connects directly to GPM’s privacy and data-governance work
- Disclosure: the person shown is an illustrative generated subject, not GPM personnel or staff, not a client, and not a participant in a real engagement; the background is decorative with no alt/focus
- Acceptance: accepted on the first generation. The generated output was minimally centre-cropped losslessly from 1672 × 941 to the exact 16:9 accepted master before this derivative milestone; no scene edit was made.

**Integrated design master**
- Model/provider: OpenAI GPT Image 2 Medium through the subscription-backed `openai-codex` image generator
- Generation mode: text-to-image only; no image inputs or prior GPM assets
- Accepted master: `.hermes/generated/gpm-services-integrated-grounded-brainstorming-nigeria.png` in the restricted working archive
- Master SHA-256: `53cc2c53b336cc3ce8f72fa1987921fa55fce6b27e2b8458ce776f4e4eecde3e`
- Actual master dimensions: `1536 × 1024`
- Production derivative: `public/images/gpm-services-integrated-grounded-brainstorming-nigeria-2026.webp`
- Derivative SHA-256: `860cf22b283aba23d0cff438ed50ad182db014f6e507af3c97a95782e8231f21`
- Derivative dimensions: `1536 × 1024`
- Derivative file size: `195458` bytes (`190.9 KB`)
- Derivative format: metadata-stripped high-quality lossy WebP (`quality 95`, effort 6)
- Scene: exactly three Nigerian professionals in a relatable brainstorming session: a Muslim woman in a refined hijab, a man in premium native attire with an understated northern Nigerian embroidered cap, and another contemporary professional collaborate around two laptops, notebooks, working papers and a simple paper data-flow sketch. The activity reads as familiar day-to-day problem solving rather than abstract privacy symbolism.
- Disclosure: the people shown are illustrative generated subjects, not GPM personnel or staff, not clients, and not participants in a real engagement; image is presented with truthful alt text and illustrative-subject disclosure caption
- Acceptance/regeneration: the prior inclusive image was rejected because its strings, grids and symbolic props made the work feel abstract. The first grounded candidate was rejected for lower-right caption intrusion and legible generated text; one clean regeneration produced the accepted 1536 × 1024 image.

These two assets replace only the previous hero (`gpm-privacy-impact-assessment-v2.webp`) and integrated (`gpm-privacy-capability-workshop-v3.webp`) references on the Services route; the old binary files remain in the repository if referenced by other routes, and removal would be unsafe.

### Insights editorial image (approved mockup asset)

- Source: `https://gpm-phase1-mockup.dataprotectiongpm.chatgpt.site/insights-editorial.webp`
- Production file: `public/images/gpm-insights-editorial-approved.webp`
- SHA-256: `ee2e9d31787e21da814cb287bcc30a063e68676bd033322a23634c3c215a3763`
- Dimensions: `1536 × 1024`
- File size: `63846` bytes

The image was copied from the approved Insights mockup to keep the route aligned with the review reference. It is an editorial environment image used to communicate practical privacy intelligence rather than evidence of a specific client engagement.

### Industries editorial image (approved mockup asset)

- Source: `https://gpm-phase1-mockup.dataprotectiongpm.chatgpt.site/industries-hero.webp`
- Production file: `public/images/gpm-industries-editorial-approved.webp`
- SHA-256: `a664a23631bf40337b631cef48c5cbe9901ca1e3551c9338c76462cee76a4de8`
- Dimensions: `1573 × 1081`
- File size: `150940` bytes

The image was copied from the approved mockup to keep the Industries route aligned with the approved review reference. It is an editorial environment image used to communicate cross-sector context rather than evidence of a specific client engagement.

### Industries sector-aware workflow image (fresh GPT Image 2 asset)

- Generation model: `gpt-image-2-medium`
- Prompt intent: grounded Nigerian privacy/workflow advisory scene, no conference clichés, active governance process-board interaction, left-column editorial use
- Production file: `public/images/gpm-sector-workflow-premium-20260825.webp`
- SHA-256: `e9c6acb35c3624ffda9e91a1ccc61f95ec00def6632413a1a8a5bca3b6210f0f`
- Dimensions: `1024 × 1535`
- File size: `131066` bytes

This asset was freshly generated for the Industries route to follow the agreed imagery workflow rather than reusing a prior workflow image. It is used in the sector-aware section as a larger left-column editorial image with the explanatory write-up on the right.

### Governance Library editorial image (fresh GPT Image 2 asset)

- Source provider/model: OpenAI GPT Image 2, `gpt-image-2-medium`
- Generated master: `/opt/data/cache/images/openai_codex_gpt-image-2-medium_20260827_074908_9927a1be.png`
- Production file: `public/images/gpm-governance-library-editorial-20260827.webp`
- SHA-256: `72f0733a9ffd509adb669edefae895759259d85f1eb1bf1691a136bac2f50d01`
- Dimensions: `1536 × 1024`
- File size: `274038` bytes

This asset was freshly generated for the Governance Library route to show implementation-ready governance resources in active professional use rather than reusing an older GPM image. The scene presents two African professionals reviewing policy materials, structured binders and a clean governance checklist in a premium office environment. The people shown are illustrative generated subjects, not GPM personnel, clients, or participants in a real engagement.

### Governance Library section image (fresh GPT Image 2 asset)

- Source provider/model: OpenAI GPT Image 2, `gpt-image-2-medium`
- Generated master: `/opt/data/cache/images/openai_codex_gpt-image-2-medium_20260827_100330_8ae7c680.png`
- Production file: `public/images/gpm-governance-library-section-editorial-20260827.webp`
- SHA-256: `42277f15d292332dc3e66b57af20711486d388ec002cb6067d930c4586f24802`
- Dimensions: `1536 × 1024`
- File size: `88104` bytes

This second Governance Library asset was generated to give the “What the library is for” section a distinct, more operational editorial moment instead of reusing the hero image. It shows two African professionals reviewing folders, working papers and implementation documents in a refined office setting, reinforcing practical governance use without making the section feel repetitive.

### Contact page editorial image (fresh GPT Image 2 asset)

- The `/contact` route is now implemented on this branch.
- Source provider/model: OpenAI GPT Image 2, `gpt-image-2-medium`
- Generated master: `/opt/data/cache/images/openai_codex_gpt-image-2-medium_20260827_182608_b3ba6a66.png`
- Production file: `public/images/gpm-contact-advisor-consultation-20260827.webp`
- Production SHA-256: `9b1c507789c63ee44f345e312c1503c58391a448854d2122f71fa125ddf50831`
- Dimensions: `1536 × 1024`
- File size: `57932` bytes

This asset was freshly generated for the Contact route to support the “Speak with an advisor” journey with a premium one-to-one advisory consultation scene. It shows African senior professionals in a private office discussion with governance papers, policy materials and a restrained privacy-governance working context. The people shown are illustrative generated subjects, not GPM personnel, clients, or participants in a real engagement.

## Consent and external services

Cookie preferences are stored locally in the browser under `gpm-cookie-preferences`. Essential operation does not depend on optional consent. The footer map begins blocked and, after the user explicitly enables external media, exposes a normal link to Google Maps rather than embedding or loading third-party code. Rejecting optional preferences leaves external media blocked. Settings can be reopened from the footer. The `/tools` quick check is implemented natively and does not depend on an external embed or iframe.

## Review and factual caveats

All public wording, claims, contact details and destinations come from the approved mockup. No leadership names, client identities, testimonials, metrics, institutional evidence or additional service claims were invented. Preview output intentionally remains `noindex, nofollow`, and `public/robots.txt` disallows crawling.

Before a production launch, remove review-only indexing restrictions only after explicit approval, confirm the canonical production domain, complete and review every destination route, validate contact delivery, reassess the CSP against any approved analytics or embeds, and repeat the full responsive, accessibility, security and dependency gates against the exact release candidate.
