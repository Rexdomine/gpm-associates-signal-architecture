import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};

const page = read("app/page.tsx");
const layout = read("app/layout.tsx");
const config = read("next.config.ts");
const robots = read("public/robots.txt");
const styles = read("app/globals.css");
const mobileMenu = read("app/components/MobileMenu.tsx");
const experience = read("app/components/HomepageExperience.tsx");
const consent = read("app/components/CookieConsent.tsx");
const reveal = read("app/components/ScrollReveal.tsx");
const readme = read("README.md");
const source = [page, layout, styles, mobileMenu, experience, consent, reveal].join("\n");

const exact = (value) => new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

const assertInOrder = (haystack, markers) => {
  let cursor = -1;
  for (const marker of markers) {
    const next = haystack.indexOf(marker, cursor + 1);
    assert.ok(next > cursor, `missing or out of order: ${marker}`);
    cursor = next;
  }
};

test("homepage follows the approved mockup section order", () => {
  assertInOrder(page, [
    "DATA PROTECTION. PRIVACY GOVERNANCE. DIGITAL TRUST.",
    "2019",
    "THE OPERATING REALITY",
    "WHAT WE DO",
    "SELECTED EXPERIENCE",
    "GPM INNOVATION LAB",
    "LIVE FEATURES",
    "LATEST THINKING",
    "BEGIN A CONVERSATION",
    "Where Data Protection Meets Innovation.",
  ]);
});

test("homepage preserves the exact approved hero, operating reality and final CTA copy", () => {
  const required = [
    "Building trusted, accountable and resilient data environments.",
    "GPM Associates helps organisations navigate regulatory complexity, strengthen privacy governance and turn responsible data practices into sustainable business value.",
    "Explore our services",
    "Speak with an advisor",
    "Data is now a source of accountability, exposure and strategic value.",
    "Organisations must do more than publish policies. They need defensible governance, clear accountability, effective controls and evidence that their obligations are being met in practice.",
    "GPM combines regulatory insight with implementation capability to help leaders move from fragmented compliance activity to a sustainable privacy and data governance operating model.",
    "Your next data challenge deserves more than a generic solution.",
    "Start a focused conversation with a GPM advisor.",
  ];
  for (const copy of required) assert.match(page, exact(copy));
});

test("homepage contains the exact credibility strip", () => {
  for (const item of ["2019", "ESTABLISHED", "NDPC", "LICENSED DPCO", "7", "CAPABILITY PILLARS", "10+", "SECTORS SUPPORTED"]) {
    assert.ok(page.includes(item), `missing credibility item: ${item}`);
  }
});

test("homepage contains exactly the seven approved capability titles and descriptions", () => {
  const services = [
    ["Regulatory Compliance & Assurance", "Audits, CARs, registrations, maturity reviews and remediation assurance."],
    ["Privacy Governance & Risk Management", "Operating models, DPO support, DPIAs and accountable programme oversight."],
    ["Data Lifecycle & Privacy Engineering", "Data mapping, records, retention, consent, rights and privacy-by-design controls."],
    ["Third-Party & Cross-Border Advisory", "Vendor risk, contracts, transfers and external dependency governance."],
    ["Cyber Resilience & Information Assurance", "Security assurance, incident readiness and resilience improvement."],
    ["AI & Emerging Technology Governance", "AI accountability, impact assessment and responsible lifecycle controls."],
    ["Training & Capability Development", "Executive, practitioner and workforce programmes shaped around operating risk."],
  ];
  for (const [title, description] of services) {
    assert.equal(page.split(title).length - 1, 1, `expected one homepage service title: ${title}`);
    assert.match(page, exact(description));
  }
  assert.match(page, /services\.map\(/);
});

test("homepage preserves exact selected experience and Innovation Lab content", () => {
  const required = [
    "Complex environments. Practical outcomes. Defensible assurance.",
    "From public institutions and regulated enterprises to technology and health organisations, our work strengthens accountability where the stakes are highest.",
    "NATIONAL-SCALE",
    "Data ecosystems and public-interest programmes",
    "REGULATED",
    "Financial, pension, health and professional environments",
    "END-TO-END",
    "Assessment, remediation, training and continuing assurance",
    "Start with a clearer view of your obligations.",
    "Use the GPM NDPA Quick Check to identify your organisation's likely UHL, EHL or OHL processing level and the practical next steps that may follow.",
    "INDICATIVE LEVEL",
    "EHL",
    "Illustrative classification preview",
  ];
  for (const copy of required) assert.match(page, exact(copy));
});

test("live features have exact tabs, panels and accessible keyboard behavior", () => {
  const required = [
    "Useful digital experiences—available now.",
    "Readiness assessment",
    "Turn uncertainty into a focused starting point.",
    "Complete the live GPM Readiness & Classification Tool to receive an indicative view of your organisation’s regulatory position, readiness priorities and recommended next steps.",
    "5–8 min",
    "GUIDED ASSESSMENT",
    "Insights explorer",
    "Find intelligence relevant to the decision in front of you.",
    "Explore practical perspectives across regulation, governance, technology and learning using a responsive topic filter designed for faster discovery.",
    "intelligence themes",
    "Governance Library",
    "Discover implementation-ready governance resources.",
    "Review selected policy resources and toolkits available for purchase, then request the right package for your organisation through a guided enquiry.",
    "policy resources",
  ];
  for (const copy of required) assert.match(page + experience, exact(copy));
  for (const token of ["role=\"tablist\"", "role=\"tab\"", "role=\"tabpanel\"", "aria-selected", "aria-controls", "ArrowLeft", "ArrowRight", "Home", "End"]) {
    assert.ok(experience.includes(token), `missing accessible tab behavior: ${token}`);
  }
  assert.match(experience, /tabIndex=\{activeIndex === index \? 0 : -1\}/);
});

test("latest thinking content is exact and complete", () => {
  const required = [
    "Intelligence for responsible data leadership.",
    "GPM PRIVACY PULSE · ISSUE 01",
    "Understanding Data Protection Fundamentals",
    "A practical foundation for teams responsible for handling personal data.",
    "REGULATORY INTELLIGENCE",
    "From annual compliance to continuous assurance",
    "Why evidence, ownership and remediation matter beyond the audit cycle.",
    "RESPONSIBLE INNOVATION",
    "Building accountability into emerging technology",
    "Practical governance questions for organisations adopting AI-enabled systems.",
  ];
  for (const copy of required) assert.match(page, exact(copy));
});

test("global navigation, footer routes and exact contact details match the mockup", () => {
  for (const route of ["/about", "/services", "/industries", "/tools", "/insights", "/governance-library", "/contact"]) {
    assert.ok(page.includes(`href=\"${route}\"`) || mobileMenu.includes(`href: \"${route}\"`), `missing route: ${route}`);
  }
  for (const detail of [
    "Suites 1008 & 1009, KINGFEM GA247",
    "264 Ahmadu Bello Way, Mabushi, Abuja FCT",
    "dataprotection@gpm-associates.ng",
    "+234 803 899 2782",
    "Where Data Protection Meets Innovation.",
    "Report a Breach to the NDPC",
    "GPM Associates, Abuja",
    "© 2026 GPM ASSOCIATES",
  ]) assert.match(source, exact(detail));
  assert.match(page, /mailto:dataprotection@gpm-associates\.ng/);
  assert.ok(page.includes('href="tel:+234****2782"'));
});

test("approved external links are exact and safely isolated", () => {
  const links = [
    "https://services.ndpc.gov.ng/portal/?page=verify-c&d=4384CC9A-B06F-4FD3-B19B-8C6B3CF86&id=20892&sn=9c73c00bb8c85b96db03b097e4d043ff&t=eosic_business_registration&tp=nwp_eosic",
    "https://services.ndpc.gov.ng/breach/",
    "https://www.linkedin.com/company/gpm-associates-data-protection-consultants/",
    "https://www.facebook.com/GPM-Associates-Data-Protection-Consultants/",
    "https://x.com/GPM_DataProtect",
    "https://www.instagram.com/gpm_dataprotect/",
    "https://www.gpm-associates.ng/?p=Privacy-Policy",
    "https://www.gpm-associates.ng/?p=Cookies-Policy",
  ];
  for (const link of links) assert.ok(page.includes(link), `missing approved external link: ${link}`);
  assert.match(page, /rel="noopener noreferrer"/);
});

test("cookie preferences are accessible, first-party only and gate external media", () => {
  for (const label of ["Manage preferences", "Reject optional", "Accept all", "External media", "Cookie Settings", "Google Maps is blocked until you allow external media.", "ENABLE MAP"]) {
    assert.match(page + consent, exact(label));
  }
  for (const token of ["localStorage", "externalMedia", "role=\"dialog\"", "aria-modal=\"true\"", "gpm-cookie-preferences"]) {
    assert.ok(consent.includes(token), `missing consent behavior: ${token}`);
  }
  assert.match(consent, /externalMedia \?/);
  assert.equal(/google-analytics|googletagmanager|facebook\.net|hotjar/i.test(source), false);
});

test("hero motion is controllable, reduced-motion safe and uses deterministic SVG arrows", () => {
  for (const token of ["Pause motion", "Play motion", "aria-pressed", "prefers-reduced-motion", "hero-motion-paused"]) {
    assert.ok(experience.includes(token) || styles.includes(token), `missing hero motion contract: ${token}`);
  }
  assert.match(source, /<svg[^>]*aria-hidden="true"[^>]*focusable="false"[^>]*>/);
  assert.match(source, /stroke="currentColor"/);
  assert.equal(source.includes("↗"), false);
});

test("approved Homepage image assets are local and binary-locked", () => {
  const assets = [
    ["public/images/gpm-homepage-trusted-data-environments-v1.webp", "/images/gpm-homepage-trusted-data-environments-v1.webp"],
    ["public/images/gpm-logo-approved.png", "/images/gpm-logo-approved.png"],
    ["public/images/ndpc-verification-qr-approved.png", "/images/ndpc-verification-qr-approved.png"],
  ];
  for (const [file, publicPath] of assets) {
    const url = new URL(file, root);
    assert.ok(existsSync(url), `missing approved asset: ${file}`);
    assert.ok(source.includes(publicPath), `missing approved asset reference: ${publicPath}`);
    assert.ok(statSync(url).size > 10_000, `asset unexpectedly small: ${file}`);
  }
  assert.match(source, /alt="Three African professionals mapping data flows and reviewing governance records"/);
  assert.match(source, /width=\{1672\}\s+height=\{941\}/);

  const hero = readFileSync(new URL("public/images/gpm-homepage-trusted-data-environments-v1.webp", root));
  const logo = readFileSync(new URL("public/images/gpm-logo-approved.png", root));
  const qr = readFileSync(new URL("public/images/ndpc-verification-qr-approved.png", root));
  assert.equal(createHash("sha256").update(hero).digest("hex"), "9d8faeaf77f8037f7c24c107230be841eaed55f3f6f8e1ac4486bc76f10efa23");
  assert.equal(createHash("sha256").update(logo).digest("hex"), "5f1de6c5842eb6128ef3b28847d6e3664ee2400d01ab8b4ef24cec225cd97b9d");
  assert.equal(createHash("sha256").update(qr).digest("hex"), "a7a5e24bac214736bded888bd12c4eccf04697527bf5055b82187dae846c9c76");
});

test("metadata and preview indexing posture match the approved Homepage", () => {
  assert.match(layout, exact("GPM Associates | Data Protection, Privacy Governance & Digital Trust"));
  assert.match(layout, exact("GPM Associates helps organisations navigate regulatory complexity, strengthen privacy governance and turn responsible data practices into sustainable business value."));
  assert.match(layout, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Disallow:\s*\//);
});

test("security headers remain strict", () => {
  for (const header of ["Content-Security-Policy", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy"]) {
    assert.ok(config.includes(header), `missing security header: ${header}`);
  }
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /nosniff/);
  assert.match(config, /DENY/);
});

test("scroll reveal remains selective, fail-open and reduced-motion safe", () => {
  assert.match(page, /<ScrollReveal \/>/);
  assert.match(reveal, /IntersectionObserver/);
  assert.match(reveal, /matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(reveal, /classList\.add\("reveal-ready"\)/);
  assert.match(reveal, /unobserve\(/);
  assert.match(styles, /\.reveal-ready \[data-reveal\]/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\[data-reveal\][\s\S]*opacity:\s*1/);
  assert.equal(/addEventListener\(["']scroll/.test(reveal), false);
});

test("README locks GPT Image 2 hero provenance against verified production asset facts", () => {
  assert.ok(readme.length > 0, "README should not be empty");
  assert.ok(readme.includes("public/images/gpm-homepage-trusted-data-environments-v1.webp"), "README missing production hero file");
  assert.ok(readme.includes("9d8faeaf77f8037f7c24c107230be841eaed55f3f6f8e1ac4486bc76f10efa23"), "README missing verified production SHA-256");
  assert.ok(readme.includes("1672") && readme.includes("941"), "README missing verified dimensions 1672x941");
  assert.ok(readme.includes("129018") || readme.includes("129 KB") || readme.includes("approximately `129 KB`"), "README missing verified file size ~129018 bytes");
  assert.ok(readme.includes("OpenAI GPT Image 2"), "README missing provider/model OpenAI GPT Image 2");
  assert.ok(readme.includes("gpt-image-2-medium"), "README missing model gpt-image-2-medium");
  assert.ok(readme.includes("1ee668c9fbc1e58acc4878ed2d38fa7ca29e2ab7f4d4874551f072fc631a2386"), "README missing generated master SHA-256");
  assert.ok(readme.includes("Asset provenance"), "README missing asset provenance section");
});

test("legacy Homepage copy, contacts and superseded imagery are absent", () => {
  for (const forbidden of [
    "From regulatory complexity to confident action.",
    "info@gpm-associates.ng",
    "enquiries@gpm-associates.ng",
    "4th Floor, Adamawa Plaza",
    "Central Business District, Abuja, Nigeria.",
    "/images/gpm-data-protection-hero.webp",
    "/images/gpm-regulatory-method.webp",
    "/images/gpm-independent-advice.webp",
    "/images/gpm-capacity-building-v2.webp",
  ]) assert.equal(page.includes(forbidden), false, `legacy content remains: ${forbidden}`);
});
