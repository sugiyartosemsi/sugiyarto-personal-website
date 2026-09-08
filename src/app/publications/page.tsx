import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Publikasi",

  description:
    "Publikasi, policy paper, artikel, dan karya Sugiyarto di bidang ekonomi, perpajakan, kebijakan fiskal, administrasi perpajakan, dan kebijakan publik.",

  alternates: {
    canonical: "/publications",
  },
};
const items = [
  {
    type: "Policy Paper",
    title: "Electronic Invoice dan Transformasi Administrasi Pajak",
    status: "Working Paper",
  },
  {
    type: "Conceptual Framework",
    title: "Tax Base Visibility Framework",
    status: "Concept Note",
  },
  {
    type: "Economic Monitoring",
    title: "Indonesia Economic Early Warning System",
    status: "Ongoing Project",
  },
  {
    type: "Tax Governance",
    title: "Co-operative Compliance & Tax Control Framework",
    status: "Research Development",
  },
];

export default function PublicationsPage() {
  return (
    <section className="container-page py-20">
      <SectionTitle
        eyebrow="Publications"
        title="Publikasi & Karya Tulis"
        description="Tempat untuk menampilkan policy paper, artikel media, working paper, presentasi, dan publikasi lainnya."
      />

      <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
        {items.map((item) => (
          <div key={item.title} className="grid gap-4 py-7 md:grid-cols-[180px_1fr_120px] md:items-center">
            <p className="text-sm font-medium text-[var(--accent)]">{item.type}</p>
            <p className="text-lg font-medium">{item.title}</p>
            <p className="text-sm text-gray-500 md:text-right">{item.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
