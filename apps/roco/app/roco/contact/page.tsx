import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { FooterCredits } from "@/components/shell";
import { ContactForm } from "./contact-form";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Roco Portfolio Template",
  alternates: { canonical: "/roco/contact" },
};

const contactLinks = [
  { label: "contact@patricia.io", url: "mailto:contact@patricia.io", icon: "email" },
  { label: "Book a Call", url: "https://calendly.com/", icon: "phone" },
];
const socialLinks = [
  { label: "X (Twitter)", url: "https://twitter.com/CristianMielu", icon: "x" },
  { label: "Next.js", url: "https://nextjs.org/", icon: "nextjs" },
  { label: "Instagram", url: "https://www.instagram.com/", icon: "instagram" },
  { label: "Dribbble", url: "https://dribbble.com/", icon: "dribbble" },
];

const iconPaths: Record<string, string> = {
  email: "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-8,144H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z",
  phone: "M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z",
  x: "M215,219.85a8,8,0,0,1-7,4.15H160a8,8,0,0,1-6.75-3.71l-40.49-63.63L53.92,221.38a8,8,0,0,1-11.84-10.76l61.77-68L41.25,44.3A8,8,0,0,1,48,32H96a8,8,0,0,1,6.75,3.71l40.49,63.63,58.84-64.72a8,8,0,0,1,11.84,10.76l-61.77,67.95,62.6,98.38A8,8,0,0,1,215,219.85Z",
  nextjs: "M128 16a112 112 0 1 0 0 224 112 112 0 0 0 0-224Zm-40 64h20l64 88V80h16v120h-19L104 110v66H88Z",
  instagram: "M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z",
  dribbble: "M93.27,36.86a4,4,0,0,1,.82-7.19,103.94,103.94,0,0,1,88.66,9.95,4,4,0,0,1,1,5.87,153.32,153.32,0,0,1-41.89,37A169.43,169.43,0,0,0,93.27,36.86ZM127.58,90a153,153,0,0,0-56-46.91,3.94,3.94,0,0,0-4,.33,104.41,104.41,0,0,0-38.34,52,4,4,0,0,0,3,5.16A152.34,152.34,0,0,0,64,104,151,151,0,0,0,127.58,90Zm103.8,26.69A103.81,103.81,0,0,0,202.19,55.2a4,4,0,0,0-6,.34,169.15,169.15,0,0,1-45.69,40.4,167.73,167.73,0,0,1,13.55,29.9A167.64,167.64,0,0,1,208,120,169.35,169.35,0,0,1,227,121.07,4,4,0,0,0,231.38,116.72Zm-62.91,24.5a167.7,167.7,0,0,1,4.45,38.47,168,168,0,0,1-4.11,36.85A4,4,0,0,0,174.5,221a104.25,104.25,0,0,0,56.57-79.25,4,4,0,0,0-3.49-4.49,152.44,152.44,0,0,0-59.11,4Zm-19.64-10.45a151.76,151.76,0,0,0-12.39-27.21A167,167,0,0,1,64,120a168.4,168.4,0,0,1-34.88-3.65,4,4,0,0,0-4.81,3.56q-.31,4-.32,8.09a103.72,103.72,0,0,0,33,75.91,4,4,0,0,0,6.15-.92A169,169,0,0,1,148.83,130.77ZM75.69,213.25a4,4,0,0,0,1.52,5.48,103.88,103.88,0,0,0,68.85,11.69,3.93,3.93,0,0,0,3.06-2.65,152.6,152.6,0,0,0,7.8-48.08,151.3,151.3,0,0,0-3.74-33.46A152.94,152.94,0,0,0,75.69,213.25Z",
};
function ContactIcon({ name }: { name: string }) {
  return <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d={iconPaths[name]} /></svg>;
}

function LinkList({ links }: { links: typeof contactLinks }) {
  return <div className={styles.links}>{links.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer"><ContactIcon name={link.icon} /><span>{link.label}</span></a>)}</div>;
}

export default function ContactPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><Reveal><h1>Let&apos;s Connect!</h1></Reveal></section>
    <section className={styles.columns} aria-label="Get in touch">
      <Reveal className={styles.message}><h3>Message Me</h3><ContactForm /></Reveal>
      <div className={styles.contactDetails}>
        <Reveal className={styles.linkSection}><h3>Contact</h3><LinkList links={contactLinks} /></Reveal>
        <Reveal className={styles.linkSection}><h3>Social Media</h3><LinkList links={socialLinks} /></Reveal>
      </div>
    </section>
    <div className={styles.internalFooter}><FooterCredits /></div>
  </div>;
}
