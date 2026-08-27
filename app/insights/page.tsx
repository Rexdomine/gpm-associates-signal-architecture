import Image from "next/image";
import type { Metadata } from "next";

import { InsightsExplorer } from "../components/InsightsExplorer";
import { ScrollReveal } from "../components/ScrollReveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const signalList = ["Regulation", "Governance", "Technology", "Capability"] as const;

const clientBenefits = [
  "Practical, workplace-focused learning",
  "Knowledge checks that reinforce understanding",
  "Quarterly content aligned with emerging priorities",
] as const;

const faqItems = [
  {
    question: "What is a Data Protection Compliance Organisation?",
    answer:
      "A DPCO is a professional organisation licensed by the Nigeria Data Protection Commission to provide data protection compliance services. This can include audits, advisory support, implementation, training and regulatory engagement within the scope of the applicable requirements.",
  },
  {
    question: "What is the difference between a readiness assessment and a compliance audit?",
    answer:
      "A readiness assessment provides an indicative view of current maturity and priority gaps. A compliance audit is a formal, evidence-based review against defined regulatory criteria and produces defensible findings, actions and, where applicable, regulatory deliverables.",
  },
  {
    question: "What is a Compliance Audit Return?",
    answer:
      "A Compliance Audit Return is a regulatory filing connected with the prescribed data protection compliance audit process. Applicability, timing and filing requirements should be confirmed against the organisation's regulatory classification and current NDPC requirements.",
  },
  {
    question: "When should an organisation conduct a DPIA?",
    answer:
      "A Data Protection Impact Assessment should be considered before processing that is likely to create high risk for individuals, including certain uses of sensitive data, surveillance, profiling, new technology or large-scale processing. The assessment should begin early enough to influence the design.",
  },
  {
    question: "Does every organisation require a Data Protection Officer?",
    answer:
      "The requirement and appropriate operating model depend on the organisation's regulatory status, processing activities, scale and risk. Even where a dedicated role is not mandated, clear responsibility and access to competent privacy advice remain important.",
  },
  {
    question: "What evidence should an organisation maintain?",
    answer:
      "Relevant evidence commonly includes processing records, policies, assessments, decisions, training records, processor agreements, incident documentation, rights-handling records, control tests and remediation tracking. The exact evidence set depends on the organisation's activities and obligations.",
  },
  {
    question: "Can GPM support implementation after an audit?",
    answer:
      "Yes. GPM can translate findings into a prioritised remediation programme, help design and implement controls, support accountable owners, validate closure and provide continuing DPO or assurance support.",
  },
  {
    question: "How is GPM training tailored to an organisation?",
    answer:
      "Programmes are shaped around the audience, sector, maturity, internal policies, systems and priority risks. Delivery may include executive briefings, practitioner development, workforce awareness, simulations, coaching and follow-up resources.",
  },
] as const;

export const metadata: Metadata = {
  title: "Insights | GPM Associates",
  description:
    "GPM Associates translates regulation, governance and emerging risk into practical intelligence for executives, DPOs, legal teams, risk leaders and the wider workforce.",
  robots: { index: false, follow: false },
};

export default function InsightsPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <ScrollReveal />

      <main id="main-content">
        <section className="page-hero dark-plane" aria-labelledby="insights-title">
          <div className="shell page-hero-grid page-hero-single">
            <div data-reveal>
              <p className="eyebrow eyebrow-light">Insights &amp; Intelligence</p>
              <h1 id="insights-title">Clear thinking for responsible data leadership.</h1>
              <p>
                GPM translates regulation, governance and emerging risk into practical intelligence for executives, DPOs, legal teams,
                risk leaders and the wider workforce.
              </p>
            </div>
          </div>
        </section>

        <section className="insights-visual" aria-labelledby="intelligence-lens-title">
          <div className="shell insights-visual-grid">
            <figure data-reveal>
              <Image
                src="/images/gpm-insights-editorial-approved.webp"
                alt="An African privacy professional reviewing research and governance material in a modern workspace"
                width={1536}
                height={1024}
                className="insights-visual-image"
                sizes="(max-width: 760px) 100vw, 55vw"
              />
              <figcaption>Research translated into practical organisational direction.</figcaption>
            </figure>

            <div data-reveal className="reveal-delay-1">
              <p className="eyebrow">The intelligence lens</p>
              <h2 id="intelligence-lens-title">See the signal. Understand the consequence. Decide what comes next.</h2>
              <p>
                Our perspectives connect regulatory change with the governance, operational and technology decisions leaders need to make.
              </p>
              <div className="signal-list" aria-label="Intelligence areas">
                {signalList.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <InsightsExplorer />

        <section className="section newsletter" aria-labelledby="privacy-pulse-title">
          <div className="shell newsletter-grid">
            <div data-reveal>
              <p className="eyebrow eyebrow-light">A GPM client advantage</p>
              <h2 id="privacy-pulse-title">Privacy capability that continues beyond the engagement.</h2>
              <p>
                GPM Privacy Pulse is a quarterly learning programme available to GPM clients. Each concise issue helps organisations
                maintain awareness, reinforce accountable behaviour and keep important privacy topics visible between formal training and
                advisory activities.
              </p>
              <ul className="client-benefit-list">
                {clientBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="newsletter-card reveal-delay-1" data-reveal>
              <span>Client edition · Issue 01</span>
              <h3>Understanding Data Protection Fundamentals</h3>
              <p>A 15-minute learning experience with practical guidance, a knowledge assessment and workplace application prompts.</p>
              <a href="/contact" className="arrow-link arrow-link-light">
                Explore working with GPM
                <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
                  <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="section section-tint" aria-labelledby="faq-title">
          <div className="shell faq-grid">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2 id="faq-title">Clear answers to common data protection questions.</h2>
              <p>
                These answers provide general information and should not be treated as legal advice or a formal assessment of a particular
                organisation.
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

        <section className="callout" aria-labelledby="insights-callout-title">
          <div className="shell">
            <div>
              <p className="eyebrow eyebrow-light">Begin a conversation</p>
              <h2 id="insights-callout-title">Need a clear view of a changing requirement?</h2>
              <p>Speak with our advisory team about the implications for your organisation.</p>
            </div>
            <a href="/contact" className="button button-light">
              Request guidance
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
