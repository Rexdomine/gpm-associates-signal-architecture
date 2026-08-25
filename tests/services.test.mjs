import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};

const services = read("app/services/page.tsx");
const lifecycle = read("app/components/ServicesLifecycle.tsx");
const header = read("app/components/SiteHeader.tsx");
const mobileMenu = read("app/components/MobileMenu.tsx");
const footer = read("app/components/SiteFooter.tsx");
const styles = read("app/globals.css");
const layout = read("app/layout.tsx");
const homepage = read("app/page.tsx");
const homepageExperience = read("app/components/HomepageExperience.tsx");
const about = read("app/about/page.tsx");
const servicesMarkup = services.slice(services.indexOf("export default function ServicesPage"));

function assertIncludesAll(source, values) {
  for (const value of values) assert.ok(source.includes(value), `missing exact contract text: ${value}`);
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
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;
    assert.ok(data + size <= buffer.length, `invalid ${type} chunk size`);
    if (type === "VP8X") return { width: readUint24LE(buffer, data + 4) + 1, height: readUint24LE(buffer, data + 7) + 1 };
    if (type === "VP8 ") return { width: buffer.readUInt16LE(data + 6) & 0x3fff, height: buffer.readUInt16LE(data + 8) & 0x3fff };
    if (type === "VP8L") {
      const bits = buffer.readUInt32LE(data + 1);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    offset = data + size + (size % 2);
  }
  assert.fail("WebP contains no dimension-bearing chunk");
}

test("Services route exports authoritative metadata and remains noindex, nofollow", () => {
  assert.ok(services.length > 0, "app/services/page.tsx missing");
  assert.match(services, /export default function ServicesPage/);
  assertIncludesAll(services, [
    "GPM Associates | Data Protection, Privacy Governance & Digital Trust",
    "GPM Associates helps organisations strengthen data protection, privacy governance, regulatory assurance and responsible innovation.",
  ]);
  assert.match(services, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(layout, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
});

test("Services follows the authoritative six-section order", () => {
  assertInOrder(servicesMarkup, [
    "services-hero", "services-integrated", "services-pillars",
    "services-lifecycle", "services-engagement", "services-cta", "<SiteFooter />",
  ]);
  assert.equal((servicesMarkup.match(/<section\b/g) ?? []).length, 6, "Services must have exactly six major sections");
});

test("hero and integrated-design copy is exact and ordered", () => {
  assertInOrder(services, [
    "Services",
    "Connected services for complex data environments.",
    "GPM brings regulatory, governance, technical and organisational expertise together through seven service pillars that help clients reduce exposure, demonstrate accountability and build sustainable compliance capability.",
    "Seven capability pillars",
    "One integrated delivery model",
    "Integrated by design",
    "One challenge can require several kinds of expertise.",
    "We connect regulatory interpretation, governance, technology, implementation and organisational capability so that advice can move from obligation to sustained practice.",
    "01", "Regulatory depth", "02", "Operational context", "03", "Evidence-led delivery",
  ]);
});

const pillars = [
  ["01", "Regulatory Compliance & Assurance", "Independent, evidence-based assurance over data protection compliance and control effectiveness. We help organisations establish their regulatory position, complete statutory obligations, identify material gaps and validate remediation.", ["NDPA compliance audits and Compliance Audit Returns", "Regulatory registrations and statutory filings", "Compliance maturity assessments", "Control design and effectiveness reviews", "Remediation planning and closure validation", "Regulatory inspection and audit readiness"], "Defensible assurance that directs attention and investment to the most material compliance risks."],
  ["02", "Privacy Governance & Risk Management", "Governance structures that assign accountability, enable informed decisions and integrate privacy risk into enterprise management and operational oversight.", ["Privacy strategy and operating models", "Advisory and outsourced DPO services", "Privacy risk assessments and DPIAs", "Policies and accountability frameworks", "Governance committees and executive reporting", "Programme oversight, risk registers and monitoring"], "Clear accountability and disciplined oversight turn privacy into a sustainable governance capability."],
  ["03", "Data Lifecycle & Privacy Engineering", "Operational and technical controls that apply privacy requirements across the full data lifecycle, from collection and use to sharing, retention and secure disposal.", ["Data mapping, inventories and records of processing", "Purpose, lawful basis and data-minimisation controls", "Retention schedules and disposal governance", "Privacy by design and by default", "Consent, notices and data-subject rights mechanisms", "Pseudonymisation, anonymisation and technical safeguards"], "Durable process, product and system controls that make privacy principles work in practice."],
  ["04", "Third-Party & Cross-Border Advisory", "Structured governance for personal data processed beyond an organisation's direct control across vendors, processors, partners, cloud environments and international transfers.", ["Vendor and processor due diligence", "Third-party data-risk assessments", "Data-processing and sharing agreements", "Cross-border transfer assessments", "Transfer safeguards and governance", "Outsourcing and transaction due diligence"], "Consistent accountability and risk oversight across supply chains, partners and jurisdictions."],
  ["05", "Cyber Resilience & Information Assurance", "Security governance, technical control assurance and incident preparedness aligned with data protection obligations to strengthen resilience across information assets and critical services.", ["Security risk and control assessments", "Vulnerability assessment and testing", "Architecture and infrastructure assurance", "Incident and personal-data breach preparedness", "Response, notification and remediation support", "ISO/IEC 27001 and 27701 readiness"], "Integrated privacy and security assurance that strengthens prevention, response and recovery."],
  ["06", "AI & Emerging Technology Governance", "Responsible adoption of AI, automated decision systems, IoT and other emerging technologies through clear governance, impact assessment and lifecycle controls.", ["AI governance frameworks and policies", "AI and algorithmic impact assessments", "Automated decision-making safeguards", "Data provenance, quality and lawful-use governance", "Explainability, fairness and accountable oversight", "IoT, operational technology and smart-infrastructure governance"], "Innovation within explicit boundaries that protect rights, trust and organisational resilience."],
  ["07", "Data Protection Training & Capability Development", "Role-specific learning that translates privacy and governance requirements into confident day-to-day practice for leadership, specialists and the wider workforce.", ["Board and executive briefings", "DPO and practitioner programmes", "Workforce awareness programmes", "Sector-focused workshops", "Bespoke organisational learning journeys", "Simulations, coaching, clinics and follow-up support"], "Practical competence, judgement and shared accountability for consistent privacy performance."],
];

test("seven-pillar introduction and every pillar contract are verbatim and ordered", () => {
  assertInOrder(services, [
    "Seven service pillars",
    "Depth where it matters. Connection where it creates value.",
    "Each pillar is a substantial advisory capability. Together, they enable GPM to connect regulatory obligations, operational controls, technology risk and organisational capability within one engagement model.",
  ]);
  let cursor = services.indexOf("Seven service pillars");
  for (const [number, title, description, items, value] of pillars) {
    const markers = [number, title, description, "Selected services", ...items, "Value:", value];
    for (const marker of markers) {
      const next = services.indexOf(marker, cursor + 1);
      assert.ok(next > cursor, `missing or out of pillar order: ${marker}`);
      cursor = next;
    }
  }
  assert.equal((services.match(/Selected services/g) ?? []).length, 7);
  assert.equal((services.match(/Value:/g) ?? []).length, 7);
});

test("lifecycle copy and five stages are verbatim and ordered", () => {
  assertInOrder(services + lifecycle, [
    "How we work",
    "The GPM Assess-Design-Implement-Sustain-Assure lifecycle.",
    "A five-stage advisory model connecting diagnosis, implementation and continuing evidence of effectiveness.",
    "01", "Assess", "Establish obligations, current state, data environment and material risk exposure.",
    "02", "Design", "Develop governance, controls, policies and an implementation architecture.",
    "03", "Implement", "Embed controls into processes, systems, contracts and accountable roles.",
    "04", "Sustain", "Monitor, advise, report and improve as requirements and risks evolve.",
    "05", "Assure", "Apply independent review, evidence traceability and engagement-risk oversight.",
  ]);
});

test("engagement and CTA copy, route and order are exact", () => {
  assertInOrder(services, [
    "Engagement model", "Support shaped around your operating reality.",
    "Engagements may begin with a defined audit, regulatory filing, risk review, programme design or urgent advisory need. We then connect the right capabilities around the client’s objectives.",
    "Our work can be delivered as a focused project, a multi-stage transformation programme or continuing DPO and assurance support.",
    "Begin a conversation", "Not sure where to begin?",
    "Tell us what is changing, where risk is emerging and what decision you need to make.",
    "href=\"/contact\"", "Speak with an advisor",
  ]);
});

test("Services uses semantic scoped composition and the shared shell", () => {
  assertIncludesAll(services, ["<SiteHeader />", "<SiteFooter />", "<ScrollReveal />", "skip-link", "<main", "<figure", "<figcaption", "<ul"]);
  assert.match(services, /<h1[^>]*id="[^"]+"/);
  assert.ok((services.match(/<article\b/g) ?? []).length >= 12, "seven pillars and five lifecycle stages need article semantics");
  assert.equal(/style=\{\{/.test(services), false, "Services must not use inline styles");
  const headingIds = [...services.matchAll(/<h[12][^>]*id="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(headingIds.length >= 6, "each major Services section needs a labelled heading");
  assert.equal(new Set(headingIds).size, headingIds.length, "Services heading IDs must be unique");
  assertIncludesAll(footer, ["CookieConsent", "ConsentMap", "/images/ndpc-verification-qr-approved.png"]);
});

test("desktop and mobile Services links expose current route while focus behavior remains intact", () => {
  assertIncludesAll(header, ["usePathname", "[\"Services\", \"/services\"]", "aria-current", "<MobileMenu"]);
  assertIncludesAll(mobileMenu, ["usePathname", "href: \"/services\"", "aria-current", "Escape", "event.shiftKey", "toggleRef.current?.focus()", "first.focus()", "last.focus()"]);
  assert.match(header, /pathname === href \? "page" : undefined/);
  assert.match(mobileMenu, /pathname === href \? "page" : undefined/);
});

test("approved local Services images are binary-locked and truthfully disclosed", () => {
  // Hero background — decorative, faded, blended with dark overlays; no alt/focus
  const heroAsset = "public/images/gpm-privacy-impact-assessment-v2.webp";
  const heroUrl = new URL(heroAsset, root);
  assert.ok(existsSync(heroUrl), `hero decorative asset missing: ${heroAsset}`);
  const heroData = readFileSync(heroUrl);
  assert.equal(createHash("sha256").update(heroData).digest("hex"), "ec431c641ef23f097c1a28eb5643fa154299ddb28e46cfd51f4050b030f62238");
  assert.deepEqual(webpDimensions(heroData), { width: 1254, height: 1254 });
  const heroHook = services.match(/<div className="services-hero-background"[^>]*\/>/)?.[0] ?? "";
  assertIncludesAll(heroHook, ['aria-hidden="true"']);
  assert.equal(heroHook.includes("alt="), false, "hero decorative background hook must have no alt");
  assert.equal(heroHook.includes("tabIndex"), false, "hero decorative background hook must not be focusable");
  assert.match(styles, /\.services-hero-background\s*\{[^}]*background:\s*url\("\/images\/gpm-privacy-impact-assessment-v2\.webp"\)\s+center 42% \/ cover no-repeat;/s);
  assert.match(styles, /\.services-hero-overlay\s*\{[^}]*background:\s*linear-gradient\([^}]*rgba\(8, 36, 51, \.96\)[^}]*linear-gradient\([^}]*rgba\(8, 36, 51, \.62\)/s);
  assert.match(styles, /\.services-hero-background, \.services-hero-overlay\s*\{[^}]*pointer-events:\s*none;/s);

  // Integrated design — approved illustrative image with factual alt and disclosure
  const imagePath = "public/images/gpm-privacy-capability-workshop-v3.webp";
  const imagePublicPath = "/images/gpm-privacy-capability-workshop-v3.webp";
  const assetUrl = new URL(imagePath, root);
  assert.ok(existsSync(assetUrl), `asset missing: ${imagePath}`);
  const data = readFileSync(assetUrl);
  assert.equal(createHash("sha256").update(data).digest("hex"), "4ae9f54dd6837b3de10fd95a8989a5227bb50cf19ade76d8e12e884156c1f985");
  assert.deepEqual(webpDimensions(data), { width: 1537, height: 1023 });
  assertIncludesAll(services, [
    imagePublicPath,
    "width={1537}",
    "height={1023}",
    'alt="African privacy professionals working through a structured data-governance exercise"',
  ]);
  assertInOrder(services, ["GPM ADVISORY", "Expertise connected around the client’s operating reality."]);
  assert.match(services, /illustrative/i);
  assert.match(services, /not GPM (personnel|staff)/i);
  assert.match(services, /not[^.]*client/i);
  assert.match(services, /not[^.]*real engagement/i);
  assert.equal(services.includes("/services-editorial.webp"), false, "rejected generic meeting photo must not be used");
  assert.equal(services.includes("Senior African professionals working through a governance and risk advisory session"), false);
});

test("lifecycle ambient SVG is automatic normal-motion, reduced-motion/static and no-JS safe with no controls", () => {
  assert.ok(lifecycle.length > 0, "missing Services lifecycle interaction component");
  assertIncludesAll(lifecycle, ["use client", "prefers-reduced-motion: reduce", "services-lifecycle-static", "services-lifecycle--animated"]);
  assert.equal(lifecycle.includes("aria-pressed"), false, "lifecycle must have no aria-pressed control state");
  assert.equal(lifecycle.includes("Pause lifecycle animation"), false, "lifecycle must have no Play/Pause copy");
  assert.equal(lifecycle.includes("Play lifecycle animation"), false, "lifecycle must have no Play/Pause copy");
  assert.equal(lifecycle.includes("<button"), false, "lifecycle must have no button control");
  assert.match(lifecycle, /role="region"[\s\S]*aria-label="GPM advisory lifecycle diagram"[\s\S]*tabIndex=\{0\}/, "labelled lifecycle region must be keyboard focusable");
  assert.equal(lifecycle.includes("playing"), false, "lifecycle must have no manual playback state/handler");
  assert.equal(lifecycle.includes("toggle"), false, "lifecycle must have no toggle handler");
  assert.match(lifecycle, /matchMedia\(["']\(prefers-reduced-motion: reduce\)["']\)/);
  assert.match(lifecycle, /useState\(false\)/, "lifecycle must server-render in its static state");
  assert.match(lifecycle, /<svg[^>]*aria-hidden="true"[^>]*focusable="false"/s);
  assert.match(lifecycle, /<path\b[^>]*d="[^"]+"/s, "SVG paths must be deterministic");
  assert.equal(/[Ⅱ▶]/u.test(lifecycle), false, "emoji-prone play/pause glyphs must not be used");
  // Positive automatic-motion assertions
  assert.match(styles, /\.services-lifecycle--animated \.services-lifecycle-progress\s*\{[^}]*animation:\s*services-lifecycle-flow 5s ease-in-out infinite;/s);
  assert.match(styles, /\.services-lifecycle--animated \.services-lifecycle-node\s*\{[^}]*animation:\s*services-lifecycle-pulse 5s ease-in-out infinite;/s);
  assert.match(styles, /@keyframes services-lifecycle-flow/);
  assert.match(styles, /@keyframes services-lifecycle-pulse/);
  assert.match(styles, /\.services-lifecycle-progress\s*\{[^}]*stroke-dashoffset:\s*0;/s, "static frame must be complete without JS");
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*\.services-lifecycle-progress, \.services-lifecycle-node\s*\{\s*animation:\s*none !important;/s);
  assert.equal(/services-lifecycle-static button|services-lifecycle.*position:\s*sticky/.test(styles), false, "lifecycle control CSS must be removed");
  // No duplicated static content in noscript
  assert.equal(services.includes("<noscript>"), false, "static lifecycle content must not be duplicated in noscript");
});

test("Services value labels have restrained separation from their copy", () => {
  assert.match(styles, /\.services-value\s+b\s*\{[^}]*margin-right:\s*\.\d+em/s);
});

test("Services contains no fabricated claims, people, results or rejected mockup captioning", () => {
  for (const forbidden of [
    "Awards", "Testimonials", "Revenue", "Profit", "guaranteed compliance", "100% compliant",
    "Fortune 500", "global offices", "industry-leading", "market-leading",
  ]) assert.equal(services.toLowerCase().includes(forbidden.toLowerCase()), false, `fabricated or rejected content remains: ${forbidden}`);
  assert.equal(/\b(Mr\.|Ms\.|Dr\.|CEO)\b/.test(services), false, "invented named-person framing is forbidden");
});

test("Homepage and About regression boundaries remain intact", () => {
  assertIncludesAll(homepage, [
    "Building trusted, accountable and resilient data environments.",
    "Data is now a source of accountability, exposure and strategic value.",
    "<SiteHeader />", "<SiteFooter />",
  ]);
  assert.ok(homepageExperience.includes("/images/gpm-homepage-single-privacy-professional-v3.webp"), "Homepage hero asset changed");
  assertIncludesAll(about, [
    "Specialist expertise for organisations that take data responsibility seriously.",
    "Compliance is strongest when it becomes part of how an organisation operates.",
    "/images/gpm-about-team-approved-v1.webp", "<SiteHeader />", "<SiteFooter />",
  ]);
  assert.equal(homepage.includes("services-pillars"), false, "Services composition leaked into Homepage");
  assert.equal(about.includes("services-pillars"), false, "Services composition leaked into About");
});
