import type { Metadata } from "next";
import { Header, Footer } from "@/components/shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3015"),
  title: { default: "Alytics - The Perfect Saas Template", template: "%s | Alytics" },
  description: "Turn complex data into clear, actionable insights so you can make smarter decisions and drive growth with confidence.",
  openGraph: { images: ["/alytics/ZQIj3Thxxza6gmZ33yEqfh0ew.png"] },
  icons: { icon: "/alytics/alytics-logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /></body></html>;
}
