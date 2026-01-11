import React from "react";

export type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <div
      className={
        role === "user"
          ? "text-right"
          : "text-left"
      }
    >
      <div
        className={
          role === "user"
            ? "inline-block bg-gradient-to-r from-black to-gray-800 text-white px-3 py-2 rounded-lg shadow"
            : "inline-block bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg shadow"
        }
      >
        {content}
      </div>
    </div>
  );
}
