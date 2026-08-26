"use client";

import { useMemo, useRef, useState } from "react";

import {
  evaluateQuickCheck,
  getVisibleQuickCheckQuestions,
  normalizeQuickCheckAnswers,
  type QuickCheckAnswers,
  type QuickCheckQuestion,
  type QuickCheckResult,
} from "../lib/innovationQuickCheck";

const stageLabels = ["Organisation", "Processing", "Risk indicators", "Result"] as const;
const introHighlights = [
  { number: "01", title: "Simple", detail: "Plain-language prompts" },
  { number: "02", title: "Indicative", detail: "Rules-led result" },
  { number: "03", title: "Actionable", detail: "Clear next steps" },
] as const;
const resultSectionTitles: Record<QuickCheckResult["tier"], string> = {
  UHL: "What this level usually triggers",
  EHL: "What this level usually triggers",
  OHL: "What this level usually triggers",
  REVIEW: "High-level considerations associated with this result",
  NONE: "High-level considerations associated with this result",
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4 14 14 4M7 4h7v7" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="m3.5 9.5 3.2 3.1 7.8-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function RestartIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
      <path d="M4.5 7.5a5 5 0 1 1-.5 4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M4.5 3.8v4h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function getStageIndex(questionId?: QuickCheckQuestion["id"]) {
  if (!questionId) return 0;
  if (questionId === "sector" || questionId === "subtype") return 0;
  if (questionId === "volume") return 1;
  return 2;
}

function AssessmentRail({ activeStage, questionCount, answeredCount }: { activeStage: number; questionCount: number; answeredCount: number }) {
  return (
    <aside className="innovation-assessment-rail" aria-label="Assessment stages">
      <div>
        <p className="innovation-rail-kicker">Quick check</p>
        <strong>GPM NDPA Quick Check</strong>
      </div>
      <div className="innovation-rail-steps">
        {stageLabels.map((label, index) => (
          <span key={label} className={index <= activeStage ? "active" : undefined}>
            {label}
          </span>
        ))}
      </div>
      <p className="innovation-rail-note">Answer a short guided sequence about your organisation, processing activity and key privacy risk factors.</p>
      <dl className="innovation-rail-stats">
        <div>
          <dt>Questions</dt>
          <dd>{questionCount}</dd>
        </div>
        <div>
          <dt>Answered</dt>
          <dd>{answeredCount}</dd>
        </div>
      </dl>
    </aside>
  );
}

function IntroOrbit() {
  return (
    <div className="innovation-intro-orbit" aria-hidden="true">
      <div className="innovation-intro-ring innovation-intro-ring-a" />
      <div className="innovation-intro-ring innovation-intro-ring-b" />
      <div className="innovation-intro-ring innovation-intro-ring-c" />
      <div className="innovation-intro-ring innovation-intro-ring-d" />
      <span className="innovation-intro-node innovation-intro-node-a" />
      <span className="innovation-intro-node innovation-intro-node-b" />
      <span className="innovation-intro-node innovation-intro-node-c" />
      <article className="innovation-intro-level innovation-intro-level-uhl">
        <strong>UHL</strong>
        <span>Ultra-High</span>
      </article>
      <article className="innovation-intro-level innovation-intro-level-ehl">
        <strong>EHL</strong>
        <span>Extra-High</span>
      </article>
      <article className="innovation-intro-level innovation-intro-level-ohl">
        <strong>OHL</strong>
        <span>Ordinary-High</span>
      </article>
      <div className="innovation-intro-core">
        <span>Quick check</span>
        <strong>9–10 guided questions</strong>
        <small>Rules-first assessment</small>
      </div>
      <p>Organisation → Assessment → Guidance</p>
    </div>
  );
}

export function InnovationQuickCheck() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<QuickCheckAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<QuickCheckResult | null>(null);
  const resultScreenRef = useRef<HTMLElement | null>(null);

  const visibleQuestions = useMemo(() => getVisibleQuickCheckQuestions(answers), [answers]);
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const answeredCount = visibleQuestions.filter((question) => Boolean(answers[question.id])).length;
  const progress = visibleQuestions.length
    ? result
      ? 100
      : Math.round(((currentQuestionIndex + 1) / visibleQuestions.length) * 100)
    : 0;
  const activeStage = result ? 3 : getStageIndex(currentQuestion?.id);

  function resetAssessment() {
    setStarted(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  }

  function reviewAnswers() {
    setResult(null);
    setCurrentQuestionIndex(Math.max(visibleQuestions.length - 1, 0));
  }

  function answerQuestion(question: QuickCheckQuestion, value: string) {
    const nextAnswers = normalizeQuickCheckAnswers({
      ...answers,
      [question.id]: value,
    });

    const nextQuestions = getVisibleQuickCheckQuestions(nextAnswers);
    const nextIndex = nextQuestions.findIndex((item) => item.id === question.id);

    setAnswers(nextAnswers);

    if (nextIndex === nextQuestions.length - 1) {
      setResult(evaluateQuickCheck(nextAnswers));
      return;
    }

    setCurrentQuestionIndex(nextIndex + 1);
  }

  function goBack() {
    if (result) {
      reviewAnswers();
      return;
    }

    setCurrentQuestionIndex((index) => Math.max(index - 1, 0));
  }

  function printResult() {
    if (!resultScreenRef.current) return;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    const sourceHead = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join("\n");

    const printableMarkup = resultScreenRef.current.outerHTML;

    document.body.appendChild(iframe);

    const printDocument = iframe.contentDocument;
    const printWindow = iframe.contentWindow;

    if (!printDocument || !printWindow) {
      iframe.remove();
      return;
    }

    const cleanup = () => {
      iframe.remove();
    };

    printDocument.open();
    printDocument.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <base href="${window.location.origin}" />
          ${sourceHead}
          <style>
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
            }

            body {
              padding: 24px;
            }

            .innovation-result-screen {
              width: 100%;
              max-width: none;
            }

            .innovation-result-panel-actions,
            .innovation-result-why-actions,
            .innovation-result-reset {
              display: none !important;
            }

            .innovation-result-panel,
            .innovation-result-why,
            .innovation-result-snapshot-card,
            .innovation-result-next-step-card,
            .innovation-result-important {
              break-inside: avoid;
              page-break-inside: avoid;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            @page {
              margin: 16mm;
            }

            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${printableMarkup}
        </body>
      </html>
    `);
    printDocument.close();

    let printStarted = false;

    const startPrint = () => {
      if (printStarted) return;
      printStarted = true;
      printWindow.focus();
      printWindow.addEventListener("afterprint", cleanup, { once: true });
      printWindow.print();
      window.setTimeout(cleanup, 1500);
    };

    iframe.addEventListener("load", startPrint, { once: true });

    if ("fonts" in printDocument) {
      void printDocument.fonts.ready.then(startPrint).catch(startPrint);
      return;
    }

    startPrint();
  }

  if (!started) {
    return (
      <section className="innovation-intro-screen" aria-labelledby="innovation-assessment-title">
        <div className="innovation-intro-layout">
          <div className="innovation-intro-copy">
            <p className="innovation-intro-kicker">
              <span />
              NDPA PROCESSING LEVEL CHECKER
            </p>
            <h3 id="innovation-assessment-title">
              Find your likely <em>processing level.</em>
            </h3>
            <p className="innovation-intro-summary">
              Answer a few plain-language questions to see whether your organisation is likely to fall within UHL, EHL or OHL under Nigeria’s data-protection framework.
            </p>
            <div className="innovation-intro-cta-row">
              <button className="button-solid" type="button" onClick={() => setStarted(true)}>
                Start quick check
                <ArrowIcon />
              </button>
              <span className="innovation-intro-duration">
                <b />
                About 90 seconds
              </span>
            </div>
            <p className="innovation-intro-reassurance">
              <CheckIcon />
              <span>No sign-up required. Your answers stay private within this assessment session.</span>
            </p>
          </div>

          <IntroOrbit />
        </div>

        <div className="innovation-intro-highlights" aria-label="Quick check features">
          {introHighlights.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="innovation-intro-important" role="note" aria-label="Important to know">
          <strong>Important to know</strong>
          <p>
            This tool provides preliminary guidance—not a determination by the Nigeria Data Protection Commission, legal advice or a full compliance assessment.
          </p>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section className="innovation-result-screen" aria-labelledby="innovation-result-title" ref={resultScreenRef}>
        <div className="innovation-result-topbar">
          <div>
            <p className="innovation-intro-kicker">
              <span />
              YOUR INDICATIVE RESULT
            </p>
            <strong>GPM NDPA Quick Check</strong>
          </div>
          <button className="innovation-result-reset" type="button" onClick={resetAssessment}>
            <RestartIcon />
            Start again
          </button>
        </div>

        <h3 id="innovation-result-title">Here’s what your answers indicate.</h3>

        <div className="innovation-result-primary">
          <article className="innovation-result-panel">
            <div className="innovation-result-panel-top">
              <span>Likely processing level</span>
              <b>
                <i />
                Indicative confidence: {result.confidence}
              </b>
            </div>
            <p className="innovation-result-panel-tier">{result.shortLabel}</p>
            <strong>{result.label}</strong>
            <p>{result.summary}</p>
            <div className="innovation-result-panel-actions">
              <a className="button-solid" href="/contact">
                Request full NDPA assessment
                <ArrowIcon />
              </a>
              <button className="button-quiet" type="button" onClick={printResult}>
                Print result
              </button>
            </div>
          </article>

          <aside className="innovation-result-why">
            <span>01</span>
            <h4>Why this result</h4>
            <ul className="innovation-driver-list">
              {result.drivers.map((driver) => (
                <li key={driver}>
                  <CheckIcon />
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
            <div className="innovation-result-why-actions">
              <button className="button-quiet" type="button" onClick={reviewAnswers}>
                Review answers
              </button>
            </div>
          </aside>
        </div>

        <section className="innovation-result-snapshot" aria-labelledby="innovation-snapshot-title">
          <span>02</span>
          <h4 id="innovation-snapshot-title">Regulatory snapshot</h4>
          <p>{resultSectionTitles[result.tier]}</p>
          <div className="innovation-result-snapshot-grid">
            {result.obligations.map((card, index) => (
              <article key={card.title} className="innovation-result-snapshot-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h5>{card.title}</h5>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="innovation-result-next-steps" aria-labelledby="innovation-next-steps-title">
          <div className="innovation-result-next-steps-head">
            <span>03</span>
            <h4 id="innovation-next-steps-title">Recommended next steps</h4>
            <p>Practical actions to move from classification to accountable implementation.</p>
          </div>
          <div className="innovation-result-next-steps-grid">
            {result.nextSteps.map((card, index) => (
              <article key={card.title} className="innovation-result-next-step-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>GPM NDPA Quick Check</small>
                <h5>{card.title}</h5>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="innovation-result-important" role="note" aria-label="Important">
          <strong>Important</strong>
          <p>
            This Quick Check provides an indicative classification based solely on the information you provided and GPM Associates’ interpretation of the current Nigeria Data Protection Act, GAID and applicable NDPC guidance. It is not a determination by the Nigeria Data Protection Commission, legal advice or a full compliance assessment.
          </p>
        </div>
      </section>
    );
  }

  return currentQuestion ? (
    <div className="innovation-assessment-shell">
      <AssessmentRail activeStage={activeStage} answeredCount={answeredCount} questionCount={visibleQuestions.length} />
      <section className="innovation-assessment-stage" aria-labelledby="innovation-question-title">
        <div className="innovation-progress-meta">
          <span>
            QUESTION {currentQuestionIndex + 1} OF {visibleQuestions.length}
          </span>
          <span>{progress}% complete</span>
        </div>
        <div className="innovation-progress-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <article className="innovation-question-card">
          <p className="innovation-tool-kicker">{currentQuestion.eyebrow}</p>
          <h3 id="innovation-question-title">{currentQuestion.title}</h3>
          <p>{currentQuestion.help}</p>

          <div className={`innovation-option-grid ${currentQuestion.options.length > 5 ? "dense" : ""}`} role="radiogroup" aria-label={currentQuestion.title}>
            {currentQuestion.options.map((option, index) => {
              const selected = answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  className={selected ? "selected" : undefined}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => answerQuestion(currentQuestion, option.value)}
                >
                  <span>{index + 1}</span>
                  <div>
                    <strong>{option.label}</strong>
                    {option.detail ? <small>{option.detail}</small> : null}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="innovation-question-actions">
            <button className="button-quiet" type="button" onClick={goBack} disabled={currentQuestionIndex === 0}>
              Back
            </button>
            <button className="button-quiet" type="button" onClick={resetAssessment}>
              Exit assessment
            </button>
          </div>
        </article>
      </section>
    </div>
  ) : null;
}
