import type { Metadata } from "next";

import { WorkIndexPage } from "@/components/dashfluence/work/WorkPages";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore Dashfluence brand, web, UX, marketing, and SEO work for ambitious skincare brands.",
  alternates: { canonical: "/Dashfluence/work" },
};

export default function DashfluenceWorkPage() {
  return <WorkIndexPage />;
}
