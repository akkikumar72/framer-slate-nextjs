import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { Icon } from "@/components/icons";
import { Ticker } from "@/components/ticker";
import { Reveal } from "@/components/reveal";
import { asset } from "@/lib/assets";
import testimonials from "@/lib/testimonials.json";
import styles from "./home.module.css";
export const metadata: Metadata = { title: "Roco Portfolio Template", alternates: { canonical: "/roco" } };
const portraits = ["client-mei.jpg", "client-andrei.jpg", "client-emily.jpg", "client-zeynep.jpg"];
const stack = [
  ["Next.js", "Web Development", "/roco/assets/nextjs.svg", "https://nextjs.org/"],
  ["Figma", "Collaborative Design", "/roco/assets/roco-asset-8.svg", "https://www.figma.com/"],
  ["Notion", "Project Management", "/roco/assets/roco-asset-9.svg", "https://www.notion.com/"],
];
function Action({ href, children }: { href: string; children: React.ReactNode }) { return <div className={`roco-action-row ${styles.bottomAction}`}><span className="roco-rule"/><Link className="roco-button" href={href}>{children}<Icon name="arrow"/></Link></div>; }
export default function Home() {
  return <div className={styles.home}>
    <section className={styles.section} aria-label="Introduction"><Reveal className={styles.intro}><h1>Hello Everyone!<br className={styles.mobileBreak}/> <span>I&apos;m Patricia.</span></h1><p>A passionate web designer with a knack for turning ideas into visually stunning, user-friendly websites.</p></Reveal><div className={`roco-action-row ${styles.heroActions}`}><p className={styles.location}><Icon name="location"/>London, United Kingdom</p><span className="roco-rule"/><Link className="roco-button" href="/roco/about">More about Me<Icon name="arrow"/></Link></div></section>
    <Reveal><section className={styles.section} aria-labelledby="recent-projects"><h2 id="recent-projects">Recent Projects</h2><div className={styles.projects}>{projects.slice(0, 2).map(project=><ProjectCard key={project.slug} project={project} eager/>)}</div><Action href="/roco/projects">View All Projects</Action></section></Reveal>
    <Reveal><section className={`${styles.section} ${styles.testimonials}`} aria-labelledby="testimonials"><h2 id="testimonials">Kind Words from Clients</h2><Ticker className={styles.ticker}><div className={styles.track}>{[...testimonials,...testimonials].map((entry,i)=><article className={styles.quote} key={`${entry.name}-${i}`} aria-hidden={i>=4 ? true : undefined}><div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div><p>{entry.quote}</p><div className={styles.person}><img src={`/roco/assets/${portraits[i%4]}`} alt="" width="48" height="48"/><div><h3>{entry.name}</h3><p>{entry.company}</p></div></div></article>)}</div></Ticker><div className={styles.testimonialRule}><span className="roco-rule"/></div></section></Reveal>
    <Reveal><section className={styles.section} aria-labelledby="stack-heading"><h2 id="stack-heading">Stack</h2><div className={styles.stack}>{stack.map(([name,description,source,url])=><a className={styles.tool} key={name} href={url} target="_blank" rel="noreferrer"><img src={asset(source)} alt="" width="48" height="48"/><div><h3>{name}</h3><p>{description}</p></div></a>)}</div><Action href="/roco/stack">View All Stack</Action></section></Reveal>
  </div>;
}
