import type { Metadata } from "next";
import { PalmerRoot } from "@/components/palmer/shared/PalmerShell";

export const metadata: Metadata = {
  title: {
    default: "Palmer® · Akihiko",
    template: "%s · Palmer®",
  },
  description:
    "Independent design direction, identity, motion, and digital experiences by Akihiko.",
  alternates: { canonical: "/palmer" },
};

export default function PalmerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PalmerRoot>{children}</PalmerRoot>;
}
