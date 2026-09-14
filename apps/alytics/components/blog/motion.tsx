'use client';

import { useLiveReducedMotion as useReducedMotion } from '../motion-preference';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

const MotionLink = motion.create(Link);
const spring = { type: 'spring', stiffness: 500, damping: 60, mass: 1 } as const;

export function BlogCardLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return <MotionLink href={href} className={className} initial={false} animate="rest" whileHover={reducedMotion ? undefined : 'hover'}>{children}</MotionLink>;
}

export function BlogImage({ src, alt }: { src: string; alt: string }) {
  return <motion.img src={src} alt={alt} width={1200} height={840} variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }} transition={spring} />;
}

export function ViewAllLink() {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? { duration: 0 } : spring;
  return <MotionLink href="/alytics/blog" initial={false} animate="rest" whileHover="hover" variants={{ rest: { opacity: 1 }, hover: { opacity: 0.64 } }} transition={transition}>
    View all <motion.svg viewBox="0 0 256 256" width="20" height="20" aria-hidden="true" variants={{ rest: { rotate: 0 }, hover: { rotate: reducedMotion ? 0 : -45 } }} transition={transition}><path fill="currentColor" d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" /></motion.svg>
  </MotionLink>;
}
