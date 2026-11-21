import Link from "next/link";
import { site } from "@/lib/site";
import MobileMenu from "@/components/MobileMenu";

export const nav: [string, string][] = [
  ["Tentang", "/about"],
  ["Artikel", "/articles"],
  ["Publikasi", "/publications"],
  ["Proyek", "/projects"],
  ["Kontak", "/contact"],
];

export default function Navbar() {
  return (
    <header className="relative border-b border-black/5 bg-[var(--background)]/90 backdrop-blur">
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

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Hubungi Saya
          </Link>
          <MobileMenu items={nav} />
        </div>
      </div>
    </header>
  );
}
