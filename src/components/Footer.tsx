import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/10">
      <div className="container-page flex flex-col gap-5 py-10 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-gray-800">{site.name}</p>
          <p className="mt-1">{site.tagline}</p>
        </div>
        <div className="flex gap-5">
          <Link href="/articles">Articles</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
