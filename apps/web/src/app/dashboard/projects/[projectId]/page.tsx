"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Project = {
  id: string;
  domain: string;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [ingesting, setIngesting] = useState(false);
  const [result, setResult] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState("");

  const apiKey =
    typeof window !== "undefined"
      ? localStorage.getItem("chattydevs_api_key")
      : null;

    useEffect(() => {
      async function loadProject() {
        if (!apiKey) return;

        try {
          const res = await fetch(
            `https://api.skakram1110.workers.dev/projects/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Failed to load project");
          }

          setProject(data.project);
        } catch (err) {
          console.error(err);
          setProject(null);
        } finally {
          setLoading(false);
        }
      }

      loadProject();
    }, [projectId, apiKey]);


    async function handleIngest() {
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
      } catch (err) {
        if (err instanceof Error) {
          setResult(err.message);
        } else {
          setResult("Operation failed");
        }
      } finally {
        setIngesting(false);
      }
    }
    async function handleUpload() {
    if (!apiKey || !project || !file) return;

    setUploading(true);
    setUploadResult("");

    try {
      const formData = new FormData();
      formData.append("project_id", project.id);
      formData.append("file", file);

      const res = await fetch(
        "https://api.skakram1110.workers.dev/projects/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadResult(
        `Uploaded ${data.filename} → ${data.chunks_indexed} chunks indexed`
      );
    } catch (err) {
      if (err instanceof Error) {
        setUploadResult(err.message);
      } else {
        setUploadResult("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  if (!project)
    return <p className="text-red-600">Project not found</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">
          Project: {project.id.slice(0, 8)}
        </h1>
        <p className="text-gray-600">
          Domain: {project.domain}
        </p>
      </div>

      {/* Training */}
      <div className="bg-white border rounded p-4 space-y-3">
        <h2 className="font-medium">Training</h2>

        <button
          onClick={handleIngest}
          disabled={ingesting}
          className="bg-black text-white px-4 py-2 rounded text-sm disabled:opacity-60"
        >
          {ingesting ? "Training..." : "Start Training"}
        </button>

        {result && (
          <p className="text-sm text-gray-700">{result}</p>
        )}
      </div>
      {/* File Upload */}
      <div className="bg-white border rounded p-4 space-y-3">
        <h2 className="font-medium">Upload Documents</h2>

        <input
          type="file"
          accept=".pdf,.txt,.csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-black text-white px-4 py-2 rounded text-sm disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {uploadResult && (
          <p className="text-sm text-gray-700">{uploadResult}</p>
        )}
      </div>

      {/* Widget snippet */}
      <div className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">Embed Widget</h2>

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
