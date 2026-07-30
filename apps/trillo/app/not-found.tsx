import type { Metadata } from "next";
import { TrilloNotFoundPage } from "@/components/trillo/TrilloNotFoundPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/404",
  },
};

export default function TrilloNotFound() {
  return <TrilloNotFoundPage />;
}
