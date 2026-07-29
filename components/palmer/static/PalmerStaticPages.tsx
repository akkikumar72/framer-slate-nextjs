"use client";

import Link from "next/link";
import { type CSSProperties, type PointerEvent, useRef } from "react";
import { palmerAsset } from "../assets";
import { Eyebrow } from "../shared/PalmerShell";
import styles from "./PalmerStaticPages.module.css";

const galleryMedia = [
  { src: palmerAsset("OSi9o75iDVuZiGamIk9aSmb6HHI.png"), depth: 0.45 },
  { src: palmerAsset("rOQYaZXQCrRwFCBvFvQvQ2Zvm0.mp4"), depth: 0.8, video: true },
  { src: palmerAsset("YxK2kyMSXDwqtlKpiPq0jLJ9o.png"), depth: 0.6 },
  { src: palmerAsset("ykB2unblGBc4DohSe1vhH0DUD4.png"), depth: 0.9 },
  { src: palmerAsset("KLvrs0tg1z4LY8ajUcoLnr8I8U.png"), depth: 0.55 },
  { src: palmerAsset("dfa6kXeZNdp07AUexK86lC0Av1Q.png"), depth: 0.7 },
  { src: palmerAsset("iiGTolB7dNCehqd8pKKhmB9uo.png"), depth: 0.5 },
  { src: palmerAsset("n6qKLSNOWse4XjIvQ1XrrD66oE.png"), depth: 0.84 },
];

const lostMedia = [
  "rmeBLxZhEpvUaEnrIirzHJQynwc.png",
  "D5DNZqI6mcEFCYSZWhnmUO1zKY.png",
  "7uG4BhwVaiwETVmXbIX3b81RuRw.png",
  "3E2J9orCMTWzLWz1Wycx5lBwyAo.png",
  "YxK2kyMSXDwqtlKpiPq0jLJ9o.png",
  "6r6tLlKin4YdRCER0gZK7UJpWI.png",
  "OAptuWFNfA2ykYxM7NRYIeUI3Xc.png",
  "7WVAcnCw5jrTdcET3CmMrpU7gf0.png",
  "svmMd86RbsKfib7KzvpKAUsHrk.png",
  "cbnxN8O3gBHbXDKR01AwSLGUGXo.png",
].map(palmerAsset);

export function PalmerGallery() {
  const stage = useRef<HTMLDivElement>(null);

  function move(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.current?.style.setProperty("--pointer-x", `${x * 50}px`);
    stage.current?.style.setProperty("--pointer-y", `${y * 38}px`);
  }

  function reset() {
    stage.current?.style.setProperty("--pointer-x", "0px");
    stage.current?.style.setProperty("--pointer-y", "0px");
  }

  return (
    <section
      className={styles.gallery}
      onPointerLeave={reset}
      onPointerMove={move}
      ref={stage}
    >
      <Eyebrow index="01">Gallery</Eyebrow>
      <div className={styles.galleryTitle}>
        <h1>Gallery<sup>©</sup></h1>
        <Link href="/palmer/contact">Contact Now ↗</Link>
      </div>
      <div className={styles.galleryGrid}>
        {galleryMedia.map((item, index) => {
          const style = { "--depth": item.depth } as CSSProperties;
          return (
            <figure
              className={`${styles.galleryItem} ${styles[`galleryItem${index + 1}`]}`}
              key={item.src}
              style={style}
            >
              {item.video ? (
                <video
                  aria-label="Palmer gallery motion study"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={item.src}
                />
              ) : (
                <img alt="" src={item.src} />
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export function PalmerContact() {
  const rows = [
    ["Office", "Office: Tokyo, Japan.", "https://maps.google.com/?q=Tokyo%2C%20Japan"],
    ["Instagram", "Follow me on Instagram", "https://instagram.com/"],
    ["Phone", "+1 34566 4565", "tel:+1345664565"],
    ["Email", "sayhi@akihiko.com", "mailto:sayhi@akihiko.com"],
  ];

  return (
    <section className={styles.contact}>
      <div className={styles.contactGrid}>
        <figure className={styles.contactPortrait}>
          <img
            alt="Editorial portrait in architectural light"
            src={palmerAsset("BChNf0ssn5x1I9kAk4vwX8qT5o.png")}
          />
        </figure>
        <div className={styles.contactLinks}>
          {rows.map(([label, value, href]) => (
            <a
              href={href}
              key={label}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              target={href.startsWith("http") ? "_blank" : undefined}
            >
              <span>{label}</span>
              <strong>{value}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.contactBand}>
        <span>24/7 Support</span>
        <span>Remote</span>
      </div>
      <h1 className={styles.contactTitle}>Contact Now</h1>
    </section>
  );
}

export function PalmerNotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.notFoundSticky}>
        <Eyebrow index="404">Lost page</Eyebrow>
        <div className={styles.notFoundTitle}>
          <h1>
            Page
            <br />
            Not Found.
          </h1>
          <Link href="/palmer">Go Home ↗</Link>
        </div>
        <div aria-hidden="true" className={styles.lostField}>
          {lostMedia.map((src, index) => (
            <img alt="" key={src} src={src} style={{ "--index": index } as CSSProperties} />
          ))}
        </div>
      </div>
    </section>
  );
}
