# Hulio collections verification

Reference: https://hulio.framer.website/, checked 2026-09-14.
Local production: http://127.0.0.1:3013/hulio.

## Scope and implementation

- Project index and six project detail slugs from the frozen route manifest.
- Blog index and nine full article slugs from the frozen route manifest.
- Data-driven semantic rich content retains headings, paragraphs, emphasis, lists, quotes, metadata, images, and the observed related links. All nine article bodies have distinct content hashes.
- Original public images resolve through the shared local asset map. Every collections image key exists in that map.
- `ProjectGrid` and `BlogGrid` are shared with the homepage. Headers, footers, buttons, labels, motion and asset lookup use the shared application primitives.
- Invalid detail slugs use `dynamicParams = false` and `notFound()`.
- Reference discrepancy preserved: NovaUI index card credits Terio Zemip, while its detail-page Client field says Gary Neville.

## Verified interaction states

| Control | Reference | Local production |
| --- | --- | --- |
| Project Load More | 4 cards become 6; control disappears | Passed, 4 to 6; zero Load More buttons after click |
| Blog Load More | 6 cards become 9; control disappears | Passed, 6 to 9; zero Load More buttons after click |
| Project card pointer | Tags enter top right; 100px green circle and arrow follow pointer | Implemented with pointer coordinates, keyboard focus fallback, CSS transitions |
| Blog card pointer | Author portrait enters bottom left | Implemented; portrait remains visible on smaller variants |
| Related article links | Three related canonical detail paths | Source-derived route targets confirmed in rendered production DOM |

## Desktop measured geometry

At 1280 × 720, before final shared-footer tuning:

| Landmark | Reference | Local production | Delta |
| --- | --- | --- | --- |
| Project index h1 top | 170 | 170 | 0px |
| Project first card top | 435.59375 | 435.5625 | -0.03125px |
| Project first card width × height | 550 × 616.390625 | 550 × 616.390625 | 0px |
| Blog first card top | 358.390625 | 358.375 | -0.015625px |
| Blog first card width × height | 363.328125 × 390.375 | same | 0px |
| Bold Typography hero top | 358.390625 | 358.375 | -0.015625px |
| Bold Typography hero dimensions | 1150 × 660 | 1150 × 660 | 0px |
| Project Overview top | 1078.390625 | 1078.375 | -0.015625px |
| First blog hero top | 477.59375 | 477.5625 | -0.03125px |
| First blog body start | 1087.59375 | 1087.5625 | -0.03125px |
| First blog last heading top | 2814.1875 | 2814.15625 | -0.03125px |

Small project-body differences were traced to the fact-list gap and process-card borders and corrected. Related-section differences were traced to share-row height and label typography and corrected. Whole-page height also depends on parent-owned footer geometry and is not claimed to match from these section measurements.

## Responsive reference contracts

All four page families were inspected at 810 × 1080 and 390 × 844 using separate browser tabs with measured viewport dimensions.

| Landmark | 810px reference | 390px reference |
| --- | --- | --- |
| All collection h1 top | 120 | 120 |
| Index content edges | x25, width760 | x20, width350 |
| Project index first card top | 297.59375 | 333.59375 |
| Project card image | 360 × 285 | 350 × 285 |
| Project card height / row gap | 371 / 60 | 371 / 60 |
| Blog index first card top | 277.59375 | 282.796875 |
| Blog card height | 376 | 376 |
| Project detail hero | top287.59375, 760 × 400 | top333.59375, 350 × 240 |
| Project Overview | top747.59375, 32px heading | top609.59375, 30px heading |
| Blog detail hero | top389.1875, 760 × 400 | top433.59375, 350 × 250 |
| Blog body start | 839.1875 | 723.59375 |

Smaller variants use 15px/24px body text, 20px/24px card headings, 36px tablet h1, 28px phone h1, a single phone column, and two tablet index columns. Project process cards stack below desktop. Gallery heights and columns follow the source variants. Article authors remain 40px portraits on phone; article body images are 300px high on phone/tablet.

## Checks and limits

- `npm run typecheck --workspace=@framer-templates/hulio`: passed after collection implementation and refinements.
- Every collection image key checked against `lib/asset-map.json`: passed.
- Both collection pagination flows and representative detail pages checked in the production browser.
- Parent owns final production build, complete HTTP/route audit, shared shell fidelity, and final screenshots.
- Reference and local desktop screenshots were inspected in the tool transcript at identical viewport dimensions. No saved side-by-side composite is claimed in this file.
- Production responsive recheck completed at 810 × 1080 and 390 × 844. Both index-family heading and first-card rectangles match the reference exactly at both widths. First blog article headings and image rectangles match exactly in both widths. Project detail title, hero, and Overview start match exactly; final small downstream process/fact spacing corrections require the parent final build. These measured sections do not prove whole-page or exact motion parity.
- Load/intersection motion uses the shared maintainable Reveal implementation. Exact Framer spring timing has not been measured, so exact motion parity is not claimed.

## Final responsive corrections

Phone project process-card padding was measured at36px and corrected from28px. Tablet fact values were measured at16px and corrected from18px. Both corrections explain the measured downstream geometry deltas. Original share icons were localized as SVG assets.
