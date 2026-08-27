import Image from "next/image";
import type { Metadata } from "next";

import { ContactEnquiryPanel } from "../components/ContactEnquiryPanel";
import { ConsentMap } from "../components/CookieConsent";
import { ScrollReveal } from "../components/ScrollReveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const conversationSignals = ["Confidential discussion", "Practical next steps", "Cross-functional advisory"] as const;

const directChannels = [
  {
    label: "Email",
    title: "Start with written context.",
    body: "Share the situation, current pressure point and the decision your organisation needs to make.",
    action: "Email dataprotection@gpm-associates.ng",
    href: "mailto:dataprotection@gpm-associates.ng",
  },
  {
    label: "Phone",
    title: "Speak directly with the team.",
    body: "Use the main advisory line when a live conversation will move the issue forward faster.",
    action: "Call +234 803 899 2782",
    href: "tel:+2348038992782",
  },
  {
    label: "Regulatory urgency",
    title: "Need to respond to a live incident?",
    body: "If an event may involve breach reporting, preserve facts quickly and start the advisory conversation early.",
    action: "Report a Breach to the NDPC",
    href: "https://services.ndpc.gov.ng/breach/",
  },
] as const;

const preparationPoints = [
  "What has changed, or what decision now needs to be made?",
  "Which data, systems, teams or third parties are involved?",
  "What timeline, regulatory pressure or operational risk matters most?",
  "What outcome would help leadership move with more confidence?",
] as const;

const supportThemes = [
  "NDPA audit readiness and remediation priorities",
  "DPO support, governance frameworks and executive oversight",
  "Data mapping, lifecycle controls and privacy engineering",
  "Third-party data risk, contracts and transfer questions",
  "Incident preparedness, response and regulatory reporting coordination",
  "Responsible AI, automation and emerging-technology governance",
] as const;

const faqItems = [
  {
    question: "What kinds of conversations usually start here?",
    answer:
      "Enquiries often begin with audit readiness, governance design, breach or incident concerns, third-party risk, AI governance, training needs or a request for more focused advisory support around a live decision.",
  },
  {
    question: "Do we need a fully defined scope before reaching out?",
    answer:
      "No. If the issue is still forming, outline the current pressure point, the operating context and what decision needs to move forward. GPM can help clarify the right starting scope.",
  },
  {
    question: "Can GPM support both immediate issues and longer programmes?",
    answer:
      "Yes. Some conversations begin with a specific filing, assessment or incident need, while others grow into governance design, remediation programmes, continuing DPO support or broader capability development.",
  },
  {
    question: "Should we use this page for Governance Library package guidance?",
    answer:
      "Yes. If you are not sure which Governance Library package fits your organisation, use the guided enquiry to describe your context and GPM can help identify the most suitable starting point.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Speak with an Advisor | GPM Associates",
  description:
    "Contact GPM Associates to discuss data protection, privacy governance, regulatory assurance, incident readiness, Governance Library guidance and responsible innovation priorities.",
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <ScrollReveal />

      <main id="main-content">
        <section className="contact-page-hero dark-plane" aria-labelledby="contact-page-title">
          <div className="shell contact-page-hero-grid">
            <div className="contact-page-hero-copy" data-reveal>
              <p className="eyebrow eyebrow-light">Speak with an advisor</p>
              <h1 id="contact-page-title">Bring your next data decision into a more focused conversation.</h1>
              <p className="contact-page-hero-intro">
                Contact GPM Associates when you need clearer direction on privacy governance, regulatory assurance, operational controls,
                incident readiness, responsible AI or a suitable Governance Library starting point.
              </p>
              <div className="hero-actions">
                <a className="primary-action" href="#start-your-enquiry">
                  Start your enquiry
                  <ArrowIcon />
                </a>
                <a className="text-action light" href="#direct-contact-title">
                  Call or email GPM
                  <ArrowIcon />
                </a>
              </div>
              <div className="signal-list" aria-label="What to expect from a GPM advisory conversation">
                {conversationSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>

            <figure className="contact-page-hero-media reveal-delay-1" data-reveal>
              <Image
                src="/images/gpm-contact-advisor-consultation-20260827.webp"
                alt="Two African senior professionals in a private advisory consultation with governance papers and a laptop in a refined Abuja office"
                width={1536}
                height={1024}
                className="contact-page-hero-image"
                priority
                sizes="(max-width: 1100px) 100vw, 50vw"
              />
              <figcaption>A private advisory setting shaped for governance, risk and accountability discussions.</figcaption>
            </figure>
          </div>
        </section>

        <section className="contact-direct section" aria-labelledby="direct-contact-title">
          <div className="shell">
            <div className="section-intro compact" data-reveal>
              <p className="eyebrow">Direct contact options</p>
              <div>
                <h2 id="direct-contact-title">Choose the fastest route into the conversation.</h2>
                <p>
                  Use the channel that best matches your situation: written context, a direct advisory call or immediate access to the NDPC
                  breach-reporting destination when regulatory urgency is involved.
                </p>
              </div>
            </div>
            <div className="contact-direct-grid">
              {directChannels.map((channel, index) => (
                <article key={channel.label} className={index ? "reveal-delay-1" : undefined} data-reveal>
                  <span>{channel.label}</span>
                  <h3>{channel.title}</h3>
                  <p>{channel.body}</p>
                  <a href={channel.href} className="arrow-link" target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                    {channel.action}
                    <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-enquiry section section-tint" aria-labelledby="contact-enquiry-section-title">
          <div className="shell contact-enquiry-grid">
            <div className="contact-enquiry-copy" data-reveal>
              <p className="eyebrow">Prepare the enquiry</p>
              <h2 id="contact-enquiry-section-title">Helpful context makes the first conversation more useful.</h2>
              <p>
                You do not need a perfect brief before reaching out. A few grounded facts about the current issue help GPM understand where
                to focus first and what kind of support may be most relevant.
              </p>
              <ul className="contact-preparation-list">
                {preparationPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="contact-theme-stack" aria-label="Common advisory themes">
                {supportThemes.map((theme) => (
                  <span key={theme}>{theme}</span>
                ))}
              </div>
            </div>
            <ContactEnquiryPanel />
          </div>
        </section>

        <section className="contact-location dark-plane" aria-labelledby="contact-location-title">
          <div className="shell contact-location-grid">
            <div data-reveal>
              <p className="eyebrow eyebrow-light">Visit or coordinate remotely</p>
              <h2 id="contact-location-title">Abuja office, direct channels and map access when you want it.</h2>
              <p>
                GPM Associates can coordinate advisory conversations by email, phone or follow-up scheduling, and the main office location
                is available below through the same consent-aware map pattern used across the site.
              </p>
              <div className="contact-location-details">
                <p>
                  <strong>GPM Associates</strong>
                  <br />
                  Suites 1008 &amp; 1009, KINGFEM GA247
                  <br />
                  264 Ahmadu Bello Way, Mabushi, Abuja FCT
                </p>
                <p>
                  <a href="mailto:dataprotection@gpm-associates.ng">dataprotection@gpm-associates.ng</a>
                  <br />
                  <a href="tel:+2348038992782">+234 803 899 2782</a>
                </p>
              </div>
            </div>
            <div className="reveal-delay-1" data-reveal>
              <ConsentMap />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="contact-faq-title">
          <div className="shell faq-grid">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2 id="contact-faq-title">Common questions before contacting GPM.</h2>
              <p>
                This page is a starting point for advisory conversations. Specific regulatory conclusions, legal advice and final scope
                decisions still depend on the facts of the organisation and the issue being discussed.
              </p>
            </div>

            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} className={index % 2 ? "reveal-delay-1" : undefined} data-reveal>
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

        <section className="callout" aria-labelledby="contact-callout-title">
          <div className="shell">
            <div>
              <p className="eyebrow eyebrow-light">Begin a conversation</p>
              <h2 id="contact-callout-title">Need to move quickly?</h2>
              <p>Use the advisory line or email GPM directly and include the decision, deadline or risk that now needs attention.</p>
            </div>
            <a href="mailto:dataprotection@gpm-associates.ng" className="button button-light">
              Email GPM now
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
