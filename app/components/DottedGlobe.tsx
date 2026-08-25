export function DottedGlobe() {
  return (
    <div className="about-globe-layer" aria-hidden="true">
      <svg className="about-globe" aria-hidden="true" focusable="false" viewBox="0 0 1440 560" preserveAspectRatio="none">
        <defs>
          <clipPath id="about-globe-hemisphere">
            <path d="M0 540C240 300 480 300 720 300C960 300 1200 300 1440 540L1440 600L0 600Z" />
          </clipPath>
          <pattern id="about-globe-dot-field" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.15" fill="currentColor" />
          </pattern>
          <radialGradient id="about-globe-fade" cx="50%" cy="72%" r="68%">
            <stop offset="0" stopColor="white" />
            <stop offset=".66" stopColor="white" stopOpacity=".82" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="about-globe-mask">
            <rect width="1440" height="560" fill="url(#about-globe-fade)" />
          </mask>
        </defs>

        <rect className="about-globe-surface" clipPath="url(#about-globe-hemisphere)" x="0" y="300" width="1440" height="260" fill="url(#about-globe-dot-field)" mask="url(#about-globe-mask)" />
        <path className="about-globe-rim" d="M0 540C240 300 480 300 720 300C960 300 1200 300 1440 540L1440 540" />
        <path className="about-globe-equator" clipPath="url(#about-globe-hemisphere)" d="M70 510C310 450 510 430 720 430C930 430 1130 450 1370 510" />
        <g clipPath="url(#about-globe-hemisphere)" mask="url(#about-globe-mask)">
          <path className="about-globe-curve" d="M118 470C310 390 510 360 720 360C930 360 1130 390 1322 470" />
          <path className="about-globe-curve" d="M220 410C390 350 555 330 720 330C885 330 1050 350 1220 410" />
          <path className="about-globe-curve" d="M350 350C470 315 595 305 720 305C845 305 970 315 1090 350" />
          <path className="about-globe-curve" d="M300 560C360 430 470 340 600 305" />
          <path className="about-globe-curve" d="M480 560C510 430 575 345 660 305" />
          <path className="about-globe-curve" d="M620 560C630 430 665 345 700 302" />
          <path className="about-globe-curve about-globe-meridian" d="M720 300C720 380 720 470 720 560" />
          <path className="about-globe-curve" d="M820 560C810 430 775 345 740 302" />
          <path className="about-globe-curve" d="M960 560C930 430 865 345 780 305" />
          <path className="about-globe-curve" d="M1140 560C1080 430 970 340 840 305" />
        </g>

        <g transform="translate(355 445)"><g className="about-globe-pulse about-globe-pulse--one"><circle className="about-globe-pulse-halo" r="15" /><circle className="about-globe-pulse-core" r="3.5" /></g></g>
        <g transform="translate(590 365)"><g className="about-globe-pulse about-globe-pulse--two"><circle className="about-globe-pulse-halo" r="13" /><circle className="about-globe-pulse-core" r="3" /></g></g>
        <g transform="translate(745 330)"><g className="about-globe-pulse about-globe-pulse--three"><circle className="about-globe-pulse-halo" r="16" /><circle className="about-globe-pulse-core" r="3.5" /></g></g>
        <g transform="translate(970 390)"><g className="about-globe-pulse about-globe-pulse--four"><circle className="about-globe-pulse-halo" r="14" /><circle className="about-globe-pulse-core" r="3" /></g></g>
        <g className="about-globe-pulse--mobile-hidden" transform="translate(1160 455)"><g className="about-globe-pulse about-globe-pulse--five"><circle className="about-globe-pulse-halo" r="16" /><circle className="about-globe-pulse-core" r="3.5" /></g></g>
        <g className="about-globe-pulse--mobile-hidden" transform="translate(820 485)"><g className="about-globe-pulse about-globe-pulse--six"><circle className="about-globe-pulse-halo" r="13" /><circle className="about-globe-pulse-core" r="3" /></g></g>
        <g className="about-globe-pulse--mobile-hidden" transform="translate(1260 520)"><g className="about-globe-pulse about-globe-pulse--seven"><circle className="about-globe-pulse-halo" r="14" /><circle className="about-globe-pulse-core" r="3" /></g></g>
      </svg>
    </div>
  );
}
