"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, Card, Container, Input } from "../components/ui";
import { api } from "../lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("chattydevs_api_key")) router.push("/dashboard");
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.signup(email);
      localStorage.setItem("chattydevs_api_key", response.api_key);
      localStorage.setItem("chattydevs_email", email);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-600/10 to-transparent -z-10" />

      <Container className="max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 shrink-0">
              <img src="/brand/chattydevs_icon.png" alt="ChattyDevs" className="w-10 h-10 object-contain block translate-y-[2px]" />
            </div>
            <span className="font-bold text-2xl inline-flex items-center leading-none">
              <span className="text-white">Chatty</span>
              <span className="gradient-text">Devs</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-slate-400">Enter your email to get started with your first bot.</p>
        </div>

        <Card className="p-8 shadow-2xl bg-slate-900/80">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoFocus
            />

            {error ? (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                {error}
              </div>
            ) : null}

            <Button size="lg" type="submit" isLoading={loading} className="w-full">
              Sign Up
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </Card>

        <p className="mt-10 text-center text-xs text-slate-600">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </Container>
    </div>
  );
}
