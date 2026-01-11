"use client";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

import { SectionHeading } from "../components/ui/SectionHeading";
import { Toast } from "../components/ui/Toast";


export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return; // Prevent double submit
    setError("");
    setShowSuccess(false);
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.skakram1110.workers.dev/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }
      localStorage.setItem("chattydevs_api_key", data.api_key);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/dashboard/projects");
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      {showSuccess && (
        <Toast message="Project created!" type="success" onClose={() => setShowSuccess(false)} />
      )}
      {error && (
        <Toast message={error} type="error" onClose={() => setError("")} />
      )}
      <Card className="w-full max-w-md mx-auto">
        <SectionHeading className="text-center mb-2">Create your account</SectionHeading>
        <p className="text-sm text-gray-500 mb-8 text-center">Start building your AI chatbot</p>
        <form onSubmit={handleSignup} className="space-y-5">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            label="Email address"
            error={error}
          />
          <Button type="submit" fullWidth disabled={loading} size="md">
            {loading ? <LoadingSpinner size={20} /> : "Get API Key"}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-6 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">Log in</Link>
        </p>
      </Card>
    </Container>
  );
}
