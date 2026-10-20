export const B2_PREFIX = "/b2bizz";

export const navLinks = [
  { label: "Home", href: B2_PREFIX },
  { label: "Home 2", href: `${B2_PREFIX}/home-2` },
  { label: "About", href: `${B2_PREFIX}/about` },
  { label: "Services", href: `${B2_PREFIX}/service` },
  { label: "Case Studies", href: `${B2_PREFIX}/case-study` },
  { label: "Blog", href: `${B2_PREFIX}/blog` },
  { label: "Contact", href: `${B2_PREFIX}/contact` },
] as const;

export const services = [
  {
    slug: "b2b-website-design-development",
    title: "B2B website design & development",
    summary: "Conversion-focused websites are built for speed, trust, and lead generation.",
    tags: ["Business website", "Corporate site", "Responsive design"],
    image: "gdRM7GW5TQGv1DnZNScYVrTUQE.jpg",
    icon: "faPhM0qEMdEDrvx9YQHLGdq9H58.svg",
  },
  {
    slug: "custom-saas-solutions",
    title: "Custom SaaS solutions",
    summary: "Robust SaaS platforms tailored for growth, scalability, and performance.",
    tags: ["SaaS development", "Cloud platform", "MVP"],
    image: "8kma30ImR7rLIvZAXGsqbVM48.jpg",
    icon: "wba5aXb5NBJ72EgeKZ5MjD6fvM.svg",
  },
  {
    slug: "crm-erp-integrations",
    title: "CRM & ERP integrations",
    summary: "Streamline operations with seamless business system integrations.",
    tags: ["Automation", "Business tools", "KPIs"],
    image: "WZgpMe3nzQNLHEKKxkNAVTLsJ6k.jpg",
    icon: "qO0gP79WRVKKssXtK6bje8XqSg.svg",
  },
  {
    slug: "enterprise-digital-strategy",
    title: "Enterprise digital strategy",
    summary: "Enabling smarter decision-making through digital strategy.",
    tags: ["Digital transformation", "B2B marketing", "KPIs"],
    image: "drIdWgUE5zBF1yAbgCfVAuoJTAs.jpg",
    icon: "P0UtFaB6T9xFY59SZ5kACLPZZ04.svg",
  },
  {
    slug: "data-driven-marketing",
    title: "Data-Driven marketing",
    summary: "Professional, conversion-optimized websites tailored for business clients and lead generation.",
    tags: ["Business website", "Corporate site", "Responsive design"],
    image: "lGRIbBKBhBk3miyV7UG3h71RxKk.jpg",
    icon: "jRh02Ak18MTJcPI8NlsvMXJ6G5g.svg",
  },
] as const;

export const caseStudies = [
  { slug: "lead-generation-boost-for-a-b2b-logistics-company", title: "Lead generation boost for a B2B logistics company", category: "Design & development", client: "EdgeTrans", image: "KZBATV7TBPgBxGgzaAjj79STA8.jpg", result: "2.5X B2B lead uplift" },
  { slug: "scalable-saas-platform-for-a-fintech-startup", title: "Scalable SaaS platform for a fintech startup", category: "SaaS solution", client: "Brand Edge", image: "SDF44TiCtWyHIceLhE0MsUGlSps.jpg", result: "50% Follower base growth" },
  { slug: "enterprise-resource-integration-for-a-manufacturing-firm", title: "Enterprise resource integration for a manufacturing firm", category: "CRM & ERP integrations", client: "Eco Enterprise", image: "ULil3BuLizq2aHXRU0MIGjYytw.jpg", result: "25% Improved lead flow" },
  { slug: "strategic-digital-shift-for-a-b2b-consulting-agency", title: "Strategic digital shift for a B2B consulting agency", category: "Enterprise digital strategy", client: "Spendora", image: "6nUWPfdYFAEdILhPEC63OrDv3M.jpg", result: "40% Improved engagement" },
  { slug: "saas-product-launch", title: "SaaS product launch", category: "SaaS solution", client: "Nova", image: "nyZo544QkOMb4JMxmjR4KDthig.jpg", result: "3X Faster launch" },
  { slug: "digital-transformation-for-retail", title: "Digital transformation for retail", category: "Digital strategy", client: "Urban Retail", image: "d4bOSjZzklRnk0Y8ssGiLJlIO0.jpg", result: "45% Better efficiency" },
  { slug: "website-redesign-for-a-non-profit", title: "Website redesign for a non-profit", category: "Design & development", client: "Community First", image: "GEa5AaG3m0spY7fftLUtH9VOzI.jpg", result: "2X More donations" },
] as const;

export const blogPosts = [
  { slug: "how-to-scale-your-b2b-sales-funnel-in-2026", title: "How to scale your B2B sales funnel in 2026", date: "Jun 18, 2025", image: "Vqnnf2c8TUMDaPweZTzLwKmHec.jpg", category: "Growth" },
  { slug: "the-power-of-market-research-in-b2b-strategy", title: "The power of market research in B2B strategy", date: "Jun 12, 2025", image: "xfRqUBEwWre3EugH67J0zW90I.jpg", category: "Strategy" },
  { slug: "choosing-the-right-crm-for-your-b2b-sales-team", title: "Choosing the right CRM for your B2B sales team", date: "Jun 5, 2025", image: "RjA8XHOIA8k7J1fnQYlwcM8FJE.jpg", category: "Operations" },
  { slug: "how-to-use-analytics-to-make-smarter-decisions", title: "How to use analytics to make smarter decisions", date: "May 29, 2025", image: "snVr8e30vWzyuWwIse849voEUZQ.jpg", category: "Analytics" },
  { slug: "10-must-have-features-in-a-saas-platform", title: "10 must-have features in a SaaS platform", date: "May 22, 2025", image: "detofD77GgrFx4z2p5Hme5s12c.jpg", category: "SaaS" },
  { slug: "best-practices-for-keeping-your-data-secure", title: "Best practices for keeping your data secure", date: "May 15, 2025", image: "g6qy1PW2Ru5mqtOiE8nYKDXaNA.jpg", category: "Security" },
  { slug: "smart-automation-in-modern-manufacturing", title: "Smart automation in modern manufacturing", date: "May 8, 2025", image: "eGjNeYGnzh6PxwjZw2sLNTa0No.jpg", category: "Automation" },
] as const;

export function asset(filename: string) {
  return `${B2_PREFIX}/assets/${filename}`;
}
