export type SaazaiBlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  dateTime: string;
  excerpt: string;
  image: string;
  author: string;
  role: string;
};

export const saazaiBlogPosts: SaazaiBlogPost[] = [
  {
    slug: "what-is-a-no-code-ready-website-design",
    title: "What is a no-code ready website design?",
    category: "Self Dev",
    date: "Dec 6, 2025",
    dateTime: "2025-12-06",
    excerpt: "We’re a team of creators, engineers, and thinkers building.",
    image: "/saazai/assets/blog-01.png",
    author: "Esther Howard",
    role: "Head of Digital Operations",
  },
  {
    slug: "what-is-the-difference-and-when-to-use-them",
    title: "What is the difference and when to use them?",
    category: "Self Dev",
    date: "Oct 4, 2025",
    dateTime: "2025-10-04",
    excerpt: "Practical guidance for choosing the right approach at the right time.",
    image: "/saazai/assets/blog-02.png",
    author: "Ethan Rayner",
    role: "Software Engineer",
  },
  {
    slug: "how-to-build-a-community-around-your-brand",
    title: "How to build a community around your brand?",
    category: "Self Dev",
    date: "Sep 7, 2025",
    dateTime: "2025-09-07",
    excerpt: "A useful framework for turning customers into an active community.",
    image: "/saazai/assets/blog-03.png",
    author: "Mason Keller",
    role: "Creative Director",
  },
  {
    slug: "tips-to-boost-your-ai-agents-route-accuracy",
    title: "Tips to Boost Your AI Agents Route Accuracy",
    category: "AI Operations",
    date: "Jun 17, 2025",
    dateTime: "2025-06-17",
    excerpt: "Make every automated decision more reliable and easier to improve.",
    image: "/saazai/assets/blog-04.png",
    author: "Noah Sterling",
    role: "Finance Consultant",
  },
  {
    slug: "top-benefits-of-using-digital-dispatch-software",
    title: "Top Benefits of Using Digital Dispatch Software",
    category: "AI Operations",
    date: "May 15, 2025",
    dateTime: "2025-05-15",
    excerpt: "Connect your people, plans, and decisions in one clear workflow.",
    image: "/saazai/assets/blog-05.png",
    author: "Adrian Frost",
    role: "Motion Graphics Artist",
  },
  {
    slug: "smart-ways-to-supercharge-your-ai-agent",
    title: "Smart Ways to Supercharge Your AI Agent",
    category: "AI Operations",
    date: "Jul 19, 2025",
    dateTime: "2025-07-19",
    excerpt: "Small workflow changes that help an AI agent deliver better results.",
    image: "/saazai/assets/blog-06.png",
    author: "Mila Rowan",
    role: "Advertising Consultant",
  },
  {
    slug: "empower-your-drivers-with-smarter-mobile-tools",
    title: "Empower Your Drivers With Smarter Mobile Tools",
    category: "AI Operations",
    date: "Oct 27, 2025",
    dateTime: "2025-10-27",
    excerpt: "Give distributed teams the information they need wherever work happens.",
    image: "/saazai/assets/blog-07.png",
    author: "Julian Park",
    role: "App Developer",
  },
  {
    slug: "route-optimization-tactics-that-actually-work-fast",
    title: "Route Optimization Tactics That Actually Work Fast",
    category: "AI Operations",
    date: "Oct 3, 2025",
    dateTime: "2025-10-03",
    excerpt: "Simple, measurable tactics for faster planning and smoother delivery.",
    image: "/saazai/assets/blog-08.png",
    author: "Kiara Solis",
    role: "Social Media Manager",
  },
  {
    slug: "what-to-expect-in-trucking-tech-trends",
    title: "What to Expect in Trucking Tech Trends",
    category: "AI Operations",
    date: "Sep 7, 2025",
    dateTime: "2025-09-07",
    excerpt: "The practical technology shifts shaping the next era of operations.",
    image: "/saazai/assets/blog-09.png",
    author: "Rehan Carter",
    role: "Data Scientist",
  },
];

export const saazaiBlogPostsBySlug = Object.fromEntries(
  saazaiBlogPosts.map((post) => [post.slug, post])
) as Record<string, SaazaiBlogPost>;
