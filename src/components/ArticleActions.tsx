"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  slug: string;
  title: string;
  url: string;
  /** Kutipan format APA dalam teks biasa (untuk disalin). */
  citation: string;
  /** Bagian kutipan sebelum dan sesudah judul, supaya judul bisa dicetak miring. */
  citationParts: { before: string; title: string; after: string };
};

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function ArticleActions({ slug, title, url, citation, citationParts }: Props) {
  const [copied, setCopied] = useState<"link" | "citation" | null>(null);

  async function onCopy(kind: "link" | "citation") {
    if (await copy(kind === "link" ? url : citation)) {
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    }
  }

  const share = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  ];
  const chip =
    "rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-[var(--accent)] hover:text-[var(--accent)]";

  return (
    <section aria-label="Tanggapi, bagikan, dan kutip artikel" className="mt-16 space-y-8 border-t border-black/10 pt-10">
      <div className="rounded-2xl bg-[var(--accent-soft)] p-6">
        <p className="font-semibold text-gray-900">Punya pandangan lain atas tulisan ini?</p>
        <p className="mt-1 text-sm leading-6 text-gray-700">
          Tanggapan, data pembanding, dan bantahan yang berargumen sangat diterima.
        </p>
        <Link
          href={`/?artikel=${encodeURIComponent(slug)}#tanggapan`}
          className="mt-4 inline-block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Tanggapi artikel ini
        </Link>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">Bagikan</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {share.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={chip}>
              {s.label}
            </a>
          ))}
          <button type="button" onClick={() => onCopy("link")} className={chip}>
            {copied === "link" ? "Tautan tersalin ✓" : "Salin tautan"}
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">Cara mengutip (APA)</p>
        <div className="mt-3 rounded-2xl border border-black/10 bg-white p-5 text-sm leading-6 text-gray-700">
          <p className="break-words">
            {citationParts.before}
            <em>{citationParts.title}</em>
            {citationParts.after}
          </p>
          <button
            type="button"
            onClick={() => onCopy("citation")}
            className="mt-3 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            {copied === "citation" ? "Kutipan tersalin ✓" : "Salin kutipan"}
          </button>
        </div>
      </div>
    </section>
  );
}
