import type { Metadata } from "next";
import { AgenioNotFoundPage } from "@/components/agenio/projects/AgenioNotFoundPage";

export const metadata: Metadata = {
  title: {
    absolute: "404 | Agenio",
  },
  alternates: {
    canonical: "/agenio/404",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Agenio404Route() {
  return <AgenioNotFoundPage />;
}
