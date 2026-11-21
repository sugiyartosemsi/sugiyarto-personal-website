"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { site } from "@/lib/site";

// ID form Formspree diatur di src/lib/site.ts (formspreeId); dapat ditimpa dengan
// NEXT_PUBLIC_FORMSPREE_ID di Vercel. Tanpa ID, tombol kirim membuka aplikasi email (mailto).
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || site.formspreeId;

type Status = "idle" | "sending" | "sent" | "error";

export default function ResponseForm({
  articles,
  email,
}: {
  articles: { slug: string; title: string }[];
  email: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const articleSelect = useRef<HTMLSelectElement>(null);

  // Dari tombol "Tanggapi artikel ini": /?artikel=<slug>#tanggapan → artikel itu langsung terpilih.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("artikel");
    const select = articleSelect.current;
    if (slug && select && articles.some((a) => a.slug === slug)) {
      select.value = slug;
      select.form?.querySelector<HTMLInputElement>("input[name=nama]")?.focus({ preventScroll: true });
    }
  }, [articles]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // jebakan spam

    const name = String(data.get("nama") ?? "").trim();
    const slug = String(data.get("artikel") ?? "");
    const message = String(data.get("tanggapan") ?? "").trim();
    const article = articles.find((a) => a.slug === slug)?.title ?? "Tulisan secara umum";

    if (!FORMSPREE_ID) {
      const subject = `Tanggapan: ${article}`;
      const body = `${message}\n\n— ${name}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      data.set("artikel", article);
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-2xl bg-[var(--accent-soft)] p-6 text-[var(--accent)]">
        <p className="font-medium">Terima kasih, tanggapan Anda sudah terkirim.</p>
        <p className="mt-2 text-sm">Setiap tanggapan dibaca, tetapi tidak semuanya dapat dibalas.</p>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-xl border border-black/10 bg-[var(--background)] px-4 py-3 text-base outline-none focus:border-[var(--accent)]";

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
      <label className="text-sm font-medium text-gray-700">
        Nama
        <input name="nama" required autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-medium text-gray-700">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-medium text-gray-700 md:col-span-2">
        Tulisan yang ditanggapi
        <select ref={articleSelect} name="artikel" defaultValue={articles[0]?.slug ?? ""} className={field}>
          {articles.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.title}
            </option>
          ))}
          <option value="">Tulisan secara umum</option>
        </select>
      </label>
      <label className="text-sm font-medium text-gray-700 md:col-span-2">
        Tanggapan
        <textarea
          name="tanggapan"
          required
          minLength={20}
          rows={6}
          placeholder="Setuju, tidak setuju, data pembanding, atau sudut pandang lain…"
          className={field}
        />
      </label>
      {/* Jebakan spam: disembunyikan dari pembaca */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="md:col-span-2">
        <p className="text-xs leading-5 text-gray-500">
          Kirimkan tanggapan atas isi tulisan. Pertanyaan tentang kewajiban atau layanan perpajakan
          pribadi tidak dapat dijawab di sini; silakan gunakan saluran resmi Direktorat Jenderal Pajak,
          misalnya Kring Pajak 1500200. Nama dan email hanya dipakai untuk membalas tanggapan Anda.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-5 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Mengirim…" : "Kirim Tanggapan"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-700">
            Tanggapan belum terkirim. Coba lagi, atau kirim email ke{" "}
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
