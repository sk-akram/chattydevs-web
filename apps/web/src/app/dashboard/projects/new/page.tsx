"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function NewProjectPage() {
  const router = useRouter();
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
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">New Project</h1>
      <div className="bg-white border rounded-xl p-6 space-y-4 shadow">
        <label className="block">
          <span className="text-gray-700">Website URL</span>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2 text-sm"
            placeholder="https://example.com"
            required
          />
        </label>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded text-sm disabled:opacity-60"
        >
          {loading ? <LoadingSpinner /> : "Create Project"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
}
