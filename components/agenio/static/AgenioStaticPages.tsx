"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AgenioHeader,
  ContactFooter,
  CornerMarkers,
  DarkButton,
  PageIntro,
  PixelSteps,
  SectionLabel,
} from "@/components/agenio/shared/AgenioShell";
import { agenioAssets } from "@/components/agenio/shared/assets";
import styles from "./AgenioStaticPages.module.css";

const faqItems = [
  {
    question: "What if I only need one specific AI service?",
    answer:
      "Absolutely, you don’t need a full automation package. Whether it’s an AI chatbot, workflow automation, or AI integration, we tailor solutions to match your exact business needs and budget.",
  },
  {
    question: "How long does a typical AI project take?",
    answer:
      "Project timelines depend on the complexity. Most AI integrations take 2–4 weeks, while advanced automation systems typically range from 6–8 weeks. We’ll confirm the timeline during discovery.",
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes. We collaborate with businesses worldwide through video calls, remote workshops, and real-time communication tools, ensuring a smooth process regardless of location.",
  },
  {
    question: "Can you handle both AI systems and development?",
    answer:
      "Yes. We build AI workflows, automation systems, and scalable digital solutions, ensuring seamless integration from strategy to deployment.",
  },
  {
    question: "How do we start a project with your team?",
    answer:
      "Simply contact us through our form or email. We’ll schedule a quick discovery call to understand your goals and recommend the right AI solutions for your business.",
  },
] as const;

const serviceItems = [
  {
    number: "01",
    title: "AI Automation",
    copy: "We automate workflows with AI systems built to improve efficiency and simplify operations.",
    items: [
      "Workflow Automation",
      "AI Process Integration",
      "Custom AI Agents",
      "Business Optimization",
    ],
    image: agenioAssets.services[0],
  },
  {
    number: "02",
    title: "AI Chatbots",
    copy: "We build AI assistants that improve customer support and automate conversations at scale.",
    items: [
      "Custom AI Chatbots",
      "Knowledge Base Training",
      "Lead Qualification",
      "24/7 AI Support",
    ],
    image: agenioAssets.services[1],
  },
  {
    number: "03",
    title: "AI Web Solutions",
    copy: "We create AI-powered websites and platforms focused on automation and speed.",
    items: [
      "AI Website Development",
      "Smart Integrations",
      "CMS Integration",
      "SEO Optimization",
    ],
    image: agenioAssets.services[2],
  },
  {
    number: "04",
    title: "AI Strategy",
    copy: "We help businesses plan and implement AI solutions that support long-term growth.",
    items: [
      "AI Consulting",
      "Automation Planning",
      "Workflow Analysis",
      "AI Implementation",
    ],
    image: agenioAssets.services[3],
  },
  {
    number: "05",
    title: "AI Consulting",
    copy: "We help businesses identify AI opportunities and improve digital workflows efficiently.",
    items: [
      "AI Opportunity Analysis",
      "Automation Consulting",
      "Workflow Evaluation",
      "Digital Transformation",
    ],
    image: agenioAssets.services[3],
  },
  {
    number: "06",
    title: "AI Agents",
    copy: "We develop intelligent AI agents that automate tasks and improve daily operations.",
    items: [
      "Custom AI Agents",
      "Task Automation",
      "AI Workflow Systems",
      "Smart Integrations",
    ],
    image: agenioAssets.services[3],
  },
  {
    number: "07",
    title: "Data Automation",
    copy: "We streamline business data workflows using scalable AI automation systems.",
    items: [
      "Data Processing",
      "Workflow Automation",
      "Real-Time Insights",
      "System Integration",
    ],
    image: agenioAssets.services[3],
  },
  {
    number: "08",
    title: "AI Optimization",
    copy: "We optimize AI systems and workflows to improve performance and scalability.",
    items: [
      "AI Performance Analysis",
      "Workflow Optimization",
      "Automation Monitoring",
      "System Improvements",
    ],
    image: agenioAssets.services[3],
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Analyze & Discover",
    copy:
      "We begin by understanding your workflows, business goals, and operational challenges to identify automation opportunities.",
    visual: ["Goals", "Challenges", "Audiences"],
  },
  {
    number: "02",
    title: "Plan & Strategy",
    copy:
      "We define the right AI solutions, automation systems, and workflows tailored to your business needs.",
    visual: ["Onboarding", "Screens", "Roadmap"],
  },
  {
    number: "03",
    title: "Build & Integrate",
    copy:
      "We develop AI-powered systems and integrate intelligent workflows designed for scalability and performance.",
    visual: ["Agent", "Data", "Workflow"],
  },
  {
    number: "04",
    title: "Launch & Evolve",
    copy:
      "We monitor performance, refine automations, and continuously improve AI systems for long-term efficiency.",
    visual: ["Launch", "Measure", "Improve"],
  },
] as const;

const teamMembers = [
  ["Ethan Brooks", "Agenio Founder", agenioAssets.team[0]],
  ["Liam Anderson", "AI Automation Specialist", agenioAssets.team[2]],
  ["Ethan Walker", "AI Strategy Director", agenioAssets.team[4]],
  ["Mason Cole", "Lead AI Product Designer", agenioAssets.team[6]],
  ["Noah Reed", "AI Solutions Architect", agenioAssets.team[1]],
  ["Oliver Hayes", "Workflow Automation Expert", agenioAssets.team[3]],
  ["James Carter", "AI Creative Director", agenioAssets.team[5]],
] as const;

const awards = [
  {
    date: "March 2026",
    title: "Awwwards – Site of the AI Innovation",
    project: "Nova Website",
    detail:
      "Our AI assistant platform Nova was recognized for its seamless automation workflows, intelligent user interactions, and modern mobile experience design & performance.",
  },
  {
    date: "January 2026",
    title: "Innovation - Featured Product",
    project: "Muse AI Platform",
    detail:
      "Muse was selected for its clear product system, accessible interactions, and practical use of intelligent automation.",
  },
  {
    date: "September 2025",
    title: "System Awards - Best AI Workflow",
    project: "Lunaris AI Solutions.",
    detail:
      "Lunaris brought multiple operational systems into one measurable and resilient automation workflow.",
  },
  {
    date: "October 2025",
    title: "Digital Innovation - Honoree",
    project: "Axis AI Platform",
    detail:
      "Axis was honored for pairing a focused user experience with a scalable AI integration architecture.",
  },
] as const;

const blogPosts = [
  {
    title: "Helve Tica AI Refine",
    image: "/agenio/static/blog-helvetica-ai.png",
  },
  {
    title: "X-direct Mobile AI App",
    image: "/agenio/static/blog-x-direct.png",
  },
  {
    title: "UI UX Chatbot Website",
    image: "/agenio/static/blog-chatbot-ui.png",
  },
] as const;

function RevealSection({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${className} ${styles.reveal} ${visible ? styles.revealVisible : ""}`}
      ref={ref}
    >
      {children}
    </section>
  );
}

function Intro({
  description,
  eyebrow,
  title,
  variant,
}: {
  description: string;
  eyebrow: string;
  title: ReactNode;
  variant?: "about" | "services" | "contact" | "blog";
}) {
  return (
    <div className={`${styles.intro} ${variant ? styles[`intro${variant}`] : ""}`}>
      <PageIntro description={description} eyebrow={eyebrow} title={title} />
    </div>
  );
}

function TrustBar() {
  return (
    <section aria-label="Trusted by" className={styles.trustBar}>
      <p>//We’ve trusted by</p>
      <div className={styles.logoMarquee}>
        {[...agenioAssets.partnerLogos, ...agenioAssets.partnerLogos].map(
          (logo, index) => (
            <span key={`${logo}-${index}`}>
              <Image alt="" height={64} src={logo} width={140} />
            </span>
          ),
        )}
      </div>
    </section>
  );
}

function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([1]));

  function toggle(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <RevealSection className={styles.faq}>
      <CornerMarkers />
      <PixelSteps dark />
      <div className={styles.centerHeading}>
        <SectionLabel>Faqs</SectionLabel>
        <h2>Before You Get Started</h2>
      </div>
      <div className={styles.faqList}>
        {faqItems.map((item, index) => {
          const open = openItems.has(index);
          const answerId = `agenio-faq-${index}`;
          return (
            <article className={open ? styles.faqOpen : undefined} key={item.question}>
              <button
                aria-controls={answerId}
                aria-expanded={open}
                onClick={() => toggle(index)}
                type="button"
              >
                <span>{item.question}</span>
                <b aria-hidden="true">{open ? "−" : "+"}</b>
              </button>
              <div id={answerId}>
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </RevealSection>
  );
}

function Tail({
  compact = false,
  footerOnly = false,
}: {
  compact?: boolean;
  footerOnly?: boolean;
}) {
  return (
    <div className={`${styles.tail} ${footerOnly ? styles.footerOnly : ""}`}>
      <ContactFooter compact={compact || footerOnly} />
    </div>
  );
}

export function AgenioAboutPage() {
  const [openAwards, setOpenAwards] = useState<Set<number>>(() => new Set());

  function toggleAward(index: number) {
    setOpenAwards((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <main className={styles.staticPage}>
      <AgenioHeader />
      <Intro
        description="We transform workflows into intelligent AI-powered solutions through smart automation. Our approach combines AI & Strategy to help businesses scale faster."
        eyebrow="About us"
        title={
          <>
            Agenio Empowerin
            <br />
            AI Innovation
          </>
        }
        variant="about"
      />

      <RevealSection className={styles.aboutStory}>
        <CornerMarkers />
        <div className={styles.aboutLead}>
          <SectionLabel>About us</SectionLabel>
          <h2>
            At our core, we believe
            <br />
            great AI is more than
            <br />
            automation, it’s impact
          </h2>
        </div>
        <div className={styles.aboutResults}>
          <div>
            <p>
              Our results speak for themselves. Each number
              <br />
              represents the trust we’ve built.
            </p>
            {[
              ["300%", "Average ROI from AI Automations"],
              ["120+", "Projects delivered for global clients"],
              ["4/5", "Client rating based on 100+ reviews"],
            ].map(([value, label]) => (
              <article key={value}>
                <span aria-hidden="true">⠳</span>
                <div>
                  <b>{value}</b>
                  <p>{label}</p>
                </div>
              </article>
            ))}
          </div>
          <Link
            className={styles.aboutPhoto}
            href="https://unsplash.com/photos/silhouetted-people-looking-out-large-windows-at-city-yIA3KpsJaNs"
          >
            <Image
              alt="A team looking over a city through large windows"
              fill
              sizes="(max-width: 760px) 100vw, 56vw"
              src="/agenio/static/about-team.png"
            />
          </Link>
        </div>
      </RevealSection>

      <TrustBar />

      <RevealSection className={styles.approach}>
        <CornerMarkers />
        <div className={styles.approachIntro}>
          <SectionLabel>Our approach</SectionLabel>
          <h2>Expertise in AI, Automation and Systems</h2>
          <p>
            Our AI automation process may vary depending on the business goals and
            workflow requirements, but typically follows these core steps. It is a
            strategic process.
          </p>
          <DarkButton href="/agenio/services">Explore Our Service</DarkButton>
        </div>
        <div className={styles.approachSteps}>
          {processSteps.slice(0, 3).map((step) => (
            <article key={step.number}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              <b>{step.number}</b>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className={styles.why}>
        <CornerMarkers />
        <PixelSteps dark flip />
        <SectionLabel>Why choose us</SectionLabel>
        <h2>Help Businesses Scale With AI</h2>
        <div>
          {[
            [
              "Strategy Driven",
              "We combine automation, AI systems, and smart workflows to build solutions aligned with your business goals.",
            ],
            [
              "Built for Results",
              "From workflow automation to AI integration, every system is built to improve efficiency and performance.",
            ],
            [
              "Collaborative Process",
              "We work closely with clients at every step, ensuring transparency, feedback, and shared success.",
            ],
            [
              "Consistent Excellence",
              "Our team delivers reliable AI solutions across every touchpoint from automation to systems.",
            ],
          ].map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className={styles.team}>
        <CornerMarkers />
        <div className={styles.centerHeading}>
          <SectionLabel>Team members</SectionLabel>
          <h2>The Minds Behind the Work</h2>
        </div>
        <div className={styles.teamGrid}>
          {teamMembers.map(([name, role, image]) => (
            <article key={name}>
              <div>
                <Image alt="" fill sizes="(max-width: 760px) 85vw, 22vw" src={image} />
              </div>
              <h3>{name}</h3>
              <p>{role}</p>
            </article>
          ))}
          <article className={styles.talentCard}>
            <div>
              <Image
                alt=""
                fill
                sizes="(max-width: 760px) 85vw, 22vw"
                src={agenioAssets.team[7]}
              />
            </div>
            <h3>We’re Searching For Talents</h3>
            <p>Join our team of creatives pushing boundaries, experimenting with ideas.</p>
            <Link href="/agenio/contact">Apply to Join Us</Link>
          </article>
        </div>
      </RevealSection>

      <RevealSection className={styles.awards}>
        <CornerMarkers />
        <SectionLabel>Award</SectionLabel>
        <h2>AI Solutions That Stand Out</h2>
        <div className={styles.awardList}>
          {awards.map((award, index) => {
            const open = openAwards.has(index);
            const contentId = `agenio-award-${index}`;
            return (
              <article className={open ? styles.awardOpen : undefined} key={award.title}>
                <button
                  aria-controls={contentId}
                  aria-expanded={open}
                  onClick={() => toggleAward(index)}
                  type="button"
                >
                  <span>{award.date}</span>
                  <strong>{award.title}</strong>
                  <span>{award.project}</span>
                  <b aria-hidden="true">{open ? "−" : "+"}</b>
                </button>
                <div id={contentId}>
                  <p>{award.detail}</p>
                  <Image
                    alt=""
                    height={140}
                    src={agenioAssets.projectLaptopAlt}
                    width={220}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </RevealSection>

      <FaqSection />
      <Tail />
    </main>
  );
}

export function AgenioServicesPage() {
  return (
    <main className={styles.staticPage}>
      <AgenioHeader />
      <Intro
        description="We transform workflows into scalable AI-powered solutions through smart automation. Our approach combines AI, strategy, and efficiency to help businesses grow faster."
        eyebrow="Services"
        title={
          <>
            We build intelligent
            <br />
            AI experiences
          </>
        }
        variant="services"
      />

      <RevealSection className={styles.services}>
        <CornerMarkers />
        <div className={styles.centerHeading}>
          <SectionLabel>Services</SectionLabel>
          <h2>We Build AI Solutions</h2>
        </div>
        <div className={styles.servicesGrid}>
          {serviceItems.map((service) => (
            <article className={styles.serviceCard} key={service.number}>
              <Image
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 25vw"
                src={service.image}
              />
              <div className={styles.serviceCover}>
                <div>
                  <SectionLabel dark>{service.title}</SectionLabel>
                  <p>{service.copy}</p>
                </div>
                <b>{service.number}</b>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <TrustBar />

      <RevealSection className={styles.process}>
        <CornerMarkers />
        <div className={styles.processIntro}>
          <SectionLabel>Process</SectionLabel>
          <h2>
            Combine AI
            <br />
            With Automation
          </h2>
          <p>Every step designed to improve workflows, efficiency.</p>
          <DarkButton href="/agenio/contact">Start a Project</DarkButton>
        </div>
        <div className={styles.processCards}>
          {processSteps.map((step, index) => (
            <article key={step.number}>
              <div className={`${styles.processVisual} ${styles[`processVisual${index + 1}`]}`}>
                {step.visual.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div>
                <span>//{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className={styles.pricing}>
        <CornerMarkers />
        <div className={styles.centerHeading}>
          <SectionLabel>Pricing plans</SectionLabel>
          <h2>Plans That Scale With You</h2>
        </div>
        <div className={styles.pricingGrid}>
          {[
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
          ].map((plan, index) => (
            <article className={index === 1 ? styles.pricingFeatured : undefined} key={plan.name}>
              <div className={styles.planTop}>
                <p>
                  <strong>{plan.name}</strong>
                  <span>{plan.availability}</span>
                </p>
                <h3>{plan.audience}</h3>
                <div>
                  <b>{plan.price}</b>
                  <span>/ project</span>
                </div>
                <Link href="/agenio/contact">Get started</Link>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </RevealSection>

      <FaqSection />
      <Tail />
    </main>
  );
}

export function AgenioContactPage() {
  return (
    <main className={styles.staticPage}>
      <AgenioHeader />
      <Intro
        description="Reach out to our team today and let’s collaborate to turn your ideas into innovative solutions that truly inspire."
        eyebrow="Contact"
        title="Get In Touch"
        variant="contact"
      />
      <RevealSection className={styles.contactDetails}>
        <CornerMarkers />
        <div className={styles.contactCards}>
          {[
            ["✉", "E-mail address", "ridhwanco.dev@gmail.com"],
            ["♧", "Phone number", "+1 (647) 555 0172"],
            ["⌖", "Our location", "USA, New York – 1060 Str."],
          ].map(([icon, title, value]) => (
            <article key={title}>
              <span aria-hidden="true">{icon}</span>
              <h2>{title}</h2>
              <p>{value}</p>
            </article>
          ))}
        </div>
        <div className={styles.mapFrame}>
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d317859.6089702069!2d-0.075949!3d51.508112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760349331f38dd%3A0xa8bf49dde1d56467!2sTower%20of%20London!5e0!3m2!1sen!2sus!4v1719221598456!5m2!1sen!2sus"
            title="Agenio location map"
          />
        </div>
      </RevealSection>
      <Tail compact />
    </main>
  );
}

export function AgenioBlogPage() {
  return (
    <main className={styles.staticPage}>
      <AgenioHeader />
      <Intro
        description="Blog Three Column"
        eyebrow="Blog Three Column"
        title="Blog Three Column"
        variant="blog"
      />
      <RevealSection className={styles.blog}>
        <CornerMarkers />
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <article key={post.title}>
              <div>
                <Image alt="" fill sizes="(max-width: 760px) 88vw, 30vw" src={post.image} />
              </div>
              <p>Developer</p>
              <h2>{post.title}</h2>
              <span className={styles.readMore}>Read More</span>
            </article>
          ))}
        </div>
      </RevealSection>
      <Tail footerOnly />
    </main>
  );
}
