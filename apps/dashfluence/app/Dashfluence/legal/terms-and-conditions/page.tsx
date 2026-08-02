import type { Metadata } from "next";
import { LegalPage } from "@/components/dashfluence/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Terms governing use of Dashfluence services and website.",
  alternates: { canonical: "/Dashfluence/legal/terms-and-conditions" },
};

export default function DashfluenceTermsPage() {
  return <LegalPage title="Terms and conditions" />;
}
