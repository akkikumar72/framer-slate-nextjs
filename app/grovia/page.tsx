import type { Metadata } from "next";
import { GroviaPage } from "@/components/GroviaPage";

export const metadata: Metadata = {
  title: "Grovia - Strategy and growth for modern teams",
  description:
    "Grovia helps modern teams streamline operations, track performance, and scale with confidence.",
};

export default function GroviaRoute() {
  return <GroviaPage />;
}
