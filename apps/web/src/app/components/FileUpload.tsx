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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3 shadow-md">
      <h2 className="font-semibold text-lg text-gray-900 dark:text-white">Upload documents</h2>

      <input
        type="file"
        accept=".pdf,.txt,.csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-colors duration-150"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {message && (
        <p className="text-sm text-gray-700 dark:text-gray-200">{message}</p>
      )}
    </div>
  );
}
