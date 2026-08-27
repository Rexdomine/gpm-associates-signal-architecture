"use client";

import { FormEvent, KeyboardEvent, useEffect, useId, useRef, useState } from "react";

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

function TopicPickerIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4.5 6.75 9 11.25l4.5-4.5" fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" />
    </svg>
  );
}

export function ContactEnquiryPanel() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [status, setStatus] = useState("This drafts an email to GPM using your default mail app.");
  const [topicMenuOpen, setTopicMenuOpen] = useState(false);
  const topicFieldRef = useRef<HTMLDivElement>(null);
  const topicButtonRef = useRef<HTMLButtonElement>(null);
  const topicListId = useId();
  const topicLabelId = useId();

  const mailtoHref = `mailto:dataprotection@gpm-associates.ng?subject=${encodeURIComponent(`Advisory enquiry — ${form.topic}`)}&body=${encodeURIComponent(toMailtoBody(form))}`;

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    if (!topicMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!topicFieldRef.current?.contains(event.target as Node)) {
        setTopicMenuOpen(false);
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setTopicMenuOpen(false);
        topicButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [topicMenuOpen]);

  const focusTopicOption = (index: number) => {
    const options = topicFieldRef.current?.querySelectorAll<HTMLButtonElement>("[data-topic-option]");
    options?.[index]?.focus();
  };

  const openTopicMenu = (focusIndex = advisoryTopics.indexOf(form.topic as (typeof advisoryTopics)[number])) => {
    setTopicMenuOpen(true);
    window.requestAnimationFrame(() => {
      focusTopicOption(Math.max(focusIndex, 0));
    });
  };

  const handleTopicTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openTopicMenu();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openTopicMenu(advisoryTopics.length - 1);
    }
  };

  const handleTopicOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusTopicOption((index + 1) % advisoryTopics.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusTopicOption((index - 1 + advisoryTopics.length) % advisoryTopics.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTopicOption(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTopicOption(advisoryTopics.length - 1);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setTopicMenuOpen(false);
      topicButtonRef.current?.focus();
    }
  };

  const chooseTopic = (topic: string) => {
    updateField("topic", topic);
    setTopicMenuOpen(false);
    topicButtonRef.current?.focus();
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
        <label className="contact-form-field">
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
        </label>
        <label className="contact-form-field">
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
        <label className="contact-form-field">
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
        </label>
        <label className="contact-form-field">
          <span>Phone (optional)</span>
          <input type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
        </label>
        <div className="contact-form-field contact-form-field-wide">
          <span id={topicLabelId}>Advisory topic</span>
          <div className="contact-topic-field" ref={topicFieldRef}>
            <input type="hidden" name="topic" value={form.topic} readOnly />
            <button
              ref={topicButtonRef}
              type="button"
              className="contact-topic-trigger"
              aria-expanded={topicMenuOpen}
              aria-haspopup="listbox"
              aria-controls={topicListId}
              aria-labelledby={topicLabelId}
              onClick={() => {
                if (topicMenuOpen) {
                  setTopicMenuOpen(false);
                  return;
                }
                openTopicMenu();
              }}
              onKeyDown={handleTopicTriggerKeyDown}
            >
              <span className="contact-topic-trigger-value">{form.topic}</span>
              <span className="contact-topic-trigger-icon">
                <TopicPickerIcon />
              </span>
            </button>
            <div className="contact-topic-menu-shell" hidden={!topicMenuOpen}>
              <div id={topicListId} className="contact-topic-menu" role="listbox" aria-labelledby={topicLabelId}>
                {advisoryTopics.map((topic, index) => {
                  const isSelected = topic === form.topic;

                  return (
                    <button
                      key={topic}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`contact-topic-option${isSelected ? " selected" : ""}`}
                      data-topic-option
                      onClick={() => chooseTopic(topic)}
                      onKeyDown={(event) => handleTopicOptionKeyDown(event, index)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{topic}</strong>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <label className="contact-form-field contact-form-field-wide">
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
