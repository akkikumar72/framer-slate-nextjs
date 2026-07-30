import {
  jaydenProjects,
  type JaydenProject,
  type JaydenProjectSlug,
} from "@/components/jayden/shared/assets";

export type JaydenProjectStory = JaydenProject & {
  vision: [string, string];
  process: string;
  processItems: string[];
  outcome: string;
  outcomeItems: string[];
};

type JaydenProjectStoryContent = Pick<
  JaydenProjectStory,
  "client" | "duration" | "vision" | "process" | "processItems" | "outcome" | "outcomeItems"
>;

const stories: Record<JaydenProjectSlug, JaydenProjectStoryContent> = {
  "x---direct-mobile": {
    client: "Sheik Asif",
    duration: "5 weeks",
    vision: [
      "The goal behind X – Direct Mobile was to create a modern, intuitive, and high-performance mobile experience that allows users to access key features quickly with minimal friction. The focus was on simplicity, usability, and clean visual hierarchy while ensuring the interface feels responsive and engaging across all devices.",
      "X – Direct Mobile was designed to bridge functionality with a seamless mobile experience, making interactions faster, clearer, and more efficient for users. Every element was crafted with a mobile-first approach, prioritizing intuitive navigation, accessibility, and a visually balanced interface that supports both user engagement and long-term scalability.",
    ],
    process:
      "The design process started with researching user needs, analyzing similar products, and identifying usability gaps. Wireframes were created to establish layout structure and navigation flow, followed by high-fidelity UI design focused on accessibility, consistency, and mobile-first interaction patterns. Iterative refinements were made to improve clarity, spacing, and overall user experience.",
    processItems: [
      "User flow planning",
      "Wireframing & structure design",
      "UI exploration & visual system creation",
      "Prototype testing & refinements",
      "Responsive optimization",
    ],
    outcome:
      "The final result is a polished and user-friendly mobile experience designed for speed, clarity, and engagement. The interface improves navigation efficiency, enhances readability, and delivers a seamless experience across screens while maintaining a modern and professional visual identity.",
    outcomeItems: [
      "Clean and intuitive user experience",
      "Improved accessibility and navigation",
      "Mobile-optimized performance",
      "Consistent design system for scalability",
      "Modern interface aligned with current design trends",
    ],
  },
  "helve-website-redesign": {
    client: "Helve Agency",
    duration: "6 Weeks",
    vision: [
      "The vision behind the Helve Website Redesign was to create a bold, modern, and conversion-focused digital experience that reflects the agency’s creative identity while improving usability and engagement. The goal was to establish a clean visual language that balances aesthetics with functionality, allowing visitors to explore services, projects, and brand messaging effortlessly.",
      "The redesign focused on creating a premium browsing experience with strong typography, structured layouts, and smooth user interactions. Every section was carefully designed to communicate professionalism, creativity, and clarity while ensuring responsiveness and scalability across all devices.",
    ],
    process:
      "The design process began with analyzing the existing website structure, identifying user experience limitations, and researching modern agency website trends. Wireframes and layout systems were developed to improve content hierarchy and navigation flow, followed by a refined visual design system focused on consistency and interaction clarity.",
    processItems: [
      "Competitor & UX research",
      "Sitemap planning & content structuring",
      "Wireframing & layout exploration",
      "UI system & typography design",
      "Interactive prototype testing",
      "Responsive optimization & refinements",
    ],
    outcome:
      "The final outcome is a visually refined and strategically structured agency website that delivers a smooth and engaging user experience. The redesign enhances readability, strengthens brand presentation, and improves overall navigation flow while maintaining a modern and premium digital identity.",
    outcomeItems: [
      "Clean and modern agency-focused interface",
      "Improved navigation and content clarity",
      "Responsive experience across all devices",
      "Consistent UI system for scalability",
      "Strong visual hierarchy and user engagement",
      "Professional design aligned with modern web trends",
    ],
  },
  "ui-ux-agency": {
    client: "Creative Agency",
    duration: "4 Weeks",
    vision: [
      "The vision behind the UI/UX Agency Design project was to craft a modern, visually engaging, and strategically structured digital presence that reflects creativity, professionalism, and innovation. The focus was on building a seamless user experience that communicates the agency’s services clearly while maintaining a bold and premium visual identity.",
      "The design was created with a user-first approach, ensuring intuitive navigation, balanced layouts, and strong visual hierarchy across every section. Every interaction and interface element was carefully designed to improve engagement, accessibility, and overall browsing experience while supporting long-term scalability for the agency’s growth.",
    ],
    process:
      "The process started with researching modern agency trends, understanding target audience behavior, and analyzing competitor experiences. Wireframes and layout structures were created to establish clear navigation and content flow, followed by high-fidelity UI design focused on consistency, responsiveness, and interactive engagement.",
    processItems: [
      "User experience research",
      "Wireframing & content structuring",
      "UI exploration & visual identity creation",
      "Interaction & prototype design",
      "Responsive optimization",
      "Design refinements & usability improvements",
    ],
    outcome:
      "The final result is a clean, modern, and highly engaging agency website experience that effectively showcases services, projects, and brand identity. The interface improves usability, enhances visual communication, and creates a professional digital presence optimized for both desktop and mobile users.",
    outcomeItems: [
      "Modern and visually engaging interface",
      "Improved navigation and user flow",
      "Responsive and mobile-friendly experience",
      "Consistent and scalable design system",
      "Enhanced readability and accessibility",
      "Professional UI aligned with modern design trends",
    ],
  },
};

export const jaydenProjectStories = jaydenProjects.map((project) => ({
  ...project,
  ...stories[project.slug],
}));

export const jaydenProjectStoriesBySlug = Object.fromEntries(
  jaydenProjectStories.map((project) => [project.slug, project]),
) as Record<JaydenProjectSlug, JaydenProjectStory>;
