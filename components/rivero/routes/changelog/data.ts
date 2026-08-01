export const changelogSlugs = [
  "ai-powered-lead-scoring-(3.2.0)-h",
  "enhanced-analytics-dashboard-(3.1.0)b",
  "enhanced-analytics-dashboard-(3.0.0)n",
  "enhanced-analytics-dashboard-(2.5.0)j",
] as const;

export const changelogEntries = [
  {
    date: "January 19, 2026",
    version: "V0.2.0",
    title: "AI-Powered Lead Scoring (3.2.0)",
    body: "We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or security practices when updates occur, we will revise the “Last Updated” date and notify users when required.",
    subheading: "New UI for Software",
    detail: "We’ve introduced AI lead scoring to help you focus on top prospects. It evaluates past interactions to rank leads, improving your conversion rates.",
  },
  { date: "December 24, 2025", version: "V0.1.5", title: "Enhanced Analytics Dashboard (3.1.0)", body: "The updated analytics dashboard now provides deeper insights into engagement metrics, helping teams to make data-driven decisions more effectively." },
  { date: "December 24, 2025", version: "V0.1.2", title: "Enhanced Analytics Dashboard (3.0.0)", body: "The updated analytics dashboard now provides deeper insights into engagement metrics, helping teams to make data-driven decisions more effectively." },
  { date: "December 24, 2025", version: "V0.1.0", title: "Enhanced Analytics Dashboard (2.5.0)", body: "The updated analytics dashboard now provides deeper insights into engagement metrics, helping teams to make data-driven decisions more effectively." },
];

export function isChangelogSlug(slug: string): slug is (typeof changelogSlugs)[number] {
  return changelogSlugs.some((candidate) => candidate === slug);
}
