import type { Metadata } from "next";
import { IntegrationIndexPage } from "@/components/rivero/routes/integrations/IntegrationPages";

export const metadata: Metadata = {
  title: { absolute: "Rivero - SaaS & Startup Template" },
  description: "Connect Rivero to the tools that power your team.",
  alternates: { canonical: "/rivero/integrations" },
};

export default function Page() {
  return <IntegrationIndexPage />;
}
