import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AgenioRoot } from "@/components/agenio/shared/AgenioShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3004",
  ),
  title: "AgencyIO - AI Agency Framer Template",
  description:
    "A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AgencyIO - AI Agency Framer Template",
    description:
      "A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.",
    images: ["/agenio/projects/og.png"],
    type: "website",
  },
};

export default function AgenioLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AgenioRoot>{children}</AgenioRoot>
      </body>
    </html>
  );
}
