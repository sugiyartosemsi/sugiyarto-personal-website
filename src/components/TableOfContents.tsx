import type { TocItem } from "@/lib/toc";

function TocList({ items }: { items: TocItem[] }) {
  return (
    <ol className="space-y-1.5 text-sm leading-5">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-4" : "pt-1 font-medium"}>
          <a
            href={`#${item.id}`}
            className={`block hover:text-[var(--accent)] ${item.level === 3 ? "text-gray-600" : "text-gray-800"}`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Kotak daftar isi yang bisa dibuka-tutup (ponsel dan tablet). */
export function TocBox({ items }: { items: TocItem[] }) {
  return (
    <details className="mt-10 rounded-2xl border border-black/10 bg-white p-5 lg:hidden">
      <summary className="cursor-pointer text-sm font-semibold text-gray-800">
        Daftar isi ({items.length} bagian)
      </summary>
      <nav aria-label="Daftar isi" className="mt-4">
        <TocList items={items} />
      </nav>
    </details>
  );
}

/** Daftar isi di samping artikel yang tetap terlihat saat menggulir (layar lebar). */
export function TocSidebar({ items }: { items: TocItem[] }) {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <nav aria-label="Daftar isi" className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-2">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Daftar isi
        </p>
        <TocList items={items} />
      </nav>
    </aside>
  );
}
