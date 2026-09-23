"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
export function Ticker({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className} data-running={running} tabIndex={0} aria-label="Client testimonials. Hover or focus to pause.">{children}</div>;
}
