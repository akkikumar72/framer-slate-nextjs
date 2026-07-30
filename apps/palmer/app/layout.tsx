import type { Metadata } from "next";
import { PalmerRoot } from "@/components/palmer/shared/PalmerShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3007",
  ),
  title: {
    default: "Palmer® · Akihiko",
    template: "%s · Palmer®",
  },
  description:
    "Independent design direction, identity, motion, and digital experiences by Akihiko.",
  alternates: { canonical: "/" },
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
