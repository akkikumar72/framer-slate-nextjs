"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useAnimationControls, useInView } from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";

/** A real initial pose is rendered on the server, so entrance springs never skip a paint. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  bounce = 0,
  scale = false,
  x = 0,
  y = 10,
  name,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  bounce?: number;
  scale?: boolean | number;
  x?: number;
  y?: number;
  name?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const reducedMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const visible = inView || reducedMotion || focused;
  const controls = useAnimationControls();

  useEffect(() => {
    if (reducedMotion || focused) {
      controls.stop();
      controls.set("visible");
    } else {
      void controls.start(visible ? "visible" : "hidden");
    }
  }, [controls, focused, reducedMotion, visible]);

  return (
    <motion.div
      ref={ref}
      data-reveal={reducedMotion ? "static" : visible ? "visible" : "waiting"}
      data-motion={name}
      className={`nue-reveal ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x, y, scale: scale === true ? 0.9 : scale || 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      }}
      transition={
        reducedMotion || focused
          ? { duration: 0, delay: 0 }
          : { type: "spring", duration, bounce, delay }
      }
      onFocusCapture={() => setFocused(true)}
    >
      {children}
    </motion.div>
  );
}
