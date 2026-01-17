"use client";

import Link from "next/link";

import { Navbar } from "../components/layout";
import { Button, Card, Container, Badge } from "../components/ui";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Container className="py-16">
        <div className="flex items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <img src="/brand/axion_icon.png" alt="Axion" className="w-10 h-10 object-contain shrink-0 translate-y-[3px]" />
              <h1 className="text-4xl font-extrabold text-white leading-none">Axion Pricing</h1>
            </div>
            <p className="text-slate-400">Payments are disabled during validation. Limits are enforced. Upgrade flow is coming soon.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/products">
              <Button variant="outline">All Products</Button>
            </Link>
            <Link href="/products/axion">
              <Button variant="outline">About Axion</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Free</h2>
              <Badge color="indigo">Current</Badge>
            </div>
            <p className="text-slate-300 text-3xl font-extrabold mt-4">₹0</p>
            <div className="mt-6 space-y-2 text-sm text-slate-500">
              <p>20 messages / month</p>
              <p>3 trainings (lifetime)</p>
              <p>1 project</p>
              <p>25 crawl pages max</p>
              <p>10 MB total uploads</p>
            </div>
            <div className="mt-8">
              <Button className="w-full" onClick={() => (window.location.href = "/signup")}>Get Started</Button>
            </div>
          </Card>

          <Card className="p-8 opacity-80">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Starter</h2>
              <Badge color="indigo">Soon</Badge>
            </div>
            <p className="text-slate-300 text-3xl font-extrabold mt-4">₹499<span className="text-slate-500 text-sm font-semibold">/month</span></p>
            <div className="mt-6 space-y-2 text-sm text-slate-500">
              <p>500 messages / month</p>
              <p>Unlimited trainings</p>
              <p>Up to 3 projects</p>
            </div>
            <div className="mt-8">
              <Button className="w-full" variant="ghost" disabled>Upgrade coming soon</Button>
            </div>
          </Card>

          <Card className="p-8 opacity-80">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Pro</h2>
              <Badge color="indigo">Soon</Badge>
            </div>
            <p className="text-slate-300 text-3xl font-extrabold mt-4">₹999<span className="text-slate-500 text-sm font-semibold">/month</span></p>
            <div className="mt-6 space-y-2 text-sm text-slate-500">
              <p>2000 messages / month</p>
              <p>Unlimited trainings</p>
              <p>Up to 10 projects</p>
              <p>Analytics (v1) planned</p>
            </div>
            <div className="mt-8">
              <Button className="w-full" variant="ghost" disabled>Upgrade coming soon</Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
