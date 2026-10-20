import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3021"),
  title: {
    default: "B2bizz - B2B Consulting Agency for Digital Growth",
    template: "%s | B2bizz",
  },
  description:
    "B2bizz provides focused consulting, digital strategy, websites, SaaS solutions, integrations, and data-driven marketing for growing B2B teams.",
  icons: {
    icon: "/b2bizz/assets/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
