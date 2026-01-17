"use client";

import Link from "next/link";

import { Navbar } from "../components/layout";
import { Button, Card, Container, Badge } from "../components/ui";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Container className="py-16">
        <h1 className="text-4xl font-extrabold text-white mb-2">Products</h1>
        <p className="text-slate-400 mb-10">Explore ChattyDevs products and pick what you want to build with.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <img src="/brand/axion_icon.png" alt="Axion" className="w-10 h-10 object-contain shrink-0 translate-y-[3px]" />
                  <h2 className="text-2xl font-bold text-white leading-none">Axion</h2>
                </div>
                <p className="text-slate-500 mt-2">AI chatbot trained on your content.</p>
              </div>
              <Badge color="indigo">Available</Badge>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/products/axion" className="w-full sm:w-auto">
                <Button className="w-full">View Product</Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">
                  View Pricing
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 opacity-70">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">More products</h2>
                <p className="text-slate-500 mt-2">Plugins, agents, and services are coming soon.</p>
              </div>
              <Badge color="indigo">Soon</Badge>
            </div>

            <div className="mt-8">
              <Button className="w-full" variant="ghost" disabled>
                Coming soon
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
