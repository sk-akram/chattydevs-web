"use client";

import { Card, Section } from "../components/ui";

export default function DashboardPage() {
  return (
    <Section
      title="Overview"
      description="Manage your chatbot projects, ingestion sources, and integrations."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Quick start</h3>
              <p className="text-sm text-slate-500 max-w-3xl">
                To activate the WordPress plugin: create a project, train it (upload docs and/or crawl your site), test it in live chat,
                then copy the Project ID + API key from the Integrations section.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Step 1</p>
                <p className="text-sm font-semibold text-slate-200 mt-1">Create project</p>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Step 2</p>
                <p className="text-sm font-semibold text-slate-200 mt-1">Train sources</p>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Step 3</p>
                <p className="text-sm font-semibold text-slate-200 mt-1">Test chat</p>
              </div>
              <div className="rounded-xl border border-slate-800/60 bg-slate-950/30 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Step 4</p>
                <p className="text-sm font-semibold text-slate-200 mt-1">Copy creds</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-white mb-2">Projects</h3>
          <p className="text-sm text-slate-500">Create and manage your chatbot instances.</p>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-white mb-2">API Keys</h3>
          <p className="text-sm text-slate-500">Your API key is stored securely in your browser session.</p>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-white mb-2">Integrations</h3>
          <p className="text-sm text-slate-500">Activate the WordPress plugin using your Project ID + API key.</p>
        </Card>
      </div>
    </Section>
  );
}
