"use client";

import Link from "next/link";
import { useState } from "react";
import { asset, B2_PREFIX, caseStudies } from "@/lib/site-data";
import content from "./content.json";
import styles from "./CaseStudies.module.css";
import { CaseStudyMotion } from "./CaseStudyMotion";

const cardImages = ["KZBATV7TBPgBxGgzaAjj79STA8.jpg", "SDF44TiCtWyHIceLhE0MsUGlSps.jpg", "ULil3BuLizq2aHXRU0MIGjYytw.jpg", "6nUWPfdYFAEdILhPEC63OrDv3M.jpg", "FF5DMh4EujpnKa6pWWJBit5lQ.jpg", "KP9PyMqg9eNce5kcqgyZdrzGus.jpg", "H0hRoAnIkQv54FIiHMwpBrGr2bM.jpg"];
const logos = ["OeS5x9D923NiahSYKN9hxk4Suro.svg", "2YZnNW7BCWQWAN6pAEpTgy0410.svg", "KKl7D5KyqYO8OIic0B8moR7GpE.svg", "5nrbaFlN2ej82Yl2b67RMPBpjA.svg", "BTgcWmDsTlepQdIb7uADmS9PKs.svg", "sbqFrNnjBcJmLYn7HwM461w3vI.svg", "sbqFrNnjBcJmLYn7HwM461w3vI.svg"];

export function CaseStudyCard({ index }: { index: number }) {
  const study = caseStudies[index];
  const record = content.find((item) => item.slug === study.slug)!;
  return <Link className={styles.card} href={`${B2_PREFIX}/case-study/${study.slug}`}>
    <div className={styles.cardMedia}>
      <img className={styles.cardImage} alt="" src={asset(cardImages[index])} />
      <img className={styles.clientLogo} alt={record.client} src={asset(logos[index])} />
    </div>
    <div className={styles.cardContent}>
      <div className={styles.cardTitle}><span className={styles.category}>{record.category}</span><h2>{study.title}</h2></div>
      <div className={styles.cardResult}><strong>{record.results[1][0]}</strong><span>{record.results[1][1]}</span></div>
    </div>
  </Link>;
}

export function CaseStudyListing() {
  const [expanded, setExpanded] = useState(false);
  return <CaseStudyMotion>
    <section className={styles.listHero}><h1>Our case study</h1></section>
    <section className={styles.listing} aria-label="Case studies">
      <div className={styles.grid}>{caseStudies.slice(0, expanded ? 7 : 4).map((study, index) => <CaseStudyCard index={index} key={study.slug} />)}</div>
      <div className={styles.loadMore}><button disabled={expanded} onClick={() => setExpanded(true)} type="button">{expanded ? "That’s everything for now!" : "Load More"}</button></div>
    </section>
  </CaseStudyMotion>;
}

export function RelatedCaseStudies() {
  return <section className={styles.related}>
    <div className={styles.relatedTitle}><h2>Other case studies</h2><Link href={`${B2_PREFIX}/case-study`}>See all case studies <span aria-hidden="true">↗</span></Link></div>
    <div className={styles.grid}><CaseStudyCard index={0} /><CaseStudyCard index={1} /></div>
  </section>;
}
