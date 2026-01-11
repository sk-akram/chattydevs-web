import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "ChattyDevs",
  description: "Train a website chatbot on your own content.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-200 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
