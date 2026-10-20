"use client";

import { type FormEvent, useState } from "react";
import { asset } from "@/lib/site-data";
import styles from "./StaticPages.module.css";
import { StaticMotion } from "./StaticMotion";

const faqs = [
  ["What are common manufacturing processes?","The most common manufacturing processes include CNC machining, injection molding, 3D printing (additive manufacturing), sheet metal fabrication, casting, and automated assembly."],
  ["What services do you offer?","We offer strategy consulting, UX/UI design, website development, and digital transformation solutions."],
  ["What industries do you specialize in?","We specialize in technology, finance, healthcare, logistics, manufacturing, and professional services."],
  ["How are materials chosen?","Material selection depends on mechanical properties, durability, cost, environmental factors, and production process compatibility. Advanced manufacturing often involves lightweight metals, composites, or polymers to improve performance and reduce costs."],
  ["How long does a typical consulting engagement last?","Most projects run 4–12 weeks, depending on scope, with ongoing support available if needed."],
  ["What sets your consulting firm apart?","We combine strategic insight with execution-ready design and development to deliver real business results."],
] as const;

export function ContactPage(){
  const [open,setOpen]=useState(0);
  const [sent,setSent]=useState(false);
  const [valid,setValid]=useState(false);
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setSent(true)}
  return <main className={styles.page}>
    <StaticMotion/>
    <section className={styles.contactPanel}>
      <div className={styles.contactHero}><h1>Connect with us</h1><p>Let’s start a conversation that moves your business forward.</p></div>
      <div className={styles.contactDetails}>{[["d0FggAdF3v9gVmO3ZWpBqGz35HQ.svg","Email","support@example.com"],["spX5VavcoouWHBTROqkXBlKJLWE.svg","Phone","+1 (800) 456-7890"],["1ClaDdRxEtRT8xD5buBHj16PM.svg","Office address","Your B2B Consulting Co. 120 Business Avenue, NY 10001, USA"]].map(([icon,title,value])=><article key={title}><div><img alt="" src={asset(icon)}/><h2>{title}</h2></div><p>{title==="Email"?<a href={`mailto:${value}`}>{value}</a>:title==="Phone"?<a href="tel:+18004567890">{value}</a>:value}</p></article>)}</div>
      <form className={styles.contactForm} onInput={event=>setValid(event.currentTarget.checkValidity())} onSubmit={submit}><label>Name*<input name="name" placeholder="Your name" required/></label><label>Email*<input name="email" placeholder="Your email address" required type="email"/></label><label>Phone*<input name="phone" placeholder="Your phone number" required type="tel"/></label><label>Message<textarea name="message" placeholder="Write your message here"/></label><button disabled={!valid} type="submit">Send message</button>{sent&&<p aria-live="polite">Thanks. This local preview does not transmit form data.</p>}</form>
    </section>
    <section className={styles.faq}><h2>Frequently asked questions</h2><div className={styles.faqColumns}><div>{faqs.map(([question,answer],index)=><div className={styles.faqItem} key={question}><button aria-controls={`contact-faq-${index}`} aria-expanded={open===index} onClick={()=>setOpen(open===index?-1:index)}><span>{String(index+1).padStart(2,"0")}.</span><span>{question}</span><i aria-hidden="true">{open===index?"−":"+"}</i></button><div hidden={open!==index} id={`contact-faq-${index}`}><p>{answer}</p></div></div>)}</div><img alt="B2B consultant working with a client" src={asset("g6qy1PW2Ru5mqtOiE8nYKDXaNA.jpg")}/></div></section>
  </main>
}
