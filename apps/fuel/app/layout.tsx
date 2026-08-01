import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3003",
  ),
  title: "Fuel - Premium Agency & Portfolio",
  description:
    "Fuel is a design-forward studio crafting bold visuals, structured layouts, and high-impact digital experiences.",
  alternates: {
    canonical: "/",
  },
};

export default function FuelLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
