import type { Metadata } from "next";

import { InnovationQuickCheck } from "../components/InnovationQuickCheck";
import { ScrollReveal } from "../components/ScrollReveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const quickCheckBenefits = [
  "ORGANISATION-TYPE RULES",
  "INDICATIVE CLASSIFICATION",
  "DPO, POLICIES & TRAINING",
] as const;

const beforeYouBegin = [
  "This native tool is informational. It does not constitute a formal audit, regulatory determination or confirmation of compliance.",
  "Approximately 90 seconds",
  "No sign-up required",
  "Result logic inspected and rebuilt inside the website",
] as const;

const pathwaySteps = [
  { number: "01", label: "INSPECT" },
  { number: "02", label: "RECREATE" },
  { number: "03", label: "GUIDE" },
] as const;

export const metadata: Metadata = {
  title: "Innovation | GPM Associates",
  description:
    "Interactive privacy and governance tools from GPM Associates, including a natively rebuilt NDPA Quick Check assessment.",
  robots: { index: false, follow: false },
};

function InnovationFeatureArtwork() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 960 640" className="innovation-feature-svg">
      <defs>
        <linearGradient id="innovation-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#102b3a" />
          <stop offset="55%" stopColor="#0f2230" />
          <stop offset="100%" stopColor="#09151e" />
        </linearGradient>
        <radialGradient id="innovation-glow" cx="34%" cy="40%" r="54%">
          <stop offset="0%" stopColor="rgba(247,248,250,.55)" />
          <stop offset="100%" stopColor="rgba(247,248,250,0)" />
        </radialGradient>
        <linearGradient id="innovation-panel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,.03)" />
        </linearGradient>
      </defs>
      <rect width="960" height="640" fill="url(#innovation-bg)" />
      <circle cx="280" cy="280" r="220" fill="url(#innovation-glow)" opacity=".5" />
      <circle cx="278" cy="278" r="176" className="innovation-orbit innovation-orbit-a" />
      <circle cx="278" cy="278" r="126" className="innovation-orbit innovation-orbit-b" />
      <circle cx="278" cy="278" r="78" className="innovation-orbit innovation-orbit-c" />
      <path d="M150 278h255" className="innovation-axis" />
      <path d="M278 150v255" className="innovation-axis innovation-axis-vertical" />
      <g className="innovation-node innovation-node-a">
        <circle cx="278" cy="102" r="11" fill="#a80f1a" />
        <circle cx="278" cy="102" r="32" fill="none" stroke="rgba(168,15,26,.28)" strokeWidth="1.5" />
      </g>
      <g className="innovation-node innovation-node-b">
        <circle cx="403" cy="278" r="10" fill="#f3f5f7" />
        <circle cx="403" cy="278" r="26" fill="none" stroke="rgba(243,245,247,.22)" strokeWidth="1.2" />
      </g>
      <g className="innovation-node innovation-node-c">
        <circle cx="278" cy="452" r="9" fill="#a80f1a" />
        <circle cx="278" cy="452" r="24" fill="none" stroke="rgba(168,15,26,.18)" strokeWidth="1.2" />
      </g>
      <g className="innovation-glass innovation-glass-a">
        <rect x="486" y="118" width="210" height="118" rx="26" fill="url(#innovation-panel)" stroke="rgba(255,255,255,.18)" />
        <path d="M526 164h130M526 194h90" className="innovation-ui-line" />
      </g>
      <g className="innovation-glass innovation-glass-b">
        <rect x="552" y="252" width="250" height="142" rx="30" fill="url(#innovation-panel)" stroke="rgba(255,255,255,.15)" />
        <path d="M596 306h150M596 338h116M596 370h168" className="innovation-ui-line innovation-ui-line-soft" />
      </g>
      <g className="innovation-glass innovation-glass-c">
        <rect x="448" y="430" width="182" height="82" rx="22" fill="url(#innovation-panel)" stroke="rgba(255,255,255,.12)" />
        <path d="M486 470h102" className="innovation-ui-line" />
      </g>
      <path d="M340 214C442 214 478 164 590 164" className="innovation-data-path innovation-data-path-a" />
      <path d="M336 278C456 278 496 320 676 320" className="innovation-data-path innovation-data-path-b" />
      <path d="M324 352C420 382 460 470 540 470" className="innovation-data-path innovation-data-path-c" />
      <path d="M688 112l24 24M712 112l-24 24" className="innovation-cross" />
    </svg>
  );
}

export default function ToolsPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content">
        <ScrollReveal />

        <section className="tools-hero dark-plane" aria-labelledby="innovation-title">
          <div className="shell tools-hero-grid">
            <div className="tools-hero-copy" data-reveal>
              <p className="eyebrow">INNOVATION</p>
              <h1 id="innovation-title">GPM Innovation Lab</h1>
              <p>
                Interactive tools and assessments designed to support clearer privacy, compliance and governance decisions.
              </p>
            </div>
            <aside className="tools-hero-feature reveal-delay-1" data-reveal aria-label="Featured innovation">
              <p className="feature-kicker">FEATURED INNOVATION</p>
              <strong>GPM NDPA Quick Check</strong>
            </aside>
          </div>
        </section>

        <section className="tools-featured dark-plane" aria-labelledby="featured-innovation-title">
          <div className="shell">
            <div className="tools-featured-panel" data-reveal>
              <div className="tools-featured-visual">
                <InnovationFeatureArtwork />
                <div className="tools-featured-copy">
                  <p className="eyebrow">DECISION INTELLIGENCE</p>
                  <h2 id="featured-innovation-title">From inspected rules to proportionate action.</h2>
                </div>
              </div>
              <div className="tools-pathway" aria-label="Innovation Lab pathway">
                {pathwaySteps.map((step) => (
                  <div key={step.number} className="tools-pathway-step">
                    <span>{step.number}</span>
                    <strong>{step.label}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="tools-overview section-pad" aria-labelledby="featured-tool-title">
          <div className="shell tools-overview-grid">
            <div className="tools-overview-copy" data-reveal>
              <p className="eyebrow">FEATURED TOOL</p>
              <h2 id="featured-tool-title">GPM NDPA Quick Check</h2>
              <p>
                Complete a short, rules-led assessment rebuilt natively from a full inspection of the current quick-check workflow,
                including organisation-type rules, processing volumes, risk indicators and conditional technology-service logic.
              </p>
              <div className="tools-benefits" aria-label="Quick check benefit areas">
                {quickCheckBenefits.map((benefit) => (
                  <span key={benefit}>{benefit}</span>
                ))}
              </div>
            </div>
            <div className="tools-preflight reveal-delay-1" data-reveal>
              <p className="feature-kicker">BEFORE YOU BEGIN</p>
              <ul>
                {beforeYouBegin.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="tools-live dark-plane section-pad" aria-labelledby="tools-live-title">
          <div className="shell">
            <div className="tools-live-head" data-reveal>
              <p>NATIVE GPM PRODUCT</p>
              <span>RECREATED FROM INSPECTED DECISION LOGIC</span>
            </div>
            <div className="tools-live-toolbar" data-reveal>
              <div>
                <p className="feature-kicker">NDPA QUICK CHECK</p>
                <h2 id="tools-live-title">Find your likely processing level</h2>
              </div>
              <p className="tools-live-summary">
                The assessment now runs as a first-party GPM website experience rather than as an embedded mockup, while preserving
                the inspected outcome logic and next-step guidance.
              </p>
            </div>
            <InnovationQuickCheck />
          </div>
        </section>

        <section className="contact-cta" aria-labelledby="innovation-cta-title">
          <div className="shell cta-grid" data-reveal>
            <div>
              <p className="eyebrow">BEGIN A CONVERSATION</p>
              <h2 id="innovation-cta-title">Turn your indicative level into an accountable compliance programme.</h2>
            </div>
            <div>
              <p>
                Request a professional assessment to validate your classification and define the appropriate DPO, policy, training
                and assurance requirements.
              </p>
              <a className="contact-action" href="/contact">
                Speak with an advisor
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
