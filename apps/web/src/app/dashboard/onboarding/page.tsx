"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "../../lib/api";
import { Button, Card, Section, Badge } from "../../components/ui";

type Plan = {
  id: string;
  slug: string;
  name: string;
  price_inr: number;
  message_limit_monthly: number | null;
  training_limit_lifetime: number | null;
  project_limit: number | null;
  crawl_max_pages: number | null;
  upload_mb_total: number | null;
};

export default function OnboardingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productSlug = "axion";

  const [plans, setPlans] = useState<Plan[]>([]);
  const freePlan = useMemo(() => plans.find((p) => p.slug === "free") || null, [plans]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.listPlans(productSlug);
        if (!mounted) return;
        setPlans((data.plans as Plan[]) || []);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Failed to load plans");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleContinueFree() {
    if (saving) return;
    setSaving(true);
    setError(null);

    try {
      await api.selectPlan(productSlug, "free");
      localStorage.setItem("chattydevs_onboarded", "1");
      localStorage.setItem("chattydevs_product", productSlug);
      router.push("/dashboard/projects");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to continue");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Section title="Setup" description="Choose your product and plan to continue.">
        <Card className="p-8">
          <p className="text-slate-500 text-sm">Loading plans…</p>
        </Card>
      </Section>
    );
  }

  return (
    <Section title="Setup" description="Choose your product and plan to continue.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Product</h3>
              <p className="text-sm text-slate-500 mt-2">Phase 1 product available on your account.</p>
            </div>
            <Badge color="indigo">Axion</Badge>
          </div>

          <div className="mt-6 rounded-xl border border-slate-800/60 bg-slate-950/30 p-4">
            <div className="flex items-center gap-3">
              <img src="/brand/axion_icon.png" alt="Axion" className="w-8 h-8 object-contain shrink-0 translate-y-[3px]" />
              <p className="text-sm text-slate-300 font-semibold leading-none">Axion</p>
            </div>
            <p className="text-xs text-slate-500 mt-1">AI chatbot trained on your content</p>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Plan</h3>
              <p className="text-sm text-slate-500 mt-2">Payments are disabled during validation. Limits are enforced.</p>
            </div>
            <Badge color="indigo">Upgrade soon</Badge>
          </div>

          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white">Free</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {freePlan?.message_limit_monthly ?? 20} messages/month · {freePlan?.training_limit_lifetime ?? 3} trainings lifetime · {freePlan?.project_limit ?? 1} project
                  </p>
                </div>
                <Button onClick={handleContinueFree} isLoading={saving} disabled={saving}>
                  Continue
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800/60 bg-slate-950/20 p-4 opacity-70">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white">Starter</p>
                  <p className="text-xs text-slate-500 mt-1">₹499/month · 500 messages/month · unlimited trainings · 3 projects</p>
                </div>
                <Button variant="ghost" disabled>
                  Upgrade soon
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800/60 bg-slate-950/20 p-4 opacity-70">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white">Pro</p>
                  <p className="text-xs text-slate-500 mt-1">₹999/month · 2000 messages/month · unlimited trainings · 10 projects</p>
                </div>
                <Button variant="ghost" disabled>
                  Upgrade soon
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
