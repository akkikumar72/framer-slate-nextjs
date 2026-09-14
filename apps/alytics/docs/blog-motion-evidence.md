# Blog motion evidence

Reference: https://alytics.framer.website/. Checked 2026-09-14 in dedicated source and localhost Chrome tabs. Viewports were 1474 × 1223, 810 × 1080, and 390 × 844. Per-tab CDP viewport overrides, read-only computed-style sampling, pointer input, and ordinary scrolling were used. User tabs were preserved.

## Source contract

| Element | Initial state | Trigger | Transition | Replay |
| --- | --- | --- | --- | --- |
| Homepage featured article | opacity 0, translateY(60px) | Any intersection | Spring stiffness 500, damping 60, mass 1, delay 0.4s | Once |
| Each of the three regular cards | opacity 0, translateY(60px) | 50% intersection | Same spring, delay 0.2s | Once per card |
| Featured and regular image | scale 1 | Card hover | Same spring, no delay, target scale 1.08 | Returns to 1 on pointer exit |
| View all link | opacity 1 | Link hover | Same spring, no delay, target opacity 0.64 | Returns to 1 |
| View all arrow | rotation 0deg | Link hover | Same spring, no delay, target rotation -45deg | Returns to 0deg |

The View all link has no entrance effect. No card-index stagger or card shadow/lift animation was observed. The hover contract applies to the shared cards on other routes too. Source arrow size is 20 × 20px at all three breakpoints.

Publicly served source modules corroborate the rendered behavior. They are evidence only and are not imported by the application:

- `motion/source/voLG6CCBcu14S8vdvTfAj93cblkgWHvUbEm0oxmc8M4.B2ilo_fC.mjs`: featured `xYWMVP0zY` uses enter `dl`, transition `ol`, threshold 0, animateOnce true; collection card `PMbk9w5WQ` uses `dl`, `el`, threshold 0.5, animateOnce true. The breakpoint overrides preserve those settings. `el` delay is 0.2; `ol` delay is 0.4; `dl` has y 60, opacity 0, scale 1, other transforms 0.
- `motion/source/KNkjBN7FO.h3j_b3OX.mjs`: regular card hover `epjGda0Mq-hover` scales image to 1.08, using spring 500/60/1 with no delay.
- `motion/source/YJ7RK_jt8.Bu1QFYJU.mjs`: featured desktop, tablet, and mobile hover variants all scale image to 1.08 with the same spring.
- Homepage View all component: `knY_x_uud-hover` sets opacity 0.64 and child arrow rotation -45; `Ma` is the same spring with delay 0.

Paths above are relative to `.codex-evidence/alytics/`. Public source base is `https://framerusercontent.com/sites/7kPAvCe7zHoJh4UYy7HpJ7/`.

## Live measurements

Desktop threshold probe: a 399.39px regular card with 193px visible remained opacity 0 and y 60 after 1.3 seconds. With 208px visible it entered. This confirms the 50% threshold uses the transformed wrapper bounds. The featured card entered with approximately 8px visible.

Desktop entrance samples, milliseconds measured from the scroll action:

| Time | Featured opacity | Featured translateY |
| --- | --- | --- |
| 0 | 0 | 60px |
| 396 | 0 | 60px |
| 603 | 0.679 | 19.23px |
| 825 | 0.964 | 2.13px |
| 1193 | 1 | 0px |

Regular cards remained at 0/60px through 230ms after their trigger; at 388ms they were approximately 0.585/24.90px, at 728ms 0.986/0.85px, and at 998ms 1/0px. The three desktop cards moved together, apart from browser-frame sampling differences below 0.3px.

All breakpoints were observed in initial, intermediate, and settled states. Tablet revealed the first two regular cards together, while the third remained hidden until separately reaching its threshold. Phone revealed cards independently. Scrolling to the top and back kept every already-revealed card at opacity 1 / transform none.

| Hover state | Desktop source | Tablet source | Phone source | Local, all sizes |
| --- | --- | --- | --- | --- |
| Featured image settled | 1.08 | 1.08 | 1.08 | 1.08 |
| Regular image settled | 1.08 | 1.08 | 1.08 | 1.08 |
| View all opacity settled | 0.64 | 0.64 | 0.64 | 0.64 |
| View all arrow settled | -45deg | -45deg | -45deg | -45deg |
| After mouseout | 1 / 1 / 0deg | 1 / 1 / 0deg | 1 / 1 / 0deg | 1 / 1 / 0deg |

Intermediate image scales and arrow matrices were sampled during hover and exit at every size. Representative local phone samples: featured scale 1.07235 at 281ms, regular scale 1.07235 at 279ms, link opacity 0.678 and arrow between 0 and -45deg at 271ms. All settled endpoints and reverse transitions matched the source.

Timers include browser input, frame scheduling, and hydration latency. Exact transition constants are corroborated from the public modules; these samples demonstrate the phases and direction but are not a frame-locked timing comparison. Initial source probes taken before Framer hydration were discarded. No timing parity percentage is claimed.

## Implementation and validation

- `components/blog/motion.tsx` contains small Motion/React client primitives for the card image and View all link. It imports the maintained `motion/react` package, not the generated Framer site runtime.
- `BlogPreview` alone opts into homepage Reveal wrappers. `BlogCards` defaults to no entrance animation, preserving blog index and related-article route behavior. Shared hover fixes apply to every card instance.
- Added card wrapper sizing preserves the collection grid. Settled source/local desktop and mobile blog geometry remains within 0.3px when aligned to the same card landmark.
- Local entrance, independent row/card triggers, one-time replay, and hover/mouseout were exercised at all three viewports. All ended at opacity 1 / transform none.
- Reduced-motion probe: featured image remains transform none; View all opacity can change instantly but arrow remains transform none. No image zoom or arrow rotation is introduced under reduced motion.
- `npm run typecheck --workspace @framer-templates/alytics` passed after implementation.

No assets, article records, route files, metadata, or external destinations were changed by this motion update. Full production integration checks remain owned by the parent task.
