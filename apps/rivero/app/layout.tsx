import type { Metadata } from "next";
import { RiveroRoot } from "@/components/rivero/RiveroShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3011",
  ),
  title: {
    default: "Rivero - HR Management Platform",
    template: "%s | Rivero",
  },
  description:
    "Automate HR workflows, payroll, attendance, performance, and reporting with Rivero.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rivero - HR Management Platform",
    description: "Actionable HR insights that grow your business.",
    images: ["/rivero/assets/b681a7d545403371.png"],
    type: "website",
  },
};

export default function RiveroLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>
        <RiveroRoot>{children}</RiveroRoot>
      </body>
    </html>
  );
}
