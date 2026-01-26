"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "../../lib/api";
import { Button, Card, EmptyState, LoadingState, Section, Badge } from "../../components/ui";

type Project = { id: string; domain: string; created_at: string };

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await api.listProjects();
        if (!mounted) return;
        setProjects(data.projects || []);
      } catch {
        if (!mounted) return;
        setProjects([]);
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

  if (loading) return <LoadingState />;

  return (
    <Section
      title="Your Projects"
      description="Manage your chatbot instances and their data sources."
      action={
        <Button onClick={() => router.push("/dashboard/projects/new")}>Create New Project</Button>
      }
    >
      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to start training your custom chatbot."
          action={<Button onClick={() => router.push("/dashboard/projects/new")}>Get Started</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group relative overflow-hidden"
              onClick={() => router.push(`/dashboard/projects/${project.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                    {project.domain.trim().charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors text-white">
                      {project.domain}
                    </h3>
                    <p className="text-sm text-slate-500">ID: {project.id}</p>
                  </div>
                </div>
                <Badge color="indigo">v1.0</Badge>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-slate-500 text-sm">
                <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                  Manage Project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
