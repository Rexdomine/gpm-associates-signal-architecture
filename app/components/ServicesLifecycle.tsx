"use client";

import { useEffect, useState } from "react";

export function ServicesLifecycle() {
  const [animated, setAnimated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
      setAnimated(!media.matches);
      setPlaying(!media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const toggle = () => {
    if (reducedMotion) return;
    setAnimated(true);
    setPlaying((value) => !value);
  };

  return (
    <div
      className={`services-lifecycle-static${animated ? " services-lifecycle--animated" : ""}${playing ? " services-lifecycle--playing" : ""}`}
      role="region"
      tabIndex={0}
      aria-label="GPM advisory lifecycle diagram"
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
      <button
        type="button"
        aria-pressed={playing}
        aria-label={playing ? "Pause lifecycle animation" : "Play lifecycle animation"}
        onClick={toggle}
        disabled={reducedMotion}
      >
        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path d={playing ? "M4 3h3v10H4zm5 0h3v10H9z" : "M4 2.75v10.5L13 8z"} fill="currentColor" />
        </svg>
        {playing ? "Pause lifecycle animation" : "Play lifecycle animation"}
      </button>
    </div>
  );
}
