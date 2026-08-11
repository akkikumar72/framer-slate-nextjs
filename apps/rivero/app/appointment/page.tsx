import type { Metadata } from "next";
import { AppointmentPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = {
  title: "Schedule a Demo",
  alternates: { canonical: "/appointment" },
};
export default function Page() { return <AppointmentPage />; }
