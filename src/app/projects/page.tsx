import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Projects",

  description:
    "Proyek dan kerangka pemikiran Sugiyarto mengenai transformasi administrasi perpajakan, perluasan basis pajak, diagnosis ekonomi, dan kualitas pertumbuhan.",

  alternates: {
    canonical: "/projects",
  },
};
const projects = [
  {
    title: "Tax Administration 3.0",
    category: "Transformasi Administrasi Pajak",
    description:
      "Eksplorasi transformasi administrasi perpajakan melalui electronic invoice, data transaksi, prefilled return, interoperabilitas, dan compliance by design.",
  },
  {
    title: "Tax Base Visibility Framework",
    category: "Perluasan Basis Pajak",
    description:
      "Kerangka untuk meningkatkan visibilitas aktivitas ekonomi, memperluas basis pajak, dan mendorong transisi dari invisible economy menuju ekonomi yang terdaftar, patuh, dan berkembang.",
  },
  {
    title: "Indonesia Economic EWS",
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
        eyebrow="Projects"
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
          </article>
        ))}
      </div>
    </section>
  );
}
