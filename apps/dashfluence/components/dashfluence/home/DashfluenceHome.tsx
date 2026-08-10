"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { dashfluenceAssets } from "../shared/assets";
import {
  DashButton,
  SectionEyebrow,
} from "../shared/DashfluenceShell";
import { DASHFLUENCE_BASE } from "../shared/routes";
import styles from "./DashfluenceHome.module.css";

const heroSlides = [
  {
    quote: "Dashfluence didn’t just manage our ads — they transformed our entire acquisition model.",
    person: "Jamie R.",
    brand: "Botanique",
    service: "Paid Media Management",
    detail: "Multi-platform campaign · Full-funnel setup · Copywriting",
  },
  {
    quote: "Dashfluence didn’t just scale our campaigns — they redefined our growth trajectory.",
    person: "Alex M.",
    brand: "Verde Studio",
    service: "Customer Acquisition",
    detail: "Cross-channel strategy · Audience targeting · Optimization",
  },
  {
    quote: "Dashfluence didn’t just optimize our spend — they revolutionized our revenue strategy.",
    person: "Jonathan T.",
    brand: "FreshWorks",
    service: "Strategic Media Buying",
    detail: "Brand messaging alignment · Creative asset production",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Deep Dive & Discovery",
    copy: "Through strategy calls and audits, we uncover what’s working, what’s missing, and where the biggest opportunities lie.",
    className: styles.processLime,
  },
  {
    number: "02",
    title: "Launch & Execute",
    copy: "With strategy locked, we roll out high-impact campaigns, creative content, and the channels that matter.",
    className: styles.processMint,
  },
  {
    number: "03",
    title: "Optimize & Scale",
    copy: "We continuously test, analyze, and refine. Our team fine-tunes every campaign as the data comes in.",
    className: styles.processCoral,
  },
] as const;

const services = [
  {
    slug: "digital-strategy-funnel-mapping",
    title: "Digital Strategy & Funnel Mapping",
    tagline: "We develop unique stories that resonate deeply.",
    copy: "We align data-driven insights with creative storytelling and precision targeting, fueling sustainable business growth.",
    win: "🔥 Recent win: 4.5x ROAS for a sustainable fashion label.",
  },
  {
    slug: "strategy-content-production",
    title: "Strategy & Content Production",
    tagline: "Building Unique Stories With Deep Impact",
    copy: "We merge data-driven strategy with creative storytelling for accurate targeting and long-term growth.",
    win: "🔥 Achieved 4.5x ROAS for a sustainable fashion brand.",
  },
  {
    slug: "seo-organic-growth",
    title: "SEO & Organic Growth",
    tagline: "Creating Meaningful Stories That Connect Deeply",
    copy: "We align analytics, storytelling, and targeting precision to fuel consistent business growth.",
    win: "🔥 Driving 4.5x ROAS growth in a sustainable fashion campaign.",
  },
  {
    slug: "paid-media-management",
    title: "Paid Media Management",
    tagline: "Designing Stories That Touch Every Audience",
    copy: "We integrate data-driven thinking with storytelling and smart targeting to accelerate business growth.",
    win: "🔥 Recent success: 4.5x ROAS for an eco fashion label.",
  },
  {
    slug: "cro-analytics-optimization",
    title: "CRO & Analytics Optimization",
    tagline: "Creating Unique Narratives With Emotional Depth",
    copy: "We connect data, creativity, and targeting accuracy to empower long-term business growth.",
    win: "🔥 Scaling sustainable fashion with 4.5x ROAS results.",
  },
] as const;

const workItems = [
  { slug: "radiant-skincare-branding", title: "Radiant skincare branding", copy: "Visual identity and packaging design for a skincare line.", tag: "Branding Design" },
  { slug: "illuminate-your-natural-beauty", title: "Illuminate Your Natural Beauty", copy: "Modern skincare brand identity with clean packaging design", tag: "Web Design" },
  { slug: "where-radiance-meets-ritual", title: "Where Radiance Meets Ritual", copy: "Natural skincare visual identity and eco friendly packaging", tag: "UI/UX" },
  { slug: "brighter-skin-bolder-you", title: "Brighter Skin. Bolder You.", copy: "Luxury skincare branding with elegant packaging and typography", tag: "Marketing" },
  { slug: "let-your-skin-light-the-way", title: "Let Your Skin Light the Way", copy: "Minimal skincare identity with soft tones packaging design", tag: "Branding Design" },
] as const;

const pricing = [
  { title: "Starter Boost", copy: "Small businesses and startups just beginning their digital marketing journey.", monthly: "799", annual: "899", features: ["Social media management for 2 platforms", "8 custom posts per month", "Basic ad campaign setup", "Monthly performance report", "Email support"] },
  { title: "Growth Accelerator", copy: "Growing businesses ready to scale their marketing with high-impact campaigns.", monthly: "1,499", annual: "1,599", features: ["Social media management for 4 platforms", "Advanced ad campaign optimization", "2 influencer collaborations per month", "Monthly strategy call and reporting", "Priority email and chat support"] },
  { title: "Market Dominator", copy: "Brands aiming to dominate their market with aggressive marketing campaigns.", monthly: "2,999", annual: "3,199", features: ["Social media management for 6+ platforms", "Photo and video content creation", "Dedicated account manager", "Weekly strategy adjustments", "24/7 priority support"] },
] as const;

const testimonials = [
  { quote: "Dashfluence didn’t just improve our ads, they rebuilt the way we approach growth.", name: "Ryan", role: "Head of Marketing" },
  { quote: "We went from page 4 to ranking top 3 for multiple keywords in just two months.", name: "Noah", role: "On-Page SEO" },
  { quote: "Their creative team just gets it. Every ad feels like it was made by someone who lives inside our brand.", name: "James", role: "Technical SEO" },
  { quote: "Our ads improved, but more importantly, Dashfluence rebuilt our whole playbook.", name: "Mateo", role: "Off-Page SEO" },
] as const;

const faqItems = [
  ["What types of businesses do you work with?", "We work with ambitious startups, established brands, SaaS teams, and ecommerce businesses that are ready to turn marketing into measurable growth."],
  ["What’s your pricing model?", "Our plans are designed around the level of support and execution you need. We also scope custom engagements for larger teams."],
  ["What’s included in a typical engagement?", "Our standard engagements include strategy, creative, campaign setup, analytics, and ongoing optimization. You also get a dedicated team, weekly reports, and real-time dashboards."],
  ["How quickly can we launch?", "Most engagements move from kickoff to launch in two to four weeks, depending on research, creative needs, and campaign complexity."],
  ["How do you ensure the website is mobile-friendly and optimized for all devices?", "We design and test every experience across desktop, tablet, and phone breakpoints, then optimize interaction, loading, and conversion details."],
] as const;

function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setSlide((value) => (value + 1) % heroSlides.length), 4000);
    return () => window.clearInterval(id);
  }, []);
  const active = heroSlides[slide];

  return (
    <section className={styles.hero}>
      <img alt="" aria-hidden="true" className={styles.heroBackground} src={dashfluenceAssets.hero} />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <div className={styles.heroMain}>
          <p className={`${styles.heroTag} ${styles.heroEntrance}`}>One team. Every channel.</p>
          <h1 className={styles.heroEntrance}>Where Smart Strategy Meets Scroll-Stopping Content</h1>
          <div className={styles.heroButtons}>
            <DashButton href={`${DASHFLUENCE_BASE}/pricing`} tone="light">Book a Free call</DashButton>
            <DashButton href={`${DASHFLUENCE_BASE}/work`} tone="outline">See Our Work</DashButton>
          </div>
        </div>
        <p className={`${styles.heroLead} ${styles.heroEntrance}`}>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p>
        <blockquote className={`${styles.heroQuote} ${styles.heroEntrance}`} key={`quote-${slide}`}>
          <p>“{active.quote}”</p>
          <footer>— {active.person} <span>@ {active.brand}</span></footer>
        </blockquote>
        <div className={`${styles.heroCard} ${styles.heroEntrance}`} key={`card-${slide}`}>
          <div className={styles.heroCardText}>
            <p>{active.service}</p>
            <span>{active.detail}</span>
          </div>
          <img alt="" src={dashfluenceAssets.heroCards[slide]} />
        </div>
        <div className={styles.heroProgress} aria-label={`Hero story ${slide + 1} of ${heroSlides.length}`}>
          {heroSlides.map((item, index) => <button aria-label={`Show ${item.service}`} aria-pressed={index === slide} className={index === slide ? styles.progressActive : ""} key={item.service} onClick={() => setSlide(index)} type="button"><span /></button>)}
        </div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const logos = [...dashfluenceAssets.brandLogos, ...dashfluenceAssets.brandLogos];
  return <section className={styles.marquee}><p>Trusted by fast-growing startups &amp; forward-thinking brands</p><div className={styles.marqueeViewport}><div className={styles.marqueeTrack}>{logos.map((logo, index) => <img alt="Partner brand" key={`${logo}-${index}`} src={logo} />)}</div></div></section>;
}

function AboutSection() {
  return <section className={styles.about}><div className={styles.aboutVisual} data-dash-reveal="rise"><div className={styles.aboutStack}>{dashfluenceAssets.about.map((image, index) => <img alt="Dashfluence creative work" key={image} src={image} style={{ "--about-index": index } as CSSProperties} />)}</div><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div className={styles.aboutCopy} data-dash-reveal="rise"><SectionEyebrow>Who we are</SectionEyebrow><h2>At Dashfluence, we&apos;re not just another marketing agency, we&apos;re your growth partner. Born from the intersection of creativity and performance.</h2><p>We believe great marketing isn&apos;t just about looking good. It is about moving the needle. That&apos;s why we combine data-driven thinking with fearless creativity.</p><DashButton href={`${DASHFLUENCE_BASE}/about`}>Book a Free call</DashButton></div></section>;
}

function ProcessSection() {
  return <section className={styles.process}><div className={styles.sectionHeading} data-dash-reveal="rise"><SectionEyebrow>How we work</SectionEyebrow><h2>Our Proven Process to Turn Digital Strategy Into Real Results</h2></div><div className={styles.processGrid}>{processSteps.map((step, index) => <article className={`${styles.processCard} ${step.className}`} data-dash-reveal="rise" key={step.title} style={{ "--dash-delay": `${index * 80}ms` } as CSSProperties}><div><span className={styles.processIcon}>{index === 0 ? "Q" : index === 1 ? "◉" : "✺"}</span><span>( {step.number} )</span></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>;
}

function ServicesSection() {
  const [active, setActive] = useState(0);
  return <section className={styles.services}><div className={styles.sectionHeadingDark} data-dash-reveal="rise"><SectionEyebrow tone="light">Services</SectionEyebrow><h2>Performance-Driven Services,<br />Built to Convert</h2></div><div className={styles.servicesBody}><div className={styles.serviceVisual} data-dash-reveal="rise"><img alt="Digital marketing team at work" decoding="async" loading="lazy" src={dashfluenceAssets.services[active]} /><div><p>{services[active].title}</p><span>{services[active].tagline}</span></div></div><div className={styles.serviceList}>{services.map((service, index) => <article className={`${styles.serviceRow} ${active === index ? styles.serviceActive : ""}`} key={service.slug} onMouseEnter={() => setActive(index)}><Link href={`${DASHFLUENCE_BASE}/services/${service.slug}`} onFocus={() => setActive(index)}><h3>{service.title}</h3><span aria-hidden="true">↗</span></Link><div className={styles.serviceExpanded}><img alt="" decoding="async" loading="lazy" src={dashfluenceAssets.services[index]} /><p>{service.copy}</p><small>{service.win}</small></div></article>)}<DashButton href={`${DASHFLUENCE_BASE}/services`} tone="light">See our all services</DashButton></div></div></section>;
}

function WorkSection() {
  return <section className={styles.work}><div className={styles.sectionHeading} data-dash-reveal="rise"><SectionEyebrow>Case Studies</SectionEyebrow><h2>Case Studies That Prove the Power of Our Performance</h2></div><div className={styles.workGrid}>{workItems.map((item, index) => <Link className={styles.workCard} data-dash-reveal="rise" href={`${DASHFLUENCE_BASE}/work/${item.slug}`} key={item.slug} style={{ "--work-index": index, "--dash-delay": `${(index % 2) * 90}ms` } as CSSProperties}><div><img alt={item.title} src={dashfluenceAssets.work[index]} /></div><h3>{item.title}</h3><p>{item.copy}</p><span>{item.tag}</span></Link>)}</div><div className={styles.centerButton}><DashButton href={`${DASHFLUENCE_BASE}/work`}>See all case studies</DashButton></div></section>;
}

function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      setProgress(1);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: .35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const value = Math.min(1, (now - start) / 2500);
      setProgress(1 - Math.pow(1 - value, 3));
      if (value < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);
  return <section className={styles.metrics} ref={ref}><div className={styles.metricsHeading} data-dash-reveal="rise"><SectionEyebrow>Key Metrics</SectionEyebrow><h2>Behind every campaign we launch is a strategy rooted in results. Here&apos;s a snapshot of the performance we’ve delivered for brands like yours, and we’re just getting started.</h2></div><div className={styles.metricCards}><article className={styles.metricBlue}><strong>${(3.2 * progress).toFixed(1)}M+</strong><p>Ad Spend Managed</p></article><article className={styles.metricGreen}><strong>{(5.4 * progress).toFixed(1)}x</strong><p>Average ROAS on Paid Campaigns</p></article><article className={styles.metricSky}><strong>{Math.round(120 * progress)}+</strong><p>Campaigns Launched</p></article></div></section>;
}

function GrowthBanner() {
  const [image, setImage] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setImage((value) => (value + 1) % dashfluenceAssets.bannerCards.length), 1100);
    return () => clearInterval(id);
  }, []);
  return <section className={styles.growth}><img alt="" aria-hidden="true" className={styles.growthBackground} src={dashfluenceAssets.growthBackground} /><div className={styles.growthTags}><span>CREATIVE &amp; CONTENT</span><span>STRATEGY</span><span>PERFORMANCE ADS</span><span>SEO &amp; ANALYTICS</span></div><div className={styles.growthCenter} data-dash-reveal="rise"><h2>Your Growth Starts<br />Right Here</h2><img alt="A collage of marketing work" key={image} src={dashfluenceAssets.bannerCards[image]} /></div><div className={styles.growthBottom}><div><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div><small>From DTC startups to SaaS</small><p>We’re more than an agency, we’re your marketing growth engine.</p></div></div></section>;
}

function PricingSection() {
  const [annual, setAnnual] = useState(false);
  return <section className={styles.pricing}><div className={styles.pricingHeading} data-dash-reveal="rise"><div><SectionEyebrow>Pricing</SectionEyebrow><h2>Flexible plans for<br />every marketing need</h2></div><div className={styles.priceToggle}><button aria-checked={annual} aria-label="Use annual billing" onClick={() => setAnnual((value) => !value)} role="switch" type="button"><span className={!annual ? styles.periodActive : ""}>Monthly</span><span aria-hidden="true" className={styles.toggleTrack}><span /></span><span className={annual ? styles.periodActive : ""}>Annual</span></button><span>Save 30%</span></div></div><div className={styles.priceGrid}>{pricing.map((plan, index) => <article className={`${styles.priceCard} ${index === 1 ? styles.priceFeatured : ""}`} data-dash-reveal="rise" key={plan.title} style={{ "--dash-delay": `${index * 70}ms` } as CSSProperties}><h3>{plan.title}</h3><p>{plan.copy}</p><div className={styles.price}><sup>$</sup><strong>{annual ? plan.annual : plan.monthly}</strong><span>/month</span></div><h4>What’s included:</h4><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><DashButton href={`${DASHFLUENCE_BASE}/contact-us`} tone={index === 1 ? "dark" : "outlineDark"}>Get Started Today</DashButton></article>)}</div></section>;
}

function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const visible = [testimonials[page], testimonials[(page + 1) % testimonials.length], testimonials[(page + 2) % testimonials.length]];
  return <section className={styles.testimonials}><div className={styles.testimonialHeading} data-dash-reveal="short"><div><SectionEyebrow>Testimonials</SectionEyebrow><h2>Trusted by Ambitious<br />Brands Worldwide.</h2></div><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div className={styles.testimonialGrid}>{visible.map((item, index) => <article key={`${page}-${item.name}`}><div className={styles.testimonialMeta}><img alt="" src={dashfluenceAssets.people[(page + index) % dashfluenceAssets.people.length]} /><div><strong>{item.name}</strong><span>{item.role}</span></div></div><p>“{item.quote}”</p><small>Dashfluence</small></article>)}</div><div className={styles.dots}>{testimonials.map((item, index) => <button aria-label={`Show testimonial page ${index + 1}`} aria-pressed={page === index} className={page === index ? styles.dotActive : ""} key={item.name} onClick={() => setPage(index)} type="button" />)}</div></section>;
}

export function DashfluenceFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className={styles.faq}><div className={styles.faqIntro} data-dash-reveal="left"><SectionEyebrow>FAQ</SectionEyebrow><h2>Got Questions?<br />We’ve Got Answers.</h2><p>Here are some of the most common queries to help you get started.</p><DashButton href={`${DASHFLUENCE_BASE}/contact-us`}>Contact us</DashButton></div><div className={styles.faqList}>{faqItems.map(([question, answer], index) => { const isOpen = open === index; const panelId = `dashfluence-home-faq-panel-${index}`; const triggerId = `dashfluence-home-faq-trigger-${index}`; return <article className={isOpen ? styles.faqOpen : ""} key={question}><button aria-controls={panelId} aria-expanded={isOpen} id={triggerId} onClick={() => setOpen((current) => current === index ? null : index)} type="button"><span>{question}</span><span aria-hidden="true">{isOpen ? "−" : "+"}</span></button><div aria-hidden={!isOpen} aria-labelledby={triggerId} id={panelId} role="region"><p>{answer}</p></div></article>; })}</div></section>;
}

export function DashfluenceBlogStrip() {
  const posts = [{ slug: "seo-in-2025-what-still-works", date: "Oct 10, 2024", title: "SEO in 2025: What Still Works", copy: "Visual identity and packaging design for industry." }, { slug: "how-to-create-scroll-stopping-ads", date: "Aug 8, 2024", title: "How to Create Scroll-Stopping Ads", copy: "Created wireframes to define layout structure" }];
  return <section className={styles.blogStrip}><div className={styles.blogHeading} data-dash-reveal="rise"><div><SectionEyebrow>Blogs</SectionEyebrow><h2>Smart Marketing Tips,<br />Fresh Weekly</h2></div><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div className={styles.blogGrid}>{posts.map((post, index) => <Link href={`${DASHFLUENCE_BASE}/blog/${post.slug}`} key={post.slug}><div><img alt={post.title} src={dashfluenceAssets.blogs[index]} /></div><time>{post.date}</time><h3>{post.title}</h3><p>{post.copy}</p><span>READ FULL BLOG</span></Link>)}</div></section>;
}

export function DashfluenceHome() {
  return <div className={styles.page}><Hero /><BrandMarquee /><AboutSection /><ProcessSection /><ServicesSection /><WorkSection /><MetricsSection /><GrowthBanner /><PricingSection /><TestimonialsSection /><DashfluenceFaq /><DashfluenceBlogStrip /></div>;
}
