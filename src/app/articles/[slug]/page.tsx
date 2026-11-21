import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Artikel tidak ditemukan",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
  title: article.title,
  description: article.excerpt,

  alternates: {
    canonical: `/articles/${article.slug}`,
  },

  openGraph: {
    title: article.title,
    description: article.excerpt,
    url: `/articles/${article.slug}`,
    siteName: "Sugiyarto",
    locale: "id_ID",
    type: "article",
    images: [
      {
        url: article.ogImage,
        alt: `${article.title} | Sugiyarto`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.excerpt,
    images: [article.ogImage],
  },
};
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  return (
    <article className="container-page py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/articles" className="text-sm font-medium text-[var(--accent)]">
          ← Semua artikel
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent)]">
            {article.category}
          </span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
        <h1
          className={`mt-6 font-semibold leading-tight tracking-[-0.03em] ${
            article.title.length > 80 ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl"
          }`}
        >
          {article.title}
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-600">{article.excerpt}</p>

        {article.html ? (
          <div
            className="prose-copy mt-12 border-t border-black/10 pt-8"
            // Isi berasal dari file Word milik pemilik situs di content/articles/, dikonversi saat build.
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        ) : (
          <div className="prose-copy mt-12 border-t border-black/10 pt-8">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        <ArticleNotice author={article.author ?? site.name} date={article.date} />
      </div>
    </article>
  );
}

function ArticleNotice({ author, date }: { author: string; date: string }) {
  // Tahun hak cipta = tahun terbit artikel (mis. "26 Agustus 2026" → 2026).
  const year = /\b(\d{4})\b/.exec(date)?.[1] ?? String(new Date().getFullYear());

  return (
    <aside
      aria-label="Keterangan artikel"
      className="mt-16 space-y-3 rounded-2xl border border-black/10 bg-white p-6 text-sm leading-6 text-gray-600"
    >
      <p>
        <span className="font-medium text-gray-800">Pendapat pribadi.</span> Artikel ini merupakan
        pendapat pribadi penulis dan tidak mencerminkan sikap instansi tempat penulis bekerja.
      </p>
      <p>
        <span className="font-medium text-gray-800">
          © {year} {author}.
        </span>{" "}
        Hak cipta dilindungi undang-undang. Boleh dikutip dengan menyebutkan nama penulis dan tautan
        ke artikel ini. Dilarang memperbanyak atau menyebarluaskan sebagian atau seluruh isi artikel
        tanpa izin tertulis dari penulis.
      </p>
    </aside>
  );
}
