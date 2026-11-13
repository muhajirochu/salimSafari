import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { formatDate } from '../utils/date';

/**
 * Full-screen image viewer.
 * - Close: X button, Escape key, or clicking the dark backdrop
 * - Navigate: prev/next buttons, ← / → keys, or swipe on touch devices
 *
 * Props:
 *   items  – array of gallery items
 *   index  – currently open index (null = closed)
 *   onClose, onChange(newIndex)
 */
export default function Lightbox({ items, index, onClose, onChange }) {
  const closeBtnRef = useRef(null);
  const touchStartX = useRef(null);
  const isOpen = index !== null && index >= 0 && index < items.length;

  const prev = useCallback(
    () => onChange((index - 1 + items.length) % items.length),
    [index, items.length, onChange],
  );
  const next = useCallback(() => onChange((index + 1) % items.length), [index, items.length, onChange]);

  // Keep latest handlers in a ref so the key listener never goes stale
  const handlersRef = useRef({ onClose, prev, next });
  handlersRef.current = { onClose, prev, next };

  // Runs once per open/close: scroll lock, initial focus, focus restore, keyboard controls
  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      const h = handlersRef.current;
      if (e.key === 'Escape') h.onClose();
      if (e.key === 'ArrowLeft') h.prev();
      if (e.key === 'ArrowRight') h.next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  if (!isOpen) return null;
  const item = items[index];

  // Simple swipe detection for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) (delta > 0 ? prev : next)();
    touchStartX.current = null;
  };

  const navBtn =
    'absolute top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-slate-950/95 p-4"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-3 top-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:right-6 sm:top-6"
      >
        <X className="h-6 w-6" />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className={`${navBtn} left-2 sm:left-6`}
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className={`${navBtn} right-2 sm:right-6`}
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      {/* Stop propagation so clicking the image itself doesn't close the viewer */}
      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={item.id}
          src={item.image}
          alt={`${item.caption} — ${item.location}`}
          className="max-h-[75vh] w-auto animate-fade-in rounded-xl object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-white">
          <p className="text-lg font-medium">{item.caption}</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-coral-400" aria-hidden="true" />
            {item.location} · {formatDate(item.date)}
          </p>
          <p className="mt-2 text-xs text-slate-400" aria-live="polite">
            {index + 1} / {items.length}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
