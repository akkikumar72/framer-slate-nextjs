"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./FuelPage.module.css";
import {
  FuelArrowLink,
  FuelFooter,
  FuelHeader,
  FuelPlus,
  FuelSectionLabel,
} from "./fuel/FuelShell";
import { FuelLiquidHero } from "./fuel/FuelLiquidHero";

const portfolioItems = [
  {
    number: "01",
    title: "Vellfire Calibration",
    category: "Art Direction",
    year: "© 2025",
    image: "/fuel/8bae303b4bb517a0.avif",
    href: "/fuel/work/portfolio/vellfire-calibration",
  },
  {
    number: "02",
    title: "Dunwill Lanson",
    category: "Photograhy",
    year: "© 2024",
    image: "/fuel/55b87dddedc6c7d5.avif",
    href: "/fuel/work/portfolio/dunwill-lanson",
  },
  {
    number: "03",
    title: "Noara Willis",
    category: "Strategy",
    year: "© 2025",
    image: "/fuel/4e8213b0484cd0ba.avif",
    href: "/fuel/work/portfolio/noara-willis",
  },
  {
    number: "04",
    title: "Nike Studios",
    category: "Art Direction",
    year: "© 2025",
    image: "/fuel/ac4be585dbf98394.avif",
    href: "/fuel/work/portfolio/nike-studios",
  },
];

const testimonials = [
  {
    name: "Adrian Velasco",
    role: "NovaLabs / Creative Lead",
    portrait: "/fuel/201b01b364f96e2b.avif",
    portraitAlt: "Adrian Velasco wearing an Oslo jacket",
    logo: "/fuel/5ed0a03e79ddc865.svg",
    authorImage: "/fuel/ac4fe85c79135515.avif",
    quote:
      "Fuel delivered with clarity. Their structured workflow and fast turnaround made our redesign launch seamless. They’ve become our trusted partner for every major creative push.",
    desktopLines: [
      "“Fuel delivered",
      "with",
      "clarity. Their structured",
      "workflow and fast",
      "turnaround made our",
      "redesign launch seamless.",
      "They’ve become our trusted",
      "partner for every major",
      "creative push.”",
    ],
    wideLines: [
      "“Fuel delivered with",
      "clarity.",
      "Their structured workflow and fast",
      "turnaround made our redesign",
      "launch seamless. They’ve become",
      "our trusted partner for every major",
      "creative push.”",
    ],
    mobileLines: [
      "“Fuel delivered",
      "with clarity. Their",
      "structured workflow",
      "and fast turnaround",
      "made our redesign",
      "launch seamless.",
      "They’ve become our",
      "trusted partner for",
      "every major creative",
      "push.”",
    ],
    success: "122+",
    satisfaction: "99%",
  },
  {
    name: "Gracia Michelle",
    role: "Apple Co. / Senior Lead Engineer",
    portrait: "/fuel/testimonial-manila.avif",
    portraitAlt: "Man wearing a neutral overshirt",
    logo: "/fuel/testimonial-manila-logo.avif",
    authorImage: "/fuel/testimonial-gracia.avif",
    quote:
      "The team understood our vision instantly. Clean replies, flexible timelines, and consistently refined work with punch. Fuel gave our brand the modern edge we were missing.",
    desktopLines: [
      "“The team understood",
      "our vision instantly.",
      "Clean replies, flexible",
      "timelines, and consistently",
      "refined work with punch.",
      "Fuel gave our brand the",
      "modern edge we were",
      "missing.”",
    ],
    wideLines: [
      "“The team understood",
      "our",
      "vision instantly. Clean replies,",
      "flexible timelines, and consistently",
      "refined work with punch. Fuel gave",
      "our brand the modern edge we",
      "were missing.”",
    ],
    mobileLines: [
      "“The team understood",
      "our vision instantly.",
      "Clean replies, flexible",
      "timelines, and refined",
      "work with punch.",
      "Fuel gave our brand",
      "the modern edge we",
      "were missing.”",
    ],
    success: "257+",
    satisfaction: "84%",
  },
  {
    name: "Kasandra, Leon, Miles",
    role: "Miro One / Team Lead Members",
    portrait: "/fuel/testimonial-professional.avif",
    portraitAlt: "Woman in warm orange light",
    logo: "/fuel/testimonial-professional-logo.png",
    authorImage: "/fuel/testimonial-team.avif",
    quote:
      "Professional, thoughtful, and incredibly detail-driven. Fuel supported us through multiple product rollouts with steady direction and polished execution. Highly dependable every time.",
    desktopLines: [
      "“Professional, thoughtful,",
      "and incredibly detail-driven.",
      "Fuel supported us through",
      "multiple product rollouts",
      "with steady direction and",
      "polished execution. Highly",
      "dependable every time.”",
    ],
    wideLines: [
      "“Professional, thoughtful,",
      "and incredibly detail-driven. Fuel",
      "supported us through multiple",
      "product rollouts with steady",
      "direction and polished execution.",
      "Highly dependable every time.”",
    ],
    mobileLines: [
      "“Professional,",
      "thoughtful, and",
      "detail-driven. Fuel",
      "supported multiple",
      "product rollouts with",
      "steady direction and",
      "polished execution.”",
    ],
    success: "315+",
    satisfaction: "94%",
  },
] as const;

const services = [
  {
    number: "01",
    title: "Art Direction",
    kicker: "Creative Oversight",
    copy:
      "Guiding visual identity through clarity and intentional design. Fuel shapes cohesive narratives that elevate brands beyond aesthetics, creating timeless expressions with edge.",
    image: "/fuel/e04df589939b6977.avif",
  },
  {
    number: "02",
    title: "Photography",
    kicker: "Brand Imaging",
    copy:
      "Crafting imagery with mood, precision, and emotional depth. Fuel captures moments that feel curated and purposeful, transforming simple visuals into powerful brand stories.",
    image: "/fuel/bb5eadd32be29723.avif",
  },
  {
    number: "03",
    title: "Strategy",
    kicker: "Concept Frameworks",
    copy:
      "Structuring ideas with insight, direction, and clarity. Fuel builds thoughtful frameworks that define positioning, strengthen identity, and move brands toward long-term impact.",
    image: "/fuel/284e03b4cfe5a7af.avif",
  },
];

const pricing = [
  {
    name: "Starter",
    description:
      "Essential design support for new brands taking the first step.",
    price: "999",
    features: [
      "Custom-crafted visual identity",
      "Responsive, modern website design",
      "High-quality imagery and production",
    ],
  },
  {
    name: "Professional",
    description:
      "Ideal for brands seeking refined systems and digital presence.",
    price: "7299",
    features: [
      "Custom-crafted visual identity",
      "Responsive, modern website design",
      "High-quality imagery and production",
      "Structured layouts with clean typography",
      "Conversion-focused page strategy",
      "Fast, optimized performance setup",
    ],
  },
  {
    name: "Elite",
    description: "High-touch and a fully crafted brand experience by Fuel.",
    price: "10999",
    features: [
      "Custom-crafted visual identity",
      "Responsive, modern website design",
      "High-quality imagery and production",
      "Structured layouts with clean typography",
      "Conversion-focused page strategy",
      "Fast, optimized performance setup",
      "Seamless CMS and organization",
      "Dedicated support for revisions",
    ],
  },
];

const archiveRows = [
  {
    year: "2025",
    title: "Outside",
    images: ["/fuel/188ef455a1147d75.avif"],
  },
  {
    year: "2024",
    title: "Juvede",
    images: [
      "/fuel/25d7553dc77953f2.avif",
      "/fuel/5a1ba95f4b1a8433.avif",
      "/fuel/126845238587b5d2.avif",
    ],
  },
  {
    year: "2025",
    title: "Zaine",
    images: ["/fuel/00a23b3f2c3ef5eb.avif"],
  },
  {
    year: "2024",
    title: "Wall Out",
    images: [
      "/fuel/55b87dddedc6c7d5.avif",
      "/fuel/4595c50c25bd2d39.avif",
    ],
  },
  {
    year: "2019",
    title: "Geaton",
    images: [
      "/fuel/ea54e05e2e5abeed.avif",
      "/fuel/057e7c22c86369d0.avif",
      "/fuel/ac4be585dbf98394.avif",
    ],
  },
  {
    year: "2020",
    title: "Skate",
    images: ["/fuel/23e7677d698c2fba.avif"],
  },
];

const stats = [
  {
    value: "2.06M",
    label: "Global Impressions",
    copy:
      "Fuel moves beyond simple authenticity, creating refined systems that shape digital presence.",
  },
  {
    value: "160K",
    label: "Community Reach",
    copy:
      "Elevating identity with structured clarity. Fuel crafts experiences that extend far beyond visual form.",
  },
  {
    value: "750+",
    label: "Creative Hours Logged",
    copy:
      "Through precision and intention, Fuel transforms ideas into cohesive narratives that define brands.",
  },
  {
    value: "257+",
    label: "Projects Completed",
    copy:
      "Blending modern aesthetics with functional design, Fuel delivers refined solutions that push brands.",
  },
];

const articles = [
  {
    number: "001",
    title: "Velocity Becomes",
    category: "Art Direction",
    image: "/fuel/b5327417d6abd67b.avif",
    tall: true,
    href: "/fuel/blog/velocity-becomes",
  },
  {
    number: "002",
    title: "Way To Clearance",
    category: "Books",
    image: "/fuel/59d2041feaddd9fc.avif",
    tall: false,
    href: "/fuel/blog/way-to-clearance",
  },
  {
    number: "003",
    title: "All Grapples",
    category: "Automotive",
    image: "/fuel/2f68980fa3ea306e.avif",
    tall: true,
    href: "/fuel/blog/all-grapples",
  },
  {
    number: "004",
    title: "Flowers Love",
    category: "Gardening",
    image: "/fuel/1865502c2f9d9de5.avif",
    tall: false,
    href: "/fuel/blog/flowers-love",
  },
];

const faqs = [
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
];

function useRevealAnimations() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-fuel-reveal]"),
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.dataset.fuelVisible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.fuelVisible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[number];
  index: number;
}) {
  return (
    <a
      className={styles.portfolioCard}
      data-fuel-reveal
      href={item.href}
      style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
    >
      <div className={styles.portfolioCardInner}>
        <div className={styles.portfolioImage}>
          <img
            alt=""
            aria-hidden="true"
            className={styles.blurImage}
            src={item.image}
          />
          <img alt={item.title} className={styles.sharpImage} src={item.image} />
        </div>
        <div className={styles.portfolioMeta}>
          <span>({item.number})</span>
          <span>
            <strong>{item.title}</strong>
            <em>{item.category}</em>
          </span>
          <span>{item.year}</span>
        </div>
      </div>
    </a>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof pricing)[number];
  index: number;
}) {
  return (
    <article
      className={styles.priceCard}
      data-fuel-reveal
      style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
    >
      <header>
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
      </header>
      <div className={styles.price}>
        <span>$</span>
        <strong>{plan.price}</strong>
        <span>/Month</span>
      </div>
      <FuelArrowLink>Join Us Now</FuelArrowLink>
      <div className={styles.included}>
        <h4>What’s included</h4>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>
              <span aria-hidden="true">＋</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}>
      <button aria-expanded={open} onClick={onToggle} type="button">
        <span>{item.question}</span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div className={styles.faqAnswer} inert={!open ? true : undefined}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export function FuelPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const testimonial = testimonials[testimonialIndex];

  useRevealAnimations();

  useEffect(() => {
    document.body.style.background = "#ffffff";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let frame = 0;
    const synchronizeHeroReveal = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const progress = Math.min(1, Math.max(0, window.scrollY / 420));
        root.style.setProperty(
          "--hero-reveal-skew",
          String(-0.0616037 * progress),
        );
        root.style.setProperty(
          "--hero-reveal-lift",
          String(-110.791 * progress),
        );
      });
    };

    synchronizeHeroReveal();
    window.addEventListener("scroll", synchronizeHeroReveal, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", synchronizeHeroReveal);
    };
  }, []);

  return (
    <main className={styles.page} id="top" ref={rootRef}>
      <section aria-label="Fuel introduction" className={styles.hero}>
        <img
          alt="Woman moving through orange and blue light"
          className={styles.heroImage}
          src="/fuel/hero.png"
        />
        <FuelLiquidHero className={styles.heroLiquid} />
        <FuelHeader />
        <div className={styles.heroTopCopy}>
          <p className={styles.heroDescription}>
            <span className={styles.heroCopyLine}>
              Pick a plan, submit a job request,
            </span>
            <span className={styles.heroCopyLine}>
              and your イメージ{" "}
              <span className={styles.heroMuted}>will kickoff</span>
            </span>
            <span
              className={`${styles.heroCopyLine} ${styles.heroMuted}`}
            >
              within 24 hours.
            </span>
          </p>
          <div className={styles.heroCta}>
            <FuelArrowLink dark href="/fuel/about">
              Explore Now
            </FuelArrowLink>
          </div>
        </div>
        <div className={styles.heroServices}>
          <span>01/ Strategy</span>
          <span>Videography</span>
          <span>Branding</span>
        </div>
        <FuelPlus className={styles.heroPlusOne} />
        <FuelPlus className={styles.heroPlusTwo} />
        <FuelPlus className={styles.heroPlusThree} />
        <FuelPlus className={styles.heroPlusFour} />
        <div className={styles.heroFooter}>
          <span>© 2025</span>
          <span className={styles.soundBars} aria-hidden="true">
            {Array.from({ length: 11 }).map((_, index) => (
              <i key={index} />
            ))}
          </span>
          <span>19&apos;</span>
          <img alt="" src="/fuel/447964bca6776fb8.avif" />
        </div>
      </section>

      <section className={styles.about} id="about">
        <div aria-hidden="true" className={styles.aboutSweep} />
        <FuelSectionLabel number="01" title="About Us" />
        <h1 className={styles.aboutHeading} data-fuel-reveal>
          <span>Design-forward</span> impressive agency crafting bold visuals,
          structured layouts, and high-impact digital 3D Swiss inspired by
          modern aesthetics®.
        </h1>
        <h1
          aria-label="Design-forward impressive agency crafting bold visuals, structured layouts, and high-impact digital 3D Swiss inspired by modern aesthetics."
          className={styles.mobileAboutHeading}
          data-fuel-reveal
        >
          <span>Design-</span>
          <span>forward impressive</span>
          <span>agency crafting bold</span>
          <span>visuals, structured</span>
          <span>
            layouts, and high-impact digital 3D Swiss inspired by modern
            aesthetics®.
          </span>
        </h1>
        <div className={styles.aboutGrid} data-fuel-reveal>
          <img alt="Man standing against a red background" src="/fuel/881ba55d97d442f2.avif" />
          <div className={styles.aboutColumn}>
            <span>(Pre)</span>
            <p>
              Igniting ideas with precision and intentional design. Fuel
              transforms raw creativity into structured visual systems that
              shape brands and elevate digital experiences.
            </p>
          </div>
          <div className={styles.aboutColumn}>
            <span>(+Post)</span>
            <p>
              Driven by bold aesthetics and functional simplicity. Fuel blends
              modern form with purposeful detail, delivering refined
              experiences that push brands forward.
            </p>
          </div>
          <div className={styles.resultColumn}>
            <span>(=Results)</span>
            <p>
              <span>New clients</span>
              <strong>15</strong>
            </p>
            <p>
              <span>Success rate</span>
              <strong>100%</strong>
            </p>
            <FuelArrowLink href="/fuel/work/portfolio">
              Explore Now
            </FuelArrowLink>
          </div>
        </div>
      </section>

      <section aria-label="Selected clients" className={styles.clientStrip}>
        <div className={styles.clientTrack}>
          {[
            "/fuel/871fb414ad85f178.avif",
            "/fuel/291d77a50a280a11.avif",
            "/fuel/c5969763435e844b.avif",
            "/fuel/3df7f26e8a24cb04.avif",
            "/fuel/2ea0a6032a3aba32.svg",
            "/fuel/871fb414ad85f178.avif",
          ].map((image, index) => (
            <div className={styles.clientLogo} key={`${image}-${index}`}>
              <img alt="" src={image} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.portfolio} id="portfolio">
        <FuelSectionLabel number="02" title="Portfolio" />
        <div className={styles.portfolioIntro}>
          <div>
            <h2>FX-25&apos;</h2>
            <FuelArrowLink>Join Us Now</FuelArrowLink>
          </div>
          <a className={styles.seeAll} href="/fuel/work/portfolio">
            <img alt="" src="/fuel/706a17cc34db2fca.avif" />
            <span>See all (07)</span>
          </a>
        </div>
        <div className={styles.portfolioStack}>
          {portfolioItems.map((item, index) => (
            <PortfolioCard index={index} item={item} key={item.title} />
          ))}
        </div>
      </section>

      <section className={styles.services} id="services">
        <FuelSectionLabel dark number="03" title="Premium Services" />
        <div className={styles.serviceStatement}>
          <video
            aria-label="Fuel service showreel"
            autoPlay
            loop
            muted
            playsInline
            poster="/fuel/d7517bf24cd2ceae.avif"
          >
            <source src="/fuel/service-loop.mp4" type="video/mp4" />
          </video>
          <p
            aria-label="Design-driven studio delivering the structured visuals, refined digital system, and high-impact brand experiences shaped by aesthetics and Fuel."
            data-fuel-reveal
          >
            <span className={styles.desktopServiceCopy}>
              Design-driven studio delivering the structured visuals, refined
              digital system, and high-impact brand experiences shaped by
              aesthetics &amp; Fuel®.
            </span>
            <span aria-hidden="true" className={styles.mobileServiceCopy}>
              <span>Design-driven</span>
              <span>studio delivering the</span>
              <span>structured visuals,</span>
              <span>refined digital system,</span>
            </span>
          </p>
          <FuelArrowLink dark href="/fuel/about">
            Explore More
          </FuelArrowLink>
        </div>
        <div className={styles.serviceRows}>
          {services.map((service, index) => (
            <article
              className={styles.serviceRow}
              data-fuel-reveal
              key={service.title}
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <strong>{service.number}</strong>
              <img alt={service.title} src={service.image} />
              <div>
                <h3>{service.title}</h3>
                <span>{service.kicker}</span>
                <p>{service.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.pricing} id="pricing">
        <FuelSectionLabel number="04" title="Pricing" />
        <div className={styles.pricingGrid}>
          {pricing.map((plan, index) => (
            <PricingCard index={index} key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      <section
        className={`${styles.testimonial} ${
          testimonialIndex === 2
            ? styles.testimonialCompact
            : styles.testimonialTall
        }`}
      >
        <FuelSectionLabel number="05" title="Testimonial" />
        <div
          aria-live="polite"
          className={styles.testimonialGrid}
          data-slide={testimonialIndex}
        >
          <div
            className={styles.testimonialPerson}
            key={`${testimonial.name}-person`}
          >
            <div>
              <img alt={testimonial.portraitAlt} src={testimonial.portrait} />
              <img alt="" src={testimonial.logo} />
            </div>
            <img alt={testimonial.name} src={testimonial.authorImage} />
            <span>
              <strong>{testimonial.name}</strong>
              <em>{testimonial.role}</em>
            </span>
          </div>
          <blockquote
            aria-label={testimonial.quote}
            className={styles.testimonialQuoteDesktop}
            key={`${testimonial.name}-desktop`}
          >
            {testimonial.desktopLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </blockquote>
          <blockquote
            aria-label={testimonial.quote}
            className={styles.testimonialQuoteWide}
            key={`${testimonial.name}-wide`}
          >
            {testimonial.wideLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </blockquote>
          <blockquote
            aria-label={testimonial.quote}
            className={styles.testimonialQuoteMobile}
            key={`${testimonial.name}-mobile`}
          >
            {testimonial.mobileLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </blockquote>
          <div className={styles.testimonialNumbers}>
            <div>
              <span
                className={styles.testimonialNumber}
                key={`${testimonial.success}-success`}
              >
                <strong>{testimonial.success}</strong>
              </span>
              <p>Success Rate</p>
              <em>Reliable execution</em>
            </div>
            <div>
              <span
                className={styles.testimonialNumber}
                key={`${testimonial.satisfaction}-satisfaction`}
              >
                <strong>{testimonial.satisfaction}</strong>
              </span>
              <p>Client Satisfaction</p>
              <em>Seamless delivery</em>
            </div>
          </div>
          <div aria-hidden="true" className={styles.testimonialRule} />
          <div aria-label="Testimonial controls" className={styles.testimonialArrows}>
            <button
              aria-label="Previous testimonial"
              onClick={() =>
                setTestimonialIndex(
                  (testimonialIndex - 1 + testimonials.length) %
                    testimonials.length,
                )
              }
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() =>
                setTestimonialIndex(
                  (testimonialIndex + 1) % testimonials.length,
                )
              }
              type="button"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className={styles.archive}>
        <FuelSectionLabel number="06" title="Archive" />
        <div className={styles.archiveRows}>
          {archiveRows.map((row, index) => (
            <article
              className={styles.archiveRow}
              data-fuel-reveal
              key={row.title}
              style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
            >
              <span>{row.year}</span>
              <h3>{row.title}</h3>
              <div>
                {row.images.map((image, imageIndex) => (
                  <img alt="" key={`${image}-${imageIndex}`} src={image} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cinematicCta}>
        <img
          alt="Modern villa beside the sea"
          className={styles.cinematicBackground}
          src="/fuel/4a1d32fcb00225ab.avif"
        />
        <div className={styles.cinematicShade} />
        <div className={styles.cinematicMarquee} aria-hidden="true">
          <span>We Are Faster, Better And Cheaper&quot;</span>
          <span>We Are Faster, Better And Cheaper&quot;</span>
        </div>
        <FuelPlus className={styles.ctaPlusOne} />
        <FuelPlus className={styles.ctaPlusTwo} />
        <FuelPlus className={styles.ctaPlusThree} />
        <FuelPlus className={styles.ctaPlusFour} />
        <div className={styles.cinematicCenter} data-fuel-reveal>
          <img alt="Fuel creative director" src="/fuel/c294c3347ed1f685.avif" />
          <FuelArrowLink dark href="/fuel/contact">
            Contact Now
          </FuelArrowLink>
        </div>
      </section>

      <section className={styles.stats}>
        <FuelSectionLabel number="07" title="Stats" />
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <article
              data-fuel-reveal
              key={stat.label}
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <span aria-hidden="true" className={styles.statCorner}>
                ⌝
              </span>
              <strong>{stat.value}</strong>
              <h3>{stat.label}</h3>
              <p>{stat.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.articles}>
        <FuelSectionLabel number="08" title="Article" />
        <div className={styles.articleGrid}>
          {articles.map((article, index) => (
            <a
              className={`${styles.articleCard} ${
                article.tall ? styles.articleTall : ""
              }`}
              data-fuel-reveal
              href={article.href}
              key={article.title}
              style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <img alt={article.title} src={article.image} />
              <div>
                <span>{article.number}</span>
                <span>
                  <strong>{article.title}</strong>
                  <em>{article.category}</em>
                </span>
                <span>© 2025</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.faq}>
        <FuelSectionLabel number="09" title="Frequently Asked Questions" />
        <div className={styles.faqGrid}>
          <a
            aria-label="Play Fuel showreel on YouTube"
            className={styles.showreel}
            href="https://www.youtube.com/"
            rel="noreferrer"
            target="_blank"
          >
            <img alt="Curly woman in the Fuel showreel" src="/fuel/75480d4610cb4757.avif" />
            <span>
              <strong>▶ Play</strong>
              <em>Showreel</em>
            </span>
          </a>
          <div className={styles.faqList}>
            {faqs.map((item, index) => (
              <FaqItem
                item={item}
                key={item.question}
                onToggle={() =>
                  setOpenFaq((current) => (current === index ? null : index))
                }
                open={openFaq === index}
              />
            ))}
          </div>
        </div>
      </section>

      <FuelFooter />

    </main>
  );
}
