import type { Metadata } from "next";

import { FuelNotFoundPage } from "../../../components/fuel/not-found/FuelNotFoundPage";

export const metadata: Metadata = {
  title: "Fuel - Premium Agency & Portfolio",
  description:
    "Fuel, a premium agency portfolio for designers, freelancers, agencies, and photographers.",
};

export default function Fuel404Route() {
  return <FuelNotFoundPage />;
}
