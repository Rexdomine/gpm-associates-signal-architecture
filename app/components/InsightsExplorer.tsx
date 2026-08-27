"use client";

import { useMemo, useState } from "react";

type InsightCategory = "all" | "regulatory" | "governance" | "technology" | "learning";

type InsightResource = {
  topic: string;
  type: string;
  title: string;
  description: string;
  category: Exclude<InsightCategory, "all">;
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

export const insightFilters = [
  { id: "all", label: "All" },
  { id: "regulatory", label: "Regulatory" },
  { id: "governance", label: "Governance" },
  { id: "technology", label: "Technology" },
  { id: "learning", label: "Learning" },
] as const satisfies ReadonlyArray<{ id: InsightCategory; label: string }>;

export const insightResources = [
  {
    topic: "Regulatory Intelligence",
    type: "Perspective",
    title: "From annual compliance to continuous assurance",
    description: "How evidence, remediation ownership and management reporting can strengthen the value of the compliance cycle.",
    category: "regulatory",
  },
  {
    topic: "Data Governance",
    type: "Practical guide",
    title: "The operating case for a reliable record of processing activities",
    description: "Why a living view of processing is essential to rights, risk, retention and accountability.",
    category: "governance",
  },
  {
    topic: "Responsible Innovation",
    type: "Executive brief",
    title: "Accountability questions before deploying AI-enabled systems",
    description: "A concise governance lens for leaders assessing automated and emerging technology.",
    category: "technology",
  },
  {
    topic: "Third-Party Risk",
    type: "Advisory note",
    title: "What effective processor oversight looks like in practice",
    description: "Moving beyond contract clauses to due diligence, monitoring, evidence and end-of-service controls.",
    category: "governance",
  },
  {
    topic: "Workforce Capability",
    type: "Learning strategy",
    title: "Turning annual awareness into role-based competence",
    description: "How targeted learning can reduce operational risk and strengthen accountability across functions.",
    category: "learning",
  },
] as const satisfies ReadonlyArray<InsightResource>;

export function getInsightsForCategory(category: InsightCategory) {
  if (category === "all") {
    return insightResources;
  }

  return insightResources.filter((resource) => resource.category === category);
}

export function InsightsExplorer() {
  const [activeFilter, setActiveFilter] = useState<InsightCategory>("all");

  const filteredResources = useMemo(() => getInsightsForCategory(activeFilter), [activeFilter]);

  return (
    <section className="section shell insights-explorer" aria-labelledby="featured-intelligence-title">
      <div className="insight-toolbar">
        <div className="section-intro compact" data-reveal>
          <p className="eyebrow">Featured intelligence</p>
          <div>
            <h2 id="featured-intelligence-title">Ideas designed to support action.</h2>
          </div>
        </div>

        <div className="insight-toolbar-controls" data-reveal>
          <div className="filter-row" aria-label="Filter insights by topic">
            {insightFilters.map((filter) => {
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
            Showing {filteredResources.length} insights
          </p>
        </div>
      </div>

      <div className="resource-grid">
        {filteredResources.map((resource, index) => (
          <article key={resource.title} className={index === 0 ? "resource-card resource-featured" : "resource-card"}>
            <div>
              <span>{resource.topic}</span>
              <b>{resource.type}</b>
            </div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href="/contact" className="arrow-link">
              Request this resource
              <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
