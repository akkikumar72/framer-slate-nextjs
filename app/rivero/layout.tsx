import type { Metadata } from "next";
import { RiveroRoot } from "@/components/rivero/RiveroShell";

export const metadata: Metadata = {
  title: { default: "Rivero - HR Management Platform", template: "%s | Rivero" },
  description: "Automate HR workflows, payroll, attendance, performance, and reporting with Rivero.",
  alternates: { canonical: "/rivero" },
  openGraph: {
    title: "Rivero - HR Management Platform",
    description: "Actionable HR insights that grow your business.",
    images: ["/rivero/assets/b681a7d545403371.png"],
    type: "website",
  },
};

export default function RiveroLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RiveroRoot>{children}</RiveroRoot>;
}
