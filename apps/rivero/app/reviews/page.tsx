import type { Metadata } from "next";
import { ReviewsPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = {
  title: "Reviews",
  alternates: { canonical: "/reviews" },
};
export default function Page() { return <ReviewsPage />; }
