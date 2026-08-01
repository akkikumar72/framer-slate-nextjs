import type { Metadata } from "next";
import { PricingPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = { title: "Pricing | Rivero" };
export default function Page() { return <PricingPage variant="v1" />; }
