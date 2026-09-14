'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Button } from './shared';

const hiddenWord = { opacity: 0.001, y: 10, filter: 'blur(10px)' };
const visibleWord = { opacity: 1, y: 0, filter: 'blur(0px)' };
const hiddenContent = { opacity: 0, y: 30 };
const visibleContent = { opacity: 1, y: 0 };
const viewport = { once: true, amount: 0 } as const;

export function HeroCopy() {
  const reduceMotion = useReducedMotion();

  function word(text: string, index: number) {
    return (
      <motion.span
        className="hero-word"
        data-hero-animated
        initial={reduceMotion ? false : hiddenWord}
        whileInView={visibleWord}
        viewport={viewport}
        transition={reduceMotion
          ? { duration: 0 }
          : { type: 'spring', bounce: 0, duration: 0.8, delay: 0.3 + index * 0.1 }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <div className="hero-copy">
      <h1>
        {word('Award', 0)}{' '}{word('Winning', 1)}<br />
        {word('Creative', 2)}{' '}{word('Digital', 3)}<br className="agency-break" />{' '}
        {word('Agency', 4)}
      </h1>
      <motion.p
        data-hero-animated
        initial={reduceMotion ? false : hiddenContent}
        whileInView={visibleContent}
        viewport={viewport}
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 1 }}
      >
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      </motion.p>
      <motion.div
        className="hero-cta"
        data-hero-animated
        initial={reduceMotion ? false : hiddenContent}
        whileInView={visibleContent}
        viewport={viewport}
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 1, delay: 0.2 }}
      >
        <Button href="/hulio/about">Know More About Us</Button>
      </motion.div>
    </div>
  );
}
