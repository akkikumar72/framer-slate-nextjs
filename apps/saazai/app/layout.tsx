import type { Metadata } from "next";
import { SaazaiFrame } from "@/components/saazai/SaazaiShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3006",
  ),
  title: {
    default: "Saazai - AI agents for smarter work",
    template: "%s | Saazai",
  },
  description:
    "A modern AI and SaaS experience for showcasing intelligent products, pricing, integrations, insights, and company growth.",
  alternates: {
    canonical: "/",
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
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>
        <SaazaiFrame>{children}</SaazaiFrame>
      </body>
    </html>
  );
}
