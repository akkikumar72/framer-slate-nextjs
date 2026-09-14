import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3014"), title: "Orbital - AI SaaS & AI Agent Template", description: "Build, connect, deploy, and monitor intelligent agents from one platform.", alternates: { canonical: "/orbital" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>; }
