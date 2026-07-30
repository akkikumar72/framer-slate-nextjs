import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002",
  ),
  title: "Grovia - Strategy and growth for modern teams",
  description:
    "Grovia helps modern teams streamline operations, track performance, and scale with confidence.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Grovia - Strategy and growth for modern teams",
    description:
      "Grovia helps modern teams streamline operations, track performance, and scale with confidence.",
    images: ["/grovia/dashboard-ui.avif"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
