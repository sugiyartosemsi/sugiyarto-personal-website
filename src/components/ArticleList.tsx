"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import type { Article } from "@/lib/articles";

const ALL = "Semua";

export default function ArticleList({ articles }: { articles: Article[] }) {
  const categories = [ALL, ...Array.from(new Set(articles.map((a) => a.category)))];
  const [active, setActive] = useState(ALL);
  const shown = active === ALL ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      {categories.length > 2 && (
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active === category
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-black/10 bg-white text-gray-700 hover:border-[var(--accent)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {shown.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}
