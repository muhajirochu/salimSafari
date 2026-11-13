import { useCallback, useEffect, useMemo, useState } from 'react';

export const GALLERY_STORAGE_KEY = 'salim_safari_gallery';

/** Safely read the saved photos array from localStorage */
function readStorage() {
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupted JSON or storage disabled (e.g. private mode) — fail gracefully
    return [];
  }
}

/** Sort newest first by "YYYY-MM-DD" date, then by creation time */
function sortNewestFirst(items) {
  return [...items].sort(
    (a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0),
  );
}

/**
 * Gallery data hook backed by localStorage.
 *
 * Returns:
 *   photos     – admin-uploaded photos (newest first)
 *   allPhotos  – admin-uploaded photos (newest first) for public pages
 *   addPhoto({ image, caption, location, date, publicId })
 *   removePhoto(id)
 */
export default function useLocalGallery() {
  const [photos, setPhotos] = useState(readStorage);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(photos));
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [photos]);

  // Keep multiple open tabs in sync (e.g. admin tab + public gallery tab)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === GALLERY_STORAGE_KEY) setPhotos(readStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addPhoto = useCallback((photo) => {
    const newPhoto = {
      id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
      ...photo,
    };
    setPhotos((prev) => [newPhoto, ...prev]);
    return newPhoto;
  }, []);

  const removePhoto = useCallback((id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const sortedPhotos = useMemo(() => sortNewestFirst(photos), [photos]);

  return { photos: sortedPhotos, allPhotos: sortedPhotos, addPhoto, removePhoto };
}
