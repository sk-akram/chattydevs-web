"use client";

import { Navbar } from "../components/layout";
import { Card, Container } from "../components/ui";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Container className="py-16">
        <h1 className="text-4xl font-extrabold text-white mb-2">Documentation</h1>
        <p className="text-slate-400 mb-10">Investor MVP parity docs page. Full docs coming soon.</p>
        <Card className="p-8">
          <p className="text-slate-500 text-sm">
            Use the dashboard to create a project, train it (upload files + crawl), then copy the Project ID + embed snippet.
          </p>
        </Card>
      </Container>
    </div>
  );
}
