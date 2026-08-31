"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { InnovationQuickCheck } from "./InnovationQuickCheck";

function CloseIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 4 14 14M14 4 4 14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

export function GlobalQuickCheckLauncher() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const isToolsRoute = pathname === "/tools";
  const isOpen = !isToolsRoute && openPath === pathname;

  const closeDialog = () => {
    setOpenPath(null);
    returnFocusRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
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

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (isToolsRoute) return null;

  return (
    <>
      <button
        aria-controls="global-quick-check-dialog"
        aria-expanded={isOpen}
        className="quick-check-launcher"
        type="button"
        onClick={() => {
          returnFocusRef.current = document.activeElement as HTMLElement | null;
          setOpenPath(pathname);
        }}
      >
        <span className="quick-check-launcher__dot" aria-hidden="true" />
        <span>Start quick check</span>
      </button>

      {isOpen && (
        <div className="quick-check-backdrop" role="presentation" onClick={closeDialog}>
          <div
            id="global-quick-check-dialog"
            ref={dialogRef}
            className="quick-check-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="global-quick-check-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="quick-check-dialog__header">
              <div>
                <p className="eyebrow">QUICK ACTION</p>
                <h2 id="global-quick-check-title">GPM NDPA Quick Check</h2>
                <p>Open the guided assessment instantly from anywhere on the site.</p>
              </div>
              <button
                type="button"
                className="quick-check-dialog__close"
                aria-label="Close quick check"
                onClick={closeDialog}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="quick-check-dialog__body">
              <InnovationQuickCheck autoStart onRequestClose={closeDialog} variant="modal" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
