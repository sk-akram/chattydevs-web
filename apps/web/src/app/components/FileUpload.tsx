"use client";

import { useState } from "react";
import { Toast } from "./ui/Toast";

type Props = {
  projectId: string;
};

export default function FileUpload({ projectId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState("");

  async function handleUpload() {
    if (uploading) return; // Prevent double submit
    const apiKey = localStorage.getItem("chattydevs_api_key");
    if (!apiKey) {
      setShowError("Missing API key. Please sign up again.");
      return;
    }
    if (!file) {
      setShowError("No file selected.");
      return;
    }
    // Validate file type
    const allowedTypes = ["application/pdf", "text/plain", "text/csv"];
    if (!allowedTypes.includes(file.type)) {
      setShowError("Invalid file type. Only PDF, TXT, and CSV allowed.");
      return;
    }

    setUploading(true);
    setMessage("");
    setShowError("");
    setShowSuccess(false);

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
      setShowSuccess(true);
      setFile(null);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setShowError(err.message);
      } else {
        setShowError("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4 shadow-lg">
      {showSuccess && (
        <Toast message="Upload complete!" type="success" onClose={() => setShowSuccess(false)} />
      )}
      {showError && (
        <Toast message={showError} type="error" onClose={() => setShowError("")} />
      )}
      <h2 className="font-semibold text-lg text-white">Upload documents</h2>

      <div className="border-dashed border-2 border-gray-600 rounded-lg p-4">
        <input
          type="file"
          accept=".pdf,.txt,.csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 transition-colors duration-150"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {message && (
        <p className={
          message.toLowerCase().includes("upload") || message.toLowerCase().includes("indexed")
            ? "text-sm text-green-500"
            : "text-sm text-red-500"
        }>
          {message}
        </p>
      )}
    </div>
  );
}
