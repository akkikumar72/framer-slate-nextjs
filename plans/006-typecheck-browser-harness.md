# Plan 006: Make the browser harness strict-TypeScript clean and CI-gated

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on. Do
> not weaken strictness, cast away the child-process mismatch, or broaden the
> root TypeScript project to compile every application at once. The reviewer
> owns `plans/README.md` and publication.
>
> **Drift check (run first)**:
>
> ```sh
> git diff --exit-code 67820ad -- \
>   package.json package-lock.json README.md playwright.config.ts tsconfig.json \
>   apps/showcase/package.json tests/helpers/template-server.ts \
>   tests/preview-forms.spec.ts tests/template-smoke.spec.ts \
>   tests/dashfluence-service-assets.spec.ts tests/tsconfig.json
> test ! -e tests/tsconfig.json
> { git diff --name-only 67820ad --; git ls-files --others --exclude-standard; } \
>   | LC_ALL=C sort -u
> ```
>
> The first two commands must exit 0. The final command must list exactly
> `plans/006-typecheck-browser-harness.md`,
> `plans/007-remove-preview-delivery-promises.md`, and `plans/README.md`.
> Any other starting drift is a STOP condition until the excerpts below are
> reconciled.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/003-add-browser-interaction-coverage.md`
- **Category**: tests
- **Planned at**: commit `67820ad`, 2026-08-10

## Why this matters

The new browser server helper fails strict TypeScript even though the PR's
`verify` job is green. Playwright transforms TypeScript without typechecking
it, and root `npm run check` currently runs only Turbo workspace checks, so
root-owned test/config files have no static gate. Correct the real child type
and add a focused test TypeScript project so future Playwright API or helper
type errors fail locally and in CI.

## Current state

- `tests/helpers/template-server.ts:1` imports
  `ChildProcessWithoutNullStreams`.
- `tests/helpers/template-server.ts:92-103` spawns Next with
  `stdio: ["ignore", "pipe", "pipe"]`. With Node's types, that returns
  `ChildProcessByStdio<null, Readable, Readable>` because stdin is deliberately
  absent.
- `tests/helpers/template-server.ts:110,115` passes that child to helpers whose
  signatures at lines 126 and 171 require writable, readable, and error
  streams. Strict TypeScript reports TS2345 at both call sites.
- `package.json:18-21` runs `turbo run check`, then build, routes, and
  Playwright. Turbo's dry graph contains 16 workspace entries, but only 15
  executable `check` tasks because
  `@framer-templates/typescript-config#check` is `<NONEXISTENT>`. There is no
  repository-root TypeScript task.
- Root `tsconfig.json` includes every `apps/**/*.ts(x)` file while defining a
  single root `@/*` alias. Running it directly is not a valid monorepo check;
  it resolves application-local aliases from the wrong base. Create a focused
  config for `playwright.config.ts` and `tests/**/*.ts` instead.
- The installed lockfile already resolves TypeScript `5.9.3` and
  `@types/node` `22.20.1` for application workspaces, but the root package does
  not declare either tool even though the root browser harness owns their use.
- `apps/showcase/package.json:8-11` is the repository convention: a named
  `typecheck` script is composed into a higher-level `check` script.

The pinned baseline command below currently fails with exactly two errors:

```text
tests/helpers/template-server.ts(110,27): error TS2345
tests/helpers/template-server.ts(115,7): error TS2345
```

## Commands you will need

Run all commands after `nvm use`; the repository requires Node `22.22.3` and
npm `10.9.8`.

| Purpose | Command | Expected on success |
|---|---|---|
| Frozen install check | `npm ci --dry-run --ignore-scripts` | exit 0 |
| Browser harness types | `npm run typecheck:browser` | exit 0, no TypeScript errors |
| Root checks | `npm run check` | 15 executable Turbo workspace checks pass, then browser typecheck passes |
| Browser inventory | `npx playwright test --list` | 22 tests in 3 files |
| Full acceptance | `npm run verify` | exit 0; checks, builds, routes, and 22 browser tests pass |

## Scope

**In scope**:

- `tests/helpers/template-server.ts`
- `tests/tsconfig.json` (create)
- `package.json`
- `package-lock.json`
- `README.md`

**Read-only fixtures**:

- `playwright.config.ts`
- `tests/template-smoke.spec.ts`
- `tests/preview-forms.spec.ts`
- `tests/dashfluence-service-assets.spec.ts`
- `tsconfig.json`
- `apps/showcase/package.json`

**Out of scope**:

- Application TypeScript configs, aliases, or source
- Disabling `strict`, `strictNullChecks`, or `skipLibCheck` behavior to hide the
  mismatch
- `as unknown as`, non-null assertions, or changing stdin from `ignore` to
  `pipe` merely to satisfy the old type
- ESLint, formatting, Turbo cache policy, browser coverage, or server behavior
- Playwright, Next.js, React, Turbo, or other dependency upgrades

## Git workflow

- Continue on `fix/repository-verification-and-quality`; this plan extends the
  existing draft PR.
- Keep the source change as one logical review unit. Do not amend or rewrite
  existing commit history.
- Do not push or update the PR unless the operator explicitly dispatches a
  publisher after review.

## Steps

### Step 1: Add a focused strict TypeScript project for root browser files

Add root dev dependencies at the versions already present in the lockfile:

```sh
npm install --save-dev --save-exact typescript@5.9.3 @types/node@22.20.1
```

The lockfile may add these two packages to the root dependency block, but must
not change any resolved package version.

Immediately after the install, run this exact normalized lockfile comparison.
It removes only the two permitted root declarations from both snapshots, then
requires every other lockfile byte represented by the parsed JSON to remain
equivalent:

```sh
node --input-type=commonjs - <<'NODE'
const { execFileSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

const expected = {
  "@types/node": "22.20.1",
  typescript: "5.9.3",
};
const before = JSON.parse(
  execFileSync("git", ["show", "67820ad:package-lock.json"], {
    encoding: "utf8",
  }),
);
const after = JSON.parse(readFileSync("package-lock.json", "utf8"));

for (const [name, version] of Object.entries(expected)) {
  if (after.packages[""].devDependencies?.[name] !== version) {
    throw new Error(`Root lock entry ${name} must be exactly ${version}`);
  }
  delete before.packages[""].devDependencies?.[name];
  delete after.packages[""].devDependencies?.[name];
}

if (JSON.stringify(before) !== JSON.stringify(after)) {
  throw new Error(
    "package-lock.json changed outside the two permitted root devDependencies",
  );
}
console.log("Lockfile delta is limited to the two exact root declarations.");
NODE
```

Expected: the script prints its success sentence and exits 0. Any other
lockfile delta is a STOP condition; do not accept a transitive refresh.

Create `tests/tsconfig.json` as a standalone browser-harness config. It must:

- include only `../playwright.config.ts` and `./**/*.ts`;
- use `strict: true`, `noEmit: true`, `skipLibCheck: true`, and
  `incremental: false`;
- use `target: "ES2022"`, `module: "NodeNext"`, and
  `moduleResolution: "NodeNext"`;
- include `lib: ["ES2022", "DOM", "DOM.Iterable"]` and `types: ["node"]`;
- enable `esModuleInterop` and `resolveJsonModule`;
- not extend the root Next.js config or import any `apps/**` source.

Add this root script without changing `check` yet:

```json
"typecheck:browser": "tsc --project tests/tsconfig.json"
```

**Verify**:

```sh
npm ci --dry-run --ignore-scripts
npm run typecheck:browser
```

Expected: the frozen-install dry run exits 0. The typecheck fails only with
TS2345 at `template-server.ts:110` and `:115`, proving the new gate observes
the known defect. Any other error is a STOP condition.

### Step 2: Type the deliberately absent stdin accurately

In `tests/helpers/template-server.ts`, replace the
`ChildProcessWithoutNullStreams` import with the exact Node type for the stdio
tuple already used:

```ts
import { spawn, type ChildProcessByStdio } from "node:child_process";
import type { Readable } from "node:stream";

type TemplateChild = ChildProcessByStdio<null, Readable, Readable>;
```

Use `TemplateChild` for the `child` parameters of `createStop` and
`waitForReady`. Do not change `spawn`, its stdio tuple, output capture,
readiness behavior, signal handling, or cleanup behavior.

**Verify**:

```sh
npm run typecheck:browser
rg -n 'ChildProcessWithoutNullStreams|as unknown as' tests/helpers/template-server.ts
```

Expected: typecheck exits 0. The search returns no matches.

### Step 3: Make the focused typecheck part of the normal gate

Change root `check` to:

```json
"check": "turbo run check && npm run typecheck:browser"
```

Keep `verify` structurally unchanged so it consumes the stronger `check`.
Update `README.md` validation text to state that root checks include a strict
typecheck for the Playwright config/helpers/specs, and correct the acceptance
description so it names checks, builds, route contracts, and browser tests.

**Verify**:

```sh
npm run check
npx playwright test --list
```

Expected: all 15 executable workspace checks and the browser typecheck pass; Playwright
lists exactly 22 tests in 3 files.

### Step 4: Run the complete repository acceptance gate

Run the same command used by CI after the stricter check is wired in.

**Verify**:

```sh
npm run verify
git diff --check 67820ad -- package.json package-lock.json README.md tests/helpers/template-server.ts tests/tsconfig.json
{ git diff --name-only 67820ad --; git ls-files --others --exclude-standard; } \
  | LC_ALL=C sort -u
```

Expected: `verify` exits 0. Diff check is empty. The changed-file list contains
exactly:

```text
README.md
package-lock.json
package.json
plans/006-typecheck-browser-harness.md
plans/007-remove-preview-delivery-promises.md
plans/README.md
tests/helpers/template-server.ts
tests/tsconfig.json
```

`git status --short --untracked-files=all` must show the same eight paths and
no others. Plan 007 has not been executed yet; its source and evidence paths
are not permitted at this gate.

## Test plan

- The new `tests/tsconfig.json` is the regression harness. Before the type fix,
  it must expose both TS2345 errors; after the fix, the same command must pass.
- It covers `playwright.config.ts`, the shared server helper, and all three
  browser spec files. Future root browser files under `tests/` are included
  automatically.
- `npx playwright test --list` proves the type-only change did not alter test
  discovery.
- `npm run verify` remains the integration layer and must pass unchanged at
  runtime.

## Done criteria

- [ ] Root declares exact `typescript@5.9.3` and `@types/node@22.20.1` dev
  dependencies without changing resolved versions.
- [ ] `tests/tsconfig.json` is strict and includes only root browser files.
- [ ] The helper uses the exact null-stdin child type with no casts or runtime
  behavior changes.
- [ ] `npm run typecheck:browser` exits 0.
- [ ] `npm run check` includes and passes the browser typecheck.
- [ ] `npx playwright test --list` reports 22 tests in 3 files.
- [ ] `npm run verify` exits 0.
- [ ] The final combined tracked/untracked audit contains exactly the eight
  paths listed in Step 4 and no others.

## STOP conditions

- The pinned dependency command changes any existing resolved version.
- The focused config includes application source or produces errors outside
  the two known child-process call sites before the fix.
- Correct typing requires a cast, non-null assertion, changing the stdio tuple,
  or changing server lifecycle behavior.
- Playwright discovery no longer reports 22 tests in 3 files.
- A verification command fails twice after one narrow correction attempt.

## Maintenance notes

Any new root Playwright helper or spec under `tests/` will be typechecked by
default. Files moved outside that directory must be added deliberately. Review
future child-process changes against the actual stdio tuple; do not regress to
`ChildProcessWithoutNullStreams` when stdin remains ignored.
