"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  projectId: string;
};

export default function ChatBox({ projectId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const apiKey = localStorage.getItem("chattydevs_api_key");
    if (!apiKey) {
      setError("Missing API key. Please sign up again.");
      return;
    }

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setInput("");
    setSending(true);
    setError("");

    try {
      const res = await fetch(
        "https://api.skakram1110.workers.dev/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            project_id: projectId,
            message: userMessage,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Chat failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white border rounded p-4 flex flex-col h-[420px]">
      <h2 className="font-medium mb-2">Test your chatbot</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 text-sm mb-3">
        {messages.length === 0 && (
          <p className="text-gray-400">
            Ask something about your data…
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "text-right"
                : "text-left"
            }
          >
            <div
              className={
                m.role === "user"
                  ? "inline-block bg-black text-white px-3 py-2 rounded"
                  : "inline-block bg-gray-100 px-3 py-2 rounded"
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {sending && (
          <p className="text-gray-400 text-xs">
            Assistant is typing…
          </p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question..."
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={sending}
          className="bg-black text-white px-4 py-2 rounded text-sm disabled:opacity-60"
        >
          Send
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
