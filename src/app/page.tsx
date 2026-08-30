import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

const expertise = [
  "Perpajakan & Kebijakan Fiskal",
  "Administrasi Pajak & Transformasi Digital",
  "Ekonomi & Kualitas Pertumbuhan",
  "Analisis Data & Kebijakan Publik",
];

const projects = [
  {
    title: "Transformasi Administrasi Pajak",
    description:
      "Gagasan mengenai electronic invoice, data transaksi, prefilled return, dan compliance by design.",
  },
  {
    title: "Perluasan dan Kualitas Basis Pajak",
    description:
      "Kerangka untuk meningkatkan visibilitas ekonomi informal menuju basis pajak yang lebih produktif.",
  },
  {
    title: "Diagnosis Ekonomi dan Kualitas Pertumbuhan",
    description:
      "Dashboard risiko ekonomi yang menggabungkan siklus, rumah tangga, keuangan, eksternal, dan fiskal.",
  },
];

export default function Home() {
  return (
    <>
      <section className="container-page grid min-h-[72vh] items-center gap-12 py-20 md:grid-cols-[1.3fr_.7fr]">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
            Personal Knowledge Hub
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.04em] md:text-6xl">
            Menguji gagasan, memperkaya perspektif, dan merumuskan kebijakan yang lebih baik
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
            {site.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white"
            >
              Baca Artikel
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium"
            >
              Tentang Saya
            </Link>
          </div>
        </div>

        <div className="mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center rounded-[2.5rem] bg-[var(--accent)] text-white shadow-2xl">
          <div className="text-center">
            <Image
  src="/foto-sugiyarto.png"
  alt="Foto Sugiyarto"
  width={112}
  height={112}
  className="mx-auto h-28 w-28 rounded-full object-cover object-top"
/>
            <p className="mt-6 text-2xl font-semibold">{site.name}</p>
            <p className="mt-2 text-sm text-white/70">{site.tagline}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white">
        <div className="container-page py-20">
          <SectionTitle
            eyebrow="Areas of Interest"
            title="Bidang yang saya tulis dan eksplorasi"
            description="Website ini dirancang sebagai ruang kerja intelektual: ide, analisis, kerangka kebijakan, dan proyek yang dapat terus dikembangkan."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {expertise.map((item, i) => (
              <div
                key={item}
                className="rounded-3xl border border-black/8 bg-[var(--background)] p-6"
              >
                <p className="text-xs font-semibold text-[var(--accent)]">0{i + 1}</p>
                <p className="mt-4 text-xl font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Latest Writing"
            title="Artikel terbaru"
            description="Catatan dan analisis mengenai ekonomi, perpajakan, dan kebijakan publik."
          />
          <Link href="/articles" className="text-sm font-medium text-[var(--accent)]">
            Lihat semua artikel →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-[#111915] text-white">
        <div className="container-page py-24">
          <SectionTitle
            eyebrow="Selected Projects"
            title="Proyek dan kerangka pemikiran"
            description="Beberapa proyek dapat berkembang menjadi policy paper, dashboard, artikel, atau riset yang lebih besar."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <div key={project.title} className="rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-4 leading-7 text-white/65">{project.description}</p>
              </div>
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-8 inline-block text-sm font-medium text-white"
          >
            Lihat seluruh proyek →
          </Link>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="rounded-[2.25rem] bg-white p-8 shadow-sm md:p-14">
          <p className="text-sm font-semibold text-[var(--accent)]">Mari terhubung</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Ide yang baik menjadi lebih kuat ketika diuji, diperdebatkan, dan dikembangkan.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-gray-600">
            Gunakan halaman kontak untuk diskusi, kolaborasi, atau pertukaran gagasan.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white"
          >
            Hubungi Saya
          </Link>
        </div>
      </section>
    </>
  );
}
