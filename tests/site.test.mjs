import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const revealControllerUrl = new URL("../app/components/ScrollReveal.tsx", import.meta.url);
const revealController = existsSync(revealControllerUrl) ? readFileSync(revealControllerUrl, "utf8") : "";
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
    "/images/gpm-data-flow-mapping-v2.webp": {
      checksum: "459fd1db818c42b6e1d7610f5d2bf3780a83a19656bee5fa252a5fcba9b98ac5",
      alt: "Professional holding a paper register beside a wall of connected blank process cards",
      width: 1536,
      height: 1024,
    },
    "/images/gpm-independent-policy-review-v2.webp": {
      checksum: "fdc62579c7e0fa560968f6c0f1c68c58f138643a1cc0c51ea39674a79e9d5d90",
      alt: "Professional reviewing structured forms beside policy binders",
      width: 1024,
      height: 1536,
    },
    "/images/gpm-privacy-capability-workshop-v3.webp": {
      checksum: "4ae9f54dd6837b3de10fd95a8989a5227bb50cf19ade76d8e12e884156c1f985",
      alt: "Facilitator pointing to a card workflow while three professionals complete paper exercises",
      width: 1537,
      height: 1023,
    },
    "/images/gpm-privacy-impact-assessment-v2.webp": {
      checksum: "ec431c641ef23f097c1a28eb5643fa154299ddb28e46cfd51f4050b030f62238",
      alt: "Hands arranging circular icon cards depicting people, documents, storage, sharing, archiving and deletion",
      width: 1254,
      height: 1254,
    },
  };
  const supersededAssets = [
    "/images/gpm-capacity-building-v2.webp",
    "/images/gpm-data-protection-hero.webp",
    "/images/gpm-independent-advice.webp",
    "/images/gpm-regulatory-method.webp",
  ];

  assert.deepEqual([...new Set(assets)].sort(), Object.keys(approvedAssets));
  for (const [asset, contract] of Object.entries(approvedAssets)) {
    assert.ok(
      page.includes(`src=\"${asset}\" alt=\"${contract.alt}\" width={${contract.width}} height={${contract.height}}`),
      `missing image contract for ${asset}`,
    );
    const bytes = readFileSync(new URL(`../public${asset}`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), contract.checksum, `unexpected bytes for ${asset}`);
  }
  for (const asset of supersededAssets) assert.equal(page.includes(asset), false, `superseded asset referenced: ${asset}`);
  for (const phrase of ["stock photo", "team portrait", "client logo", "testimonial", "trusted by", "industry-leading"]) {
    assert.equal(page.toLowerCase().includes(phrase), false, `unsupported phrase: ${phrase}`);
  }
});

test("mobile policy-review crop preserves the direct-work evidence", () => {
  const mobileStyles = styles.match(/@media \(max-width: 600px\) \{([\s\S]*?)\n\}/)?.[1];
  assert.ok(mobileStyles, "missing mobile media block");

  const aboutArtRule = mobileStyles.match(/\.about-art\s*\{([^}]*)\}/)?.[1];
  assert.ok(aboutArtRule, "missing mobile .about-art rule");
  assert.match(aboutArtRule, /height:\s*460px/);
  assert.match(aboutArtRule, /margin-inline:\s*-16px/);

  const aboutImageRule = mobileStyles.match(/\.about-art img\s*\{([^}]*)\}/)?.[1];
  assert.ok(aboutImageRule, "missing mobile .about-art img rule");
  assert.match(aboutImageRule, /object-position:\s*center 60%/);
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

test("scroll reveal is selective, progressive, one-time, and motion-safe", () => {
  assert.match(page, /import \{ ScrollReveal \} from "\.\/components\/ScrollReveal"/);
  assert.match(page, /<ScrollReveal \/>/);

  const hooks = page.match(/data-reveal(?:=|\s|>)/g) ?? [];
  assert.ok(hooks.length >= 10 && hooks.length <= 14, `expected controlled section groups, found ${hooks.length}`);
  const hero = page.slice(page.indexOf('<section className="hero"'), page.indexOf('<aside className="proof-rail"'));
  const proof = page.slice(page.indexOf('<aside className="proof-rail"'), page.indexOf('<section className="expertise'));
  assert.equal(hero.includes("data-reveal"), false, "hero must remain immediate");
  assert.equal(proof.includes("data-reveal"), false, "proof rail must remain immediate");
  assert.equal(/<article className="(?:expertise|insight)-row"[^>]*data-reveal/.test(page), false, "do not reveal every repeated row");

  assert.match(revealController, /^"use client";/);
  assert.match(revealController, /querySelectorAll<HTMLElement>\("\[data-reveal\]"\)/);
  assert.match(revealController, /IntersectionObserver/);
  assert.match(revealController, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(revealController, /getBoundingClientRect\(\)/, "near-viewport content must be finalized before activation");
  assert.match(revealController, /classList\.add\("reveal-ready"\)/, "hidden states must only activate after setup");
  assert.match(revealController, /data-reveal-visible/);
  assert.match(revealController, /unobserve\(/, "reveals must happen once");
  assert.match(revealController, /disconnect\(\)/);
  assert.match(revealController, /classList\.remove\("reveal-ready"\)/);

  assert.match(styles, /\.reveal-ready \[data-reveal\]/);
  assert.match(styles, /opacity:\s*0/);
  assert.match(styles, /translateY\((?:1[6-9]|2[0-8])px\)/);
  assert.match(styles, /transition-duration:\s*(?:6[5-9]\d|7\d\d|8[0-5]\d)ms/);
  assert.match(styles, /cubic-bezier\(/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\[data-reveal\][\s\S]*opacity:\s*1/);
  assert.equal(/from ["'](?:framer-motion|gsap|@react-spring|animejs)/.test(page + revealController), false);
  assert.equal(/addEventListener\(["']scroll/.test(revealController), false);
});

test("small muted text colors meet WCAG AA contrast", () => {
  const slate = styles.match(/--slate:\s*(#[a-f\d]{6})/i)?.[1];
  const methodEyebrow = styles.match(/\.method-content > \.eyebrow\s*\{\s*color:\s*(#[a-f\d]{6})/i)?.[1];

  assert.ok(slate, "missing slate color");
  assert.ok(methodEyebrow, "missing method eyebrow color");
  assert.ok(contrast(slate, "#f7f5f0") >= 4.5, "slate text must pass on ivory");
  assert.ok(contrast(methodEyebrow, "#0a2231") >= 4.5, "method eyebrow must pass on navy");
});
