"use client";

import { useState } from "react";

type Props = {
  projectId: string;
};

export default function FileUpload({ projectId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function handleUpload() {
    const apiKey = localStorage.getItem("chattydevs_api_key");
    if (!apiKey || !file) return;

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("project_id", projectId);
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

      setMessage(
        `Uploaded "${data.filename}" → ${data.chunks_indexed} chunks indexed`
      );
      setFile(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white border rounded p-4 space-y-3">
      <h2 className="font-medium">Upload documents</h2>

      <input
        type="file"
        accept=".pdf,.txt,.csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-black text-white px-4 py-2 rounded text-sm disabled:opacity-60"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {message && (
        <p className="text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
