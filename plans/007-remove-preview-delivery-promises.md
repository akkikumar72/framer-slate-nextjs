# Plan 007: Remove delivery promises from local-only preview forms

> **Executor instructions**: Change only the three directly contradictory
> pieces of form-adjacent copy named here. Preserve each design, form handler,
> validation rule, and exact local-only status message. Add focused browser
> assertions and real UI evidence. The reviewer owns `plans/README.md` and
> publication.
>
> **Drift check (run first)**:
>
> ```sh
> git diff --exit-code 67820ad -- \
>   apps/fuel/components/fuel/contact/ContactForm.tsx \
>   apps/pilar/components/pilar/PliarSecondary.tsx \
>   apps/saazai/components/saazai/SaazaiShell.tsx \
>   tests/preview-forms.spec.ts \
>   output/playwright/landing-pages/repository-quality-preview-copy.png
> test ! -e output/playwright/landing-pages/repository-quality-preview-copy.png
> { git diff --name-only 67820ad --; git ls-files --others --exclude-standard; } \
>   | LC_ALL=C sort -u
> ```
>
> The first two commands must exit 0. The final command must list exactly the
> eight Plan 006/reviewer paths below and no others:
>
> ```text
> README.md
> package-lock.json
> package.json
> plans/006-typecheck-browser-harness.md
> plans/007-remove-preview-delivery-promises.md
> plans/README.md
> tests/helpers/template-server.ts
> tests/tsconfig.json
> ```
>
> Any change to the three form surfaces, their browser tests, the exact output
> PNG, or any unlisted path is a STOP condition until reconciled.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/004-make-preview-forms-truthful.md`,
  `plans/006-typecheck-browser-harness.md`
- **Category**: bug
- **Planned at**: commit `67820ad`, 2026-08-10

## Why this matters

Plan 004 made submission results honest, but three form-adjacent sentences
still promise delivery or human follow-up that these static previews cannot
perform. Users can read a 24-hour kickoff, quick response, or weekly delivery
promise immediately before receiving a local-only status. Replace only those
contradictions and lock the corrected copy into the existing browser suite.

## Current state

These claims predate the reviewed branch, but now directly contradict the
local-only behavior added by plan 004:

| Surface | Existing promise | Existing truthful result |
|---|---|---|
| Fuel contact | `ContactForm.tsx:24-26`: `submit a job request` and `kickoff within 24 hours` | line 12: `Preview only. No job request was sent.` |
| Pilar contact | `PliarSecondary.tsx:95`: `we’ll get back to you quickly` | line 205: `Validated locally. No information was sent.` |
| Saazai newsletter | `SaazaiShell.tsx:172`: `We’ll send you weekly updates` | lines 104-106: newsletter delivery is not connected |

Use the exact replacement copy below to keep browser assertions deterministic:

| Surface | Replacement |
|---|---|
| Fuel contact | `Preview a project request with the form below.` then the existing `<br />`, then `Connect form delivery before accepting submissions.` |
| Pilar contact | `Preview the inquiry flow below. This demo does not contact a team.` |
| Saazai newsletter | `* Preview only. Connect newsletter delivery before accepting subscriptions.` |

Repository conventions to preserve:

- The three components are client components with local state; copy edits do
  not require state or handler changes.
- `tests/preview-forms.spec.ts` already owns production-browser coverage for all
  three apps and uses role/label locators plus exact local-only result strings.
- Form submissions must continue making no write request or non-prefetch
  fetch/XHR, retaining input, and clearing status on edit.
- User-facing UI changes require a real runnable-UI screenshot with concise,
  reviewer-focused callouts. The existing committed evidence lives in
  `output/playwright/landing-pages/`.

## Commands you will need

Run after `nvm use`; the repository requires Node `22.22.3` and npm `10.9.8`.

| Purpose | Command | Expected on success |
|---|---|---|
| Contradiction scan | `rg -n 'kickoff|within 24 hours|get back to you quickly|send you weekly updates' apps/fuel/components/fuel/contact/ContactForm.tsx apps/pilar/components/pilar/PliarSecondary.tsx apps/saazai/components/saazai/SaazaiShell.tsx` | no matches after edits |
| Target checks | `npx turbo run check --filter=@framer-templates/fuel --filter=@framer-templates/pilar --filter=@framer-templates/saazai` | 3 tasks pass |
| Target builds | `npx turbo run build --filter=@framer-templates/fuel --filter=@framer-templates/pilar --filter=@framer-templates/saazai` | 3 fresh production builds pass |
| Focused browser tests | `npx playwright test tests/preview-forms.spec.ts --grep 'Fuel|Saazai|Pilar'` | 3 tests pass |
| All form tests | `npx playwright test tests/preview-forms.spec.ts` | 7 tests pass |
| Full acceptance | `npm run verify` | exit 0; all repository gates pass |

## Scope

**In scope**:

- `apps/fuel/components/fuel/contact/ContactForm.tsx`
- `apps/pilar/components/pilar/PliarSecondary.tsx`
- `apps/saazai/components/saazai/SaazaiShell.tsx`
- `tests/preview-forms.spec.ts`
- `output/playwright/landing-pages/repository-quality-preview-copy.png`
  (create from the real built UI)

**Read-only fixtures**:

- The CSS modules used by all three components
- `tests/helpers/template-server.ts`
- All `template.config.json` files
- The twelve local-only form status messages in plan 004

**Out of scope**:

- A real endpoint, provider, email, persistence, analytics, consent, CAPTCHA,
  error/retry flow, or pending state
- Any handler, validation, form-control, status, route, or metadata change
- CSS/layout changes, component extraction, or cross-template abstractions
- Dashfluence's newsletter invitation and other neutral calls to action that do
  not promise completed delivery
- Placeholder phone numbers, addresses, mailboxes, general marketing claims,
  or repository-wide copy editing
- Generated/mock UI evidence or screenshots from an unbuilt development page

## Git workflow

- Continue on `fix/repository-verification-and-quality`; this plan extends the
  existing draft PR after plan 006.
- Keep source, regression assertions, and reviewer evidence as one logical
  review unit. Do not rewrite existing commit history.
- Do not push or update the PR unless the operator explicitly dispatches a
  publisher after review.

## Steps

### Step 1: Replace only the three contradictory promises

Apply the exact replacement strings from the Current state table:

1. In Fuel, preserve the `<p>` and `<br />`; replace only its two text lines.
2. In Pilar, replace only the `contactLead` sentence.
3. In Saazai, preserve the explanatory `<p>` and leading `*`; replace only its
   text.

Do not change any state, handler, form markup, result string, CSS class, link,
or surrounding marketing section.

**Verify**:

```sh
rg -n 'kickoff|within 24 hours|get back to you quickly|send you weekly updates' \
  apps/fuel/components/fuel/contact/ContactForm.tsx \
  apps/pilar/components/pilar/PliarSecondary.tsx \
  apps/saazai/components/saazai/SaazaiShell.tsx
rg -n 'Connect form delivery before accepting submissions|This demo does not contact a team|Connect newsletter delivery before accepting subscriptions' \
  apps/fuel/components/fuel/contact/ContactForm.tsx \
  apps/pilar/components/pilar/PliarSecondary.tsx \
  apps/saazai/components/saazai/SaazaiShell.tsx
```

Expected: the first search returns no matches. The second returns exactly one
match from each of the three files.

### Step 2: Extend the existing browser regression without changing form behavior

In `tests/preview-forms.spec.ts`, add this constant beside `messages`:

```ts
const previewCopy = {
  fuelContact:
    "Preview a project request with the form below. Connect form delivery before accepting submissions.",
  pilarContact:
    "Preview the inquiry flow below. This demo does not contact a team.",
  saazaiNewsletter:
    "* Preview only. Connect newsletter delivery before accepting subscriptions.",
} as const;
```

In the existing Fuel, Saazai, and Pilar tests, immediately after opening the
relevant route:

- for Fuel, assert the form-intro paragraph has the normalized full
  `previewCopy.fuelContact` text across its retained `<br />`;
- for Pilar and Saazai, assert their corresponding `previewCopy` text is
  visible with `exact: true` in the existing page/newsletter scope;
- assert the old promise is absent by its unique phrase (`within 24 hours`,
  `get back to you quickly`, or `send you weekly updates`);
- retain every existing invalid-input, no-network, retained-input, status, and
  status-clearing assertion unchanged.

Use the page/section scope already present in each test. Do not create a new
test file, duplicate server startup, or weaken the shared request collector.

**Verify**:

```sh
npm run typecheck:browser
npx turbo run check --filter=@framer-templates/fuel --filter=@framer-templates/pilar --filter=@framer-templates/saazai
npx turbo run build --filter=@framer-templates/fuel --filter=@framer-templates/pilar --filter=@framer-templates/saazai
npx playwright test tests/preview-forms.spec.ts --grep 'Fuel|Saazai|Pilar'
```

Expected: the typecheck passes, 3 application checks/builds pass, and the 3
focused browser tests pass against fresh production output.

### Step 3: Capture real reviewer evidence at phone and desktop sizes

Use a temporary Playwright spec so the evidence workflow is reproducible and
uses the same bounded, one-at-a-time production server lifecycle as the main
suite. Create `tests/preview-copy-evidence.tmp.spec.ts` with the exact code
below. This file is execution scaffolding only and must be deleted with
`apply_patch` after the capture passes.

```ts
import {
  expect,
  test,
  type Locator,
  type Page,
} from "@playwright/test";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { findTemplate, startTemplate } from "./helpers/template-server";

const previewCopy = {
  fuelContact:
    "Preview a project request with the form below. Connect form delivery before accepting submissions.",
  pilarContact:
    "Preview the inquiry flow below. This demo does not contact a team.",
  saazaiNewsletter:
    "* Preview only. Connect newsletter delivery before accepting subscriptions.",
} as const;

const messages = {
  fuelContact: "Preview only. No job request was sent.",
  pilarContact: "Validated locally. No information was sent.",
  saazaiNewsletter:
    "Email validated locally. Newsletter delivery is not connected in this demo.",
} as const;

type CaptureState = {
  copy: Locator;
  status: Locator;
  surface: Locator;
};

type Target = {
  name: string;
  prepare: (page: Page) => Promise<CaptureState>;
  route: string;
  slug: string;
};

const targets: Target[] = [
  {
    name: "Fuel contact",
    route: "/contact",
    slug: "fuel",
    async prepare(page) {
      const form = page.locator("form").filter({
        has: page.getByRole("button", { name: "Submit", exact: true }),
      });
      const copy = form.locator("p").filter({
        hasText: "Preview a project request with the form below.",
      });
      await expect(copy).toHaveText(previewCopy.fuelContact);
      await form.getByLabel("First Name*").fill("Preview");
      await form.getByLabel("Last Name*").fill("Visitor");
      await form.getByRole("button", { name: "Submit", exact: true }).click();
      const status = form.getByRole("status");
      await expect(status).toHaveText(messages.fuelContact);
      return { copy, status, surface: form };
    },
  },
  {
    name: "Pilar contact",
    route: "/contact",
    slug: "pilar",
    async prepare(page) {
      const surface = page.getByRole("main");
      const form = surface.locator("form").filter({
        has: page.locator('[name="purpose"]'),
      });
      const copy = surface.getByText(previewCopy.pilarContact, { exact: true });
      await expect(copy).toBeVisible();
      await form.getByLabel("Name").fill("Preview Visitor");
      await form.getByLabel("Email").fill("preview@example.com");
      await form.getByLabel("Contact Purpose").selectOption("general");
      await form.getByLabel("How can we help?").fill("A local-only inquiry.");
      await form.getByRole("button", { name: "Send Inquiry" }).click();
      const status = form.getByRole("status");
      await expect(status).toHaveText(messages.pilarContact);
      return { copy, status, surface };
    },
  },
  {
    name: "Saazai newsletter",
    route: "/",
    slug: "saazai",
    async prepare(page) {
      const surface = page
        .getByRole("heading", { name: "Join Our Newsletter" })
        .locator("..");
      const form = surface.locator("form").filter({
        has: page.locator("#saazai-newsletter"),
      });
      const copy = surface.getByText(previewCopy.saazaiNewsletter, {
        exact: true,
      });
      await expect(copy).toBeVisible();
      await form.getByLabel("Email address").fill("preview@example.com");
      await form.getByRole("button", { name: "Subscribe" }).click();
      const status = surface.getByRole("status");
      await expect(status).toHaveText(messages.saazaiNewsletter);
      return { copy, status, surface };
    },
  },
];

const viewports = [
  { height: 844, label: "Phone 390 x 844", width: 390 },
  { height: 900, label: "Desktop 1440 x 900", width: 1440 },
] as const;

test.setTimeout(240_000);

test("captures the three truthful preview surfaces at both viewports", async ({
  browser,
}) => {
  const outputPath = path.join(
    process.cwd(),
    "output/playwright/landing-pages/repository-quality-preview-copy.png",
  );
  const shots: Array<{
    image: string;
    name: string;
    preSubmit: string;
    status: string;
    viewport: string;
  }> = [];

  for (const target of targets) {
    const server = await startTemplate(findTemplate(target.slug));
    try {
      for (const viewport of viewports) {
        const context = await browser.newContext({
          reducedMotion: "reduce",
          viewport: { height: viewport.height, width: viewport.width },
        });
        try {
          const page = await context.newPage();
          const response = await page.goto(
            new URL(target.route, `${server.baseUrl}/`).toString(),
            { waitUntil: "domcontentloaded" },
          );
          expect(response?.status()).toBe(200);
          const state = await target.prepare(page);
          await state.surface.scrollIntoViewIfNeeded();
          await expect(state.copy).toBeVisible();
          await expect(state.status).toBeVisible();
          const image = await state.surface.screenshot({
            animations: "disabled",
          });
          shots.push({
            image: image.toString("base64"),
            name: target.name,
            preSubmit: await state.copy.innerText(),
            status: await state.status.innerText(),
            viewport: viewport.label,
          });
        } finally {
          await context.close();
        }
      }
    } finally {
      await server.stop();
    }
  }

  expect(shots).toHaveLength(6);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  const reviewPage = await browser.newPage({
    viewport: { height: 900, width: 2400 },
  });
  try {
    const cards = shots
      .map(
        (shot) => `
          <article>
            <h2>${shot.name}. ${shot.viewport}</h2>
            <p><strong>Before submit:</strong> ${shot.preSubmit}</p>
            <p><strong>After submit:</strong> ${shot.status}</p>
            <p><strong>Layout:</strong> ${shot.viewport} inspected in the real production UI.</p>
            <img alt="${shot.name} at ${shot.viewport}" src="data:image/png;base64,${shot.image}">
          </article>`,
      )
      .join("");
    await reviewPage.setContent(`
      <!doctype html>
      <html>
        <head>
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; padding: 48px; background: #111; color: #fff;
              font: 24px/1.35 system-ui, sans-serif; }
            h1 { margin: 0 0 32px; font-size: 48px; }
            main { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 32px; }
            article { padding: 28px; border: 3px solid #ffd84d; border-radius: 20px;
              background: #202020; }
            h2 { margin: 0 0 18px; font-size: 32px; }
            p { margin: 8px 0; }
            strong { color: #ffd84d; }
            img { display: block; width: 100%; max-height: 900px; margin-top: 22px;
              object-fit: contain; object-position: top; background: #fff; }
          </style>
        </head>
        <body>
          <h1>Local-only preview forms. Real production UI</h1>
          <main>${cards}</main>
        </body>
      </html>
    `);
    await expect(reviewPage.locator("article")).toHaveCount(6);
    await reviewPage.locator("img").evaluateAll(async (images) => {
      await Promise.all(
        images.map((node) => {
          const image = node as HTMLImageElement;
          if (image.complete) return Promise.resolve();
          return new Promise<void>((resolve, reject) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => reject(), { once: true });
          });
        }),
      );
    });
    await reviewPage.screenshot({ fullPage: true, path: outputPath });
    expect(statSync(outputPath).size).toBeGreaterThan(0);
  } finally {
    await reviewPage.close();
  }
});
```

Run the temporary capture after the three fresh builds from Step 2:

```sh
npm run typecheck:browser
npx playwright test tests/preview-copy-evidence.tmp.spec.ts
```

Expected: the typecheck passes and the one capture test passes. The test itself
starts each built app serially, asserts HTTP 200, submits the real form in all
six app/viewport combinations, requires the exact truthful copy and local-only
status to be visible, creates six labeled callout cards, and writes only:

```text
output/playwright/landing-pages/repository-quality-preview-copy.png
```

Delete `tests/preview-copy-evidence.tmp.spec.ts` with `apply_patch`. Do not keep
the temporary spec or raw intermediary screenshots. Then verify:

```sh
test ! -e tests/preview-copy-evidence.tmp.spec.ts
test -s output/playwright/landing-pages/repository-quality-preview-copy.png
file output/playwright/landing-pages/repository-quality-preview-copy.png
git status --short --untracked-files=all
```

Expected: the temporary spec is absent and `file` identifies a PNG. Open the
absolute PNG path with the local `view_image` tool. Confirm all six cards are
present, both exact callouts are readable in every card, and neither UI crop
clips or overlaps the changed copy/status. One evidence-layout-only correction
and recapture is allowed; any source/CSS correction is a STOP condition.

### Step 4: Run all form and repository acceptance gates

Run the complete form suite first, then the repository gate. Do not rely on
Turbo cache output from before the copy changes for the three target apps.

**Verify**:

```sh
npx playwright test tests/preview-forms.spec.ts
npm run verify
git diff --check 67820ad -- \
  apps/fuel/components/fuel/contact/ContactForm.tsx \
  apps/pilar/components/pilar/PliarSecondary.tsx \
  apps/saazai/components/saazai/SaazaiShell.tsx \
  tests/preview-forms.spec.ts
test ! -e tests/preview-copy-evidence.tmp.spec.ts
{ git diff --name-only 67820ad --; git ls-files --others --exclude-standard; } \
  | LC_ALL=C sort -u
```

Expected: 7 form tests pass; full verify exits 0; diff check is empty; the
temporary spec is absent; and the combined tracked/untracked list contains
exactly:

```text
README.md
apps/fuel/components/fuel/contact/ContactForm.tsx
apps/pilar/components/pilar/PliarSecondary.tsx
apps/saazai/components/saazai/SaazaiShell.tsx
output/playwright/landing-pages/repository-quality-preview-copy.png
package-lock.json
package.json
plans/006-typecheck-browser-harness.md
plans/007-remove-preview-delivery-promises.md
plans/README.md
tests/helpers/template-server.ts
tests/preview-forms.spec.ts
tests/tsconfig.json
```

`git status --short --untracked-files=all` must show the same 13 paths and no
others. The existing Dashfluence evidence is already part of commit `67820ad`
and is not a new allowed delta here.

## Test plan

- Extend the three existing app tests rather than adding new server cycles.
- Each test proves the new neutral copy is visible and its old promise is gone.
- Preserve plan 004's behavioral assertions: invalid input remains blocked,
  submission makes no write/non-prefetch fetch/XHR, input remains, the exact
  local-only status is visible, and editing clears stale status.
- Run the three focused tests after fresh target builds, then all seven form
  tests, then full `verify`.
- Inspect the real UI evidence at both 390×844 and 1440×900.

## Done criteria

- [ ] Fuel no longer promises submission or a 24-hour kickoff.
- [ ] Pilar no longer promises a quick team response.
- [ ] Saazai no longer promises weekly newsletter delivery.
- [ ] The three exact replacement strings are visible in production-browser
  tests and the old strings are absent.
- [ ] All existing form handlers, validation, statuses, and no-network
  assertions remain unchanged and pass.
- [ ] The three target checks/builds and focused 3-test run pass.
- [ ] All 7 form tests and full `npm run verify` pass.
- [ ] The final evidence PNG is present in the reviewed diff and shows six real
  production-UI states with readable phone/desktop callouts.
- [ ] The temporary evidence spec and raw captures are absent.
- [ ] The final combined tracked/untracked audit contains exactly the 13 paths
  listed in Step 4 and no others.

## STOP conditions

- Any of the three existing local-only status messages or form handlers has
  drifted since commit `67820ad`.
- Removing a promise requires CSS/layout changes or a broader copy rewrite.
- A target route/config marker depends on one of the old promise strings.
- Browser assertions pass only by using CSS-module hashes, fixed sleeps, or
  weakening the existing no-network checks.
- Real UI evidence clips or overlaps at either required viewport after one
  concise-copy correction attempt.
- A verification command fails twice after one narrow correction attempt.

## Maintenance notes

These templates remain static previews. If a deployer later connects real
delivery, change the pre-submit copy and post-submit status together only after
the backend reports actual success. Other marketing copy remains intentionally
outside this plan unless it directly claims an action the preview performs.
