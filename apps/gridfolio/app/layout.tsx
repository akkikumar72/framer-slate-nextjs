import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
    title: "Gridfolio",
    description: "Antonio Misk | Product design",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3017"),
    openGraph: { title: "Gridfolio", description: "Antonio Misk | Product design" },
    icons: { icon: "/gridfolio/assets/0SxAo7lH3id1IDvAYRrdNEd6RB8.png" },
};
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en"><body>{children}</body></html>; }
