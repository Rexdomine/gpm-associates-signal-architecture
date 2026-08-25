import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};

const toolsPage = read("app/tools/page.tsx");
const embed = read("app/components/InnovationQuickCheckEmbed.tsx");
const styles = read("app/globals.css");
const nextConfig = read("next.config.ts");
const readme = read("README.md");

function assertIncludesAll(source, values) {
  for (const value of values) {
    assert.ok(source.includes(value), `missing exact contract text: ${value}`);
  }
}

function assertInOrder(source, markers) {
  let cursor = -1;
  for (const marker of markers) {
    const next = source.indexOf(marker, cursor + 1);
    assert.ok(next > cursor, `missing or out of order: ${marker}`);
    cursor = next;
  }
}

test("Innovation route exists with route metadata and noindex, nofollow", () => {
  assert.ok(toolsPage.length > 0, "app/tools/page.tsx missing");
  assert.match(toolsPage, /export const metadata: Metadata = \{/);
  assert.match(toolsPage, /title:\s*"Innovation \| GPM Associates"/);
  assert.match(toolsPage, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
});

test("Innovation page matches the approved section order", () => {
  assertInOrder(toolsPage, [
    'tools-hero dark-plane',
    'tools-featured dark-plane',
    'tools-overview section-pad',
    'tools-live dark-plane section-pad',
    'contact-cta',
    '<SiteFooter />',
  ]);
});

test("Innovation page preserves the mockup-aligned intro, feature, and CTA copy", () => {
  assertIncludesAll(toolsPage, [
    "INNOVATION",
    "GPM Innovation Lab",
    "Interactive tools and assessments designed to support clearer privacy, compliance and governance decisions.",
    "FEATURED INNOVATION",
    "DECISION INTELLIGENCE",
    "From uncertainty to proportionate action.",
    "FEATURED TOOL",
    "Complete a short, rules-led assessment to identify your organisation’s likely UHL, EHL or OHL processing level and understand the practical compliance steps that may follow.",
    "ORGANISATION-TYPE RULES",
    "INDICATIVE CLASSIFICATION",
    "DPO, POLICIES & TRAINING",
    "BEFORE YOU BEGIN",
    "This tool is informational. It does not constitute a formal audit, regulatory determination or confirmation of compliance.",
    "Approximately 90 seconds",
    "No sign-up required",
    "Results and next steps shown instantly",
    "LIVE GPM PRODUCT",
    "CONNECTED TO THE CURRENT QUICK CHECK",
    "NDPA QUICK CHECK",
    "Find your likely processing level",
    "OPEN FULL TOOL",
    "BEGIN A CONVERSATION",
    "Turn your indicative level into an accountable compliance programme.",
    "Request a professional assessment to validate your classification and define the appropriate DPO,",
    "Speak with an advisor",
  ]);
});

test("Innovation featured pathway remains a three-step assess-classify-act sequence", () => {
  assertInOrder(toolsPage, ["01", "ASSESS", "02", "CLASSIFY", "03", "ACT"]);
  assert.match(toolsPage, /InnovationFeatureArtwork/);
  assert.match(toolsPage, /className="tools-pathway"/);
});

test("Innovation page embeds the live quick check behind explicit consent controls", () => {
  assert.ok(embed.length > 0, "InnovationQuickCheckEmbed component missing");
  assertIncludesAll(embed, [
    'const QUICK_CHECK_URL = "https://gpm-ndpa-quick-check.dataprotectiongpm.chatgpt.site/?source=gpm-website"',
    'title="GPM NDPA Quick Check"',
    'Enable quick check',
    'Manage preferences',
    'The live quick check is treated as external media.',
    'gpm-open-cookie-settings',
    'loading="lazy"',
    'referrerPolicy="strict-origin-when-cross-origin"',
  ]);
  assert.match(embed, /<iframe[\s\S]*className="innovation-tool-frame"/);
});

test("Innovation route CSP explicitly allows the quick-check frame origin", () => {
  assert.match(nextConfig, /frame-src 'self' https:\/\/gpm-ndpa-quick-check\.dataprotectiongpm\.chatgpt\.site/);
});

test("Innovation styles include dedicated route layout, artwork, and embedded assessment treatment", () => {
  assertIncludesAll(styles, [
    ".tools-hero",
    ".tools-featured-panel",
    ".tools-pathway-step",
    ".innovation-feature-svg",
    ".innovation-orbit",
    ".tools-benefits",
    ".tools-live-frame",
    ".innovation-tool-frame",
    ".innovation-tool-consent",
  ]);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*innovation-orbit/s);
});

test("README now includes Innovation in the implemented route set", () => {
  assert.match(readme, /Homepage \+ About \+ Services \+ Industries \+ Innovation/);
  assert.match(readme, /production-quality implementation of the client-approved GPM Associates Homepage, About, Services, Industries & Experience and Innovation routes/i);
});
