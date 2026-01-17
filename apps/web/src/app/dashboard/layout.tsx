"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { DashboardLayout } from "../components/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("chattydevs_api_key")) {
      router.push("/login");
      return;
    }

    const onboarded = localStorage.getItem("chattydevs_onboarded") === "1";
    const path = window.location.pathname;
    if (!onboarded && !path.startsWith("/dashboard/onboarding")) {
      router.push("/dashboard/onboarding");
    }
  }, [router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}
