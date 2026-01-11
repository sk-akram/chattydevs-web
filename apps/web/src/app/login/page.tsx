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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-sm card">
        <h1 className="text-2xl font-extrabold mb-1 text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Log in to your ChattyDevs account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full"
            required
          />

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Log in
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
