# Sticky intro motion verification

The intro card now uses the published GridFolio transition values instead of a generic 300ms ease.

## Measured contract

| Property | Behavior |
| --- | --- |
| Activation | First project tile crosses its document offset minus 1px; with the 8px grid padding, activation is scrollY >= 7 |
| Background | Black at 8% opacity to opaque black, 800ms, cubic-bezier(.79,-.02,.21,1.01), no delay |
| Shadow | None to 0 12px 20px rgba(0,0,0,.32), same 800ms curve |
| Main text | Black to white, 400ms, same curve |
| Secondary text and navigation | rgba(0,0,0,.56) to rgba(255,255,255,.72), 400ms, same curve |
| Contact pill | Black/white inversion, 800ms, cubic-bezier(.83,.01,.23,1.01) |
| Contact hover | Black at 56% opacity when light; white at 72% when dark |
| Position | Sticky at 8px on screens at least 810px wide |
| Replay | Reverses at the top; a reversal during a fade starts from its current visual state |
| Phone | No pinning or color switch below 810px |
| Reduced motion | Same final states without timed transitions |

## Verification

![Reference and Next.js intro at the light and dark endpoints](intro-motion-comparison.png)

Recorded initial, intermediate, and settled colors and geometry in the live reference and local production preview at 1280 x 900. Confirmed the breakpoint at 810px and phone behavior at 390 x 844. Reference and local card width were 416px, with sticky top within 0.01px of 8px. The background reaches its final state in approximately 800ms in either direction; browser frame scheduling can move individual sample times by a frame.

Regression tests check the light state at scrollY 6, activation at 7, slow early fade, intermediate gray, final color and shadow, continued pinning, reverse playback, interruption, Contact hover, responsive changes, and reduced motion. Existing dialog and navigation checks remain enabled.

Native CSS performs the transitions. Primary text explicitly interpolates both ways: the reference's generated styles can snap the primary text to black when removing its dark override. This version keeps the return smooth. Native browser color interpolation can also differ slightly from the reference's JavaScript color mixing. The background, shadow, and Contact timing curves use the exact published values.

Sample content, the hidden unconfigured Email link in the standalone portfolio, and the intentionally removed framework badge are unrelated to this motion change.
