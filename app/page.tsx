import Image from "next/image";
import { MobileMenu } from "./components/MobileMenu";

const expertise = [
  ["01", "Data Protection", "Privacy governance, compliance programmes, audits, impact assessments, and practical implementation support."],
  ["02", "Regulatory Compliance", "Interpretation of applicable obligations, compliance reviews, remediation priorities, and regulator-ready evidence."],
  ["03", "Governance", "Policies, accountability structures, risk oversight, and controls that make compliance sustainable."],
  ["04", "Capacity Building", "Executive briefings, workforce awareness, and tailored training that turns requirements into institutional capability."],
] as const;

const stages = [
  ["01", "Assess", "We establish the regulatory, operational, and governance context."],
  ["02", "Advise", "We translate obligations into practical priorities and decisions."],
  ["03", "Implement", "We embed policies, controls, evidence, and accountable ownership."],
  ["04", "Strengthen", "We build capability for continuous improvement and regulatory confidence."],
] as const;

const insights = [
  "Understanding data protection obligations",
  "Building accountable governance structures",
  "Turning compliance requirements into operational practice",
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#top" aria-label="GPM Associates home">GPM ASSOCIATES</a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#expertise">Expertise</a><a href="#approach">Approach</a>
            <a href="#about">About</a><a href="#insights">Insights</a>
          </nav>
          <a className="header-cta" href="#contact">Start a conversation <Arrow /></a>
          <MobileMenu />
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">INDEPENDENT REGULATORY ADVISORY</p>
              <h1 id="hero-title">From regulatory complexity to confident action.</h1>
              <p className="hero-intro">GPM Associates helps organisations interpret obligations, strengthen governance, and implement practical data protection and compliance programmes.</p>
              <div className="hero-actions">
                <a className="primary-action" href="#expertise">Explore our expertise <Arrow /></a>
                <a className="text-action" href="#contact">Start a conversation <Arrow /></a>
              </div>
            </div>
            <div className="hero-art">
              <Image src="/images/gpm-data-protection-hero.webp" alt="Professional placing a navy archive box on a shelf" width={1672} height={941} priority sizes="(max-width: 767px) 100vw, 52vw" />
              <div className="signal-node node-one" /><div className="signal-node node-two" />
            </div>
          </div>
        </section>

        <aside className="proof-rail" aria-label="Areas of expertise and licence">
          <div className="shell proof-inner">
            <p>Data Protection <i>•</i> Regulatory Compliance <i>•</i> Governance <i>•</i> Capacity Building</p>
            <p className="licence">NDPC-licensed Data Protection Compliance Organisation</p>
          </div>
        </aside>

        <section className="expertise section-pad" id="expertise" aria-labelledby="expertise-title">
          <div className="shell">
            <div className="section-heading split-heading">
              <p className="eyebrow">OUR EXPERTISE</p>
              <h2 id="expertise-title">One connected regulatory intelligence system.</h2>
            </div>
            <div className="editorial-list">
              {expertise.map(([number, title, body]) => (
                <article className="expertise-row" key={number}>
                  <span className="row-number">{number}</span><h3>{title}</h3><p>{body}</p><span className="row-mark" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="method section-pad dark-plane" id="approach" aria-labelledby="method-title">
          <div className="shell method-grid">
            <div className="method-art">
              <Image src="/images/gpm-regulatory-method.webp" alt="Professional arranging four blank tiles beside red and navy markers" width={1254} height={1254} sizes="(max-width: 767px) 100vw, 45vw" />
            </div>
            <div className="method-content">
              <p className="eyebrow">OUR APPROACH</p>
              <h2 id="method-title">From obligation to operational confidence.</h2>
              <ol className="stage-list">
                {stages.map(([number, title, body]) => (
                  <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <div className="shell about-grid">
            <div className="about-copy">
              <p className="eyebrow">WHO WE ARE</p>
              <h2 id="about-title">Independent advice. Practical regulatory confidence.</h2>
              <p className="lead">GPM Associates is an independent consulting firm specialising in data protection, regulatory compliance, governance, and capacity building.</p>
              <p className="evidence">GPM Associates contributed to the drafting of the 2017 Guidelines for Data Protection and participated in the development of the draft Nigeria Data Protection Regulation (NDPR).</p>
              <a className="underlined-action" href="#contact">More about GPM Associates <Arrow /></a>
            </div>
            <div className="about-art">
              <Image src="/images/gpm-independent-advice.webp" alt="Professional holding a navy folio in a stone corridor" width={1024} height={1536} sizes="(max-width: 767px) 100vw, 42vw" />
              <span>INDEPENDENT / PRACTICAL / ACCOUNTABLE</span>
            </div>
          </div>
        </section>

        <section className="capacity section-pad" aria-labelledby="capacity-title">
          <div className="shell capacity-grid">
            <div className="capacity-art">
              <Image src="/images/gpm-capacity-building-v2.webp" alt="Two professionals sorting coloured discs into a navy case" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
            <div className="capacity-copy">
              <p className="eyebrow">CAPACITY BUILDING</p>
              <h2 id="capacity-title">Building capability that lasts beyond compliance.</h2>
              <p>Our capacity-building programmes help boards, leadership teams, practitioners, and employees understand their responsibilities and apply them confidently.</p>
              <a className="underlined-action" href="#expertise">Explore capacity building <Arrow /></a>
            </div>
          </div>
        </section>

        <section className="insights section-pad" id="insights" aria-labelledby="insights-title">
          <div className="shell">
            <div className="section-heading split-heading">
              <p className="eyebrow">INSIGHTS</p>
              <h2 id="insights-title">Regulatory perspectives for informed decisions.</h2>
            </div>
            <div className="insight-list">
              {insights.map((title, index) => (
                <article className="insight-row" key={title}>
                  <span className="row-number">0{index + 1}</span><div><p>Perspective</p><h3>{title}</h3></div>
                  <span className="forthcoming">Read perspective — forthcoming</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-cta" id="contact" aria-labelledby="contact-title">
          <div className="shell cta-grid">
            <h2 id="contact-title">Ready to move from obligation to confident action?</h2>
            <div><p>Start a focused conversation about your organisation’s regulatory, governance, or data protection priorities.</p>
              <a className="contact-action" href="mailto:info@gpm-associates.ng">Start a conversation <Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-top">
          <div><a className="footer-wordmark" href="#top">GPM ASSOCIATES</a><p>Independent regulatory advisory.</p></div>
          <address><span>Visit</span>4th Floor, Adamawa Plaza, Plot 1099 First Avenue,<br /> Central Business District, Abuja, Nigeria.</address>
          <div className="footer-contact"><span>Contact</span><a href="mailto:info@gpm-associates.ng">info@gpm-associates.ng</a><a href="mailto:enquiries@gpm-associates.ng">enquiries@gpm-associates.ng</a><a href="tel:+2348056151038">+234 805 615 1038</a><a href="tel:+2348033126637">+234 803 312 6637</a></div>
        </div>
        <div className="shell footer-bottom"><p>© 2026 GPM Associates. All rights reserved.</p><div><span>Privacy Policy — forthcoming</span><span>Cookie Policy — forthcoming</span></div></div>
      </footer>
    </>
  );
}
