"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ConsultationCta } from "@/components/shared/ConsultationCta";
import { ArrowLink } from "@/components/shared/SiteShell";
import { B2_PREFIX, asset, caseStudies, services } from "@/lib/site-data";
import styles from "./Home.module.css";

const benefits = [
  ["PSxekxaLP7CkInNLr90hydTqHgs.svg", "24/7 support and optimization"],
  ["Kwgm8fkaXetfqUnD7GEqD0dIbWA.svg", "Customer success experts"],
  ["pB2yoFzybhU5bVViKzLVeOg7FRI.svg", "Live performance tracking"],
  ["Uy8tMCPa7LVBDzg5wCGkC3Hv7Cc.svg", "Security design approach"],
  ["Be62KczKftDWo78NQ0aEDa7upys.svg", "Multichannel client support"],
] as const;

const clients = ["OeS5x9D923NiahSYKN9hxk4Suro.svg", "2YZnNW7BCWQWAN6pAEpTgy0410.svg", "KKl7D5KyqYO8OIic0B8moR7GpE.svg", "5nrbaFlN2ej82Yl2b67RMPBpjA.svg", "sbqFrNnjBcJmLYn7HwM461w3vI.svg", "Ln1V8AKSm2c7t6akCprg0CDw9U.svg"];

const industries = [
  ["Financial services", "HEd6UpzqP2U9vJOjBXBVjNcYc.jpg"],
  ["Healthcare", "piT16WDn5IlyZFuOSxtCdNCE.jpg"],
  ["Technology", "Zi0oKIBGmUqx63MJ5ToBVKKEg8U.jpg"],
  ["Manufacturing", "3IkbFdGrInFuAe651xdHTPvblJk.jpg"],
  ["Logistics & supply chain", "aguefbs4xeL6pOf5bbuTclZOi58.jpg"],
] as const;

const caseHighlights = [
  {
    challenge: "Low lead conversion from the existing website.",
    solution: "Redesigned the site with compelling storytelling and integrated donation.",
    secondaryResult: ["38%", "Bounce rate dropped"],
  },
  {
    challenge: "Delayed product iteration and market responsiveness.",
    solution: "Introduced agile development workflows to accelerate feature deployment.",
    secondaryResult: ["30%", "The campaign achieved"],
  },
  {
    challenge: "Disconnected legacy systems hindered real-time data access.",
    solution: "Integrated ERP, CRM, and supply chain tools into a unified platform for streamlined.",
    secondaryResult: ["70%", "The bounce rate dropped"],
  },
  {
    challenge: "Outdated digital presence and manual processes limited client acquisition.",
    solution: "Implemented automated workflows, revamped their digital brand, and launched.",
    secondaryResult: ["60%", "Reduced no-shows"],
  },
] as const;

const methodSteps = [
  ["W1lcf4BgY3X9TQGR6SVbHi6yKqA.svg", "Understand your business"],
  ["ZfEE2pKPHkOFFneaQ9yk7U5WRg4.svg", "Build the right strategy"],
  ["1ClaDdRxEtRT8xD5buBHj16PM.svg", "Execute & deliver results"],
] as const;

export function B2bizzHome() {
  const [industry, setIndustry] = useState(0);
  const [service, setService] = useState(0);
  const [caseStudy, setCaseStudy] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const activeService = services[service];
  const activeCase = caseStudies[caseStudy];
  const activeCaseHighlight = caseHighlights[caseStudy];

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-b2-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-b2-revealed", "true");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <video autoPlay loop muted playsInline aria-label="Abstract light moving across a dark surface" src={asset("SiX4tYo5EFmACoajDRrfZJv8.mp4")} />
        <div className={styles.heroShade} />
        <h1>Built for B2B,<br className={styles.phoneNarrowBreak} /> focused<br className={styles.phoneNarrowBreak} /> on results.</h1>
        <ArrowLink href={`${B2_PREFIX}/service`}>Explore our services</ArrowLink>
      </section>

      <div aria-label="B2bizz benefits" className={styles.ticker}>
        <div>{[...benefits, ...benefits].map(([icon,label],index)=><span key={`${label}-${index}`}><img alt="" src={asset(icon)} />{label}</span>)}</div>
      </div>

      <section className={styles.clients} data-b2-reveal="desktop-section">
        <p>Trusted by fast-moving B2B teams</p>
        <div>{[...clients, ...clients].map((client,index)=><span aria-hidden={index >= clients.length ? "true" : undefined} key={`${client}-${index}`}><img alt={index < clients.length ? "Client logo" : ""} src={asset(client)} /></span>)}</div>
      </section>

      <section className={styles.about} data-b2-reveal="all">
        <div className={styles.sectionCopy}>
          <h2>Informed strategy, Operational strength, and sustainable results.</h2>
          <p>We specialize in empowering B2B companies with results-driven consulting solutions tailored to modern business challenges.</p>
        </div>
        <div className={styles.aboutMedia}><img alt="Consultants collaborating" src={asset("nyZo544QkOMb4JMxmjR4KDthig.jpg")} /></div>
        <div className={styles.aboutPoints}>
          {["Communicate value clearly and quickly","Solutions aligned with your business goals","Frameworks built for long-term success","Working with you, not just for you"].map((item)=><div key={item}><span>•</span>{item}</div>)}
          <ArrowLink href={`${B2_PREFIX}/about`}>More about us</ArrowLink>
        </div>
      </section>

      <section className={styles.industries} data-b2-reveal="desktop-section">
        <div className={styles.sectionBar} data-b2-reveal="compact-only"><h2>Accelerating B2B growth across diverse industries</h2><div className={styles.sliderControls}><button aria-label="Previous industry" onClick={()=>setIndustry((industry-1+industries.length)%industries.length)}>←</button><button aria-label="Next industry" onClick={()=>setIndustry((industry+1)%industries.length)}>→</button></div></div>
        <div className={styles.industryGrid}>{industries.map((_,offset)=>{const item=industries[(industry+offset)%industries.length];return <article key={item[0]}><img alt={item[0]} src={asset(item[1])}/><h3>{item[0]}</h3></article>})}</div>
      </section>

      <section className={styles.why} data-b2-reveal="desktop-section">
        <div className={styles.sectionCopy} data-b2-reveal="compact-only"><h2>What makes us the right partner</h2><p>Choosing the right consulting partner can define the future of your business. At B2bizz, we don’t just advise &mdash; we collaborate, innovate, and deliver.</p></div>
        <div className={styles.whyGrid}>
          {[["LvrjgEFWUJmw4KNk0Z3Vkj4tMnw.svg","B2B expertise that matters","Deep expertise in navigating B2B challenges and opportunities."],["GlhEiNlKFOg8ofVXCHtk2Dhu8Wg.svg","End-to-End consulting","From planning to execution, we cover every step."],["1MVVAon08dDj9NsTo05Y9n4MWL4.svg","Data-Driven decisions","We use data and experience to drive smart business moves."]].map(([icon,title,copy])=><article key={title}><img alt="" src={asset(icon)}/><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <article className={styles.testimonial}><img alt="" src={asset("XwCo50BibsVkSjbmawMbcrbww.jpg")}/><div><img alt="Orion Blake" src={asset("pfX9Sn5qRme6iCFMisneY4YIt7I.jpg")}/><div><blockquote>Working with B2bizz was a game-changer for our B2B strategy. Their team didn’t just offer advice — they became an extension of our leadership. Their insights, professionalism, and tailored approach helped us unlock new growth and streamline our operations.</blockquote><p>Orion Blake, <span>COO</span></p></div></div></article>
      </section>

      <section className={styles.services} data-b2-reveal="desktop-section">
        <div className={styles.sectionBar} data-b2-reveal="compact-only"><h2>Expert services that move your business forward</h2><ArrowLink href={`${B2_PREFIX}/contact`}>Get started</ArrowLink></div>
        <div className={styles.serviceStage}>
          <div role="tablist" aria-label="Services">{services.map((item,index)=><div className={`${styles.serviceItem} ${service===index ? styles.serviceItemOpen : ""}`} key={item.slug}><button aria-controls="active-service" aria-selected={service===index} onClick={()=>setService(index)} role="tab"><img alt="" src={asset(item.icon)} /><span>{item.title}</span><i aria-hidden="true">{service===index ? "×" : "+"}</i></button>{service===index && <div className={styles.serviceDetails}><p>{item.summary}</p><div>{item.tags.map((tag)=><span key={tag}>{tag}</span>)}</div><Link href={`${B2_PREFIX}/service/${item.slug}`}>↳&nbsp; View detail</Link><div className={styles.mobileServiceVisual}><img alt="" src={asset(item.image)} /><img alt={`${item.title} project preview`} src={asset("Gey8JdeAVmsTiFw12hY2ed6pLxI.png")} /></div></div>}</div>)}</div>
          <article className={styles.serviceVisual} id="active-service" role="tabpanel"><img alt="" src={asset(activeService.image)} /><img alt={`${activeService.title} project preview`} src={asset("Gey8JdeAVmsTiFw12hY2ed6pLxI.png")} /></article>
        </div>
      </section>

      <section className={styles.stats} data-b2-reveal="wide-section">
        <img alt="Abstract chart representing measurable growth" src={asset("xdZBOwkMZJeriKhloXInsZER2rY.svg")}/>
        <div data-b2-reveal="phone-only"><h2>Proven performance, Measurable results</h2><p>Our work is backed by measurable results. These numbers reflect the trust, success, and outcomes we&apos;ve delivered for our B2B partners across industries and regions.</p><div className={styles.statGrid}><span><b>4X</b>Average ROI on digital strategy projects</span><span><b>5</b>Countries served with B2B services</span></div></div>
      </section>

      <section className={styles.caseSection}>
        <article className={styles.caseCard} data-b2-reveal="wide-section">
          <div className={styles.caseHeading}><p className={styles.eyebrow}>{activeCase.category}</p><h2>{activeCase.title}</h2></div>
          <div className={styles.caseBody}>
            <div className={styles.caseMedia}><img alt={activeCase.title} src={asset(activeCase.image)}/></div>
            <div className={styles.caseInfo}><h3>{activeCase.client}</h3><div className={styles.caseNarrative}><span>Challenge:</span><p>{activeCaseHighlight.challenge}</p><span>Solution:</span><p>{activeCaseHighlight.solution}</p></div><div className={styles.caseResults}><div className={styles.caseResult}><b>{activeCase.result.split(" ")[0]}</b><span>{activeCase.result.split(" ").slice(1).join(" ")}</span></div><div className={styles.caseResult}><b>{activeCaseHighlight.secondaryResult[0]}</b><span>{activeCaseHighlight.secondaryResult[1]}</span></div></div><Link href={`${B2_PREFIX}/case-study/${activeCase.slug}`}><img alt="" aria-hidden="true" src={asset("lF4qvKFOOsAkrC72wGno0l1d2kg.svg")}/><span>View detail</span></Link></div>
          </div>
          <div className={styles.caseActions}><Link href={`${B2_PREFIX}/case-study`}>View all case studies</Link><div className={styles.sliderControls}><button aria-label="Previous case study" onClick={()=>setCaseStudy((caseStudy-1+4)%4)}><img alt="" aria-hidden="true" src={asset("U08uhWwzjVg0ZOCcOxp5TiajqY.svg")}/></button><button aria-label="Next case study" onClick={()=>setCaseStudy((caseStudy+1)%4)}><img alt="" aria-hidden="true" src={asset("diKpMYGUMuUC6uFkW70kaPTpdV0.svg")}/></button></div></div>
        </article>
      </section>

      <section aria-label="Featured case studies" className={styles.mobileCases}>
        {caseStudies.slice(0, 4).map((study) => (
          <article key={study.slug}>
            <div className={styles.mobileCaseHeading}>
              <p className={styles.eyebrow}>{study.category}</p>
              <h2>{study.title}</h2>
            </div>
            <img alt={study.title} src={asset(study.image)} />
            <div className={styles.mobileCaseInfo}>
              <h3>{study.client}</h3>
              <div className={styles.caseNarrative}><span>Challenge:</span><p>{caseHighlights[caseStudies.indexOf(study)]?.challenge}</p><span>Solution:</span><p>Introduced agile development workflows to accelerate feature deployment.</p></div>
              <div className={styles.caseResults}><div className={styles.caseResult}><b>{study.result.split(" ")[0]}</b><span>{study.result.split(" ").slice(1).join(" ")}</span></div><div className={styles.caseResult}><b>{caseHighlights[caseStudies.indexOf(study)]?.secondaryResult[0]}</b><span>{caseHighlights[caseStudies.indexOf(study)]?.secondaryResult[1]}</span></div></div>
              <Link href={`${B2_PREFIX}/case-study/${study.slug}`}>↳&nbsp; View detail</Link>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.steps}>
        <div className={styles.sectionBar} data-b2-reveal="all"><div><h2>Our method for strategic B2B growth</h2><p>Our streamlined 3-step approach ensures your business gets a focused strategy, practical solutions, and measurable outcomes.</p></div><ArrowLink href={`${B2_PREFIX}/service`}>Explore our services</ArrowLink></div>
        <div className={styles.stepVisual} data-active-step={activeStep + 1}>
          <div aria-hidden="true" className={styles.stepColumns}><span /><span /><span /></div>
          <img alt="" className={styles.stepShape} src={asset("X8QKXnvD0vuQAmNPaiuSiDWAII0.svg")} />
          <div aria-label="Method steps" className={styles.stepTabs} role="group">
            {methodSteps.map(([, title], index) => (
              <button
                aria-label={`Step ${index + 1}: ${title}`}
                aria-pressed={activeStep === index}
                key={title}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                Step {index + 1}
              </button>
            ))}
          </div>
          <div aria-live="polite" className={styles.stepGrid}>
            {methodSteps.map(([icon, title], index) => (
              <article data-active={activeStep === index} key={title}>
                <img alt="" src={asset(icon)} />
                <h3>{title}</h3>
                <span aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCta reveal />
    </main>
  );
}
