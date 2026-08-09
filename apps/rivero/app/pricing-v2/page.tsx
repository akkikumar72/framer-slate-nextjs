import type { Metadata } from "next";
import { PricingPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = { title: "Pricing V2 | Rivero" };
export default function Page() { return <PricingPage variant="v2" />; }
