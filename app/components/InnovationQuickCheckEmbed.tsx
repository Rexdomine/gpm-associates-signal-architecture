"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "gpm-cookie-preferences";
const PREFERENCES_EVENT = "gpm-preferences-change";
const QUICK_CHECK_URL = "https://gpm-ndpa-quick-check.dataprotectiongpm.chatgpt.site/?source=gpm-website";

type Preferences = {
  externalMedia: boolean;
};

function readPreferences(): Preferences | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<Preferences>;
    return { externalMedia: parsed.externalMedia === true };
  } catch {
    return null;
  }
}

function persistPreferences(preferences: Preferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Keep the session usable even if storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent<Preferences>(PREFERENCES_EVENT, { detail: preferences }));
}

export function InnovationQuickCheckEmbed() {
  const [mounted, setMounted] = useState(false);
  const [externalMedia, setExternalMedia] = useState(false);

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      const current = readPreferences();
      setMounted(true);
      setExternalMedia(current?.externalMedia === true);
    }, 0);

    const syncPreferences = (event: Event) => {
      const detail = (event as CustomEvent<Preferences>).detail;
      const current = typeof detail?.externalMedia === "boolean" ? detail : readPreferences();
      setExternalMedia(current?.externalMedia === true);
    };

    window.addEventListener(PREFERENCES_EVENT, syncPreferences);
    return () => {
      window.clearTimeout(hydration);
      window.removeEventListener(PREFERENCES_EVENT, syncPreferences);
    };
  }, []);

  const enableQuickCheck = () => {
    const next = { externalMedia: true };
    persistPreferences(next);
    setExternalMedia(true);
  };

  if (!mounted || !externalMedia) {
    return (
      <div className="innovation-tool-frame innovation-tool-consent" aria-label="GPM NDPA Quick Check consent gate">
        <div>
          <p className="innovation-tool-kicker">NDPA QUICK CHECK</p>
          <h3>Find your likely processing level.</h3>
          <p>
            The live quick check is treated as external media. Enable it when you are ready to open the guided
            assessment inside this page.
          </p>
        </div>
        <div className="innovation-tool-consent-actions">
          <button type="button" className="primary-action" onClick={enableQuickCheck}>Enable quick check</button>
          <button
            type="button"
            className="button-quiet"
            onClick={() => window.dispatchEvent(new Event("gpm-open-cookie-settings"))}
          >
            Manage preferences
          </button>
        </div>
      </div>
    );
  }

  return (
    <iframe
      title="GPM NDPA Quick Check"
      src={QUICK_CHECK_URL}
      className="innovation-tool-frame"
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="clipboard-read; clipboard-write"
    />
  );
}
