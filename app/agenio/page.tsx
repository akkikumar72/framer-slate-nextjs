import type { Metadata } from "next";
import { AgenioHome } from "@/components/agenio/home/AgenioHome";

export const metadata: Metadata = {
  title: "AgencyIO - AI Agency Framer Template",
  description:
    "A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.",
  alternates: {
    canonical: "/agenio",
  },
};

export default function AgenioPage() {
  return <AgenioHome />;
}
