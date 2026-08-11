"use client";

import type * as React from "react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { DashfluenceBlogStrip, DashfluenceFaq } from "../home/DashfluenceHome";
import { dashfluenceAsset, dashfluenceAssets } from "../shared/assets";
import { DashButton, SectionEyebrow } from "../shared/DashfluenceShell";
import { DASHFLUENCE_BASE } from "../shared/routes";
import styles from "./DashfluenceStaticPages.module.css";

export function StaticHero({ description, eyebrow, title }: { description?: string; eyebrow?: string; title: string }) {
  return <section className={styles.staticHero}><div data-dash-reveal="short">{eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}<h1>{title}</h1>{description ? <p>{description}</p> : null}</div></section>;
}

const aboutHeroImages = [
  "3FSm1UsyvoU6bvz9rEyOZt9o.png",
  "0k1GSXIlIx6YlTW3PaXsXO9OEWE.png",
  "QXOnuUUDyjBj6D9gMSxdryrCxA.png",
].map(dashfluenceAsset);

const team = [
  ["Logan Pierce", "Founder & Creative Director", "MSNUFXhp8jkDCIgiGwmKt5VO1fQ.png"],
  ["Avery Kim", "Head of Performance", "VBH4OwuOOulPINXYWY3jojPU9o.png"],
  ["Rhae Thomas", "Growth Strategist", "81YbcWnRyp3uBRR0JYwULXDUGI.png"],
  ["Jordan Malik", "Content Lead", "WayGLVvuhV4FamgL6bWpSW4AB8.png"],
] as const;

export function AboutPage() {
  return <div className={styles.page}><section className={styles.aboutHero}><div className={styles.aboutHeroHeading} data-dash-reveal="short"><SectionEyebrow>About</SectionEyebrow><h1>Our Company</h1><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div className={styles.aboutHeroImages}>{aboutHeroImages.map((image, index) => <img alt="Dashfluence team and creative studio" data-dash-reveal="rise" key={image} src={image} style={{ "--dash-delay": `${index * 80}ms` } as React.CSSProperties} />)}</div></section><section className={styles.story}><SectionEyebrow>Our Story</SectionEyebrow><h2 data-dash-reveal="rise">At Dashfluence, we believe digital marketing isn’t just about ads and algorithms. It’s about creating momentum that moves businesses forward.</h2><p>Founded in 2025 by a team of marketers, designers, and strategists, we set out to help ambitious brands cut through the noise with a blend of performance-driven strategy and bold, scroll-stopping creative.</p></section><LogoStrip /><section className={styles.values}><div className={styles.splitHeading} data-dash-reveal="rise"><div><SectionEyebrow>Core Values</SectionEyebrow><h2>Our Core Values<br />That Fuel Us</h2></div><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div className={styles.valueGrid}>{[["01","Data First, Always","Through strategy calls and audits, we uncover what’s working, what is missing, and where the biggest opportunities lie."],["02","Creative Impact","We craft campaigns that don’t just look good but leave a lasting impression."],["03","Trust & Partnership","We don’t see clients as transactions. We see them as partners built on transparency and reliability."]].map(([number,title,copy]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section><Achievements /><section className={styles.team}><div className={styles.splitHeading}><div><SectionEyebrow>Our Team</SectionEyebrow><h2>Meet the minds<br />behind the momentum</h2></div><p>Strategists, creatives, and growth specialists working as one team for every channel.</p></div><div className={styles.teamGrid}>{team.map(([name,role,image]) => <article data-dash-reveal="rise" key={name}><img alt={name} src={dashfluenceAsset(image)} /><h3>{name}</h3><p>{role}</p></article>)}</div></section><DashfluenceBlogStrip /></div>;
}

function LogoStrip() {
  return <section className={styles.logoStrip}>{dashfluenceAssets.brandLogos.map((logo) => <img alt="Partner brand" key={logo} src={logo} />)}</section>;
}

function Achievements() {
  const achievements = [
    ["Best Social Media Campaign 2024", "Awarded for delivering a viral multi-platform campaign that generated over 10M impressions in under 3 weeks."],
    ["Top Digital Marketing Agency Award 2023", "Recognized for consistent client success, innovation in marketing strategies, and outstanding ROI performance."],
    ["Creative Excellence Award 2024", "Honored for producing unique, high-quality visuals and storytelling that elevated brand presence globally."],
    ["150+", "Projects delivered across performance, brand, and organic growth."],
  ];
  return <section className={styles.achievements}><div className={styles.splitHeading}><div><SectionEyebrow tone="light">Achievements</SectionEyebrow><h2>Our Achievements<br />&amp; Awards</h2></div><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div className={styles.achievementGrid}>{achievements.map(([title,copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>;
}

const plans = [
  ["Starter Boost", "Small businesses and startups just beginning their digital marketing journey.", "799", ["Social media management for 2 platforms", "8 custom posts per month", "Basic ad campaign setup", "Monthly performance report", "Email support"]],
  ["Growth Accelerator", "Growing businesses ready to scale high-impact marketing campaigns.", "1,499", ["Social media management for 4 platforms", "Advanced ad optimization", "Influencer outreach", "Monthly strategy call", "Priority chat support"]],
  ["Market Dominator", "Brands aiming to dominate their market with aggressive marketing campaigns.", "2,999", ["Management for 6+ platforms", "Photo and video content", "Dedicated account manager", "Weekly performance reviews", "24/7 priority support"]],
] as const;

const annualPlanPrices = ["559", "1,049", "2,099"] as const;

export function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const annual = billing === "annual";
  return <div className={styles.page}><section className={styles.pricingTop}><div className={styles.pricingIntro} data-dash-reveal="short"><h1>Flexible plans for every need</h1><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p><div className={styles.billingToggle}><button aria-checked={annual} aria-label="Use annual billing" onClick={() => setBilling((value) => value === "monthly" ? "annual" : "monthly")} role="switch" type="button"><span className={!annual ? styles.billingActive : ""}>Monthly</span><span aria-hidden="true" className={styles.billingTrack}><span /></span><span className={annual ? styles.billingActive : ""}>Annual</span></button><span>Save 30%</span></div></div><div className={styles.planGrid}>{plans.map(([title,copy,price,features], index) => <article className={index === 1 ? styles.planFeatured : ""} key={title}><h2>{title}</h2><p>{copy}</p><div aria-live="polite" className={styles.planPrice}><sup>$</sup><strong>{annual ? annualPlanPrices[index] : price}</strong><span>/month{annual ? <small>billed annually</small> : null}</span></div><h3>What’s included:</h3><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul><DashButton href={`${DASHFLUENCE_BASE}/contact-us`}>Get Started Today</DashButton></article>)}</div></section><StaticMetrics /><section className={styles.benefits}><div className={styles.splitHeading}><div><SectionEyebrow>Benefits</SectionEyebrow><h2>Unlock the Full Potential<br />of Your Marketing</h2></div><p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p></div><div className={styles.benefitGrid}>{[["Tailored Strategies for Maximum Impact","Every business is unique, and so is our approach. We create fully customized marketing strategies."],["End-to-End Campaign Management System","We handle everything from strategy and content to execution, optimization, and reporting."],["Data-Driven Insights & Transparent Reporting","Our strategies are backed by real-time analytics and clear reports, so you always know what is working."]].map(([title,copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section><DashfluenceBlogStrip /></div>;
}

function StaticMetrics() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => { const node=ref.current; if(!node) return; const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setOn(true);observer.disconnect();}},{threshold:.3}); observer.observe(node); return()=>observer.disconnect(); },[]);
  return <section className={styles.staticMetrics} ref={ref}><div><SectionEyebrow>Key Metrics</SectionEyebrow><h2>Behind every campaign we launch is a strategy rooted in results.</h2></div><div className={styles.staticMetricCards}><article><strong>{on ? "$3.2M+" : "$0.0M+"}</strong><p>Ad Spend Managed</p></article><article><strong>{on ? "5.4x" : "0.0x"}</strong><p>Average ROAS</p></article><article><strong>{on ? "120+" : "0+"}</strong><p>Campaigns Launched</p></article></div></section>;
}

const reviewQuotes = [
  ["Dashfluence didn’t just improve our ads, they rebuilt the way we approach growth.", "Jamie R.", "Head of Marketing"],
  ["We went from page 4 to ranking top 3 for multiple keywords in just two months.", "Noah", "Digital Marketing"],
  ["Their creative team just gets it. Every ad feels like it was made by someone who lives inside our brand.", "Oliver", "Brand Strategy"],
  ["It wasn’t just about better ads with Dashfluence. They redefined our growth approach.", "Henry", "Content Marketing"],
  ["Our ads improved, but more importantly, Dashfluence rebuilt our whole growth playbook.", "Mateo", "Product Marketing"],
  ["We skyrocketed from page 4 to top 3 rankings on several keywords in under two months.", "Elijah", "Marketing Analytics"],
  ["Dashfluence rebuilt the way we approach growth.", "Lucas", "Growth Marketing"],
  ["We leapt from page 4 to the top 3 across several keywords in just weeks.", "William", "Email Marketing"],
  ["Within two months our rankings shot from page 4 to top 3 on multiple keywords.", "Levi", "Paid Media"],
  ["It took us two months to climb from page 4 to top 3 positions for key searches.", "Ezra", "Learning Marketing"],
  ["We surged from page 4 to the top 3 for several keywords, all in record time.", "Jack", "Social Media Manager"],
  ["In under two months, our site rocketed from page 4 to top 3 search rankings.", "John", "Marketing Coordinator"],
  ["Our keyword rankings skyrocketed from page 4 to top 3 in less than two months.", "Luca", "SEO Specialist"],
  ["Two months was all it took to go from page 4 to dominating top 3 spots.", "David", "PPC Specialist"],
  ["Within two months, we moved from page 4 to dominating top 3 keyword spots.", "Weston", "Google Analytics"],
] as const;

export function ReviewsPage() {
  return <div className={styles.page}><StaticHero description="Dashfluence helps brands turn clicks into customers through data-backed marketing built for today." title="What our clients say" /><section className={styles.reviewGrid}>{reviewQuotes.map(([quote,name,role], index) => <article data-dash-reveal="rise" key={name}><div className={styles.reviewTop}><img alt="" src={dashfluenceAssets.people[index % dashfluenceAssets.people.length]} /><span>✦</span></div><blockquote>“{quote}”</blockquote><div><strong>{name}</strong><span>{role}</span></div></article>)}</section><DashfluenceBlogStrip /></div>;
}

export function ContactPage() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; setStatus("Details validated locally. No information was sent."); }
  return <div className={styles.page}><StaticHero description="Dashfluence helps brands turn clicks into customers through data-backed marketing built for today." title="Get in touch with our team" /><section className={styles.contact} id="contact-form"><article className={styles.contactCard}><h2>Let’s Talk About Growing Your Business</h2><p>Whether you’re ready to launch a new project or just want to explore ideas, our team is here to listen, guide, and deliver results.</p><dl><div><dt>📍 Office Address</dt><dd>Dashfluence HQ<br />1250 Market Street, Suite 500<br />San Francisco, CA 94103</dd></div><div><dt>📞 Phone</dt><dd><a href="tel:+14155559823">+1 (415) 555-9823</a><br /><a href="tel:+14154765346">+1 (415) 476-5346</a></dd></div><div><dt>📧 Email</dt><dd><a href="mailto:hello@dashfluence.com">hello@dashfluence.com</a></dd></div></dl></article><form className={styles.contactForm} onInput={() => setStatus("")} onSubmit={submit}><label>First name<input name="firstName" required /></label><label>Last name<input name="lastName" required /></label><label>Email<input name="email" required type="email" /></label><label>Company Name<input name="company" required /></label><label>Phone<input name="phone" required type="tel" /></label><label>Budget<select name="budget" required defaultValue=""><option disabled value="">Select budget</option><option>$2k - $5k</option><option>$5k - $10k</option><option>$10k+</option></select></label><label className={styles.message}>Message<textarea name="message" rows={5} /></label><button type="submit">Send message <span>↗</span></button><p aria-live="polite" role="status">{status}</p></form></section><DashfluenceFaq /></div>;
}

export function NotFoundPage() {
  return <section className={styles.notFound}><img alt="An abstract missing-page illustration" src={dashfluenceAsset("hVa5QawLLrsIC8m613jNVlXmxU.svg")} /><h1>Oops! This page doesn’t exist</h1><p>The page you’re looking for has wandered off.</p><DashButton href={DASHFLUENCE_BASE}>Go to homepage</DashButton></section>;
}
