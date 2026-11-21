import type { Metadata } from "next";
import ArticleList from "@/components/ArticleList";
import SectionTitle from "@/components/SectionTitle";
import { articles } from "@/lib/articles";
export const metadata: Metadata = {
  title: "Artikel & Analisis",

  description:
    "Artikel dan analisis Sugiyarto mengenai ekonomi, perpajakan, administrasi perpajakan, kebijakan fiskal, reformasi kebijakan, dan berbagai isu kebijakan publik.",

  alternates: {
    canonical: "/articles",
  },
};
export default function ArticlesPage() {
  return (
    <section className="container-page py-20">
      <SectionTitle
        eyebrow="Artikel"
        title="Artikel & Analisis"
        description="Tulisan mengenai ekonomi, perpajakan, administrasi, reformasi kebijakan, dan berbagai tema yang sedang saya eksplorasi."
      />

      <ArticleList articles={articles} />
    </section>
  );
}
