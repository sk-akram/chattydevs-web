"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FileUpload from "@/app/components/FileUpload";
import ChatBox from "@/app/components/ChatBox";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export const runtime = "edge";

type Project = {
  id: string;
  domain: string;
  created_at: string;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [ingesting, setIngesting] = useState(false);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const apiKey = localStorage.getItem("chattydevs_api_key");

    if (!apiKey) {
      setLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        const res = await fetch(
          `https://api.skakram1110.workers.dev/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            cache: "no-store", // 🚨 REQUIRED FIX
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch project");
        }

        setProject(data.project);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setResult(err.message);
        } else {
          setResult("Failed to load project");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  async function handleIngest() {
    const apiKey = localStorage.getItem("chattydevs_api_key");
    if (!apiKey || !project) return;

    setIngesting(true);
    setResult("");

    try {
      const res = await fetch(
        "https://api.skakram1110.workers.dev/projects/ingest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            project_id: project.id,
            start_url: project.domain,
            max_pages: 5,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ingestion failed");
      }

      setResult(
        `Indexed ${data.pages_crawled} pages, ${data.chunks_indexed} chunks`
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResult(err.message);
      } else {
        setResult("Ingestion failed");
      }
    } finally {
      setIngesting(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  if (!project) {
    return <div className="p-8"><p className="text-red-600">Project not found</p></div>;
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Project: {project.id.slice(0, 8)}
        </h1>
        <p className="text-gray-500">
          Domain: <span className="font-medium text-blue-700">{project.domain}</span>
        </p>
      </div>

      {/* Training */}
      <div className="card space-y-4">
        <h2 className="font-semibold text-lg text-gray-900">Training</h2>
        <FileUpload projectId={project.id} />
        <button
          onClick={handleIngest}
          disabled={ingesting}
          className="btn-primary w-full disabled:opacity-60"
        >
          {ingesting ? "Training..." : "Start Training"}
        </button>

        {result && (
          <p className="text-sm text-green-700 font-medium">{result}</p>
        )}
      </div>

      <ChatBox projectId={project.id} />

      {/* Widget snippet */}
      <div className="card">
        <h2 className="font-semibold mb-2 text-lg text-gray-900">Embed Widget</h2>

        <pre className="bg-gray-100 text-xs p-3 rounded overflow-x-auto">
{`<script
  src="https://cdn.chattydevs.com/widget.js"
  data-project-id="${project.id}"
  data-api-key="YOUR_API_KEY"
></script>`}
        </pre>

        <p className="text-xs text-gray-500 mt-2">
          Paste this into your website
        </p>
      </div>
    </div>
  );
}
