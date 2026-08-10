"use client";

import Link from "next/link";
import { type CSSProperties, type FormEvent, useState } from "react";
import { FaqSection, HowItWorks, SectionIntro } from "../../RiveroHome";
import { RiveroButton, RiveroPageFrame } from "../../RiveroShell";
import {
  legalSections,
  planFeatures,
  pricingV1Comparison,
  pricingV2Comparison,
  reviews,
  team,
  trustedLogos,
} from "./staticData";
import styles from "./RiveroStaticPages.module.css";

const plans = [
  { name: "Starter", copy: "Perfect for startups and small businesses beginning." },
  { name: "Growth", copy: "Designed for Premium requiring comprehensive AI solutions" },
  { name: "Business", copy: "Designed for Premium requiring comprehensive AI solutions" },
];

function InnerHero({ title, copy, light = false }: { title: string; copy: string; light?: boolean }) {
  return (
    <section className={`${styles.innerHero} ${light ? styles.innerHeroLight : ""}`}>
      {!light ? <div aria-hidden="true" className={styles.heroPixels} /> : null}
      <div className={styles.innerHeroCopy}>
        <h1 data-rivero-reveal="hero">{title}</h1>
        <p data-rivero-reveal style={{ "--rivero-delay": "120ms" } as CSSProperties}>{copy}</p>
      </div>
    </section>
  );
}

function TrustedStrip() {
  return (
    <section className={styles.trustedStrip}>
      <p>Trusted by Industry Leaders Across the Globe</p>
      <div className={styles.logoTrack}>
        {[...trustedLogos, ...trustedLogos].map((logo, index) => <img alt="Trusted company" key={`${logo}-${index}`} src={logo} />)}
      </div>
    </section>
  );
}

function PriceCard({ annual, index, variant }: { annual: boolean; index: number; variant: "v1" | "v2" }) {
  const monthly = [29, 79, 149];
  const annualV1 = [19, 59, 129];
  const annualV2 = [19, 49, 119];
  const price = annual ? (variant === "v1" ? annualV1 : annualV2)[index] : monthly[index];
  const plan = plans[index];

  return (
    <article className={styles.planCard} data-rivero-reveal="card" style={{ "--rivero-delay": `${index * 100}ms` } as CSSProperties}>
      <div className={styles.planTop}>
        <span>{plan.name}</span>
        <div className={styles.price}><b>${price}</b><small>/per month</small></div>
        <p>{plan.copy}</p>
        <RiveroButton href="/contact-us">Get Started</RiveroButton>
      </div>
      <div className={styles.planFeatures}>
        <strong>{variant === "v1" ? "Features you get" : "What’s Included:"}</strong>
        <ul>{planFeatures.map((feature) => <li key={feature}><i aria-hidden="true">✓</i>{feature}</li>)}</ul>
      </div>
    </article>
  );
}

function ComparePlans({ variant }: { variant: "v1" | "v2" }) {
  const rows = variant === "v1" ? pricingV1Comparison : pricingV2Comparison;
  const labels = variant === "v1" ? ["Starter Plan", "Growth Plan", "Enterprise Plan"] : ["Basic", "Pro", "Premium"];
  return (
    <section className={`${styles.compareSection} ${variant === "v2" ? styles.compareSectionV2 : ""}`}>
      <h2 data-rivero-reveal="hero">Compare Our Plans</h2>
      <div className={styles.compareDesktop} data-rivero-reveal>
        <div className={styles.compareHead}><strong>{variant === "v1" ? "Plan Features" : "Features"}</strong>{labels.map((label) => <strong key={label}>{label}</strong>)}</div>
        {rows.map((row, index) => <div className={styles.compareRow} key={`${row[0]}-${index}`}>{row.map((cell, cellIndex) => <span key={`${cell}-${cellIndex}`}>{cell === "✓" ? <i>✓</i> : cell}</span>)}</div>)}
      </div>
      <div className={styles.compareMobile}>
        {labels.map((label, planIndex) => <article data-rivero-reveal key={label}>
          <header><strong>{variant === "v1" ? "Plan Features" : "Features"}</strong><strong>{label}</strong></header>
          {rows.map((row, index) => <div key={`${row[0]}-${index}`}><span>{row[0]}</span><span>{row[planIndex + 1] === "✓" ? <i>✓</i> : row[planIndex + 1]}</span></div>)}
        </article>)}
      </div>
    </section>
  );
}

export function PricingPage({ variant }: { variant: "v1" | "v2" }) {
  const [annual, setAnnual] = useState(false);
  const title = variant === "v1" ? "Find Your Perfect Plan" : "Smarter People Management";
  const copy = variant === "v1"
    ? "Term contracts, just flexible plans designed to fit your business size and goals. Upgrade anytime as your team grows."
    : "An HR management platform is a digital solution that helps businesses automate and manage their human resource tasks like employee data, attendance, payroll performance.";
  return (
    <RiveroPageFrame>
      <main className={styles.gradientPage}>
        <section className={styles.pricingHero}>
          <div aria-hidden="true" className={styles.heroPixels} />
          <div className={styles.pricingTitle}>
            <h1>{title}</h1><p>{copy}</p>
            <div aria-label="Billing frequency" className={styles.billingToggle}>
              <button aria-pressed={!annual} onClick={() => setAnnual(false)} type="button">Monthly</button>
              <button aria-pressed={annual} onClick={() => setAnnual(true)} type="button">Annual</button>
              {variant === "v1" ? <span>Save up to 20%</span> : null}
            </div>
          </div>
          <div className={styles.planGrid}>{plans.map((plan, index) => <PriceCard annual={annual} index={index} key={plan.name} variant={variant} />)}</div>
        </section>
        {variant === "v1" ? <TrustedStrip /> : null}
        <ComparePlans variant={variant} />
        <FaqSection />
      </main>
    </RiveroPageFrame>
  );
}

const values = [
  ["◎", "Transparency", "We continuously evolve to bring smarter faster more efficient HR solutions that meet the needs of modern."],
  ["⌁", "Collaboration", "We grow by working closely with our clients understanding their challenges and building solutions truly."],
  ["✦", "Innovation", "We continuously evolve to bring smarter faster, and more efficient HR solutions that meet the needs of modern."],
];

function ClientReviewGrid({ limit = 10 }: { limit?: number }) {
  return <div className={styles.clientReviewGrid}>{reviews.slice(0, limit).map((review, index) => <article data-rivero-reveal key={review.name} style={{ "--rivero-delay": `${(index % 3) * 70}ms` } as CSSProperties}>
    <p>“{review.quote}”</p>
    <footer><img alt="" src={review.avatar} /><span><strong>{review.name}</strong><small>{review.role}</small></span><b>𝕏</b></footer>
  </article>)}</div>;
}

export function AboutPage() {
  return (
    <RiveroPageFrame>
      <main className={styles.lightPage}>
        <InnerHero light title="Our Story" copy="Discover how businesses like yours transformed their HR operations with our all-in-one management like yoursplatform." />
        <TrustedStrip />
        <section className={styles.storySection}>
          <SectionIntro title="Smart HR Empowerment" copy="Transform the way you handle HR with one intuitive all-in-one solution. Our platform automates." />
          <div className={styles.storyPanel} data-rivero-reveal="card">
            <div><h3>Your Partner in Truly Smarter Workforce Management</h3><p>Automate the entire onboarding process with digital forms, checklists, and welcome templates making new hires feel part teamTrack.</p></div>
            <div className={styles.missionCards}><article><span>Our Mission</span><p>Automate the entire onboarding process with digital forms, checklists, and welcome templates.</p></article><article><span>Our Story</span><p>Our journey began with a simple idea to eliminate the chaos of manual HR tasks after seeing.</p></article></div>
          </div>
          <div className={styles.statsGrid}>{[["10k+","Employees Managed"],["500+","Businesses Onboarded"],["98%","Client Satisfaction Rate"],["5+","Years of HR Tech Experience"]].map(([value,label],index)=><article data-rivero-reveal key={label} style={{ "--rivero-delay": `${index * 80}ms` } as CSSProperties}><strong>{value}</strong><span>{label}</span></article>)}</div>
        </section>
        <section className={styles.valuesSection}>
          <SectionIntro title="Our Core Values" copy="Our journey began with a simple idea, to eliminate the chaos of manual HR tasks. After seeing how time." />
          <div>{values.map(([icon,title,copy], index)=><article data-rivero-reveal="card" key={title} style={{ "--rivero-delay": `${index * 90}ms` } as CSSProperties}><i>{icon}</i><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>
        <section className={styles.teamSection}>
          <SectionIntro title="Meet the Team Behind" copy="Our dedicated team of developers, designers, and HR experts work together to deliver a platform truly." />
          <div className={styles.teamGrid}>{team.map(([name,role,image],index)=><article data-rivero-reveal="card" key={name} style={{ "--rivero-delay": `${(index % 4) * 70}ms` } as CSSProperties}><img alt={name} src={image}/><h3>{name}</h3><p>{role}</p></article>)}</div>
        </section>
        <HowItWorks />
        <section className={styles.aboutReviews}><SectionIntro title="What Our Clients Say" copy="Join thousands of happy customers who have simplified their HR processes and transformed the way they manage people"/><ClientReviewGrid /></section>
        <FaqSection />
      </main>
    </RiveroPageFrame>
  );
}

const featureCards = [
  ["Automate Your Growth", "Quickly see data trends in super easy way! effective mannerism.", "/rivero/assets/47b9eaa47d8f3ae5.svg"],
  ["All-in-One Marketing Hub", "Marketo makes it super easy to handle email, analytics, automation.", "/rivero/assets/64c68020db672502.svg"],
  ["Make Data Work for You", "Know what drives results to enhance campaign decisions.", "/rivero/assets/ad77bd49d0482ce6.svg"],
] as const;

const hrFeatureCards = [
  ["Easily Manage People Payroll & Performance in One Platform", "Automate routine tasks, gain real-time insights your team to focus on what matters most growing business.", "/rivero/assets/rFl92jjbyuydyQ6yNdH8FilrgUc.svg"],
  ["Simplify How You Manage People Payroll Performance", "Transform the way you handle HR with one intuitive all-in-one solution. Our platform automates.", "/rivero/assets/CfBsZeVHwG4WtfylADls6BrWMFI.svg"],
  ["One Smart Platform to Manage People Payroll Performance", "Experience the power of automation designed to simplify every aspect of HR. From managing employee.", "/rivero/assets/jCgvPIhGdl9DFy1eNI9nhc3Hl1Q.svg"],
] as const;

function SeamlessSection() {
  const items = [
    ["Employee Management", "Organize and manage all employee details, roles, and documents in one secure place."],
    ["Attendance Tracking", "Automate attendance records with smart clock-in/out systems. Get real-time insights."],
    ["Performance Insights", "Track progress, set goals, and performance metrics to keep your team growing."],
  ];
  return <section className={styles.seamlessSection}><div><SectionIntro title="Seamless HR Made Simple" copy="Access your HR data anytime, anywhere. With enterprise-grade security and cloud backup, your employee information."/><ul>{items.map(([title,copy],index)=><li data-rivero-reveal key={title} style={{"--rivero-delay":`${index*80}ms`} as CSSProperties}><i>✓</i><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ul></div><div className={styles.seamlessImage} data-rivero-reveal="card"><img alt="HR employee report" src="/rivero/assets/64e36bea0abd32bd.svg"/></div></section>;
}

export function FeaturePage() {
  return <RiveroPageFrame><main className={styles.gradientPage}>
    <section className={styles.featureHero}><div aria-hidden="true" className={styles.heroPixels}/><div className={styles.featureHeroCopy}><span>Join +1000 scaling business</span><h1>Powerful Features for Modern HR Teams Everywhere</h1><p>Simplify your HR operations with intelligent automation and powerful tools designed to manage people payroll.</p><RiveroButton href="/contact-us" light>Get started for free</RiveroButton></div><img alt="Rivero analytics dashboard" src="/rivero/assets/914b72c5ab5a9a1c.png"/></section>
    <TrustedStrip />
    <section className={styles.differenceSection}><SectionIntro title="What Makes Us Different" copy="We go beyond traditional management tools by combining automation analytics and AI-driven intelligence in one powerful platform."/><div><article data-rivero-reveal="card"><h3>Employee Management</h3><p>Get AI-generated reports and predictions.</p><img alt="Employee management graph" src="/rivero/assets/8d57f6a08c8c6fe0.svg"/></article><article data-rivero-reveal="card"><h3>Payroll Automation</h3><p>Works with your existing tools and systems.</p><img alt="Payroll automation graph" src="/rivero/assets/8d47f6c65c4c6295.svg"/></article></div></section>
    <section className={styles.modernFeatures}><SectionIntro title="Powerful Features for Modern HR Teams"/><div>{featureCards.map(([title,copy,image],index)=><article data-rivero-reveal="card" key={title} style={{"--rivero-delay":`${index*90}ms`} as CSSProperties}><img alt="" src={image}/><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className={styles.powerfulSection}><SectionIntro title="Powerful HR Made Simple" copy="Manage your people payroll and performance with ease. Our platform is built to simplify complex HR tasks with through."/><div>{hrFeatureCards.map(([title,copy,image],index)=><article className={index%2?styles.reverseCard:""} data-rivero-reveal="card" key={title}><div><img alt="Rivero HR feature" src={image}/></div><div><i>{index===0?"⌁":index===1?"♧":"ϟ"}</i><h3>{title}</h3><p>{copy}</p><Link href="/feature">Learn More <span>↗</span></Link></div></article>)}</div></section>
    <SeamlessSection />
  </main></RiveroPageFrame>;
}

const reviewImages = [
  "/rivero/assets/06becc88e3401d28.png",
  "/rivero/assets/5cc9f957bc378f67.png",
  "/rivero/assets/8fc876fa23447d35.png",
  "/rivero/assets/d214f296bdfb3a9b.png",
];

export function ReviewsPage() {
  const columns = [reviews.slice(0,6), reviews.slice(6,14), reviews.slice(14)];
  return <RiveroPageFrame><main className={styles.lightPage}>
    <InnerHero light title="Exceeded Expectations" copy="This HR platform has exceeded all our expectations. The transition was smooth, the tools are powerful, and everything works exactly as promised."/>
    <section className={styles.reviewsWall}>{columns.map((column,columnIndex)=><div key={columnIndex}>{columnIndex!==1?<figure data-rivero-reveal="card"><img alt="Rivero customer" src={reviewImages[columnIndex*2]}/><span>▶</span></figure>:null}{column.map((review,index)=><article data-rivero-reveal key={review.name} style={{"--rivero-delay":`${(index%3)*60}ms`} as CSSProperties}><p>“{review.quote}”</p><footer><img alt="" src={review.avatar}/><span><strong>{review.name}</strong><small>{review.role}</small></span><b>𝕏</b></footer></article>)}{columnIndex!==1?<figure data-rivero-reveal="card"><img alt="Rivero customer" src={reviewImages[columnIndex*2+1]}/><span>▶</span></figure>:null}</div>)}</section>
    <HowItWorks />
  </main></RiveroPageFrame>;
}

export function ContactPage() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Validated locally. No message was sent.");
  }

  return <RiveroPageFrame><main className={styles.lightPage}>
    <InnerHero light title="Contact Us" copy="A brief line encouraging users to contact your team for support, inquiries, or demo requests."/>
    <section className={styles.contactContent}>
      <form aria-label="Contact Rivero" className={styles.contactForm} onInput={() => setStatus("")} onSubmit={submit}>
        <h2>Get in touch with us</h2><div className={styles.twoFields}><input aria-label="First name" placeholder="First name *" required/><input aria-label="Last name" placeholder="Last name *" required/></div><input aria-label="Work email" placeholder="Work email *" required type="email"/><select aria-label="Business type" defaultValue="" required><option disabled value="">Business type *</option><option>Analytics Consulting</option><option>Digital Marketing</option><option>Strategy Consulting</option><option>BI Solutions</option></select><textarea aria-label="Message" placeholder="What do you have on your mind?"/><label className={styles.consent}><input type="checkbox"/><span>I&apos;d like to occasionally receive other communication from Webuir, such as content and product news.</span></label><button type="submit">Send Message <i>↗</i></button>
        <p className={styles.formStatus} role="status">{status}</p>
      </form>
      <div className={styles.contactCards}>{[["✦","Chat with Sales","Talk to our product experts.","info88@example.com","mailto:info88@example.com"],["⌖","Visit Our Office","Stop by and meet the team.","Maplewood Minnesota, USA","https://maps.app.goo.gl/sGTk48ehqM2AQRwA6"],["✆","Talk with Team","Talk to our product experts.","+1 (800) 321-9876","tel:+18003219876"]].map(([icon,title,copy,label,href],index)=><article data-rivero-reveal key={title} style={{"--rivero-delay":`${index*80}ms`} as CSSProperties}><i>{icon}</i><div><span>{title}</span><p>{copy}</p><a href={href}>{label}</a></div></article>)}</div>
    </section>
    <FaqSection />
  </main></RiveroPageFrame>;
}

export function AppointmentPage() {
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Validated locally. No appointment was booked.");
  }

  return <RiveroPageFrame><main className={styles.lightPage}>
    <InnerHero light title="Schedule a Demo Call" copy="Experience how our HR platform streamlines every part of your workflow, from payroll and attendance to onboarding and performance management."/>
    <form aria-label="Schedule a Rivero demo" className={styles.appointmentForm} onInput={() => setStatus("")} onSubmit={submit}>
      <div className={styles.twoFields}><label>First Name*<input placeholder="David" required/></label><label>Last Name*<input placeholder="Carlos" required/></label></div><label>Email*<input placeholder="hello@gmail.com" required type="email"/></label><div className={styles.twoFields}><label>Company Name*<input placeholder="Company" required/></label><label>Job Title*<input placeholder="CEO" required/></label></div><label>Team Size*<input min="1" placeholder="***" required type="number"/></label><label>Message*<textarea placeholder="Your Message" required/></label><button type="submit">Send Message <i>↗</i></button>
      <p className={styles.formStatus} role="status">{status}</p>
    </form>
    <SeamlessSection /><HowItWorks />
  </main></RiveroPageFrame>;
}

export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  return <RiveroPageFrame><main className={styles.lightPage}>
    <section className={styles.legalHero}><h1 data-rivero-reveal="hero">{type==="privacy"?"Privacy Policy":"Terms & conditions"}</h1><time dateTime="2025-12-29">Last Updated: December 29, 2025</time><div className={styles.legalCopy}>{legalSections.map(([title,copy],index)=><article data-rivero-reveal key={`${title}-${index}`}><h2>{title}</h2>{copy.split("\n\n").map((paragraph,pIndex)=><p key={pIndex}>{paragraph}</p>)}</article>)}</div></section>
  </main></RiveroPageFrame>;
}
