import type { Metadata } from "next";
import { ReviewsPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = { title: "Reviews | Rivero" };
export default function Page() { return <ReviewsPage />; }
