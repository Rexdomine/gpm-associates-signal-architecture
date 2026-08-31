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
  const fallbackImage = "/images/gpm-homepage-single-privacy-professional-v3.webp";
  const heroVideo = "/videos/gpm-homepage-trusted-data-flow-2026.mp4";

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
        {reducedMotion ? (
          <Image
            src={fallbackImage}
            alt="An African privacy professional reviewing a data lifecycle governance workflow"
            width={1672}
            height={941}
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
        ) : (
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={fallbackImage}
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )}
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
