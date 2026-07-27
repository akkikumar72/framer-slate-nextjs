import type { Metadata } from "next";
import { AgenioRoot } from "@/components/agenio/shared/AgenioShell";

export const metadata: Metadata = {
  title: "AgencyIO - AI Agency Framer Template",
  description:
    "A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.",
  alternates: {
    canonical: "/agenio",
  },
  openGraph: {
    title: "AgencyIO - AI Agency Framer Template",
    description:
      "A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.",
    images: [
      "https://framerusercontent.com/images/Wqo1gDJ2spyalp3OsObh1QBciSw.png",
    ],
    type: "website",
  },
};

export default function AgenioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AgenioRoot>{children}</AgenioRoot>;
}
