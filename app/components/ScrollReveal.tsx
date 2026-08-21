"use client";

import { useEffect } from "react";

const VISIBLE_ATTRIBUTE = "data-reveal-visible";

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = (element: HTMLElement) => {
      element.setAttribute(VISIBLE_ATTRIBUTE, "");
    };

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(show);
      return () => root.classList.remove("reveal-ready");
    }

    const nearViewport = window.innerHeight + 80;
    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top <= nearViewport && bounds.bottom >= -80) show(element);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    elements.forEach((element) => {
      if (!element.hasAttribute(VISIBLE_ATTRIBUTE)) observer.observe(element);
    });
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
