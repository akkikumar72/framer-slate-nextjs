import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JaydenShell } from "@/components/jayden/shared/JaydenShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3005",
  ),
  title: "Jayden - Personal Portfolio",
  description:
    "Jayden Jones is a web designer and developer creating modern digital experiences.",
  alternates: {
    canonical: "/",
  },
};

export default function JaydenLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JaydenShell>{children}</JaydenShell>
      </body>
    </html>
  );
}
