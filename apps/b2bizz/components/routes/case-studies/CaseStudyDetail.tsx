import Link from "next/link";
import { asset, B2_PREFIX } from "@/lib/site-data";
import content from "./content.json";
import { RelatedCaseStudies } from "./CaseStudies";
import { CaseStudyMedia } from "./CaseStudyMedia";
import { CaseStudyMotion } from "./CaseStudyMotion";
import styles from "./CaseStudies.module.css";

export const caseStudyContent = content;

function Copy({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs[0] && <p>{paragraphs[0]}</p>}{paragraphs.length > 1 && <ul>{paragraphs.slice(1).map((paragraph) => <li key={paragraph}>{paragraph}</li>)}</ul>}</>;
}

export function CaseStudyDetail({ study }: { study: (typeof content)[number] }) {
  const facts = [["Client:", study.client], ["Industry:", study.industry], ["Region:", study.region], ["Duration:", study.duration], ["Budget:", study.budget]];
  return <CaseStudyMotion>
    <section className={styles.detailHero}>
      <div className={styles.detailHeroInner}>
        <div className={styles.detailTitle}><span className={styles.category}>{study.category}</span><h1>{study.title}</h1></div>
        <img className={styles.banner} alt="Case Study Image" src={asset(study.images[0])} />
        <dl className={styles.facts}>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
    </section>
    <article className={styles.article}>
      <div className={styles.overview}>{study.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <div className={styles.imagePair}>{study.images.slice(1, 3).map((image) => <CaseStudyMedia alt="Overview Image" image={image} key={image} />)}</div>
      <section><h2>Our approach</h2><Copy paragraphs={study.approach} /></section>
      <section><h2>The challenge</h2><Copy paragraphs={study.challenge} /><img className={styles.challengeImage} alt="Challenges Image" src={asset(study.images[3])} loading="lazy" /></section>
      <section><h2>The solution</h2><Copy paragraphs={study.solution} /></section>
      <div className={styles.imagePair}>{study.images.slice(4, 6).map((image) => <CaseStudyMedia alt="Solution Image" image={image} key={image} />)}</div>
      <section><h2>Measurable results</h2><div className={styles.results}>{study.results.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
      <figure className={styles.testimonial}><blockquote>{study.quote}</blockquote><figcaption><img alt="" src={asset(study.images[6])} loading="lazy" /><span>{study.person} <span>{study.role}</span></span></figcaption></figure>
    </article>
    <RelatedCaseStudies />
    <section className={styles.cta}><h2>Want to join a growing list of forward-thinking companies?</h2><Link href={`${B2_PREFIX}/contact`}>Schedule a consultation <span aria-hidden="true">↗</span></Link><div className={styles.awards}>{["Clutch global award", "Forbes business awards", "CXO global awards", "Fastest B2B service provider"].map((award) => <div key={award}><img alt="" src={asset("Gx6UBmzydtzvFxaR6nNq8iTZoXs.svg")} /><span>{award}</span><img alt="" src={asset("NTvSIOmgsP6rrvHPAQBQW9y1vA.svg")} /></div>)}</div></section>
  </CaseStudyMotion>;
}
