"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FileUpload from "@/app/components/FileUpload";
import { Toast } from "../../../components/ui/Toast";
import ChatBox from "@/app/components/ChatBox";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Container } from "../../../components/ui/Container";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { SectionHeading } from "../../../components/ui/SectionHeading";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState("");

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
            cache: "no-store",
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
    if (ingesting) return; // Prevent double submit
    const apiKey = localStorage.getItem("chattydevs_api_key");
    if (!apiKey || !project) {
      setShowError("Missing API key or project.");
      return;
    }
    setIngesting(true);
    setResult("");
    setShowError("");
    setShowSuccess(false);
    try {
      const res = await fetch(
        "https://api.skakram1110.workers.dev/projects/ingest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ project_id: project.id }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Ingest failed");
      }
      setResult("Website ingested and indexed successfully.");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setShowError(err.message);
        setResult(err.message);
      } else {
        setShowError("Ingest failed");
        setResult("Ingest failed");
      }
    } finally {
      setIngesting(false);
    }
  }

  if (loading) {
    return (
      <Container className="py-16 flex items-center justify-center">
        <LoadingSpinner />
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="py-16">
        <Card className="text-center text-red-600 font-semibold">{result || "Project not found."}</Card>
      </Container>
    );
  }

  return (
    <Container className="py-12 max-w-4xl">
      {showSuccess && (
        <Toast message="Training finished!" type="success" onClose={() => setShowSuccess(false)} />
      )}
      {showError && (
        <Toast message={showError} type="error" onClose={() => setShowError("")} />
      )}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <SectionHeading className="mb-0">Project: {project.domain}</SectionHeading>
        <span className="text-xs text-gray-400">ID: {project.id}</span>
      </div>
      <div className="grid grid-cols-1 gap-10 mb-12">
        <Card>
          <h3 className="font-semibold text-lg text-white mb-3">Project Info</h3>
          <p className="text-sm text-gray-300">Domain: {project.domain}</p>
          <p className="text-sm text-gray-300">Created: {new Date(project.created_at).toLocaleString()}</p>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card>
            <h3 className="font-semibold text-lg text-white mb-3">Upload Files</h3>
            <FileUpload projectId={projectId} />
          </Card>
          <Card>
            <h3 className="font-semibold text-lg text-white mb-3">Ingest Website</h3>
            <button
              onClick={handleIngest}
              disabled={ingesting}
              className="btn-primary w-full disabled:opacity-60"
            >
              {ingesting ? "Training..." : "Start Training"}
            </button>
            {result && (
              <p className="text-sm text-green-500 font-medium mt-3">{result}</p>
            )}
          </Card>
        </div>
        <Card className="mb-12">
          <h3 className="font-semibold text-lg text-white mb-3">Chat with your data</h3>
          <ChatBox projectId={projectId} />
        </Card>
        <Card>
          <h3 className="font-semibold text-lg text-white mb-3">Embed Code</h3>
          <p className="text-sm text-gray-300">Use the following code to embed the chatbot on your site:</p>
          <pre className="bg-gray-900 p-4 rounded-lg text-gray-300">
            {`<script src="https://chattydevs.com/embed.js" data-project-id="${project.id}" data-api-key="your_api_key"></script>`}
          </pre>
        </Card>
      </div>
    </Container>
  );
}
