"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useLiveReducedMotion } from "../motion-preference";
import styles from "./sections.module.css";

// Source artwork geometry in its original 554 × 504 viewBox.
const spiralPath = "M552.252 227.051C548.029 306.06 512.971 378.902 455.545 430.344C400.585 479.577 327.738 506.39 252.252 502.051C181.842 498.004 114.56 466.734 66.6361 412.667C22.0061 362.315 -2.09651 295.787 2.25209 227.051C6.32059 162.744 35.3062 101.999 84.3141 59.1129C130.089 19.0564 190.301 -2.3067 252.252 2.0509C309.676 6.09001 364.17 32.2761 402.512 76.7909C437.912 117.89 456.63 171.763 452.252 227.051C448.208 278.129 424.467 326.176 384.835 359.634C348.269 390.502 300.695 406.437 252.252 402.051C207.796 398.026 166.087 376.909 137.347 341.956C111.016 309.933 97.8551 268.651 102.252 227.051C106.263 189.106 124.83 153.774 155.025 129.824C182.472 108.054 217.447 97.6339 252.252 102.051C283.787 106.053 312.708 122.137 331.802 147.501C349.184 170.594 356.655 199.315 352.252 227.051C348.202 252.565 334.364 274.9 314.124 288.923C295.634 301.733 273.22 306.492 252.252 302.051C233.275 298.032 217.287 286.766 208.058 271.245C199.787 257.335 197.75 241.215 202.252 227.051C206.273 214.401 215.087 204.843 225.735 200.534C235.225 196.695 245.107 197.508 252.252 202.051C258.669 206.132 261.767 212.558 261.091 218.212";
const logos = ["XwXTIGo3dfg1UWsZHBywuXRYL3U.svg", "eVjzRlQaoksuFPA5aE9XkOGUdMo.svg", "BguZZdltxZZck54LLxhY0so.svg", "Lc6nd4uTtDD5RwrzeFVZF4mbog4.svg", "dWUFmWTPRBM2RCwSgLC5b6fOW9Y.svg", "P40mwgPc6hK1mdXHYNtxKsCXjd4.svg", "Rndn3mVm4TjZly2Zuu09BinAqFE.svg", "CnPcEVGMrd4YoVCBaJbzAgepeWY.svg", "aLDs1AyU421ZOAoxVXXctKL8.svg"];

function OrbitItem({ index, count, progress, reducedMotion }: { index: number; count: number; progress: MotionValue<number>; reducedMotion: boolean }) {
  const phase = useTransform(progress, value => ((value + index * 100 / count) % 100 + 100) % 100);
  const offsetDistance = useTransform(phase, value => `${value}%`);
  const opacity = useMotionValue(0);
  const zIndex = useTransform(phase, value => Math.floor(1 + value / 10));

  useEffect(() => {
    const updateOpacity = (value: number) => opacity.set(reducedMotion ? 1 : Math.max(0, Math.min(1, value / 10, (100 - value) / 10)));
    updateOpacity(phase.get());
    return phase.on("change", updateOpacity);
  }, [opacity, phase, reducedMotion]);

  return <motion.div className={styles.orbitItem} style={{ offsetDistance, opacity, zIndex }}>
    <div className={styles.orbitLogo}><img src={`/alytics/${logos[index % logos.length]}`} width={40} height={40} alt="" loading="lazy" /></div>
  </motion.div>;
}

export function IntegrationOrbit() {
  const field = useRef<HTMLDivElement>(null);
  const firstFrame = useRef(true);
  const progress = useMotionValue(0);
  const reducedMotion = useLiveReducedMotion();
  const [path, setPath] = useState(spiralPath);
  const [count, setCount] = useState(36);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    // The source's nominal speed of 1 includes a 0.005 scroll factor even
    // with scroll response disabled. Its first frame reverses before settling.
    progress.set(progress.get() + (firstFrame.current ? -1 : 1) * delta / 1000 * 1.005);
    firstFrame.current = false;
  });

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 809.98px)");
    const updateCount = () => setCount(phone.matches ? 45 : 36);
    updateCount();
    phone.addEventListener("change", updateCount);
    return () => phone.removeEventListener("change", updateCount);
  }, []);

  useEffect(() => {
    if (!field.current) return;
    const resize = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const width = field.current?.offsetWidth ?? Math.round(entry.contentRect.width);
      const height = field.current?.offsetHeight ?? Math.round(entry.contentRect.height);
      const scale = Math.min(width / 554, height / 504);
      const x = (width - 554 * scale) / 2;
      const y = (height - 504 * scale) / 2;
      let coordinate = 0;
      setPath(spiralPath.replace(/-?\d*\.?\d+/g, value => String(Number(value) * scale + (coordinate++ % 2 === 0 ? x : y))));
    });
    resize.observe(field.current);
    return () => resize.disconnect();
  }, []);

  return <div ref={field} className={styles.orbitField} aria-hidden="true" style={{ "--orbit-path": `path("${path}")` } as CSSProperties}>
    {logos.flatMap((_, logoIndex) => Array.from({ length: count / logos.length }, (_, repetition) => {
      const index = repetition * logos.length + logoIndex;
      return <OrbitItem key={index} index={index} count={count} progress={progress} reducedMotion={reducedMotion} />;
    }))}
  </div>;
}
