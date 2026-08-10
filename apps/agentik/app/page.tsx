import type { Metadata } from "next";
import AgentikHome from "@/components/agentik/home/AgentikHome";

export const metadata: Metadata = {
  title: { absolute: "Agentik | AI Automation Agency" },
  description: "AI tools and workflows that cut costs, save time, and drive real growth.",
};

export default function AgentikPage() {
  return <AgentikHome />;
}
