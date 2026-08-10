import type { Metadata } from "next";
import { PricingPage } from "@/components/dashfluence/static/DashfluenceStaticPages";
export const metadata: Metadata = { title: "Pricing", alternates: { canonical: "/Dashfluence/pricing" } };
export default function Page() { return <PricingPage />; }
