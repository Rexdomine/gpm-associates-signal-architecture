"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export function HeroMedia() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <figure className={`hero-media ${reducedMotion ? "hero-motion-paused" : "is-playing"}`}>
      <div className="hero-visual">
        <div className="hero-visual-canvas">
          <Image
            src="/images/gpm-homepage-single-privacy-professional-v3.webp"
            alt="An African privacy professional reviewing a data lifecycle governance workflow"
            width={1672}
            height={941}
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <svg
            className="hero-screen-overlay"
            viewBox="0 0 1672 941"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <clipPath id="hero-screen-clip">
                <path d="M20 138 730 188 730 520 20 540Z" />
              </clipPath>
            </defs>
            <g clipPath="url(#hero-screen-clip)">
              <path className="hero-screen-trace" d="M239 329h38m-13-13 13 13-13 13M477 340h38m-13-13 13 13-13 13" />
              <path className="hero-screen-trace hero-screen-trace-delay" d="M66 475h132M329 471h111M574 462h96" />
              <g className="hero-screen-status">
                <rect x="66" y="470" width="72" height="7" rx="3.5" />
                <rect x="329" y="467" width="68" height="7" rx="3.5" />
                <rect x="574" y="458" width="58" height="7" rx="3.5" />
              </g>
              <g className="hero-screen-pulse">
                <circle cx="120" cy="272" r="10" />
                <circle cx="347" cy="388" r="9" />
                <circle cx="562" cy="322" r="9" />
                <circle cx="677" cy="322" r="9" />
              </g>
              <path className="hero-screen-scan" d="M34 205 711 252" />
            </g>
          </svg>
        </div>
      </div>
      <div className="hero-media-shade" aria-hidden="true" />
      <figcaption className="hero-media-caption">
        <span>WHERE DATA PROTECTION MEETS INNOVATION.</span>
        <span className="hero-media-sequence">
          <b>GOVERN</b><i />
          <b>ASSURE</b><i />
          <b>PROTECT</b><i />
          <b>BUILD CAPABILITY</b>
        </span>
      </figcaption>
    </figure>
  );
}

const features = [
  {
    nav: "Readiness assessment",
    label: "LIVE NOW",
    title: "READINESS ASSESSMENT",
    heading: "Turn uncertainty into a focused starting point.",
    body: "Complete the live GPM Readiness & Classification Tool to receive an indicative view of your organisation’s regulatory position, readiness priorities and recommended next steps.",
    action: "Start the assessment",
    href: "/tools",
    metric: "5–8 min",
    metricLabel: "GUIDED ASSESSMENT",
  },
  {
    nav: "Insights explorer",
    label: "Live now",
    title: "Insights explorer",
    heading: "Find intelligence relevant to the decision in front of you.",
    body: "Explore practical perspectives across regulation, governance, technology and learning using a responsive topic filter designed for faster discovery.",
    action: "Explore insights",
    href: "/insights",
    metric: "4",
    metricLabel: "intelligence themes",
  },
  {
    nav: "Governance Library",
    label: "Live now",
    title: "Governance Library",
    heading: "Discover implementation-ready governance resources.",
    body: "Review selected policy resources and toolkits available for purchase, then request the right package for your organisation through a guided enquiry.",
    action: "Browse the library",
    href: "/governance-library",
    metric: "Curated",
    metricLabel: "policy resources",
  },
] as const;

export function LiveFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % features.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + features.length) % features.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = features.length - 1;
    else return;
    event.preventDefault();
    select(next);
  };

  return (
    <div className="feature-experience">
      <div className="feature-tabs" role="tablist" aria-label="Live GPM digital experiences">
        {features.map((feature, index) => (
          <button
            key={feature.nav}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`feature-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`feature-panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {feature.nav}
          </button>
        ))}
      </div>

      {features.map((feature, index) => (
        <article
          key={feature.title}
          id={`feature-panel-${index}`}
          className="feature-panel"
          role="tabpanel"
          aria-labelledby={`feature-tab-${index}`}
          hidden={activeIndex !== index}
          tabIndex={0}
        >
          <div className="feature-panel-copy">
            <p className="eyebrow">{feature.label}</p>
            <p className="feature-kicker">{feature.title}</p>
            <h3>{feature.heading}</h3>
            <p>{feature.body}</p>
            <a className="text-link" href={feature.href}>
              {feature.action}<ArrowIcon />
            </a>
          </div>
          <div className="feature-metric" aria-label={`${feature.metric} ${feature.metricLabel}`}>
            <strong>{feature.metric}</strong>
            <span>{feature.metricLabel}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
