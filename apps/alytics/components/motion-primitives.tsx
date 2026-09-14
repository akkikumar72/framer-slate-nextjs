"use client";

import { useLiveReducedMotion as useReducedMotion } from './motion-preference';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';

export const revealSpring = { type: 'spring' as const, stiffness: 500, damping: 60, mass: 1 };
const MotionLink = motion.create(Link);

export function Reveal({ children, className = '', y = 60, delay = 0.2, threshold = 0.5, style }: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  threshold?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, amount: threshold });
  const reduced = useReducedMotion();
  return <motion.div ref={ref} className={`reveal ${className}`} style={style}
    data-reveal={entered || reduced ? 'visible' : 'waiting'}
    data-reveal-y={y} data-reveal-delay={delay} data-reveal-threshold={threshold}
    initial={{ opacity: 0, y }}
    animate={entered || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
    transition={reduced ? { duration: 0 } : { ...revealSpring, delay }}>
    {children}
  </motion.div>;
}

export function Button({ href = '/alytics/newsletter', children, className = '' }: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const text = typeof children === 'string' ? children : null;
  const external = href.startsWith('https://');
  return <MotionLink href={href} className={`button ${className}`}
    target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
    onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
    onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}
    animate={{ backgroundColor: hovered ? '#0863e1' : '#126dfb', boxShadow: hovered
      ? '0px 0.421531px 0.927368px -0.416667px rgba(18,109,251,.11),0px 1.601973px 3.524341px -0.833333px rgba(18,109,251,.15),0px 7px 15.4px -1.25px rgba(18,109,251,.3)'
      : '0px 0px 0px 0px rgba(18,109,251,0)' }}
    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40, mass: 1 }}>
    {text ? <><span className="button-measure">{text}</span><span className="button-roll" aria-hidden="true">
      {[...text].map((character, index) => <motion.span key={index}
        animate={{ y: hovered && !reduced ? -21 : 0 }}
        transition={reduced ? { duration: 0 } : { type: 'spring', duration: 0.4, bounce: 0, delay: 0.4 / text.length * index * 0.4 }}>
        {character === ' ' ? '\u00a0' : character}
      </motion.span>)}
    </span></> : children}
  </MotionLink>;
}
