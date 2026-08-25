import type { Metadata } from "next";

import { ScrollReveal } from "../components/ScrollReveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Industries & Experience | GPM Associates",
  description:
    "Explore the sectors where GPM Associates supports data protection, privacy governance, regulatory assurance and operational accountability.",
  robots: { index: false, follow: false },
};

const sectorCards = [
  {
    id: "public-institutions",
    label: "PUBLIC INSTITUTIONS",
    title: "Public institutions and public-interest programmes",
    description:
      "Accountability expectations are shaped by public trust, lawful handling of citizen information, inter-agency coordination and the need for records that stand up to scrutiny.",
    focus: [
      "Lawful, documented handling of citizen and programme data",
      "Accountability structures that survive leadership and operational change",
      "Evidence, audit trails and records discipline for high-visibility environments",
    ],
  },
  {
    id: "regulated-enterprises",
    label: "REGULATED ENTERPRISES",
    title: "Financial, pension and other regulated environments",
    description:
      "In regulated operating contexts, privacy and governance work must align with formal oversight expectations, internal control frameworks and decision-ready remediation evidence.",
    focus: [
      "Control ownership, escalation paths and regulator-ready documentation",
      "Operational assurance across multi-team or multi-location structures",
      "Remediation priorities that can be tracked, evidenced and sustained",
    ],
  },
  {
    id: "technology-services",
    label: "TECHNOLOGY & DIGITAL SERVICES",
    title: "Technology organisations and digital service delivery",
    description:
      "Product velocity, vendor dependencies, cross-functional delivery and emerging-technology decisions can compress timelines while increasing the need for structured accountability.",
    focus: [
      "Privacy-by-design decisions within fast-moving delivery cycles",
      "Clear ownership for platform changes, vendors and shared data flows",
      "Responsible innovation questions before risk becomes operational debt",
    ],
  },
  {
    id: "health-organisations",
    label: "HEALTH ORGANISATIONS",
    title: "Health organisations and sensitive-data operations",
    description:
      "Sensitive information, continuity requirements and the human impact of operational mistakes raise the standard for access, evidence, staff practice and defensible governance.",
    focus: [
      "Sensitive-data handling and access discipline across operational teams",
      "Assurance approaches that recognise continuity and care obligations",
      "Workforce behaviours that reduce avoidable risk in high-stakes contexts",
    ],
  },
] as const;

const deliveryPriorities = [
  {
    number: "01",
    title: "Governance model",
    description:
      "Who owns the risk, who approves decisions, how escalation works and how leadership maintains visibility often changes materially from one sector to another.",
  },
  {
    number: "02",
    title: "Evidence burden",
    description:
      "The records, approvals, audit trails, remediation proof and operational artefacts required for defensible assurance are shaped by the industry context, not by templates alone.",
  },
  {
    number: "03",
    title: "Operational pressure",
    description:
      "Legacy systems, distributed teams, programme scale, third-party handling and service continuity expectations all affect how quickly a practical compliance response can be embedded.",
  },
  {
    number: "04",
    title: "Workforce adoption",
    description:
      "What people need to understand—and how that understanding is turned into repeatable behaviour—depends on the working reality of the organisation, not just the policy wording.",
  },
] as const;

const crossSectorPriorities = [
  {
    label: "HIGH-ACCOUNTABILITY PROCESSING",
    title: "Where data decisions carry legal, operational and reputational weight",
    body:
      "We focus on the processing environments where governance gaps become visible quickly and where practical controls need to hold under real operational pressure.",
  },
  {
    label: "CROSS-FUNCTIONAL IMPLEMENTATION",
    title: "Where compliance has to work across teams, systems and vendors",
    body:
      "The work is rarely isolated to one department. Legal, operations, technology, leadership and frontline teams often need a shared implementation path.",
  },
  {
    label: "REGULATOR-READY ASSURANCE",
    title: "Where evidence matters as much as intent",
    body:
      "Policies alone are not enough. The operating context determines what evidence, remediation proof and accountable ownership need to exist in practice.",
  },
  {
    label: "RESPONSIBLE INNOVATION",
    title: "Where new tools or delivery models need clearer decision discipline",
    body:
      "Emerging technology, digital transformation and scaled data use raise questions that should be structured early rather than left to late-stage remediation.",
  },
] as const;

const experiencePoints = [
  {
    label: "NATIONAL-SCALE",
    body: "Data ecosystems and public-interest programmes",
  },
  {
    label: "REGULATED",
    body: "Financial, pension, health and professional environments",
  },
  {
    label: "END-TO-END",
    body: "Assessment, remediation, training and continuing assurance",
  },
] as const;

export default function IndustriesPage() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <ScrollReveal />
      <SiteHeader />

      <main id="content">
        <section className="industries-hero dark-plane">
          <div className="shell industries-hero-grid">
            <div className="industries-hero-copy" data-reveal>
              <p className="eyebrow">INDUSTRIES &amp; EXPERIENCE</p>
              <h1>Sector context changes the shape of compliance.</h1>
              <p className="industries-hero-intro">
                From public institutions and regulated enterprises to technology and health organisations, our work strengthens accountability where the stakes are highest.
              </p>
              <p className="industries-hero-detail">
                The regulatory question may sound familiar across sectors, but the operating environment, risk profile, decision rights and evidence burden are never exactly the same.
              </p>
              <div className="hero-actions">
                <a className="primary-action" href="#sectors">
                  Explore sector priorities
                  <ArrowIcon />
                </a>
                <a className="text-action light" href="/contact">
                  Speak with an advisor
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <aside className="industries-context-card reveal-delay-1" data-reveal aria-label="Industries page summary">
              <span>WORKING CONTEXTS</span>
              <strong>Recognisable environments where accountability has to survive real operating pressure.</strong>
              <ul className="industries-context-list">
                <li><b>PUBLIC INTEREST</b><p>Citizen data, programmes, oversight and defensible records.</p></li>
                <li><b>REGULATED OPERATIONS</b><p>Controls, evidence, escalation and sustained remediation.</p></li>
                <li><b>DIGITAL DELIVERY</b><p>Product velocity, vendors, change management and emerging technology.</p></li>
                <li><b>SENSITIVE SERVICES</b><p>High-stakes decisions, continuity needs and workforce discipline.</p></li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="stat-strip" aria-label="Industry navigation">
          <div className="shell stat-grid">
            <a href="#public-institutions"><strong>Public</strong><span>Institutions &amp; programmes</span></a>
            <a href="#regulated-enterprises"><strong>Regulated</strong><span>Financial, pension and more</span></a>
            <a href="#technology-services"><strong>Technology</strong><span>Digital services &amp; delivery</span></a>
            <a href="#health-organisations"><strong>Health</strong><span>Sensitive-data operations</span></a>
          </div>
        </section>

        <section id="sectors" className="industries-sectors section-pad">
          <div className="shell">
            <div className="section-intro" data-reveal>
              <p className="eyebrow">WHERE WE WORK</p>
              <div>
                <h2>Recognisable operating environments. Practical sector judgement.</h2>
                <p>
                  We do not treat industry context as decoration around a generic compliance method. The environment itself changes the operating questions, the governance design and the evidence needed for defensible assurance.
                </p>
              </div>
            </div>

            <div className="industries-sector-grid">
              {sectorCards.map((sector, index) => (
                <article key={sector.id} id={sector.id} className={`industries-sector-card ${index % 2 ? "reveal-delay-1" : ""}`} data-reveal>
                  <span>{sector.label}</span>
                  <h3>{sector.title}</h3>
                  <p>{sector.description}</p>
                  <ul>
                    {sector.focus.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="experience dark-plane section-pad">
          <div className="shell experience-grid" data-reveal>
            <div className="experience-copy">
              <p className="eyebrow">SELECTED EXPERIENCE</p>
              <h2>Complex environments. Practical outcomes. Defensible assurance.</h2>
              <p>
                From public institutions and regulated enterprises to technology and health organisations, our work strengthens accountability where the stakes are highest.
              </p>
              <a className="text-link light" href="/services">
                SEE THE SERVICE LINES THAT SUPPORT THIS WORK
                <ArrowIcon />
              </a>
            </div>
            <div className="experience-points">
              {experiencePoints.map((point) => (
                <article key={point.label}>
                  <strong>{point.label}</strong>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services section-pad" aria-labelledby="industries-delivery-title">
          <div className="shell">
            <div className="section-intro" data-reveal>
              <p className="eyebrow">DELIVERY PRIORITIES</p>
              <div>
                <h2 id="industries-delivery-title">What usually changes from one industry to another?</h2>
                <p>
                  The answer is rarely the headline obligation alone. What changes most is the governance reality around it: who decides, what evidence matters, how fast change is possible and what frontline behaviour must look like for the controls to hold.
                </p>
              </div>
            </div>
            <div className="service-list">
              {deliveryPriorities.map((item, index) => (
                <article key={item.number} className={`service-row ${index % 2 ? "reveal-delay-1" : ""}`} data-reveal>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="/services" aria-label={`See related services for ${item.title}`}><ArrowIcon /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="latest section-pad" aria-labelledby="industries-priorities-title">
          <div className="shell">
            <div className="section-intro latest-intro" data-reveal>
              <p className="eyebrow">CROSS-SECTOR PRIORITIES</p>
              <h2 id="industries-priorities-title">The patterns that carry across industries.</h2>
            </div>
            <div className="insight-grid industries-priority-grid">
              {crossSectorPriorities.map((item, index) => (
                <article key={item.title} className={index ? "reveal-delay-1" : ""} data-reveal>
                  <p className="insight-label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a className="text-link" href="/contact">
                    Start a sector conversation
                    <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <div className="shell cta-grid" data-reveal>
            <div>
              <p className="eyebrow">NEXT STEP</p>
              <h2>Bring the sector reality into the conversation from the start.</h2>
            </div>
            <div>
              <p>Start a focused discussion about the regulatory, operational and accountability pressures specific to your industry context.</p>
              <a className="contact-action" href="/contact">
                Speak with an advisor
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
