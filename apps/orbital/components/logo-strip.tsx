"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import "./logo-strip.css";

const logos = [
  ["LXa4bL1WyPSisWXws8VdpceFaY", "Prismic"],
  ["IoJelUGGQPfDrRg5B7kODmbN8", "Hormone Health Network"],
  ["TR54E7253xhnqLupH2YOGR0eh4", "mparticle"],
  ["VkcKgMGsVvyjRvCit8YUUw2Po4", "amwell"],
  ["Uw65pZeKoK3qFs8T2aCJ6IrQ", "CLEAR"],
  ["b97y5PgQoGGycjQzjR0B622Nql4", "PixelGrid"],
] as const;

export function LogoStrip() {
  const track = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const [groups, setGroups] = useState(4);

  useEffect(() => {
    const desktop = matchMedia("(min-width: 1440px)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setGroups(Math.max(4, Math.ceil(innerWidth / 1360) + 2));
      animation.current?.cancel();
      animation.current = desktop.matches && !reducedMotion.matches && track.current
        ? track.current.animate([{ transform: "translateX(-1360px)" }, { transform: "translateX(-2720px)" }], { duration: 1360 / 60 * 1000, iterations: Infinity })
        : null;
    };
    update();
    window.addEventListener("resize", update);
    reducedMotion.addEventListener("change", update);
    return () => { window.removeEventListener("resize", update); reducedMotion.removeEventListener("change", update); animation.current?.cancel(); };
  }, []);

  return <section className="orb-brand-section" aria-label="Trusted teams">
    <div className="orb-container orb-brand-frame">
      <p>Trusted by modern product and engineering teams.</p>
      <div className="orb-logo-rail" onMouseEnter={() => animation.current?.updatePlaybackRate(.75)} onMouseLeave={() => animation.current?.updatePlaybackRate(1)}>
        <div className="orb-logo-rail-track" ref={track}>
          {Array.from({ length: groups }, (_, group) => <div className="orb-logo-group" key={group} aria-hidden={group > 0}>{logos.map(([id, name]) => <div className="orb-logo-cell" key={id}><img src={asset(id)} alt={name} /></div>)}</div>)}
        </div>
      </div>
    </div>
  </section>;
}
