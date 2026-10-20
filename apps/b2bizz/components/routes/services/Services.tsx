"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { asset, B2_PREFIX, services } from "@/lib/site-data";
import { ConsultationCta } from "@/components/shared/ConsultationCta";
import { faqs, serviceContent, type ServiceSlug } from "./service-content";
import styles from "./Services.module.css";

function useServiceReveals(routeKey: string) {
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      main.current?.querySelectorAll("video").forEach((video) => video.pause());
      return;
    }
    const elements = main.current?.querySelectorAll(`.${styles.card}, .${styles.stat}, .${styles.indexQuote}, .${styles.faq}, .${styles.benefit}, .${styles.pricing}, .${styles.videoQuote}`);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("data-revealed", "true");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.05 });
    elements?.forEach((element) => {
      element.setAttribute("data-revealed", "false");
      observer.observe(element);
    });
    const mediaObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }), { threshold: 0.05 });
    main.current?.querySelectorAll("video").forEach((video) => mediaObserver.observe(video));
    return () => { observer.disconnect(); mediaObserver.disconnect(); };
  }, [routeKey]);
  return main;
}

function ServiceCards({ items = services, dark = false }: { items?: readonly (typeof services)[number][]; dark?: boolean }) {
  return <div className={styles.cards}>{items.map((service) => <Link className={`${styles.card} ${dark ? styles.darkCard : ""}`} href={`${B2_PREFIX}/service/${service.slug}`} key={service.slug}>
    <div className={styles.cardMedia}><img alt="Service Image" src={asset(service.image)} /></div>
    <div className={styles.cardInfo}><h2>{service.title}</h2><p>{service.summary}</p><div className={styles.tags}>{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
  </Link>)}</div>;
}

export function ServiceIndex() {
  const main = useServiceReveals("index");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const statistics = [
    ["4X", "Average ROI on digital strategy projects", "yxFAET3M9RHNyUQ7EAiOicUA2c.svg"],
    ["5", "Countries served with B2B services", "faFEiVDIGpShRVZGYWZxmizgQ.svg"],
    ["100%", "Project success rate across all engagements", "Qmp1HQeLB3bhe86l6p6cXmKx8.svg"],
    ["20+", "Successful B2B projects delivered", "m7HT3SunkeIWyEbDn6XVPojvTA.svg"],
  ];
  return <main className={styles.main} ref={main}>
    <section className={styles.indexHero}>
      <div className={styles.indexIntro}><h1>Our services</h1><p>Crafted digital solutions that drive results. Explore our full suite of services designed to elevate your brand and grow your business.</p></div>
      <ServiceCards />
    </section>
    <section className={`${styles.container} ${styles.statistics}`} aria-label="Our impact">
      <div className={styles.statGrid}>{statistics.map(([value, description, image]) => <div className={styles.stat} key={value}><h2>{value}</h2><p>{description}</p><img alt="Statistics Icon" src={asset(image!)} /></div>)}</div>
      <p className={styles.statCaption}>Our numbers aren’t just data points &mdash; they represent meaningful transformations, real client wins, and the measurable difference we bring to B2B businesses worldwide.</p>
    </section>
    <section className={`${styles.container} ${styles.indexTestimonial}`} aria-label="Client testimonial">
      <div className={styles.indexQuote}><img className={styles.quoteBackground} alt="CTA BG" src={asset("XwCo50BibsVkSjbmawMbcrbww.jpg")} /><img className={styles.quoteAvatar} alt="Avatar" src={asset("pfX9Sn5qRme6iCFMisneY4YIt7I.jpg")} /><div><h2>Working with B2bizz was a game-changer for our B2B strategy. Their team didn’t just offer advice &mdash; they became an extension of our leadership. Their insights, professionalism, and tailored approach helped us unlock new growth and streamline our operations.</h2><p>Orion Blake, <span>COO</span></p></div></div>
    </section>
    <section className={`${styles.container} ${styles.faq}`}>
      <h2>Frequently asked questions</h2>
      <div className={styles.faqColumns}><div className={styles.faqList}>{faqs.map(([question, answer], index) => <div className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ""}`} key={question}>
        <button aria-expanded={openFaq === index} aria-controls={`service-faq-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{String(index + 1).padStart(2, "0")}.</span><span>{question}</span><span className={styles.faqSymbol} aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button>
        <div className={styles.faqAnswer} id={`service-faq-${index}`} hidden={openFaq !== index}><p>{answer}</p></div>
      </div>)}</div><img className={styles.faqImage} alt="FAQ Image" src={asset("g6qy1PW2Ru5mqtOiE8nYKDXaNA.jpg")} /></div>
    </section>
  </main>;
}

const plans = [
  { name: "Starter", monthly: 1500, yearly: 1050, description: "Perfect for early-stage teams or small B2B companies.", features: ["Strategy sessions (2x/month)", "Competitive landscape analysis", "Ideal customer profile (ICP) development", "1 sales funnel review or optimization"] },
  { name: "Growth", monthly: 3500, yearly: 2450, description: "Designed for scaling B2B teams focused on lead generation.", features: ["Weekly consulting sessions", "GTM & sales process alignment", "CRM optimization and reporting", "Lead generation roadmap", "Priority support"] },
  { name: "Enterprise", monthly: 5500, yearly: 3850, description: "Consulting for mature B2B operations or multi-region teams.", features: ["Dedicated strategy consultant", "Quarterly growth audits & roadmap", "Team training and onboarding", "Full-stack MarTech evaluation", "On-call support and quarterly workshops"] },
];

function Pricing() {
  const [yearly, setYearly] = useState(false);
  return <section className={`${styles.narrowContainer} ${styles.pricing}`}>
    <h2>The right consulting plan for your business</h2>
    <div className={styles.billing} aria-label="Billing period"><button aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button><button aria-pressed={yearly} onClick={() => setYearly(true)}><span>Yearly</span><span className={styles.saving}>Save up to 30%</span></button></div>
    <div className={styles.planGrid}>{plans.map((plan) => <article className={styles.plan} key={plan.name}><div className={styles.planTop}><div><div className={styles.planName}><img alt="Pricing Icon" src={asset("igWV64CbhQMJ3He1oqptt5Yntdc.svg")} />{plan.name}</div><div className={styles.price}><h3>${(yearly ? plan.yearly : plan.monthly).toLocaleString("en-US")}</h3><span>/month</span></div><p>{plan.description}</p></div><Link className={styles.button} href={`${B2_PREFIX}/contact`}>{plan.name === "Growth" ? "Start growing" : "Get started"}</Link></div><ul className={styles.features}>{plan.features.map((feature) => <li key={feature}><span aria-hidden="true">•</span>{feature}</li>)}</ul></article>)}</div>
  </section>;
}

export function ServiceDetail({ slug }: { slug: ServiceSlug }) {
  const main = useServiceReveals(slug);
  const service = services.find((item) => item.slug === slug)!;
  const content = serviceContent[slug];
  return <main className={styles.main} ref={main}>
    <section className={styles.detailHero}><div><h1>{service.title}</h1><p>{service.summary}</p><Link className={styles.button} href={`${B2_PREFIX}/contact`}>Get started</Link></div><img alt="Service Image" src={asset(service.image)} /></section>
    <section className={`${styles.container} ${styles.benefit}`}><img alt="Service Image" src={asset(content.image)} /><div><h2>{content.heading}</h2><p>{content.description}</p><ul>{content.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul><Link className={styles.button} href={`${B2_PREFIX}/contact`}>Get started</Link></div></section>
    <Pricing />
    <section className={`${styles.narrowContainer} ${styles.detailTestimonial}`} aria-label="Client testimonial"><div className={styles.videoQuote}><video muted loop playsInline preload="metadata" poster={asset("ordOGswzKLaKo1MGYAelJ2rcV7U.jpg")} src={asset("gnZmvi7YcTwXytQiLW23gV4vlk.mp4")} aria-hidden="true" /><blockquote>{content.quote}</blockquote><div className={styles.quotePerson}><img alt="Avatar" src={asset(content.avatar)} /><div><p>{content.name}</p><span>{content.role}</span></div></div></div></section>
    <section className={`${styles.container} ${styles.related}`}><div className={styles.sectionHeading}><h2>Other services</h2><Link className={styles.button} href={`${B2_PREFIX}/service`}>Explore all services</Link></div><ServiceCards dark items={services.filter((item) => item.slug !== slug).slice(0, 3)} /></section>
    <ConsultationCta />
  </main>;
}
