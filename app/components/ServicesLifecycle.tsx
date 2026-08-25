"use client";

import { useEffect, useState } from "react";

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
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1200 300">
        <path className="services-lifecycle-track" d="M90 150H1110" />
        <path className="services-lifecycle-progress" d="M90 150H1110" />
        {[90, 345, 600, 855, 1110].map((x, index) => (
          <g className="services-lifecycle-node" key={x}>
            <circle cx={x} cy="150" r="49" />
            <text x={x} y="157" textAnchor="middle">{String(index + 1).padStart(2, "0")}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
