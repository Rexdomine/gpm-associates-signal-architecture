import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};

const about = read("app/about/page.tsx");
const dottedGlobe = read("app/components/DottedGlobe.tsx");
const homepage = read("app/page.tsx");
const homepageExperience = read("app/components/HomepageExperience.tsx");
const header = read("app/components/SiteHeader.tsx");
const footer = read("app/components/SiteFooter.tsx");
const mobileMenu = read("app/components/MobileMenu.tsx");
const styles = read("app/globals.css");
const layout = read("app/layout.tsx");
const readme = read("README.md");
const aboutMarkup = about.slice(about.indexOf("export default function AboutPage"));

const officialUrl = "https://services.ndpc.gov.ng/portal/?page=verify-c&d=4384CC9A-B06F-4FD3-B19B-8C6B3CF86&id=20892&sn=9c73c00bb8c85b96db03b097e4d043ff&t=eosic_business_registration&tp=nwp_eosic";
const imagePath = "public/images/gpm-about-team-approved-v1.webp";
const imagePublicPath = "/images/gpm-about-team-approved-v1.webp";

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

function readUint24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function webpDimensions(buffer) {
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF", "asset is not a RIFF file");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP", "asset is not a WebP file");

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    assert.ok(dataOffset + chunkSize <= buffer.length, `invalid ${chunkType} chunk size`);

    if (chunkType === "VP8X") {
      assert.ok(chunkSize >= 10, "VP8X chunk is too short");
      return {
        width: readUint24LE(buffer, dataOffset + 4) + 1,
        height: readUint24LE(buffer, dataOffset + 7) + 1,
      };
    }

    if (chunkType === "VP8 ") {
      assert.ok(chunkSize >= 10, "VP8 chunk is too short");
      assert.equal(buffer.toString("hex", dataOffset + 3, dataOffset + 6), "9d012a", "invalid VP8 frame header");
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }

    if (chunkType === "VP8L") {
      assert.ok(chunkSize >= 5, "VP8L chunk is too short");
      assert.equal(buffer[dataOffset], 0x2f, "invalid VP8L signature");
      const bits = buffer.readUInt32LE(dataOffset + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  assert.fail("WebP contains no supported dimension-bearing chunk");
}

test("About route exports exact route metadata and remains noindex, nofollow", () => {
  assert.ok(about.length > 0, "app/about/page.tsx missing");
  assert.match(about, /export default function AboutPage/);
  assert.match(about, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(layout, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
});

test("About follows the authoritative ten-section order", () => {
  assertInOrder(aboutMarkup, [
    "about-hero dark-plane",
    "about-credentials",
    "about-verification about-section",
    "about-perspective about-section",
    "about-purpose dark-plane",
    "about-multidisciplinary about-section",
    "about-values about-section",
    "about-team about-section",
    "about-cta contact-cta",
    "<SiteFooter />",
  ]);
});

test("About hero and established panel match exact section 1 contract", () => {
  assertIncludesAll(about, [
    "ABOUT GPM",
    "Specialist expertise for organisations that take data responsibility seriously.",
    "GPM Associates is an NDPC-licensed Data Protection Compliance Organisation helping public and private institutions translate regulatory obligations into practical, sustainable governance.",
    "2019",
    "Established to help organisations protect people, strengthen accountability and create value through responsible data use.",
  ]);
  assert.equal(about.includes("Independent advice. Practical regulatory confidence."), false);
  assert.equal(about.includes("gpm-independent-policy-review-v2.webp"), false);
});

test("About hero has one deterministic, decorative dotted globe with responsive static-safe pulses", () => {
  assert.ok(dottedGlobe.length > 0, "missing About dotted globe component");
  assert.equal((about.match(/<DottedGlobe\s*\/>/g) ?? []).length, 1, "About must render exactly one dotted globe");
  assert.match(about, /import \{ DottedGlobe \} from "\.\.\/components\/DottedGlobe"/);
  assert.equal(homepage.includes("DottedGlobe"), false, "Homepage must not import or render the About globe");

  assert.match(dottedGlobe, /<svg[^>]*aria-hidden="true"[^>]*focusable="false"/s);
  assert.match(dottedGlobe, /className="about-globe"/);
  assert.match(dottedGlobe, /viewBox="0 0 1440 560"/);
  assert.match(dottedGlobe, /<clipPath id="about-globe-hemisphere"/);
  assert.ok((dottedGlobe.match(/className="about-globe-curve"/g) ?? []).length >= 8, "globe needs latitude/longitude-like curved geometry");
  assert.match(dottedGlobe, /<path className="about-globe-curve about-globe-meridian"[^>]*>/, "globe needs a dedicated central meridian path crossing the latitude arcs");
  assert.equal((dottedGlobe.match(/className="about-globe-pulse /g) ?? []).length, 7, "desktop globe must have seven pulse nodes");
  assert.equal(/<(video|canvas|img)\b/i.test(dottedGlobe), false, "globe must remain deterministic inline SVG");
  assert.equal(/https?:\/\//.test(dottedGlobe), false, "globe must not request remote media");

  assert.match(styles, /\.about-globe-layer\s*\{[^}]*pointer-events:\s*none/s);
  assert.match(styles, /\.about-globe-meridian\s*\{[^}]*stroke-dasharray:/s, "central meridian must remain dotted");
  const haloOpacity = Number(styles.match(/\.about-globe-pulse-halo\s*\{[^}]*opacity:\s*([\d.]+)/s)?.[1]);
  assert.ok(Number.isFinite(haloOpacity) && haloOpacity < 0.08, "pulse halo opacity must be restrained below .08");
  assert.match(styles, /\.about-hero-copy::before[\s\S]*\.about-established::before/, "hero needs localized copy and card legibility masks");
  assert.match(styles, /@keyframes about-globe-pulse\s*\{[\s\S]*opacity:[\s\S]*transform:\s*scale\(/);
  assert.match(styles, /@media \(max-width:\s*600px\)[\s\S]*\.about-globe-pulse--mobile-hidden\s*\{\s*display:\s*none/);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.about-globe-pulse\s*\{[^}]*animation:\s*none/);
});

test("About globe reads as a dotted upper hemisphere at desktop and mobile widths", () => {
  assert.match(dottedGlobe, /<path className="about-globe-rim"[^>]*>/, "globe needs an explicit outer rim");
  assert.match(dottedGlobe, /<path className="about-globe-equator"[^>]*>/, "globe needs an explicit lower latitude or equator anchor");
  assert.match(
    dottedGlobe,
    /<[^>]+className="about-globe-surface"[^>]+clipPath="url\(#about-globe-hemisphere\)"[^>]*>/,
    "globe needs a clipped dotted surface",
  );

  assert.match(styles, /\.about-globe-rim\s*\{[^}]*stroke-dasharray:[^}]*opacity:/s);
  assert.match(styles, /\.about-globe-equator\s*\{[^}]*stroke-dasharray:[^}]*opacity:/s);
  const surfaceOpacity = Number(styles.match(/\.about-globe-surface\s*\{[^}]*opacity:\s*([\d.]+)/s)?.[1]);
  assert.ok(Number.isFinite(surfaceOpacity) && surfaceOpacity > 0 && surfaceOpacity < 0.2, "surface dots must be present but restrained");

  const desktopCurve = styles.match(/\.about-globe-curve\s*\{([^}]*)\}/s)?.[1] ?? "";
  const mobileRules = styles.match(/@media \(max-width:\s*600px\)([\s\S]*?)(?=@media|$)/)?.[1] ?? "";
  const desktopGap = Number(desktopCurve.match(/stroke-dasharray:\s*\.1\s+([\d.]+)/)?.[1]);
  const mobileCurve = mobileRules.match(/\.about-globe-curve\s*\{([^}]*)\}/s)?.[1] ?? "";
  const mobileGap = Number(mobileCurve.match(/stroke-dasharray:\s*\.1\s+([\d.]+)/)?.[1]);
  const desktopOpacity = Number(desktopCurve.match(/opacity:\s*([\d.]+)/)?.[1]);
  const mobileOpacity = Number(mobileCurve.match(/opacity:\s*([\d.]+)/)?.[1]);
  assert.ok(mobileGap <= desktopGap, "mobile globe must retain at least desktop dot density");
  assert.ok(mobileOpacity >= desktopOpacity * 0.9, "mobile globe must retain enough curve opacity to read as spherical");

  const mobileHiddenPulses = (dottedGlobe.match(/className="about-globe-pulse--mobile-hidden"/g) ?? []).length;
  const pulseGroups = (dottedGlobe.match(/className="about-globe-pulse /g) ?? []).length;
  assert.equal(pulseGroups - mobileHiddenPulses, 4, "mobile globe must retain four visible pulse groups");
  assert.match(mobileRules, /\.about-globe-pulse-core\s*\{[^}]*opacity:\s*(?:\.8\d*|\.9\d*|1(?:\.0*)?)/s, "mobile pulse cores must remain visually discernible");
});

test("About credential strip matches exact section 2 contract", () => {
  assertIncludesAll(about, [
    "BN 946280", "REGISTERED IN NIGERIA",
    "000018", "PIONEER DPCO CERTIFICATE",
    "7", "CONNECTED CAPABILITIES",
    "1", "INTEGRATED DELIVERY MODEL",
  ]);
  assert.equal(about.includes("CAPABILITY PILLARS"), false);
  assert.equal(about.includes("SECTORS SUPPORTED"), false);
});

test("About regulatory verification matches exact section 3 contract", () => {
  assertIncludesAll(about, [
    "REGULATORY VERIFICATION",
    "Verify GPM's NDPC registration.",
    "Scan the code or open the official Nigeria Data Protection Commission verification page to confirm GPM Associates' regulatory registration.",
    "OPEN OFFICIAL VERIFICATION",
    officialUrl,
    "/images/ndpc-verification-qr-approved.png",
    "SCAN TO VERIFY",
  ]);
  assert.match(about, /aria-label="[^"]*(verify|verification)[^"]*"/i);
});

test("About perspective matches exact section 4 contract", () => {
  assertIncludesAll(about, [
    "OUR PERSPECTIVE",
    "Compliance is strongest when it becomes part of how an organisation operates.",
    "We work at the intersection of regulation, governance, risk, technology and organisational behaviour. This enables us to move beyond isolated documentation and help clients embed accountability into decisions, systems and day-to-day practices.",
    "Our approach is rigorous but practical: understand the environment, clarify the obligations, prioritise material risk, implement fit-for-purpose controls and build the evidence needed for continuing assurance.",
  ]);
});

test("About vision and mission match exact section 5 contract", () => {
  assertIncludesAll(about, [
    "OUR VISION",
    "To be Africa's most trusted partner for data protection, privacy governance and the responsible use of technology - setting a standard for excellence across the continent.",
    "OUR MISSION",
    "To empower organisations to build sustainable, operationally integrated governance frameworks that protect individuals, enable responsible innovation and strengthen trust.",
  ]);
});

test("About multidisciplinary feature matches exact section 6 contract without an inline disclaimer caption", () => {
  assertIncludesAll(about, [
    "MULTIDISCIPLINARY BY DESIGN",
    "One advisory team connecting regulation, governance, technology and implementation.",
    "Professionals are assigned according to engagement scope, sector, lifecycle stage and risk profile. Complex matters receive senior oversight and specialist review, with additional capability mobilised where scale, location or technical depth requires.",
    imagePublicPath,
    "Senior African professionals in a governance and risk discussion",
  ]);
  assert.doesNotMatch(about, /Illustrative subjects only/i);
  assert.doesNotMatch(about, /not GPM staff/i);
  assert.doesNotMatch(about, /not[^.]*clients/i);
  assert.doesNotMatch(about, /not[^.]*real engagement/i);
  assert.doesNotMatch(about, /<figcaption>/i);
});

test("About values match the exact ordered section 7 contract", () => {
  assertIncludesAll(about, ["OUR VALUES", "Trust is built through disciplined action."]);
  assertInOrder(about, [
    "01", "Integrity", "We give clear, evidence-based advice and protect the confidence placed in us.",
    "02", "Excellence", "We combine regulatory depth with disciplined execution and quality assurance.",
    "03", "Accountability", "We connect obligations, evidence, decisions and ownership so that progress can be demonstrated.",
    "04", "Practicality", "We design controls and programmes that organisations can genuinely operate.",
    "05", "Responsible Innovation", "We help clients adopt technology within clear governance and risk boundaries.",
  ]);
});

test("About team matches the exact ordered section 8 contract without invented people", () => {
  assertIncludesAll(about, [
    "OUR TEAM",
    "Multidisciplinary leadership for complex data environments.",
    "Our team combines executive governance, regulatory law, privacy operations, cybersecurity, infrastructure and programme-delivery capability. Engagement teams are selected for sector, risk profile and technical complexity, with senior oversight maintained throughout.",
  ]);
  assertInOrder(about, [
    "01", "DATA PROTECTION & PRIVACY ADVISORY", "Managing Director", "Provides overall engagement direction, executive governance, enterprise programme design, policy oversight and senior client relationship management.",
    "02", "REGULATORY AND LEGAL ADVISORY", "Founding Partner & Regulatory Lead", "Interprets data protection, cyber and regulatory requirements and provides legal-risk guidance for highly regulated environments.",
    "03", "COMPLIANCE DELIVERY & TECHNICAL PRIVACY", "Data Protection & Compliance Lead", "Leads NDPA audits, DPIAs, policy frameworks, annual CAR filing and continuing DPO advisory, connecting regulatory requirements with practical controls.",
    "04", "TECHNOLOGY & IMPLEMENTATION", "IT Infrastructure & Programme Delivery Lead", "Provides technology, programme-governance and implementation leadership for complex, multi-location initiatives and critical infrastructure environments.",
    "05", "INFORMATION ASSURANCE & RESILIENCE", "Cybersecurity Lead", "Provides leadership across security operations, incident response, threat intelligence, vulnerability management and emerging-technology risk.",
  ]);
  assert.equal(/\b(Mr\.|Ms\.|Dr\.|CEO)\b/i.test(about), false);
  assert.equal(/portrait/i.test(about), false);
});

test("About CTA matches exact section 9 route and copy", () => {
  assertIncludesAll(about, [
    "BEGIN A CONVERSATION",
    "Build a more accountable data environment.",
    "Discuss your organisation’s priorities with our advisory team.",
    "Start a conversation",
    "href=\"/contact\"",
  ]);
});

test("About uses semantic scoped composition with unique heading IDs and no inline styles", () => {
  for (const className of [
    "about-hero", "about-credentials", "about-verification", "about-perspective",
    "about-purpose", "about-multidisciplinary", "about-values", "about-team", "about-cta",
  ]) {
    assert.ok(about.includes(className), `About markup missing scoped class: ${className}`);
    assert.ok(styles.includes(`.${className}`), `About CSS missing scoped class: ${className}`);
  }
  assert.match(about, /<section/g);
  assert.match(about, /<ul[\s>]/);
  assert.equal(/style=\{\{/.test(about), false, "About must not use inline styles");
  const headingIds = [...about.matchAll(/<h[12][^>]*id="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(headingIds.length >= 8, "each major About heading needs an ID");
  assert.equal(new Set(headingIds).size, headingIds.length, "About heading IDs must be unique");
});

test("About and Homepage reuse the exact shared shell and preserve Homepage contract", () => {
  assertIncludesAll(about, ["<SiteHeader />", "<SiteFooter />", "<ScrollReveal />", "skip-link"]);
  assertIncludesAll(homepage, [
    "<SiteHeader />", "<SiteFooter />",
    "Building trusted, accountable and resilient data environments.",
    "Data is now a source of accountability, exposure and strategic value.",
  ]);
  assert.ok(homepageExperience.includes("/images/gpm-homepage-single-privacy-professional-v3.webp"), "Homepage hero fallback image reference changed");
  assert.ok(homepageExperience.includes("/videos/gpm-homepage-trusted-data-flow-2026.mp4"), "Homepage hero video reference missing");
  assert.equal(homepage.includes("about-credentials"), false, "About credential strip must not leak into Homepage");
  assertIncludesAll(footer, ["CookieConsent", "ConsentMap", "/images/ndpc-verification-qr-approved.png", officialUrl]);
});

test("desktop and mobile About links are route-aware while mobile focus behavior is preserved", () => {
  assertIncludesAll(header, ["usePathname", "[\"About\", \"/about\"]", "aria-current", "<MobileMenu"]);
  assertIncludesAll(mobileMenu, [
    "usePathname",
    'href: "/about"',
    "aria-current",
    "Escape",
    "event.shiftKey",
    "toggleRef.current?.focus()",
    'document.body.dataset.mobileNav = open ? "open" : "closed"',
    'document.body.style.overflow = open ? "hidden" : ""',
    'className="menu-toggle__icon"',
    'className="mobile-panel__actions"',
    'createPortal(',
  ]);
  assertIncludesAll(styles, [
    '.menu-toggle[aria-expanded="true"] .menu-toggle__icon span:first-child',
    '.menu-toggle {',
    'border-radius: 0;',
    '.mobile-panel {',
    'left: 0;',
    'max-height: min(62vh, 520px);',
    'inset: 84px 0 0;',
    'max-height: calc(100dvh - 84px);',
    'body[data-mobile-nav="open"] .quick-check-launcher',
    'body[data-mobile-nav="open"] .cookie-banner',
  ]);
});

test("About image asset has exact bytes and dimensions parsed from its WebP container", () => {
  const assetUrl = new URL(imagePath, root);
  assert.ok(existsSync(assetUrl), `asset missing: ${imagePath}`);
  assert.equal(statSync(assetUrl).size, 70962);
  const data = readFileSync(assetUrl);
  assert.equal(createHash("sha256").update(data).digest("hex"), "74e66d49efa6e170e663393a9acee30eb15f5b6a0bb3acad854eb03ecbc96db4");
  assert.deepEqual(webpDimensions(data), { width: 1600, height: 1100 });
});

test("README documents Homepage plus About, shared shell, and exact About image provenance", () => {
  assertIncludesAll(readme, [
    "Homepage + About",
    "SiteHeader",
    "SiteFooter",
    "/about",
    imagePath,
    "https://gpm-phase1-mockup.dataprotectiongpm.chatgpt.site/about-team.webp",
    "74e66d49efa6e170e663393a9acee30eb15f5b6a0bb3acad854eb03ecbc96db4",
    "1600 × 1100",
    "70962",
  ]);
  assert.match(readme, /illustrative/i);
  assert.match(readme, /not GPM (personnel|staff)/i);
  assert.match(readme, /not[^.]*client/i);
  assert.match(readme, /not[^.]*real engagement/i);
});

test("About omits rejected, fabricated, and unrelated content", () => {
  for (const forbidden of [
    "Data flow mapping",
    "gpm-data-flow-mapping-v2",
    "independent consulting firm specialising",
    "clinical approach",
    "2017 Guidelines for Data Protection",
    "draft Nigeria Data Protection Regulation (NDPR)",
    "Awards", "Testimonials", "Revenue", "Profit",
  ]) {
    assert.equal(about.toLowerCase().includes(forbidden.toLowerCase()), false, `forbidden content remains: ${forbidden}`);
  }
  assert.equal(/\b(2022|2023|2024|2025)\b/.test(about), false);
});

test("About globe rendered-anchor: surface dots and spherical curves must read as coherent upper hemisphere", () => {
  const surfaceOpacity = Number(styles.match(/\.about-globe-surface\s*\{[^}]*opacity:\s*([\d.]+)/s)?.[1]);
  const desktopCurveBlock = (styles.match(/\.about-globe-curve\s*\{([^}]*)\}/s)?.[1] ?? "");
  const curveOpacity = Number(desktopCurveBlock.match(/opacity:\s*([\d.]+)/)?.[1]);
  assert.ok(Number.isFinite(surfaceOpacity) && surfaceOpacity > 0.11, "surface dots too faint to read as dome; need >0.11");
  assert.ok(Number.isFinite(curveOpacity) && curveOpacity >= 0.40, "latitude curves too faint; need >=0.40 for projection coherence");
  assert.match(dottedGlobe, /<path className="about-globe-rim"[^>]*>/, "rim missing");
  assert.match(dottedGlobe, /<path className="about-globe-equator"[^>]*>/, "equator anchor missing");
  assert.ok((dottedGlobe.match(/className="about-globe-curve"/g) ?? []).length >= 8, "need coherent meridian/latitude set");
});
