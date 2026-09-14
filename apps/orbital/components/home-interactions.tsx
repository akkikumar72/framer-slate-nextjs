"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import { Counter } from "./shared";

const useCases = [
  { name: "Sales", title: "Pipeline agents that never sleep.", copy: "Research accounts, draft outreach, log activity, and follow up in your CRM.", points: ["Auto-enriched account research", "Personalized multi-touch sequences", "Writes back to Salesforce & HubSpot"], image: "YSxkkQ1mO5jLl5iERbClYTnWkM", metric: "Reply rate", value: 38, suffix: "+", note: "// vs. templated outbound, 90-day average" },
  { name: "Ops", title: "Back-office tasks fully automated", copy: "Reconcile data, process documents, and trigger actions with human approval.", points: ["Document extraction with review", "Policy-aware approval routing", "Connects ERP, ticketing & email"], image: "nX4JIDL4YfmE8fEo5g8sXcapneE", metric: "Saved per person / week", value: 9, suffix: "h", note: "// measured across 40 operations teams" },
  { name: "Support", title: "Resolutions you can actually audit.", copy: "Answer tickets with grounded, cited responses  and escalate cleanly the moment confidence drops.", points: ["Retrieval-grounded answers", "Confidence-based escalation", "Full transcript + source trail"], image: "57ZmEUbBmoDJwsGjnggXyssSQK8", metric: "Auto-resolution rate", value: 64, suffix: "%", note: "// on tier-1 volume after 30 days" },
  { name: "Research", title: "Multi-step research with citations.", copy: "Plan, gather, and synthesize across sources  every claim linked back to exactly where it came from.", points: ["Parallel source gathering", "Inline citations on every claim", "Reviewer agent checks the draft"], image: "yGorPaItqSal60cUbctnfJepipE", metric: "Faster briefs", value: 5, suffix: "x", note: "// from hours to minutes per report" },
] as const;

export function UseCases() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = useCases[active];
  return <div className="home-use-cases"><div className="home-tabs" role="tablist" aria-label="Agent use cases">{useCases.map((entry, i) => <button key={entry.name} ref={node => { tabs.current[i] = node; }} type="button" role="tab" id={`use-case-tab-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} aria-controls="use-case-panel" onClick={() => setActive(i)} onKeyDown={event => { let next = active; if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (active + 1) % 4; else if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (active + 3) % 4; else if (event.key === "Home") next = 0; else if (event.key === "End") next = 3; else return; event.preventDefault(); setActive(next); tabs.current[next]?.focus(); }}>{entry.name}</button>)}</div><div className="home-use-panel" id="use-case-panel" role="tabpanel" aria-labelledby={`use-case-tab-${active}`}><div className="home-use-copy" key={item.name}><div><h3>{item.title}</h3><p>{item.copy}</p></div><ul>{item.points.map(point => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul></div><div className="home-use-art"><img src={asset(item.image)} alt={`${item.name} agent workflow`} width="228" height="228" /><div><p>{item.metric}</p><div className="home-use-stat"><strong><Counter key={item.name} value={item.value} suffix={item.suffix} /></strong><span>{item.note}</span></div></div></div></div></div>;
}

const testimonials = [
  { quote: "“We replaced our internal tools with Orbital and cut our agent incident rate by 70%. The step-level tracing alone paid for itself in a quarter.”", name: "Priya Rao", role: "CTO, Northwind" },
  { quote: "“We replaced our internal workflows with Orbital and reduced our agent error rate by 65%. The real-time monitoring saved our team hours.”", name: "Daniel Kim", role: "Product Lead, Nova" },
  { quote: "We replaced our manual processes with Orbital and improved our agent reliability by 68%. The observability transformed our workflow.", name: "Maya Chen", role: "Head, Vertex" },
  { quote: "“We replaced our legacy tools with Orbital and reduced our agent failure rate by 72%. The step-level insights made a huge difference.”", name: "Alex Morgan", role: "VP, Luma AI" },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [small, setSmall] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetting, setResetting] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia("(max-width:1439px)");
    const update = () => { setSmall(query.matches); setIndex(0); };
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const items = small ? testimonials.filter(item => item.name !== "Daniel Kim") : testimonials;
  useEffect(() => {
    if (!carousel.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(carousel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !visible || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex(value => value + 1), matchMedia("(max-width:809px)").matches ? 2000 : 2600);
    return () => clearInterval(timer);
  }, [paused, visible, small]);
  useEffect(() => {
    if (!resetting) return;
    let frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => setResetting(false)); });
    return () => cancelAnimationFrame(frame);
  }, [resetting]);
  return <div ref={carousel} className="home-testimonials" aria-label="Customer testimonials" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}><div className="home-testimonial-window"><div className="home-testimonial-track" onTransitionEnd={() => { if (index >= items.length) { setResetting(true); setIndex(index % items.length); } }} style={{ transform: `translateX(calc(${index} * -1 * (var(--testimonial-width) + 16px)))`, transition: resetting ? "none" : undefined }}>{[...items, ...items, ...items].map((item, i) => <figure key={`${item.name}-${i}`} aria-hidden={i >= items.length}><blockquote>{item.quote}</blockquote><figcaption><div><strong>{item.name}</strong><span>{item.role}</span></div><img src="/orbital/assets/testimonial-stars.svg" width="124" height="20" alt="5 out of 5 stars" /></figcaption></figure>)}</div></div><div className="home-carousel-controls"><button type="button" aria-label="Previous testimonial" onClick={() => setIndex((index + items.length - 1) % items.length)}><img src={asset("6tTbkXggWgQCAJ4DO2QEdXXmgM")} alt="" /></button><button type="button" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % items.length)}><img src={asset("11KSGbIZoRSg4pjdnUoif6MKHI")} alt="" /></button></div></div>;
}
