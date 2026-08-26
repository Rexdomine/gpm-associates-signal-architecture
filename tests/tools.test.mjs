import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => {
  const url = new URL(path, root);
  return existsSync(url) ? readFileSync(url, "utf8") : "";
};

const page = read("app/tools/page.tsx");
const component = read("app/components/InnovationQuickCheck.tsx");
const engine = read("app/lib/innovationQuickCheck.ts");
const styles = read("app/globals.css");
const readme = read("README.md");
const source = [page, component, engine, styles].join("\n");

const exact = (value) => new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

test("tools route ships review-only metadata and native quick-check framing", () => {
  for (const copy of [
    'title: "Innovation | GPM Associates"',
    'Interactive privacy and governance tools from GPM Associates, including a natively rebuilt NDPA Quick Check assessment.',
    'robots: { index: false, follow: false }',
    'GPM Innovation Lab',
    'GPM NDPA Quick Check',
    'Find your likely processing level',
    'The assessment now runs as a first-party GPM website experience rather than as an embedded mockup',
  ]) {
    assert.match(page, exact(copy));
  }
});

test("tools route avoids the old embedded implementation and uses a native component instead", () => {
  assert.match(page, /<InnovationQuickCheck\s*\/>/);
  for (const removed of ["iframe", "gpm-ndpa-quick-check.dataprotectiongpm.chatgpt.site", "ENABLE TOOL", "OPEN FULL TOOL"]) {
    assert.equal(source.includes(removed), false, `old embed artifact remains: ${removed}`);
  }
  assert.equal(component.includes("externalMedia"), false);
});

test("native quick check preserves the inspected assessment stages and first-party controls", () => {
  for (const copy of [
    'const stageLabels = ["Organisation", "Processing", "Risk indicators", "Result"] as const;',
    'Recreated from an inspected NDPA Quick Check engine.',
    'Start native quick check',
    'QUESTION {currentQuestionIndex + 1} OF {visibleQuestions.length}',
    'Review answers',
    'Restart assessment',
    'Speak with an advisor',
    '9 base questions, with a conditional 10th technology-services check where relevant.',
  ]) {
    assert.match(component, exact(copy));
  }
  assert.match(component, /role="radiogroup"/);
  assert.match(component, /role="radio"/);
  assert.match(component, /aria-checked=\{selected\}/);
  assert.match(component, /goBack/);
  assert.match(component, /evaluateQuickCheck\(nextAnswers\)/);
});

test("inspected rule set includes the conditional technology path and explicit organisation overrides", () => {
  for (const copy of [
    'id: "commercial_ict"',
    'Do your services involve accessing personal data stored on devices or systems belonging to other people?',
    'answers.sector === "technology" || answers.subtype === "commercial_ict"',
    'commercial_bank_national_regional: "UHL"',
    'telecom: "UHL"',
    'multinational: "UHL"',
    'microfinance: "EHL"',
    'government_mda: "EHL"',
    'hospital_secondary_tertiary: "EHL"',
    'primary_secondary_school: "OHL"',
    'primary_health: "OHL"',
    'sensitive_processor_200_plus: "OHL"',
    'answers.commercial_ict === "yes"',
  ]) {
    assert.match(engine, exact(copy));
  }
});

test("inspected rule set keeps the volume, uncertainty and risk-factor thresholds", () => {
  for (const copy of [
    'answers.volume === "over_5000"',
    'answers.volume === "1001_4999"',
    'answers.volume === "201_999"',
    'const boundaryVolume = answers.volume === "exact_1000" || answers.volume === "exact_5000";',
    'const unsureAnswers = Object.values(answers).filter((value) => value === "unsure").length;',
    'if (!impliedTier && principalRiskFlags.length >= 4)',
    'else if (!impliedTier && extraHighSignal >= 4)',
    'More than one answer was uncertain, so a reliable automated classification is not appropriate.',
    'No clear level',
  ]) {
    assert.match(engine, exact(copy));
  }
  assert.ok(
    engine.includes("boundaryVolume || affirmedFlags.length >= 3 || answers.commercial_ict === \"yes\" || unsureAnswers >= 2"),
    "review threshold must combine boundary volume, risk flags, commercial ICT and uncertainty",
  );
});

test("native tools experience is documented and styled as a first-party route", () => {
  for (const copy of [
    '`app/tools/page.tsx` is the semantic, server-rendered `/tools` Innovation route and hosts the natively rebuilt NDPA Quick Check experience.',
    '`app/components/InnovationQuickCheck.tsx` provides the first-party assessment flow, progress states, result summaries and advisor conversion path for `/tools`.',
    'The `/about`, `/services`, `/industries` and `/tools` destinations are implemented on this branch.',
    'The `/tools` quick check is implemented natively and does not depend on an external embed or iframe.',
  ]) {
    assert.match(readme, exact(copy));
  }
  for (const token of [".tools-live", ".innovation-assessment-shell", ".innovation-option-grid", ".innovation-result-card", ".innovation-orbit"]) {
    assert.ok(styles.includes(token), `missing innovation style token: ${token}`);
  }
  assert.equal(source.includes("↗"), false);
  assert.match(component, /<svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">/);
});
