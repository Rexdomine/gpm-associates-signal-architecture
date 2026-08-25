"use client";

import { type CSSProperties, useEffect, useState } from "react";

const lifecycleSteps = ["01", "02", "03", "04", "05"];

export function ServicesLifecycle() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimated(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div
      className={`services-lifecycle-static${animated ? " services-lifecycle--animated" : ""}`}
      role="region"
      aria-label="GPM advisory lifecycle diagram"
      tabIndex={0}
    >
      <div className="services-lifecycle-track" aria-hidden="true" />
      <div className="services-lifecycle-progress" aria-hidden="true" />
      <ol className="services-lifecycle-nodes" aria-hidden="true">
        {lifecycleSteps.map((step, index) => (
          <li className="services-lifecycle-node" key={step} style={{ animationDelay: `${index}s` } as CSSProperties}>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
