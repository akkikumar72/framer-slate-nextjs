import type { Metadata } from "next";
import { TrilloRoot } from "@/components/trillo/TrilloShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3008",
  ),
  title: "Trillo - SaaS Landing & Startup Landing",
  description:
    "Boost sales with Trillo AI-powered lead targeting, workflow automation, performance insights, and smarter forecasting.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Trillo - SaaS Landing & Startup Landing",
    description:
      "Boost sales with Trillo AI-powered lead targeting, workflow automation, performance insights, and smarter forecasting.",
    images: ["/trillo/assets/dashboard-1.avif"],
    type: "website",
  },
};

export default function TrilloLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>
        <TrilloRoot>{children}</TrilloRoot>
      </body>
    </html>
  );
}
