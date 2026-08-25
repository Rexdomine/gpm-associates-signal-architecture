import type { Metadata } from "next";
import Image from "next/image";
import { DottedGlobe } from "../components/DottedGlobe";
import { ScrollReveal } from "../components/ScrollReveal";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const officialVerificationUrl = "https://services.ndpc.gov.ng/portal/?page=verify-c&d=4384CC9A-B06F-4FD3-B19B-8C6B3CF86&id=20892&sn=9c73c00bb8c85b96db03b097e4d043ff&t=eosic_business_registration&tp=nwp_eosic";

const credentials = [
  ["BN 946280", "REGISTERED IN NIGERIA"],
  ["000018", "PIONEER DPCO CERTIFICATE"],
  ["7", "CONNECTED CAPABILITIES"],
  ["1", "INTEGRATED DELIVERY MODEL"],
] as const;

const values = [
  ["01", "Integrity", "We give clear, evidence-based advice and protect the confidence placed in us."],
  ["02", "Excellence", "We combine regulatory depth with disciplined execution and quality assurance."],
  ["03", "Accountability", "We connect obligations, evidence, decisions and ownership so that progress can be demonstrated."],
  ["04", "Practicality", "We design controls and programmes that organisations can genuinely operate."],
  ["05", "Responsible Innovation", "We help clients adopt technology within clear governance and risk boundaries."],
] as const;

const team = [
  ["01", "DATA PROTECTION & PRIVACY ADVISORY", "Managing Director", "Provides overall engagement direction, executive governance, enterprise programme design, policy oversight and senior client relationship management."],
  ["02", "REGULATORY AND LEGAL ADVISORY", "Founding Partner & Regulatory Lead", "Interprets data protection, cyber and regulatory requirements and provides legal-risk guidance for highly regulated environments."],
  ["03", "COMPLIANCE DELIVERY & TECHNICAL PRIVACY", "Data Protection & Compliance Lead", "Leads NDPA audits, DPIAs, policy frameworks, annual CAR filing and continuing DPO advisory, connecting regulatory requirements with practical controls."],
  ["04", "TECHNOLOGY & IMPLEMENTATION", "IT Infrastructure & Programme Delivery Lead", "Provides technology, programme-governance and implementation leadership for complex, multi-location initiatives and critical infrastructure environments."],
  ["05", "INFORMATION ASSURANCE & RESILIENCE", "Cybersecurity Lead", "Provides leadership across security operations, incident response, threat intelligence, vulnerability management and emerging-technology risk."],
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About GPM Associates | Data Protection & Privacy Governance",
  description: "Learn about GPM Associates, an NDPC-licensed Data Protection Compliance Organisation helping institutions build practical, sustainable data governance.",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">
        <ScrollReveal />

        <section className="about-hero dark-plane" aria-labelledby="about-hero-title">
          <DottedGlobe />
          <div className="shell about-hero-grid">
            <div className="about-hero-copy" data-reveal>
              <p className="eyebrow">ABOUT GPM</p>
              <h1 id="about-hero-title">Specialist expertise for organisations that take data responsibility seriously.</h1>
              <p className="about-hero-intro">GPM Associates is an NDPC-licensed Data Protection Compliance Organisation helping public and private institutions translate regulatory obligations into practical, sustainable governance.</p>
            </div>
            <aside className="about-established reveal-delay-1" data-reveal aria-label="GPM Associates established in 2019">
              <span>ESTABLISHED</span>
              <strong>2019</strong>
              <p>Established to help organisations protect people, strengthen accountability and create value through responsible data use.</p>
            </aside>
          </div>
        </section>

        <section className="about-credentials" aria-label="GPM Associates credentials">
          <ul className="shell about-credentials-grid">
            {credentials.map(([figure, label]) => (
              <li key={label}><strong>{figure}</strong><span>{label}</span></li>
            ))}
          </ul>
        </section>

        <section className="about-verification about-section" aria-labelledby="about-verification-title">
          <div className="shell about-verification-grid" data-reveal>
            <div>
              <p className="eyebrow">REGULATORY VERIFICATION</p>
              <h2 id="about-verification-title">{"Verify GPM's NDPC registration."}</h2>
              <p>{"Scan the code or open the official Nigeria Data Protection Commission verification page to confirm GPM Associates' regulatory registration."}</p>
              <a className="text-link" href={officialVerificationUrl} target="_blank" rel="noopener noreferrer">OPEN OFFICIAL VERIFICATION<ArrowIcon /></a>
            </div>
            <a className="about-verification-qr" href={officialVerificationUrl} target="_blank" rel="noopener noreferrer" aria-label="Scan to verify GPM Associates on the official NDPC portal">
              <Image src="/images/ndpc-verification-qr-approved.png" alt="NDPC verification QR code for GPM Associates" width={616} height={616} sizes="180px" />
              <span>SCAN TO VERIFY</span>
            </a>
          </div>
        </section>

        <section className="about-perspective about-section" aria-labelledby="about-perspective-title">
          <div className="shell about-perspective-grid" data-reveal>
            <div>
              <p className="eyebrow">OUR PERSPECTIVE</p>
              <h2 id="about-perspective-title">Compliance is strongest when it becomes part of how an organisation operates.</h2>
            </div>
            <div className="about-perspective-copy">
              <p>We work at the intersection of regulation, governance, risk, technology and organisational behaviour. This enables us to move beyond isolated documentation and help clients embed accountability into decisions, systems and day-to-day practices.</p>
              <p>Our approach is rigorous but practical: understand the environment, clarify the obligations, prioritise material risk, implement fit-for-purpose controls and build the evidence needed for continuing assurance.</p>
            </div>
          </div>
        </section>

        <section className="about-purpose dark-plane" aria-label="GPM Associates vision and mission">
          <div className="shell about-purpose-grid">
            <article data-reveal>
              <p className="eyebrow">OUR VISION</p>
              <h2 id="about-vision-title">{"To be Africa's most trusted partner for data protection, privacy governance and the responsible use of technology - setting a standard for excellence across the continent."}</h2>
            </article>
            <article className="reveal-delay-1" data-reveal>
              <p className="eyebrow">OUR MISSION</p>
              <h2 id="about-mission-title">To empower organisations to build sustainable, operationally integrated governance frameworks that protect individuals, enable responsible innovation and strengthen trust.</h2>
            </article>
          </div>
        </section>

        <section className="about-multidisciplinary about-section" aria-labelledby="about-multidisciplinary-title">
          <div className="shell about-multidisciplinary-grid">
            <figure data-reveal>
              <Image src="/images/gpm-about-team-approved-v1.webp" alt="Senior African professionals in a governance and risk discussion" width={1600} height={1100} sizes="(max-width: 800px) 100vw, 50vw" />
              <figcaption>Illustrative subjects only — not GPM staff, clients or participants in a real engagement.</figcaption>
            </figure>
            <div className="reveal-delay-1" data-reveal>
              <p className="eyebrow">MULTIDISCIPLINARY BY DESIGN</p>
              <h2 id="about-multidisciplinary-title">One advisory team connecting regulation, governance, technology and implementation.</h2>
              <p>Professionals are assigned according to engagement scope, sector, lifecycle stage and risk profile. Complex matters receive senior oversight and specialist review, with additional capability mobilised where scale, location or technical depth requires.</p>
            </div>
          </div>
        </section>

        <section className="about-values about-section" aria-labelledby="about-values-title">
          <div className="shell">
            <div className="about-section-heading" data-reveal>
              <p className="eyebrow">OUR VALUES</p>
              <h2 id="about-values-title">Trust is built through disciplined action.</h2>
            </div>
            <ul className="about-values-grid">
              {values.map(([number, title, description], index) => (
                <li key={number} className={index % 2 ? "reveal-delay-1" : ""} data-reveal>
                  <span>{number}</span><h3>{title}</h3><p>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-team about-section" aria-labelledby="about-team-title">
          <div className="shell">
            <div className="about-team-heading" data-reveal>
              <div><p className="eyebrow">OUR TEAM</p><h2 id="about-team-title">Multidisciplinary leadership for complex data environments.</h2></div>
              <p>Our team combines executive governance, regulatory law, privacy operations, cybersecurity, infrastructure and programme-delivery capability. Engagement teams are selected for sector, risk profile and technical complexity, with senior oversight maintained throughout.</p>
            </div>
            <ul className="about-team-grid">
              {team.map(([number, label, title, description], index) => (
                <li key={number} className={index % 2 ? "reveal-delay-1" : ""} data-reveal>
                  <div><span>{number}</span><p>{label}</p></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about-cta contact-cta" aria-labelledby="about-cta-title">
          <div className="shell cta-grid" data-reveal>
            <div><p className="eyebrow">BEGIN A CONVERSATION</p><h2 id="about-cta-title">Build a more accountable data environment.</h2></div>
            <div><p>Discuss your organisation’s priorities with our advisory team.</p><a className="contact-action" href="/contact">Start a conversation<ArrowIcon /></a></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
