export default function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">{description}</p>
      )}
    </div>
  );
}
