"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import styles from "./page.module.css";

const people = [
  ["Alex Kim", "Co-founder & CEO", "zliDir1ebnyc9kDDg3ugb1IsqEo"],
  ["Maya Reyes", "Co-founder & CTO", "4s9ijYplXd4m6oQnx8bXN05DM"],
  ["Jordan Tan", "VP Engineering", "Tnm0lSyd8R8hp2pk9dVC1X34JM"],
  ["Sofia Novak", "VP Product", "z7ttCGIlNC0gXaxEaaIL3fPBPQ"],
] as const;

export function Leadership() {
  const track = useRef<HTMLDivElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * 340, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      setCanPrevious(element.scrollLeft > 1);
      setCanNext(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={styles.leadership}>
      <div className={styles.people} ref={track}>
        {people.map(([name, role, image]) => (
          <article className={styles.person} key={name}>
            <img src={asset(image)} alt={name} />
            <div><h3>{name}</h3><p>{role}</p></div>
          </article>
        ))}
      </div>
      <div className={styles.controls} aria-label="Slideshow pagination controls">
        <button type="button" aria-label="Previous" disabled={!canPrevious} onClick={() => move(-1)}>←</button>
        <button type="button" aria-label="Next" disabled={!canNext} onClick={() => move(1)}>→</button>
      </div>
    </div>
  );
}
