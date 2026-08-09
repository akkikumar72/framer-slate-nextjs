import { blogSlugs } from "@/components/rivero/routeData";

export type RiveroBlogPost = {
  slug: (typeof blogSlugs)[number];
  title: string;
  image: string;
};

const titles: Record<(typeof blogSlugs)[number], string> = {
  "learn-about-emerging-trends-best-practices-in-hr-payroll-systems-stay-updated":
    "Learn about emerging trends best practices in HR payroll systems stay updated",
  "discover-the-latest-trends-tips-strategies-in-hr-payroll-management-stay-informed":
    "Discover the latest trends tips strategies in HR payroll management stay informed",
  "introduce-the-blog-and-encourage-users-to-explore-valuable-hr-insights":
    "Introduce the blog and encourage users to explore valuable HR insights",
  "how-hr-analytics-can-boost-team-performance":
    "How HR Analytics Can Boost Team Performance",
  "5-effective-ways-to-simplify-payroll-with-automation":
    "5 Effective Ways to Simplify Payroll with Automation",
  "top-employee-engagement-strategies-for-2025":
    "Top Employee Engagement Strategies for 2025",
  "why-employee-engagement-is-the-key-to-retention":
    "Why Employee Engagement Is the Key to Retention",
  "how-to-build-a-strong-company-culture-from-day-one":
    "How to Build a Strong Company Culture from Day One",
  "streamline-your-hiring-process-with-ai-powered-tools":
    "Streamline Your Hiring Process with AI-Powered Tools",
  "why-employee-engagement-drives-employee-retention":
    "Why Employee Engagement Drives Employee Retention",
  "how-to-create-a-strong-company-culture-from-the-start":
    "How to Create a Strong Company Culture from the Start",
  "optimize-your-hiring-process-with-ai-driven-tools":
    "Optimize Your Hiring Process with AI-Driven Tools",
};

const images: Record<(typeof blogSlugs)[number], string> = {
  "learn-about-emerging-trends-best-practices-in-hr-payroll-systems-stay-updated":
    "/rivero/assets/2f3638d9a63647a9.jpg",
  "discover-the-latest-trends-tips-strategies-in-hr-payroll-management-stay-informed":
    "/rivero/assets/213973ced11f9638.jpg",
  "introduce-the-blog-and-encourage-users-to-explore-valuable-hr-insights":
    "/rivero/assets/42ad26ceac76e84b.jpg",
  "how-hr-analytics-can-boost-team-performance":
    "/rivero/assets/MtdzFZyshGk77Kfshdi5mnDOjPI.jpg",
  "5-effective-ways-to-simplify-payroll-with-automation":
    "/rivero/assets/m3wNCEg5vrWzRy55y1Jb8CkUcEQ.jpg",
  "top-employee-engagement-strategies-for-2025":
    "/rivero/assets/a387f2bd0bcc3d97.jpg",
  "why-employee-engagement-is-the-key-to-retention":
    "/rivero/assets/fw257WGjNkSv96geYYRLbpn1fY.jpg",
  "how-to-build-a-strong-company-culture-from-day-one":
    "/rivero/assets/6be8a53d812614d5.jpg",
  "streamline-your-hiring-process-with-ai-powered-tools":
    "/rivero/assets/tndhuqbAobpSTdZr0jnSSAHEl8.jpg",
  "why-employee-engagement-drives-employee-retention":
    "/rivero/assets/QiteyYAjxDuIdAngasiaa5k1o.jpg",
  "how-to-create-a-strong-company-culture-from-the-start":
    "/rivero/assets/c7jwos1DYfpSHV05byLLMan93Os.jpg",
  "optimize-your-hiring-process-with-ai-driven-tools":
    "/rivero/assets/42ad26ceac76e84b.jpg",
};

export const riveroBlogPosts: RiveroBlogPost[] = blogSlugs.map((slug) => ({
  slug,
  title: titles[slug],
  image: images[slug],
}));

export const riveroBlogPostsBySlug = Object.fromEntries(
  riveroBlogPosts.map((post) => [post.slug, post]),
) as Record<(typeof blogSlugs)[number], RiveroBlogPost>;

export const blogDate = "Dec 28, 2025";
export const blogCategory = "Technology";

export const blogLeadSummary =
  "Efficiently track and manage orders live from the point Efficiently track and manage orders live from the point of pickup to the point.";

export const articleIntro =
  "Remote work is no longer just a trend; it has become the new standard for businesses of all sizes. with the shift to remote work, teams need effective tools and strategies to stay connected, organized, and productive. taskhub provides a comprehensive platform designed to help remote teams collaborate seamlessly and manage their tasks efficiently. in this guide, we’ll explore the best practices and tools you can use to effectively manage remote teams using taskhub.";

export const articleExplanation =
  "communication is the backbone of any successful remote team. without face-to-face interactions, it’s essential to set up reliable communication channels to keep everyone informed and aligned.\n\nremote work is no longer just a trend; it has become the new standard for businesses of all sizes. with the shift to remote work, teams need effective tools and strategies to stay connected, organized, and productive. taskhub provides a comprehensive platform designed to help remote teams collaborate seamlessly and manage their tasks efficiently. in this guide, we’ll explore the best practices and tools you can use to effectively manage remote teams using taskhub.";

export const articleSections = [
  "1. establish clear communication channels",
  "2. set clear goals and expectations",
  "3. leverage taskhub’s collaboration tools",
  "4. foster team engagement and accountability",
  "5. utilize performance tracking and reporting",
] as const;

export function getRiveroBlogPost(slug: string) {
  return riveroBlogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: RiveroBlogPost) {
  return riveroBlogPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 3);
}
