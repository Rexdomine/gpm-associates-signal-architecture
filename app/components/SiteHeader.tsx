"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MobileMenu } from "./MobileMenu";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

const navItems = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Industries & Experience", "/industries"],
  ["Innovation", "/tools"],
  ["Insights", "/insights"],
  ["Governance Library", "/governance-library"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const progressBarRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const syncProgress = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollRange > 0 ? Math.min(Math.max(window.scrollY / scrollRange, 0), 1) : 0;
      progressBarRef.current?.style.setProperty("--scroll-progress", nextProgress.toString());
      frame = 0;
    };

    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncProgress);
    };

    syncProgress();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressBarRef} className="scroll-progress-bar" />
      </div>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="GPM Associates home">
          <Image src="/images/gpm-logo-approved.png" alt="GPM Associates" width={900} height={547} priority sizes="150px" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/contact">
          Speak with an advisor
          <ArrowIcon />
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
