"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function handleCreate() {
    // UI-only fake project id
    router.push("/dashboard/projects/demo-project");
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

        <div className="pt-2">
          <button
            onClick={handleCreate}
            className="bg-black text-white px-4 py-2 rounded text-sm"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
