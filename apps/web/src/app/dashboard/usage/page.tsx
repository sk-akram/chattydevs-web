"use client";

import { Card, Section } from "../../components/ui";

export default function UsagePage() {
  return (
    <Section
      title="Analytics & Usage"
      description="This feature is currently under active development."
    >
      <Card className="p-8">
        <p className="text-slate-500 text-sm">
          Usage analytics will appear here once billing and metering dashboards are enabled.
        </p>
      </Card>
    </Section>
  );
}
