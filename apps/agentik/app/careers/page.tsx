import type { Metadata } from "next";
import { AgentikCareersPage } from "@/components/agentik/static/AgentikStaticPages";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Agentik and help bring practical AI automation to businesses everywhere.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return <AgentikCareersPage />;
}
