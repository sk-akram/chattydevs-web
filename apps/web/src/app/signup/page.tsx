"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(
      "https://api.skakram1110.workers.dev/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      }
    );

    const data = await res.json();

    localStorage.setItem("chattydevs_api_key", data.api_key);

    router.push("/dashboard/projects");
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border rounded p-6">
        <h1 className="text-xl font-semibold mb-1">
          Create your account
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Start building your AI chatbot
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded text-sm"
          >
            Sign up
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
