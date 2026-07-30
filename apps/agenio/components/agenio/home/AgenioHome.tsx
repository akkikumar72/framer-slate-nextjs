"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AgenioHeader,
  BrandOrb,
  ContactFooter,
  CornerMarkers,
  DarkButton,
  LightButton,
  LogoMark,
  PixelSteps,
  SectionLabel,
  Wordmark,
} from "@/components/agenio/shared/AgenioShell";
import { agenioAssets } from "@/components/agenio/shared/assets";
import styles from "./AgenioHome.module.css";

const services = [
  {
    number: "01",
    title: "AI Automation",
    copy: "We automate workflows with AI systems built to improve efficiency and simplify operations.",
    image: agenioAssets.services[0],
    items: ["Workflow Automation", "AI Process Integration", "Custom AI Agents", "Business Optimization"],
  },
  {
    number: "02",
    title: "AI Chatbots",
    copy: "We build AI assistants that improve customer support and automate conversations at scale.",
    image: agenioAssets.services[1],
    items: ["Custom AI Chatbots", "Knowledge Base Training", "Lead Qualification", "24/7 AI Support"],
  },
  {
    number: "03",
    title: "AI Web Solutions",
    copy: "We create AI-powered websites and platforms focused on automation, speed.",
    image: agenioAssets.services[2],
    items: ["AI Website Development", "Smart Integrations", "CMS Integration", "SEO Optimization"],
  },
  {
    number: "04",
    title: "AI Strategy",
    copy: "We help businesses plan and implement AI solutions that support long-term growth.",
    image: agenioAssets.services[3],
    items: ["AI Consulting", "Automation Planning", "Workflow Analysis", "AI Implementation"],
  },
];

const projects = [
  {
    slug: "ai-chatbot-website",
    title: "AI Chatbot Website",
    copy: "We developed an AI-powered website with integrated chatbot features focused on automation and seamless user support.",
    image: "/agenio/projects/chatbot-hero.webp",
    stats: [["+70%", "Response Time"], ["1 unified", "Chatbot system"], ["4 weeks", "Delivery time"]],
  },
  {
    slug: "nova-ai-assistant",
    title: "Nova AI Assistant",
    copy: "A scalable AI assistant experience that unifies customer questions, knowledge, and support workflows.",
    image: "/agenio/projects/nova-hero.webp",
    stats: [["+62%", "Faster support"], ["3 systems", "Unified workflow"], ["5 weeks", "Delivery time"]],
  },
  {
    slug: "ai-brand-identity",
    title: "AI Brand Identity",
    copy: "A future-facing brand platform that connects intelligent strategy with a flexible visual system.",
    image: "/agenio/projects/brand-hero.webp",
    stats: [["2.4×", "Engagement"], ["1 system", "Brand language"], ["6 weeks", "Delivery time"]],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Analyze & Discover",
    copy: "We begin by understanding your workflows, business goals, and operational challenges to identify automation opportunities.",
    visual: ["Goals", "Challenges", "Audiences"],
  },
  {
    number: "02",
    title: "Plan & Strategy",
    copy: "We define the right AI solutions, automation systems, and workflows tailored to your business needs.",
    visual: ["Discovery", "Onboarding screens", "Roadmap"],
  },
  {
    number: "03",
    title: "Build & Integrate",
    copy: "We develop AI-powered systems and integrate intelligent workflows designed for scalability and performance.",
    visual: ["Agent", "Knowledge", "Automation"],
  },
  {
    number: "04",
    title: "Launch & Evolve",
    copy: "We monitor performance, refine automations, and continuously improve AI systems for long-term efficiency.",
    visual: ["Launch", "Measure", "Improve"],
  },
];

const team = [
  ["Ethan Brooks", "Agenio Founder"],
  ["Liam Anderson", "AI Automation Specialist"],
  ["Ethan Walker", "AI Strategy Director"],
  ["Mason Cole", "Lead AI Product Designer"],
  ["Noah Reed", "AI Solutions Architect"],
  ["Oliver Hayes", "Workflow Automation Expert"],
  ["James Carter", "AI Creative Director"],
];

const awards = [
  ["March 2026", "Awwwards – Site of the AI Innovation", "Nova Website"],
  ["January 2026", "Innovation - Featured Product", "Muse AI Platform"],
  ["September 2025", "System Awards - Best AI Workflow", "Lunaris AI Solutions."],
  ["October 2025", "Digital Innovation - Honoree", "Axis AI Platform"],
];

const whyItems = [
  ["Strategy Driven", "We combine automation, AI systems, and smart workflows to build solutions aligned with your business goals."],
  ["Built for Results", "From workflow automation to AI integration, every system is built to improve efficiency and performance."],
  ["Collaborative Process", "We work closely with clients at every step, ensuring transparency, feedback, and shared success."],
  ["Consistent Excellence", "Our team delivers reliable AI solutions across every touchpoint from automation to systems."],
];

const plans = [
  {
    name: "Starter Plan",
    availability: "Available from Dec",
    audience: "Small businesses, startups, or single-brand projects.",
    price: "$2,500",
    features: ["Full service creative", "Monthly consulting call", "Simple subscription", "Scales with your needs", "Intergration sync", "Updates every 2 days", "3 times update", "Cancel anytime"],
  },
  {
    name: "Growth Plan",
    availability: "Available Now",
    audience: "Established brands seeking full-scale design support.",
    price: "$5,500",
    features: ["Full managed project", "Simple subscription", "Weekly consulting call", "Scales with your needs", "Access our entire team", "Updates every 2 days", "Creative strategy", "Cancel anytime"],
  },
];

const faqs = [
  ["What if I only need one specific AI service?", "Absolutely — you don’t need a full automation package. Whether it’s an AI chatbot, workflow automation, or AI integration, we tailor solutions to match your exact business needs and budget."],
  ["How long does a typical AI project take?", "Project timelines depend on the complexity — most AI integrations take 2–4 weeks, while advanced automation systems typically range from 6–8 weeks. We’ll confirm the timeline during discovery."],
  ["Do you work with clients internationally?", "Yes. We collaborate with businesses worldwide through video calls, remote workshops, and real-time communication tools — ensuring a smooth process regardless of location."],
  ["Can you handle both AI systems and development?", "Yes. We build AI workflows, automation systems, and scalable digital solutions — ensuring seamless integration from strategy to deployment."],
  ["How do we start a project with your team?", "Simply contact us through our form or email. We’ll schedule a quick discovery call to understand your goals and recommend the right AI solutions for your business."],
];

const testimonials = [
  {
    title: "Beyond expectations",
    quote: "“Working with this team completely transformed how we present our product. Their attention to detail and understanding of user experience helped us increase engagement beyond.”",
    name: "Daniel Lewis",
    role: "Founder, Lunaris Coffee Co.",
    image: "/agenio/projects/testimonial-1.webp",
  },
  {
    title: "Professional Experience",
    quote: "“They delivered intelligent AI solutions that aligned perfectly with our business goals. Communication was seamless from start to finish — truly a professional experience.”",
    name: "Michael Roberts",
    role: "CEO, Axis Legal Group",
    image: "/agenio/projects/testimonial-2.webp",
  },
  {
    title: "Genuinely love",
    quote: "“Their AI workflow strategy was smart, efficient, and easy to scale. They quickly understood our operations and built systems that genuinely improved productivity.”",
    name: "Jason Ward",
    role: "Product Manager, Brightly",
    image: "/agenio/projects/testimonial-3.webp",
  },
];

export function AgenioHome() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqs, setOpenFaqs] = useState<number[]>([1]);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!autoAdvance || reduceMotion) {
      return;
    }
    const timer = window.setInterval(
      () => setProjectIndex((index) => (index + 1) % projects.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [autoAdvance, reduceMotion]);

  const project = projects[projectIndex];
  const testimonial = testimonials[testimonialIndex];

  return (
    <main>
      <AgenioHeader />
      <section className={styles.hero} id="hero">
        <CornerMarkers />
        <Image
          alt=""
          aria-hidden="true"
          className={styles.heroGrid}
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1408px"
          src={agenioAssets.grid}
        />
        <PixelSteps />
        <PixelSteps flip />
        <h1 className={styles.heroWords}>
          <span>We are</span>
          <span className={styles.heroOrb}><BrandOrb /></span>
          <span>AI driven</span>
        </h1>
        <div className={styles.heroCopy}>
          <p>We build AI systems and automation workflows that<br />help businesses scale smarter and faster.</p>
          <div>
            <LightButton href="#pricing-plan">View Pricing Plans</LightButton>
            <DarkButton href="/services">Explore Services</DarkButton>
          </div>
        </div>
      </section>

      <section aria-label="Trusted by" className={styles.trustBar}>
        <p>//We’ve trusted by</p>
        <div className={styles.logoMarquee}>
          {[...agenioAssets.partnerLogos, ...agenioAssets.partnerLogos].map((logo, index) => (
            <span key={`${logo}-${index}`}><Image alt="" height={64} src={logo} width={140} /></span>
          ))}
        </div>
      </section>

      <section className={styles.about}>
        <CornerMarkers />
        <SectionLabel>About us</SectionLabel>
        <h2>At our core, we believe<br />great AI is more than<br />automation, it’s impact</h2>
        <div className={styles.aboutSplit}>
          <div className={styles.results}>
            <p>Our results speak for themselves. Each number<br />represents the trust we’ve built.</p>
            {[
              ["300%", "Average ROI from AI Automations"],
              ["120+", "Projects delivered for global clients"],
              ["4/5", "Client rating based on 100+ reviews"],
            ].map(([value, label]) => (
              <article key={value}>
                <span aria-hidden="true">⠳</span>
                <div><b>{value}</b><p>{label}</p></div>
              </article>
            ))}
          </div>
          <Link className={styles.aboutImage} href="https://unsplash.com/photos/silhouetted-people-looking-out-large-windows-at-city-yIA3KpsJaNs">
            <Image alt="A team overlooking a city through large windows" fill sizes="50vw" src={agenioAssets.aboutTeam} />
          </Link>
        </div>
      </section>

      <section className={styles.services}>
        <CornerMarkers />
        <SectionLabel>Services</SectionLabel>
        <h2>We Build AI Solutions</h2>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.number}>
              <Image alt="" fill sizes="(max-width: 760px) 100vw, 50vw" src={service.image} />
              <div className={styles.serviceCover}>
                <div>
                  <SectionLabel dark>{service.title}</SectionLabel>
                  <p>{service.copy}</p>
                </div>
                <b>{service.number}</b>
                <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.vision}>
        <SectionLabel>Our vision</SectionLabel>
        <h2>Every solution we build<br />Starts <span><Image alt="" fill sizes="140px" src={agenioAssets.visionPhone} /></span> with a<br />deep understanding of agents</h2>
        <p>We&apos;re an AI agency focused on automation, intelligent systems,<br />and scalable digital solutions. Our AI workflows don’t just look<br />advanced, they deliver real business impact.</p>
      </section>

      <section aria-roledescription="carousel" className={styles.projectShowcase}>
        <Image
          alt=""
          className={styles.projectImage}
          fill
          key={project.image}
          sizes="100vw"
          src={project.image}
        />
        <PixelSteps dark />
        <Link className={styles.projectOverlay} href={`/projects/${project.slug}`}>
          <h3>{project.title}</h3>
          <p>{project.copy}</p>
          <div className={styles.projectStats}>
            {project.stats.map(([value, label]) => (
              <div key={label}><b>{value}</b><span>{label}</span></div>
            ))}
          </div>
        </Link>
        <div className={styles.carouselControls}>
          <button
            aria-label="Previous project"
            onClick={() => setProjectIndex((projectIndex - 1 + projects.length) % projects.length)}
            type="button"
          >←</button>
          <p>{String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
          <button
            aria-label="Next project"
            onClick={() => setProjectIndex((projectIndex + 1) % projects.length)}
            type="button"
          >→</button>
          <button
            aria-label={autoAdvance ? "Pause project carousel" : "Play project carousel"}
            onClick={() => setAutoAdvance((current) => !current)}
            type="button"
          >
            {autoAdvance ? "Ⅱ" : "▶"}
          </button>
        </div>
      </section>

      <section className={styles.process}>
        <CornerMarkers />
        <div className={styles.processHeading}>
          <SectionLabel>Process</SectionLabel>
          <h2>Combine AI<br />With Automation</h2>
          <p>Every step designed to improve workflows, efficiency.</p>
          <DarkButton href="/contact">Start a Project</DarkButton>
        </div>
        <div className={styles.processCards}>
          {processSteps.map((step) => (
            <article key={step.number}>
              <div className={styles.processVisual}>
                {step.visual.map((item, index) => (
                  <span className={index === 1 ? styles.processVisualActive : ""} key={item}>{item}</span>
                ))}
              </div>
              <div className={styles.processCopy}>
                <span>//{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-hidden="true" className={styles.statementMarquee}>
        <div>
          <span>Innovative <b>⠳</b> Innovative <b>⠳</b></span>
          <span>Visionary <b>⠳</b> Visionary <b>⠳</b></span>
        </div>
      </section>

      <section className={styles.difference}>
        <CornerMarkers />
        <SectionLabel>The difference</SectionLabel>
        <h2>Why Should You Choose Us</h2>
        <div className={styles.comparison}>
          <article>
            <h3>Other Agencies</h3>
            <ul>{["Uses generic automation tools", "Focuses only on basic AI setup", "Limited workflow customization", "Lack of long-term optimization", "Delivers disconnected systems", "Focuses on short-term solutions"].map((item) => <li key={item}>○ {item}</li>)}</ul>
          </article>
          <article>
            <h3><LogoMark compact /><Wordmark /></h3>
            <ul>{["Works as a strategic AI partner", "Builds intelligent automation systems", "Transparent, collaborative workflow", "Dedicated AI specialists on every project", "Creates scalable AI workflows", "Focuses on measurable business impact"].map((item) => <li key={item}>● {item}</li>)}</ul>
          </article>
        </div>
        <DarkButton href="#contact">Get started</DarkButton>
      </section>

      <section className={styles.team}>
        <CornerMarkers />
        <SectionLabel>Team members</SectionLabel>
        <h2>The Minds<br />Behind the Work</h2>
        <div className={styles.teamGrid}>
          {team.map(([name, role], index) => (
            <article key={name}>
              <Image alt="" fill sizes="(max-width: 760px) 100vw, 50vw" src={agenioAssets.team[index]} />
              <div><h3>{name}</h3><p>{role}</p></div>
            </article>
          ))}
          <article className={styles.joinCard}>
            <PixelSteps />
            <h3>We’re Searching<br />For Talents</h3>
            <p>Join our team of creatives pushing boundaries, experimenting with ideas</p>
            <LightButton href="/contact">Apply to Join Us</LightButton>
          </article>
        </div>
      </section>

      <section className={styles.awards}>
        <SectionLabel>Award</SectionLabel>
        <h2>AI Solutions That Stand Out</h2>
        <div>
          {awards.map(([date, award, projectName]) => (
            <article key={award}>
              <p>{date}</p><h3>{award}</h3><h3>{projectName}</h3><span>↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.testimonial}>
        <Image
          alt=""
          fill
          key={testimonial.image}
          sizes="100vw"
          src={testimonial.image}
        />
        <PixelSteps dark />
        <article>
          <h3>{testimonial.title}</h3>
          <blockquote>{testimonial.quote}</blockquote>
          <p>{testimonial.name}<br /><span>{testimonial.role}</span></p>
        </article>
        <div className={styles.testimonialControls}>
          <button
            aria-label="Previous testimonial"
            disabled={testimonialIndex === 0}
            onClick={() => setTestimonialIndex((index) => Math.max(0, index - 1))}
            type="button"
          >
            ←
          </button>
          <span>{String(testimonialIndex + 1).padStart(2, "0")} / 03</span>
          <button
            aria-label="Next testimonial"
            disabled={testimonialIndex === testimonials.length - 1}
            onClick={() =>
              setTestimonialIndex((index) => Math.min(testimonials.length - 1, index + 1))
            }
            type="button"
          >
            →
          </button>
        </div>
      </section>

      <section className={styles.why}>
        <SectionLabel>Why choose us</SectionLabel>
        <h2>Help Businesses Scale With AI</h2>
        <div>{whyItems.map(([title, copy], index) => (
          <article key={title}>
            <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
          </article>
        ))}</div>
      </section>

      <section className={styles.pricing} id="pricing-plan">
        <SectionLabel>Pricing plans</SectionLabel>
        <h2>Plans That<br />Scale With You</h2>
        <div className={styles.planList}>
          {plans.map((plan) => (
            <article key={plan.name}>
              <div className={styles.planHead}>
                <p><b>{plan.name}</b><span>{plan.availability}</span></p>
                <h3>{plan.audience}</h3>
                <div><b>{plan.price}</b><span>/ project</span><Link href="#contact">Get started</Link></div>
              </div>
              <ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faq}>
        <SectionLabel>Faqs</SectionLabel>
        <h2>Before You Get Started</h2>
        <div>
          {faqs.map(([question, answer], index) => {
            const open = openFaqs.includes(index);
            return (
              <article className={open ? styles.faqOpen : ""} key={question}>
                <button
                  aria-controls={`home-faq-answer-${index}`}
                  aria-expanded={open}
                  onClick={() =>
                    setOpenFaqs((current) =>
                      current.includes(index)
                        ? current.filter((item) => item !== index)
                        : [...current, index],
                    )
                  }
                  type="button"
                >
                  <span>{question}</span><b>{open ? "−" : "+"}</b>
                </button>
                <p hidden={!open} id={`home-faq-answer-${index}`}>{answer}</p>
              </article>
            );
          })}
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
