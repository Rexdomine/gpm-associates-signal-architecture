# GPM Associates — Approved Homepage + About + Services + Industries

A production-quality implementation of the client-approved GPM Associates Homepage, About, Services and Industries & Experience routes, built with Next.js App Router, React and TypeScript. The approved mockups are the source of truth for copy, section order, layout intent, image role, contact details, CTAs and user flow. The remaining routes will be delivered and reviewed one page at a time.

## Architecture

- `app/layout.tsx` defines Next.js-managed Google fonts, exact Homepage metadata and review-only crawler controls.
- `app/page.tsx` is the semantic, server-rendered Homepage.
- `app/about/page.tsx` is the semantic, server-rendered `/about` route with route-specific metadata.
- `app/services/page.tsx` is the six-section, semantic, server-rendered `/services` route with route-specific metadata.
- `app/industries/page.tsx` is the semantic, server-rendered `/industries` route focused on sector context, delivery priorities and cross-sector experience themes.
- `app/components/SiteHeader.tsx` and `app/components/SiteFooter.tsx` provide the shared shell for Homepage + About + Services + Industries without adding route-specific sections elsewhere.
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

## Homepage + About + Services + Industries scope and extension points

The approved global navigation already uses the final internal destinations:

- `/about`
- `/services`
- `/industries`
- `/tools`
- `/insights`
- `/governance-library`
- `/contact`

The `/about`, `/services` and `/industries` destinations are implemented on this branch. The other destination pages remain intentionally unimplemented and will be added only after their approved page contracts are available. No placeholder page copy or invented route content is included.

## Asset provenance

The Homepage ships three local, checksum-locked assets through `next/image`; there are no runtime image-generation services, image CDNs or remote image dependencies.

### GPT Image 2 hero

- Production derivative: `public/images/gpm-homepage-single-privacy-professional-v3.webp`
- Production SHA-256: `95c555044b54751c1dba2cb1d09be8a48a3b4d57e5b5a729f8f643ff8f794e66`
- Dimensions: `1672 × 941`
- File size: approximately `75 KB` (`74540` bytes)
- Source provider/model: OpenAI GPT Image 2, `gpt-image-2-medium`
- Generated master SHA-256: `89c7b7677a9c77673484c616d32c1c9f72b53005a66a882e9fea0949d66dc464`

The scene was simplified from the locked GPM imagery concept in response to stakeholder review: one African privacy professional interacts directly with a structured data-lifecycle governance screen. The single-subject composition removes the previous secondary professionals, laptop, books, binders and physical records while retaining a recognisable privacy workflow. Controlled crimson/navy lighting and restrained interface depth provide the futuristic layer without generic meetings, cyber-thriller motifs, readable personal information, logos, seals or unsupported institutional evidence. Her face, hand, screen interaction, desktop/mobile crop resilience and publication safety were visually reviewed before a metadata-light WebP derivative was exported.

The person shown is an illustrative generated subject. She is not GPM personnel, a client or a participant in a real engagement.

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

Two genuinely new GPT Image 2 production masters were generated and approved by Groot for this refinement; the previous local assets (`gpm-privacy-impact-assessment-v2.webp` and `gpm-privacy-capability-workshop-v3.webp`) were not reused, derived, or regenerated.

**Hero decorative master**
- Job ID / generation mode: `gpt_image_2` (text-to-image), job `10f13d2c-a8c7-4984-ad9e-f006c52f20ef`, model `videotape-alpha`, tier `gpt-image-2-medium`
- Generation mode: text-to-image; supplied reference screenshots were used only to determine placement, crop and focal position and were not model inputs
- Master file: `/tmp/gpm-hero-new.png`
- Master SHA-256: `689ffd1335eaa2322291a17d033d82ade0d6c7639bf122af954a305d33ed113f`
- Actual master dimensions: `1344 × 752`
- Production derivative: `public/images/gpm-services-privacy-impact-data-flow-lagos-2026.webp`
- Derivative SHA-256: `6e0da87cf917079f460249a15c3c789a1ce6e0ac156e0f1b7e53fc6ebac3d0d0`
- Derivative dimensions: `1344 × 752`
- Derivative file size: `92380` bytes (`90.2 KB`)
- Derivative format: metadata-light lossy WebP (`-q:v 95`, no embedded metadata/title/author)
- Scene: new editorial photograph of a credible African privacy engineer actively performing a privacy impact assessment in a Lagos operations workspace; the narrative connects directly to GPM’s privacy and data-governance work
- Disclosure: the person shown is an illustrative generated subject, not GPM personnel or staff, not a client, and not a participant in a real engagement; the background is decorative with no alt/focus

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

The previous stale statement that neither asset was regenerated is removed. These two assets replace only the previous hero (`gpm-privacy-impact-assessment-v2.webp`) and integrated (`gpm-privacy-capability-workshop-v3.webp`) references on the Services route; the old binary files remain in the repository if referenced by other routes, and removal would be unsafe.

## Consent and external services

Cookie preferences are stored locally in the browser under `gpm-cookie-preferences`. Essential operation does not depend on optional consent. The footer map begins blocked and, after the user explicitly enables external media, exposes a normal link to Google Maps rather than embedding or loading third-party code. Rejecting optional preferences leaves external media blocked. Settings can be reopened from the footer.

## Review and factual caveats

All public wording, claims, contact details and destinations come from the approved mockup. No leadership names, client identities, testimonials, metrics, institutional evidence or additional service claims were invented. Preview output intentionally remains `noindex, nofollow`, and `public/robots.txt` disallows crawling.

Before a production launch, remove review-only indexing restrictions only after explicit approval, confirm the canonical production domain, complete and review every destination route, validate contact delivery, reassess the CSP against any approved analytics or embeds, and repeat the full responsive, accessibility, security and dependency gates against the exact release candidate.
