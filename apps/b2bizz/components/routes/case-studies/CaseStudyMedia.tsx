"use client";

import { useRef } from "react";
import { asset } from "@/lib/site-data";
import styles from "./CaseStudies.module.css";

export function CaseStudyMedia({ image, alt }: { image: string; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button aria-label={`Enlarge ${alt.toLowerCase()}`} className={styles.zoomImage} onClick={() => dialog.current?.showModal()} type="button"><img alt={alt} src={asset(image)} loading="lazy" /></button>
    <dialog aria-label={`Enlarged ${alt.toLowerCase()}. Press Escape or click to close.`} className={styles.lightbox} onClick={() => dialog.current?.close()} ref={dialog}><img alt={alt} src={asset(image)} /></dialog>
  </>;
}
