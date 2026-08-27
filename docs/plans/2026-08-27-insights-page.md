# Insights Page Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Deliver the approved `/insights` route end to end from the locked mockup contract, including the editorial hero, filterable intelligence grid, client-advantage panel, FAQ accordion, exact CTA flow, local image asset, route tests, and repo documentation.

**Architecture:** Add a new App Router page at `app/insights/page.tsx` that reuses the existing shared shell and design system, backed by a small client component for topic filtering. Keep all approved copy in source, preserve review-only metadata, download the approved editorial image into `public/images/`, and lock the route contract with deterministic tests plus full repo verify/build.

**Tech Stack:** Next.js App Router, React, TypeScript, existing shared components, Node test runner, local static image asset.

---

## Task 1: Lock the contract and asset provenance

**Objective:** Capture the exact approved `/insights` content, structure, and image source before implementation.

**Files:**
- Create: `docs/plans/2026-08-27-insights-page.md`
- Download: `public/images/gpm-insights-editorial-approved.webp`

**Acceptance criteria:**
- Section order is locked as: hero → visual/intelligence lens → featured intelligence/filter → client advantage → FAQs → CTA.
- Exact visible copy, filter labels, resource-card titles/descriptions, FAQ questions/answers, CTA labels, and image alt text match the approved mockup.
- Approved image is stored locally for first-party delivery.

## Task 2: Implement the route and focused interactivity

**Objective:** Add the new `/insights` page with faithful layout and minimal scoped interactivity.

**Files:**
- Create: `app/insights/page.tsx`
- Create: `app/components/InsightsExplorer.tsx`
- Modify: `app/globals.css`

**Acceptance criteria:**
- Route exports review-only metadata and renders through the shared header/footer.
- Filter buttons expose `aria-pressed` state and change the visible resource cards/count by topic.
- FAQ uses semantic `details/summary` disclosure rather than bespoke JS.
- No placeholder copy, invented claims, or external image dependency remain.
- Desktop/mobile layouts follow the existing site language and avoid overflow.

## Task 3: Add regression tests and docs

**Objective:** Lock the new route into the repo’s deterministic verification boundary.

**Files:**
- Create: `tests/insights.test.mjs`
- Modify: `README.md`

**Acceptance criteria:**
- Tests assert route metadata, exact section order, exact approved copy, filter/topic behaviour contract in source, FAQ content, local asset reference, and asset checksum.
- README now documents `/insights`, the new component, and editorial image provenance.

## Task 4: Verify, review, and checkpoint

**Objective:** Prove the candidate is safe and ready for handoff.

**Files:**
- No new files required beyond the implementation diff

**Acceptance criteria:**
- `npm run verify && npm run build` pass.
- Browser QA confirms the rendered `/insights` route loads, the filter works, FAQs expand/collapse, and there is no horizontal overflow.
- Independent NightWing-style review confirms the change is safe, scoped, and merge-ready.
- Final branch state is clean and the exact candidate is committed before handoff.
