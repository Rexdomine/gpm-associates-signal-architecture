"use client";

import { useEffect, useId, useState } from "react";

const links = [
  ["Expertise", "#expertise"],
  ["Approach", "#approach"],
  ["About", "#about"],
  ["Insights", "#insights"],
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
      </button>
      {open && (
        <nav className="mobile-panel" id={menuId} aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>
            Start a conversation
          </a>
        </nav>
      )}
    </div>
  );
}
