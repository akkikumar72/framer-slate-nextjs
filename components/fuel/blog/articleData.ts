export const fuelArticleSlugs = [
  "velocity-becomes",
  "way-to-clearance",
  "all-grapples",
  "flowers-love",
] as const;

export type FuelArticleSlug = (typeof fuelArticleSlugs)[number];

export type FuelStorySection = {
  number: string;
  title: string;
  paragraphs: readonly string[];
  images: readonly {
    alt: string;
    src: string;
  }[];
  layout: "pair" | "single" | "text";
};

export type FuelArticle = {
  slug: FuelArticleSlug;
  number: string;
  title: string;
  category: string;
  date: string;
  author: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
};

const articles: Record<FuelArticleSlug, FuelArticle> = {
  "velocity-becomes": {
    slug: "velocity-becomes",
    number: "001",
    title: "Velocity Becomes",
    category: "Art Direction",
    date: "Mar 18, 2025",
    author: "Aria Mendes",
    summary:
      "Redefining identity through structured clarity and modern design flow. Fuel transforms raw concepts into refined systems that elevate digital presence.",
    heroImage: "/fuel/b5327417d6abd67b.avif",
    heroAlt: "Woman Close Up",
  },
  "way-to-clearance": {
    slug: "way-to-clearance",
    number: "002",
    title: "Way To Clearance",
    category: "Books",
    date: "Aug 12, 2024",
    author: "Leena Harper",
    summary:
      "Exploring creativity through balance, intention, and visual order. Fuel moves beyond surface aesthetics to craft meaningful, expressive brand stories.",
    heroImage: "/fuel/routes/63d20c2291899c0d.avif",
    heroAlt: "Woman Curly Hair",
  },
  "all-grapples": {
    slug: "all-grapples",
    number: "003",
    title: "All Grapples",
    category: "Automotive",
    date: "Aug 12, 2024",
    author: "Sofia Langford",
    summary:
      "Shaping digital form with precision, minimal structure, and thoughtful detail. Fuel blends function with emotion to create lasting visual impact.",
    heroImage: "/fuel/routes/8ef5cfc420023689.avif",
    heroAlt: "Man Motion Blur",
  },
  "flowers-love": {
    slug: "flowers-love",
    number: "004",
    title: "Flowers Love",
    category: "Gardening",
    date: "Jun 12, 2025",
    author: "Maya Renfield",
    summary:
      "Elevating narratives through refined composition and bold aesthetic choices. Fuel creates modern experiences that shape how brands communicate.",
    heroImage: "/fuel/1865502c2f9d9de5.avif",
    heroAlt: "Woman Flowers",
  },
};

export const fuelStorySections: readonly FuelStorySection[] = [
  {
    number: "001",
    title: "Originality",
    paragraphs: [
      "At the core of our work lies a belief in design that transforms ideas into powerful narratives. We push beyond trends to create systems that feel intentional, structured, and emotionally engaging.",
      "In every project, we focus on crafting meaningful experiences rooted in clarity, emotion, and purpose. Our process is built on thoughtful exploration and refined execution, ensuring that every detail strengthens the brand’s story and deepens its connection with the audience.",
    ],
    images: [
      {
        alt: "Woman Orange",
        src: "/fuel/routes/7292e9ec2814e6fc.avif",
      },
      {
        alt: "Shoe",
        src: "/fuel/routes/a6edbb71de8445ca.avif",
      },
    ],
    layout: "pair",
  },
  {
    number: "002",
    title: "Sustainable",
    paragraphs: [
      "We believe in pushing the boundaries of design, storytelling, and innovation to create brands that not only look stunning but also leave a positive impact on the world. Our newest project explores depth and tactility, redefining how materials, light, and detail transform digital identity.",
      "We believe in pushing the boundaries of design, storytelling, and innovation to create brands that not only look stunning but also leave a positive impact on the world. This forward-thinking concept introduces a fresh vision of design, built to inspire the next era of digital experiences.",
    ],
    images: [
      {
        alt: "Man Red BG",
        src: "/fuel/routes/2c099988616f93db.avif",
      },
    ],
    layout: "single",
  },
  {
    number: "003",
    title: "Reliability",
    paragraphs: [
      "We believe in pushing the boundaries of design, storytelling, and innovation to create brands that not only look stunning but also leave a positive impact on the world. That’s why we’re excited to unveil our newest exploration—an immersive project built to redefine how brands express authenticity from the ground up.",
      "We approach every project with a commitment to clarity, precision, and purposeful design. Our goal is to craft brands that don’t just communicate—they resonate on a deeper, more meaningful level with the people who interact with them.",
    ],
    images: [
      {
        alt: "Team",
        src: "/fuel/routes/c80849aeff3ff979.avif",
      },
    ],
    layout: "single",
  },
  {
    number: "004",
    title: "Experiment",
    paragraphs: [
      "We’re driven by a passion for visual storytelling—design that blends innovation, clarity, and impact. Every decision is made with purpose, ensuring brands feel cohesive, modern, and unmistakably unique. Our process is rooted in experimentation and refinement, enabling us to deliver work",
      "Our philosophy centers around creating design experiences that feel both functional and expressive. We build identities that communicate with honesty, intention, and a refined aesthetic language. Through consistent collaboration and thoughtful iteration.",
    ],
    images: [],
    layout: "text",
  },
] as const;

export const fuelFaqs = [
  {
    question: "What distinguishes us from other agencies?",
    answer:
      "Fuel combines fast, structured delivery with a highly art-directed visual system. Every engagement is handled as a cohesive brand experience, not a collection of disconnected design requests.",
  },
  {
    question: "Why not hire an in-house designer or freelancer?",
    answer:
      "You get a flexible senior creative team without the long hiring process, fixed overhead, or limited specialty range of a single role.",
  },
  {
    question: "Are creative requests truly unlimited?",
    answer:
      "Yes. You can maintain an active request queue and we work through it in priority order with clear, predictable communication.",
  },
  {
    question: "How fast will I receive my work?",
    answer:
      "Most requests receive a first pass in two to three business days. Larger brand systems and production work are scoped transparently.",
  },
  {
    question: "What if I have a single project?",
    answer:
      "Single-project engagements are welcome. We will recommend a focused scope and timeline based on what will create the strongest result.",
  },
] as const;

export function getFuelArticle(slug: string): FuelArticle | undefined {
  if (!fuelArticleSlugs.includes(slug as FuelArticleSlug)) {
    return undefined;
  }

  return articles[slug as FuelArticleSlug];
}

export function getRelatedFuelArticles(
  currentSlug: FuelArticleSlug,
): FuelArticle[] {
  return fuelArticleSlugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => articles[slug]);
}
