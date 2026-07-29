import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: "/Trillo/404",
  },
};

export default function TrilloExplicitNotFoundRoute() {
  notFound();
}
