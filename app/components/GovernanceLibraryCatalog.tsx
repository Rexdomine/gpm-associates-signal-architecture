"use client";

import { useMemo, useState } from "react";

type LibraryCategory = "all" | "governance" | "operations" | "third-party" | "ai";

type LibraryResource = {
  topic: string;
  format: string;
  title: string;
  description: string;
  includes: string;
  category: Exclude<LibraryCategory, "all">;
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export const governanceLibraryFilters = [
  { id: "all", label: "All" },
  { id: "governance", label: "Governance" },
  { id: "operations", label: "Operations" },
  { id: "third-party", label: "Third-party" },
  { id: "ai", label: "AI & data" },
] as const satisfies ReadonlyArray<{ id: LibraryCategory; label: string }>;

export const governanceLibraryResources = [
  {
    topic: "Privacy Governance",
    format: "Policy suite",
    title: "Core privacy governance policy pack",
    description: "A board-ready policy baseline covering accountability, oversight roles, reporting lines and governance expectations.",
    includes: "Includes governance policy, role matrix, escalation guide and approval workflow.",
    category: "governance",
  },
  {
    topic: "Data Lifecycle Controls",
    format: "Implementation toolkit",
    title: "Records, retention and lawful-use control toolkit",
    description: "A practical resource set for teams formalising records of processing, retention rules and lawful-use decision points.",
    includes: "Includes ROPA starter, retention schedule model and collection/use review prompts.",
    category: "operations",
  },
  {
    topic: "Incident Preparedness",
    format: "Operational pack",
    title: "Personal data breach response and notification pack",
    description: "A coordinated response resource for triage, internal escalation, evidence capture and notification readiness.",
    includes: "Includes incident checklist, response roles, decision log and notification workflow.",
    category: "operations",
  },
  {
    topic: "Third-Party Oversight",
    format: "Due diligence toolkit",
    title: "Vendor onboarding and processor oversight toolkit",
    description: "A resource set for screening processors, defining expectations and maintaining evidence beyond contract signature.",
    includes: "Includes due diligence questionnaire, review checklist, monitoring prompts and exit controls.",
    category: "third-party",
  },
  {
    topic: "Responsible Innovation",
    format: "Governance pack",
    title: "AI governance starter pack for accountable adoption",
    description: "A structured foundation for organisations adopting AI-enabled systems with clearer oversight, review and escalation paths.",
    includes: "Includes governance charter, use-case intake, review questions and accountability checkpoints.",
    category: "ai",
  },
  {
    topic: "Executive Oversight",
    format: "Leadership brief set",
    title: "Board and leadership privacy oversight briefing set",
    description: "Short-form resources that help leadership teams ask better questions about accountability, risk and programme progress.",
    includes: "Includes briefing deck outline, decision prompts and management reporting themes.",
    category: "governance",
  },
] as const satisfies ReadonlyArray<LibraryResource>;

export function getGovernanceLibraryResources(category: LibraryCategory) {
  if (category === "all") {
    return governanceLibraryResources;
  }

  return governanceLibraryResources.filter((resource) => resource.category === category);
}

export function GovernanceLibraryCatalog() {
  const [activeFilter, setActiveFilter] = useState<LibraryCategory>("all");

  const filteredResources = useMemo(() => getGovernanceLibraryResources(activeFilter), [activeFilter]);

  return (
    <section id="governance-library-catalog" className="section shell governance-library-catalog" aria-labelledby="governance-library-catalog-title">
      <div className="insight-toolbar">
        <div className="section-intro compact" data-reveal>
          <p className="eyebrow">Governance library catalog</p>
          <div>
            <h2 id="governance-library-catalog-title">Resources designed for real operating use.</h2>
          </div>
        </div>

        <div className="insight-toolbar-controls" data-reveal>
          <div className="filter-row" aria-label="Filter governance resources by topic">
            {governanceLibraryFilters.map((filter) => {
              const active = filter.id === activeFilter;
              return (
                <button
                  key={filter.id}
                  type="button"
                  className={active ? "is-active" : undefined}
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <p className="filter-count" aria-live="polite">
            Showing {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
          </p>
        </div>
      </div>

      <div className="resource-grid governance-resource-grid">
        {filteredResources.map((resource, index) => (
          <article key={resource.title} className={index === 0 ? "resource-card resource-featured governance-resource-card" : "resource-card governance-resource-card"}>
            <div>
              <span>{resource.topic}</span>
              <b>{resource.format}</b>
            </div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <p className="governance-resource-includes">{resource.includes}</p>
            <a href="/contact" className="arrow-link">
              Request this package
              <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
