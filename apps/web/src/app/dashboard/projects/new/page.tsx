"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "../../../lib/api";
import { Button, Card, Input, Section } from "../../../components/ui";

export default function NewProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!projectName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.createProject(projectName.trim());
      const projectId = response.project_id || response.id;
      if (!projectId) throw new Error("Project created but no id returned");
      router.push(`/dashboard/projects/${projectId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      title="Create New Project"
      description="Name your chatbot project. You can add training sources and deployment settings later."
    >
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-xl bg-slate-900/60">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Project Name"
              placeholder="e.g., My Website Bot"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              error={error || undefined}
              disabled={loading}
              autoFocus
            />
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-lg text-sm text-slate-400 flex gap-3">
              <svg className="w-6 h-6 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>
                This name is shown in your dashboard and widget setup. Project names must be unique per account.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => router.push("/dashboard/projects") } className="flex-1">
                Cancel
              </Button>
              <Button type="submit" isLoading={loading} className="flex-[2]">
                Create Project
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
}
