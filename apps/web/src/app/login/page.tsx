"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard/projects");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border rounded-xl p-6 shadow">
        <h1 className="text-xl font-semibold mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Log in to your ChattyDevs account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
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
            Log in
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
