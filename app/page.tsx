import { HeroMedia, LiveFeatures } from "./components/HomepageExperience";
import { ScrollReveal } from "./components/ScrollReveal";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const services = [
  {
    number: "01",
    title: "Regulatory Compliance & Assurance",
    description: "Audits, CARs, registrations, maturity reviews and remediation assurance.",
  },
  {
    number: "02",
    title: "Privacy Governance & Risk Management",
    description: "Operating models, DPO support, DPIAs and accountable programme oversight.",
  },
  {
    number: "03",
    title: "Data Lifecycle & Privacy Engineering",
    description: "Data mapping, records, retention, consent, rights and privacy-by-design controls.",
  },
  {
    number: "04",
    title: "Third-Party & Cross-Border Advisory",
    description: "Vendor risk, contracts, transfers and external dependency governance.",
  },
  {
    number: "05",
    title: "Cyber Resilience & Information Assurance",
    description: "Security assurance, incident readiness and resilience improvement.",
  },
  {
    number: "06",
    title: "AI & Emerging Technology Governance",
    description: "AI accountability, impact assessment and responsible lifecycle controls.",
  },
  {
    number: "07",
    title: "Training & Capability Development",
    description: "Executive, practitioner and workforce programmes shaped around operating risk.",
  },
] as const;


const insights = [
  {
    label: "GPM PRIVACY PULSE · ISSUE 01",
    title: "Understanding Data Protection Fundamentals",
    body: "A practical foundation for teams responsible for handling personal data.",
    action: "EXPLORE THE ISSUE",
  },
  {
    label: "REGULATORY INTELLIGENCE",
    title: "From annual compliance to continuous assurance",
    body: "Why evidence, ownership and remediation matter beyond the audit cycle.",
    action: "READ THE PERSPECTIVE",
  },
  {
    label: "RESPONSIBLE INNOVATION",
    title: "Building accountability into emerging technology",
    body: "Practical governance questions for organisations adopting AI-enabled systems.",
    action: "READ THE PERSPECTIVE",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />

      <main id="main-content">
        <ScrollReveal />

        <section className="hero dark-plane" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">DATA PROTECTION. PRIVACY GOVERNANCE. DIGITAL TRUST.</p>
              <h1 id="hero-title">Building trusted, accountable and resilient data environments.</h1>
              <p className="hero-intro">GPM Associates helps organisations navigate regulatory complexity, strengthen privacy governance and turn responsible data practices into sustainable business value.</p>
              <div className="hero-actions">
                <a className="primary-action" href="/services">Explore our services<ArrowIcon /></a>
                <a className="text-action light" href="/contact">Speak with an advisor<ArrowIcon /></a>
              </div>
            </div>
            <div data-reveal className="reveal-delay-1"><HeroMedia /></div>
          </div>
        </section>

        <section className="stat-strip" aria-label="GPM Associates credentials">
          <div className="shell stat-grid">
            <div><strong>2019</strong><span>ESTABLISHED</span></div>
            <a href="https://services.ndpc.gov.ng/portal/?page=verify-c&d=4384CC9A-B06F-4FD3-B19B-8C6B3CF86&id=20892&sn=9c73c00bb8c85b96db03b097e4d043ff&t=eosic_business_registration&tp=nwp_eosic" target="_blank" rel="noopener noreferrer"><strong>NDPC</strong><span>LICENSED DPCO</span></a>
            <div><strong>7</strong><span>CAPABILITY PILLARS</span></div>
            <div><strong>10+</strong><span>SECTORS SUPPORTED</span></div>
          </div>
        </section>

        <section className="operating section-pad">
          <div className="shell operating-grid" data-reveal>
            <p className="eyebrow">THE OPERATING REALITY</p>
            <div>
              <h2>Data is now a source of accountability, exposure and strategic value.</h2>
              <div className="operating-copy">
                <p>Organisations must do more than publish policies. They need defensible governance, clear accountability, effective controls and evidence that their obligations are being met in practice.</p>
                <p>GPM combines regulatory insight with implementation capability to help leaders move from fragmented compliance activity to a sustainable privacy and data governance operating model.</p>
              </div>
              <a className="text-link" href="/about">WHY ORGANISATIONS CHOOSE GPM<ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="services section-pad" aria-labelledby="services-title">
          <div className="shell">
            <div className="section-intro" data-reveal>
              <p className="eyebrow">WHAT WE DO</p>
              <div>
                <h2 id="services-title">Specialist expertise across the data lifecycle.</h2>
                <p>Seven connected capabilities help organisations govern data, manage regulatory risk and build lasting internal capacity.</p>
              </div>
            </div>
            <div className="service-list">
              {services.map((service, index) => (
                <article key={service.number} className={`service-row ${index % 2 ? "reveal-delay-1" : ""}`} data-reveal>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="/services" aria-label={`Explore ${service.title}`}><ArrowIcon /></a>
                </article>
              ))}
            </div>
            <a className="text-link section-link" href="/services">VIEW ALL SERVICES<ArrowIcon /></a>
          </div>
        </section>

        <section className="experience dark-plane section-pad">
          <div className="shell experience-grid" data-reveal>
            <div className="experience-copy">
              <p className="eyebrow">SELECTED EXPERIENCE</p>
              <h2>Complex environments. Practical outcomes. Defensible assurance.</h2>
              <p>From public institutions and regulated enterprises to technology and health organisations, our work strengthens accountability where the stakes are highest.</p>
              <a className="text-link light" href="/industries#experience">EXPLORE OUR EXPERIENCE<ArrowIcon /></a>
            </div>
            <div className="experience-points">
              <article><strong>NATIONAL-SCALE</strong><p>Data ecosystems and public-interest programmes</p></article>
              <article><strong>REGULATED</strong><p>Financial, pension, health and professional environments</p></article>
              <article><strong>END-TO-END</strong><p>Assessment, remediation, training and continuing assurance</p></article>
            </div>
          </div>
        </section>

        <section className="innovation section-pad">
          <div className="shell innovation-grid">
            <div className="innovation-copy" data-reveal>
              <p className="eyebrow">GPM INNOVATION LAB</p>
              <h2>Start with a clearer view of your obligations.</h2>
              <p>{"Use the GPM NDPA Quick Check to identify your organisation's likely UHL, EHL or OHL processing level and the practical next steps that may follow."}</p>
              <a className="primary-action" href="/tools">Open the Quick Check<ArrowIcon /></a>
            </div>
            <div className="classification-card reveal-delay-1" data-reveal aria-label="Illustrative classification preview">
              <div className="classification-top"><span>INDICATIVE LEVEL</span><strong>EHL</strong></div>
              <div className="classification-lines">
                <div><strong>Organisation type</strong><span /></div>
                <div><strong>Volume</strong><span /></div>
                <div><strong>Risk indicators</strong><span /></div>
              </div>
              <p>Illustrative classification preview</p>
            </div>
          </div>
        </section>

        <section className="features section-pad" aria-labelledby="features-title">
          <div className="shell">
            <div className="section-intro compact" data-reveal>
              <p className="eyebrow">LIVE FEATURES</p>
              <div>
                <h2 id="features-title">Useful digital experiences—available now.</h2>
                <p>Explore selected GPM capabilities through focused, interactive experiences designed to help your organisation move from awareness to informed action.</p>
              </div>
            </div>
            <div data-reveal><LiveFeatures /></div>
          </div>
        </section>

        <section className="latest section-pad" aria-labelledby="latest-title">
          <div className="shell">
            <div className="section-intro latest-intro" data-reveal>
              <p className="eyebrow">LATEST THINKING</p>
              <h2 id="latest-title">Intelligence for responsible data leadership.</h2>
            </div>
            <div className="insight-grid">
              {insights.map((insight, index) => (
                <article key={insight.title} className={index ? "reveal-delay-1" : ""} data-reveal>
                  <p className="insight-label">{insight.label}</p>
                  <h3>{insight.title}</h3>
                  <p>{insight.body}</p>
                  <a className="text-link" href="/insights">{insight.action}<ArrowIcon /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <div className="shell cta-grid" data-reveal>
            <div>
              <p className="eyebrow">BEGIN A CONVERSATION</p>
              <h2>Your next data challenge deserves more than a generic solution.</h2>
            </div>
            <div>
              <p>Start a focused conversation with a GPM advisor.</p>
              <a className="contact-action" href="/contact">Speak with an advisor<ArrowIcon /></a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
