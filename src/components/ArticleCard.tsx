import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group rounded-3xl border border-black/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4 text-xs text-gray-500">
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent)]">
          {article.category}
        </span>
        <span>{article.readTime}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight">
        {article.title}
      </h3>
      <p className="mt-3 leading-7 text-gray-600">{article.excerpt}</p>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-gray-500">{article.date}</span>
        <Link
          href={`/articles/${article.slug}`}
          className="font-medium text-[var(--accent)]"
        >
          Baca artikel →
        </Link>
      </div>
    </article>
  );
}
