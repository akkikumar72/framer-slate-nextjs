"use client";

import Link from "next/link";
import { type CSSProperties, useState } from "react";
import { RiveroButton, RiveroPageFrame } from "./RiveroShell";
import styles from "./RiveroHome.module.css";

const logos = [
  "/rivero/assets/df78dd170f317693.svg",
  "/rivero/assets/0dd2090f12ada355.svg",
  "/rivero/assets/a8c15a53fbd5c323.svg",
  "/rivero/assets/cd4d7a7bed1e01d3.svg",
  "/rivero/assets/792d95436eeec5ad.svg",
  "/rivero/assets/8626a1977dcc9694.svg",
];

const hrCards = [
  {
    icon: "⌁",
    title: "Easily Manage People Payroll & Performance in One Platform",
    copy: "Automate routine tasks, gain real-time insights your team to focus on what matters most growing business.",
    visual: "/rivero/assets/rFl92jjbyuydyQ6yNdH8FilrgUc.svg",
  },
  {
    icon: "♧",
    title: "Simplify How You Manage People Payroll Performance",
    copy: "Transform the way you handle HR with one intuitive all-in-one solution. Our platform automates.",
    visual: "/rivero/assets/CfBsZeVHwG4WtfylADls6BrWMFI.svg",
  },
  {
    icon: "ϟ",
    title: "One Smart Platform to Manage People Payroll Performance",
    copy: "Experience the power of automation designed to simplify every aspect of HR. From managing employee.",
    visual: "/rivero/assets/jCgvPIhGdl9DFy1eNI9nhc3Hl1Q.svg",
  },
];

const testimonials = [
  { quote: "This platform has completely changed how we manage attendance, payroll, and team performance. Everything is automated, easy to track, and simple to use.", name: "Michael Carter", role: "HR Manager", avatar: "/rivero/assets/17f5939679c34949.svg" },
  { quote: "The automation features are a lifesaver! No more manual data entry or payroll errors. The reports and insights are very helpful.", name: "James Anderson", role: "Team Lead", avatar: "/rivero/assets/246801ef6244db09.svg" },
  { quote: "From onboarding to performance reviews, everything is organized in one place. It’s truly made HR stress-free.", name: "David Thompson", role: "Operations Manager", avatar: "/rivero/assets/5be6c8d8e8989a7f.svg" },
  { quote: "We love how everything is stored safely in the cloud and accessible anytime. The automation features are top-notch.", name: "Jane Cooper", role: "Founder at Nexora", avatar: "/rivero/assets/7d300913e4796d43.svg" },
  { quote: "We automated payroll and attendance, and it cut our manual work in half. Highly recommended for small growing teams.", name: "Daniel Johnson", role: "Project Manager", avatar: "/rivero/assets/d47acc453b432e23.svg" },
  { quote: "As our company scaled, managing HR manually became impossible. Rivero helped us stay organized and efficient.", name: "William Parker", role: "HR Director", avatar: "/rivero/assets/d7f740d5f960e31a.svg" },
  { quote: "Our distributed team can easily log attendance and apply for leave from anywhere.", name: "Christopher Lewis", role: "CEO", avatar: "/rivero/assets/e7e671b1b36af720.svg" },
  { quote: "The customer service team helped us get started in no time. Their training sessions made setup incredibly smooth.", name: "Matthew Harris", role: "HR Specialist", avatar: "/rivero/assets/90cbc2835aa9d6f2.svg" },
  { quote: "It’s affordable, efficient, and loaded with useful features, perfect for startups that need a full HR solution.", name: "Brian Mitchell", role: "Finance Officer", avatar: "/rivero/assets/30c9ca93a7f5c1b7.svg" },
];

export const faqItems = [
  { question: "What is an HR management platform?", answer: "An HR management platform is a digital solution that helps businesses automate and manage human resource tasks like employee data, attendance, payroll, performance, and reporting." },
  { question: "How can this platform help my business?", answer: "Rivero helps businesses streamline HR operations, reduce manual work, improve accuracy, save time, and enhance overall employee management efficiency." },
  { question: "Can I customize the platform to fit my needs?", answer: "Yes. The platform is flexible and allows businesses to customize features, workflows, and settings to match specific HR requirements." },
  { question: "How do I know my donation is making a difference?", answer: "You receive regular updates and transparent reports showing how your contribution supports initiatives, impacts communities, and drives meaningful change." },
  { question: "Is my donation tax-deductible?", answer: "Your contribution may be tax-deductible depending on your location and local regulations. Official receipts are provided for documentation purposes." },
];

export function SectionIntro({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return <div className={styles.sectionIntro}>
    {eyebrow ? <span data-rivero-reveal>{eyebrow}</span> : null}
    <h2 data-rivero-reveal="hero">{title}</h2>
    {copy ? <p data-rivero-reveal style={{ "--rivero-delay": "90ms" } as CSSProperties}>{copy}</p> : null}
  </div>;
}

export function FaqSection({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(0);
  return <section className={`${styles.faq} ${compact ? styles.faqCompact : ""}`}>
    <SectionIntro title="Frequently Asked Questions" copy="Find quick answers to common questions about our HR management platform and how it helps your business grow." />
    <div className={styles.faqList} data-rivero-reveal>
      {faqItems.map((item, index) => <article className={styles.faqItem} key={item.question}>
        <button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)} type="button">
          <span>{item.question}</span><i aria-hidden="true">{open === index ? "−" : "+"}</i>
        </button>
        <div className={`${styles.faqAnswer} ${open === index ? styles.faqAnswerOpen : ""}`}><p>{item.answer}</p></div>
      </article>)}
    </div>
  </section>;
}

export function HowItWorks() {
  const steps = [
    ["Schedule Your Demo", "Choose a convenient time, and our team will guide you through a personalized walkthrough."],
    ["Explore Key HR Tools", "See how payroll, attendance, performance and employee data are managed in one unified platform."],
    ["Start Using the Platform", "Our experts will understand your needs and show features that best fit your team."],
  ];
  return <section className={styles.howWorks}>
    <div className={styles.howGrid}>
      <div><h2 data-rivero-reveal="hero">See How It Works</h2><p data-rivero-reveal>Choose a time that works best for you, and our team will walk you through personalized.</p>
        <ol>{steps.map(([title, copy], index) => <li data-rivero-reveal key={title} style={{ "--rivero-delay": `${index * 90}ms` } as CSSProperties}><i>{index + 1}</i><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
      </div>
      <blockquote data-rivero-reveal="card"><div className={styles.stars}>★★★★★</div><p>“This platform has completely transformed the way we manage HR. Payroll is faster, attendance is accurate, and our team finally has visibility.”</p><footer><img alt="Michael Turner" src="/rivero/assets/792d95436eeec5ad.svg" /><span><strong>Michael Turner</strong><small>Operations Manager</small></span></footer></blockquote>
    </div>
  </section>;
}

function HeroBadge() {
  const phrase = "Personalized AI Reports";
  let characterIndex = 0;
  return <div className={styles.heroBadge}>
    <span className={styles.newBadge}>New</span>
    <span aria-label={phrase} className={styles.badgeLetters}>{Array.from(phrase).map((character, index) => {
      if (character === " ") return <span aria-hidden="true" className={styles.badgeSpace} key={index}> </span>;
      const delayIndex = characterIndex++;
      return <span aria-hidden="true" key={index} style={{ "--letter-index": delayIndex } as CSSProperties}>{character}</span>;
    })}</span>
  </div>;
}

export function RiveroHome() {
  return <RiveroPageFrame>
    <main className={styles.homeMain}>
      <section className={styles.hero}>
        <div className={styles.heroPixelField} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <HeroBadge />
          <h1>Get Actionable Insights<br />{" "}That Grows Your Business</h1>
          <p>Automate workflows, monitor performance, and optimize every operation with precision all powered by intelligent AI insights platform streamlines.</p>
          <div className={styles.heroActions}><RiveroButton href="/rivero/contact-us" light>Get Started for Free</RiveroButton><RiveroButton href="/rivero/appointment">Book A Demo</RiveroButton></div>
        </div>
        <div className={styles.dashboardStage}>
          <div className={styles.dashboardGlow} aria-hidden="true" />
          <div className={styles.dashboardFrame}><img alt="Rivero HR dashboard" src="/rivero/assets/b681a7d545403371.png" /></div>
        </div>
      </section>

      <section className={styles.trusted}>
        <p>Trusted by Industry Leaders Across the Globe</p>
        <div>
          <span className={styles.logoRail}>
            {[...logos, ...logos].map((logo, index) => <img alt="Trusted company" key={`${logo}-${index}`} src={logo} />)}
          </span>
        </div>
      </section>

      <section className={styles.difference}>
        <SectionIntro title="What Makes Us Different" copy="We go beyond traditional management tools by combining automation analytics and AI-driven intelligence in one powerful platform." />
        <div className={styles.differenceGrid}>
          <article data-rivero-reveal="card"><div><span>Employee Management</span><p>Get AI-generated reports and predictions.</p></div><img alt="AI report" src="/rivero/assets/8d57f6a08c8c6fe0.svg" /></article>
          <article data-rivero-reveal="card" style={{ "--rivero-delay": "110ms" } as CSSProperties}><div><span>Payroll Automation</span><p>Works with your existing tools and systems.</p></div><img alt="Sales rating" src="/rivero/assets/8d47f6c65c4c6295.svg" /></article>
        </div>
      </section>

      <section className={styles.workflow}>
        <SectionIntro title="Simplify the product’s workflow journey for visitors" />
        <div className={styles.workflowCards}>
          {[['↗','Generate Reports'],['◎','Monitor Performance'],['⌕','View Insights']].map(([icon,title], index) => <article data-rivero-reveal="card" key={title} style={{ "--rivero-delay": `${index * 100}ms` } as CSSProperties}><i>{icon}</i><h3>{title}</h3></article>)}
        </div>
        <h4 data-rivero-reveal>Managing your workforce has never been easier. Our all-in-one HR platform automates time-consuming tasks and brings everything together in one place.</h4>
      </section>

      <section className={styles.powerful}>
        <SectionIntro title="Powerful HR Made Simple" copy="Manage your people payroll and performance with ease. Our platform is built to simplify complex HR tasks with through." />
        <div className={styles.hrCardStack}>{hrCards.map((card, index) => <article className={index % 2 ? styles.hrCardReverse : ""} data-rivero-reveal="card" key={card.title}>
          <div className={styles.hrVisual}><img alt="" src={card.visual} /></div>
          <div className={styles.hrCopy}><i>{card.icon}</i><h3>{card.title}</h3><p>{card.copy}</p><Link href="/rivero/feature">Learn More <span>↗</span></Link></div>
        </article>)}</div>
      </section>

      <section className={styles.seamless}>
        <div className={styles.seamlessCopy}>
          <SectionIntro title="Seamless HR Made Simple" copy="Access your HR data anytime, anywhere. With enterprise-grade security and cloud backup, your employee information." />
          <ul>{[["Employee Management","Organize and manage all employee details, roles, and documents in one secure place."],["Attendance Tracking","Automate attendance records with smart clock-in and clock-out systems."],["Performance Insights","Track progress, set goals, and performance metrics to keep your team growing."]].map(([title,copy], index) => <li data-rivero-reveal key={title} style={{ "--rivero-delay": `${index * 80}ms` } as CSSProperties}><i>✓</i><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ul>
        </div>
        <div className={styles.seamlessVisual} data-rivero-reveal="card"><img alt="Member type report" src="/rivero/assets/64e36bea0abd32bd.svg" /></div>
      </section>

      <section className={styles.testimonials}>
        <SectionIntro title="What Our Clients Say" copy="Join thousands of happy customers who have simplified their HR processes and transformed the way they manage people" />
        <div className={styles.testimonialGrid}>
          <div className={styles.videoCard} data-rivero-reveal="card"><img alt="Rivero customer" src="/rivero/assets/d214f296bdfb3a9b.png" /><span aria-hidden="true">▶</span></div>
          {testimonials.map((item, index) => <article data-rivero-reveal key={item.name} style={{ "--rivero-delay": `${(index % 3) * 80}ms` } as CSSProperties}><p>“{item.quote}”</p><footer><img alt="" src={item.avatar} /><span><strong>{item.name}</strong><small>{item.role}</small></span><b>𝕏</b></footer></article>)}
          <div className={styles.videoCard} data-rivero-reveal="card"><img alt="Rivero customer" src="/rivero/assets/5cc9f957bc378f67.png" /><span aria-hidden="true">▶</span></div>
        </div>
      </section>

      <HowItWorks />
      <FaqSection />
    </main>
  </RiveroPageFrame>;
}
