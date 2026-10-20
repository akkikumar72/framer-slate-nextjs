"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { B2_PREFIX, asset } from "@/lib/site-data";
import styles from "./StaticPages.module.css";
import { StaticMotion } from "./StaticMotion";

const principles = [
  ["Integrity first", "We operate with honesty and transparency."],
  ["Client-Centric", "Your success is our priority."],
  ["Strategic thinking", "Every decision is backed by data and insights."],
  ["Collaboration", "We believe in working together, not just consulting."],
  ["Innovation", "We challenge norms to find smarter solutions."],
] as const;
const team = [
  ["John Carter", "Managing Director", "1b3nodcFE17MeyegY5o26I9LyYM.jpg"],
  ["Nina Kapoor", "Financial Consultant", "0p855vpPz8c7b7WQK3Dq2rc1ClY.jpg"],
  ["Alicia Morgan", "Managing Director", "ogZA5dIiG4ZzekqaoVHevvJ71c.jpg"],
  ["Liam Cheng", "Lead Business Analyst", "kuEeMf5nQnQzXhIhjcw1KVHtJY.jpg"],
] as const;
const logos = ["OeS5x9D923NiahSYKN9hxk4Suro.svg", "2YZnNW7BCWQWAN6pAEpTgy0410.svg", "KKl7D5KyqYO8OIic0B8moR7GpE.svg", "5nrbaFlN2ej82Yl2b67RMPBpjA.svg", "sbqFrNnjBcJmLYn7HwM461w3vI.svg"];
const reviews = [
  ["Their professionalism, speed, and communication made a huge difference. We finally have a partner who understands our business.", "Priya M", "CEO", "d4bOSjZzklRnk0Y8ssGiLJlIO0.jpg"],
  ["The team brought clarity to a complex integration challenge and delivered beyond expectations.", "Sonia K", "Head of Product", "GEa5AaG3m0spY7fftLUtH9VOzI.jpg"],
  ["The team brought clarity to a complex integration challenge and delivered beyond expectations.", "Mark D", "B2B Logistics Company", "N8xp5eiZVkdKgKCiK4a5rkQI.jpg"],
  ["We saw a 3.5x increase in qualified leads in just 6 months. They don’t just deliver solutions they deliver results.", "Daniel R", "Director of Marketing", "eGjNeYGnzh6PxwjZw2sLNTa0No.jpg"],
] as const;

export function AboutPage() {
  const [vision, setVision] = useState(0);
  const [playing, setPlaying] = useState(true);
  const testimonialVideo = useRef<HTMLVideoElement>(null);
  return <main className={styles.page}>
    <StaticMotion/>
    <section className={styles.aboutHero}>
      <div className={styles.aboutIntro}><h1>Get to know B2bizz B2B consulting</h1><p>We’re your long-term growth partners. Discover who we are and how we help B2B companies unlock their full potential.</p><Link className={styles.solidButton} href={`${B2_PREFIX}/service`}>Explore our services</Link></div>
      <div className={styles.aboutCollage}><div><img alt="Hero background" src={asset("qyFALiDAT11qq2R9yTbABUg1qo.jpg")}/><img alt="B2B cybersecurity firm project overview" src={asset("j1u7mOstGtDSOqkHWRDDUZrUo4.png")}/></div><img alt="Consultants discussing a strategy" src={asset("lxIpRAPB2GyzWXqCsmI4Lt1Bu4.jpg")}/><img alt="Abstract pastel sculpture" src={asset("d512t4V6VrGb1hhvxUjbODGCXCk.jpg")}/></div>
      <div className={styles.expertise}><p>Expertise across key sectors</p><p>Healthcare&nbsp;&nbsp; / &nbsp;&nbsp;Financial services&nbsp;&nbsp; / &nbsp;&nbsp;Technology&nbsp;&nbsp; / &nbsp;&nbsp;Manufacturing&nbsp;&nbsp; / &nbsp;&nbsp;Logistics&nbsp;&nbsp; / &nbsp;&nbsp;Retail</p></div>
    </section>

    <section className={styles.strategy}><h2>We are a strategy-first B2B consulting firm dedicated to helping businesses solve complex challenges and accelerate their growth. With a team of experienced consultants, data analysts, and industry specialists, we blend strategic insight with hands-on execution to deliver measurable results. Our approach is simple we listen, we analyze, and we act.</h2><div className={styles.strategyGrid}><video autoPlay loop muted playsInline aria-label="Abstract strategy animation" poster={asset("rXXqURyPvaQVkVvDsgRUf27I82E.jpg")} src={asset("djS5rLAO144J7VVnpdgKBf8yT4o.mp4")}/><div className={styles.stats}>{[["4X", "Average ROI achieved"], ["5+", "Countries served globally"], ["300%", "Increase in organic traffic"]].map(([value, label]) => <div key={value}><h3>{value}</h3><p>{label}</p></div>)}<Link className={styles.inlineCta} href={`${B2_PREFIX}/contact`}><img alt="" src={asset("vd0WPmgaACCN9pheNqDeUiY6ZX4.svg")}/><span><h3>It’s time to rethink your B2B strategy</h3><p>Schedule a free consultation</p></span><img alt="" src={asset("MhAEp2N1wwDuRfYGNfI0npA9N8.svg")}/></Link></div></div></section>

    <section className={styles.principles}><div className={styles.sectionIntro}><h2>Principles that shape our strategy</h2><p>At the heart of our consulting practice lies a set of core values that guide how we think, work, and lead.</p></div><div>{principles.map(([title, copy]) => <article key={title}><h3><span aria-hidden="true"/>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className={styles.vision}><img alt="Vision abstract artwork" src={asset("ssle2Ob2kE3q97SLsLFaNwznQ.jpg")}/><div>{["Our vision", "Our mission"].map((title, index) => <article key={title}><button type="button" aria-expanded={vision === index} aria-controls={`about-purpose-${index}`} onClick={() => setVision(index)}><img alt="" src={asset(index === 0 ? "toyCuDHAxxxvNK12bvDF2trUQZU.svg" : "jRbmhhgXe9FyIivdFRX2C963uI.svg")}/><h2>{title}</h2><span aria-hidden="true">{vision === index ? "−" : "+"}</span></button><div id={`about-purpose-${index}`} hidden={vision !== index} className={styles.visionBody}>{index === 0 ? <><p>Electrical service costs vary depending on the job&apos;s complexity, your location, and the electrician’s experience.</p><ul>{["Global partnerships", "Strategic execution", "Digital leadership", "Client empowerment", "People-First culture"].map(item => <li key={item}>{item}</li>)}</ul></> : <><p>Our mission is to become a trusted growth partner for every B2B organization we work with. We do this by aligning deep industry expertise with innovative thinking and actionable roadmaps that move businesses forward.</p><p>Whether it&apos;s entering new markets, optimizing operations, or accelerating lead generation, our goal is always the same: create results that matter.</p></>}</div></article>)}</div></section>

    <section className={styles.clientBand}><p>Trusted by Fast-Moving B2B Teams</p><div><div>{[...logos, ...logos].map((src, index) => <img key={index} alt={index < logos.length ? "Client logo" : ""} aria-hidden={index >= logos.length} src={asset(src)}/>)}</div></div></section>

    <section className={styles.aboutTestimonials} aria-label="Client testimonials"><div>{reviews.map(([quote, name, role, avatar], index) => <article className={`${index % 2 ? styles.reviewFlip : ""} ${index === 2 ? styles.testimonialMedia : ""}`} key={name}>{index === 2 && <img alt="" src={asset("ou4oWL8RwosFygJ5hi7sUUHGb8Q.jpg")}/>}<blockquote>{quote}</blockquote><div><img alt={name} src={asset(avatar)}/><span>{name}<small>{role}</small></span></div></article>)}<div className={styles.testimonialVideo}><video ref={testimonialVideo} autoPlay loop muted playsInline poster={asset("9IcW1gTD6WLzrQYKHvjCx3HXXw.jpg")} src={asset("6r8mvZaxvdCl2VWcsVJuiMR57o.mp4")}/><button type="button" aria-label={playing ? "Pause testimonial video" : "Play testimonial video"} onClick={() => { if (playing) testimonialVideo.current?.pause(); else void testimonialVideo.current?.play(); setPlaying(!playing); }}>{playing ? "Ⅱ" : "▶"}</button></div></div></section>

    <section className={styles.team} id="team"><h2>Meet the talent behind the transformation</h2><div>{team.map(([name, role, image]) => <article key={name}><img alt={name} src={asset(image)}/><div><h3>{name}</h3><p>{role}</p><div className={styles.socials}>{[["Facebook", "https://www.facebook.com/", "vNI25VqTEOiglaWkaLdoLwpori8.svg"], ["YouTube", "https://www.youtube.com/", "Hxh8VdM4hDeSwdX8yKTStA4ypM.svg"], ["LinkedIn", "https://www.linkedin.com/", "wsV6nF8mTUUHsqKjv3gYGulKhck.svg"]].map(([label, href, icon]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${name} on ${label}`}><img alt="" src={asset(icon)}/></a>)}</div></div></article>)}</div></section>

    <section className={styles.awardsCta}><h2>Want to join a growing list of forward-thinking companies?</h2><Link href={`${B2_PREFIX}/contact`}>Schedule a consultation</Link><div>{["Clutch global award", "Forbes business awards", "CXO global awards", "Fastest B2B service provider"].map(label => <div key={label}><img alt="" src={asset("Gx6UBmzydtzvFxaR6nNq8iTZoXs.svg")}/><p>{label}</p><img alt="" src={asset("NTvSIOmgsP6rrvHPAQBQW9y1vA.svg")}/></div>)}</div></section>
  </main>;
}
