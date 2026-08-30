import SectionTitle from "@/components/SectionTitle";
import { site } from "@/lib/site";

export default function ContactPage() {
  return (
    <section className="container-page py-20">
      <SectionTitle
        eyebrow="Contact"
        title="Mari bertukar gagasan"
        description="Untuk diskusi, kolaborasi, atau pertukaran pemikiran mengenai ekonomi, perpajakan, riset, dan kebijakan publik."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-7">
          <p className="text-sm text-gray-500">Email</p>
          <a
  href={`mailto:${site.email}`}
  className="mt-3 block font-medium text-[var(--accent)] hover:underline"
>
  {site.email}
</a>

        </div>
        <div className="rounded-3xl bg-white p-7">
          <p className="text-sm text-gray-500">Lokasi</p>
          <p className="mt-3 font-medium">{site.location}</p>
        </div>
        <div className="rounded-3xl bg-[var(--accent)] p-7 text-white">
          <p className="text-sm text-white/60">Fokus diskusi</p>
          <p className="mt-3 font-medium">
            Ekonomi, perpajakan, transformasi administrasi, dan kebijakan publik.
          </p>
        </div>
      </div>
    </section>
  );
}
