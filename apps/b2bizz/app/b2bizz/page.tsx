import type { Metadata } from "next";
import { B2bizzHome } from "@/components/routes/home/B2bizzHome";

export const metadata: Metadata = {
  title: { absolute: "B2bizz - B2B Consulting Agency for Digital Growth" },
  alternates: { canonical: "/b2bizz" },
};

export default function HomePage() { return <B2bizzHome />; }
