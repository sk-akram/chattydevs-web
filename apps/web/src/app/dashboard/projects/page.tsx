"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Container } from "../../components/ui/Container";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeading } from "../../components/ui/SectionHeading";

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
        setProjects(data.projects);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load projects");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <Container className="py-16 flex items-center justify-center">
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
        <Card className="text-center text-red-600 font-semibold">{error}</Card>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
        <SectionHeading className="mb-0">Projects</SectionHeading>
        <Button size="md">
          <Link href="/dashboard/projects/new">New Project</Link>
        </Button>
      </div>
      {projects.length === 0 ? (
        <Card className="text-center py-16 text-gray-400">No projects found. Create your first project!</Card>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <li key={project.id}>
              <Card className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-lg text-white">{project.domain}</div>
                    <div className="text-xs text-gray-500">ID: {project.id}</div>
                  </div>
                  <Button variant="secondary" size="md">
                    <Link href={`/dashboard/projects/${project.id}`}>Open</Link>
                  </Button>
                </div>
                <div className="text-xs text-gray-400 mt-3">Created: {new Date(project.created_at).toLocaleString()}</div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
