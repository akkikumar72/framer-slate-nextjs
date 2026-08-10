import type { Metadata } from "next";
import { AboutPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};
export default function Page() { return <AboutPage />; }
