import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3012",
  ),
  title: {
    default: "Agentik | AI Automation Agency",
    template: "%s | Agentik",
  },
  description:
    "AI automation systems that help businesses save time, cut costs, and scale without the complexity.",
  alternates: { canonical: "/" },
};

export default function AgentikLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
