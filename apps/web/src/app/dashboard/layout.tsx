
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = true; // flip to false to test

  if (!isLoggedIn) {
    redirect("/login");
  }

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
