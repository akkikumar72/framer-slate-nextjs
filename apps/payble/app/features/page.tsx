import type { Metadata } from "next";
import FeaturesPage from "@/components/payble/features/FeaturesPage";
import "@/components/payble/features.css";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Payble's expense tracking, multi-account sync, custom budgets, smart savings, real-time alerts, and financial integrations.",
  alternates: {
    canonical: "/features",
  },
};

export default function Page() {
  return <FeaturesPage />;
}
