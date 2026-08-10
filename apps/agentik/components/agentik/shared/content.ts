export type AgentikBlogPost = {
  slug: string;
  title: string;
  category: "Case Studies" | "Trends" | "Guides";
  author: string;
  cover: string;
  authorImage: string;
  authorPosition?: string;
};

export const BLOG_POSTS: AgentikBlogPost[] = [
  {
    slug: "how-we-saved-a-logistics-company-200-hours-a-month",
    title: "How we saved a logistics company 200 hours a month",
    category: "Case Studies",
    author: "Emmanuel Karuri",
    cover: "/agentik/assets/blog-logistics.avif",
    authorImage: "/agentik/assets/team-emmanuel.avif",
    authorPosition: "48.6% 41.5%",
  },
  {
    slug: "why-voice-agents-are-the-next-big-thing-for-agencies",
    title: "Why voice agents are the next big thing for agencies",
    category: "Trends",
    author: "Adnan Sami",
    cover: "/agentik/assets/blog-voice-agents.avif",
    authorImage: "/agentik/assets/team-adnan.avif",
    authorPosition: "60.2% 20.4%",
  },
  {
    slug: "a-beginner-s-guide-to-automating-your-sales-pipeline",
    title: "A beginner's guide to automating your sales pipeline",
    category: "Trends",
    author: "Evelyn Chau",
    cover: "/agentik/assets/blog-sales-pipeline.png",
    authorImage: "/agentik/assets/team-evelyn.png",
  },
  {
    slug: "five-ai-tools-every-small-business-should-use-in-2026",
    title: "Five AI tools every small business should use in 2026",
    category: "Guides",
    author: "Tom Richards",
    cover: "/agentik/assets/blog-ai-tools.png",
    authorImage: "/agentik/assets/team-tom.png",
    authorPosition: "44.8% 16.7%",
  },
];

export type AgentikTeamMember = {
  name: string;
  role: string;
  image: string;
  position?: string;
};

export const TEAM_MEMBERS: AgentikTeamMember[] = [
  {
    name: "Sarah Belle",
    role: "CEO & Co-founder",
    image: "/agentik/assets/team-sarah.png",
  },
  {
    name: "Adnan Sami",
    role: "CFO & Co-founder",
    image: "/agentik/assets/team-adnan.avif",
    position: "60.2% 20.4%",
  },
  {
    name: "Evelyn Chau",
    role: "Lead AI Engineer",
    image: "/agentik/assets/team-evelyn.png",
  },
  {
    name: "Emmanuel Karuri",
    role: "Automation Specialist",
    image: "/agentik/assets/team-emmanuel.avif",
    position: "48.6% 41.5%",
  },
  {
    name: "Eniola Kabubi",
    role: "Client Success Manager",
    image: "/agentik/assets/team-eniola.png",
  },
  {
    name: "Tom Richards",
    role: "Data & Analytics Lead",
    image: "/agentik/assets/team-tom.png",
    position: "44.8% 16.7%",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How long does it take to get set up?",
    answer:
      "Most clients are fully up and running within 2-4 weeks. It depends on the complexity of your workflows, but we move fast and keep you in the loop at every stage.",
  },
  {
    question: "Do I need any technical knowledge?",
    answer:
      "Not at all. We handle everything — from strategy to setup to training. You just need to know how your business runs. We'll take care of the rest.",
  },
  {
    question: "Will AI replace my team?",
    answer:
      "No. AI handles the repetitive tasks that slow your team down. Your people get to focus on higher-value work — the stuff that actually grows your business.",
  },
  {
    question: "What tools do you integrate with?",
    answer:
      "We work with the tools you already use — Slack, HubSpot, Salesforce, Google Workspace, Notion, Zapier, and more. If you use it, we can probably connect to it.",
  },
  {
    question: "What if it doesn't work for my business?",
    answer:
      "We start every engagement with a discovery call to make sure AI is the right fit. If it's not, we'll tell you. We'd rather be honest than waste your time.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. Start with what fits now and scale up whenever you're ready. There are no long-term contracts or lock-ins.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free consultation. We'll learn about your business, find the biggest opportunities, and put together a clear plan — no pressure, no jargon.",
  },
] as const;
