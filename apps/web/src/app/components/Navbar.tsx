import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 select-none">
          <span className="inline-block w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 mr-2"></span>
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">ChattyDevs</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/login" className="btn-secondary text-base font-medium">
            Login
          </a>
          <a
            href="/signup"
            className="btn-primary text-base font-medium shadow"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
