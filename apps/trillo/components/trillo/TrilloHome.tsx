"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  TRILLO_TEMPLATE_URL,
  TrilloPageFrame,
} from "./TrilloShell";
import styles from "./TrilloHome.module.css";

const heroSlides = [
  "/trillo/assets/dashboard-1.avif",
  "/trillo/assets/dashboard-2.avif",
  "/trillo/assets/dashboard-3.avif",
];

const brandLogoAssets = [
  "/trillo/assets/brand-4.svg",
  "/trillo/assets/brand-5.svg",
  "/trillo/assets/brand-1.svg",
  "/trillo/assets/brand-2.svg",
  "/trillo/assets/brand-3.svg",
];

const brandLogos = Array.from(
  { length: 10 },
  (_, index) => brandLogoAssets[index % brandLogoAssets.length],
);

const platformCards = [
  "/trillo/assets/platform-card-1.avif",
  "/trillo/assets/platform-card-2.avif",
];

const featureStories = [
  {
    title: "Sales Analytics",
    description:
      "Get a 360° view of performance metrics, KPIs, and trends—all in one place",
    items: [
      "Real-Time Performance Insights",
      "Forecast with Accuracy",
      "Identify Top Performers",
    ],
    background: "/trillo/assets/feature-sales-background.avif",
    card: "/trillo/assets/feature-sales-card.svg",
    imageFirst: false,
  },
  {
    title: "AI Assistant",
    description:
      "Get instant answers, sales insights & suggestions from an integrated chatbot",
    items: ["Smart Task Automation", "Instant Knowledge Access"],
    background: "/trillo/assets/feature-assistant-background.avif",
    card: "/trillo/assets/feature-assistant-card.avif",
    imageFirst: true,
  },
  {
    title: "AI Sales funnel",
    description:
      "Share updates, assign roles, and collaborate on deals without leaving the platform.",
    items: [
      "Real-Time Collaboration",
      "Centralized Communication",
      "Integrated File Sharing",
    ],
    background: "/trillo/assets/feature-funnel-background.avif",
    card: "/trillo/assets/feature-funnel-card.avif",
    imageFirst: false,
  },
];

const workflow = [
  {
    title: "Connect Your Tools",
    copy: "Sync your existing apps data sources one click",
  },
  {
    title: "Automate Workflows",
    copy: "Set smart triggers actions eliminate repetitive tasks",
  },
  {
    title: "Track and Analyze",
    copy: "Get real-time insights, performance dashboard",
  },
  {
    title: "Optimize and Scale",
    copy: "AI suggest improvements streamline operations",
  },
];

const insights = [
  {
    title: "AI-Powered Lead Scoring",
    copy: "AI continuously refines scoring models to ensure you're always targeting opportunities",
    image: "/trillo/assets/insight-lead-scoring.svg",
  },
  {
    title: "Team Productivity Insights",
    copy: "Gain a clear understanding of how your sales team is performing with real-time productivity analytics",
    image: "/trillo/assets/insight-productivity.svg",
  },
  {
    title: "Sales Playbook Automation",
    copy: "Automatically suggest the next-best actions and assets based on deal.",
    image: "/trillo/assets/insight-playbook.svg",
  },
  {
    title: "Performance Tracking & KPIs",
    copy: "Stay on top of your sales goals with powerful performance tracking tools.",
    image: "/trillo/assets/insight-kpis.avif",
  },
];

const reviews = [
  {
    logo: "/trillo/assets/review-logo-1.svg",
    quote:
      "“Trilo completely transformed how we manage our sales pipeline. We've closed 40% more deals in just three months!”",
    avatar: "/trillo/assets/reviewer-1.avif",
    name: "Robert Fox",
  },
  {
    logo: "/trillo/assets/review-logo-2.svg",
    quote:
      "“Our team productivity jumped by 35% after adopting Trilo. It’s like upgrading your sales team with AI superpowers solutions”.",
    avatar: "/trillo/assets/reviewer-2.avif",
    name: "Esther Howard",
  },
  {
    logo: "/trillo/assets/review-logo-3.svg",
    quote:
      "“Since switching to Trilo, our sales forecasting has become almost perfectly accurate. No more guesswork.”",
    avatar: "/trillo/assets/reviewer-3.avif",
    name: "Guy Hawkins",
  },
  {
    logo: "/trillo/assets/review-logo-4.svg",
    quote:
      "“Trilo transformed how we manage our sales pipeline — it's fast, smart, and actually enjoyable to use. We’ve used a dozen CRMs.”",
    avatar: "/trillo/assets/reviewer-4.svg",
    name: "Albert Flores",
  },
  {
    logo: "/trillo/assets/review-logo-5.svg",
    quote:
      "“Trilo doesn’t just help us track deals. It helps us close them — faster and more efficiently. Our sales team finally has one tool that does it all.”",
    avatar: "/trillo/assets/reviewer-5.avif",
    name: "Floyd Miles",
  },
  {
    logo: "/trillo/assets/review-logo-6.svg",
    quote:
      "“Since switching to Trilo, we’ve boosted our conversion rate by 35% and saved over 15 hours per week. Trilo helped us cut our lead response.”",
    avatar: "/trillo/assets/reviewer-6.avif",
    name: "Arlene McCoy",
  },
];

const faqItems = [
  {
    question: "What is Trilo?",
    answer:
      "Trilo is an AI-powered sales management platform that helps teams automate workflows, track pipelines, forecast revenue, and close deals faster using intelligent insights.",
  },
  {
    question: "Does Trilo integrate with CRM tools?",
    answer:
      "Trilo includes built-in CRM features like customer insights and loyalty tracking. It doesn’t list third-party CRM integrations, but data can be exported via APIs.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Trilo doesn’t mention a free trial, but you can click “Get Started” to explore onboarding or contact their team for more info.",
  },
  {
    question: "How does Trilo use AI?",
    answer:
      "Trilo uses AI to analyze customer behavior, helping businesses track loyalty, spending habits, and offer personalized marketing.",
  },
];

const pricingPlans = [
  {
    name: "Silver",
    description: "Perfect for startups and small teams",
    price: "$59",
    yearlyPrice: "$39",
    popular: false,
    features: [
      "Up to 10 users",
      "Smart pipeline management",
      "AI-driven sales insights",
      "5 automation workflows",
      "Email & chat support",
    ],
  },
  {
    name: "Gold",
    description: "Built for growing businesses",
    price: "$49",
    yearlyPrice: "$29",
    popular: true,
    features: [
      "Unlimited users",
      "Advanced forecasting & reporting",
      "Custom automation rules",
      "CRM & tool integrations",
      "24/7 AI priority support",
    ],
  },
];

function useHeroSlides() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return [activeSlide, setActiveSlide] as const;
}

function AnimatedStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState([1100, 0, 0]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const startValues = [1100, 0, 0];
        const endValues = [1200, 5, 24];

        if (reduceMotion) {
          setValues(endValues);
          return;
        }

        const duration = 1100;
        let startedAt: number | null = null;
        const animate = (time: number) => {
          startedAt ??= time;
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setValues(
            endValues.map((target, index) =>
              Math.round(
                startValues[index] +
                  (target - startValues[index]) * eased,
              ),
            ),
          );
          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(animate);
          }
        };

        animationFrame = window.requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const stats = [
    {
      value: values[0],
      suffix: "+",
      title: "Users",
      copy: "This growing community reflects the reliability, performance",
    },
    {
      value: values[1],
      suffix: "x",
      title: "Faster",
      copy: "Our system cuts down delays and manual effort",
    },
    {
      value: values[2],
      suffix: "/7",
      title: "Support",
      copy: "Whether it’s day or night, our support system always on",
    },
  ];

  return (
    <div className={styles.statsGrid} ref={sectionRef}>
      {stats.map((stat, index) => (
        <article
          className={styles.stat}
          data-trillo-reveal="pop"
          key={stat.title}
          style={
            {
              "--trillo-reveal-delay": `${index * 110}ms`,
            } as CSSProperties
          }
        >
          <div className={styles.statValue}>
            <strong>{stat.value}</strong>
            <span>{stat.suffix}</span>
          </div>
          <h3>{stat.title}</h3>
          <p>{stat.copy}</p>
        </article>
      ))}
    </div>
  );
}

export function TrilloHome() {
  const [activeHeroSlide, setActiveHeroSlide] = useHeroSlides();
  const [platformTab, setPlatformTab] = useState(0);
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  function selectBilling(nextYearly: boolean) {
    setYearlyBilling(nextYearly);
  }

  return (
    <TrilloPageFrame>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <h1>Find Targeted Leads with Trillo AI</h1>
              <p>
                Boost your sales effortlessly with the power of AI. By analyzing
                customer behavior, predicting trends
              </p>
              <div className={styles.heroButtons}>
                <a className={styles.darkButton} href={TRILLO_TEMPLATE_URL}>
                  Get 14 Days Free Trial
                  <span aria-hidden="true">↗</span>
                </a>
                <a className={styles.ghostButton} href={TRILLO_TEMPLATE_URL}>
                  Book A Free Demo
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className={styles.heroStage}>
              <img
                alt=""
                aria-hidden="true"
                className={styles.heroGlow}
                src="/trillo/assets/hero-glow.avif"
              />
              <div aria-label="Dashboard views" className={styles.heroBadges}>
                {[
                  "Private & Secure",
                  "Real-Time Insights",
                  "Automated Follow-Ups",
                ].map((label, index) => (
                  <button
                    aria-pressed={activeHeroSlide === index}
                    className={
                      activeHeroSlide === index ? styles.heroBadgeActive : ""
                    }
                    key={label}
                    onClick={() => setActiveHeroSlide(index)}
                    type="button"
                  >
                    <i aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
              <div className={styles.dashboardFrame}>
                {heroSlides.map((slide, index) => (
                  <img
                    alt={`Trillo sales dashboard view ${index + 1}`}
                    aria-hidden={index !== activeHeroSlide}
                    className={`${styles.dashboardImage} ${
                      index === activeHeroSlide ? styles.dashboardImageActive : ""
                    }`}
                    key={slide}
                    src={slide}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.brandSection}>
          <p data-trillo-reveal="soft">
            Trusted by 17,000+ founders &amp; business owners
          </p>
          <div
            className={styles.marqueeViewport}
            data-trillo-reveal="soft"
            style={{ "--trillo-reveal-delay": "100ms" } as CSSProperties}
          >
            <div className={styles.marqueeTrack}>
              {brandLogos.map((logo, index) => (
                <img
                  alt=""
                  aria-hidden="true"
                  height="27"
                  key={`${logo}-${index}`}
                  src={logo}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <div className={styles.sectionContainer}>
            <h2 data-trillo-reveal="soft">
              Grow 10x faster than your competitors
            </h2>
            <div className={styles.benefitsGrid}>
              <article className={styles.aiAssist} data-trillo-reveal="pop">
                <img
                  alt=""
                  aria-hidden="true"
                  className={styles.cardBackground}
                  src="/trillo/assets/benefits-background.avif"
                />
                <div className={styles.aiAssistTop}>
                  <img
                    alt=""
                    aria-hidden="true"
                    height="32"
                    src="/trillo/assets/ai-assist-icon.svg"
                    width="32"
                  />
                  <p>AI Assist</p>
                  <h3>
                    Keep up the momentum! Sales are up 86% compared to last week
                  </h3>
                </div>
                <div className={styles.aiPrompts}>
                  <span>Generate summary</span>
                  <span>How to increase sales next week?</span>
                  <span>What the item should we ewduce?</span>
                </div>
              </article>

              <article
                className={styles.benefitCloud}
                data-trillo-reveal="pop"
                style={{ "--trillo-reveal-delay": "130ms" } as CSSProperties}
              >
                <img
                  alt="Sales customer"
                  className={styles.customerPortrait}
                  src="/trillo/assets/customer-portrait.avif"
                />
                {[
                  "Sales automation",
                  "Customer insights",
                  "Workflow",
                  "Time saving",
                  "Smart CRM",
                  "Sales efficiency",
                ].map((item, index) => (
                  <span
                    className={styles.cloudItem}
                    key={item}
                    style={{ "--cloud-index": index } as CSSProperties}
                  >
                    {item}
                  </span>
                ))}
              </article>
            </div>
          </div>
        </section>

        <section className={styles.featureSection} id="feature">
          <div className={styles.sectionContainer}>
            <h2>Innovative AI solutions that helps</h2>
            <div className={styles.featureStories}>
              {featureStories.map((story, index) => (
                <article
                  className={`${styles.featureStory} ${
                    story.imageFirst ? styles.featureStoryReverse : ""
                  }`}
                  data-trillo-reveal="pop"
                  key={story.title}
                  style={
                    {
                      "--story-index": index,
                      "--trillo-reveal-delay": `${index * 90}ms`,
                    } as CSSProperties
                  }
                >
                  <div className={styles.featureCopy}>
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                    <ul>
                      {story.items.map((item) => (
                        <li key={item}>
                          <img
                            alt=""
                            aria-hidden="true"
                            height="18"
                            src="/trillo/assets/check.svg"
                            width="18"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.featureVisual}>
                    <img
                      alt=""
                      aria-hidden="true"
                      className={styles.featureBackground}
                      src={story.background}
                    />
                    <img
                      alt={`${story.title} product interface`}
                      className={styles.featureCard}
                      src={story.card}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.platformSection}>
          <div className={styles.sectionContainer}>
            <h2 data-trillo-reveal="soft">
              Data-driven platforms for scalable success
            </h2>
            <div className={styles.platformPanel}>
              <div
                aria-label="Platform views"
                className={styles.platformTabs}
                data-trillo-reveal="pop"
                role="tablist"
                style={{ "--trillo-reveal-delay": "110ms" } as CSSProperties}
              >
                <button
                  aria-selected={platformTab === 0}
                  className={platformTab === 0 ? styles.platformTabActive : ""}
                  onClick={() => setPlatformTab(0)}
                  role="tab"
                  type="button"
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    height="20"
                    src="/trillo/assets/automate-icon.svg"
                    width="20"
                  />
                  Automate Workflows
                </button>
                <button
                  aria-selected={platformTab === 1}
                  className={platformTab === 1 ? styles.platformTabActive : ""}
                  onClick={() => setPlatformTab(1)}
                  role="tab"
                  type="button"
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    height="20"
                    src="/trillo/assets/analyze-icon.svg"
                    width="20"
                  />
                  Track &amp; Analyze
                </button>
              </div>
              <div
                className={styles.platformVisual}
                data-trillo-reveal="pop"
                style={{ "--trillo-reveal-delay": "210ms" } as CSSProperties}
              >
                <img
                  alt=""
                  aria-hidden="true"
                  className={styles.platformBackground}
                  src="/trillo/assets/platform-background.avif"
                />
                {platformCards.map((card, index) => (
                  <img
                    alt={
                      index === 0
                        ? "Automated Trillo workflow interface"
                        : "Trillo performance analytics interface"
                    }
                    aria-hidden={platformTab !== index}
                    className={`${styles.platformCard} ${
                      platformTab === index ? styles.platformCardActive : ""
                    }`}
                    key={index}
                    src={card}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statsSection}>
          <div className={styles.sectionContainer}>
            <AnimatedStats />
          </div>
        </section>

        <section className={styles.workflowSection}>
          <div className={styles.sectionContainer}>
            <h2 data-trillo-reveal="soft">
              Intelligent way to manage work
            </h2>
            <div className={styles.workflowGrid}>
              {workflow.map((item, index) => (
                <article
                  className={styles.workflowCard}
                  data-trillo-reveal="pop"
                  key={item.title}
                  style={
                    {
                      "--trillo-reveal-delay": `${index * 90}ms`,
                    } as CSSProperties
                  }
                >
                  <span>0{index + 1}</span>
                  <div className={styles.workflowGlyph} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.insightsSection} id="insights">
          <div className={styles.sectionContainer}>
            <h2 data-trillo-reveal="soft">
              Opportunity insights and deal tracking
            </h2>
            <div className={styles.insightsGrid}>
              {insights.map((item, index) => (
                <article
                  className={styles.insightCard}
                  data-trillo-reveal="pop"
                  key={item.title}
                  style={
                    {
                      "--trillo-reveal-delay": `${index * 90}ms`,
                    } as CSSProperties
                  }
                >
                  <div className={styles.insightVisual}>
                    <img
                      alt=""
                      aria-hidden="true"
                      className={styles.insightBackground}
                      src="/trillo/assets/insight-background.avif"
                    />
                    <img alt={`${item.title} graphic`} src={item.image} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.reviewSection} id="review">
          <div className={styles.sectionContainer}>
            <div className={styles.reviewHeading} data-trillo-reveal="soft">
              <h2>Trusted by 10 million users worldwide</h2>
              <div className={styles.reviewRating}>
                <strong>4.9/5</strong>
                <span className={styles.stars}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <img
                      alt=""
                      aria-hidden="true"
                      height="16"
                      key={index}
                      src="/trillo/assets/star.svg"
                      width="16"
                    />
                  ))}
                </span>
                <img
                  alt=""
                  aria-hidden="true"
                  height="16"
                  src="/trillo/assets/review-icon.svg"
                  width="16"
                />
                <span>10M+ reviews from</span>
              </div>
            </div>
            <div className={styles.reviewGrid}>
              {reviews.map((review, index) => (
                <article
                  className={styles.reviewCard}
                  data-trillo-reveal="pop"
                  key={review.name}
                  style={
                    {
                      "--trillo-reveal-delay": `${(index % 3) * 90}ms`,
                    } as CSSProperties
                  }
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    className={styles.reviewLogo}
                    src={review.logo}
                  />
                  <p>{review.quote}</p>
                  <div className={styles.reviewer}>
                    <img alt={review.name} src={review.avatar} />
                    <span>
                      <strong>{review.name}</strong>
                      <small>CEO &amp; Founder</small>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pricingSection} id="pricing">
          <div className={styles.pricingContainer}>
            <div className={styles.pricingContent}>
              <div className={styles.pricingHeading} data-trillo-reveal="soft">
                <h2>Find the right plan for your needs</h2>
                <p>
                  Supporters receive a 30% discount on early access plus an extra
                  20% off the yearly plan.
                </p>
              </div>
              <div
                className={styles.billingLabels}
                aria-label="Billing period"
                data-trillo-reveal="pop"
                style={{ "--trillo-reveal-delay": "100ms" } as CSSProperties}
              >
                <button
                  aria-pressed={!yearlyBilling}
                  className={!yearlyBilling ? styles.billingActive : ""}
                  onClick={() => selectBilling(false)}
                  type="button"
                >
                  Monthly
                </button>
                <button
                  aria-label={`Switch to ${
                    yearlyBilling ? "monthly" : "yearly"
                  } billing`}
                  aria-pressed={yearlyBilling}
                  className={`${styles.billingToggle} ${
                    yearlyBilling ? styles.billingToggleYearly : ""
                  }`}
                  onClick={() => selectBilling(!yearlyBilling)}
                  type="button"
                >
                  <span aria-hidden="true" />
                </button>
                <button
                  aria-pressed={yearlyBilling}
                  className={yearlyBilling ? styles.billingActive : ""}
                  onClick={() => selectBilling(true)}
                  type="button"
                >
                  Yearly
                </button>
                <b>SAVE 20%</b>
              </div>
              <div className={styles.pricingGrid}>
                {pricingPlans.map((plan) => (
                  <article
                    className={`${styles.pricingCard} ${
                      plan.popular ? styles.pricingCardPopular : ""
                    }`}
                    data-trillo-reveal="pop"
                    key={plan.name}
                    style={
                      {
                        "--trillo-reveal-delay": plan.popular
                          ? "220ms"
                          : "160ms",
                      } as CSSProperties
                    }
                  >
                    {plan.popular && (
                      <span className={styles.popular}>Most Popular</span>
                    )}
                    <div className={styles.planTop}>
                      <h3>{plan.name}</h3>
                      <p>{plan.description}</p>
                      <div className={styles.price}>
                        <strong>
                          {yearlyBilling ? plan.yearlyPrice : plan.price}
                        </strong>
                        <span>/month</span>
                      </div>
                      <a className={styles.planButton} href={TRILLO_TEMPLATE_URL}>
                        Book A Free Demo
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                    <div className={styles.planFeatures}>
                      <p>Features Included:</p>
                      <ul>
                        {plan.features.map((feature) => (
                          <li key={feature}>
                            <span aria-hidden="true">→</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.faqContainer}>
            <h2 data-trillo-reveal="soft">Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {faqItems.map((item, index) => {
                const open = openFaq === index;
                return (
                  <article
                    className={`${styles.faqItem} ${
                      open ? styles.faqItemOpen : ""
                    }`}
                    data-trillo-reveal="pop"
                    key={item.question}
                    style={
                      {
                        "--trillo-reveal-delay": `${90 + index * 75}ms`,
                      } as CSSProperties
                    }
                  >
                    <button
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : index)}
                      type="button"
                    >
                      <span>{item.question}</span>
                      <img
                        alt=""
                        aria-hidden="true"
                        className={open ? styles.faqIconOpen : ""}
                        height="24"
                        src="/trillo/assets/faq-icon.svg"
                        width="24"
                      />
                    </button>
                    <div
                      aria-hidden={!open}
                      className={`${styles.faqAnswer} ${
                        open ? styles.faqAnswerOpen : ""
                      }`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </TrilloPageFrame>
  );
}
