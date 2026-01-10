import Link from "next/link";

export default function Navbar() {
  const isLoggedIn = false; // UI-only toggle

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          ChattyDevs
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {isLoggedIn ? (
            <Link href="/dashboard/projects">Dashboard</Link>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/signup"
                className="bg-black text-white px-3 py-1.5 rounded"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
