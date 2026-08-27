"use client";

import { FormEvent, useState } from "react";

const advisoryTopics = [
  "Regulatory compliance and audit readiness",
  "Privacy governance and DPO support",
  "Data lifecycle and privacy engineering",
  "Third-party and cross-border risk",
  "Incident preparedness or response",
  "AI and emerging technology governance",
  "Training and capability development",
  "Governance Library package guidance",
] as const;

type FormState = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const defaultState: FormState = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  topic: advisoryTopics[0],
  message: "",
};

function toMailtoBody(state: FormState) {
  return [
    `Name: ${state.name}`,
    `Organisation: ${state.organisation}`,
    `Email: ${state.email}`,
    `Phone: ${state.phone || "Not provided"}`,
    `Topic: ${state.topic}`,
    "",
    "Context:",
    state.message,
  ].join("\n");
}

export function ContactEnquiryPanel() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [status, setStatus] = useState("This drafts an email to GPM using your default mail app.");

  const mailtoHref = `mailto:dataprotection@gpm-associates.ng?subject=${encodeURIComponent(`Advisory enquiry — ${form.topic}`)}&body=${encodeURIComponent(toMailtoBody(form))}`;

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Opening your email app with a drafted enquiry to GPM Associates.");
    window.location.href = mailtoHref;
  };

  return (
    <div className="contact-enquiry-panel" id="start-your-enquiry" data-reveal>
      <div>
        <p className="eyebrow">Guided enquiry</p>
        <h3 id="contact-enquiry-title">Share the issue, decision or pressure point.</h3>
        <p>
          Give GPM enough context to understand your organisation, the kind of support you need and what decision needs to move forward.
        </p>
      </div>

      <form className="contact-enquiry-form" aria-labelledby="contact-enquiry-title" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
        </label>
        <label>
          <span>Organisation</span>
          <input
            type="text"
            name="organisation"
            autoComplete="organization"
            value={form.organisation}
            onChange={(event) => updateField("organisation", event.target.value)}
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
        </label>
        <label>
          <span>Phone (optional)</span>
          <input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
        </label>
        <label>
          <span>Advisory topic</span>
          <select name="topic" value={form.topic} onChange={(event) => updateField("topic", event.target.value)}>
            {advisoryTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>What do you need help with?</span>
          <textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Describe the current requirement, risk, timeline or decision that needs attention."
            required
          />
        </label>
        <div className="contact-enquiry-actions">
          <button type="submit" className="button-solid">Draft your enquiry</button>
          <a className="button button-light" href="mailto:dataprotection@gpm-associates.ng">
            Email GPM directly
          </a>
        </div>
        <p className="contact-enquiry-status" aria-live="polite">
          {status}
        </p>
      </form>
    </div>
  );
}
