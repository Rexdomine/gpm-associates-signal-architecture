"use client";

import { useMemo, useState } from "react";

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
  "Organisation profile",
  "Processing volume",
  "Risk indicators",
  "Technology considerations",
] as const;
const introFacts = [
  { label: "Estimated time", value: "2–3 minutes" },
  { label: "Question set", value: "Usually 9 questions, with one additional technology question where relevant." },
  { label: "What you receive", value: "An indicative NDPA level with practical next-step guidance." },
] as const;

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

function getStageIndex(questionId?: QuickCheckQuestion["id"]) {
  if (!questionId) {
    return 0;
  }

  if (questionId === "sector" || questionId === "subtype") {
    return 0;
  }

  if (questionId === "volume") {
    return 1;
  }

  return 2;
}

function AssessmentRail({ activeStage, questionCount, answeredCount }: { activeStage: number; questionCount: number; answeredCount: number }) {
  return (
    <aside className="innovation-assessment-rail" aria-label="Assessment stages">
      <div>
        <p className="innovation-rail-kicker">NATIVE ASSESSMENT</p>
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

export function InnovationQuickCheck() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<QuickCheckAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<QuickCheckResult | null>(null);

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

  return (
    <div className="innovation-assessment-shell" data-reveal>
      <AssessmentRail activeStage={activeStage} answeredCount={answeredCount} questionCount={visibleQuestions.length} />

      {!started ? (
        <section className="innovation-assessment-stage innovation-assessment-intro" aria-labelledby="innovation-assessment-title">
          <div className="innovation-intro-hero">
            <div>
              <p className="innovation-tool-kicker">NDPA QUICK CHECK</p>
              <h3 id="innovation-assessment-title">Understand your likely NDPA classification before a formal review.</h3>
              <p>
                Answer a short set of guided questions to understand your likely processing level, the factors influencing it and the next steps worth considering.
              </p>
            </div>

            <div className="innovation-intro-facts" aria-label="Quick check facts">
              {introFacts.map((fact) => (
                <article key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="innovation-intro-overview">
            <div>
              <span>What this assessment considers</span>
              <div className="innovation-highlight-grid" aria-label="Quick check coverage highlights">
                {introHighlights.map((item) => (
                  <article key={item}>
                    <strong>{item}</strong>
                  </article>
                ))}
              </div>
            </div>
            <div className="innovation-intro-note">
              <span>Before you begin</span>
              <strong>This result is indicative and based only on the answers you provide. It does not replace a professional classification review.</strong>
              <p>If you need a formal interpretation, validation of obligations or implementation support, GPM can advise on the appropriate next step.</p>
            </div>
          </div>

          <div className="innovation-intro-actions">
            <button className="button-solid" type="button" onClick={() => setStarted(true)}>
              Start quick check
              <ArrowIcon />
            </button>
          </div>
        </section>
      ) : result ? (
        <section className="innovation-assessment-stage innovation-result-card" aria-labelledby="innovation-result-title">
          <div className="innovation-result-hero">
            <div>
              <p className="innovation-tool-kicker">RESULT</p>
              <div className="innovation-result-badges">
                <span className="innovation-result-tier">{result.shortLabel}</span>
                <span className="innovation-result-confidence">Confidence: {result.confidence}</span>
              </div>
              <h3 id="innovation-result-title">{result.label}</h3>
              <p>{result.summary}</p>
            </div>
            <div className="innovation-result-summary-card">
              <span>Recommended next move</span>
              <strong>Use this result to frame a proportionate compliance conversation.</strong>
              <p>Review the main drivers below, then decide whether you need a formal classification review, targeted remediation support or a broader compliance programme.</p>
              <div className="innovation-result-actions">
                <button className="button-quiet" type="button" onClick={reviewAnswers}>
                  Review answers
                </button>
                <button className="button-quiet" type="button" onClick={resetAssessment}>
                  Restart assessment
                </button>
                <a className="button-solid" href="/contact">
                  Speak with an advisor
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="innovation-result-section">
            <div className="innovation-result-section-heading">
              <span>Why this result appeared</span>
              <strong>Key factors in your answers</strong>
            </div>
            <ul className="innovation-driver-list">
              {result.drivers.map((driver) => (
                <li key={driver}>
                  <CheckIcon />
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="innovation-result-columns">
            <div>
              <div className="innovation-result-section-heading">
                <span>Indicative obligations</span>
                <strong>What this level usually triggers</strong>
              </div>
              <div className="innovation-card-grid innovation-card-grid-compact">
                {result.obligations.map((card) => (
                  <article key={card.title} className="innovation-detail-card">
                    <h4>{card.title}</h4>
                    <p>{card.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="innovation-result-section-heading">
                <span>Recommended next steps</span>
                <strong>How to act proportionately</strong>
              </div>
              <div className="innovation-card-grid">
                {result.nextSteps.map((card) => (
                  <article key={card.title} className="innovation-detail-card">
                    <h4>{card.title}</h4>
                    <p>{card.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : currentQuestion ? (
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
      ) : null}
    </div>
  );
}
