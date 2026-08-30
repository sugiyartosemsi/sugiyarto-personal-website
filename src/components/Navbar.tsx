import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  ["About", "/about"],
  ["Articles", "/articles"],
  ["Publications", "/publications"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  return (
    <header className="border-b border-black/5 bg-[var(--background)]/90 backdrop-blur">
      <div className="container-page flex min-h-20 items-center justify-between gap-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {site.name}
        </Link>

        <nav className="hidden gap-7 text-sm text-gray-600 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-black">
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Hubungi Saya
        </Link>
      </div>
    </header>
  );
}
