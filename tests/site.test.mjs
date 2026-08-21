import assert from "node:assert/strict";
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

test("only approved local artwork is referenced and no people imagery is requested", () => {
  const assets = [...page.matchAll(/src=\"(\/images\/[^\"]+)\"/g)].map((match) => match[1]);
  assert.deepEqual([...new Set(assets)].sort(), [
    "/images/higgsfield-signal-architecture-hero.png",
    "/images/higgsfield-signal-capacity.png",
    "/images/higgsfield-signal-method.png",
  ]);
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
