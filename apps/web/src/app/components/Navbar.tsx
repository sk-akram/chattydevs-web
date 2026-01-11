import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-xl font-extrabold tracking-tight text-white select-none">ChattyDevs</div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm text-gray-300 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white rounded px-2 py-1">
            Login
          </a>
          <a
            href="/signup"
            className="rounded-md bg-white px-4 py-2 text-sm text-black font-semibold shadow hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
