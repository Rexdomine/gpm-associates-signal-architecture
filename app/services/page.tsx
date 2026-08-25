import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "../components/ScrollReveal";
import { ServicesLifecycle } from "../components/ServicesLifecycle";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

function ArrowIcon() {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18"><path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export const metadata: Metadata = {
  title: "GPM Associates | Data Protection, Privacy Governance & Digital Trust",
  description: "GPM Associates helps organisations strengthen data protection, privacy governance, regulatory assurance and responsible innovation.",
  robots: { index: false, follow: false },
};

export default function ServicesPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">
        <ScrollReveal />

        <section className="services-hero dark-plane" aria-labelledby="services-hero-title">
          <div className="shell services-hero-grid">
            <div data-reveal><p className="eyebrow">Services</p><h1 id="services-hero-title">Connected services for complex data environments.</h1><p>GPM brings regulatory, governance, technical and organisational expertise together through seven service pillars that help clients reduce exposure, demonstrate accountability and build sustainable compliance capability.</p></div>
            <aside data-reveal className="services-hero-aside reveal-delay-1"><span>Seven capability pillars</span><strong>One integrated delivery model</strong></aside>
          </div>
        </section>

        <section className="services-integrated" aria-labelledby="services-integrated-title">
          <div className="shell services-integrated-grid">
            <figure data-reveal>
              <Image src="/images/gpm-data-flow-mapping-v2.webp" alt="African privacy professional mapping data flows on a structured workflow board" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 55vw" />
              <figcaption><span>GPM ADVISORY</span><strong>Expertise connected around the client’s operating reality.</strong><small>Illustrative subject only — not GPM personnel or staff, not a client, and not a participant in a real engagement.</small></figcaption>
            </figure>
            <div data-reveal className="services-integrated-copy reveal-delay-1"><p className="eyebrow">Integrated by design</p><h2 id="services-integrated-title">One challenge can require several kinds of expertise.</h2><p>We connect regulatory interpretation, governance, technology, implementation and organisational capability so that advice can move from obligation to sustained practice.</p><ul><li><b>01</b>Regulatory depth</li><li><b>02</b>Operational context</li><li><b>03</b>Evidence-led delivery</li></ul></div>
          </div>
        </section>

        <section className="services-pillars" aria-labelledby="services-pillars-title">
          <div className="shell">
            <header className="services-section-intro" data-reveal><p className="eyebrow">Seven service pillars</p><h2 id="services-pillars-title">Depth where it matters. Connection where it creates value.</h2><p>Each pillar is a substantial advisory capability. Together, they enable GPM to connect regulatory obligations, operational controls, technology risk and organisational capability within one engagement model.</p></header>
            <div className="services-pillar-list">
              <article className="services-pillar" data-reveal><div><span>01</span><h2>{"Regulatory Compliance & Assurance"}</h2><p>Independent, evidence-based assurance over data protection compliance and control effectiveness. We help organisations establish their regulatory position, complete statutory obligations, identify material gaps and validate remediation.</p></div><div><strong>Selected services</strong><ul><li>NDPA compliance audits and Compliance Audit Returns</li><li>Regulatory registrations and statutory filings</li><li>Compliance maturity assessments</li><li>Control design and effectiveness reviews</li><li>Remediation planning and closure validation</li><li>Regulatory inspection and audit readiness</li></ul><p className="services-value"><b>Value:</b> Defensible assurance that directs attention and investment to the most material compliance risks.</p></div></article>
              <article className="services-pillar" data-reveal><div><span>02</span><h2>{"Privacy Governance & Risk Management"}</h2><p>Governance structures that assign accountability, enable informed decisions and integrate privacy risk into enterprise management and operational oversight.</p></div><div><strong>Selected services</strong><ul><li>Privacy strategy and operating models</li><li>Advisory and outsourced DPO services</li><li>Privacy risk assessments and DPIAs</li><li>Policies and accountability frameworks</li><li>Governance committees and executive reporting</li><li>Programme oversight, risk registers and monitoring</li></ul><p className="services-value"><b>Value:</b> Clear accountability and disciplined oversight turn privacy into a sustainable governance capability.</p></div></article>
              <article className="services-pillar" data-reveal><div><span>03</span><h2>{"Data Lifecycle & Privacy Engineering"}</h2><p>Operational and technical controls that apply privacy requirements across the full data lifecycle, from collection and use to sharing, retention and secure disposal.</p></div><div><strong>Selected services</strong><ul><li>Data mapping, inventories and records of processing</li><li>Purpose, lawful basis and data-minimisation controls</li><li>Retention schedules and disposal governance</li><li>Privacy by design and by default</li><li>Consent, notices and data-subject rights mechanisms</li><li>Pseudonymisation, anonymisation and technical safeguards</li></ul><p className="services-value"><b>Value:</b> Durable process, product and system controls that make privacy principles work in practice.</p></div></article>
              <article className="services-pillar" data-reveal><div><span>04</span><h2>{"Third-Party & Cross-Border Advisory"}</h2><p>{"Structured governance for personal data processed beyond an organisation's direct control across vendors, processors, partners, cloud environments and international transfers."}</p></div><div><strong>Selected services</strong><ul><li>Vendor and processor due diligence</li><li>Third-party data-risk assessments</li><li>Data-processing and sharing agreements</li><li>Cross-border transfer assessments</li><li>Transfer safeguards and governance</li><li>Outsourcing and transaction due diligence</li></ul><p className="services-value"><b>Value:</b> Consistent accountability and risk oversight across supply chains, partners and jurisdictions.</p></div></article>
              <article className="services-pillar" data-reveal><div><span>05</span><h2>{"Cyber Resilience & Information Assurance"}</h2><p>Security governance, technical control assurance and incident preparedness aligned with data protection obligations to strengthen resilience across information assets and critical services.</p></div><div><strong>Selected services</strong><ul><li>Security risk and control assessments</li><li>Vulnerability assessment and testing</li><li>Architecture and infrastructure assurance</li><li>Incident and personal-data breach preparedness</li><li>Response, notification and remediation support</li><li>ISO/IEC 27001 and 27701 readiness</li></ul><p className="services-value"><b>Value:</b> Integrated privacy and security assurance that strengthens prevention, response and recovery.</p></div></article>
              <article className="services-pillar" data-reveal><div><span>06</span><h2>{"AI & Emerging Technology Governance"}</h2><p>Responsible adoption of AI, automated decision systems, IoT and other emerging technologies through clear governance, impact assessment and lifecycle controls.</p></div><div><strong>Selected services</strong><ul><li>AI governance frameworks and policies</li><li>AI and algorithmic impact assessments</li><li>Automated decision-making safeguards</li><li>Data provenance, quality and lawful-use governance</li><li>Explainability, fairness and accountable oversight</li><li>IoT, operational technology and smart-infrastructure governance</li></ul><p className="services-value"><b>Value:</b> Innovation within explicit boundaries that protect rights, trust and organisational resilience.</p></div></article>
              <article className="services-pillar" data-reveal><div><span>07</span><h2>{"Data Protection Training & Capability Development"}</h2><p>Role-specific learning that translates privacy and governance requirements into confident day-to-day practice for leadership, specialists and the wider workforce.</p></div><div><strong>Selected services</strong><ul><li>Board and executive briefings</li><li>DPO and practitioner programmes</li><li>Workforce awareness programmes</li><li>Sector-focused workshops</li><li>Bespoke organisational learning journeys</li><li>Simulations, coaching, clinics and follow-up support</li></ul><p className="services-value"><b>Value:</b> Practical competence, judgement and shared accountability for consistent privacy performance.</p></div></article>
            </div>
          </div>
        </section>

        <section className="services-lifecycle" aria-labelledby="services-lifecycle-title">
          <div className="shell">
            <header className="services-section-intro" data-reveal><p className="eyebrow">How we work</p><h2 id="services-lifecycle-title">The GPM Assess-Design-Implement-Sustain-Assure lifecycle.</h2><p>A five-stage advisory model connecting diagnosis, implementation and continuing evidence of effectiveness.</p></header>
            <ServicesLifecycle />
            <div className="services-stage-grid">
              <article><b>01</b><h3>Assess</h3><p>Establish obligations, current state, data environment and material risk exposure.</p></article>
              <article><b>02</b><h3>Design</h3><p>Develop governance, controls, policies and an implementation architecture.</p></article>
              <article><b>03</b><h3>Implement</h3><p>Embed controls into processes, systems, contracts and accountable roles.</p></article>
              <article><b>04</b><h3>Sustain</h3><p>Monitor, advise, report and improve as requirements and risks evolve.</p></article>
              <article><b>05</b><h3>Assure</h3><p>Apply independent review, evidence traceability and engagement-risk oversight.</p></article>
            </div>
          </div>
        </section>

        <section className="services-engagement" aria-labelledby="services-engagement-title"><div className="shell services-engagement-grid" data-reveal><div><p className="eyebrow">Engagement model</p><h2 id="services-engagement-title">Support shaped around your operating reality.</h2></div><div><p>Engagements may begin with a defined audit, regulatory filing, risk review, programme design or urgent advisory need. We then connect the right capabilities around the client’s objectives.</p><p>Our work can be delivered as a focused project, a multi-stage transformation programme or continuing DPO and assurance support.</p></div></div></section>

        <section className="services-cta" aria-labelledby="services-cta-title"><div className="shell services-cta-grid" data-reveal><div><p className="eyebrow">Begin a conversation</p><h2 id="services-cta-title">Not sure where to begin?</h2><p>Tell us what is changing, where risk is emerging and what decision you need to make.</p></div><a href="/contact">Speak with an advisor<ArrowIcon /></a></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
