import type { Metadata } from "next";
import { CaseStudyIndexPage } from "@/components/rivero/routes/case-study/CaseStudyPages";

export const metadata: Metadata = {
  title: { absolute: "Rivero - SaaS & Startup Template" },
  description: "Discover how businesses transformed their HR operations with Rivero.",
  alternates: { canonical: "/rivero/case-study" },
};

export default function Page() {
  return <CaseStudyIndexPage />;
}
