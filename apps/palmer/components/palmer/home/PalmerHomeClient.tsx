"use client";

import {
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./PalmerHome.module.css";

export function PalmerHomeMotion() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(
      "[data-palmer-client-section]",
    );
    const scene = document.querySelector<HTMLElement>(
      "[data-palmer-client-scene]",
    );

    if (!section || !scene) {
      return;
    }

    const motionFrames = [
      [
        [371, 546, 501, 337, 0],
        [-180, 320, 330, 235, -7],
        [351, 167, 230, 194, 4],
        [504, -336, 235, 158, -3],
      ],
      [
        [919, 707, 203, 331, 7],
        [214, 238, 442, 351, -4],
        [152, 149, 175, 266, 5],
        [261, -326, 218, 220, -2],
      ],
      [
        [1004, 885, 118, 271, -5],
        [715, 484, 368, 348, 3],
        [1290, 360, 236, 290, 7],
        [122, -300, 118, 287, -4],
      ],
      [
        [765, 985, 218, 213, 6],
        [1260, 620, 260, 250, -5],
        [214, 371, 442, 349, 3],
        [122, -205, 203, 331, -3],
      ],
      [
        [504, 1095, 235, 158, -4],
        [864, 778, 195, 246, 6],
        [715, 614, 368, 351, -3],
        [371, 25, 501, 337, 0],
      ],
    ];
    const offsets = [0, 0.43, 0.87, 1];
    let animations: Animation[] = [];

    const createAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];

      if (window.innerWidth < 1200) {
        return;
      }

      const scaleX = window.innerWidth / 1244;
      const scaleY = Math.min(1, window.innerHeight / 1196);
      const cards = Array.from(
        scene.querySelectorAll<HTMLElement>("[data-palmer-client-card]"),
      );

      animations = cards.map((card, index) => {
        const keyframes = motionFrames[index].map(
          ([left, top, width, height, rotate], frameIndex) => ({
            height: `${height * scaleY}px`,
            left: `${left * scaleX}px`,
            offset: offsets[frameIndex],
            top: `${top * scaleY}px`,
            transform: `rotate(${rotate}deg)`,
            width: `${width * scaleX}px`,
          }),
        );
        const animation = card.animate(keyframes, {
          duration: 1000,
          fill: "both",
        });
        animation.pause();
        return animation;
      });
    };

    const update = () => {
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - section.offsetTop) / travel),
      );
      animations.forEach((animation) => {
        animation.currentTime = progress * 1000;
      });
    };

    createAnimations();
    update();
    window.addEventListener("resize", createAnimations);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener("resize", createAnimations);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return null;
}

type PalmerDeferredVideoProps = {
  className?: string;
  src: string;
};

export function PalmerDeferredVideo({
  className,
  src,
}: PalmerDeferredVideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !video.current) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduceMotion) {
      void video.current.play().catch(() => undefined);
    }
  }, [active]);

  return (
    <video
      aria-hidden="true"
      className={className}
      data-palmer-deferred-video
      loop
      muted
      playsInline
      preload="none"
      ref={video}
    >
      {active ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}

type PalmerHeroReelProps = {
  label: string;
  posterSrc: string;
  videoSrc: string;
};

export function PalmerHeroReel({
  label,
  posterSrc,
  videoSrc,
}: PalmerHeroReelProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    if (!element) {
      return;
    }

    if (open && !element.open) {
      element.showModal();
    } else if (!open && element.open) {
      element.close();
    }
  }, [open]);

  const close = () => setOpen(false);
  const closeFromBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-label={`Play ${label}`}
        className={styles.heroMedia}
        data-palmer-reel
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className={styles.heroReelTilt}>
          <img
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
            src={posterSrc}
          />
        </span>
        <span className={styles.heroMediaLabel}>Play Reel</span>
      </button>
      <dialog
        aria-label={label}
        className={styles.reelDialog}
        onCancel={close}
        onClick={closeFromBackdrop}
        onClose={close}
        ref={dialog}
      >
        {open ? (
          <div className={styles.reelDialogInner}>
            <button
              aria-label="Close reel"
              className={styles.reelDialogClose}
              onClick={close}
              type="button"
            >
              Close
            </button>
            <video
              aria-label={label}
              autoPlay
              controls
              playsInline
              preload="metadata"
              src={videoSrc}
            />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
