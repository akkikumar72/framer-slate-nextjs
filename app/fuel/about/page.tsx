import type { Metadata } from "next";

import { AboutPage } from "@/components/fuel/about/AboutPage";

export const metadata: Metadata = {
  title: "Fuel - Premium Agency & Portfolio",
  description:
    "Fuel is a premium creative agency and portfolio for designers, studios, brands, and photographers.",
};

export default function FuelAboutRoute() {
  return <AboutPage />;
}
