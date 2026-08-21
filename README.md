# GPM Associates — Signal Architecture

A production-minded, single-page corporate website prototype built with Next.js App Router, React, and TypeScript. The visual system expresses regulatory complexity becoming operational clarity through editorial layouts, controlled signal artwork, fine rules, and restrained motion.

## Architecture

- `app/layout.tsx` defines Next.js-managed Google font loading, review metadata, and the root document.
- `app/page.tsx` contains the semantic homepage and all currently approved public copy.
- `app/components/MobileMenu.tsx` is the only client component; the rest of the page is server-rendered.
- `app/globals.css` owns the responsive design system, focus states, and reduced-motion fallback.
- `next.config.ts` sets global security headers.
- `tests/site.test.mjs` provides deterministic content, asset, indexing, and security assertions with Node’s built-in test runner.
- `.github/workflows/ci.yml` runs locked dependency installation, verification, and a production build for pull requests and pushes to `main` with read-only repository permissions.

## Commands

```bash
npm ci
npm run dev
npm run verify
npm run build
git diff --check
```

Use Node.js 20.9 or newer (CI uses Node.js 22). Run `npm run verify` before review; it runs ESLint, TypeScript checking, and the deterministic test suite. The production build and whitespace check are separate required gates.

## Extension points

The homepage is deliberately component-light while the content model is still small. When additional approved routes arrive, move repeated editorial rows and shared chrome into server components, preserve anchor IDs for existing navigation, and add real routes only when their content exists. Replace forthcoming insight and policy treatments with links only after those pages are implemented and reviewed. A contact form should be added only with an approved delivery route, consent wording, validation, rate limiting, and privacy handling.

## Asset provenance

The three production PNGs in `public/images/` were copied unchanged from the approved local GPM project source at `/opt/data/gpm-ndpa-quick-check/`:

- `higgsfield-signal-architecture-hero.png`
- `higgsfield-signal-method.png`
- `higgsfield-signal-capacity.png`

They are served locally through `next/image`; there are no runtime image CDNs or remote image dependencies. The concept HTML and render under `/opt/data/cache/` were visual references only, and no Tailwind CDN, WebGL, or runtime-generated code was copied.

## Factual and placeholder caveats

All public claims and contact details come from the implementation brief and its approved context. This prototype intentionally uses `noindex, nofollow` metadata and a crawl-disallowing `robots.txt`. “Perspective,” Privacy Policy, and Cookie Policy entries are explicitly marked forthcoming and are not links. No client names, metrics, testimonials, or additional claims have been invented.

## Preview delivery

The repository uses the standard Next.js build contract and needs no `vercel.json`: Vercel can detect the framework and run `npm run build` from the repository root. No environment variables are required. Preview and review deployments remain intentionally non-indexable through both page metadata and `public/robots.txt`.

No remote, deployment configuration, analytics, or environment file is included. Before a production launch, remove the review-only indexing restrictions only after approval, confirm the canonical production domain, complete legal policy pages, validate contact routing, review the CSP against any approved analytics, and run responsive/accessibility QA plus `npm run verify`, `npm run build`, and `git diff --check` against the exact release candidate.
