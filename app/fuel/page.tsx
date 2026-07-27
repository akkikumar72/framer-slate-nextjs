import type { Metadata } from "next";

import { FuelPage } from "@/components/FuelPage";

export const metadata: Metadata = {
  title: "Fuel - Premium Agency & Portfolio",
  description:
    "Fuel is a design-forward studio crafting bold visuals, structured layouts, and high-impact digital experiences.",
};

export default function FuelRoute() {
  return <FuelPage />;
}
