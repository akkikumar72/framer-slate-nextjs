import type { Metadata } from "next";
import { LegalPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/legal/terms-conditions" },
};
export default function Page() { return <LegalPage type="terms" />; }
