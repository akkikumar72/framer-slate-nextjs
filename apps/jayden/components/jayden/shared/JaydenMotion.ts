"use client";

import { useEffect } from "react";

export function useJaydenRevealMotion(routeKey: string) {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-jayden-reveal]"),
    );
    const completionTimers: number[] = [];

    const showElement = (element: HTMLElement) => {
      element.dataset.jaydenVisible = "true";
      const delay = Number.parseFloat(
        getComputedStyle(element).getPropertyValue("--jayden-delay"),
      );
      completionTimers.push(
        window.setTimeout(
          () => {
            element.dataset.jaydenMotionDone = "true";
          },
          900 + (Number.isFinite(delay) ? delay : 0),
        ),
      );
    };

    if (reducedMotion.matches) {
      elements.forEach((element) => {
        element.dataset.jaydenVisible = "true";
        element.dataset.jaydenMotionDone = "true";
      });
      return;
    }

    root.dataset.jaydenMotionReady = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          showElement(element);
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -9% 0px",
        threshold: 0.08,
      },
    );

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        showElement(element);
      } else {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      completionTimers.forEach((timer) => window.clearTimeout(timer));
      delete root.dataset.jaydenMotionReady;
    };
  }, [routeKey]);
}
