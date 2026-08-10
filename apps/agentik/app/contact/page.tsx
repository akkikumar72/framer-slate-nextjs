import type { Metadata } from "next";
import { AgentikContactPage } from "@/components/agentik/static/AgentikStaticPages";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Agentik about the AI automation opportunities in your business.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <AgentikContactPage />;
}
