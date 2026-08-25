import Image from "next/image";
import type { Metadata } from "next";

import { ScrollReveal } from "../components/ScrollReveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Industries & Experience | GPM Associates",
  description:
    "Data obligations are shaped by sector context, regulatory exposure and information sensitivity. Explore GPM Associates' industries and experience.",
  robots: { index: false, follow: false },
};

const sectorCards = [
  {
    number: "01",
    title: "Financial Services & Pensions",
    description:
      "High-volume personal and financial data, complex processor ecosystems and intensive regulatory oversight.",
  },
  {
    number: "02",
    title: "Public Sector & Regulators",
    description:
      "Public-interest mandates, national-scale systems, sensitive citizen data and heightened accountability.",
  },
  {
    number: "03",
    title: "Health & Life Sciences",
    description:
      "Sensitive health information, research environments, confidentiality and multi-party data sharing.",
  },
  {
    number: "04",
    title: "Technology & Digital Services",
    description:
      "Rapid product cycles, platform data, cloud dependencies, AI use and privacy-by-design requirements.",
  },
  {
    number: "05",
    title: "Education & Professional Bodies",
    description:
      "Large member and learner populations, credential data, digital platforms and statutory functions.",
  },
  {
    number: "06",
    title: "Insurance",
    description:
      "Risk profiling, claims data, health information, automated decisions and third-party distribution networks.",
  },
  {
    number: "07",
    title: "Professional Services",
    description:
      "Client confidentiality, workforce data, cross-border collaboration and information assurance.",
  },
  {
    number: "08",
    title: "Emerging & Data-Intensive Enterprises",
    description:
      "Scaling governance, new technology adoption and accountable data commercialisation.",
  },
] as const;

const engagements = [
  {
    number: "01",
    label: "Public-interest data ecosystem",
    title: "Strengthening governance around a national-scale data environment",
    challenge:
      "Complex accountability, large data populations and multiple institutional dependencies.",
    response:
      "Governance review, regulatory assurance, risk prioritisation and implementation guidance.",
    value:
      "Clearer ownership, stronger evidence and a structured path for continuing assurance.",
  },
  {
    number: "02",
    label: "Financial services & pensions",
    title: "Moving from annual audit activity to sustained remediation",
    challenge:
      "Recurring gaps across documentation, processor governance, privacy controls and internal accountability.",
    response:
      "Compliance assessment, executive prioritisation, remediation planning and continuing advisory support.",
    value:
      "Improved visibility over material gaps and a more disciplined implementation pathway.",
  },
  {
    number: "03",
    label: "Health & research",
    title: "Protecting sensitive information across a multi-stakeholder environment",
    challenge:
      "Sensitive data, research activity, partner relationships and complex lawful-use considerations.",
    response:
      "Policy and practice review, governance strengthening, evidence assessment and capacity building.",
    value:
      "More consistent controls and clearer responsibilities across the information lifecycle.",
  },
  {
    number: "04",
    label: "Technology enterprise",
    title: "Embedding privacy and assurance into service delivery",
    challenge:
      "Fast-moving products, client data, cloud dependencies and evolving security expectations.",
    response:
      "Privacy-by-design guidance, vendor governance, policy development and internal capability support.",
    value:
      "A stronger foundation for trusted client delivery and responsible scale.",
  },
] as const;

const proofPrinciples = [
  "No confidential client information",
  "No unsupported performance claims",
  "Approved logos and testimonials only",
  "Outcomes supported by engagement evidence",
] as const;

export default function IndustriesPage() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <ScrollReveal />
      <SiteHeader />

      <main id="content">
        <section className="industries-page-hero dark-plane">
          <div className="shell industries-page-hero-copy" data-reveal>
            <p className="eyebrow">INDUSTRIES &amp; EXPERIENCE</p>
            <h1>Sector insight backed by practical experience.</h1>
            <p className="industries-page-intro">
              Data obligations are shaped by business models, regulatory exposure, technology, stakeholders and the sensitivity of the information involved. We combine that context with practical experience across complex public and private data environments.
            </p>
          </div>

          <div className="shell" data-reveal>
            <figure className="industries-editorial">
              <Image
                alt="A modern African institutional district connecting public services, finance, healthcare, technology and infrastructure"
                className="industries-editorial-image"
                height={1081}
                priority
                sizes="(max-width: 900px) 100vw, 1320px"
                src="/images/gpm-industries-editorial-approved.webp"
                width={1573}
              />
              <figcaption className="industries-editorial-panel">
                <span>CONNECTED ENVIRONMENTS</span>
                <h2>Sector context changes how obligations must operate in practice.</h2>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="industries-sectors-page section-pad">
          <div className="shell">
            <div className="section-intro compact" data-reveal>
              <p className="eyebrow">WHERE WE WORK</p>
              <div>
                <h2>Experience across regulated and data-intensive environments.</h2>
              </div>
            </div>

            <div className="industries-sector-grid-mockup">
              {sectorCards.map((sector, index) => (
                <article
                  key={sector.number}
                  className={index % 2 ? "industries-sector-card-mockup reveal-delay-1" : "industries-sector-card-mockup"}
                  data-reveal
                >
                  <span>{sector.number}</span>
                  <h3>{sector.title}</h3>
                  <p>{sector.description}</p>
                  <small>Explore sector considerations</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="industries-sector-approach section-pad">
          <div className="shell industries-two-column" data-reveal>
            <div>
              <p className="eyebrow">A SECTOR-AWARE APPROACH</p>
              <h2>Same legislation. Different operating consequences.</h2>
            </div>
            <div className="industries-body-copy">
              <p>
                A financial institution, public agency, hospital and technology company may share core obligations, but their risk, evidence, governance and control requirements are not identical.
              </p>
              <p>
                We adapt the regulatory framework to the sector&apos;s operating environment while maintaining clear, defensible standards.
              </p>
            </div>
          </div>
        </section>

        <section className="industries-engagements section-pad">
          <div className="shell">
            <div className="section-intro compact" data-reveal>
              <p className="eyebrow">SELECTED ENGAGEMENT EXPERIENCE</p>
              <div>
                <h2>Practical work in complex environments.</h2>
                <p>
                  Where confidentiality applies, our experience is presented in anonymised form and focused on the challenge, GPM&apos;s response and the value created.
                </p>
              </div>
            </div>

            <div className="industries-engagement-grid">
              {engagements.map((item, index) => (
                <article
                  key={item.number}
                  className={index % 2 ? "industries-engagement-card reveal-delay-1" : "industries-engagement-card"}
                  data-reveal
                >
                  <span>{item.number}</span>
                  <p className="industries-engagement-label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <dl>
                    <div>
                      <dt>Challenge</dt>
                      <dd>{item.challenge}</dd>
                    </div>
                    <div>
                      <dt>GPM response</dt>
                      <dd>{item.response}</dd>
                    </div>
                    <div>
                      <dt>Value created</dt>
                      <dd>{item.value}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="industries-proof section-pad">
          <div className="shell industries-two-column" data-reveal>
            <div>
              <p className="eyebrow">PROOF PRINCIPLES</p>
              <h2>Credible. Specific. Responsible.</h2>
            </div>
            <div>
              <ul className="industries-proof-list">
                {proofPrinciples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <div className="shell cta-grid" data-reveal>
            <div>
              <p className="eyebrow">BEGIN A CONVERSATION</p>
              <h2>Bring sector context into your compliance programme.</h2>
            </div>
            <div>
              <p>Discuss the obligations, exposures and priorities specific to your organisation.</p>
              <a className="contact-action" href="/contact">
                Discuss your environment
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
