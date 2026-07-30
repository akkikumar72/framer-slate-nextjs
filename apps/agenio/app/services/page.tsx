import type { Metadata } from "next";
import { AgenioServicesPage } from "@/components/agenio/static/AgenioStaticPages";

const description =
  "A modern Framer template for AI agencies to showcase services, case studies, client results, and expertise with clean design, smooth interactions, and seamless customization.";

export const metadata: Metadata = {
  title: "AgencyIO - AI Agency Framer Template",
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "AgencyIO - AI Agency Framer Template",
    description,
    type: "website",
  },
};

export default function AgenioServicesRoute() {
  return <AgenioServicesPage />;
}
