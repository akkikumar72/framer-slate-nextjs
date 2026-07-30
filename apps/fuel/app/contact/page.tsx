import type { Metadata } from "next";

import { ContactPage } from "@/components/fuel/contact/ContactPage";

export const metadata: Metadata = {
  title: "Fuel - Premium Agency & Portfolio",
  description:
    "Fuel is a premium creative agency and portfolio for designers, studios, brands, and photographers.",
  alternates: {
    canonical: "/contact",
  },
};

export default function FuelContactRoute() {
  return <ContactPage />;
}
