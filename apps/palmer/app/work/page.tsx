import type { Metadata } from "next";
import { PalmerWorkIndex } from "@/components/palmer/work/PalmerWorkIndex";

const description =
  "Selected identity, web design, creative direction, and portfolio projects by Akihiko.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work · Palmer®",
    description,
    type: "website",
    url: "/work",
    images: ["/palmer/assets/palmer-hero-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work · Palmer®",
    description,
    images: ["/palmer/assets/palmer-hero-poster.jpg"],
  },
};

export default function PalmerWorkPage() {
  return <PalmerWorkIndex />;
}
