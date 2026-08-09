import type { Metadata } from "next";
import { AppointmentPage } from "@/components/rivero/routes/static/RiveroStaticPages";

export const metadata: Metadata = { title: "Schedule a Demo | Rivero" };
export default function Page() { return <AppointmentPage />; }
