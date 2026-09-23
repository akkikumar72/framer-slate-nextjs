import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3019"),
  title: "Roco Portfolio Template",
  description: "Roco is a free Next.js portfolio template for web designers and creative freelancers. Warm, personal design with projects, stack, about, and contact pages included.",
  openGraph: { images: ["/roco/assets/roco-social.jpg"] },
  icons: { icon: "/roco/assets/roco-favicon.svg", apple: "/roco/assets/roco-apple-touch.png" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
