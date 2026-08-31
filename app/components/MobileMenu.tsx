"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

import { OPEN_GLOBAL_QUICK_CHECK_EVENT } from "./GlobalQuickCheckLauncher";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries & Experience", href: "/industries" },
  { label: "Innovation", href: "/tools" },
  { label: "Insights", href: "/insights" },
  { label: "Governance Library", href: "/governance-library" },
] as const;

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.dataset.mobileNav = open ? "open" : "closed";
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      delete document.body.dataset.mobileNav;
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="mobile-nav">
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu-toggle__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      {open && createPortal(
        <nav ref={panelRef} className="mobile-panel" id={menuId} aria-label="Mobile navigation">
          {links.map(({ label, href }) => (
            <a key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={close}>{label}</a>
          ))}
          <div className="mobile-panel__actions">
            <a className="mobile-contact" href="/contact" onClick={close}>Speak with an advisor</a>
            <button
              className="mobile-quick-check"
              type="button"
              onClick={() => {
                close();
                window.dispatchEvent(new Event(OPEN_GLOBAL_QUICK_CHECK_EVENT));
              }}
            >
              Start quick check
            </button>
          </div>
        </nav>,
        document.body,
      )}
    </div>
  );
}
