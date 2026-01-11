"use client";

import { Navbar } from "../components/layout";
import { Card, Container } from "../components/ui";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Container className="py-16">
        <h1 className="text-4xl font-extrabold text-white mb-2">Pricing</h1>
        <p className="text-slate-400 mb-10">Investor MVP parity page. Full pricing tiers coming soon.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {["Free", "Pro", "Enterprise"].map((t) => (
            <Card key={t} className="p-8">
              <h2 className="text-xl font-bold text-white mb-2">{t}</h2>
              <p className="text-sm text-slate-500">Details coming soon.</p>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
