"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

// The CSS fallback handles the first paint; this subscription also stops work
// when the system preference changes during an entrance animation.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
