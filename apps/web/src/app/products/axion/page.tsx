"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Navbar } from "../../components/layout";
import { Button, Card, Container, Badge } from "../../components/ui";

export default function AxionProductPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Container className="py-16">
        <div className="flex flex-col gap-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">Axion</h1>
              <p className="text-slate-400 mt-3 max-w-2xl">
                Axion Chat by ChattyDevs: an AI chatbot trained on your website, docs, and files.
              </p>
            </div>
            <Badge color="indigo">Product</Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => router.push("/signup")}>Get Started</Button>
            <Link href="/pricing">
              <Button variant="outline">View Axion Pricing</Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-8">
              <h3 className="text-lg font-bold text-white">Train on your content</h3>
              <p className="text-slate-500 mt-2 text-sm">Upload PDFs and documents or crawl your website.</p>
            </Card>
            <Card className="p-8">
              <h3 className="text-lg font-bold text-white">Deploy anywhere</h3>
              <p className="text-slate-500 mt-2 text-sm">Use the WordPress plugin or embed the widget.</p>
            </Card>
            <Card className="p-8">
              <h3 className="text-lg font-bold text-white">Usage limits enforced</h3>
              <p className="text-slate-500 mt-2 text-sm">Free plan available now. Paid upgrades coming soon.</p>
            </Card>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8">
            <h2 className="text-2xl font-bold text-white">Free plan limits (current)</h2>
            <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-slate-400">
              <p>20 messages / month</p>
              <p>3 trainings (lifetime)</p>
              <p>1 project</p>
              <p>25 crawl pages max</p>
              <p>10 MB total uploads</p>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Axion is a product by ChattyDevs. Payments are currently disabled during validation.
          </p>
        </div>
      </Container>
    </div>
  );
}
