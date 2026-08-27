# Governance Library Page Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Deliver the approved `/governance-library` route end to end so the Governance Library teaser on the Homepage resolves to a reviewable first-party page with exact route copy, a curated catalog, page-specific imagery, and locked tests/docs.

**Architecture:** Build a semantic server-rendered route at `app/governance-library/page.tsx`, backed by a small client catalog component for first-party filtering and visible resource counts. Reuse the existing page shell, reveal system and established Insights styling patterns, then extend CSS only where the Governance Library needs route-specific layout and card treatment.

**Tech Stack:** Next.js App Router, React 19, TypeScript, `next/image`, global CSS, Node built-in test runner.

---

## Task 1: Lock the route contract and route skeleton

**Objective:** Capture the first-party Governance Library contract from the Homepage teaser and create the route shell with exact metadata and section order.

**Files:**
- Create: `app/governance-library/page.tsx`
- Reference: `app/components/HomepageExperience.tsx`
- Reference: `app/insights/page.tsx`

**Steps:**
1. Copy the teaser contract exactly into the new route: `Governance Library`, `Discover implementation-ready governance resources.`, and the guided-enquiry framing.
2. Add route metadata with review-only robots.
3. Build the semantic section sequence: hero, editorial visual/introduction, filterable catalog, guided workflow, FAQ, final CTA.
4. Keep the shared shell identical to the other first-party routes.

**Verification:**
- Route source contains `title: "Governance Library | GPM Associates"`
- Route source contains `robots: { index: false, follow: false }`
- Section order is deterministic and testable.

## Task 2: Build the filterable catalog

**Objective:** Create a first-party Governance Library catalog that lets reviewers browse curated resource categories without placeholder external dependencies.

**Files:**
- Create: `app/components/GovernanceLibraryCatalog.tsx`
- Reference: `app/components/InsightsExplorer.tsx`

**Steps:**
1. Define typed filters and typed resource data.
2. Add a pure helper that returns filtered resources by category.
3. Implement the client component using `useState` + `useMemo`.
4. Reuse the proven filter-button pattern with visible count and featured first card.
5. Link each resource to the guided enquiry path rather than inventing a checkout flow.

**Verification:**
- Source locks exact filter labels and curated resource titles.
- The helper returns all resources for `all` and filtered subsets otherwise.
- The rendered count updates from `filteredResources.length`.

## Task 3: Add page-specific imagery and styling

**Objective:** Give the route a premium editorial visual aligned with the project’s GPM imagery rules and extend CSS only for the new page structures.

**Files:**
- Create/update asset: `public/images/gpm-governance-library-editorial-20260827.webp`
- Modify: `app/globals.css`
- Update docs: `README.md`

**Steps:**
1. Use the newly generated editorial image that shows governance materials in active professional use.
2. Wire the asset through `next/image` with truthful alt text and a concise figcaption.
3. Add only the Governance Library-specific CSS hooks needed for its visual section, catalog details row, workflow cards and CTA.
4. Document the asset provenance and binary lock in the README.

**Verification:**
- The route references the exact local image path.
- The README records source, dimensions, checksum and usage notes.
- New CSS tokens are present and scoped to the route.

## Task 4: Lock the contract with tests and run full verification

**Objective:** Prevent drift by testing the route source, catalog source, docs and local asset checksum.

**Files:**
- Create: `tests/governance-library.test.mjs`
- Modify: `README.md`

**Steps:**
1. Add route tests for metadata, section order and exact approved copy.
2. Add component tests for filter labels, resource mapping, featured-card behavior and guided enquiry CTA.
3. Add asset existence/checksum assertions and README provenance assertions.
4. Run `npm run verify` and `npm run build`.
5. Browser-QA the final route before handoff.

**Verification:**
- `npm run verify` passes
- `npm run build` passes
- Browser QA confirms the route renders, the filters work, and no filtered cards disappear.
