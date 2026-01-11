import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3 select-none">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 mr-3"></span>
          <span className="text-3xl font-bold tracking-tight text-white">ChattyDevs</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="btn-secondary text-sm font-semibold">
            Login
          </a>
          <a
            href="/signup"
            className="btn-primary text-sm font-semibold shadow-md"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
