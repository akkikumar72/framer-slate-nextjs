import type { Metadata } from "next";
import { ServiceProfile } from "@/components/jayden/profile/ServiceProfile";

export const metadata: Metadata = {
  title: "Services | Jayden",
  description: "Brand, UI/UX, Webflow, and Framer services from Jayden Jones.",
  alternates: {
    canonical: "/service",
  },
};

export default function JaydenServicePage() {
  return <ServiceProfile />;
}
