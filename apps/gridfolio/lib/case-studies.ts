export type CaseStudyKind = "chatai" | "startup";

export type CaseStudySection = {
  title: string;
  copy: string;
  images: readonly string[];
  imageLayout: "pair" | "stack";
};

export type CaseStudyData = {
  title: string;
  summary: string;
  heroImage: string;
  heroPosition?: string;
  leadImage: string;
  sections: readonly CaseStudySection[];
  review: string;
  reviewer: string;
};

export const caseStudies: Record<CaseStudyKind, CaseStudyData> = {
  chatai: {
    title: "ChatAI",
    summary:
      "ChatAI is a SaaS platform that enables businesses to launch their own branded AI chat experiences. With customizable AI assistants, companies can create smarter customer interactions while keeping full control over branding, user experience, and monetization.",
    heroImage: "BsZqPtypfYCk4dDeGceLkZTeMQY.png",
    heroPosition: "51.4% 0%",
    leadImage: "IhtmPjqxmA74tD8NtwZX0zQ4.png",
    sections: [
      {
        title: "The Challenge",
        copy:
          "ChatAI needed a product experience that clearly communicated its value in a crowded AI market. Users struggled to understand how they could customize, launch, and monetize their own AI chat. The platform needed a simpler flow that made the setup process feel effortless and the benefits instantly clear.",
        images: [
          "Wv7CrTKHc7CcebBtF9K8e1xAQ.png",
          "rSzgKPyeEFVEmqXccWiMURIJpiY.png",
        ],
        imageLayout: "pair",
      },
      {
        title: "The Process",
        copy:
          "I redesigned the product experience by simplifying the onboarding journey, improving the information hierarchy, and creating a clearer dashboard structure. I focused on making customization, branding options, and monetization tools easier to discover while building a more premium AI-first interface.",
        images: [
          "3Sb37lUvdYjMnqNpGYyOMpXWM6s.png",
          "JnvtmFC3wqKJHDFUHANMZCRPjvU.png",
        ],
        imageLayout: "stack",
      },
      {
        title: "The Result",
        copy:
          "The redesign helped ChatAI create a smoother user journey from signup to launch. Users could quickly understand how to build their own AI chat, customize the experience, and start exploring monetization opportunities. The product became more approachable, scalable, and aligned with its positioning.",
        images: [
          "NGAQyL5Ti74xBr79xG5PAeHigbs.png",
          "lUvK4wyTARKUDXvuidxq80Q55c.png",
        ],
        imageLayout: "pair",
      },
    ],
    review:
      "Antonio brought a strong product mindset to ChatAI. He didn’t just improve the visuals. He helped us rethink how users experience our platform. The final design made our product feel more intuitive, premium, and ready to scale.",
    reviewer: "Daniel Morgan, Founder & CEO of ChatAI",
  },
  startup: {
    title: "Startup AI",
    summary:
      "StartupAI is an AI-powered image generation platform that helps founders, marketers, and creators produce high-quality visuals in seconds. From product mockups to social media assets, StartupAI makes professional design accessible without the need for advanced design skills.",
    heroImage: "YQU1Yo2m0rZZTn5vW9xz0yeyfc.png",
    leadImage: "SlEeMVaZmezjSlY6hUMn52vCoeE.png",
    sections: [
      {
        title: "The Challenge",
        copy:
          "StartupAI needed a product experience that made AI image creation feel simple and exciting for new users. The existing flow had too much complexity, making it difficult for users to understand how to generate, customize, and manage their creations. The goal was to create a smoother and more engaging creative workflow.",
        images: [
          "JjUHXRkjNiIMfGhVl1Ty2ovKy8.png",
          "ZL5OKyx1RZ0gkOSghk2m3hRnc.png",
        ],
        imageLayout: "pair",
      },
      {
        title: "The Process",
        copy:
          "I redesigned the user journey by simplifying the image generation flow, improving prompt creation, and creating a cleaner workspace for managing generated assets. I focused on reducing friction, making key actions easier to find, and designing an interface that felt fast, creative, and intuitive.",
        images: [
          "2HEOPsiAK7sKgXjjArZgK7Aav4.png",
          "ogDwvqk3gehfQvrf29ykP8r1LJE.png",
        ],
        imageLayout: "stack",
      },
      {
        title: "The Result",
        copy:
          "The new experience helped users generate images faster and understand the platform’s capabilities immediately. The improved workflow increased engagement, reduced confusion during the creation process, and positioned StartupAI as a more polished and user-friendly AI creative tool.",
        images: [
          "jPoPs5vvRdAAuwTGFjCcgTVc9w.png",
          "JkNlYgjejf9JdUPk8t8uK5bMdS0.png",
        ],
        imageLayout: "pair",
      },
    ],
    review:
      "Working with Antonio Misk was a turning point for our product. He quickly understood our users’ pain points and translated them into a clean, intuitive experience. The new onboarding flow alone improved our activation more than we expected",
    reviewer: "Michael Carter, Founder & CEO of StartupAI",
  },
};
