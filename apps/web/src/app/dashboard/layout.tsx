import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-semibold">ChattyDevs</span>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/projects"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Projects
          </Link>

          <Link
            href="/dashboard/settings"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="h-16 border-b bg-white flex items-center px-6">
          <span className="text-sm text-gray-600">
            Dashboard
          </span>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
