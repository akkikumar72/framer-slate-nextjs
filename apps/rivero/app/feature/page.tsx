import type { Metadata } from "next";
import { FeaturePage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = {
  title: "Features",
  alternates: { canonical: "/feature" },
};
export default function Page() { return <FeaturePage />; }
