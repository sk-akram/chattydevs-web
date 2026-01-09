import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20 px-6 py-10 text-sm text-gray-600">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <p>© {new Date().getFullYear()} ChattyDevs</p>

        <div className="flex gap-6">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
