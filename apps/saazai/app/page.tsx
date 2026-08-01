import type { Metadata } from "next";
import { HomePage } from "@/components/saazai/home/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "Saazai - Be 10X more efficient",
  },
  description:
    "Work with intelligent AI agents that remember context, automate workflows, and connect your tools.",
  alternates: { canonical: "/" },
};

export default function SaazaiHomePage() {
  return <HomePage />;
}
