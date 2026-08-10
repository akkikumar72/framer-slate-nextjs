import type { Metadata } from "next";
import { IntegrationIndexPage } from "@/components/rivero/routes/integrations/IntegrationPages";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect Rivero to the tools that power your team.",
  alternates: { canonical: "/integrations" },
};

export default function Page() {
  return <IntegrationIndexPage />;
}
