import { Reveal } from "./motion-primitives";
export { Button, Reveal } from "./motion-primitives";

export function Logo() {
  return <span className="logo"><img src="/alytics/alytics-logo.svg" width="30" height="30" alt="" /><span>Alytics</span></span>;
}

export function SectionHeading({ label, title, description, animate = true }: { label: string; title: string; description: string; animate?: boolean }) {
  return <div className="section-heading">
    {animate ? <Reveal y={40} delay={0.1}><span className="badge">{label}</span></Reveal> : <span className="badge">{label}</span>}
    <div className="section-heading-text">
      {animate ? <><Reveal y={60} delay={0.2}><h2>{title}</h2></Reveal><Reveal y={60} delay={0.3}><p>{description}</p></Reveal></> : <><h2>{title}</h2><p>{description}</p></>}
    </div>
  </div>;
}

export { NewsletterCTA } from './NewsletterCTA';
