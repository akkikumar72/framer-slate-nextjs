import type { Metadata } from "next";
import { PricingPage } from "@/components/payble/utility/UtilityPages";
import "@/components/payble/utility.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose a flexible Payble plan for smarter budgeting, savings, and financial insights.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function Page() {
  return <PricingPage />;
}
