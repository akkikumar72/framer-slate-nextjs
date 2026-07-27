import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JaydenShell } from "@/components/jayden/shared/JaydenShell";

export const metadata: Metadata = {
  title: "Jayden - Personal Portfolio",
  description:
    "Jayden Jones is a web designer and developer creating modern digital experiences.",
};

export default function JaydenLayout({ children }: { children: ReactNode }) {
  return <JaydenShell>{children}</JaydenShell>;
}
