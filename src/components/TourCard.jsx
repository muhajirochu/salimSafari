import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

/**
 * Tour preview card. The whole card is clickable via a stretched link
 * so the tap target is large on mobile.
 */
export default function TourCard({ tour }) {
  return (
    <article className="card group relative flex h-full flex-col hover:-translate-y-1 hover:shadow-lift">
      {/* Fixed aspect ratio prevents layout shift while the image loads */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
        <img
          src={tour.image}
          alt={tour.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ocean-800 shadow-sm">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {tour.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="text-xl font-semibold text-ocean-900">
          <Link to={`/tours/${tour.id}`} className="rounded after:absolute after:inset-0 after:content-['']">
            {tour.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-600">{tour.shortDescription}</p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            From <span className="text-2xl font-bold text-coral-500">${tour.price}</span>
            <span className="text-xs"> / person</span>
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ocean-700 transition-all group-hover:gap-2">
            View tour <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
