import type { Metadata } from "next";

import { PortfolioIndexPage } from "@/components/fuel/work/WorkPortfolio";

export const metadata: Metadata = {
  title: "Portfolio - Fuel - Premium Agency & Portfolio",
  description:
    "A curated collection of structured visuals and modern digital systems by Fuel.",
  alternates: {
    canonical: "/work/portfolio",
  },
};

export default function FuelPortfolioRoute() {
  return <PortfolioIndexPage />;
}
