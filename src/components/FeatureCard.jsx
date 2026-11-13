/**
 * "Why Choose Me" feature card.
 * `icon` is a Lucide icon component.
 */
export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="card group h-full p-6 text-center hover:-translate-y-1 hover:shadow-lift lg:p-8">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-600 transition-colors duration-300 group-hover:bg-ocean-600 group-hover:text-white">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-ocean-900">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}
