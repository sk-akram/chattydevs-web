"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  domain: string;
  created_at: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiKey = localStorage.getItem("chattydevs_api_key");
    if (!apiKey) {
      setError("No API key found. Please sign up again.");
      setLoading(false);
      return;
    }

    async function loadProjects() {
      try {
        const res = await fetch(
          "https://api.skakram1110.workers.dev/projects",
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load projects");
        }

        setProjects(data.projects || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Projects</h1>
          <p className="text-gray-600">Manage your chatbot projects</p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border border-dashed rounded p-10 text-center bg-white">
          <p className="text-gray-500">No projects created yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="block bg-white border rounded p-4 hover:bg-gray-50"
            >
              <p className="font-medium">{project.domain}</p>
              <p className="text-xs text-gray-500">
                ID: {project.id}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
