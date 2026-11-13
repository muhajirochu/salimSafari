/**
 * Consistent section heading: small coral eyebrow, title, optional subtitle.
 * Use `as="h1"` on pages where this is the main heading.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as: Heading = 'h2',
  light = false,
}) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <div className={`mb-10 max-w-2xl lg:mb-14 ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-coral-500">{eyebrow}</p>
      )}
      <Heading
        className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-ocean-900'
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-ocean-100' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
