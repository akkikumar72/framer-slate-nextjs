import type { Metadata } from "next";
import { ReviewsPage } from "@/components/dashfluence/static/DashfluenceStaticPages";
export const metadata: Metadata = { title: "Reviews", alternates: { canonical: "/Dashfluence/reviews" } };
export default function Page() { return <ReviewsPage />; }
