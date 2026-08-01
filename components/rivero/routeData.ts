export type RiveroRoute = {
  href: string;
  label: string;
};

export const riveroRoutes: RiveroRoute[] = [
  { href: "/rivero", label: "Home" },
  { href: "/rivero/about", label: "About" },
  { href: "/rivero/pricing-v1", label: "Pricing V1" },
  { href: "/rivero/pricing-v2", label: "Pricing V2" },
  { href: "/rivero/feature", label: "Features" },
  { href: "/rivero/reviews", label: "Reviews" },
  { href: "/rivero/blog", label: "Blog" },
  { href: "/rivero/case-study", label: "Case Studies" },
  { href: "/rivero/integrations", label: "Integrations" },
  { href: "/rivero/contact-us", label: "Contact" },
  { href: "/rivero/appointment", label: "Appointment" },
  { href: "/rivero/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/rivero/legal/terms-conditions", label: "Terms & Conditions" },
  { href: "/rivero/404", label: "404" },
];

export const blogSlugs = [
  "learn-about-emerging-trends-best-practices-in-hr-payroll-systems-stay-updated",
  "discover-the-latest-trends-tips-strategies-in-hr-payroll-management-stay-informed",
  "introduce-the-blog-and-encourage-users-to-explore-valuable-hr-insights",
  "how-hr-analytics-can-boost-team-performance",
  "5-effective-ways-to-simplify-payroll-with-automation",
  "top-employee-engagement-strategies-for-2025",
  "why-employee-engagement-is-the-key-to-retention",
  "how-to-build-a-strong-company-culture-from-day-one",
  "streamline-your-hiring-process-with-ai-powered-tools",
  "why-employee-engagement-drives-employee-retention",
  "how-to-create-a-strong-company-culture-from-the-start",
  "optimize-your-hiring-process-with-ai-driven-tools",
] as const;

export const caseStudySlugs = [
  "how-improved-hr-efficiency-by-60",
  "optimizing-hr-systems-for-growth",
  "hr-analytics-driving-strategic-decisions",
  "improving-compliance-across-hr-departments",
  "reducing-errors-in-hr-operations",
  "digital-transformation-in-hr-operations",
  "what-specific-hr-or-payroll-issues",
] as const;

export const integrationSlugs = [
  "fusematrix",
  "paylink",
  "teamconnect",
  "cloudhub",
  "shiftmaster",
  "talentflow",
  "slackmate",
  "taskboard",
  "hrbridge",
] as const;

export const changelogSlugs = [
  "ai-powered-lead-scoring-(3.2.0)-h",
  "enhanced-analytics-dashboard-(3.1.0)b",
  "enhanced-analytics-dashboard-(3.0.0)n",
  "enhanced-analytics-dashboard-(2.5.0)j",
] as const;

export const allRiveroPaths = [
  "/rivero",
  "/rivero/about",
  "/rivero/pricing-v1",
  "/rivero/pricing-v2",
  "/rivero/feature",
  "/rivero/reviews",
  "/rivero/blog",
  ...blogSlugs.map((slug) => `/rivero/blog/${slug}`),
  "/rivero/case-study",
  ...caseStudySlugs.map((slug) => `/rivero/case-study/${slug}`),
  "/rivero/integrations",
  ...integrationSlugs.map((slug) => `/rivero/integrations/${slug}`),
  "/rivero/contact-us",
  "/rivero/appointment",
  "/rivero/legal/privacy-policy",
  "/rivero/legal/terms-conditions",
  ...changelogSlugs.map((slug) => `/rivero/changelog/${slug}`),
  "/rivero/404",
] as const;
