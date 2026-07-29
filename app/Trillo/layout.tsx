import type { Metadata } from "next";
import { TrilloRoot } from "@/components/trillo/TrilloShell";

export const metadata: Metadata = {
  title: "Trillo - SaaS Landing & Startup Landing",
  description:
    "Boost sales with Trillo AI-powered lead targeting, workflow automation, performance insights, and smarter forecasting.",
  alternates: {
    canonical: "/Trillo",
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
  return <TrilloRoot>{children}</TrilloRoot>;
}
