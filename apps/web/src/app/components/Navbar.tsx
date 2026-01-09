import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-semibold">
        ChattyDevs
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/docs">Docs</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/login">Login</Link>

        <Link
          href="/signup"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Get API Key
        </Link>
      </div>
    </nav>
  );
}
