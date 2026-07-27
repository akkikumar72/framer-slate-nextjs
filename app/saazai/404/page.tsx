import type { Metadata } from "next";
import { NotFoundContent } from "@/components/saazai/company/NotFoundContent";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function Saazai404Page() {
  return <NotFoundContent />;
}
