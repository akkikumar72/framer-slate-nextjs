export const projectPageDescription =
  "A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectNarrative = {
  label: string;
  heading: string;
  body: string;
};

export type AgenioProject = {
  slug: string;
  title: string;
  titleLines: [string, string];
  summary: string;
  metrics: ProjectMetric[];
  hero: string;
  gallery: string[];
  breakdown: string;
  introduction: string;
  leadHeading: string;
  leadBody: string;
  narratives: [ProjectNarrative, ProjectNarrative, ProjectNarrative];
  nextSlug: string;
};

const projectBase = "/agenio/projects";

export const projects: AgenioProject[] = [
  {
    slug: "ai-chatbot-website",
    title: "AI chatbot Website",
    titleLines: ["AI Chatbot", "Website"],
    summary:
      "We built a conversational AI chatbot website with intelligent automation, refined workflows, and a fast, intuitive user experience.",
    metrics: [
      { value: "+45%", label: "User engagement" },
      { value: "2x", label: "Faster responses" },
      { value: "4 MON", label: "Project timeline" },
    ],
    hero: `${projectBase}/chatbot-hero.webp`,
    gallery: [
      `${projectBase}/chatbot-1.webp`,
      `${projectBase}/chatbot-2.webp`,
      `${projectBase}/chatbot-3.webp`,
      `${projectBase}/chatbot-4.webp`,
      `${projectBase}/chatbot-5.webp`,
      `${projectBase}/chatbot-6.webp`,
      `${projectBase}/chatbot-7.webp`,
    ],
    breakdown: "AI Breakdown",
    introduction:
      "We aimed to bring Nova AI Assistant’s intelligent automation experience to life by focusing on seamless workflows.",
    leadHeading:
      "This project reinforced the importance of building AI-powered systems that improve productivity beyond basic automation. The platform launch exceeded initial engagement expectations, and the client received positive feedback on the assistant’s intuitive experience.",
    leadBody:
      "From research to launch, we focused on natural conversation flows that made the assistant feel responsive, helpful, and effortless to use.",
    narratives: [
      {
        label: "User experience focus",
        heading:
          "One challenge was creating intelligent workflows while maintaining a clean and easy-to-use interface. We streamlined conversation flows that simplified interactions without overwhelming users.",
        body:
          "Designing a responsive AI assistant required balancing automation with natural user experiences. We achieved this by focusing on clear workflows, fast responses, and intuitive interaction patterns.",
      },
      {
        label: "Project research",
        heading:
          "We analyzed user behavior, reviewed AI assistant platforms, and evaluated workflow patterns to identify the features that matter most for engagement and usability.",
        body:
          "This research phase helped align automation goals with user expectations, giving the development and AI integration team a clear direction before implementation.",
      },
      {
        label: "Project result",
        heading:
          "The final release delivered a faster and smarter experience, with improved workflow efficiency and higher user engagement across key interactions.",
        body:
          "By combining intelligent automation, optimized workflows, and performance-focused systems, the platform now supports scalable growth and better long-term adoption.",
      },
    ],
    nextSlug: "nova-ai-assistant",
  },
  {
    slug: "nova-ai-assistant",
    title: "Nova AI Assistant",
    titleLines: ["Nova AI", "Assistant"],
    summary:
      "We designed an AI-powered mobile assistant focused on smarter workflows, faster responses, and seamless user interactions.",
    metrics: [
      { value: "40%", label: "Faster completion" },
      { value: "+25%", label: "User engagement" },
      { value: "4.8", label: "Star Rating" },
    ],
    hero: `${projectBase}/nova-hero.webp`,
    gallery: [
      `${projectBase}/nova-1.jpg`,
      `${projectBase}/nova-2.jpg`,
      `${projectBase}/nova-3.jpg`,
      `${projectBase}/nova-4.jpg`,
      `${projectBase}/nova-5.jpg`,
      `${projectBase}/nova-6.jpg`,
      `${projectBase}/nova-7.jpg`,
    ],
    breakdown: "Product Breakdown",
    introduction:
      "We aimed to bring Nova AI Assistant’s intelligent automation experience to life by focusing on seamless workflows.",
    leadHeading:
      "This project reinforced the importance of building AI-powered systems that improve productivity beyond basic automation. The launch exceeded engagement expectations, and users praised the assistant’s intuitive feel.",
    leadBody:
      "Every interaction was designed to reduce friction, so users could move from intent to outcome in as few steps as possible.",
    narratives: [
      {
        label: "User experience focus",
        heading:
          "One challenge was creating intelligent workflows while keeping the interface clean and approachable. We streamlined conversation flows that simplified tasks without overwhelming users.",
        body:
          "Designing a responsive AI assistant meant balancing automation with natural experiences, achieved through clear workflows, fast responses, and intuitive patterns.",
      },
      {
        label: "Product research",
        heading:
          "We analysed user behaviour, reviewed assistant platforms, and evaluated workflow patterns to surface the features that matter most for engagement.",
        body:
          "This research aligned automation goals with user expectations, giving the design and engineering team a clear direction before build.",
      },
      {
        label: "Project result",
        heading:
          "The final release delivered a faster, smarter experience with improved workflow efficiency and higher engagement across key interactions.",
        body:
          "By combining intelligent automation, optimised flows, and performance-focused systems, the product now supports scalable growth and stronger adoption.",
      },
    ],
    nextSlug: "ai-chatbot-website",
  },
  {
    slug: "ai-brand-identity",
    title: "AI Brand Identity",
    titleLines: ["AI Brand", "Identity"],
    summary:
      "We created a futuristic AI-focused brand identity with modern visuals and a clean technology-driven aesthetic.",
    metrics: [
      { value: "+65%", label: "Brand recognition" },
      { value: "12+", label: "Brand assets" },
      { value: "3 MON", label: "Project timeline" },
    ],
    hero: `${projectBase}/brand-hero.webp`,
    gallery: [
      `${projectBase}/brand-1.jpg`,
      `${projectBase}/brand-2.jpg`,
      `${projectBase}/brand-3.jpg`,
      `${projectBase}/brand-4.jpg`,
      `${projectBase}/brand-5.jpg`,
      `${projectBase}/brand-6.jpg`,
      `${projectBase}/brand-7.jpg`,
    ],
    breakdown: "Brand Breakdown",
    introduction:
      "We set out to give the AI brand a bold, modern presence rooted in clarity, motion, and a forward-looking visual language.",
    leadHeading:
      "This project reinforced how a consistent identity system builds instant recognition. The new branding launched to strong market response, and the client saw immediate lifts in recall and perceived credibility.",
    leadBody:
      "From the first concepts to final rollout, every asset was crafted to feel cohesive across digital and print, giving the brand a confident, unified voice.",
    narratives: [
      {
        label: "Design system focus",
        heading:
          "The challenge was balancing a high-tech feel with long-term flexibility. We created a modular system of marks, gradients, and layouts that scales cleanly across every touchpoint.",
        body:
          "By defining clear rules for spacing, colour, and type, we made the identity easy to apply and hard to break, ensuring consistency as the brand grows.",
      },
      {
        label: "Brand research",
        heading:
          "We studied competitor positioning, AI category aesthetics, and audience perception to identify the visual cues that signal innovation without feeling cold.",
        body:
          "This groundwork aligned the creative direction with business goals, giving stakeholders a clear rationale behind every design decision.",
      },
      {
        label: "Project result",
        heading:
          "The final identity delivered a sharper, more memorable presence, lifting brand recognition and equipping the team with a complete asset library.",
        body:
          "With a scalable system, refined guidelines, and a distinct visual voice, the brand is now positioned for confident, consistent growth.",
      },
    ],
    nextSlug: "ai-chatbot-website",
  },
];

export const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, AgenioProject>;

export const testimonials = [
  {
    title: "Beyond expectations",
    quote:
      "Working with this team completely transformed how we present our product. Their attention to detail and understanding of user experience helped us increase engagement beyond.",
    name: "Daniel Lewis",
    role: "Founder, Lunaris Coffee Co.",
    image: `${projectBase}/testimonial-1.webp`,
  },
  {
    title: "Professional Experience",
    quote:
      "They delivered intelligent AI solutions that aligned perfectly with our business goals. Communication was seamless from start to finish — truly a professional experience.",
    name: "Michael Roberts",
    role: "CEO, Axis Legal Group",
    image: `${projectBase}/testimonial-2.webp`,
  },
  {
    title: "Genuinely love",
    quote:
      "Their AI workflow strategy was smart, efficient, and easy to scale. They quickly understood our operations and built systems that genuinely improved productivity.",
    name: "Jason Ward",
    role: "Product Manager Brightly",
    image: `${projectBase}/testimonial-3.webp`,
  },
] as const;

export const pricingPlans = [
  {
    name: "Starter Plan",
    availability: "Available from Dec",
    audience: "Small businesses, startups, or single-brand projects.",
    price: "$2,500",
    features: [
      "Full service creative",
      "Monthly consulting call",
      "Simple subscription",
      "Scales with your needs",
      "Intergration sync",
      "Updates every 2 days",
      "3 times update",
      "Cancel anytime",
    ],
  },
  {
    name: "Growth Plan",
    availability: "Available Now",
    audience: "Established brands seeking full-scale design support.",
    price: "$5,500",
    features: [
      "Full managed project",
      "Simple subscription",
      "Weekly consulting call",
      "Scales with your needs",
      "Access our entire team",
      "Updates every 2 days",
      "Creative strategy",
      "Cancel anytime",
    ],
  },
] as const;

export const projectFaqs = [
  {
    question: "What if I only need one specific AI service?",
    answer:
      "Absolutely — you don’t need a full automation package. Whether it’s an AI chatbot, workflow automation, or AI integration, we tailor solutions to match your exact business needs and budget.",
  },
  {
    question: "How long does a typical AI project take?",
    answer:
      "Project timelines depend on the complexity — most AI integrations take 2–4 weeks, while advanced automation systems typically range from 6–8 weeks. We’ll confirm the timeline during discovery.",
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes. We collaborate with businesses worldwide through video calls, remote workshops, and real-time communication tools — ensuring a smooth process regardless of location.",
  },
  {
    question: "Can you handle both AI systems and development?",
    answer:
      "Yes. We build AI workflows, automation systems, and scalable digital solutions — ensuring seamless integration from strategy to deployment.",
  },
  {
    question: "How do we start a project with your team?",
    answer:
      "Simply contact us through our form or email. We’ll schedule a quick discovery call to understand your goals and recommend the right AI solutions for your business.",
  },
] as const;
