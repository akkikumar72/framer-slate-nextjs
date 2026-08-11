import type { Metadata } from "next";
import { CaseStudyIndexPage } from "@/components/rivero/routes/case-study/CaseStudyPages";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Discover how businesses transformed their HR operations with Rivero.",
  alternates: { canonical: "/case-study" },
};

export default function Page() {
  return <CaseStudyIndexPage />;
}
