"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function snapshot() {
  return window.matchMedia(query).matches;
}

function serverSnapshot() {
  return false;
}

/** Responds to preference changes without requiring a page reload. */
export function useLiveReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
