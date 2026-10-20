export const serviceContent = {
  "b2b-website-design-development": {
    heading: "Website design isn’t just about looks it’s about building trust and driving results.",
    description: "In the B2B world, your website is often the first and most critical touchpoint. If it’s slow, outdated, or unclear, you're losing leads. We build high-performing websites that speak directly to your audience, convert better, and scale with your business.",
    benefits: ["Communicate value clearly and quickly", "Improve lead generation with smart UX", "Enhance credibility and professionalism", "Make updates easily with a user-friendly CMS"],
    image: "SiKi93XgBCO1jd5YYRhnqoQ2PI.jpg",
    quote: "Working with B2bizz was a game-changer for our B2B strategy. Their team didn’t just offer advice they became an extension of our leadership. Their insights, professionalism, and tailored approach helped us unlock new growth and streamline our operations.",
    name: "Orion Blake", role: "COO", avatar: "GEa5AaG3m0spY7fftLUtH9VOzI.jpg",
  },
  "custom-saas-solutions": {
    heading: "We design scalable, secure SaaS products that grow with users and business goals.",
    description: "Our custom SaaS solutions are built from the ground up to solve real business problems, not force you into rigid templates. From strategy and UX to development and deployment, we focus on performance, scalability, and user experience.",
    benefits: ["Intuitive UX and conversion-focused UI design", "Scalable and cloud-ready infrastructure", "Seamless third-party and API integrations", "Ongoing support and feature upgrades"],
    image: "sHNa8cfGdmuVTIz3bIoJrWlvti4.jpg",
    quote: "The team delivered a SaaS platform that exceeded our expectations. From product strategy to final launch, everything was handled with clarity and precision. The platform is fast and incredibly easy for our users to adopt. It’s become a core part of how we operate and grow our business.",
    name: "David Miller", role: "Product Office", avatar: "nSZJQpCu25uRO9lrT3cjUnyKmk.jpg",
  },
  "crm-erp-integrations": {
    heading: "Seamless CRM and ERP integration delivering unified data and single source truth",
    description: "By syncing customer data, finance, operations, and sales workflows, we help organizations improve visibility, reduce manual work, and make faster, more informed decisions. Every integration is designed to be secure, scalable to your existing infrastructure without disrupting daily operations.",
    benefits: ["Custom workflows and automation setup", "Secure, scalable, and API-driven architecture", "Improved reporting and business visibility", "Ongoing support and integration optimization"],
    image: "TTOwsP8T7vGPcOlrse0LU2ZpUgc.jpg",
    quote: "The integration completely transformed how our teams operate. Sales, finance, and operations are now perfectly aligned with real-time data. The process was smooth, secure, and delivered exactly what we needed to scale without adding complexity.",
    name: "Olivia Brown", role: "Head of IT Operations", avatar: "rvVsRZjAKkiA0nvOxWWVXzG9L6s.jpg",
  },
  "enterprise-digital-strategy": {
    heading: "We help enterprises define digital strategies that drive transformation and impact.",
    description: "Our enterprise digital strategy services bridge the gap between business objectives and technology execution. We work closely with leadership teams to assess current systems, identify growth opportunities, and design a clear digital roadmap.",
    benefits: ["Business, technology, and data alignment", "Customer experience and journey optimization", "Data-driven decision-making frameworks", "Risk management and change enablement"],
    image: "xRswnWuF90bdx2CQGLIq23Vrg4.jpg",
    quote: "Their strategic approach gave us complete clarity on where to invest and how to scale. The roadmap they delivered aligned our leadership and long-term goals. As a result, we’ve improved efficiency across departments and accelerated our digital initiatives with confidence.",
    name: "Robert Williams", role: "Digital Officer", avatar: "UY6B0qS4hdcjlEgPYtxTooD5yA.jpg",
  },
  "data-driven-marketing": {
    heading: "Turning data into actionable marketing decisions that drive measurable growth",
    description: "Our data-driven marketing approach replaces guesswork with insight. By combining analytics, customer behavior, and performance metrics, we help brands understand what truly works and why. From campaign optimization to audience segmentation is backed by real data allowing teams to scale faster and deliver more personalized experiences that convert.",
    benefits: ["Conversion rate and funnel optimization", "Multi-channel campaign measurement", "Real-time dashboards and reporting", "Continuous testing and data-led improvements"],
    image: "QUYRFVJsc3BQ2Yr3gytExBu1BcE.jpg",
    quote: "Working with B2bizz was a game-changer for our B2B strategy. Their team didn’t just offer advice they became an extension of our leadership. Their insights, professionalism, and tailored approach helped us unlock new growth and streamline our operations.",
    name: "Emily Johnson", role: "CEO", avatar: "OmhA69HM1VbnEMV63I5CAKdlNlk.jpg",
  },
} as const;

export type ServiceSlug = keyof typeof serviceContent;

export const faqs = [
  ["What types of B2B companies do you work with?", "Professional, conversion-optimized websites tailored for business clients and lead generation."],
  ["What services do you offer?", "We offer strategy consulting, UX/UI design, website development, and digital transformation solutions."],
  ["What industries do you specialize in?", "We specialize in technology, finance, healthcare, logistics, manufacturing, and professional services."],
  ["How long does a typical consulting engagement last?", "Most projects run 4–12 weeks, depending on scope, with ongoing support available if needed."],
  ["What sets your consulting firm apart?", "We combine strategic insight with execution-ready design and development to deliver real business results."],
] as const;
