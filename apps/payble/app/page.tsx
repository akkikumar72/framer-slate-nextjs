import type { Metadata } from "next";
import PaybleHome from "@/components/payble/home/PaybleHome";

export const metadata: Metadata = {
  title: {
    absolute: "Payble - AI-Powered Financial Assistant",
  },
  description:
    "Automate budgeting, connect every account, and build better saving habits with Payble.",
  alternates: {
    canonical: "/",
  },
};

export default function PayblePage() {
  return <PaybleHome />;
}
