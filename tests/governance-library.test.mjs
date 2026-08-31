import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path, encoding = "utf8") => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, encoding) : encoding === null ? Buffer.alloc(0) : "";
};

const page = read("app/governance-library/page.tsx");
const component = read("app/components/GovernanceLibraryCatalog.tsx");
const styles = read("app/globals.css");
const readme = read("README.md");
const plan = read("docs/plans/2026-08-27-governance-library-page.md");
const heroImage = read("public/images/gpm-governance-library-editorial-20260827.webp", null);
const sectionImage = read("public/images/gpm-governance-library-section-editorial-20260827.webp", null);
const source = [page, component, styles].join("\n");

const exact = (value) => new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const heroImageSha = createHash("sha256").update(heroImage).digest("hex");
const sectionImageSha = createHash("sha256").update(sectionImage).digest("hex");

test("governance library route ships review-only metadata and the approved section contract", () => {
  for (const copy of [
    'title: "Governance Library | GPM Associates"',
    'Explore implementation-ready governance resources from GPM Associates, including curated policy packs, operational toolkits and guided package selection for privacy and data-governance programmes.',
    'robots: { index: false, follow: false }',
    'Governance Library',
    'Discover implementation-ready governance resources.',
    'Explore the library',
    'How it works',
    'Curated library modules',
    'Practical and implementation-ready',
    'Aligned to global best practice',
    'Supports each stage of the governance journey',
    'What the library is for',
    'Move from policy intention to usable implementation material.',
    'How access works',
    'A guided route to the right package.',
    'Frequently asked questions',
    'Common questions before requesting a package.',
    'Guided enquiry',
    'Need help identifying the right governance package?',
    'Request a package review',
  ]) {
    assert.match(page, exact(copy));
  }

  assert.ok(page.indexOf('Governance Library') < page.indexOf('What the library is for'));
  assert.ok(page.indexOf('What the library is for') < page.indexOf('<GovernanceLibraryCatalog />'));
  assert.ok(page.indexOf('<GovernanceLibraryCatalog />') < page.indexOf('How access works'));
  assert.ok(page.indexOf('How access works') < page.indexOf('Frequently asked questions'));
  assert.ok(page.indexOf('Frequently asked questions') < page.indexOf('Guided enquiry'));
});

test("governance library visual section uses the approved local image, caption and signal list", () => {
  for (const copy of [
    'src="/images/gpm-governance-library-editorial-20260827.webp"',
    'alt="Two African professionals reviewing governance policy materials, binders and a structured compliance checklist in a modern office"',
    'src="/images/gpm-governance-library-section-editorial-20260827.webp"',
    'alt="Two African professionals reviewing governance folders, working papers and implementation documents in a refined office setting"',
    'const heroModules = ["Privacy Governance", "Third-Party Oversight", "AI Governance"] as const;',
    'aria-label="Featured governance library modules"',
    'Governance resources organised for practical adoption, oversight and follow-through.',
    'const resourceSignals = ["Policy suites", "Toolkits", "Operational packs", "Leadership briefs"] as const;',
  ]) {
    assert.match(page, exact(copy));
  }

  assert.equal(existsSync(new URL('public/images/gpm-governance-library-editorial-20260827.webp', root)), true);
  assert.equal(existsSync(new URL('public/images/gpm-governance-library-section-editorial-20260827.webp', root)), true);
  assert.equal(heroImageSha, '72f0733a9ffd509adb669edefae895759259d85f1eb1bf1691a136bac2f50d01');
  assert.equal(sectionImageSha, '42277f15d292332dc3e66b57af20711486d388ec002cb6067d930c4586f24802');
});

test("governance library catalog locks filter labels, package mapping and request CTA", () => {
  for (const copy of [
    'export const governanceLibraryFilters = [',
    '{ id: "all", label: "All" }',
    '{ id: "governance", label: "Governance" }',
    '{ id: "operations", label: "Operations" }',
    '{ id: "third-party", label: "Third-party" }',
    '{ id: "ai", label: "AI & data" }',
    'Showing {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}',
    'Governance library catalog',
    'Resources designed for real operating use.',
    'topic: "Privacy Governance"',
    'title: "Core privacy governance policy pack"',
    'category: "governance"',
    'topic: "Data Lifecycle Controls"',
    'title: "Records, retention and lawful-use control toolkit"',
    'category: "operations"',
    'topic: "Incident Preparedness"',
    'title: "Personal data breach response and notification pack"',
    'topic: "Third-Party Oversight"',
    'title: "Vendor onboarding and processor oversight toolkit"',
    'category: "third-party"',
    'topic: "Responsible Innovation"',
    'title: "AI governance starter pack for accountable adoption"',
    'category: "ai"',
    'topic: "Executive Oversight"',
    'title: "Board and leadership privacy oversight briefing set"',
    'if (category === "all") {',
    'return governanceLibraryResources.filter((resource) => resource.category === category);',
    'href="/contact" className="arrow-link"',
    'Request this package',
  ]) {
    assert.match(component, exact(copy));
  }

  assert.equal((component.match(/category: "governance"/g) || []).length, 2, 'governance filter should expose two resources');
  assert.match(component, /aria-pressed=\{active\}/);
  assert.match(component, /className=\{active \? "is-active" : undefined\}/);
  assert.match(component, /className=\{index === 0 \? "resource-card resource-featured governance-resource-card" : "resource-card governance-resource-card"\}/);
});

test("governance library workflow and faq contract remain exact and semantic", () => {
  for (const copy of [
    'Choose the closest resource set',
    'Request a guided fit check',
    'Add advisory support if needed',
    'Are these resources generic templates?',
    'Can a package be matched to our sector or operating environment?',
    'Do the resources include editable working documents?',
    'Can we combine a governance package with training or advisory support?',
    'Is the Governance Library suitable for organisations still early in their privacy programme?',
    'How do we request the right package?',
    '<details',
    '<summary>',
    '<span>+</span>',
  ]) {
    assert.match(page, exact(copy));
  }

  assert.equal((page.match(/question:/g) || []).length, 6, 'expected 6 FAQ entries');
  assert.doesNotMatch(page, /onClick=\{/);
});

test("governance library route is documented with asset provenance and implemented scope", () => {
  for (const copy of [
    '# GPM Associates — Approved Homepage + About + Services + Industries + Innovation + Insights + Governance Library + Contact',
    'A production-quality implementation of the client-approved GPM Associates Homepage, About, Services, Industries & Experience, Innovation, Insights, Governance Library and Contact routes',
    '`app/governance-library/page.tsx` is the semantic, server-rendered `/governance-library` route with the Governance Library editorial hero, curated resource catalog, guided package-selection workflow, FAQ disclosures and review-only CTA.',
    '`app/components/GovernanceLibraryCatalog.tsx` provides the first-party topic filters, visible resource count and curated package cards for `/governance-library`.',
    'The `/about`, `/services`, `/industries`, `/tools`, `/insights`, `/governance-library` and `/contact` destinations are implemented on this branch.',
    '### Governance Library editorial image (fresh GPT Image 2 asset)',
    '- Source provider/model: OpenAI GPT Image 2, `gpt-image-2-medium`',
    '- Production file: `public/images/gpm-governance-library-editorial-20260827.webp`',
    '- SHA-256: `72f0733a9ffd509adb669edefae895759259d85f1eb1bf1691a136bac2f50d01`',
    '### Governance Library section image (fresh GPT Image 2 asset)',
    '- Production file: `public/images/gpm-governance-library-section-editorial-20260827.webp`',
    '- SHA-256: `42277f15d292332dc3e66b57af20711486d388ec002cb6067d930c4586f24802`',
  ]) {
    assert.match(readme, exact(copy));
  }

  assert.match(plan, exact('**Goal:** Deliver the approved `/governance-library` route end to end'));
});

test("governance library styles lock the major page structures and avoid raw unicode arrow glyphs", () => {
  for (const token of [
    '.governance-library-hero',
    '.governance-library-hero-layer',
    '.governance-library-hero-grid',
    '.governance-library-module-stack',
    '.governance-library-proof-strip',
    '.governance-library-visual',
    '.governance-library-catalog',
    '.governance-resource-grid',
    '.governance-resource-card',
    '.governance-resource-includes',
    '.governance-library-workflow',
    '.governance-workflow-grid',
    '.button-light',
  ]) {
    assert.ok(styles.includes(token), `missing governance library style token: ${token}`);
  }

  assert.equal(source.includes('↗'), false, 'use inline SVG arrows rather than raw glyphs');
});
