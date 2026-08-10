# Plan 005: Cut Dashfluence homepage service-image weight

> **Executor instructions**: Create homepage-only derivatives of the two
> oversized service images. Preserve the original files and detail-page image
> references. Enforce the byte budget and verify visual fidelity. Do not expand
> into a whole-app image migration. The reviewer owns index status and final
> publication.
>
> **Drift check (run first)**:
> `git diff --stat e5c073c -- apps/dashfluence/components/dashfluence/home apps/dashfluence/components/dashfluence/shared/assets.ts apps/dashfluence/components/dashfluence/services apps/dashfluence/public/dashfluence/assets apps/dashfluence/scripts/audit-dashfluence-assets.mjs tests output/playwright/landing-pages`
> and `git status --short`.
> Expected source drift is only from plans 003-004. Any service-image or asset
> drift is a STOP condition until reconciled.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: `plans/003-add-browser-interaction-coverage.md`
- **Category**: perf
- **Planned at**: commit `e5c073c`, 2026-08-10

## Why this matters

Dashfluence's below-fold homepage service section uses five raw images totaling
9,602,525 bytes (9.16 MiB). Two 6000/5472-pixel JPEGs account for 8.28 MiB. The
same originals are appropriate for full-width service detail heroes, so keep
them and create two 1600-pixel homepage derivatives. This cuts the homepage set
to about 1.09 MiB without changing detail-page fidelity.

## Current state

- `shared/assets.ts:29-35` lists the five homepage service images.
- `home/DashfluenceHome.tsx:185-187` renders one desktop active image and all
  five mobile expanded images as raw `<img>` elements without lazy/async hints.
- `home/DashfluenceHome.module.css:99-117,296-305` displays a 360px desktop
  crop and 430px mobile crops, with mobile images hidden on desktop.
- `services/service-data.ts:32,62` references the two large originals as
  service data, and `ServiceDetailPage.tsx:42-49` renders full-width detail
  heroes through Next Image. Those references/originals must not change.
- `scripts/audit-dashfluence-assets.mjs:44-62` reports total bytes but has no
  failing homepage budget.

Measured source set:

| File | Bytes | Dimensions |
|---|---:|---:|
| `8pav5SU3BnJ6wETIuurnrNxivo.png` | 358,582 | 1080×667 |
| `P6VdABYaeMyqzy5lJeVzQ2GSH90.jpg` | 6,195,322 | 6000×4000 |
| `FZtr09azaTHn6YwdMESKE3Ss3tg.jpg` | 92,660 | 840×1200 |
| `6hoh6HKRqD2wucm9QOitChDY4S0.png` | 471,052 | 1000×840 |
| `pwOCQ86eV6uTDBY7fWUfJB09WU.jpg` | 2,484,909 | 5472×3648 |

Dry-run `cwebp 1.6.0`, quality 84, 1600px, metadata removed produced:

- P6 derivative: 103,058 bytes, 1600×1067, all-channel PSNR 43.55 dB.
- pw derivative: 115,132 bytes, 1600×1067, all-channel PSNR 45.04 dB.
- Projected five-image total: 1,140,484 bytes, an 88.1% reduction.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Encoder | `cwebp -version` | 1.6.0 or compatible |
| Dashfluence check | `npm run check --workspace=@framer-templates/dashfluence` | exit 0, budget passes |
| Build | `npm run build --workspace=@framer-templates/dashfluence` | exit 0 |
| Routes | `npm run test:routes --workspace=@framer-templates/dashfluence` | exit 0 |
| Browser regression | `npx playwright test tests/dashfluence-service-assets.spec.ts` | pass |
| Full gate | `npm run verify` | exit 0 |

## Scope

**In scope**:

- `apps/dashfluence/public/dashfluence/assets/P6VdABYaeMyqzy5lJeVzQ2GSH90-home.webp` (create)
- `apps/dashfluence/public/dashfluence/assets/pwOCQ86eV6uTDBY7fWUfJB09WU-home.webp` (create)
- `apps/dashfluence/components/dashfluence/shared/assets.ts`
- `apps/dashfluence/components/dashfluence/home/DashfluenceHome.tsx`
- `apps/dashfluence/scripts/audit-dashfluence-assets.mjs`
- `tests/dashfluence-service-assets.spec.ts` (create)
- `tests/helpers/template-server.ts` only for a small reusable export
- `output/playwright/landing-pages/repository-quality-dashfluence-services.png`
  (create from the live post-change app as reviewer evidence)

**Read-only, explicitly out of scope**:

- The two original JPEGs
- `apps/dashfluence/components/dashfluence/services/service-data.ts`
- `ServiceDetailPage.tsx` and `Services.module.css`
- Other Dashfluence images, raw `<img>` usage, or asset cleanup
- Next Image conversion or responsive-source architecture
- Removing unused assets or changing crops/layout

## Git workflow

- Branch: `fix/repository-verification-and-quality`
- Generated WebP and screenshot files are intentional reviewable artifacts.
- Keep everything uncommitted until reviewer approval.

## Steps

### Step 1: Generate two homepage-only WebP derivatives

Run exactly:

```sh
cwebp -q 84 -resize 1600 0 -metadata none \
  apps/dashfluence/public/dashfluence/assets/P6VdABYaeMyqzy5lJeVzQ2GSH90.jpg \
  -o apps/dashfluence/public/dashfluence/assets/P6VdABYaeMyqzy5lJeVzQ2GSH90-home.webp

cwebp -q 84 -resize 1600 0 -metadata none \
  apps/dashfluence/public/dashfluence/assets/pwOCQ86eV6uTDBY7fWUfJB09WU.jpg \
  -o apps/dashfluence/public/dashfluence/assets/pwOCQ86eV6uTDBY7fWUfJB09WU-home.webp
```

Capture encoder output in the executor report. Each all-channel PSNR must be at
least 42 dB. Do not overwrite/delete originals.

**Verify**:

```sh
stat -f '%z %N' \
  apps/dashfluence/public/dashfluence/assets/P6VdABYaeMyqzy5lJeVzQ2GSH90-home.webp \
  apps/dashfluence/public/dashfluence/assets/pwOCQ86eV6uTDBY7fWUfJB09WU-home.webp
```

Expected: each derivative is nonempty and no larger than 153,600 bytes.

### Step 2: Use derivatives only on the homepage

In `dashfluenceAssets.services`, replace only the second and fifth filenames
with the `-home.webp` derivatives. Leave `service-data.ts` unchanged so detail
heroes keep the original files.

In the two service-section raw image render sites, add `loading="lazy"` and
`decoding="async"`. Preserve alt text, active-state behavior, markup ownership,
and CSS crops. Reformat only the service function if needed for reviewability;
do not reformat the whole monolithic file.

**Verify**:

```sh
rg -n 'P6VdABYaeMyqzy5lJeVzQ2GSH90-home|pwOCQ86eV6uTDBY7fWUfJB09WU-home' \
  apps/dashfluence/components/dashfluence/shared/assets.ts
rg -n 'P6VdABYaeMyqzy5lJeVzQ2GSH90\.jpg|pwOCQ86eV6uTDBY7fWUfJB09WU\.jpg' \
  apps/dashfluence/components/dashfluence/services/service-data.ts
```

Expected: homepage map has two derivative matches; detail data still has two
original matches.

### Step 3: Turn the homepage byte target into a failing audit

Extend `audit-dashfluence-assets.mjs` with an explicit list of the five current
homepage service asset filenames. Reuse `assetRoot` and `stat` to enforce:

- each new derivative is at most 150 KiB (153,600 bytes), and
- the combined five homepage files are at most 1.2 MiB (1,258,291 bytes).

Failure output must name the offending file or total plus actual and allowed
bytes, then exit nonzero/throw. Success output should report the measured
homepage total. Keep existing empty-file, local-reference, and remote-reference
checks unchanged.

Do not claim the audit recomputes PSNR; visual/encoder acceptance is a separate
done criterion.

**Verify**:

```sh
npm run audit:assets --workspace=@framer-templates/dashfluence
```

Expected: existing checks pass and homepage service total is at most 1.2 MiB.

### Step 4: Add browser assertions for loading behavior and source selection

Create `tests/dashfluence-service-assets.spec.ts` using plan 003's server
helper. Start Dashfluence, navigate to `/Dashfluence`, locate the section by its
`Performance-Driven Services` heading, and scroll it into view.

Assert:

1. Service images have `loading=lazy` and `decoding=async`.
2. The homepage DOM includes both `-home.webp` names.
3. The two oversized original filenames do not appear as service-section image
   sources.
4. Hover/focus each of the five service links and assert the active desktop
   image/source updates while the heading/copy remains visible.

Do not assert network timing or bytes in the browser; the deterministic audit
owns byte limits.

**Verify**:

```sh
npm run build --workspace=@framer-templates/dashfluence
npx playwright test tests/dashfluence-service-assets.spec.ts
```

Expected: pass.

### Step 5: Verify visual fidelity on homepage and detail pages

Run the built Dashfluence app and inspect at 390×844 and 1440×1000:

- `/Dashfluence`, all five service hover/focus states.
- `/Dashfluence/services/strategy-content-production`.
- `/Dashfluence/services/cro-analytics-optimization`.

The homepage images must preserve crop, color, faces, and text detail. Detail
heroes must still use the original high-resolution files.

For PR evidence, use Playwright against the real running page at 1440×1000.
Scroll the service section into view, exercise the second service, then inject
two non-source overlays before capture: `88% lighter homepage sources` and
`1.2 MiB budget enforced`. Save the actual UI screenshot as:

`output/playwright/landing-pages/repository-quality-dashfluence-services.png`

The overlays must be deterministic DOM annotations captured with the real UI,
not a generated mockup or generative image edit.

**Verify**: open the saved screenshot and confirm it is the post-change local UI
with readable callouts and no clipping.

### Step 6: Run final acceptance

```sh
npm run check --workspace=@framer-templates/dashfluence
npm run build --workspace=@framer-templates/dashfluence
npm run test:routes --workspace=@framer-templates/dashfluence
npm run test:browser
npm run verify
git diff --check
```

Expected: every command exits 0.

## Test plan

- The custom asset audit makes the 1.2 MiB and 150 KiB limits machine-failing.
- The browser test proves the homepage selects derivatives and preserves all
  five interactive service states.
- Route/build tests prove the original detail pages still build and render.
- Reviewer checks exact visual crops at phone and desktop sizes.

## Done criteria

- [ ] Two new 1600×1067 WebPs exist, each ≤150 KiB and PSNR ≥42 dB.
- [ ] Homepage five-image total is ≤1.2 MiB, at least an 85% reduction.
- [ ] Homepage uses the two derivatives and lazy/async raw image hints.
- [ ] Detail data and both large originals are unchanged.
- [ ] The Dashfluence audit fails if either byte budget is exceeded.
- [ ] Browser, target app, full repository, and diff checks pass.
- [ ] A real annotated post-change screenshot is ready for the PR body.
- [ ] No unrelated Dashfluence asset or component was changed.

## STOP conditions

- `cwebp` is unavailable or reports all-channel PSNR below 42 dB.
- Either derivative exceeds 150 KiB or combined set exceeds 1.2 MiB.
- A crop, color, face, text-detail, or loading regression is visible.
- The originals/detail references would need modification or deletion.
- Budget enforcement can only report rather than fail the audit.
- The browser test requires fixed sleeps or brittle CSS hashes.
- A verification command fails twice after one narrow correction attempt.

## Maintenance notes

When homepage service artwork changes, generate a dedicated 1600px derivative,
update the explicit audit list, and keep the detail original when needed. The
byte budget protects runtime intent; visual review protects crop/detail. A
future Next Image migration may be worthwhile, but it should be measured and
reviewed separately.
