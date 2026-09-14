import type { Metadata } from "next";
import assets from "./assets.json";

export function asset(id: keyof typeof assets): string { return assets[id]; }
export function pageMetadata(title: string, path = "", description = "Production infrastructure for teams shipping AI agents into the real world."): Metadata {
  const canonical = `/orbital${path}`;
  return { title: `${title} | Orbital AI`, description, alternates: { canonical }, openGraph: { title, description, url: canonical, images: [asset("oLjGHEJ7nCzXu1XG8qs5wIrnSs")] } };
}
