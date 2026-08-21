import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const robots = readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8");
const styles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

const luminance = (hex) => {
  const channels = hex.match(/[a-f\d]{2}/gi).map((channel) => parseInt(channel, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

test("homepage contains the required content and sections", () => {
  const required = [
    "INDEPENDENT REGULATORY ADVISORY",
    "From regulatory complexity to confident action.",
    "One connected regulatory intelligence system.",
    "From obligation to operational confidence.",
    "Independent advice. Practical regulatory confidence.",
    "Building capability that lasts beyond compliance.",
    "Regulatory perspectives for informed decisions.",
    "Ready to move from obligation to confident action?",
    "2017 Guidelines for Data Protection",
    "draft Nigeria Data Protection Regulation (NDPR)",
  ];
  for (const copy of required) assert.match(page, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  for (const id of ["expertise", "approach", "about", "insights", "contact"]) assert.match(page, new RegExp(`id=\\"${id}\\"`));
});

test("arrows use deterministic vector markup instead of emoji-prone Unicode", () => {
  assert.match(page, /<svg[^>]*aria-hidden="true"[^>]*focusable="false"[^>]*>/);
  assert.match(page, /stroke="currentColor"/);
  assert.equal(page.includes("↗"), false);
});

test("contact details are exact and policy items are non-navigation treatments", () => {
  for (const detail of [
    "4th Floor, Adamawa Plaza, Plot 1099 First Avenue,",
    "Central Business District, Abuja, Nigeria.",
    "info@gpm-associates.ng",
    "enquiries@gpm-associates.ng",
    "+234 805 615 1038",
    "+234 803 312 6637",
    "© 2026 GPM Associates. All rights reserved.",
  ]) assert.ok(page.includes(detail), `missing ${detail}`);
  assert.ok(page.includes("<span>Privacy Policy — forthcoming</span>"));
  assert.ok(page.includes("<span>Cookie Policy — forthcoming</span>"));
});

test("only approved local workflow imagery is referenced and the exact assets are present", () => {
  const assets = [...page.matchAll(/src=\"(\/images\/[^\"]+)\"/g)].map((match) => match[1]);
  const approvedAssets = {
    "/images/gpm-capacity-building-v2.webp": "58467b720eaa780a9c56656f612f1341973348a565bddc68b351b8e118c581b0",
    "/images/gpm-data-protection-hero.webp": "87448a39f6db181ea1d83f392789e4cfe7fa78f0ff4a6d37ac5b40c8eaab2167",
    "/images/gpm-independent-advice.webp": "16ff313bf5e98cd9b4b42ddfddd2c8d7c4440eeefafa74e2634e8913f1842049",
    "/images/gpm-regulatory-method.webp": "ed5e996ec5b0ef2e23f9cb78dd6e127053abc5fdf61c6e550f4559ecf917c808",
  };
  assert.deepEqual([...new Set(assets)].sort(), Object.keys(approvedAssets));
  for (const [asset, checksum] of Object.entries(approvedAssets)) {
    const bytes = readFileSync(new URL(`../public${asset}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), checksum, `unexpected bytes for ${asset}`);
  }
  for (const phrase of ["stock photo", "team portrait", "client logo", "testimonial", "trusted by", "industry-leading"]) {
    assert.equal(page.toLowerCase().includes(phrase), false, `unsupported phrase: ${phrase}`);
  }
});

test("review prototype blocks indexing and crawling", () => {
  assert.match(layout, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Disallow:\s*\//);
});

test("security headers are configured", () => {
  for (const header of ["Content-Security-Policy", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) assert.ok(config.includes(header));
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /nosniff/);
  assert.match(config, /DENY/);
});

test("small muted text colors meet WCAG AA contrast", () => {
  const slate = styles.match(/--slate:\s*(#[a-f\d]{6})/i)?.[1];
  const methodEyebrow = styles.match(/\.method-content > \.eyebrow\s*\{\s*color:\s*(#[a-f\d]{6})/i)?.[1];

  assert.ok(slate, "missing slate color");
  assert.ok(methodEyebrow, "missing method eyebrow color");
  assert.ok(contrast(slate, "#f7f5f0") >= 4.5, "slate text must pass on ivory");
  assert.ok(contrast(methodEyebrow, "#0a2231") >= 4.5, "method eyebrow must pass on navy");
});
