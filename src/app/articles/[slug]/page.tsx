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
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-600">{article.excerpt}</p>

        <div className="prose-copy mt-12 border-t border-black/10 pt-8">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
