import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Slate - The smartest notes app",
  description:
    "Capture ideas naturally, connect every note, and surface what matters with Slate.",
  openGraph: {
    title: "Slate - The smartest notes app",
    description:
      "Capture ideas naturally, connect every note, and surface what matters with Slate.",
    images: ["/assets/hero-bg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
