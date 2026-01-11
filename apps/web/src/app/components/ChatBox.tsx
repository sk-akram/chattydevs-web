"use client";

import { useState } from "react";
import MessageBubble from "./MessageBubble";

import LoadingSpinner from "./LoadingSpinner";
import { Toast } from "./ui/Toast";

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

  const [showError, setShowError] = useState("");

  async function sendMessage() {
    if (sending) return; // Prevent double submit
    if (!input.trim()) {
      setShowError("Please enter a message.");
      return;
    }

    const apiKey = localStorage.getItem("chattydevs_api_key");
    if (!apiKey) {
      setShowError("Missing API key. Please sign up again.");
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
    setShowError("");

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
        setShowError(err.message);
        setError(err.message);
      } else {
        setShowError("Something went wrong");
        setError("Something went wrong");
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col h-[420px] shadow-md">
      {showError && (
        <Toast message={showError} type="error" onClose={() => setShowError("")} />
      )}
      <h2 className="font-semibold mb-2 text-lg text-gray-900 dark:text-white">Test your chatbot</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 text-sm mb-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {messages.length === 0 && !sending && (
          <p className="text-gray-400">Ask something about your data…</p>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {sending && <LoadingSpinner />}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <button
          onClick={sendMessage}
          disabled={sending || !input.trim()}
          className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
