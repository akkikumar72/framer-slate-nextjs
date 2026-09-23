"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MediaFrame } from "@/components/ui";
import styles from "./project.module.css";

export function ProjectImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        className={styles.imageTrigger}
        style={
          { "--project-image-aspect": `${width} / ${height}` } as CSSProperties
        }
        type="button"
        aria-label={`Enlarge ${alt}`}
        onClick={() => setOpen(true)}
      >
        <MediaFrame src={src} alt={alt} className={styles.detailImage} />
      </button>
      {open && (
        <dialog
          ref={dialog}
          className={styles.lightbox}
          aria-label="Project image preview"
          data-testid="project-image-backdrop"
          onClose={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setOpen(false)}
            aria-label="Close image preview"
          >
            Close
          </button>
          <button
            type="button"
            className={styles.lightboxImage}
            aria-label="Close image preview"
            onClick={() => setOpen(false)}
          >
            <img src={src} alt={alt} width={width} height={height} />
          </button>
        </dialog>
      )}
    </>
  );
}
