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
const launcher = read("app/components/GlobalQuickCheckLauncher.tsx");
const mobileMenu = read("app/components/MobileMenu.tsx");
const layout = read("app/layout.tsx");
const engine = read("app/lib/innovationQuickCheck.ts");
const styles = read("app/globals.css");
const readme = read("README.md");
const nextConfig = read("next.config.ts");
const source = [page, component, launcher, mobileMenu, layout, engine, styles].join("\n");

const exact = (value) => new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

test("tools route ships review-only metadata and production-ready quick-check framing", () => {
  for (const copy of [
    'title: "Innovation | GPM Associates"',
    'Interactive privacy and governance tools from GPM Associates, including a production-ready NDPA Quick Check assessment.',
    'robots: { index: false, follow: false }',
    'GPM Innovation Lab',
    'GPM NDPA Quick Check',
    'Find your likely processing level',
    'Work through a concise question flow to receive an indicative NDPA level, the main reasons behind it and practical next-step guidance.',
  ]) {
    assert.match(page, exact(copy));
  }
});

test("tools route avoids the old embedded implementation and uses a native component instead", () => {
  assert.match(page, /<InnovationQuickCheck\s*\/>/);
  assert.equal(page.includes("iframe"), false, "tools route should not render an embedded iframe");
  for (const removed of ["gpm-ndpa-quick-check.dataprotectiongpm.chatgpt.site", "ENABLE TOOL", "OPEN FULL TOOL", "InnovationQuickCheckEmbed"]) {
    assert.equal(source.includes(removed), false, `old embed artifact remains: ${removed}`);
  }
  assert.equal(existsSync(new URL("app/components/InnovationQuickCheckEmbed.tsx", root)), false, "embed component should be removed");
  assert.equal(component.includes("externalMedia"), false);
  assert.equal(nextConfig.includes("gpm-ndpa-quick-check.dataprotectiongpm.chatgpt.site"), false, "CSP should not allow the old external quick-check origin");
  assert.match(nextConfig, exact('"frame-src \'self\'"'));
});

test("native quick check preserves the assessment stages, navigation history and first-party controls", () => {
  for (const copy of [
    'type InnovationQuickCheckProps = {',
    'variant?: "page" | "modal";',
    'autoStart?: boolean;',
    'onRequestClose?: () => void;',
    'const [started, setStarted] = useState(autoStart);',
    'const isModal = variant === "modal";',
    'const stageLabels = ["Organisation", "Processing", "Risk indicators", "Result"] as const;',
    'function getDisplayedQuestionCount()',
    'return { count: quickCheckQuestionOrder.length, label: String(quickCheckQuestionOrder.length) };',
    'const [questionHistory, setQuestionHistory] = useState<QuickCheckQuestionId[]>([]);',
    'setQuestionHistory([]);',
    'setStarted(autoStart);',
    'const previousQuestionId = questionHistory[questionHistory.length - 1];',
    'if (onRequestClose) {',
    'onRequestClose();',
    'setQuestionHistory((history) => history.slice(0, -1));',
    'pruneAnswersAfterQuestion(question.id, answers)',
    'QUESTION {currentQuestionIndex + 1} OF {displayQuestionCount.label}',
    'questionCountLabel={displayQuestionCount.label}',
    'NDPA PROCESSING LEVEL CHECKER',
    'Start quick check',
    'Review answers',
    'Start again',
    'Request full NDPA assessment',
    'Close quick check',
    'About 90 seconds',
    '10 guided questions',
    'YOUR INDICATIVE RESULT',
    'Recommended next steps',
    'const iframe = document.createElement("iframe");',
    'const printableMarkup = resultScreenRef.current.outerHTML;',
    `const sourceHead = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'))`,
    'printDocument.write(`',
    'iframe.addEventListener("load", startPrint, { once: true });',
    'void printDocument.fonts.ready.then(startPrint).catch(startPrint);',
  ]) {
    assert.match(component, exact(copy));
  }
  assert.match(component, /goBack/);
  assert.match(component, /evaluateQuickCheck\(nextAnswers\)/);
  assert.doesNotMatch(component, /role="radiogroup"/);
  assert.doesNotMatch(component, /role="radio"/);
  assert.doesNotMatch(component, /aria-checked=\{selected\}/);
  assert.doesNotMatch(component, /data-print-target/);
  assert.doesNotMatch(component, /QUESTION \{currentQuestionIndex \+ 1\} OF \{visibleQuestions.length\}/);
  assert.doesNotMatch(component, /innovation-intro-screen" data-reveal/);
  assert.doesNotMatch(component, /innovation-result-screen" data-reveal/);
  assert.doesNotMatch(component, /innovation-assessment-shell" data-reveal/);
});

test("global launcher mounts once, opens the native quick check directly, and avoids redirecting to the tools route", () => {
  for (const copy of [
    'import { GlobalQuickCheckLauncher } from "./components/GlobalQuickCheckLauncher";',
    '<GlobalQuickCheckLauncher />',
    'export const OPEN_GLOBAL_QUICK_CHECK_EVENT = "gpm-open-global-quick-check";',
    'window.addEventListener(OPEN_GLOBAL_QUICK_CHECK_EVENT, openQuickCheck);',
    'window.removeEventListener(OPEN_GLOBAL_QUICK_CHECK_EVENT, openQuickCheck);',
    'window.dispatchEvent(new Event(OPEN_GLOBAL_QUICK_CHECK_EVENT))',
    'Start quick check',
    'const isToolsRoute = pathname === "/tools";',
    'if (isToolsRoute) return null;',
    'const isOpen = !isToolsRoute && openPath === pathname;',
    'const closeDialog = () => {',
    'returnFocusRef.current?.focus();',
    'className="quick-check-launcher"',
    'role="dialog"',
    'aria-labelledby="global-quick-check-title"',
    'Open the guided assessment instantly from anywhere on the site.',
    'className="quick-check-backdrop" role="presentation" onClick={closeDialog}',
    'className="quick-check-dialog__close"',
    'onClick={closeDialog}',
    '<InnovationQuickCheck autoStart onRequestClose={closeDialog} variant="modal" />',
    'document.body.style.overflow = "hidden";',
  ]) {
    assert.ok(source.includes(copy), `missing global quick-check launcher marker: ${copy}`);
  }
  assert.ok(mobileMenu.includes('className="mobile-quick-check"'), 'mobile menu should expose a dedicated quick check button');
  assert.equal(launcher.includes('href="/tools"'), false, 'launcher must not redirect to /tools');
  for (const token of [
    ".quick-check-launcher",
    ".quick-check-backdrop",
    ".quick-check-dialog",
    ".innovation-assessment-shell--modal",
    ".mobile-panel .mobile-quick-check",
    ".quick-check-launcher { display: none; }",
  ]) {
    assert.ok(styles.includes(token), `missing quick-check launcher style token: ${token}`);
  }
});


test("inspected rule set includes the conditional technology path, explicit organisation overrides and answer-pruning for reordered flows", () => {
  for (const copy of [
    'export const quickCheckQuestionOrder: QuickCheckQuestionId[] = [',
    'id: "commercial_ict"',
    'Do your services involve accessing personal data stored on devices or systems belonging to other people?',
    'If this is not part of your organisation’s services, choose No.',
    '((answers.sector === "technology" || answers.subtype === "commercial_ict") && answers.commercial_ict === "yes")',
    'export function pruneAnswersAfterQuestion(questionId: QuickCheckQuestionId, nextAnswers: QuickCheckAnswers) {',
    'const questionIndex = quickCheckQuestionOrder.indexOf(questionId);',
    'quickCheckQuestionOrder.slice(questionIndex + 1).forEach((id) => {',
    'delete pruned[id];',
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
    engine.includes("boundaryVolume || affirmedFlags.length >= 3 || ((answers.sector === \"technology\" || answers.subtype === \"commercial_ict\") && answers.commercial_ict === \"yes\") || unsureAnswers >= 2"),
    "review threshold must combine boundary volume, risk flags, commercial ICT and uncertainty",
  );
});

test("native tools experience is documented and styled as a first-party route", () => {
  for (const copy of [
    '`app/tools/page.tsx` is the semantic, server-rendered `/tools` Innovation route and hosts the natively rebuilt NDPA Quick Check experience.',
    '`app/components/InnovationQuickCheck.tsx` provides the first-party assessment flow, progress states, result summaries and advisor conversion path for `/tools`.',
    '`app/components/GlobalQuickCheckLauncher.tsx` mounts one floating site-wide trigger that opens the same native NDPA Quick Check in-place without redirecting users to `/tools`.',
    'The `/about`, `/services`, `/industries`, `/tools`, `/insights`, `/governance-library` and `/contact` destinations are implemented on this branch.',
    'The `/tools` quick check is implemented natively and does not depend on an external embed or iframe.',
  ]) {
    assert.match(readme, exact(copy));
  }
  for (const token of [
    ".tools-live",
    ".innovation-assessment-shell",
    ".quick-check-launcher",
    ".innovation-option-grid",
    ".innovation-option-grid.dense { grid-template-columns: repeat(2, minmax(0, 1fr)); }",
    ".innovation-option-grid.dense button { min-height: 96px; }",
    ".innovation-result-panel",
    ".innovation-intro-orbit",
  ]) {
    assert.ok(styles.includes(token), `missing innovation style token: ${token}`);
  }
  assert.equal(source.includes("↗"), false);
  assert.match(component, /<svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">/);
});

test("result printing isolates the result surface and removes print-only controls from the rendered document", () => {
  for (const copy of [
    '.innovation-result-panel-actions,',
    '.innovation-result-why-actions,',
    '.innovation-result-reset {',
    'display: none !important;',
    'page-break-inside: avoid;',
    '@page {',
    'margin: 16mm;',
    'printWindow.addEventListener("afterprint", cleanup, { once: true });',
    'printWindow.addEventListener("focus", cleanup, { once: true });',
    'window.addEventListener("focus", cleanup, { once: true });',
  ]) {
    assert.match(component, exact(copy));
  }
  assert.doesNotMatch(component, /window\.setTimeout\(cleanup, 1500\);/);
});
