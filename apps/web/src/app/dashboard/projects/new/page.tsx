"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Toast } from "@/app/components/ui/Toast";

export default function NewProjectPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleCreate() {
    if (loading) return; // Prevent double submit
    const apiKey = localStorage.getItem("chattydevs_api_key");

    if (!apiKey) {
      setError("Missing API key. Please sign up again.");
      return;
    }

    if (!url) {
      setError("Website URL is required");
      return;
    }

    setLoading(true);
    setError("");
    setShowSuccess(false);

    try {
      const res = await fetch("https://api.skakram1110.workers.dev/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          domain: url,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push(`/dashboard/projects/${data.project_id}`);
      }, 1200);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create project");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      {showSuccess && (
        <Toast message="Project created!" type="success" onClose={() => setShowSuccess(false)} />
      )}
      {error && (
        <Toast message={error} type="error" onClose={() => setError("")} />
      )}
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">New Project</h1>
      <div className="card">
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Website URL</span>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full"
            placeholder="https://example.com"
            required
          />
        </label>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? <LoadingSpinner /> : "Create Project"}
        </button>
      </div>
    </div>
  );
}
