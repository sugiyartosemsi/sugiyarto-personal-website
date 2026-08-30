import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { site } from "@/lib/site";

export default function AboutPage() {
  return (
    <section className="container-page py-20">
      <SectionTitle
        eyebrow="About"
        title={`Tentang ${site.name}`}
        description="Profil, gagasan, dan perjalanan pemikiran di bidang ekonomi, perpajakan, kebijakan publik dan transformasi administrasi."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
        <aside className="rounded-3xl bg-[var(--accent)] p-8 text-white">
          <Image
  src="/foto-sugiyarto.png"
  alt="Foto Sugiyarto"
  width={96}
  height={96}
  className="h-24 w-24 rounded-full object-top"
/>
          <h2 className="mt-6 text-2xl font-semibold">{site.name}</h2>
          <p className="mt-2 text-white/70">{site.tagline}</p>
          <p className="mt-8 text-sm leading-7 text-white/70">
            Mengembangkan gagasan melalui analisis, dialektika pemikiran, dan pendekatan berbasis data untuk memahami persoalan ekonomi, perpajakan, dan kebijakan publik.
          </p>
        </aside>

        <article className="prose-copy">
          <p>
            Website ini saya bangun sebagai ruang untuk mengembangkan dan membagikan gagasan mengenai ekonomi, perpajakan, dan kebijakan publik. Di sini saya mendokumentasikan hasil pemikiran, analisis, serta berbagai kerangka kebijakan yang lahir dari pengalaman profesional, proses belajar, dan ketertarikan saya terhadap bagaimana kebijakan dapat dirancang secara lebih efektif dan berbasis data.
          </p>
          <p>
           Pemikiran saya banyak berkembang melalui dialektika antara ekonomi, perpajakan, kebijakan fiskal, transformasi administrasi, dan pemanfaatan teknologi. Saya tertarik pada bagaimana berbagai perspektif tersebut dapat saling menguji dan melengkapi untuk memahami persoalan secara lebih utuh, merancang kebijakan yang lebih efektif, serta menghasilkan solusi yang tidak hanya kuat secara konseptual, tetapi juga realistis untuk diterapkan dan dapat diukur hasilnya.
          </p>
          <p>
            Dari proses tersebut, website ini menjadi ruang untuk menuangkan gagasan ke dalam berbagai bentuk—mulai dari artikel, analisis kebijakan, kerangka konseptual, visualisasi, hingga proyek yang terus dikembangkan. Saya berharap setiap tulisan tidak berhenti pada penyampaian opini, tetapi dapat menjadi bagian dari proses menguji gagasan, memperkaya perspektif, dan merumuskan solusi yang relevan bagi persoalan ekonomi, perpajakan, dan kebijakan publik.
          </p>
        </article>
      </div>
    </section>
  );
}
