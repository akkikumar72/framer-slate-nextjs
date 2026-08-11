import type { Metadata } from "next";
import { LegalPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/legal/privacy-policy" },
};
export default function Page() { return <LegalPage type="privacy" />; }
