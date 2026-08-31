# GPM Associates — Project Context

## Project identity

- Project: GPM Associates Signal Architecture website
- Local path: `/opt/data/projects/gpm-associates-signal-architecture`
- Repository: `https://github.com/Rexdomine/gpm-associates-signal-architecture`

## Governing imagery direction

The client-meeting direction is the primary creative authority for every GPM image. Existing website imagery, earlier generated GPM assets, and supplied reference images must not replace or redefine that direction.

GPM imagery must communicate a direct and visually understandable connection to privacy, data protection, data governance, regulatory assurance, responsible technology, or the specific GPM workflow discussed by the surrounding page content.

The visual language is premium, formal, credible, human, and editorial. Where people are shown, they should be culturally credible African professionals actively performing meaningful privacy or governance work in a specific operational setting. Generated people are illustrative subjects and must never be presented as GPM personnel, clients, or participants in a real engagement.

Examples of suitable visible work include:

- data mapping and records-of-processing activities;
- privacy impact and risk assessments;
- governance frameworks, accountability structures, and evidence review;
- data-lifecycle decisions covering collection, use, sharing, retention, and disposal;
- privacy-by-design implementation;
- third-party or cross-border data assessments;
- incident preparedness and regulatory assurance;
- responsible AI and emerging-technology governance;
- role-specific privacy training and capability development.

## Role of supplied references

Supplied reference images are complementary aesthetic inputs only. They may guide lighting, framing, camera perspective, colour balance, wardrobe refinement, environmental texture, photographic realism, editorial finish, mood, or composition.

They are not the primary brief and must not override the client-meeting direction. The subject matter and narrative must always come from GPM's actual privacy and data-governance work.

Existing GPM images are not generation references unless Rex explicitly authorizes a specific exception. Do not reuse, recrop, lightly edit, remix, or regenerate from an old GPM production asset when a new direction is requested.

## Standard image-generation workflow

For every new GPM website image:

1. Read the surrounding page section and identify the exact GPM service, workflow, or outcome the image must communicate.
2. Re-anchor the concept in the client-meeting imagery direction before considering aesthetic references.
3. Define a new scene with a direct, visible privacy/data-governance connection and credible African representation where people are required.
4. Use GPT Image 2 to generate a genuinely new production candidate. Use image-to-image inputs only when supplied references are intended to complement the agreed direction.
5. Do not use an existing website image or previous generated GPM asset as the creative foundation unless Rex explicitly approves that specific use.
6. Reject candidates that could plausibly advertise an unrelated consultancy, bank, law firm, or generic technology company.
7. Reject generic meetings, boardrooms, conference halls, handshakes, people merely smiling at laptops, abstract cyber imagery, hooded figures, glowing locks or shields, random circles, dystopian technology, excessive holograms, readable personal information, real-person data, logos, seals, or unsupported institutional evidence.
8. Verify subject credibility, visible workflow accuracy, hands/faces/screens, publication safety, responsive crop resilience, text-overlay readability where relevant, and alignment with GPM's navy/crimson premium brand language.
9. Record model/provider, generation method, source references used, dimensions, production derivative, checksum, and truthful illustrative-subject disclosure.
10. Treat successful loading, accessibility, performance, and responsive QA as necessary but not sufficient: originality and adherence to the meeting-led direction are explicit acceptance gates.

## Image acceptance gate

A new image is acceptable only when all of the following are true:

- it is genuinely newly generated for the requested section;
- its narrative comes from the client-meeting direction;
- it visibly connects to the relevant GPM privacy/data-governance workflow;
- references function only as complementary aesthetic guidance;
- it does not reuse or derive from an old GPM asset without explicit approval;
- it feels premium, credible, culturally specific, and appropriate for GPM;
- it passes visual, responsive, accessibility, performance, provenance, and publication-safety review.

## Workflow authority

This imagery workflow is the standing project standard. It applies to all future GPM image generation unless Rex explicitly supersedes it. A request to change or generate imagery does not authorize reuse of earlier assets merely because they are technically suitable or already approved.

## Services imagery record — 2026-08-25

- Scope: Services hero and “One challenge can require several kinds of expertise.”
- Creative authority: meeting-led GPM privacy and data-governance workflow above.
- Model/provider: hero—OpenAI GPT Image 2 Medium (configured generation model); integrated grounded update—OpenAI GPT Image 2 Medium through the subscription-backed `openai-codex` image generator.
- Method: genuinely new text-to-image generations. No supplied reference, existing GPM production image, or other image was provided to the model as an input. Screenshots were used outside the model only to assess placement, focal position and crop resilience.
- Hero source: accepted master `.hermes/generated/gpm-services-hero-new.png`, 1664 × 936 PNG, SHA-256 `fff1acb52eca1721a3aa89a716a3e615822b75d0baa913cff21f0183f831cf71`. It was accepted on the first generation after a minimal centred lossless crop of the 1672 × 941 generated output to exact 16:9; no scene edit was made.
- Hero derivative: `public/images/gpm-services-privacy-impact-data-flow-lagos-2026.webp`, 1664 × 936, SHA-256 `b3f85dbd00374463e3862fb2f00a9e7966d6a8c3f0669b6cce46f43465f9969b`, metadata-stripped high-quality lossy WebP. Derivative creation did not resize or crop the accepted master.
- Integrated generation: subscription-backed OpenAI GPT Image 2 Medium, text-to-image only; accepted grounded master 1536 × 1024 PNG, SHA-256 `53cc2c53b336cc3ce8f72fa1987921fa55fce6b27e2b8458ce776f4e4eecde3e`; production derivative `public/images/gpm-services-integrated-grounded-brainstorming-nigeria-2026.webp`, 1536 × 1024, 195458 bytes, SHA-256 `860cf22b283aba23d0cff438ed50ad182db014f6e507af3c97a95782e8231f21`.
- Integrated inclusion and activity direction: exactly three Nigerian professionals in a familiar collaborative work session, including a Muslim woman in a refined hijab and a man in native attire with an understated northern Nigerian embroidered cap. They brainstorm around two ordinary laptops, notebooks, working papers and a simple paper data-flow sketch. Cultural details are contemporary and professional rather than costume-like; the activity is grounded and immediately relatable rather than staged or abstract. The prior inclusive candidate was rejected because strings, grids and symbolic workflow props made the activity too conceptual. A first grounded candidate was then rejected for lower-right caption intrusion and legible generated document text; one clean regeneration produced the accepted image.
- Disclosure: subjects are AI-generated illustrative people—not GPM personnel, clients, or participants in a real engagement.
- QA: production derivatives are binary-locked in deterministic tests and must pass browser loading, responsive crop, Axe A/AA, motion, no-JavaScript, performance, and publication-safety checks before release.

## Current status

- Mobile navigation has been restored to the branded square-toggle, top-takeover pattern.
- Global/mobile quick-check access remains first-party and native.
- Mobile quick-check overlay now opens beneath the sticky header instead of underneath it, preserving immediate visibility of the title and intro copy on first open.

## Next likely priorities

- Verify the pushed branch on the hosted preview in an iPhone-width viewport after each mobile-shell adjustment.
- Keep header, consent, mobile navigation, and quick-check overlays from competing for the same viewport zone on first load.

## Handoff log

- 2026-08-31: Corrected the mobile quick-check overlay geometry after stakeholder review. Root cause was the mobile sheet using full viewport height while the sticky header stayed above it in stacking order, causing the quick-check intro to sit under the header. Fix: start the overlay below the header (`84px` tablet/mobile shell, `76px` phone shell), remove the bottom-sheet treatment on mobile, and tighten the mobile quick-check header/body spacing so the intro content remains visible without clutter. Verified with `npm run verify`, `npm run build`, and a Playwright iPhone 12 screenshot/measurement showing header bottom `77px`, overlay top `76px`, title visible at `132.5px`, and intro visible at `167.02px`.
