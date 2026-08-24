"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "gpm-cookie-preferences";
const PREFERENCES_EVENT = "gpm-preferences-change";
const OPEN_EVENT = "gpm-open-cookie-settings";

type Preferences = {
  externalMedia: boolean;
};

const readPreferences = (): Preferences | null => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<Preferences>;
    return { externalMedia: parsed.externalMedia === true };
  } catch {
    return null;
  }
};

const persistPreferences = (preferences: Preferences) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Keep the in-session preference usable when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent<Preferences>(PREFERENCES_EVENT, { detail: preferences }));
};

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [draftExternalMedia, setDraftExternalMedia] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      const stored = readPreferences();
      setMounted(true);
      setPreferences(stored);
      setDraftExternalMedia(stored?.externalMedia ?? false);
    }, 0);

    const openSettings = () => {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      const current = readPreferences();
      setDraftExternalMedia(current?.externalMedia ?? false);
      setDialogOpen(true);
    };
    const syncPreferences = (event: Event) => {
      const detail = (event as CustomEvent<Preferences>).detail;
      const current = typeof detail?.externalMedia === "boolean" ? detail : readPreferences();
      setPreferences(current);
      setDraftExternalMedia(current?.externalMedia ?? false);
    };
    window.addEventListener(OPEN_EVENT, openSettings);
    window.addEventListener(PREFERENCES_EVENT, syncPreferences);
    return () => {
      window.clearTimeout(hydration);
      window.removeEventListener(OPEN_EVENT, openSettings);
      window.removeEventListener(PREFERENCES_EVENT, syncPreferences);
    };
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("input, button:not([disabled]), a[href]");
    focusable?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDialogOpen(false);
        returnFocusRef.current?.focus();
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dialogOpen]);

  const save = (next: Preferences) => {
    persistPreferences(next);
    setPreferences(next);
    setDraftExternalMedia(next.externalMedia);
    setDialogOpen(false);
    returnFocusRef.current?.focus();
  };

  const openDialog = () => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setDraftExternalMedia(preferences?.externalMedia ?? false);
    setDialogOpen(true);
  };

  if (!mounted) return null;

  return (
    <>
      {preferences === null && !dialogOpen && (
        <aside className="cookie-banner" aria-label="Cookie preferences">
          <div>
            <p className="cookie-title">Your privacy choices</p>
            <p>
              We use essential storage for this website. Optional external media stays blocked unless you allow it.
              Read our <a href="https://www.gpm-associates.ng/?p=Cookies-Policy" target="_blank" rel="noopener noreferrer">Cookie Policy</a>.
            </p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="button-quiet" onClick={openDialog}>Manage preferences</button>
            <button type="button" className="button-quiet" onClick={() => save({ externalMedia: false })}>Reject optional</button>
            <button type="button" className="button-solid" onClick={() => save({ externalMedia: true })}>Accept all</button>
          </div>
        </aside>
      )}

      {dialogOpen && (
        <div className="consent-backdrop" role="presentation">
          <div ref={dialogRef} className="consent-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
            <p className="eyebrow">PRIVACY CONTROLS</p>
            <h2 id="cookie-settings-title">Cookie Settings</h2>
            <p>Essential website functions are always available. Choose whether to allow third-party map content.</p>
            <label className="consent-option">
              <span>
                <strong>External media</strong>
                <small>Allows you to open location content from Google Maps. No map request is made before consent.</small>
              </span>
              <input
                type="checkbox"
                checked={draftExternalMedia}
                onChange={(event) => setDraftExternalMedia(event.target.checked)}
              />
            </label>
            <div className="dialog-actions">
              <button type="button" className="button-quiet" onClick={() => save({ externalMedia: false })}>Reject optional</button>
              <button type="button" className="button-solid" onClick={() => save({ externalMedia: draftExternalMedia })}>Save preferences</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentMap() {
  const [externalMedia, setExternalMedia] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      setMounted(true);
      setExternalMedia(readPreferences()?.externalMedia ?? false);
    }, 0);
    const sync = (event: Event) => {
      const detail = (event as CustomEvent<Preferences>).detail;
      setExternalMedia(detail?.externalMedia === true);
    };
    window.addEventListener(PREFERENCES_EVENT, sync);
    return () => {
      window.clearTimeout(hydration);
      window.removeEventListener(PREFERENCES_EVENT, sync);
    };
  }, []);

  const allowMap = () => {
    const next = { externalMedia: true };
    persistPreferences(next);
    setExternalMedia(true);
  };

  if (!mounted || !externalMedia) {
    return (
      <div className="map-consent" id="map">
        <div className="map-grid" aria-hidden="true" />
        <p>GPM Associates, Abuja</p>
        <span>Google Maps is blocked until you allow external media.</span>
        <button type="button" onClick={allowMap}>ENABLE MAP</button>
      </div>
    );
  }

  return (
    <div className="map-consent map-enabled" id="map">
      <div className="map-grid" aria-hidden="true" />
      <p>GPM Associates, Abuja</p>
      <span>External map access is enabled for this browser.</span>
      {externalMedia ? (
        <a
          href="https://www.google.com/maps/search/?api=1&query=Suites%201008%20%26%201009%2C%20KINGFEM%20GA247%2C%20264%20Ahmadu%20Bello%20Way%2C%20Mabushi%2C%20Abuja%20FCT"
          target="_blank"
          rel="noopener noreferrer"
        >
          OPEN IN GOOGLE MAPS
        </a>
      ) : null}
    </div>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      className="footer-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Cookie Settings
    </button>
  );
}
