import type { Metadata } from "next";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Proyek",

  description:
    "Proyek dan kerangka pemikiran Sugiyarto mengenai transformasi administrasi perpajakan, perluasan basis pajak, diagnosis ekonomi, dan kualitas pertumbuhan.",

  alternates: {
    canonical: "/projects",
  },
};
type Project = {
  title: string;
  relatedArticle?: string;
  category: string;
  description: string;
};

const projects: Project[] = [
  {
    title: "Tax Administration 3.0",
    relatedArticle: "masa-depan-administrasi-perpajakan",
    category: "Transformasi Administrasi Pajak",
    description:
      "Eksplorasi transformasi administrasi perpajakan melalui electronic invoice, data transaksi, prefilled return, interoperabilitas, dan compliance by design.",
  },
  {
    title: "Tax Base Visibility Framework",
    relatedArticle: "tax-visibility-framework",
    category: "Perluasan Basis Pajak",
    description:
      "Kerangka untuk meningkatkan visibilitas aktivitas ekonomi, memperluas basis pajak, dan mendorong transisi dari invisible economy menuju ekonomi yang terdaftar, patuh, dan berkembang.",
  },
  {
    title: "Indonesia Economic EWS",
    relatedArticle: "ews-ekonomi-dan-kualitas-pertumbuhan",
    category: "Ekonomi & Kualitas Pertumbuhan",
    description:
      "Sistem early warning untuk membaca kualitas pertumbuhan dan mendeteksi tekanan pada siklus ekonomi, rumah tangga, sektor keuangan, eksternal, dan fiskal.",
  },
  {
    title: "Co-operative Compliance & Tax Control Framework",
    category: "Tata Kelola Kepatuhan",
    description:
      "Eksplorasi pendekatan kepatuhan berbasis transparansi, pengelolaan risiko, Tax Control Framework, dan hubungan kooperatif antara otoritas pajak dan wajib pajak.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="container-page py-20">
      <SectionTitle
        eyebrow="Proyek"
        title="Proyek yang sedang dikembangkan"
        description="Kumpulan kerangka pemikiran, dashboard, dan proyek riset yang dapat berkembang menjadi publikasi atau produk kebijakan."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="rounded-3xl bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {project.category}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{project.title}</h2>
            <p className="mt-4 leading-7 text-gray-600">{project.description}</p>
            {project.relatedArticle && (
              <RelatedArticleLink slug={project.relatedArticle} />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedArticleLink({ slug }: { slug: string }) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="mt-6 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
    >
      Artikel terkait: {article.title} →
    </Link>
  );
}
