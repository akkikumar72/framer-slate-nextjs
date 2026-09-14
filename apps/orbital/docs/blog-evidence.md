# Orbital blog evidence

## Route family

- Index: `/orbital/blog`
- Data-driven articles: the nine slugs listed in `route-manifest.json`
- Shared shell: inherited from `app/orbital/layout.tsx`; the route adds no header, CTA, or footer copy.

## Source evidence

- Reference pages: `https://orbital-gr8r.framer.website/blog` and `https://orbital-gr8r.framer.website/blog/why-ci-evaluations-matter`
- Extraction inputs used during implementation: `/tmp/orbital-reference/blog.html`, `/tmp/orbital-reference/blog.json`, and all `/tmp/orbital-reference/blog--*.html` / `.json` files. These temporary files are not repository artifacts.
- Desktop browser sample: 1280 × 720. Index body height 4037 px; two-column card grid with 598 px cards and 12 px column gap. Article body height 4318 px; content column 794 px wide, hero image 794 × 415 px.
- Responsive evidence in source `sizes`: three columns at 1440 px and above, two columns from 810 through 1439.98 px, and one column below 810 px.

## Visual verification

- The second-pass 1280 px audit measured identical 4037 px source/local index page heights. Grid columns were 598 px with a 12 px gap; all local content was vertically within 0.41 px of the source because the shared 36 px section label rounds 0.40625 px taller than Framer's rendered label.
- The second-pass 1280 px article audit measured identical 4318 px source/local page heights. The 765 px heading and 794 × 415 px hero/content column matched exactly; all four rich-text headings and the article/keep-reading boundary were within 0.39 px.
- At 1280 px, the keep-reading section measured 1325.77 px locally against 1325.78 px in the source. Its 1180 px two-column grid, 20 px column gap, 72 px heading-to-grid separation, and effective 28 px bottom space follow the rendered source geometry.
- At 390 px, the index card widths, image/copy/author heights, 32 px inter-card gaps, and 32 px page inset matched exactly. The initial local index boundary was 3.59 px early solely because the shared phone section label was 32 px locally versus 35.59 px in the source; the shared label was corrected after this capture.
- Article phone geometry uses the source's 326 px column, stacked 83 px author/metadata row, responsive rich-text wrapping, 47 px divider, and 326 px keep-reading cards.
- No blog-specific screenshots remained in `/tmp/orbital-reference/screenshots` at handoff, so there were no matched captures to copy into `docs/evidence`.

## Build verification

- TypeScript validation passed.
- The production build passed and generated all nine article slugs statically.
- The initial app asset audit passed; final app totals are recorded in validation.md.

## Content and assets

- Each article has its own title, excerpt, author, role, date, category, read time, hero image, and profile image.
- The published template repeats the same rich article body across all nine slugs. The implementation preserves that source behavior, including the source's double spaces where punctuation is visually absent.
- The common body contains paragraphs, four headings, one emphasized quotation, one three-item list, and the `JB0rOM8FFjp6x8UqtTxDM1brO8` details image.
- Article recommendations are the first three published posts on every detail route, matching the rendered reference.

## Layout contract

- Index starts below the 76 px navigation layer and uses the shared `.orb-container` width.
- On desktop, the 765 px article heading and 794 px article body are centered. From 810 through 1439 px they align 20 px inside the shared container, and below 810 px they sit in the source-capped 580 px route frame with a 12 px inner inset.
- Blog cards use cropped 1588 × 830 source media, bordered text and author rows, and circular 28 px author portraits.
- At widths below 810 px, cards stack, article metadata stacks, and all text/media stay within the shared phone container.

## Known source limitations

- The source article content appears to be template placeholder copy reused verbatim across otherwise distinct posts.
- The article body contains two places where extracted and rendered text has two spaces instead of visible punctuation. These are preserved rather than editorially repaired.
