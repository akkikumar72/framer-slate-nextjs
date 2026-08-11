# Plan 004: Make all preview forms truthful

> **Executor instructions**: Preserve each template's design and local
> validation. Change only submission truthfulness. Do not create endpoints,
> persistence, analytics, or cross-app abstractions. Run the browser regression
> tests from plan 003. The reviewer owns the plan index and publication.
>
> **Drift check (run first)**:
> `git diff --stat e5c073c -- apps/fuel/components/fuel/contact apps/grovia/components/GroviaPage.tsx apps/grovia/components/GroviaPage.module.css apps/rivero/components/rivero/routes/static apps/saazai/components/saazai apps/payble/components/payble/PaybleInteractive.tsx apps/pilar/components/pilar/PliarSecondary.tsx apps/dashfluence/components/dashfluence tests`
> and `git status --short`.
> Expected test drift comes from plan 003. Any form-source drift before this
> plan is a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: `plans/003-add-browser-interaction-coverage.md`
- **Category**: bug
- **Planned at**: commit `e5c073c`, 2026-08-10

## Why this matters

Twelve forms either do nothing silently or claim that a message/subscription
was delivered despite having no network or server boundary. Several also reset
the only copy of the user's input. These are static template previews, so the
correct behavior is to validate locally, preserve input, and explicitly state
that nothing was sent or booked.

## Current state

Forms to change:

| App / surface | File and current behavior |
|---|---|
| Fuel contact | `ContactForm.tsx:7-13`; only `preventDefault()` |
| Grovia contact/newsletter | `GroviaPage.tsx:799-859`; both silently prevent |
| Rivero contact/appointment | `RiveroStaticPages.tsx:210-230`; shared silent handler |
| Saazai newsletter | `SaazaiShell.tsx:94-106`; says user is on list, resets |
| Saazai contact | `company/ContactForm.tsx:29-43`; says received, resets |
| Payble newsletter | `PaybleInteractive.tsx:394-425`; promises inbox delivery |
| Payble contact | same file `:429-497`; implies team handoff, resets |
| Pilar contact | `PliarSecondary.tsx:69-84,202-208`; implies team handoff |
| Dashfluence newsletter | `DashfluenceShell.tsx:210-228`; says Sent/on list, resets |
| Dashfluence contact | `DashfluenceStaticPages.tsx:90-94`; promises follow-up, resets |

Truthful local exemplars to match semantically, not visually:

- Agenio `AgenioShell.tsx:235-250`: says validation happened and an endpoint is
  required.
- Agentik `static/ContactForm.tsx:7-51`: visible `Validated locally` plus
  `No information was sent`.
- Jayden `shared/JaydenSections.tsx:432-513`: reproduces local state while
  explicitly denying delivery.
- Pilar newsletter `PliarShell.tsx:269-304`: delivery is not connected.

There are 16 total forms. The four exemplars above must remain unchanged.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Form inventory | `rg -n '<form\b' apps --glob '*.tsx'` | 16 form elements |
| Target checks | `npx turbo run check --filter=@framer-templates/fuel --filter=@framer-templates/grovia --filter=@framer-templates/rivero --filter=@framer-templates/saazai --filter=@framer-templates/payble --filter=@framer-templates/pilar --filter=@framer-templates/dashfluence` | exit 0 |
| Target builds | `npx turbo run build --filter=@framer-templates/fuel --filter=@framer-templates/grovia --filter=@framer-templates/rivero --filter=@framer-templates/saazai --filter=@framer-templates/payble --filter=@framer-templates/pilar --filter=@framer-templates/dashfluence` | exit 0, fresh production output |
| Form browser tests | `npx playwright test tests/preview-forms.spec.ts` | 7 app tests pass |
| Full gate | `npm run verify` | exit 0 |

## Scope

**In scope**:

- `apps/fuel/components/fuel/contact/ContactForm.tsx`
- `apps/fuel/components/fuel/contact/ContactPage.module.css`
- `apps/grovia/components/GroviaPage.tsx`
- `apps/grovia/components/GroviaPage.module.css`
- `apps/rivero/components/rivero/routes/static/RiveroStaticPages.tsx`
- `apps/rivero/components/rivero/routes/static/RiveroStaticPages.module.css`
- `apps/saazai/components/saazai/SaazaiShell.tsx`
- `apps/saazai/components/saazai/company/ContactForm.tsx`
- `apps/payble/components/payble/PaybleInteractive.tsx`
- `apps/pilar/components/pilar/PliarSecondary.tsx`
- `apps/dashfluence/components/dashfluence/shared/DashfluenceShell.tsx`
- `apps/dashfluence/components/dashfluence/static/DashfluenceStaticPages.tsx`
- `tests/preview-forms.spec.ts` (create)
- `tests/helpers/template-server.ts` only if a small reusable export is needed

**Out of scope**:

- Any real request, server action, API route, form provider, database, or email
- Consent/privacy/legal copy, analytics, CAPTCHA, rate limits, or environment vars
- Redesigning the forms or normalizing their markup/styles across templates
- Changing the four already-truthful forms
- Fixing unrelated marketing copy, links, or placeholder addresses

## Git workflow

- Branch: `fix/repository-verification-and-quality`
- Do not commit or push before reviewer approval of all plans.

## Steps

### Step 1: Replace misleading success semantics with explicit preview status

For each existing stateful handler, keep current native/custom validation, do
not reset the form, and clear the status on subsequent input. Use visible
`role="status"` or `aria-live="polite"`. Use these exact messages so tests and
review language are deterministic:

| Form | Truthful message |
|---|---|
| Fuel contact | `Preview only. No job request was sent.` |
| Grovia contact | `Preview only. No message was sent.` |
| Grovia newsletter | `Preview only. No subscription was created.` |
| Rivero contact | `Validated locally. No message was sent.` |
| Rivero appointment | `Validated locally. No appointment was booked.` |
| Saazai newsletter | `Email validated locally. Newsletter delivery is not connected in this demo.` |
| Saazai contact | `Details validated locally. No information was sent.` |
| Payble newsletter | `Email validated locally. Newsletter delivery is not connected in this demo.` |
| Payble contact | `Details validated locally. No information was sent.` |
| Pilar contact | `Validated locally. No information was sent.` |
| Dashfluence newsletter | `Email validated locally. Newsletter delivery is not connected in this demo.` |
| Dashfluence contact | `Details validated locally. No information was sent.` |

For Dashfluence newsletter, remove `sent` naming, the disabled `Sent` button
state, and reset behavior. The button remains actionable and the status carries
the truth. Do not imply a delivery attempt.

**Verify**:

```sh
rg -n 'You.re on the list|has been received|We.ll be in touch|Watch your inbox|ready for (the )?(Payble|our) team|\? "Sent"' apps --glob '*.tsx'
```

Expected: no matches from these twelve form handlers.

### Step 2: Add reserved status space only where none exists

Fuel, Grovia, and Rivero currently have no result slot. Add small status styles
inside their existing CSS modules. Match each app's typography/color and
reserve enough height that a one-line status does not move or overlap controls
at 390px or 1440px. Do not restyle inputs/buttons.

In source, use separate status state for Rivero contact and appointment rather
than one shared global message. Replace the shared `stopForm` with handlers
inside or adjacent to the relevant components, following existing `useState`
style.

**Verify**: target workspace typechecks/checks exit 0.

### Step 3: Add real-browser regression coverage for all twelve forms

Create `tests/preview-forms.spec.ts` using plan 003's discovery/server helper.
Use one serial app test for each of Fuel, Grovia, Rivero, Saazai, Payble, Pilar,
and Dashfluence; within an app test, cover both forms where applicable.

For each form:

1. Navigate to the surface (`/contact`, `/contact-us`, `/appointment`, or the
   app root as appropriate).
2. Confirm currently required invalid inputs remain blocked.
3. Fill a valid local-only example using non-sensitive fake values.
4. After scrolling/filling settles, wait for network idle, then start network
   collection immediately before clicking submit. Fail every
   POST/PUT/PATCH/DELETE request and every non-prefetch fetch/XHR. Ignore only
   requests explicitly marked as Next router prefetch by
   `next-router-prefetch` or `purpose: prefetch`; do not broadly ignore GETs.
5. Assert the exact truthful status is visible.
6. Assert at least the email/name input still contains its value after submit.
7. Edit an input and assert stale success status clears where the handler owns
   an editable status state.

Do not assert CSS positions in code. Reviewer visual evidence covers layout.
Before running the suite, inspect all twelve status nodes' DOM ownership once.
Grovia and Saazai newsletter status nodes are siblings of their `<form>`, so
pass explicit page/section-scoped status locators to the shared helper rather
than assuming every status is a form descendant. Keep submit controls and
retained-input assertions form-scoped.

**Verify**:

```sh
npx turbo run build --filter=@framer-templates/fuel --filter=@framer-templates/grovia --filter=@framer-templates/rivero --filter=@framer-templates/saazai --filter=@framer-templates/payble --filter=@framer-templates/pilar --filter=@framer-templates/dashfluence
npx playwright test tests/preview-forms.spec.ts
```

Expected: 7 app tests pass, covering all twelve changed forms.

### Step 4: Run targeted and full gates

Run the targeted Turbo checks, all browser tests, then full verify. If the new
status text exposes a route-marker mismatch, correct the contract only if the
marker was the old misleading success copy; otherwise stop.

**Verify**:

```sh
npx turbo run check --filter=@framer-templates/fuel --filter=@framer-templates/grovia --filter=@framer-templates/rivero --filter=@framer-templates/saazai --filter=@framer-templates/payble --filter=@framer-templates/pilar --filter=@framer-templates/dashfluence
npx turbo run build --filter=@framer-templates/fuel --filter=@framer-templates/grovia --filter=@framer-templates/rivero --filter=@framer-templates/saazai --filter=@framer-templates/payble --filter=@framer-templates/pilar --filter=@framer-templates/dashfluence
npm run test:browser
npm run verify
```

Expected: all exit 0.

## Test plan

- Seven browser tests cover twelve forms and assert no write/XHR/fetch occurs.
- Existing native validation behavior remains; the tests do not add new product
  requirements to fields that were optional before.
- Tests assert retained input, visible status, and status clearing.
- During reviewer evidence capture, inspect representative contact/newsletter
  states at 390px and 1440px, especially fixed-height Fuel/Grovia/Rivero areas.

## Done criteria

- [ ] All 12 silent/misleading forms show an explicit no-send/no-book status.
- [ ] No changed handler resets user input or disables itself as if delivered.
- [ ] All result text is visible and announced accessibly.
- [ ] The four truthful exemplars remain byte-for-byte unchanged.
- [ ] Seven browser tests prove all 12 forms make no write/fetch/XHR request.
- [ ] Target checks, browser suite, and full verify pass.
- [ ] No endpoint, shared form abstraction, or unrelated redesign was added.

## STOP conditions

- An actual endpoint or provider is expected. That requires separate decisions
  for privacy, consent, abuse controls, secrets, errors, and retries.
- A current form already sends data at runtime despite the cited handler.
- Truthful status requires broad copy or layout redesign.
- Status overlaps or shifts fixed-height layouts at 390px or 1440px.
- A test can pass only by ignoring network writes or weakening visible status.
- A verification command fails twice after one narrow correction attempt.

## Maintenance notes

When a deployer later connects a real backend, replace the preview message only
after the handler receives an actual server success response. Preserve pending,
error, retry, consent, and abuse behavior in that separate production feature.
Do not let visually convincing templates imply delivery without evidence.
