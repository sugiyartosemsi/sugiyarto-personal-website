import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import { articles } from "@/lib/articles";

export default function ArticlesPage() {
  return (
    <section className="container-page py-20">
      <SectionTitle
        eyebrow="Articles"
        title="Artikel & Analisis"
        description="Tulisan mengenai ekonomi, perpajakan, administrasi, reformasi kebijakan, dan berbagai tema yang sedang saya eksplorasi."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
