# Plan 001: Restore reproducible installs and the 13-template catalog

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on. If a
> STOP condition occurs, stop and report. Do not improvise. The reviewer owns
> `plans/README.md`, so do not update its status. Do not commit or push until
> the reviewer explicitly authorizes publication after reviewing all five
> plans together.
>
> **Drift check (run first)**:
> `git diff --stat e5c073c -- package.json package-lock.json README.md apps/showcase/app/layout.tsx apps/showcase/app/page.tsx apps/showcase/template.config.json .github/workflows/ci.yml`
> and `git status --short`.
> If any listed file changed, compare the excerpts below with live code. On a
> mismatch, stop and report rather than applying this plan to drifted code.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `e5c073c`, 2026-08-10

## Why this matters

The root workspace glob includes `apps/*`, and Dashfluence is a declared app,
but `package-lock.json` contains neither its package record nor its workspace
link. CI runs `npm ci`, and a dry run currently fails before any check, build,
or test can start. Once installation is repaired, the showcase route contract
would still fail because the page renders 13 templates while its marker,
description, and README say 12.

## Current state

- `package.json:5-12` pins npm 10.9.8, Node 22, and includes all `apps/*`.
- `apps/dashfluence/package.json:1-26` declares
  `@framer-templates/dashfluence` and two local workspace dev dependencies.
- `package-lock.json:39-56` jumps from `apps/agentik` to `apps/fuel`; an exact
  search for `dashfluence` returns no lockfile matches.
- `.github/workflows/ci.yml:15-20` selects Node 22.22.3, then runs `npm ci` and
  `npm run verify`.
- `apps/showcase/app/page.tsx:113-123` includes Dashfluence in the 13-entry
  array, and lines 143-149 render `templates.length`.
- `apps/showcase/template.config.json:15-22` expects the stale marker
  `12 templates. One focused workspace.`.
- `apps/showcase/app/layout.tsx:8-15` and `README.md:1-5` still say Twelve.

Current commands and observed result:

```text
npm ci --dry-run --ignore-scripts --offline
npm error Missing: @framer-templates/dashfluence@0.1.0 from lock file
```

## Commands you will need

Use the repository's pinned toolchain, not the shell default Node 26/npm 11:

```sh
export PATH="/Users/akashpathak/.nvm/versions/node/v22.22.3/bin:$PATH"
node --version
npm --version
```

Expected: `v22.22.3` and `10.9.8`. If that toolchain path is absent, stop.

| Purpose | Command | Expected on success |
|---|---|---|
| Regenerate lock | `npm install --package-lock-only --ignore-scripts` | exit 0 |
| Frozen graph | `npm ci --dry-run --ignore-scripts` | exit 0, no missing workspace |
| Showcase check | `npm run check --workspace=@framer-templates/showcase` | exit 0 |
| Final gate | `npm run verify` | exit 0 after all five plans |

## Scope

**In scope**:

- `package-lock.json`
- `README.md`
- `apps/showcase/app/layout.tsx`
- `apps/showcase/template.config.json`

**Read-only evidence, do not edit in this plan**:

- `package.json`
- `apps/dashfluence/package.json`
- `apps/showcase/app/page.tsx`
- `.github/workflows/ci.yml` (plan 003 owns its browser additions)

**Out of scope**:

- Dependency upgrades or version-range changes
- Reordering or rewriting unrelated lockfile packages
- Replacing the manual showcase registry in this PR
- Changing Dashfluence's `/Dashfluence` mount point

## Git workflow

- Branch: `fix/repository-verification-and-quality`
- One final conventional commit for all five plans, suggested subject:
  `fix: strengthen template verification and preview quality`
- Do not push or open the PR until the reviewer approves the complete diff.

## Steps

### Step 1: Regenerate the lockfile with the pinned npm version

Run `npm install --package-lock-only --ignore-scripts`. Confirm the resulting
lockfile adds both:

- `packages["apps/dashfluence"]`
- `packages["node_modules/@framer-templates/dashfluence"]` as a workspace link

Inspect the lockfile diff. It may add Dashfluence and later plan-selected
dependencies, but it must not change unrelated Next, React, TypeScript, Turbo,
or transitive dependency versions.

**Verify**:

```sh
jq -e '.packages["apps/dashfluence"].name == "@framer-templates/dashfluence"' package-lock.json
jq -e '.packages["node_modules/@framer-templates/dashfluence"].link == true' package-lock.json
npm ci --dry-run --ignore-scripts
```

Expected: all three commands exit 0.

### Step 2: Correct the catalog count without duplicating runtime state

Change only stale static copy:

- `README.md:3`: Twelve to Thirteen.
- `apps/showcase/app/layout.tsx:12`: Twelve to Thirteen.
- `apps/showcase/template.config.json:21`: `12 templates...` to
  `13 templates...`.

Do not hardcode 13 into `apps/showcase/app/page.tsx`; it correctly derives the
visible count from `templates.length`.

**Verify**:

```sh
rg -n 'Twelve standalone|12 templates\. One focused workspace' README.md apps/showcase
```

Expected: no matches.

### Step 3: Run the focused existing checks

Install dependencies only inside this isolated worktree, then run the showcase
check. Do not install in the user's main checkout.

**Verify**:

```sh
npm ci
npm run check --workspace=@framer-templates/showcase
```

Expected: both exit 0.

## Test plan

No new test file is needed for this narrow integration repair. The existing
showcase route contract is the regression check, and plan 003 adds browser
coverage for the rendered 13-template catalog.

## Done criteria

- [ ] Pinned Node 22.22.3 and npm 10.9.8 were used.
- [ ] Both Dashfluence lockfile entries exist and point at `apps/dashfluence`.
- [ ] `npm ci --dry-run --ignore-scripts` exits 0.
- [ ] README, showcase metadata, and showcase route marker all say Thirteen/13.
- [ ] The page still derives its count from `templates.length`.
- [ ] No unrelated dependency versions changed.
- [ ] Only in-scope files plus `plans/` are modified at this stage.

## STOP conditions

- The pinned Node/npm toolchain is unavailable.
- Lock regeneration changes unrelated dependency versions or removes packages.
- Dashfluence's package name or workspace dependencies differ from this plan.
- Fixing the count appears to require changing the runtime template registry.
- A verification command fails twice after one narrow correction attempt.

## Maintenance notes

Future template additions should update the lockfile and every catalog surface
in one change. A generated registry remains a useful follow-up, but adding it
now would expand this repair beyond the selected PR.
