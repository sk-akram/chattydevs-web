

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const apiKey = localStorage.getItem("chattydevs_api_key");
      if (!apiKey) {
        router.replace("/login");
      }
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
