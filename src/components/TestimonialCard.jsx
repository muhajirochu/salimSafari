import { Quote, Star } from 'lucide-react';

/** Guest testimonial card with star rating */
export default function TestimonialCard({ quote, name, origin, tour, rating = 5 }) {
  // Initials avatar (no photo needed)
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="card relative flex h-full flex-col p-6 lg:p-8">
      <Quote className="absolute right-6 top-6 h-10 w-10 text-sand-200" aria-hidden="true" />
      <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'fill-coral-500 text-coral-500' : 'text-slate-300'}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">“{quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-ocean-500 to-ocean-700 text-sm font-semibold text-white">
          {initials}
        </span>
        <span>
          <span className="block font-semibold text-slate-800">{name}</span>
          <span className="block text-sm text-slate-500">
            {origin} · {tour}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
