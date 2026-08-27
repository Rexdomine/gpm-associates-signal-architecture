# 2026-08-27 — Contact page implementation plan

Plan file: `docs/plans/2026-08-27-contact-page.md`

## Goal

Implement a production-quality `/contact` route for GPM Associates so the repeated “Speak with an advisor” CTA resolves to a real, reviewable destination.

## Contract assumptions

No separate contact mockup was present in the repository, so the route contract is derived from the already-approved site language and CTA pathways:

- route title should center the repeated CTA language: “Speak with an advisor”
- page tone should stay premium, formal, calm and practical
- the route should make it easy to start a conversation by email or phone
- the route should support Governance Library package guidance as well as broader advisory discussions
- the route should reuse the consent-aware map pattern already established in the shared footer
- the page should avoid unsupported claims such as response times, operating hours or named staff availability

## Planned structure

1. Dark hero with a new editorial consultation image, direct CTA and expectation signals.
2. Direct contact options for email, phone and NDPC breach-reporting urgency.
3. Guided enquiry section with a first-party form that drafts a `mailto:` message rather than pretending a backend submit exists.
4. Location and map section using the existing consent-gated map component.
5. FAQ and final urgency CTA.

## Imagery

- Generate a fresh GPT Image 2 editorial image specific to the contact route.
- Use a one-to-one advisory consultation scene with credible African professionals and visible privacy/governance working context.
- Convert to a local WebP production asset and lock checksum in tests and README provenance.

## Validation plan

- Add route-specific tests for exact copy, section order, contact details, form behavior contract and asset provenance.
- Run `npm run verify`.
- Run `npm run build`.
- Run browser QA on the route in a production-like runtime and then publish an exact-head Vercel preview with the PR handoff.
