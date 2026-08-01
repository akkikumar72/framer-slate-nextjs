import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/components/payble/utility.css";

export const metadata: Metadata = {
  title: "404",
  description: "The requested Payble page could not be found.",
};

export default function Page() {
  notFound();
}
