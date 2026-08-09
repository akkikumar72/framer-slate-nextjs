import type { Metadata } from "next";
import { FeaturePage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = { title: "Features | Rivero" };
export default function Page() { return <FeaturePage />; }
