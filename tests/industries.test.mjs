import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const root = "/opt/data/projects/gpm-industries-page";
const pagePath = join(root, "app/industries/page.tsx");
const pageSource = readFileSync(pagePath, "utf8");
const imagePath = join(root, "public/images/gpm-industries-editorial-approved.webp");

const requiredCopy = [
  "INDUSTRIES &amp; EXPERIENCE",
  "Sector insight backed by practical experience.",
  "CONNECTED ENVIRONMENTS",
  "Sector context changes how obligations must operate in practice.",
  "WHERE WE WORK",
  "Experience across regulated and data-intensive environments.",
  "A SECTOR-AWARE APPROACH",
  "Same legislation. Different operating consequences.",
  "SELECTED ENGAGEMENT EXPERIENCE",
  "Practical work in complex environments.",
  "PROOF PRINCIPLES",
  "Credible. Specific. Responsible.",
  "BEGIN A CONVERSATION",
  "Bring sector context into your compliance programme.",
  "Explore sector considerations",
  "Discuss your environment",
];

const requiredSectors = [
  "Financial Services & Pensions",
  "Public Sector & Regulators",
  "Health & Life Sciences",
  "Technology & Digital Services",
  "Education & Professional Bodies",
  "Insurance",
  "Professional Services",
  "Emerging & Data-Intensive Enterprises",
];

const requiredEngagements = [
  "Strengthening governance around a national-scale data environment",
  "Moving from annual audit activity to sustained remediation",
  "Protecting sensitive information across a multi-stakeholder environment",
  "Embedding privacy and assurance into service delivery",
];

test("industries page matches the approved mockup copy contract", () => {
  for (const text of [...requiredCopy, ...requiredSectors, ...requiredEngagements]) {
    assert.match(pageSource, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(pageSource, /proofPrinciples = \[/);
  assert.match(pageSource, /No confidential client information/);
  assert.match(pageSource, /No unsupported performance claims/);
  assert.match(pageSource, /Approved logos and testimonials only/);
  assert.match(pageSource, /Outcomes supported by engagement evidence/);
});

test("industries page uses the approved editorial image asset", () => {
  assert.equal(existsSync(imagePath), true, "approved editorial image should exist locally");
  assert.match(pageSource, /src=\"\/images\/gpm-industries-editorial-approved\.webp\"/);

  const digest = createHash("sha256").update(readFileSync(imagePath)).digest("hex");
  assert.equal(digest, "a664a23631bf40337b631cef48c5cbe9901ca1e3551c9338c76462cee76a4de8");
});

test("industries page preserves review metadata", () => {
  assert.match(pageSource, /title: \"Industries & Experience \| GPM Associates\"/);
  assert.match(pageSource, /robots: \{ index: false, follow: false \}/);
});

test("industries page contains the expected mockup structure counts", () => {
  const sectorCards = (pageSource.match(/className=\{index % 2 \? \"industries-sector-card-mockup/g) || []).length;
  const engagementCards = (pageSource.match(/className=\{index % 2 \? \"industries-engagement-card/g) || []).length;
  assert.equal(sectorCards, 1, "mapped sector card template should exist");
  assert.equal(engagementCards, 1, "mapped engagement card template should exist");
  assert.match(pageSource, /const sectorCards = \[/);
  assert.match(pageSource, /const engagements = \[/);
});
