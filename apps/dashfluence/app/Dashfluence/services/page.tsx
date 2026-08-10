import type { Metadata } from "next";

import { ServicesPage } from "@/components/dashfluence/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore performance-driven digital strategy, content, SEO, paid media, CRO, and analytics services from Dashfluence.",
  alternates: { canonical: "/Dashfluence/services" },
};

export default function DashfluenceServicesPage() {
  return <ServicesPage />;
}
