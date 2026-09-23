import type { Metadata } from "next";
import { Dock } from "@/components/shell";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3016",
  ),
  title: "Nue - Next.js Portfolio Template",
  description:
    "A Next.js portfolio template designed for modern creatives. Showcase your work with clarity, precision, and a refined minimalist aesthetic that puts your designs front and center.",
  openGraph: { images: ["/nue/assets/nue-social.png"] },
  icons: {
    icon: [
      {
        url: "/nue/assets/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/nue/assets/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/nue/assets/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <noscript>
          <style>{`.nue-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="nue-page">
          <main id="main-content" className="nue-shell">
            {children}
          </main>
        </div>
        <footer className="nue-footer">
          © All rights reserved – David Simmons
        </footer>
        <Dock />
      </body>
    </html>
  );
}
