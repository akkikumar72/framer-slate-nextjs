import type { Metadata } from "next";
import { LegalPage } from "@/components/dashfluence/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dashfluence collects, uses, and protects information.",
  alternates: { canonical: "/Dashfluence/legal/privacy-policy" },
};

export default function DashfluencePrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" />;
}
