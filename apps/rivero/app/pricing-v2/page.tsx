import type { Metadata } from "next";
import { PricingPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = {
  title: "Pricing V2",
  alternates: { canonical: "/pricing-v2" },
};
export default function Page() { return <PricingPage variant="v2" />; }
