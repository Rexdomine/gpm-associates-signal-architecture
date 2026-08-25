import Image from "next/image";

import { ConsentMap, CookieConsent, CookieSettingsButton } from "./CookieConsent";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="shell footer-lead">
          <a className="ndpc-mark" href="https://services.ndpc.gov.ng/portal/?page=verify-c&d=4384CC9A-B06F-4FD3-B19B-8C6B3CF86&id=20892&sn=9c73c00bb8c85b96db03b097e4d043ff&t=eosic_business_registration&tp=nwp_eosic" target="_blank" rel="noopener noreferrer" aria-label="Verify GPM Associates on the official NDPC portal">
            <Image src="/images/ndpc-verification-qr-approved.png" alt="NDPC verification QR code for GPM Associates" width={616} height={616} sizes="92px" />
          </a>
          <div>
            <p className="footer-statement">Where Data Protection Meets Innovation.</p>
            <p>{"Suites 1008 & 1009, KINGFEM GA247"}<br />264 Ahmadu Bello Way, Mabushi, Abuja FCT</p>
          </div>
        </div>

        <div className="shell footer-grid">
          <div>
            <h4>EXPLORE</h4>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/industries">Industries &amp; Experience</a>
          </div>
          <div>
            <h4>COMPANY</h4>
            <a href="/tools">Innovation</a>
            <a href="/insights">Insights</a>
            <a href="/governance-library">Governance Library</a>
          </div>
          <div className="footer-connect">
            <h4>CONNECT</h4>
            <a href="mailto:dataprotection@gpm-associates.ng">dataprotection@gpm-associates.ng</a>
            <a href="tel:+2348038992782">+234 803 899 2782</a>
            <a href="/contact">Start a conversation</a>
            <a href="https://services.ndpc.gov.ng/breach/" target="_blank" rel="noopener noreferrer">Report a Breach to the NDPC<ArrowIcon /></a>
            <div className="social-links" aria-label="GPM Associates social media">
              <a href="https://www.linkedin.com/company/gpm-associates-data-protection-consultants/" target="_blank" rel="noopener noreferrer" aria-label="GPM Associates on LinkedIn">in</a>
              <a href="https://www.facebook.com/GPM-Associates-Data-Protection-Consultants/" target="_blank" rel="noopener noreferrer" aria-label="GPM Associates on Facebook">f</a>
              <a href="https://x.com/GPM_DataProtect" target="_blank" rel="noopener noreferrer" aria-label="GPM Associates on X">X</a>
              <a href="https://www.instagram.com/gpm_dataprotect/" target="_blank" rel="noopener noreferrer" aria-label="GPM Associates on Instagram">ig</a>
            </div>
          </div>
          <ConsentMap />
        </div>

        <div className="shell footer-bottom">
          <p>© 2026 GPM ASSOCIATES</p>
          <div>
            <a href="https://www.gpm-associates.ng/?p=Privacy-Policy" target="_blank" rel="noopener noreferrer">PRIVACY POLICY</a>
            <span aria-hidden="true">·</span>
            <a href="https://www.gpm-associates.ng/?p=Cookies-Policy" target="_blank" rel="noopener noreferrer">COOKIE POLICY</a>
            <CookieSettingsButton />
          </div>
        </div>
      </footer>
      <CookieConsent />
    </>
  );
}
