import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path, encoding = "utf8") => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, encoding) : encoding === null ? Buffer.alloc(0) : "";
};

const page = read("app/contact/page.tsx");
const panel = read("app/components/ContactEnquiryPanel.tsx");
const consent = read("app/components/CookieConsent.tsx");
const styles = read("app/globals.css");
const readme = read("README.md");
const plan = read("docs/plans/2026-08-27-contact-page.md");
const image = read("public/images/gpm-contact-advisor-consultation-20260827.webp", null);
const imageSha = createHash("sha256").update(image).digest("hex");
const exact = (value) => new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

function assertInOrder(source, markers) {
  let cursor = -1;
  for (const marker of markers) {
    const next = source.indexOf(marker, cursor + 1);
    assert.ok(next > cursor, `missing or out of order: ${marker}`);
    cursor = next;
  }
}

test("contact route exports review-only metadata and exact section contract", () => {
  for (const copy of [
    'title: "Speak with an Advisor | GPM Associates"',
    'Contact GPM Associates to discuss data protection, privacy governance, regulatory assurance, incident readiness, Governance Library guidance and responsible innovation priorities.',
    'robots: { index: false, follow: false }',
    'Speak with an advisor',
    'Bring your next data decision into a more focused conversation.',
    'Start your enquiry',
    'Call or email GPM',
    'Direct contact options',
    'Choose the fastest route into the conversation.',
    'Prepare the enquiry',
    'Helpful context makes the first conversation more useful.',
    'Visit or coordinate remotely',
    'Abuja office, direct channels and map access when you want it.',
    'Frequently asked questions',
    'Common questions before contacting GPM.',
    'Begin a conversation',
    'Need to move quickly?',
    'Open service intake form',
  ]) {
    assert.match(page, exact(copy));
  }

  assertInOrder(page, [
    'contact-page-hero dark-plane',
    'contact-direct section',
    'contact-enquiry section section-tint',
    'contact-location dark-plane',
    'Frequently asked questions',
    'Need to move quickly?',
    '<SiteFooter />',
  ]);
});

test("contact route uses the approved local hero image and exact contact details", () => {
  for (const copy of [
    'src="/images/gpm-contact-advisor-consultation-20260827.webp"',
    'alt="Two African senior professionals in a private advisory consultation with governance papers and a laptop in a refined Abuja office"',
    'sizes="(max-width: 1100px) 100vw, 50vw"',
    'A private advisory setting shaped for governance, risk and accountability discussions.',
    'dataprotection@gpm-associates.ng',
    'tel:+2348038992782',
    'Suites 1008 &amp; 1009, KINGFEM GA247',
    '264 Ahmadu Bello Way, Mabushi, Abuja FCT',
    'Report a Breach to the NDPC',
    'https://forms.gle/iXFZM1o6rxmPAXcw7',
    'Google Maps is blocked until you allow external media.',
    'External map access is enabled for this browser.',
    'OPEN IN GOOGLE MAPS',
  ]) {
    assert.match(page + panel + consent, exact(copy));
  }

  assert.equal(existsSync(new URL('public/images/gpm-contact-advisor-consultation-20260827.webp', root)), true);
  assert.equal(imageSha, '9b1c507789c63ee44f345e312c1503c58391a448854d2122f71fa125ddf50831');
});

test("contact enquiry panel stays first-party, accessible and mailto-based", () => {
  for (const copy of [
    'Guided enquiry',
    'Share the issue, decision or pressure point.',
    'Name',
    'Organisation',
    'Email',
    'Phone (optional)',
    'Advisory topic',
    'What do you need help with?',
    'Describe the current requirement, risk, timeline or decision that needs attention.',
    'Draft your enquiry',
    'Email GPM directly',
    'This drafts an email to GPM using your default mail app.',
    'Opening your email app with a drafted enquiry to GPM Associates.',
    'Regulatory compliance and audit readiness',
    'Governance Library package guidance',
    'mailto:dataprotection@gpm-associates.ng?subject=',
    'onSubmit={handleSubmit}',
    'aria-live="polite"',
    'window.location.href = mailtoHref;',
    'aria-haspopup="listbox"',
    'role="listbox"',
    'role="option"',
    'contact-topic-trigger',
    'contact-topic-menu',
    'contact-topic-option',
    'contact-topic-trigger-value',
    'aria-labelledby={`${topicLabelId} ${topicValueId}`}',
    '<span id={topicValueId} className="contact-topic-trigger-value">{form.topic}</span>',
  ]) {
    assert.match(panel, exact(copy));
  }

  assert.equal(panel.includes('<select name="topic"'), false);
  assert.equal(/fetch\(|axios|api\/|action=\"https?:/i.test(panel), false);
});

test("contact page locks the preparation points, advisory themes and FAQs", () => {
  for (const copy of [
    'What has changed, or what decision now needs to be made?',
    'Which data, systems, teams or third parties are involved?',
    'What timeline, regulatory pressure or operational risk matters most?',
    'What outcome would help leadership move with more confidence?',
    'NDPA audit readiness and remediation priorities',
    'DPO support, governance frameworks and executive oversight',
    'Incident preparedness, response and regulatory reporting coordination',
    'What kinds of conversations usually start here?',
    'Do we need a fully defined scope before reaching out?',
    'Can GPM support both immediate issues and longer programmes?',
    'Should we use this page for Governance Library package guidance?',
  ]) {
    assert.match(page, exact(copy));
  }
});

test("contact route is documented with implementation scope and asset provenance", () => {
  for (const copy of [
    'app/contact/page.tsx',
    'app/components/ContactEnquiryPanel.tsx',
    'The `/contact` route is now implemented on this branch.',
    '### Contact page editorial image (fresh GPT Image 2 asset)',
    'public/images/gpm-contact-advisor-consultation-20260827.webp',
    '9b1c507789c63ee44f345e312c1503c58391a448854d2122f71fa125ddf50831',
    '2026-08-27-contact-page.md',
  ]) {
    assert.match(readme + plan, exact(copy));
  }
});

test("contact styles lock the route structures and keep the enquiry form usable on mobile", () => {
  for (const token of [
    '.contact-page-hero',
    '.contact-page-hero-grid',
    '.contact-direct-grid',
    '.contact-enquiry-grid',
    '.contact-enquiry-form',
    '.contact-location-grid',
    '.contact-theme-stack',
    '.contact-topic-menu',
    'max-height: min(46vh, 360px)',
    'overflow-y: auto',
    'overscroll-behavior: contain',
    '@media (max-width: 1100px)',
    '@media (max-width: 800px)',
  ]) {
    assert.ok(styles.includes(token), `missing contact style token: ${token}`);
  }
});
