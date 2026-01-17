"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button, Container } from "../ui";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("chattydevs_api_key")));
  }, []);

  return (
    <nav className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
      <Container className="flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-110 transition-transform">
            <img src="/brand/chattydevs_icon.png" alt="ChattyDevs" className="w-10 h-10 object-contain" />
          </div>
          <span className="font-bold text-2xl tracking-tighter">
            <span className="text-white">Chatty</span>
            <span className="gradient-text">Devs</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Documentation
          </Link>
          <div className="w-px h-5 bg-slate-800" />

          {isLoggedIn ? (
            <Button size="sm" onClick={() => (window.location.href = "/dashboard")}>
              Go to Dashboard
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Button size="sm" onClick={() => (window.location.href = "/signup")}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
}
