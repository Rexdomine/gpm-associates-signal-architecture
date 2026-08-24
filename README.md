# GPM Associates — Approved Homepage

A production-quality implementation of the client-approved GPM Associates Homepage, built with Next.js App Router, React and TypeScript. The approved mockup is the source of truth for copy, section order, layout intent, image role, contact details, CTAs and user flow. This branch deliberately implements the Homepage only; the remaining routes will be delivered and reviewed one page at a time.

## Architecture

- `app/layout.tsx` defines Next.js-managed Google fonts, exact Homepage metadata and review-only crawler controls.
- `app/page.tsx` is the semantic, server-rendered Homepage and global header/footer shell.
- `app/components/HomepageExperience.tsx` provides automatic, reduced-motion-safe hero movement and keyboard-accessible live-feature tabs.
- `app/components/CookieConsent.tsx` provides first-party preference storage, an accessible settings dialog and explicit external-map gating. No analytics, marketing script or third-party map iframe is loaded.
- `app/components/MobileMenu.tsx` provides the responsive navigation, Escape handling, keyboard containment and focus restoration.
- `app/components/ScrollReveal.tsx` progressively enhances selected content with one-time reveals while failing open for reduced-motion and no-JavaScript users.
- `app/globals.css` owns the responsive design system, focus states and all motion fallbacks.
- `next.config.ts` sets global security headers.
- `tests/site.test.mjs` locks exact copy, section order, user journeys, asset checksums, metadata, indexing and security requirements with Node’s built-in test runner.
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

## Homepage scope and extension points

The approved global navigation already uses the final internal destinations:

- `/about`
- `/services`
- `/industries`
- `/tools`
- `/insights`
- `/governance-library`
- `/contact`

Those destination pages are intentionally not implemented on this branch. They will be added only after the Homepage is approved, beginning with About. Shared shell and content primitives should be extracted as each approved page creates a real reuse case; no placeholder page copy or invented route content is included.

## Asset provenance

The Homepage ships three local, checksum-locked assets through `next/image`; there are no runtime image-generation services, image CDNs or remote image dependencies.

### GPT Image 2 hero

- Production derivative: `public/images/gpm-homepage-trusted-data-environments-v1.webp`
- Production SHA-256: `9d8faeaf77f8037f7c24c107230be841eaed55f3f6f8e1ac4486bc76f10efa23`
- Dimensions: `1672 × 941`
- File size: approximately `129 KB`
- Source provider/model: OpenAI GPT Image 2, `gpt-image-2-medium`
- Generated master SHA-256: `1ee668c9fbc1e58acc4878ed2d38fa7ca29e2ab7f4d4874551f072fc631a2386`

The scene was art-directed to depict a recognisable GPM activity: African professionals mapping personal-data flows, reviewing structured records and placing governance controls. It avoids generic conference imagery, readable synthetic text, logos, seals and unsupported institutional evidence. Faces, hands, object contact, crop resilience and publication safety were visually reviewed before a metadata-light WebP derivative was exported.

The people shown are illustrative generated subjects. They are not GPM personnel, clients or participants in a real engagement.

### Client-approved brand and verification assets

- `public/images/gpm-logo-approved.png` — SHA-256 `5f1de6c5842eb6128ef3b28847d6e3664ee2400d01ab8b4ef24cec225cd97b9d`
- `public/images/ndpc-verification-qr-approved.png` — SHA-256 `a7a5e24bac214736bded888bd12c4eccf04697527bf5055b82187dae846c9c76`

Both files were copied byte-for-byte from the approved client mockup. The QR links only to the approved official NDPC verification destination.

## Consent and external services

Cookie preferences are stored locally in the browser under `gpm-cookie-preferences`. Essential operation does not depend on optional consent. The footer map begins blocked and, after the user explicitly enables external media, exposes a normal link to Google Maps rather than embedding or loading third-party code. Rejecting optional preferences leaves external media blocked. Settings can be reopened from the footer.

## Review and factual caveats

All public wording, claims, contact details and destinations come from the approved mockup. No leadership names, client identities, testimonials, metrics, institutional evidence or additional service claims were invented. Preview output intentionally remains `noindex, nofollow`, and `public/robots.txt` disallows crawling.

Before a production launch, remove review-only indexing restrictions only after explicit approval, confirm the canonical production domain, complete and review every destination route, validate contact delivery, reassess the CSP against any approved analytics or embeds, and repeat the full responsive, accessibility, security and dependency gates against the exact release candidate.
