import type { Metadata } from "next";

import { PliarHome } from "@/components/pilar/PliarHome";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function PilarPage() {
  return <PliarHome />;
}
