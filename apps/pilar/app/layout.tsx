import type { Metadata } from "next";
import { PliarRoot } from "@/components/pilar/PliarShell";
import "./globals.css";

const description =
  "Pliar is an AI automation template for SaaS teams, with polished product showcases, pricing, integrations, testimonials, and conversion-focused layouts.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3010",
  ),
  title: {
    default: "Modern AI SaaS Website Template",
    template: "%s · Pliar",
  },
  description,
  openGraph: {
    title: "Modern AI SaaS Website Template",
    description,
    images: ["/pilar/assets/dashboard.avif"],
    type: "website",
    url: "/",
  },
};

export default function PilarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PliarRoot>{children}</PliarRoot>
      </body>
    </html>
  );
}
