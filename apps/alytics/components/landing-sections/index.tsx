import { Button, Reveal, SectionHeading } from "@/components/shared";
import { IntegrationOrbit } from "./integration-orbit";
import styles from "./sections.module.css";

const featureCards = [
  {
    title: "Unified Metrics",
    description: "See your MRR and active users in one clean, unified view — no more switching tabs.",
    image: "BRSjH0Nr0mYv6ao9UQgjwj3sf8.png",
    alt: "Dashboard showing MRR of $69,897 and 1206 active users with an upward trend graph.",
  },
  {
    title: "AI Growth Insights",
    description: "Actionable suggestions from your data, without digging into spreadsheets or dashboards.",
    tabletDescription: "Actionable suggestions from your data, without digging into spreadsheets .",
    image: "IrgbGxlBw9j0VnFsoN84bF7Qw.png",
    alt: 'AI suggesting actions like "Optimize onboarding flow" and "Raise pricing tier" based on user data.',
  },
  {
    title: "Product Usage Tracking",
    description: "Track how users engage with your app live to uncover patterns and optimize features.",
    image: "BlxvFtjF6HHOuUm3WqI7WQNctcI.png",
    alt: "Integration performance stats for Nuvio, Klyra, and Veltix with percentage changes.",
  },
  {
    title: "Feature Impact Analysis",
    description: "Know exactly which features drive long-term retention—and which ones don’t.",
    image: "OtckK1J9Su0WnwNjL4XShdCwGyU.png",
    alt: "Retention graph with user return notifications for analyzing feature effectiveness.",
  },
];

const workflowCards = [
  {
    title: "Connect your product",
    description: "Integrate in minutes with your existing stack—no engineering lift required.",
    image: "re0e4xU4NeTiWazszrTlTzNM.png",
    alt: "Logos of tools outward, illustrating easy integration with no engineering required.",
  },
  {
    title: "Analyze User Behavior",
    description: "Track user activity, uncover trends, and turn complex data into actionable insights.",
    image: "4C5ZcoR1Cxc0a6xgOHF6YKNpE2c.png",
    alt: "Gauge showing levels of user engagement, with tags for high and low engagement percentages.",
  },
  {
    title: "Optimize & Grow",
    description: "Use AI recommendations to improve retention & drive sustainable growth.",
    image: "TBHutRBrfMXOrSyiORiY7ifBQ.png",
    alt: "Envelope containing recommendations like “Fix churn spike” and “Action,” symbolizing actionable insights.",
  },
];

type ArtworkCardData = {
  title: string;
  description: string;
  tabletDescription?: string;
  image: string;
  alt: string;
};

const responsiveArtwork: Record<string, { src: string; srcSet: string }> = {
  "BRSjH0Nr0mYv6ao9UQgjwj3sf8.png": { src: "/alytics/BRSjH0Nr0mYv6ao9UQgjwj3sf8-512.png", srcSet: "/alytics/BRSjH0Nr0mYv6ao9UQgjwj3sf8-512.png 512w, /alytics/BRSjH0Nr0mYv6ao9UQgjwj3sf8-1024.png 1024w" },
  "IrgbGxlBw9j0VnFsoN84bF7Qw.png": { src: "/alytics/IrgbGxlBw9j0VnFsoN84bF7Qw-512.png", srcSet: "/alytics/IrgbGxlBw9j0VnFsoN84bF7Qw-512.png 512w, /alytics/IrgbGxlBw9j0VnFsoN84bF7Qw-1024.png 1024w" },
  "BlxvFtjF6HHOuUm3WqI7WQNctcI.png": { src: "/alytics/BlxvFtjF6HHOuUm3WqI7WQNctcI-512.png", srcSet: "/alytics/BlxvFtjF6HHOuUm3WqI7WQNctcI-512.png 512w, /alytics/BlxvFtjF6HHOuUm3WqI7WQNctcI-1024.png 1024w" },
  "OtckK1J9Su0WnwNjL4XShdCwGyU.png": { src: "/alytics/OtckK1J9Su0WnwNjL4XShdCwGyU-512.png", srcSet: "/alytics/OtckK1J9Su0WnwNjL4XShdCwGyU-512.png 512w, /alytics/OtckK1J9Su0WnwNjL4XShdCwGyU-1024.png 1024w" },
  "re0e4xU4NeTiWazszrTlTzNM.png": { src: "/alytics/re0e4xU4NeTiWazszrTlTzNM-512.png", srcSet: "/alytics/re0e4xU4NeTiWazszrTlTzNM-512.png 512w, /alytics/re0e4xU4NeTiWazszrTlTzNM-1024.png 1024w" },
  "4C5ZcoR1Cxc0a6xgOHF6YKNpE2c.png": { src: "/alytics/4C5ZcoR1Cxc0a6xgOHF6YKNpE2c-512.png", srcSet: "/alytics/4C5ZcoR1Cxc0a6xgOHF6YKNpE2c-512.png 512w, /alytics/4C5ZcoR1Cxc0a6xgOHF6YKNpE2c-1024.png 1024w" },
  "TBHutRBrfMXOrSyiORiY7ifBQ.png": { src: "/alytics/TBHutRBrfMXOrSyiORiY7ifBQ-512.png", srcSet: "/alytics/TBHutRBrfMXOrSyiORiY7ifBQ-512.png 512w, /alytics/TBHutRBrfMXOrSyiORiY7ifBQ-1024.png 1024w" },
};

function ArtworkCard({ card, workflow = false, delay }: { card: ArtworkCardData; workflow?: boolean; delay: number }) {
  const artwork = responsiveArtwork[card.image]!;
  return <Reveal className={styles.cardReveal} y={workflow ? 60 : 80} delay={delay}>
    <article className={`${styles.artworkCard} ${workflow ? styles.workflowCard : ""}`}>
      <div className={styles.artwork}><img src={artwork.src} srcSet={artwork.srcSet} sizes={`(max-width: 809.98px) 338px, (max-width: 1199.98px) 331px, ${workflow ? "323px" : "510px"}`} alt={card.alt} width={workflow ? 9000 : 4000} height={workflow ? 6808 : 2216} loading="lazy" /></div>
      <div className={styles.cardContent}>
        <h3>{card.title}</h3>
        <p className={card.tabletDescription ? styles.defaultDescription : undefined}>{card.description}</p>
        {card.tabletDescription && <p className={styles.tabletDescription}>{card.tabletDescription}</p>}
      </div>
    </article>
  </Reveal>;
}

export function Features() {
  return <section id="features" className={`section ${styles.section}`}>
    <div className={`container ${styles.sectionContainer}`}>
      <SectionHeading label="Unique Features" title="Make your platform work harder for you" description="Streamline your business with unified metrics and AI-powered analytics—all in one place." />
      <div className={styles.featuresGrid}>{featureCards.map((card, index) => <ArtworkCard card={card} delay={index % 2 === 0 ? 0.2 : 0.4} key={card.title} />)}</div>
    </div>
  </section>;
}

const benefits = [
  { title: "Real-Time Tracking", description: "Monitor user activity instantly for smarter decision-making.", path: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" },
  { title: "All-in-One View", description: "Keep all your analytics in one place, without jumping between tools.", path: "M192,24H64A24,24,0,0,0,40,48V208a24,24,0,0,0,24,24H192a24,24,0,0,0,24-24V48A24,24,0,0,0,192,24ZM64,40H192a8,8,0,0,1,8,8v8H56V48A8,8,0,0,1,64,40ZM192,216H64a8,8,0,0,1-8-8v-8H200v8A8,8,0,0,1,192,216Z" },
  { title: "Actionable Insights", description: "Track the metrics that matter most for sustainable business growth.", path: "M240,136v32a8,8,0,0,1-8,8,7.61,7.61,0,0,1-1.57-.16L156,161v23.73l17.66,17.65A8,8,0,0,1,176,208v24a8,8,0,0,1-11,7.43l-37-14.81L91,239.43A8,8,0,0,1,80,232V208a8,8,0,0,1,2.34-5.66L100,184.69V161L25.57,175.84A7.61,7.61,0,0,1,24,176a8,8,0,0,1-8-8V136a8,8,0,0,1,4.42-7.16L100,89.06V44a28,28,0,0,1,56,0V89.06l79.58,39.78A8,8,0,0,1,240,136Z" },
  { title: "Secure Data", description: "Keep your analytics safe with advanced security and strong encryption.", path: "M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-80,84a12,12,0,1,1,12-12A12,12,0,0,1,128,164Zm32-84H96V56a32,32,0,0,1,64,0Z" },
  { title: "Custom Reports", description: "Create tailored reports that fit your needs and highlight key insights.", path: "M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM112,184a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm56-8a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136a23.76,23.76,0,0,1-4.84,14.45L152,176ZM48,80V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80Z" },
  { title: "Simple to Use", description: "Navigate easily—no steep learning curve, start making better decisions quickly.", path: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,160H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Zm0-48H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z" },
];

function BenefitCard({ benefit, delay }: { benefit: typeof benefits[number]; delay: number }) {
  return <Reveal y={60} delay={delay}>
    <article className={styles.benefitCard}>
      <div className={styles.benefitIcon}><svg viewBox="0 0 256 256" aria-hidden="true" focusable="false"><path d={benefit.path} /></svg></div>
      <div className={styles.benefitContent}><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
    </article>
  </Reveal>;
}

export function Benefits() {
  return <section id="benefits" className={`section ${styles.section}`}>
    <div className={`container ${styles.sectionContainer}`}>
      <SectionHeading label="Benefits" title="Benefits That Truly Matter to You" description="Monitor metrics as they happen, so you can respond quickly and keep your goals on track." />
      <div className={styles.benefitsRows}>
        <div className={styles.benefitsGrid}>{benefits.slice(0, 3).map((benefit, index) => <BenefitCard benefit={benefit} delay={[0.1, 0.2, 0.3][index]!} key={benefit.title} />)}</div>
        <Reveal className={styles.benefitsGrid} y={60} delay={0.1}>{benefits.slice(3).map((benefit, index) => <BenefitCard benefit={benefit} delay={[0.1, 0.2, 0.3][index]!} key={benefit.title} />)}</Reveal>
      </div>
    </div>
  </section>;
}

export function HowItWorks() {
  return <section id="how-it-works" className={`section ${styles.section}`}>
    <div className={`container ${styles.sectionContainer}`}>
      <SectionHeading label="How It Works" title="Get clear answers in 3 simple steps" description="From data to clarity—uncover insights, take action, and grow smarter in three simple steps." />
      <div className={styles.workflowGrid}>{workflowCards.map((card, index) => <ArtworkCard card={card} delay={[0.2, 0.4, 0.6][index]!} workflow key={card.title} />)}</div>
    </div>
  </section>;
}

export function Integrations() {
  return <section id="integrations" className={`section ${styles.section}`}>
    <div className="container"><Reveal y={60} delay={0.2}><div className={styles.integrationPanel}>
      <IntegrationOrbit />
      <div className={styles.integrationContent}>
        <SectionHeading animate={false} label="Integrations" title="Seamless Integrations" description="Connect Alytics with your favorite tools to streamline workflows and keep everything running smoothly." />
        <Button>Get Started Now</Button>
      </div>
    </div></Reveal></div>
  </section>;
}
