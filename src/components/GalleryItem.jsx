import { MapPin } from 'lucide-react';
import { formatDate } from '../utils/date';

/**
 * Single gallery tile. Rendered as a <button> so it's keyboard accessible
 * and opens the lightbox on click/Enter.
 * `compact` hides the caption (used for the Home page thumbnails).
 */
export default function GalleryItem({ item, onOpen, compact = false }) {
  return (
    <figure className="card group h-full hover:shadow-lift">
      <button
        type="button"
        onClick={onOpen}
        className="relative block aspect-square w-full overflow-hidden bg-sand-100"
        aria-label={`Open photo: ${item.caption}`}
      >
        <img
          src={item.image}
          alt={`${item.caption} — ${item.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <span className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>

      {!compact && (
        <figcaption className="p-4">
          <p className="font-medium text-slate-800">{item.caption}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-coral-500" aria-hidden="true" />
            <span>
              {item.location} · <time dateTime={item.date}>{formatDate(item.date)}</time>
            </span>
          </p>
        </figcaption>
      )}
    </figure>
  );
}
