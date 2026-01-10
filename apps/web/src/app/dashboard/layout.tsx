import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = true; // flip to false to test

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <>{children}</>;
}
