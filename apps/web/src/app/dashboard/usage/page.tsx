"use client";

import { useEffect, useState } from "react";

import { api } from "../../lib/api";
import { Card, Section, Badge } from "../../components/ui";

type Me = Awaited<ReturnType<typeof api.me>>;

export default function UsagePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.me();
        if (!mounted) return;
        setMe(data);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Failed to load usage");
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

  if (loading) {
    return (
      <Section title="Analytics & Usage" description="Track your usage and limits.">
        <Card className="p-8">
          <p className="text-slate-500 text-sm">Loading usage…</p>
        </Card>
      </Section>
    );
  }

  if (error || !me) {
    return (
      <Section title="Analytics & Usage" description="Track your usage and limits.">
        <Card className="p-8">
          <p className="text-red-400 text-sm">{error || "Failed to load usage"}</p>
        </Card>
      </Section>
    );
  }

  const plan = me.plan;
  const usage = me.usage;
  const stats = me.stats;

  const messageUsed = usage?.message_count ?? 0;
  const messageLimit = plan?.message_limit_monthly;
  const trainingsUsed = stats?.trainings_used ?? 0;
  const trainingLimit = plan?.training_limit_lifetime;

  return (
    <Section
      title="Analytics & Usage"
      description="Track your usage and limits. Billing is disabled during validation."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-8 lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Current Plan</h3>
              <p className="text-sm text-slate-500 mt-2">Your limits are enforced automatically.</p>
            </div>
            <Badge color="indigo">{plan?.name || "Free"}</Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Messages (this period)</p>
              <p className="text-2xl font-extrabold text-white mt-2">
                {messageUsed}
                <span className="text-slate-500 text-sm font-semibold">{messageLimit != null ? ` / ${messageLimit}` : ""}</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Resets at: {usage?.period_end ? new Date(usage.period_end).toLocaleDateString() : "—"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Trainings (lifetime)</p>
              <p className="text-2xl font-extrabold text-white mt-2">
                {trainingsUsed}
                <span className="text-slate-500 text-sm font-semibold">{trainingLimit != null ? ` / ${trainingLimit}` : ""}</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Last training: {stats?.last_training_at ? new Date(stats.last_training_at).toLocaleString() : "—"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Projects</p>
              <p className="text-2xl font-extrabold text-white mt-2">
                {plan?.project_limit != null ? `Up to ${plan.project_limit}` : "Unlimited"}
              </p>
              <p className="text-xs text-slate-500 mt-2">Per product: {me.product?.name}</p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h3 className="text-lg font-bold text-white">Documents Uploaded</h3>
          <p className="text-3xl font-extrabold text-white mt-3">{stats?.documents_uploaded ?? 0}</p>
          <p className="text-xs text-slate-500 mt-2">Total upload actions tracked</p>
        </Card>

        <Card className="p-8">
          <h3 className="text-lg font-bold text-white">Pages Crawled</h3>
          <p className="text-3xl font-extrabold text-white mt-3">{stats?.pages_crawled ?? 0}</p>
          <p className="text-xs text-slate-500 mt-2">Total pages recorded by ingestion</p>
        </Card>

        <Card className="p-8">
          <h3 className="text-lg font-bold text-white">Upload Total</h3>
          <p className="text-3xl font-extrabold text-white mt-3">
            {Math.round(((stats?.upload_bytes_used ?? 0) / (1024 * 1024)) * 10) / 10} MB
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {plan?.upload_mb_total != null ? `Limit: ${plan.upload_mb_total} MB` : "No limit"}
          </p>
        </Card>
      </div>
    </Section>
  );
}
