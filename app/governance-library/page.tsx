import Image from "next/image";
import type { Metadata } from "next";

import { GovernanceLibraryCatalog } from "../components/GovernanceLibraryCatalog";
import { ScrollReveal } from "../components/ScrollReveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const resourceSignals = ["Policy suites", "Toolkits", "Operational packs", "Leadership briefs"] as const;
const heroModules = ["Privacy Governance", "Third-Party Oversight", "AI Governance"] as const;
const heroProofPoints = [
  {
    title: "Practical and implementation-ready",
    body: "Built to move from policy intent into usable governance material.",
  },
  {
    title: "Aligned to global best practice",
    body: "Structured around accountable privacy and data-governance expectations.",
  },
  {
    title: "Supports each stage of the governance journey",
    body: "Useful for baseline control design, oversight and programme strengthening.",
  },
] as const;

const workflowSteps = [
  {
    number: "01",
    title: "Choose the closest resource set",
    body: "Start with the topic area closest to your organisation’s immediate governance need, whether that is privacy oversight, operational control design, third-party assurance or AI governance.",
  },
  {
    number: "02",
    title: "Request a guided fit check",
    body: "GPM helps confirm whether the package fits your current maturity, operating model, risk profile and sector context before you commit.",
  },
  {
    number: "03",
    title: "Add advisory support if needed",
    body: "Where implementation needs stronger tailoring, the library can be paired with advisory input, leadership briefing or capability support.",
  },
] as const;

const faqItems = [
  {
    question: "Are these resources generic templates?",
    answer:
      "No. The Governance Library is curated around practical privacy and data-governance use cases. Resources are designed to give organisations a more structured starting point for accountable implementation rather than a bare document shell.",
  },
  {
    question: "Can a package be matched to our sector or operating environment?",
    answer:
      "Yes. GPM can help determine which package is the closest fit and where sector, processing risk, governance structure or internal operating realities may require additional tailoring.",
  },
  {
    question: "Do the resources include editable working documents?",
    answer:
      "The exact deliverable format depends on the package requested. During the guided enquiry, GPM can clarify the intended document set, working format and any implementation support attached to that package.",
  },
  {
    question: "Can we combine a governance package with training or advisory support?",
    answer:
      "Yes. Organisations can request a package on its own or combine it with workshops, leadership briefings, implementation support or broader privacy advisory services where the situation calls for more than document acquisition.",
  },
  {
    question: "Is the Governance Library suitable for organisations still early in their privacy programme?",
    answer:
      "Yes. Some packages are especially useful when teams need a stronger baseline for governance, operational control design or oversight readiness. GPM can help identify the most appropriate entry point.",
  },
  {
    question: "How do we request the right package?",
    answer:
      "Use the guided enquiry route to describe your current need, operating context and priority timeline. GPM can then recommend the most suitable package and any supporting advisory options.",
  },
] as const;

export const metadata: Metadata = {
  title: "Governance Library | GPM Associates",
  description:
    "Explore implementation-ready governance resources from GPM Associates, including curated policy packs, operational toolkits and guided package selection for privacy and data-governance programmes.",
  robots: { index: false, follow: false },
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export default function GovernanceLibraryPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <ScrollReveal />

      <main id="main-content">
        <section className="governance-library-hero dark-plane" aria-labelledby="governance-library-title">
          <div className="governance-library-hero-layer" aria-hidden="true" />
          <div className="shell governance-library-hero-grid">
            <div className="governance-library-hero-copy" data-reveal>
              <p className="eyebrow eyebrow-light">Governance Library</p>
              <h1 id="governance-library-title">Discover implementation-ready governance resources.</h1>
              <p className="governance-library-hero-intro">
                Review selected policy resources, governance toolkits and operational packs, then request the right package for your
                organisation through a guided enquiry.
              </p>
              <div className="hero-actions governance-library-hero-actions">
                <a className="primary-action" href="#governance-library-catalog">
                  Explore the library
                  <ArrowIcon />
                </a>
                <a className="text-action light" href="#governance-library-workflow-title">
                  How it works
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <figure className="governance-library-hero-media reveal-delay-1" data-reveal>
              <div className="governance-library-hero-image-wrap">
                <Image
                  src="/images/gpm-governance-library-editorial-20260827.webp"
                  alt="Two African professionals reviewing governance policy materials, binders and a structured compliance checklist in a modern office"
                  width={1536}
                  height={1024}
                  className="governance-library-hero-image"
                  priority
                  sizes="(max-width: 1100px) 100vw, 50vw"
                />
                <div className="governance-library-hero-image-shade" aria-hidden="true" />
              </div>
              <figcaption>
                <span>Curated library modules</span>
                <div className="governance-library-module-stack" aria-label="Featured governance library modules">
                  {heroModules.map((module) => (
                    <b key={module}>{module}</b>
                  ))}
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="shell governance-library-proof-shell">
            <div className="governance-library-proof-strip" aria-label="Governance library proof points">
              {heroProofPoints.map((point, index) => (
                <article key={point.title} className={index ? "reveal-delay-1" : undefined} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{point.title}</strong>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="insights-visual governance-library-visual" aria-labelledby="governance-library-lens-title">
          <div className="shell insights-visual-grid governance-library-visual-grid">
            <figure data-reveal>
              <Image
                src="/images/gpm-governance-library-section-editorial-20260827.webp"
                alt="Two African professionals reviewing governance folders, working papers and implementation documents in a refined office setting"
                width={1536}
                height={1024}
                className="insights-visual-image"
                sizes="(max-width: 760px) 100vw, 55vw"
              />
              <figcaption>Governance resources organised for practical adoption, oversight and follow-through.</figcaption>
            </figure>

            <div data-reveal className="reveal-delay-1">
              <p className="eyebrow">What the library is for</p>
              <h2 id="governance-library-lens-title">Move from policy intention to usable implementation material.</h2>
              <p>
                The Governance Library is curated for organisations that need structured resources they can review, request and apply more
                confidently across privacy governance, data lifecycle control, third-party oversight and responsible innovation.
              </p>
              <div className="signal-list" aria-label="Governance library resource signals">
                {resourceSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GovernanceLibraryCatalog />

        <section className="section governance-library-workflow section-tint" aria-labelledby="governance-library-workflow-title">
          <div className="shell">
            <div className="section-intro compact" data-reveal>
              <p className="eyebrow">How access works</p>
              <div>
                <h2 id="governance-library-workflow-title">A guided route to the right package.</h2>
                <p>
                  Every organisation arrives with a different governance baseline. The library is designed to make selection easier without
                  pretending that every package should be chosen in isolation.
                </p>
              </div>
            </div>

            <div className="governance-workflow-grid">
              {workflowSteps.map((step, index) => (
                <article key={step.number} className={index ? "reveal-delay-1" : undefined} data-reveal>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tint" aria-labelledby="governance-library-faq-title">
          <div className="shell faq-grid">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2 id="governance-library-faq-title">Common questions before requesting a package.</h2>
              <p>
                The Governance Library helps organisations start with clearer structure. Final package fit and support scope should still be
                confirmed through guided enquiry.
              </p>
            </div>

            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} className={index % 3 === 1 ? "reveal-delay-1" : index % 3 === 2 ? "reveal-delay-2" : undefined} data-reveal>
                  <summary>
                    {item.question}
                    <span>+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="callout" aria-labelledby="governance-library-callout-title">
          <div className="shell">
            <div>
              <p className="eyebrow eyebrow-light">Guided enquiry</p>
              <h2 id="governance-library-callout-title">Need help identifying the right governance package?</h2>
              <p>Tell GPM what you need to strengthen, and we can point you to the most suitable starting resource.</p>
            </div>
            <a href="/contact" className="button button-light">
              Request a package review
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
