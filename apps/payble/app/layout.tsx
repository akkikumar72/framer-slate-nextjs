import type { Metadata } from "next";
import PaybleShell from "@/components/payble/PaybleShell";
import "@/components/payble/payble.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3009",
  ),
  title: {
    default: "Payble - AI Money Management",
    template: "%s - Payble - AI SAAS",
  },
  description:
    "Track spending, automate savings, and make confident money decisions with Payble.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Payble - AI Money Management",
    description:
      "Smarter budgets, automated savings, and all your accounts in one clear view.",
    images: ["/payble/ui/dashboard-hero.avif"],
  },
};

export default function PaybleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>
        <PaybleShell>{children}</PaybleShell>
      </body>
    </html>
  );
}
