import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Roco Portfolio Template",
  alternates: { canonical: "/roco/about" },
};

const education = [
  ["Bachelor's Degree in Web Design and Development", "XYZ University, 2010"],
  ["Certification in User Experience (UX) Design", "UXUI Institute, 2012"],
];
const experience = [
  ["Freelance Web Designer", "InnovateTech Inc., 2020 - present"],
  ["Lead Designer", "XYZ Creative Agency, 2015 - 2019"],
  ["Senior Web Designer", "ABC Web Studio, 2010 - 2015"],
];

const timelinePaths = [
  "M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z",
  "M232,86.53V56a16,16,0,0,0-16-16H40A16,16,0,0,0,24,56V184a16,16,0,0,0,16,16H160v24A8,8,0,0,0,172,231l24-13.74L220,231A8,8,0,0,0,232,224V161.47a51.88,51.88,0,0,0,0-74.94ZM128,144H72a8,8,0,0,1,0-16h56a8,8,0,0,1,0,16Zm0-32H72a8,8,0,0,1,0-16h56a8,8,0,0,1,0,16Zm88,98.21-16-9.16a8,8,0,0,0-7.94,0l-16,9.16V172a51.88,51.88,0,0,0,40,0ZM196,160a36,36,0,1,1,36-36A36,36,0,0,1,196,160Z",
  "M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72Zm8,120a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z",
];

function Timeline({ entries }: { entries: string[][] }) {
  return <div className={styles.timeline}>{entries.map(([title, detail], index) => (
    <Reveal key={title} className={styles.entry}>
      <svg className={styles.timelineIcon} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d={timelinePaths[entries === education ? index : 2]} /></svg><h3>{title}</h3><p>{detail}</p>
    </Reveal>
  ))}</div>;
}

export default function AboutPage() {
  return <div className={styles.page}>
    <section className={styles.section}>
      <Reveal className={styles.introduction}>
        <h1>Get to Know Me</h1>
        <p>Hello, I&apos;m Patricia, and I&apos;m more than just a web designer; I&apos;m a digital storyteller. I have always been captivated by the art of web design, and my journey in this field has been nothing short of exhilarating. My goal is to craft websites that not only look beautiful but also function seamlessly, providing an exceptional user experience.</p>
      </Reveal>
      <Reveal className="roco-action-row"><span className={styles.location}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /></svg>London, United Kingdom</span><span className="roco-rule" /></Reveal>
    </section>
    <section className={styles.section} aria-labelledby="education-title">
      <h2 id="education-title">Education</h2><Timeline entries={education} /><div className={styles.divider}><span className="roco-rule" /></div>
    </section>
    <section className={styles.section} aria-labelledby="about-stack-title">
      <h2 id="about-stack-title">Stack</h2>
      <Reveal className={styles.stackCopy}><p>My technical toolkit includes proficiency in Next.js, Figma, HTML, CSS, JavaScript, and various design software like Adobe Creative Suite. I&apos;m also well-versed in responsive web design, ensuring that websites I create look and function flawlessly across all devices.</p></Reveal>
      <Reveal className="roco-action-row"><Link className="roco-button" href="/roco/stack">View All Stack <span aria-hidden="true">→</span></Link><span className="roco-rule" /></Reveal>
    </section>
    <section className={styles.section} aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2><Timeline entries={experience} /><div className={styles.divider}><span className="roco-rule" /></div>
    </section>
  </div>;
}
