'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
export function Reveal({ children, className = '' }: {
    children: ReactNode;
    className?: string;
}) {
    const element = useRef<HTMLDivElement>(null);
    useEffect(() => { const node = element.current; if (!node || matchMedia('(prefers-reduced-motion: reduce)').matches)
        return; if (node.getBoundingClientRect().top > innerHeight) {
        node.classList.add('reveal-pending');
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) {
            node.classList.remove('reveal-pending');
            observer.disconnect();
        } }, { threshold: .08 });
        observer.observe(node);
        return () => observer.disconnect();
    } }, []);
    return <div ref={element} className={`reveal ${className}`}>{children}</div>;
}
export function Counter({ value, suffix = '' }: {
    value: number;
    suffix?: string;
}) {
    const span = useRef<HTMLSpanElement>(null);
    const [count, setCount] = useState(value);
    useEffect(() => { const node = span.current; if (!node || matchMedia('(prefers-reduced-motion: reduce)').matches)
        return; setCount(0); let frame = 0; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting)
        return; observer.disconnect(); const start = performance.now(); const tick = (now: number) => { const progress = Math.min((now - start) / 1600, 1); setCount(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1)
        frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); }, { threshold: .2 }); observer.observe(node); return () => { observer.disconnect(); cancelAnimationFrame(frame); }; }, [value]);
    return <span ref={span} className="counter"><span>{count}</span>{suffix && <span className="counter-suffix">{suffix}</span>}</span>;
}
