import type { Metadata } from "next";
import { SaazaiFrame } from "@/components/saazai/SaazaiShell";

export const metadata: Metadata = {
  title: {
    default: "Saazai - AI agents for smarter work",
    template: "%s | Saazai",
  },
  description:
    "A modern AI and SaaS experience for showcasing intelligent products, pricing, integrations, insights, and company growth.",
  alternates: {
    canonical: "/saazai",
  },
  openGraph: {
    title: "Saazai - AI agents for smarter work",
    description:
      "Build more efficient workflows with adaptive AI agents and connected tools.",
    type: "website",
  },
};

export default function SaazaiLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SaazaiFrame>{children}</SaazaiFrame>;
}
