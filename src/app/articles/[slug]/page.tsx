import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "@/lib/articles";

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
        width: 1200,
        height: 630,
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
        {article.author && (
          <p className="mt-5 text-sm text-gray-500">
            Oleh <span className="font-medium text-gray-800">{article.author}</span>
            {article.authorRole && <> · {article.authorRole}</>}
          </p>
        )}
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
      </div>
    </article>
  );
}
