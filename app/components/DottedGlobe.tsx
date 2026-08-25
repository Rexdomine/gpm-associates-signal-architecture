export function DottedGlobe() {
  return (
    <div className="about-globe-layer" aria-hidden="true">
      <svg className="about-globe" aria-hidden="true" focusable="false" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice">
        <defs>
          <clipPath id="about-globe-hemisphere">
            <path d="M70 505C135 185 375 32 720 32s585 153 650 473Z" />
          </clipPath>
          <pattern id="about-globe-dot-field" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.15" fill="currentColor" />
          </pattern>
          <radialGradient id="about-globe-fade" cx="50%" cy="18%" r="76%">
            <stop offset="0" stopColor="white" />
            <stop offset=".66" stopColor="white" stopOpacity=".82" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="about-globe-mask">
            <rect width="1440" height="560" fill="url(#about-globe-fade)" />
          </mask>
        </defs>

        <rect className="about-globe-surface" clipPath="url(#about-globe-hemisphere)" x="70" y="32" width="1300" height="473" fill="url(#about-globe-dot-field)" mask="url(#about-globe-mask)" />
        <path className="about-globe-rim" d="M70 505C135 185 375 32 720 32s585 153 650 473" />
        <path className="about-globe-equator" clipPath="url(#about-globe-hemisphere)" d="M92 488C270 402 488 360 720 360s450 42 628 128" />
        <g clipPath="url(#about-globe-hemisphere)" mask="url(#about-globe-mask)">
          <path className="about-globe-curve" d="M140 420C300 330 505 284 720 284s420 46 580 136" />
          <path className="about-globe-curve" d="M218 302C365 244 535 214 720 214s355 30 502 88" />
          <path className="about-globe-curve" d="M338 190C455 154 584 136 720 136s265 18 382 54" />
          <path className="about-globe-curve" d="M548 82C602 71 660 66 720 66s118 5 172 16" />
          <path className="about-globe-curve" d="M720 34C545 110 448 278 430 505" />
          <path className="about-globe-curve" d="M720 34C622 132 570 294 568 505" />
          <path className="about-globe-curve" d="M720 34C690 158 681 320 682 505" />
          <path className="about-globe-curve about-globe-meridian" d="M720 34V505" />
          <path className="about-globe-curve" d="M720 34C750 158 759 320 758 505" />
          <path className="about-globe-curve" d="M720 34C818 132 870 294 872 505" />
          <path className="about-globe-curve" d="M720 34C895 110 992 278 1010 505" />
        </g>

        <g transform="translate(355 220)"><g className="about-globe-pulse about-globe-pulse--one"><circle className="about-globe-pulse-halo" r="15" /><circle className="about-globe-pulse-core" r="3.5" /></g></g>
        <g transform="translate(620 130)"><g className="about-globe-pulse about-globe-pulse--two"><circle className="about-globe-pulse-halo" r="13" /><circle className="about-globe-pulse-core" r="3" /></g></g>
        <g transform="translate(745 78)"><g className="about-globe-pulse about-globe-pulse--three"><circle className="about-globe-pulse-halo" r="16" /><circle className="about-globe-pulse-core" r="3.5" /></g></g>
        <g transform="translate(980 140)"><g className="about-globe-pulse about-globe-pulse--four"><circle className="about-globe-pulse-halo" r="14" /><circle className="about-globe-pulse-core" r="3" /></g></g>
        <g className="about-globe-pulse--mobile-hidden" transform="translate(1160 252)"><g className="about-globe-pulse about-globe-pulse--five"><circle className="about-globe-pulse-halo" r="16" /><circle className="about-globe-pulse-core" r="3.5" /></g></g>
        <g className="about-globe-pulse--mobile-hidden" transform="translate(820 310)"><g className="about-globe-pulse about-globe-pulse--six"><circle className="about-globe-pulse-halo" r="13" /><circle className="about-globe-pulse-core" r="3" /></g></g>
        <g className="about-globe-pulse--mobile-hidden" transform="translate(1260 390)"><g className="about-globe-pulse about-globe-pulse--seven"><circle className="about-globe-pulse-halo" r="14" /><circle className="about-globe-pulse-core" r="3" /></g></g>
      </svg>
    </div>
  );
}
