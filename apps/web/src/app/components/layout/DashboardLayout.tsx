"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "../../lib/api";
import { Button, Container } from "../ui";

const menuItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    label: "Projects",
    path: "/dashboard/projects",
    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  },
  {
    label: "Usage",
    path: "/dashboard/usage",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [apiKey, setApiKey] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [planName, setPlanName] = useState<string>("Free");

  const handleLogout = () => {
    localStorage.removeItem("chattydevs_api_key");
    localStorage.removeItem("chattydevs_email");
    router.push("/");
  };

  useEffect(() => {
    setApiKey(localStorage.getItem("chattydevs_api_key") || "");
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const me = await api.me();
        if (!mounted) return;
        setPlanName(me.plan?.name || "Free");
      } catch {
        if (!mounted) return;
        setPlanName("Free");
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const email = typeof window !== "undefined" ? localStorage.getItem("chattydevs_email") : null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 border-r border-slate-900 bg-slate-950 p-6 flex flex-col gap-12 z-20">
        <div className="px-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-110 transition-transform shrink-0">
              <img src="/brand/chattydevs_icon.png" alt="ChattyDevs" className="w-10 h-10 object-contain block translate-y-[3px]" />
            </div>
            <span className="font-bold text-2xl tracking-tighter inline-flex items-center leading-none">
              <span className="text-white">Chatty</span>
              <span className="gradient-text">Devs</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-10 flex-1">
          <nav className="flex flex-col gap-2">
            <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">
              Main Dashboard
            </p>
            {menuItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/dashboard" && pathname?.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={
                    "flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all " +
                    (isActive
                      ? "bg-indigo-600/10 text-indigo-400 font-bold border border-indigo-500/20 shadow-xl shadow-indigo-500/5"
                      : "text-slate-500 hover:bg-slate-900 hover:text-slate-200")
                  }
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={isActive ? 2 : 1.5}
                      d={item.icon}
                    />
                  </svg>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-slate-900">
          <div className="px-3 py-4 bg-slate-900/40 rounded-2xl border border-slate-800/60 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold uppercase">
                {(email?.charAt(0) || "U").toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{email || "User Account"}</p>
                <p className="text-[10px] text-slate-500 font-medium">{planName} Plan</p>
              </div>
            </div>

            <div className="mt-4 mb-4 rounded-xl border border-slate-800/60 bg-slate-950/30 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">API Key</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[10px] h-7"
                  disabled={!apiKey}
                  onClick={async () => {
                    if (!apiKey) return;
                    try {
                      await navigator.clipboard.writeText(apiKey);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <p className="mt-2 font-mono text-[10px] text-slate-400 break-all">
                {apiKey ? `${apiKey.slice(0, 6)}…${apiKey.slice(-6)}` : "Missing — re-login to regenerate"}
              </p>
            </div>

            <Button
              variant="ghost"
              className="w-full text-xs py-1.5 h-auto justify-start"
              onClick={() => router.push("/pricing")}
            >
              Upgrade (coming soon)
            </Button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all group"
          >
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/5 via-slate-950 to-slate-950">
        <Container className="py-12 md:py-16">{children}</Container>
      </main>
    </div>
  );
}
