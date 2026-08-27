import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path, encoding = "utf8") => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, encoding) : encoding === null ? Buffer.alloc(0) : "";
};

const page = read("app/insights/page.tsx");
const component = read("app/components/InsightsExplorer.tsx");
const styles = read("app/globals.css");
const readme = read("README.md");
const plan = read("docs/plans/2026-08-27-insights-page.md");
const image = read("public/images/gpm-insights-editorial-approved.webp", null);
const source = [page, component, styles].join("\n");

const exact = (value) => new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const imageSha = createHash("sha256").update(image).digest("hex");

test("insights route ships review-only metadata and the approved section contract", () => {
  for (const copy of [
    'title: "Insights | GPM Associates"',
    'GPM Associates translates regulation, governance and emerging risk into practical intelligence for executives, DPOs, legal teams, risk leaders and the wider workforce.',
    'robots: { index: false, follow: false }',
    'Insights &amp; Intelligence',
    'Clear thinking for responsible data leadership.',
    'The intelligence lens',
    'See the signal. Understand the consequence. Decide what comes next.',
    'A GPM client advantage',
    'Privacy capability that continues beyond the engagement.',
    'Frequently asked questions',
    'Clear answers to common data protection questions.',
    'Begin a conversation',
    'Need a clear view of a changing requirement?',
    'Request guidance',
  ]) {
    assert.match(page, exact(copy));
  }

  assert.ok(page.indexOf("Insights & Intelligence") < page.indexOf("The intelligence lens"));
  assert.ok(page.indexOf("The intelligence lens") < page.indexOf("<InsightsExplorer />"));
  assert.ok(page.indexOf("<InsightsExplorer />") < page.indexOf("A GPM client advantage"));
  assert.ok(page.indexOf("A GPM client advantage") < page.indexOf("Frequently asked questions"));
  assert.ok(page.indexOf("Frequently asked questions") < page.indexOf("Begin a conversation"));
});

test("insights visual section uses the approved local image, caption and signal list", () => {
  for (const copy of [
    'src="/images/gpm-insights-editorial-approved.webp"',
    'alt="An African privacy professional reviewing research and governance material in a modern workspace"',
    'Research translated into practical organisational direction.',
    'const signalList = ["Regulation", "Governance", "Technology", "Capability"] as const;',
  ]) {
    assert.match(page, exact(copy));
  }

  assert.equal(existsSync(new URL("public/images/gpm-insights-editorial-approved.webp", root)), true);
  assert.equal(imageSha, "ee2e9d31787e21da814cb287bcc30a063e68676bd033322a23634c3c215a3763");
});

test("featured intelligence explorer locks filter labels, category mapping and approved resources", () => {
  for (const copy of [
    'export const insightFilters = [',
    '{ id: "all", label: "All" }',
    '{ id: "regulatory", label: "Regulatory" }',
    '{ id: "governance", label: "Governance" }',
    '{ id: "technology", label: "Technology" }',
    '{ id: "learning", label: "Learning" }',
    'Showing {filteredResources.length} insights',
    'Featured intelligence',
    'Ideas designed to support action.',
    'topic: "Regulatory Intelligence"',
    'title: "From annual compliance to continuous assurance"',
    'category: "regulatory"',
    'topic: "Data Governance"',
    'title: "The operating case for a reliable record of processing activities"',
    'category: "governance"',
    'topic: "Responsible Innovation"',
    'title: "Accountability questions before deploying AI-enabled systems"',
    'category: "technology"',
    'topic: "Third-Party Risk"',
    'title: "What effective processor oversight looks like in practice"',
    'category: "governance"',
    'topic: "Workforce Capability"',
    'title: "Turning annual awareness into role-based competence"',
    'category: "learning"',
    'if (category === "all") {',
    'return insightResources.filter((resource) => resource.category === category);',
    'href="/contact" className="arrow-link"',
    'Request this resource',
  ]) {
    assert.match(component, exact(copy));
  }

  assert.equal((component.match(/category: "governance"/g) || []).length, 2, "governance filter should expose two resources");
  assert.match(component, /aria-pressed=\{active\}/);
  assert.match(component, /className=\{active \? "is-active" : undefined\}/);
  assert.match(component, /className=\{index === 0 \? "resource-card resource-featured" : "resource-card"\}/);
  assert.equal(component.includes('className={index === 0 ? "resource-card resource-featured" : "resource-card"} data-reveal'), false, "stateful filtered resource cards must not depend on one-shot reveal registration");
});

test("faq contract remains exact and semantic", () => {
  for (const copy of [
    'What is a Data Protection Compliance Organisation?',
    'A DPCO is a professional organisation licensed by the Nigeria Data Protection Commission to provide data protection compliance services.',
    'What is the difference between a readiness assessment and a compliance audit?',
    'A readiness assessment provides an indicative view of current maturity and priority gaps.',
    'What is a Compliance Audit Return?',
    'When should an organisation conduct a DPIA?',
    'Does every organisation require a Data Protection Officer?',
    'What evidence should an organisation maintain?',
    'Can GPM support implementation after an audit?',
    'How is GPM training tailored to an organisation?',
    '<details',
    '<summary>',
    '<span>+</span>',
  ]) {
    assert.match(page, exact(copy));
  }

  assert.equal((page.match(/question:/g) || []).length, 8, "expected 8 FAQ entries");
  assert.doesNotMatch(page, /onClick=\{/);
});

test("insights route is documented with asset provenance and implemented scope", () => {
  for (const copy of [
    '# GPM Associates — Approved Homepage + About + Services + Industries + Innovation + Insights',
    'A production-quality implementation of the client-approved GPM Associates Homepage, About, Services, Industries & Experience, Innovation and Insights routes',
    '`app/insights/page.tsx` is the semantic, server-rendered `/insights` route aligned to the approved Insights mockup, including the editorial hero, filterable intelligence explorer, client-advantage panel, FAQ disclosures and review-only CTA.',
    '`app/components/InsightsExplorer.tsx` provides the first-party topic filters, visible resource count and featured-card treatment for `/insights`.',
    'The `/about`, `/services`, `/industries`, `/tools` and `/insights` destinations are implemented on this branch.',
    '### Insights editorial image (approved mockup asset)',
    '- Source: `https://gpm-phase1-mockup.dataprotectiongpm.chatgpt.site/insights-editorial.webp`',
    '- Production file: `public/images/gpm-insights-editorial-approved.webp`',
    '- SHA-256: `ee2e9d31787e21da814cb287bcc30a063e68676bd033322a23634c3c215a3763`',
  ]) {
    assert.match(readme, exact(copy));
  }

  assert.match(plan, exact('**Goal:** Deliver the approved `/insights` route end to end'));
});

test("insights styles lock the major page structures and avoid raw unicode arrow glyphs", () => {
  for (const token of [
    ".page-hero",
    ".insights-visual-grid",
    ".signal-list",
    ".insight-toolbar",
    ".filter-row button",
    ".resource-grid",
    ".resource-featured",
    ".newsletter-grid",
    ".faq-list details[open] summary span",
    ".callout .shell",
    ".button-light",
  ]) {
    assert.ok(styles.includes(token), `missing insights style token: ${token}`);
  }

  assert.equal(source.includes("↗"), false, "use inline SVG arrows rather than raw glyphs");
});
