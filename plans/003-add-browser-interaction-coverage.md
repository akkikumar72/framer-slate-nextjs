# Plan 003: Add serial Chromium interaction coverage for every app

> **Executor instructions**: Build the smallest reliable browser baseline
> described here. Run one Next production server at a time. Do not broaden it
> into visual regression, cross-browser, or exhaustive route coverage. The
> reviewer owns `plans/README.md`. Do not commit or push until the complete
> five-plan diff is approved.
>
> **Drift check (run first)**:
> `git diff --stat e5c073c -- package.json package-lock.json .github/workflows/ci.yml README.md apps/*/package.json apps/*/template.config.json packages/template-validation/bin/template-validation.mjs`
> and `git status --short`.
> Expected drift is only from plans 001-002. If package scripts/config shapes
> differ materially from the current-state section, stop and report.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: LOW
- **Depends on**: `plans/001-restore-ci-and-catalog.md`,
  `plans/002-prove-route-identity.md`
- **Category**: tests
- **Planned at**: commit `e5c073c`, 2026-08-10

## Why this matters

The monorepo has 13 templates plus the showcase, but no browser/component test
runner. Existing route verification uses Node `fetch`; it never executes React
hydration, menus, tabs, dialogs, pricing toggles, carousels, or other client
behavior. Add one deterministic Chromium interaction per app, discovered from
the same template configs, while retaining the faster exhaustive HTTP route
layer.

## Current state

- Root `package.json:14-23` runs check, build, and route tests; its only root
  dev dependency is Turbo.
- `package-lock.json:1174-1188` mentions Playwright only as Next's optional peer;
  no Playwright package is installed.
- `.github/workflows/ci.yml:14-20` installs Node, runs `npm ci`, then verify.
- Every app has `package.json` and `template.config.json`; exactly 14 configs
  exist at the planned commit.
- Every app package exposes `build`, `start`, `check`, and `test:routes`.
- `packages/template-validation/bin/template-validation.mjs:168-198,282-319`
  demonstrates direct Next startup, isolated port selection, readiness polling,
  bounded output, and cleanup. Match this behavior rather than inventing a
  different server lifecycle.
- Existing `output/playwright/landing-pages/*.png` files are manual evidence,
  not a runnable test suite.

## Commands you will need

Use Node 22.22.3/npm 10.9.8 from plan 001.

| Purpose | Command | Expected on success |
|---|---|---|
| Add runner | `npm install --save-dev --save-exact @playwright/test@1.62.1` | exact dependency and lock entries added |
| Browser binary | `npx playwright install chromium` | exit 0 |
| Inventory | `npx playwright test --list` | 14 tests in one smoke file at this stage |
| Browser suite | `npm run build && npm run test:browser` | 14 passed, no servers left |
| Full gate | `npm run verify` | exit 0 |

## Suggested executor toolkit

- Apply the Karpathy coding guidelines: one helper, one guarded interaction map,
  no speculative test DSL.
- Use the existing validator's process lifecycle as the local pattern.
- Use Playwright role/name locators over CSS module class names whenever the UI
  exposes an accessible control.

## Scope

**In scope**:

- `package.json`
- `package-lock.json`
- `.github/workflows/ci.yml`
- `README.md`
- `playwright.config.ts` (create)
- `tests/helpers/template-server.ts` (create)
- `tests/template-smoke.spec.ts` (create)

**Read-only fixtures, do not edit in this plan**:

- All `apps/*/package.json`
- All `apps/*/template.config.json`
- All template components referenced by the interaction table
- `packages/template-validation/bin/template-validation.mjs`

**Out of scope**:

- Per-app Playwright scripts or 14 package edits
- Starting all 14 Next servers concurrently
- A JSON interaction DSL in template configs
- Visual snapshots or pixel-diff baselines
- Mobile, Firefox, WebKit, exhaustive route, or performance coverage
- Fixing an app interaction merely to make a new test pass. Stop and report a
  pre-existing regression instead.

## Git workflow

- Branch: `fix/repository-verification-and-quality`
- Keep changes uncommitted until reviewer approval.
- Final commit uses the conventional subject from plan 001.

## Steps

### Step 1: Add the exact browser dependency and scripts

Install exact `@playwright/test@1.62.1` with the pinned npm version. Add:

```json
"test:browser": "playwright test"
```

Append `&& npm run test:browser` to root `verify`, after route tests. Do not add
per-app scripts or change Turbo task definitions.

Inspect `package-lock.json`: expected new changes are the Playwright packages,
the root dev dependency, and plan 001's Dashfluence workspace repair. Unrelated
framework/dependency version changes are not acceptable.

**Verify**:

```sh
npm ci --dry-run --ignore-scripts
npx playwright --version
```

Expected: exit 0 and Playwright `1.62.1`.

### Step 2: Configure one deterministic Chromium project

Create `playwright.config.ts` with:

- `testDir: "./tests"`
- one Chromium project using Desktop Chrome-compatible context
- viewport 1280×900
- `timeout: 90_000`, leaving room beyond the 30-second readiness budget and
  three-second forced cleanup for interaction and invalid-route assertions
- `workers: 1`
- `retries: 0`
- `forbidOnly: Boolean(process.env.CI)`
- `contextOptions: { reducedMotion: "reduce" }`; `reducedMotion` is a browser
  context option in Playwright 1.62.1, not a top-level Test `use` option
- `trace: "retain-on-failure"`
- `screenshot: "only-on-failure"`
- `video: "off"`
- `outputDir: "output/playwright/test-results"`
- a concise line reporter locally and GitHub reporter in CI if supported

Do not define `webServer`; the test helper owns one-at-a-time lifecycle.
Existing `.gitignore` already ignores `output/playwright/*` except committed
landing-page images.

**Verify**: `npx playwright test --list` parses the config. It may report zero
tests until step 4, but must not error.

### Step 3: Add a reusable one-at-a-time Next server helper

Create `tests/helpers/template-server.ts` with these responsibilities:

1. Discover directories under `apps/` containing both `package.json` and
   `template.config.json`; sort by slug/name for deterministic output.
2. Parse package name plus config name, slug, port, routePrefix, first normal
   route, and every invalid route. Preserve plan 002's exact `title` or legacy
   `titleIncludes`, plus each invalid status and marker.
3. Resolve `next/dist/bin/next` from each app with
   `createRequire(appPackagePath).resolve(...)`.
4. Choose `config.port + 10000`, falling back to `+20000`, after probing
   127.0.0.1 availability.
5. Spawn `process.execPath` with the resolved Next CLI and
   `start --hostname 127.0.0.1 --port <isolatedPort>`, using the app directory
   as cwd and `NEXT_PUBLIC_SITE_URL` equal to the isolated base URL.
6. Capture the last 12,000 characters of stdout/stderr and poll the configured
   first route for at most 30 seconds.
7. Export bounded cleanup: SIGTERM, wait up to three seconds, then SIGKILL only
   if still running, and await the child's `close` event before resolving.
   Cleanup must execute from test `finally` blocks. If readiness fails after
   spawning but before the helper can return a controller, the helper itself
   must run that same bounded cleanup before rethrowing so no caller-less child
   can leak.

Do not call `npm run start`; direct Next execution avoids a nested process tree.

**Verify**: TypeScript compilation by `npx playwright test --list` produces no
module/type syntax error.

### Step 4: Add one guarded interaction per app

Create `tests/template-smoke.spec.ts`. Discover all templates through the
helper. Define an interaction handler map keyed by slug and assert at module
load that its sorted keys exactly match discovered slugs. A future app without
a handler, or a stale handler without an app, must fail before tests run.

Each generated test must:

1. Start only that app in the test body and clean it in `finally`.
2. Register `pageerror` and console-error collectors before navigation.
3. Navigate to the config's first normal route with `domcontentloaded`.
4. Assert response status, configured exact/title substring, canonical path,
   and configured marker visible in the hydrated page.
5. Run its handler below.
6. Visit every configured invalid route, assert its response status, and assert
   its marker is visible in the hydrated DOM. This is required because Next 16
   can stream `notFound()` UI through RSC scripts without placing the custom
   copy in initial script-stripped HTML. Never satisfy this assertion by
   inspecting raw HTML, script text, or `body.innerText()`: locate the matching
   text and use Playwright's `toBeVisible()` assertion.
7. Assert no page errors or hydration console errors.

Use these source-vetted interactions exactly:

| Slug | Action | Assertion |
|---|---|---|
| `showcase` | click `Browse all` | URL ends `#catalog`; region `Template catalog` visible |
| `slate` | click tab `Capture Content` | selected; heading `Capture From Anywhere` visible |
| `grovia` | click tab `KPI tracking` | selected; tabpanel heading `Measure what matters most` visible |
| `fuel` | click `Next testimonial` | live testimonial contains `Gracia Michelle` |
| `agenio` | click `What if I only need one specific AI service?` | expanded; answer region visible |
| `jayden` | click service `UI/UX Design` | expanded; `User Research` visible |
| `saazai` | click `Next testimonial` | live region contains `I really didn’t think an AI could feel this personal` |
| `palmer` | click `Play Palmer project reel` | dialog `Palmer project reel` and `Close reel` visible; do not assert playback |
| `trillo` | click `Real-Time Insights` | pressed; dashboard view 2 has `aria-hidden=false` |
| `payble` | click button matching `^Yearly` | pressed; Plus card contains `$8` and `paid yearly` |
| `pilar` | click `Brown` | pressed; root has `data-pliar-theme=brown`; query has `theme=brown` |
| `rivero` | click `How can this platform help my business?` | expanded; its answer visible |
| `agentik` | click button containing `Build your plan` | pressed; visual label is `Step 2: Build your plan` |
| `dashfluence` | click `Show Customer Acquisition` | pressed; group label is `Hero story 2 of 3` |

Use the exact accessible controls, not CSS-module hashes. `reducedMotion` keeps
auto-advancing sliders stable. If an accessible name differs at runtime, first
inspect the rendered accessibility tree. Do not weaken to brittle nth-child
selectors without reporting the mismatch.

**Verify**:

```sh
npx playwright install chromium
npx playwright test --list
npm run build
npm run test:browser
pgrep -fal 'next.*start.*1[3-5][0-9][0-9][0-9]' || true
```

Expected: 14 listed, then 14 passed. The final process search returns no server
started by the suite.

### Step 5: Add CI browser setup without persistent artifact export

After `npm ci`, add:

```yaml
- run: npx playwright install --with-deps chromium
```

Keep the existing `npm run verify`; its root script now includes the browser
suite. Do not add `actions/upload-artifact` or any other persistent export. The
user authorized the code/PR workflow, not export of captured browser traces or
screenshots to GitHub Actions storage. Local failure artifacts remain ignored
by Git and CI failures retain console logs.

**Verify**: inspect YAML indentation and run the full local verify command.

### Step 6: Document local browser setup

In README setup/verification, add `npx playwright install chromium` after
`npm ci`, document `npm run build && npm run test:browser`, and state the suite
runs one production app at a time. Keep existing route-test documentation.

**Verify**:

```sh
rg -n 'playwright install chromium|test:browser|one.*at a time' README.md
```

Expected: all three concepts are documented.

## Test plan

- `tests/template-smoke.spec.ts` contains 14 generated tests, one per discovered
  app, and a guarded 14-key interaction registry.
- Each test proves the configured route identity, hydration health, and one
  real client interaction, then proves every invalid contract's marker is
  visible after hydration.
- Tests run against production builds and direct Next start, never dev mode.
- Failure traces/screenshots are ignored locally and are not persistently
  exported by CI.

## Done criteria

- [ ] Exact Playwright 1.62.1 is recorded in root package and lockfile.
- [ ] `npx playwright test --list` reports exactly 14 smoke tests.
- [ ] Adding/removing a template without updating the handler map fails.
- [ ] `npm run build && npm run test:browser` reports 14 passed.
- [ ] All configured invalid-route statuses and hydrated visible markers pass
  inside those 14 app tests.
- [ ] No suite-started Next process survives success or failure.
- [ ] `npm run verify` includes browser coverage and exits 0.
- [ ] CI installs only Chromium and does not persistently export browser
  artifacts.
- [ ] No app package/config/component was changed by this plan.

## STOP conditions

- Plan 001's frozen install or plan 002's route suite is not green.
- The exact Playwright dependency changes unrelated package versions.
- A source-vetted interaction is actually broken before this PR's source edits.
- A stable interaction requires CSS hashes, fixed sleeps, media-playback timing,
  or disabling error assertions.
- Serial builds/tests exceed the 30-minute CI cap locally. Report measured time;
  do not start all apps concurrently or raise the timeout without review.
- Next child cleanup leaves a server alive after two correction attempts.

## Maintenance notes

Every new template must add one handler key. Accessible-name changes should
update the corresponding test intentionally. Keep HTTP route contracts for
complete route coverage and browser tests for hydration/interactions; neither
layer replaces the other. Expand to mobile/cross-browser only after measuring
this baseline's reliability and CI duration.
