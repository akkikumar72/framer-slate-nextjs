import type { Metadata } from "next";
import { ServiceIndex } from "@/components/routes/services/Services";

export const metadata: Metadata = {
  title: { absolute: "B2bizz - B2B Consulting Agency for Digital Growth" },
  alternates: { canonical: "/b2bizz/service" },
  description: "Empower your B2B business with result-driven consulting. From strategy to execution, we deliver measurable growth through expert digital and operational solutions.",
};

export default function ServicesPage() { return <ServiceIndex />; }
