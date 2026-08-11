# Plan 002: Make route contracts prove route identity

> **Executor instructions**: Execute this migration atomically. Correct the
> current metadata and route content before enabling stricter validation. Run
> every gate. Stop on any mismatch instead of weakening assertions. The
> reviewer owns `plans/README.md`. Do not commit or push until all five plans
> are reviewed together.
>
> **Drift check (run first)**:
> `git diff --stat e5c073c -- packages/template-validation apps/agentik/app apps/agentik/template.config.json apps/rivero/app apps/rivero/components/rivero/routes/changelog apps/rivero/template.config.json apps/fuel/app apps/fuel/template.config.json README.md`
> and `git status --short`.
> Plan 001 may have changed only README catalog copy and the lockfile. Any
> other in-scope drift is a STOP condition until reconciled.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: `plans/001-restore-ci-and-catalog.md`
- **Category**: tests
- **Planned at**: commit `e5c073c`, 2026-08-10

## Why this matters

The shared route runner verifies status but treats title, canonical, and marker
as optional. Forty-eight valid Agentik/Rivero routes can therefore return an
unrelated 200 page and pass. Marker checks also fall back to raw HTML, including
serialized scripts, and `fetch` follows redirects before assertions. Current
metadata defects prove the gap: Agentik's home title duplicates its suffix,
nine Rivero static pages inherit canonical `/` and duplicate `| Rivero`, and
four Rivero changelog URLs render the same aggregate page.

## Current state

- `packages/template-validation/bin/template-validation.mjs:201-259` fetches
  with default redirect behavior and runs marker/title/canonical assertions
  only when fields happen to exist.
- Lines 223-227 accept a marker from raw decoded HTML after the stripped-text
  check fails.
- Lines 205-207 have no request timeout.
- `packages/template-validation/package.json` has no test/check script and
  publishes only `bin`.
- `apps/agentik/template.config.json` has eight routes without complete title
  and canonical assertions; four article routes have only path/status.
- `apps/rivero/template.config.json` has 44 status-only valid routes.
- `apps/agentik/app/layout.tsx:8-14` uses `%s | Agentik`, while
  `apps/agentik/app/page.tsx:4-7` supplies an already-branded string.
- `apps/rivero/app/layout.tsx:9-15` uses `%s | Rivero` and canonical `/`.
  Static pages such as `apps/rivero/app/about/page.tsx:4` supply
  `About | Rivero` and no canonical override.
- `apps/rivero/components/rivero/routes/changelog/data.ts:1-20` keeps four
  slugs and four entries in separate positional arrays.
- `ChangelogPage.tsx:6-39` ignores the slug and renders all entries for every
  detail URL.
- `apps/fuel/app/work/page.tsx` redirects to `/work/portfolio`, and
  `apps/fuel/app/blog/page.tsx` redirects to `/blog/velocity-becomes`, but the
  config currently describes both final responses as status 200 pages.

Repository conventions to follow:

- Metadata uses Next App Router `Metadata` exports and `generateMetadata`.
- Dynamic Rivero blog and case-study routes already resolve records, return
  `notFound()` for unknown slugs, use absolute titles, and set route canonicals.
- Keep validation dependency-free and ESM, matching the current `.mjs` CLI.

## Commands you will need

Run under the pinned Node 22/npm 10 shell established in plan 001.

| Purpose | Command | Expected on success |
|---|---|---|
| Validator tests | `npm run check --workspace=@framer-templates/template-validation` | all Node tests pass |
| Agentik typecheck | `npm run typecheck --workspace=@framer-templates/agentik` | exit 0 |
| Rivero typecheck | `npm run typecheck --workspace=@framer-templates/rivero` | exit 0 |
| Fuel typecheck | `npm run typecheck --workspace=@framer-templates/fuel` | exit 0 |
| Target builds | `npx turbo run build --filter=@framer-templates/agentik --filter=@framer-templates/rivero --filter=@framer-templates/fuel` | exit 0 |
| Target routes | `npx turbo run test:routes --concurrency=1 --filter=@framer-templates/agentik --filter=@framer-templates/rivero --filter=@framer-templates/fuel` | exit 0 |
| Repository routes | `npm run test:routes -- --concurrency=1` | all workspaces pass |

## Scope

**In scope**:

- `packages/template-validation/bin/template-validation.mjs`
- `packages/template-validation/lib/route-contracts.mjs` (create)
- `packages/template-validation/test/route-contracts.test.mjs` (create)
- `packages/template-validation/package.json`
- `README.md`
- `apps/agentik/app/page.tsx`
- `apps/agentik/template.config.json`
- `apps/fuel/template.config.json`
- `apps/rivero/template.config.json`
- `apps/rivero/app/about/page.tsx`
- `apps/rivero/app/pricing-v1/page.tsx`
- `apps/rivero/app/pricing-v2/page.tsx`
- `apps/rivero/app/feature/page.tsx`
- `apps/rivero/app/reviews/page.tsx`
- `apps/rivero/app/contact-us/page.tsx`
- `apps/rivero/app/appointment/page.tsx`
- `apps/rivero/app/legal/privacy-policy/page.tsx`
- `apps/rivero/app/legal/terms-conditions/page.tsx`
- `apps/rivero/app/blog/page.tsx`
- `apps/rivero/app/case-study/page.tsx`
- `apps/rivero/app/integrations/page.tsx`
- `apps/rivero/app/integrations/[slug]/page.tsx`
- `apps/rivero/app/changelog/[slug]/page.tsx`
- `apps/rivero/components/rivero/routes/changelog/data.ts`
- `apps/rivero/components/rivero/routes/changelog/ChangelogPage.tsx`

**Out of scope**:

- Rewriting blog, case-study, integration, or service article bodies
- Changing navigation or visual design
- Adding remote-host asset enforcement in this PR
- Converting every existing `titleIncludes` field to exact title
- Adding a new validation dependency or a general schema framework
- Altering non-Fuel redirects or Dashfluence's route prefix

## Git workflow

- Branch: `fix/repository-verification-and-quality`
- Keep all five plans uncommitted until the reviewer approves the full diff.
- Final commit style is the one-line conventional subject in plan 001.

## Steps

### Step 1: Fix metadata that stricter contracts will expose

In `apps/agentik/app/page.tsx`, use an absolute title so the layout does not
append Agentik twice:

```ts
title: { absolute: "Agentik | AI Automation Agency" },
```

For Rivero, use unbranded child titles so the layout appends `| Rivero` once,
and add each route's canonical:

| Route | Child title | Canonical |
|---|---|---|
| `/about` | `About` | `/about` |
| `/pricing-v1` | `Pricing` | `/pricing-v1` |
| `/pricing-v2` | `Pricing V2` | `/pricing-v2` |
| `/feature` | `Features` | `/feature` |
| `/reviews` | `Reviews` | `/reviews` |
| `/contact-us` | `Contact Us` | `/contact-us` |
| `/appointment` | `Schedule a Demo` | `/appointment` |
| `/legal/privacy-policy` | `Privacy Policy` | `/legal/privacy-policy` |
| `/legal/terms-conditions` | `Terms & Conditions` | `/legal/terms-conditions` |
| `/blog` | `Blog` | `/blog` |
| `/case-study` | `Case Studies` | `/case-study` |
| `/integrations` | `Integrations` | `/integrations` |

In the integration detail `generateMetadata`, set `title: integration.name`
and retain its existing description/canonical.

**Verify**:

```sh
npm run typecheck --workspace=@framer-templates/agentik
npm run typecheck --workspace=@framer-templates/rivero
```

Expected: both exit 0.

### Step 2: Make Rivero changelog detail routes route-specific

Consolidate the slug into each existing `changelogEntries` record. Derive
`changelogSlugs`, `isChangelogSlug`, and a `getChangelogEntry(slug)` lookup from
that one array. Preserve every existing date, version, title, body, subheading,
and detail value.

Update the dynamic page to resolve the entry for static params, metadata, and
rendering. Unknown slugs still call `notFound()`. Metadata uses the unbranded
entry title and `/changelog/${entry.slug}` canonical. Change `ChangelogPage` to
accept one resolved entry and render only it, keeping the current markup and
styles for that article.

**Verify**:

```sh
npm run typecheck --workspace=@framer-templates/rivero
```

Expected: exit 0. Also confirm the component no longer maps all entries.

### Step 3: Add a small dependency-free contract library

Create `lib/route-contracts.mjs` and move/expose only pure route logic needed
for tests:

- HTML entity decoding, title extraction, canonical extraction, and normalized
  script/style/tag-stripped response text.
- `validateTemplateRouteConfig(template)`, returning actionable failures.
- `validatePageResponse(contract, responseData)`, returning failures.
- `validateRedirectResponse(contract, responseData)`, returning failures.
- `validateInvalidResponse(contract, responseData)`, returning status failures;
  hydrated invalid-route marker visibility is owned by plan 003.

Required config rules:

- Each normal `routes` entry has a nonempty root-relative `path`, a 2xx status,
  a nonempty `marker`, `canonical`, and either exact `title` or legacy
  `titleIncludes`.
- Each `redirects` entry has a root-relative `path`, status in
  301/302/303/307/308, and a root-relative `location`.
- Each `invalidRoutes` entry has a root-relative path, non-2xx status, and
  nonempty marker.
- Paths are unique across all three arrays after trailing-slash normalization,
  so `/same` and `/same/` cannot describe the same route twice.
- Missing `redirects` is equivalent to an empty array.

Exact `title` compares the decoded `<title>` for equality. Existing
`titleIncludes` retains substring behavior. A visible marker can match only
the normalized response text after removing scripts and styles. Do not keep
the raw-HTML fallback. For invalid routes, keep `marker` mandatory in config,
but verify it after hydration in plan 003 because Next can stream `notFound()`
UI only through the RSC payload; the HTTP helper verifies the non-2xx status.

Update package `files` to include `lib`, and add:

```json
"scripts": { "check": "node --test test/*.test.mjs" }
```

**Verify**:

```sh
npm run check --workspace=@framer-templates/template-validation
```

Expected: the command exists and the new tests pass.

### Step 4: Integrate strict behavior into the CLI

Before starting Next, validate the config and exit with a grouped, readable
failure list if invalid. During route checks:

- Iterate normal routes, redirects, and invalid routes.
- Fetch with `redirect: "manual"`.
- Add a 15-second per-request `AbortSignal.timeout` and convert timeout/errors
  into path-specific failures while still cleaning up the server.
- Bound each server-readiness probe with a two-second `AbortSignal.timeout` so
  a connection that accepts but never responds cannot defeat the 30-second
  startup deadline or bypass `finally` cleanup.
- Validate normal HTML through the strict page-response helper.
- Validate invalid responses through the status-only invalid-response helper;
  plan 003 must visit every invalid contract and assert its marker is visible
  in the hydrated DOM.
- Validate redirect status and normalized `Location` without title, canonical,
  or body assertions.
- Report valid, redirect, and invalid counts separately.

Retain the existing isolated port selection, bounded server startup, captured
Next output, and `finally` cleanup behavior.

**Verify**: run the package unit command again. Expected: all tests pass.

### Step 5: Add meaningful unit coverage

Using only `node:test` and `node:assert/strict`, cover at minimum:

1. Missing marker/title/canonical is rejected for normal routes.
2. Exact title passes and a suffix mismatch fails.
3. A marker present only inside `<script>` fails.
4. Legacy `titleIncludes` remains supported.
5. Duplicate paths across route groups fail, including trailing-slash aliases.
6. Redirect statuses outside the allowed set fail.
7. Relative/absolute `Location` values normalize to the expected path.
8. Invalid-route contracts require a non-2xx status and marker, and the pure
   invalid-response helper rejects a status mismatch without inspecting RSC
   script payloads.
9. Every current `apps/*/template.config.json` satisfies config validation.

For test 9, resolve the repository's `apps` directory relative to the test
file, not `process.cwd()`, because Turbo runs the package from its workspace.

**Verify**:

```sh
npm run check --workspace=@framer-templates/template-validation
```

Expected: all named cases pass and no network/server is required.

### Step 6: Complete Agentik, Rivero, and Fuel contracts

Use exact `title` for newly completed Agentik/Rivero entries. Canonical is the
route path unless explicitly described below.

Agentik titles/markers:

- `/`: `Agentik | AI Automation Agency`; existing home marker.
- `/about`, `/careers`, `/contact`: rendered layout titles and current h1 copy.
- `/blog`: existing absolute title and current blog marker.
- Four details: exact title is `${post.title} | Framer Website Template for AI Automation Agencies`;
  marker is `post.title`, sourced from `components/agentik/shared/content.ts`.

Rivero static/index titles and markers:

| Route | Exact title | Marker |
|---|---|---|
| `/` | `Rivero - HR Management Platform` | `Get Actionable Insights` |
| `/about` | `About | Rivero` | `Our Story` |
| `/pricing-v1` | `Pricing | Rivero` | `Find Your Perfect Plan` |
| `/pricing-v2` | `Pricing V2 | Rivero` | `Smarter People Management` |
| `/feature` | `Features | Rivero` | `Powerful Features for Modern HR Teams Everywhere` |
| `/reviews` | `Reviews | Rivero` | `Exceeded Expectations` |
| `/blog` | `Blog | Rivero` | `Our Blog` |
| `/case-study` | `Case Studies | Rivero` | `Our Success Stories` |
| `/integrations` | `Integrations | Rivero` | `Integration` |
| `/contact-us` | `Contact Us | Rivero` | `Contact Us` |
| `/appointment` | `Schedule a Demo | Rivero` | `Schedule a Demo Call` |
| `/legal/privacy-policy` | `Privacy Policy | Rivero` | `Privacy Policy` |
| `/legal/terms-conditions` | `Terms & Conditions | Rivero` | `Terms & conditions` |

Dynamic Rivero entries derive exact values from existing data:

- Twelve blogs: title `${post.title} - Rivero`, marker `post.title`.
- Seven case studies: title `${study.title} - Rivero`, marker `study.title`.
- Nine integrations: title `${integration.name} | Rivero`, marker name.
- Four changelogs: title `${entry.title} | Rivero`, marker entry title.

Move Fuel `/work` and `/blog` out of `routes` into `redirects` with status 307
and locations `/work/portfolio` and `/blog/velocity-becomes`. Their destination
page contracts remain unchanged.

**Verify**:

```sh
npm run check --workspace=@framer-templates/template-validation
npx turbo run build --filter=@framer-templates/agentik --filter=@framer-templates/rivero --filter=@framer-templates/fuel
npx turbo run test:routes --concurrency=1 --filter=@framer-templates/agentik --filter=@framer-templates/rivero --filter=@framer-templates/fuel
```

Expected: Agentik reports 9 valid, 0 redirects, 3 invalid; Rivero reports 45,
0, 3; Fuel reports 12 valid, 2 redirects, 4 invalid.

### Step 7: Document the stronger contract

Update the README validation section to distinguish `routes`, `redirects`, and
`invalidRoutes`, and document exact `title` versus legacy `titleIncludes`.
State that normal-route markers are checked only in response text with
scripts/styles removed. Invalid-route status is checked over HTTP, while plan
003's browser suite proves every invalid marker's actual hydrated visibility.

**Verify**: `rg -n 'redirects|titleIncludes|visible' README.md` returns the new
contract documentation.

## Test plan

- New pure tests live at
  `packages/template-validation/test/route-contracts.test.mjs`.
- The tests assert failures, not just successful returns. In particular, the
  script-only marker fixture must fail with the route path in its message.
- Existing production route tests for all workspaces remain the integration
  layer; run them serially to avoid port/process contention.
- Plan 003 will add hydrated visibility for every invalid contract plus normal
  route interaction coverage. Do not add Playwright in this plan.

## Done criteria

- [ ] Every normal route contract has marker, canonical, and a title assertion.
- [ ] Invalid contracts require a marker, verify status over HTTP, and are
  handed to plan 003 for hydrated marker checks.
- [ ] Fuel's two redirects are explicit and verified without being followed.
- [ ] Marker checks have no raw-HTML fallback.
- [ ] Each route fetch has a 15-second deadline and path-specific error.
- [ ] Rivero static canonicals/titles are correct and changelog pages are
  genuinely slug-specific.
- [ ] Validator tests pass and are included by root `turbo run check`.
- [ ] Agentik, Rivero, and Fuel target builds/routes pass with expected counts.
- [ ] Full `npm run test:routes -- --concurrency=1` passes.
- [ ] No files outside this plan's scope plus earlier plan files are changed.

## STOP conditions

- Current metadata/config/data no longer matches the excerpts.
- Rivero's four changelog URLs are intentionally aggregate aliases. Stop and
  report; do not fabricate unique pages. The correct alternative is one index
  canonical plus explicit redirects, which needs maintainer confirmation.
- A title or marker can only be made to pass by weakening exact/visible checks.
- A route requires content invention rather than existing rendered/data text.
- The change requires a schema dependency or modifications to all app source.
- A verification command fails twice after one narrow correction attempt.

## Maintenance notes

Future routes must declare their identity contract when added. Reviewers should
scrutinize timeout cleanup, redirect normalization, exact title decoding, and
the config-completeness test. Do not reintroduce raw HTML marker matching; use
the browser layer when true CSS/layout visibility is the intended guarantee.
