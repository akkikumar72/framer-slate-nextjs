export type PortfolioProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  year: string;
  heroImage: string;
  heroAlt: string;
  statement: string;
  research: string;
  experiment: string;
  storyImages: readonly {
    src: string;
    alt: string;
  }[];
};

const commonStoryImages = [
  {
    src: "/fuel/routes/a8a049fba6049edf.avif",
    alt: "Woman Orange BG",
  },
  {
    src: "/fuel/routes/28d5f85da77faf64.avif",
    alt: "Woman Green Blur",
  },
  {
    src: "/fuel/routes/4bd2b33a3dce8e42.avif",
    alt: "Man Running",
  },
  {
    src: "/fuel/routes/118d420151bfebbd.avif",
    alt: "Man Dancing",
  },
] as const;

export const portfolioProjects = [
  {
    slug: "vellfire-calibration",
    number: "01",
    title: "Vellfire Calibration",
    category: "Art Direction",
    description:
      "A precision-driven approach focused on geometry and harmony.",
    year: "© 2025",
    heroImage: "/fuel/routes/7373f10574e69e13.avif",
    heroAlt: "Man",
    statement:
      "Technical brand identity integrating precision, form, and calibrated visual rhythm inspired by structured design principles & Fuel®.",
    research:
      "Mapping functional requirements and analyzing system accuracy, Fuel creates a detailed foundation that informs every design decision.",
    experiment:
      "Redefining minimalism through material authenticity and design order. Fuel moves beyond simple form, creating refined designs that shape experiences.",
    storyImages: commonStoryImages,
  },
  {
    slug: "dunwill-lanson",
    number: "02",
    title: "Dunwill Lanson",
    category: "Photograhy",
    description:
      "A balanced fusion of proportion, typography, and visual tone.",
    year: "© 2024",
    heroImage: "/fuel/routes/842e8103fdc91559.avif",
    heroAlt: "Man in Blue BG",
    statement:
      "Contemporary corporate identity blending structured layouts, strategic clarity, and modern visual systems developed with Fuel®.",
    research:
      "Exploring market position and brand intention to create a precise design framework rooted in clarity and balance for better response and orders.",
    experiment:
      "Developing style variations that shape professional expression with modern structure and clean aesthetic choices for better clarity and sequences.",
    storyImages: commonStoryImages,
  },
  {
    slug: "noara-willis",
    number: "03",
    title: "Noara Willis",
    category: "Strategy",
    description:
      "A refined identity system blending structure with expressive form.",
    year: "© 2025",
    heroImage: "/fuel/routes/4c351b3ff107d159.avif",
    heroAlt: "Women on the Chair",
    statement:
      "Modern personal brand identity built through structured elegance, refined typography, and expressive visual character powered by Fuel®.",
    research:
      "Understanding tone, personality, and visual nuance. Fuel analyzes aesthetic direction to refine the foundation of brand clarity and brand aesthetics.",
    experiment:
      "Redefining minimalism through material authenticity and design order. Fuel moves beyond simple form, creating refined designs that shape experiences.",
    storyImages: commonStoryImages,
  },
  {
    slug: "nike-studios",
    number: "04",
    title: "Nike Studios",
    category: "Art Direction",
    description:
      "A crafted creative direction built to elevate brand expression.",
    year: "© 2025",
    heroImage: "/fuel/routes/2fa699392e44910c.avif",
    heroAlt: "Athletes",
    statement:
      "Design-forward athletic brand experience shaped through structured motion, minimal clarity, and bold visual identity crafted with Fuel®.",
    research:
      "Exploring brand intention through clarity and direction. Fuel uncovers visual patterns and defines a structured base that guides each creative movement.",
    experiment:
      "Redefining minimalism through material authenticity and design order. Fuel moves beyond simple form, creating refined designs that shape experiences.",
    storyImages: [
      {
        src: "/fuel/routes/28d5f85da77faf64.avif",
        alt: "Woman Green Blur",
      },
      {
        src: "/fuel/routes/738dddc535216ede.avif",
        alt: "Woman Greyscale",
      },
      {
        src: "/fuel/routes/4bd2b33a3dce8e42.avif",
        alt: "Man Running",
      },
      {
        src: "/fuel/routes/118d420151bfebbd.avif",
        alt: "Man Dancing",
      },
    ],
  },
] satisfies readonly PortfolioProject[];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string) {
  return portfolioProjects
    .filter((project) => project.slug !== slug)
    .slice(0, 2);
}
