import type { Metadata } from "next";
import { PalmerWorkIndex } from "@/components/palmer/work/PalmerWorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected identity, web design, creative direction, and portfolio projects by Akihiko.",
  alternates: {
    canonical: "/palmer/work",
  },
};

export default function PalmerWorkPage() {
  return <PalmerWorkIndex />;
}
