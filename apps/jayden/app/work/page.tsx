import type { Metadata } from "next";
import { WorkIndex } from "@/components/jayden/work/WorkIndex";

export const metadata: Metadata = {
  title: "Works | Jayden - Personal Portfolio",
  description:
    "Explore Jayden's selected mobile app and website design projects.",
  alternates: {
    canonical: "/work",
  },
};

export default function JaydenWorkPage() {
  return <WorkIndex />;
}
