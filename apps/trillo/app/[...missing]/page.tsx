import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: "/404",
  },
};

export default function TrilloMissingRoute() {
  notFound();
}
