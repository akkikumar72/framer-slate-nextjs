export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  client: string;
  year: string;
  services: string;
  location: string;
  overview: string;
  thumbnail: string;
  images: { file: string; width: number; height: number }[];
  showGalleryLink: boolean;
};

export const projects: Project[] = [
  {
    slug: "greenora",
    title: "Greenora",
    category: "Next.js Template",
    description:
      "Greenora is a free, minimal website concept designed for landscaping and gardening businesses. Perfect for showcasing services, projects, and testimonials in a clean one-page layout.",
    client: "Greenora",
    year: "2025",
    services: "Next.js Development",
    location: "Remote",
    overview:
      "Designed with a focus on clarity and simplicity, Greenora showcases landscaping services and past projects through clean sections and minimal structure. The layout keeps the visuals and content easy to navigate — allowing the work to stand out while delivering a smooth, professional browsing experience. Ideal for gardening and landscaping businesses looking for a fresh, modern online presence.",
    thumbnail: "lJwBBT8sghpDdWLQUEE4u2U.jpg",
    images: [
      {
        file: "pW3f15Yd33E0yd4WOB9kU3l6pZg.jpg",
        width: 1600,
        height: 1160,
      },
      {
        file: "bk4xtXX4r8ilL69ZLHM2V0FIWQ.jpg",
        width: 1600,
        height: 1160,
      },
      {
        file: "6UbpKqiBU909dX5t36LsUv1dEOA.jpg",
        width: 1600,
        height: 1160,
      },
      {
        file: "iB8281lKt5oH7dS2F70Sob2rSI.jpg",
        width: 1600,
        height: 1160,
      },
    ],
    showGalleryLink: true,
  },
  {
    slug: "clarity-path",
    title: "Clarity Path",
    category: "Saas",
    description:
      "ClarityPath is a modern SaaS website built to showcase a productivity and workflow management platform. The design focuses on clarity, structure, and accessibility — using clean layouts, soft tones, and strong visual hierarchy to highlight product features and benefits.",
    client: "Claritypath",
    year: "2025",
    services: "Next.js Development",
    location: "Paris, France",
    overview:
      "ClarityPath was designed to communicate efficiency and trust from the very first scroll. The homepage guides users through the platform’s key features with smooth interactions and minimal visuals. Thoughtful spacing, consistent typography, and strategic CTAs create a polished and professional user experience — ideal for SaaS brands aiming to convert visitors into users.",
    thumbnail: "F6OX4HI8kK1i2rsby0idr60fqQ.jpg",
    images: [
      {
        file: "4q28BEIZup8q9z4S1KILXUuEE.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "l5KPcQ6pLrxOEGFyLtOb6eUZxA.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "0aCuZ2npYjRYxwPJZm0bncUsV14.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "MHFm6SPZfIdYyrU27ruTkeNZ1s.jpg",
        width: 2048,
        height: 1500,
      },
    ],
    showGalleryLink: false,
  },
  {
    slug: "paul-interior",
    title: "Paul Interior",
    category: "Interior Design",
    description:
      "Paul Interior is a refined website concept for a modern interior design studio. It combines elegant typography, soft color palettes, and spacious layouts to convey sophistication, creativity, and timeless style.",
    client: "Paul Interior",
    year: "2024",
    services: "Landing Page",
    location: "New York, USA",
    overview:
      "Designed with a focus on visual storytelling, Paul Interior highlights the studio’s projects and design philosophy through immersive imagery and minimal structure. The layout balances aesthetics with usability — allowing the work to take center stage while maintaining a smooth and inviting browsing experience. Perfect for design studios seeking an elegant and modern online presence.",
    thumbnail: "8rxRzfBd5s0K59Ny053EHdfv5mg.jpg",
    images: [
      {
        file: "QjfMtkNzMHDg1PvlfiLNwdyxR0s.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "ciSHy58TSiToANIuJvQJ629MQoI.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "1k0SjijcbN9W5CyetHvdyszLWw.jpg",
        width: 2048,
        height: 1501,
      },
      {
        file: "QjfMtkNzMHDg1PvlfiLNwdyxR0s.jpg",
        width: 2048,
        height: 1500,
      },
    ],
    showGalleryLink: true,
  },
  {
    slug: "umbrella",
    title: "Umbrella",
    category: "Saas",
    description:
      "Umbrella is a sleek and minimal landing page designed to capture leads for an email marketing platform. The design uses bold typography, simple layouts, and clear calls-to-action to communicate value quickly and effectively.",
    client: "Umbrella Org.",
    year: "2025",
    services: "Web Design",
    location: "San Francisco, USA",
    overview:
      "Umbrella is crafted to make a strong first impression with clarity and purpose. Built for an email marketing platform, it focuses on driving conversions through bold typography, structured sections, and strategic use of whitespace. The layout guides users effortlessly from headline to action, ensuring a seamless and engaging experience across all devices.",
    thumbnail: "QgP9R7LC62pOMHfXMCb6R5e09M.jpg",
    images: [
      {
        file: "eiJLEPBKBPtEPRi2yWeqJ5GnJn8.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "wiX0AV0c0TQGHq1FnF7y814k.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "X4fJsoP9q4ZoeJZ2ZteuhSWMjHM.jpg",
        width: 2048,
        height: 1500,
      },
      {
        file: "aCk5TAzSSP9l0GaotyYkH2oH70.jpg",
        width: 2048,
        height: 1500,
      },
    ],
    showGalleryLink: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
