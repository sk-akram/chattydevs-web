"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
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

      // Redirect to project page
      router.push(`/dashboard/projects/${data.project_id}`);
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
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold mb-2">
        Create New Project
      </h1>
      <p className="text-gray-600 mb-6">
        Train ChattyDevs on your website or documents
      </p>

      <div className="bg-white border rounded p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Project Name
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Stripe Docs Bot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Website URL
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="pt-2">
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded text-sm disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
