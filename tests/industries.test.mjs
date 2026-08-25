import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = "/opt/data/projects/gpm-industries-page";
const read = (file) => readFileSync(join(root, file), "utf8");
const industries = read("app/industries/page.tsx");
const layout = read("app/layout.tsx");
const styles = read("app/globals.css");
const readme = read("README.md");
const markup = industries.slice(industries.indexOf("export default function IndustriesPage"));

function exact(text) {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
}

function assertInOrder(source, snippets) {
  let cursor = 0;
  for (const snippet of snippets) {
    const index = source.indexOf(snippet, cursor);
    assert.notEqual(index, -1, `missing ordered snippet: ${snippet}`);
    cursor = index + snippet.length;
  }
}

test("Industries route exports exact route metadata and remains noindex, nofollow", () => {
  assert.match(industries, /export const metadata: Metadata = \{/);
  assert.match(industries, /title: "Industries & Experience \| GPM Associates"/);
  assert.match(industries, /description:\s*"Explore the sectors where GPM Associates supports data protection, privacy governance, regulatory assurance and operational accountability\./);
  assert.match(industries, /robots: \{ index: false, follow: false \}/);
  assert.match(layout, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
});

test("Industries follows the approved seven-section order", () => {
  assertInOrder(markup, [
    'className="industries-hero dark-plane"',
    'className="stat-strip"',
    'id="sectors" className="industries-sectors section-pad"',
    'id="experience" className="experience dark-plane section-pad"',
    'className="services section-pad"',
    'className="latest section-pad"',
    'className="contact-cta"',
    '<SiteFooter />',
  ]);
});

test("Industries hero, sector framing and experience copy are exact", () => {
  for (const copy of [
    "INDUSTRIES &amp; EXPERIENCE",
    "Sector context changes the shape of compliance.",
    "From public institutions and regulated enterprises to technology and health organisations, our work strengthens accountability where the stakes are highest.",
    "The regulatory question may sound familiar across sectors, but the operating environment, risk profile, decision rights and evidence burden are never exactly the same.",
    "WHERE WE WORK",
    "Recognisable operating environments. Practical sector judgement.",
    "SELECTED EXPERIENCE",
    "Complex environments. Practical outcomes. Defensible assurance.",
    "NATIONAL-SCALE",
    "Data ecosystems and public-interest programmes",
    "REGULATED",
    "Financial, pension, health and professional environments",
    "END-TO-END",
    "Assessment, remediation, training and continuing assurance",
  ]) {
    assert.match(industries, exact(copy));
  }
});

test("Industries includes the four approved sector anchors and sector-specific cards", () => {
  for (const token of [
    'href="#public-institutions"',
    'href="#regulated-enterprises"',
    'href="#technology-services"',
    'href="#health-organisations"',
    'id: "public-institutions"',
    'id: "regulated-enterprises"',
    'id: "technology-services"',
    'id: "health-organisations"',
    "Public institutions and public-interest programmes",
    "Financial, pension and other regulated environments",
    "Technology organisations and digital service delivery",
    "Health organisations and sensitive-data operations",
  ]) {
    assert.match(industries, exact(token));
  }
});

test("Industries delivery-priority and cross-sector sections stay grounded and service-linked", () => {
  for (const copy of [
    "DELIVERY PRIORITIES",
    "What usually changes from one industry to another?",
    "Governance model",
    "Evidence burden",
    "Operational pressure",
    "Workforce adoption",
    "CROSS-SECTOR PRIORITIES",
    "The patterns that carry across industries.",
    "HIGH-ACCOUNTABILITY PROCESSING",
    "CROSS-FUNCTIONAL IMPLEMENTATION",
    "REGULATOR-READY ASSURANCE",
    "RESPONSIBLE INNOVATION",
    'href="/services" aria-label={`See related services for ${item.title}`}',
    'href="/contact"',
  ]) {
    assert.match(industries, exact(copy));
  }
});

test("Industries styling stays local, responsive and integrated with the design system", () => {
  for (const token of [
    ".industries-hero",
    ".industries-hero-grid",
    ".industries-context-card",
    ".industries-sector-grid",
    ".industries-sector-card",
    ".industries-priority-grid",
    "@media (max-width: 1100px)",
    "@media (max-width: 800px)",
    "@media (max-width: 600px)",
  ]) {
    assert.ok(styles.includes(token), `missing Industries styling token: ${token}`);
  }
});

test("README documents Industries as an implemented route", () => {
  for (const copy of [
    "Approved Homepage + About + Services + Industries",
    "Industries & Experience routes",
    "`app/industries/page.tsx` is the semantic, server-rendered `/industries` route",
    "The `/about`, `/services` and `/industries` destinations are implemented on this branch.",
  ]) {
    assert.match(readme, exact(copy));
  }
});

test("Industries avoids invented case-study signals and named-client claims", () => {
  for (const forbidden of [
    "CLIENT LOGOS",
    "CASE STUDY",
    "Our clients include",
    "Named-client relationships",
    "conference hall",
    "boardroom",
  ]) {
    assert.equal(industries.includes(forbidden), false, `forbidden Industries content present: ${forbidden}`);
  }
});
