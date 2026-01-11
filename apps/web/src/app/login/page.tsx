"use client";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

import { SectionHeading } from "../components/ui/SectionHeading";
import { Toast } from "../components/ui/Toast";

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return; // Prevent double submit
    // TODO: Implement real login logic if backend supports it
    if (!email || !password) {
      setShowError("Please enter your email and password.");
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setShowError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/projects");
    }, 800);
  }

  return (
    <Container className="flex items-center justify-center min-h-screen py-12">
      {showError && (
        <Toast message={showError} type="error" onClose={() => setShowError("")} />
      )}
      <Card className="w-full max-w-md mx-auto">
        <SectionHeading className="text-center mb-2">Welcome back</SectionHeading>
        <p className="text-sm text-gray-500 mb-8 text-center">Log in to your ChattyDevs account</p>
        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            label="Email address"
            error={error}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Password"
            error={error}
          />
          <Button type="submit" fullWidth size="md" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-6 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </p>
      </Card>
    </Container>
  );
}
