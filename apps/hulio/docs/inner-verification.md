# Hulio inner-page verification

Owner: inner-pages worker. Reference inspection and local production checks performed on 14 September 2026.

## Scope

| Local route | Reference | Disposition |
| --- | --- | --- |
| `/hulio/about` | https://hulio.framer.website/about | Implemented |
| `/hulio/team` | https://hulio.framer.website/team | Implemented with shared TeamGrid |
| `/hulio/pricing` | https://hulio.framer.website/pricing | Implemented with data-driven plans |
| `/hulio/contact` | https://hulio.framer.website/contact | Implemented with local form and FAQ state |
| `/hulio/privacy-policy` | https://hulio.framer.website/privacy-policy | Full source policy reproduced |

Reference evidence: live browser screenshots, accessibility snapshots, computed styles, element rectangles, and the downloaded public HTML under `/tmp/hulio-source`. Desktop reference inspected at 1280×720. Every reference route additionally inspected at 810×1080 and 390×844. All five routes rendered in the local production preview at desktop and810×1080. The tablet smoke check found no horizontal overflow or broken images on any route. Local contact and privacy were additionally inspected at390×844 before the last responsive corrections. Final integrated responsive capture coverage belongs to the parent verification pass.

## Desktop measurements

Measurements below compare the first production build against a settled 1280×720 reference. Later changes correct the differences noted here.

| Landmark | Reference | Local first build | Result |
| --- | --- | --- | --- |
| About image strip top | 415.594px | 415.563px | Delta 0.031px |
| About image widths | 450 / 370 / 270px | 450 / 370 / 270px | Match |
| About image heights / gaps | 300 / 30px | 300 / 30px | Match |
| About story heading top | 795.594px | 795.563px | Delta 0.031px |
| About video top | 1294.750px | 1294.719px | Delta 0.031px |
| Policy article left / width | 237.5 / 805px | 237.5 / 805px | Match |
| Policy article top | 368.391px | 368.375px | Delta 0.016px |
| All eight policy heading tops | 368.391 through 1946.500px | 368.375 through 1946.484px | Every delta 0.016px |
| Pricing cards top | 415.594px | 415.563px | Delta 0.031px |
| Pricing card height | 581.547px | 589.547px | Corrected list gap to12px and CTA gap to40px |
| Contact form height | 650.391px | 650.391px | Match |
| Contact form top | 385.203px | 379.766px | Shared SectionLabel line-height corrected from1.3 to1.6 |

No broken images were found in the About or Team production routes. No warning/error console entries were found in the Contact or About production checks. Shared header, footer, TeamGrid and CTA fidelity are tracked by the parent. These landmark measurements do not establish full-page parity.

## Responsive contracts

- Inner body copy is15px/24px below1200px. Source primary heading presets alone were insufficient: Pricing uses a separate32px phone heading and30px prices, while Team, Contact and Policy retain28px phone primary headings.
- About has a three-image strip at desktop, three200px-tall columns on tablet, and three300px-tall stacked images on phone. Awards stack vertically on phone. Video is550px desktop and400px at both smaller widths. Counter endpoints are250+,55%,80+, observed after scrolling into view.
- Team uses three columns desktop, two tablet, one phone. Phone reference first photo is350×389.203px, beginning313.594px from the page top. Its name is24px with24px above and8px before the15px role. These shared-component measurements were supplied to the parent.
- Pricing uses three cards desktop/tablet and a stack on phone. Card padding36px desktop and24px tablet/phone. Phone reference plan label16px, price30px/1.2; tablet price32px/1.2. Tablet heading/description width is70% of the760px content container.
- Contact stacks input rows on phone, retains all labels/options, uses24px vertical gaps inside rows and20px between row groups. Phone form350×769.984px, starting259.188px. Submit is52px tall, fills the310px inner form width and sits30px below the textarea. Tablet form760×600.391px.
- Policy intentionally keeps25px phone gutters, making the article340px wide at390px. Its phone article starts292.797px,50px after the description; subsequent section gaps28.8px. Tablet article is760px wide. Local CSS now follows these measured values.

## Contact behavior

Reference form has no HTML action or method. Its visible required fields are Name(text), Email(email), Phone(text), Discovery method(select), and Message(textarea). The reference offers Google Search, Social Media, Friend or Family, Online Advertisement and YouTube, with Google Search selected initially. Live submission was not attempted against the public site.

Production checks passed:

1. Empty required fields prevent submission, and malformed email sets native `typeMismatch`.
2. A valid local-only sample submission displays: “Your message has not been sent. This local preview is not connected to a delivery service.” No delivery request is made.
3. All five discovery options were selected successfully.
4. All five FAQ states expose the correct answer, close the prior answer, and update `aria-expanded`. The initially open first answer can also be closed.
5. Enter opens and closes the focused FAQ. All answers can be closed. Hidden answers do not remain visible. No console warnings or errors were recorded.

FAQ copy is preserved in `components/inner/contact.tsx`:

| Question | Answer |
| --- | --- |
| How long does a website project usually take to complete? | The duration of a website project typically depends on its complexity. A basic website might take 2–4 weeks, while more advanced ones can take 2–3 months or more. Clear requirements and good communication help speed up the process. |
| How much does a website cost? | The cost of a website varies based on design, features, and functionality. A simple site can cost $500–$2,000, while custom or e-commerce sites may range from $3,000 to $10,000 or more. Ongoing maintenance and hosting also add to the total cost. |
| We have a limited budget, will you still work with us? | Yes, absolutely! We’re happy to work within your budget and can suggest solutions that fit your needs. Let’s discuss your goals and find the best approach together. |
| Do you outsource any work? | No, we don’t outsource our work. All design and development is handled in-house to ensure consistent quality and clear communication. This helps us maintain full control over the project timeline and results. |
| What services or solutions do you offer? | We offer a range of services including website design, web development, UI/UX design, and branding. We also provide custom solutions like e-commerce development, admin dashboards, and content management systems. |

## Intentional differences and limits

- The public About phone variant accidentally displays “Some Affordable Pricing Plans for you!” The rebuild retains the meaningful About headline, “Where Creativity Meets Digital Success,” at every width. Parent approved this correction.
- Form delivery requires a backend integration. The local preview explicitly reports that messages have not been sent.
- Public policy copy, including its date and the source's “Meridian” reference, is preserved as template content. No legal-policy rewrite was requested.
- FAQ uses semantic buttons, explicit expanded state, keyboard activation and a short opacity transition. Exact Framer spring interpolation is not claimed.
- Shared reveal and counter components provide reduced-motion support. Exact source motion timing is not claimed; source counter endpoints were verified.
- Final production rebuild, all-viewports side-by-side captures and full-page geometry must be evaluated by the parent after the integrated corrections. No fidelity percentage is assigned.

## Checks and ownership

`npm run check --workspace=@framer-templates/hulio` passed during route implementation: TypeScript passed; asset audit reported125 references and126 bundled files. The parent runs the final integrated production build after the last responsive CSS adjustments.

Changed files: five route `page.tsx` files under `app/hulio/{about,team,pricing,contact,privacy-policy}`, `components/inner/contact.tsx`, `components/inner/inner.module.css`, and this document. Four original inline award SVGs were extracted to `/tmp/hulio-source/award-*.svg`; the parent copied them into the public asset directory. No dependencies or shared files were edited by this worker. Nothing was deployed.

## Final integrated screenshot evidence

Captured the final production preview at http://127.0.0.1:3013/hulio against the public source on 2026-09-14 using CUA-controlled temporary Chrome tabs. Saved 20 viewport screenshots, forming 10 matched pairs: About, Team, Pricing, Contact and Privacy Policy at 390×844 and 1280×720. Each capture was made at scroll position 0,0 after the page settled. Pair paths, URLs, viewport dimensions, heading/image geometry and overflow/image results are recorded in `.codex-evidence/hulio/inner/screenshot-pairs.json`.

All ten local states had zero horizontal overflow, no broken loaded images, and loaded visible images. About phone first image placement differs by under 0.02px; Team phone title and first image geometry match exactly. Contact phone heading and FAQ geometry differ by under 0.04px. Policy phone title and first article heading placement match. Desktop first-content layout was visually compared for all five routes.

The About phone headline correction is intentional: the public template incorrectly uses its pricing headline, while the local page retains “Where Creativity Meets Digital Success.” Other observed residual differences are minor: Team social icons are black rather than gray and image cutout corners are sharper; Pricing phone feature spacing puts its first CTA approximately 8px lower and desktop Silver description wraps differently; Contact phone field text has 8px less left inset and uses a native select arrow; policy bullet markers have a small horizontal indent difference. Attribution badges differ slightly in padding and size. These observations were recorded without changing code during the capture-only pass. This verifies the top/first-content states, not every scroll position or exact motion timing.
