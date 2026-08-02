import type { Metadata } from "next";
import { DashfluenceRoot } from "@/components/dashfluence/shared/DashfluenceShell";

export const metadata: Metadata = {
  title: {
    default: "Dashfluence - Digital Marketing Agency",
    template: "%s | Dashfluence",
  },
  description: "Performance-driven digital marketing for ambitious brands.",
  alternates: { canonical: "/Dashfluence" },
  openGraph: {
    title: "Dashfluence - Digital Marketing Agency",
    description: "Performance-driven digital marketing for ambitious brands.",
    images: ["/dashfluence/assets/hero-background.png"],
    type: "website",
  },
};

export default function DashfluenceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DashfluenceRoot>{children}</DashfluenceRoot>;
}
