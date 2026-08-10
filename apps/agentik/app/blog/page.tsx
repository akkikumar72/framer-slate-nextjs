import type { Metadata } from "next";
import { AgentikBlogIndex } from "@/components/agentik/blog/BlogIndex";
import { AgentikShell } from "@/components/agentik/shared/AgentikShell";

const description =
  "Practical guides, AI trends, and real strategies to help business owners get more from automation.";

export const metadata: Metadata = {
  title: { absolute: "Agentik | Framer Website Template | AI Automation Agency" },
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Agentik | Framer Website Template | AI Automation Agency",
    description,
    type: "website",
    url: "/blog",
  },
};

export default function AgentikBlogPage() {
  return (
    <AgentikShell>
      <AgentikBlogIndex />
    </AgentikShell>
  );
}
