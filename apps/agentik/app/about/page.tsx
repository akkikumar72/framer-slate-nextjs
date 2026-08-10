import type { Metadata } from "next";
import { AgentikAboutPage } from "@/components/agentik/static/AgentikStaticPages";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the Agentik team and learn how we help businesses scale with practical AI systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AgentikAboutPage />;
}
