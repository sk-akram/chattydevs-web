"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { DashboardLayout } from "../components/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("chattydevs_api_key")) {
      router.push("/login");
    }
  }, [router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}
