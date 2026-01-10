import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-lg font-bold text-white">ChattyDevs</div>

        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm text-gray-300 hover:text-white">
            Login
          </a>

          <a
            href="/signup"
            className="rounded-md bg-white px-4 py-2 text-sm text-black"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>

  );
}
