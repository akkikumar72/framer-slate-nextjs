import type { Metadata } from "next";
import { PalmerRoot } from "@/components/palmer/shared/PalmerShell";
import "./globals.css";

const description =
  "Independent design direction, identity, motion, and digital experiences by Akihiko.";
const socialImage = {
  url: "/palmer/assets/palmer-hero-reference.jpg",
  width: 1280,
  height: 720,
  alt: "Palmer digital design portfolio by Akihiko",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3007",
  ),
  title: {
    default: "Palmer® · Akihiko",
    template: "%s · Palmer®",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Palmer® · Akihiko",
    description,
    type: "website",
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palmer® · Akihiko",
    description,
    images: [socialImage.url],
  },
};

export default function PalmerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PalmerRoot>{children}</PalmerRoot>
      </body>
    </html>
  );
}
