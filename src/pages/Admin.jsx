import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ImagePlus, Lock, LogOut, MapPin, Save, Trash2, X } from 'lucide-react';
import { LogoMark } from '../components/Icons';
import { siteConfig } from '../data/siteConfig';
import useLocalGallery from '../hooks/useLocalGallery';
import useCloudinaryWidget, { isCloudinaryConfigured } from '../hooks/useCloudinaryWidget';
import usePageTitle from '../hooks/usePageTitle';
import { formatDate, todayISO } from '../utils/date';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'salim2026';
const SESSION_KEY = 'salim_safari_admin';

const EMPTY_DETAILS = { caption: '', location: '', date: todayISO() };

/** Read and resize a local image file to a compressed JPEG data URL so it fits cleanly in localStorage */
function readLocalImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPG, PNG, WEBP).'));
      return;
    }
    if (file.size > 10_000_000) {
      reject(new Error('Image must be 10 MB or smaller.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the selected file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode the selected image.'));
      img.onload = () => {
        const maxDim = 1600;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve({
          url: dataUrl,
          publicId: `local-${Date.now()}`,
          width,
          height,
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  usePageTitle('Admin');
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  // Keep the admin page out of search engines
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  };

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Minimal admin header (public navbar is not shown here) */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 rounded-lg">
            <LogoMark className="h-8 w-8" />
            <span className="font-bold text-ocean-800">{siteConfig.businessName} · Admin</span>
          </Link>
          {unlocked && (
            <button type="button" onClick={logout} className="btn-ghost !px-4 !py-2 text-sm">
              <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
            </button>
          )}
        </div>
      </header>

      <main className="container-page py-8 lg:py-12">
        {unlocked ? (
          <Dashboard />
        ) : (
          <PasswordGate
            onUnlock={() => {
              sessionStorage.setItem(SESSION_KEY, '1');
              setUnlocked(true);
            }}
          />
        )}
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Password gate                                                     */
/* ---------------------------------------------------------------- */
function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) onUnlock();
    else setError('Wrong password. Please try again.');
  };

  return (
    <div className="mx-auto max-w-sm pt-8">
      <div className="card p-6 sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-600">
          <Lock className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold text-ocean-900">Admin login</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Enter the password to manage gallery photos.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-password" className="label">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="input"
              autoFocus
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'admin-password-error' : undefined}
            />
            {error && (
              <p id="admin-password-error" className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
          <button type="submit" id="admin-login" className="btn-primary w-full">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Dashboard: upload → add details → save; list + delete            */
/* ---------------------------------------------------------------- */
function Dashboard() {
  const { photos, addPhoto, removePhoto } = useLocalGallery();
  const [uploaded, setUploaded] = useState(null); // { url, publicId } after upload
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [formError, setFormError] = useState('');
  const [localUploadError, setLocalUploadError] = useState('');
  const [toast, setToast] = useState('');
  const fileInputRef = useRef(null);

  const { open: openCloudinary, ready: cloudinaryReady, error: widgetError } = useCloudinaryWidget((info) => {
    setUploaded(info);
    setDetails({ ...EMPTY_DETAILS, date: todayISO() });
    setFormError('');
  });

  // Auto-hide success message
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleOpenPicker = () => {
    setLocalUploadError('');
    if (isCloudinaryConfigured && cloudinaryReady) {
      openCloudinary();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const info = await readLocalImage(file);
      setUploaded(info);
      setDetails({ ...EMPTY_DETAILS, date: todayISO() });
      setFormError('');
      setLocalUploadError('');
    } catch (err) {
      setLocalUploadError(err.message || 'Could not process image.');
    }
  };

  const update = (field) => (e) => {
    setDetails((d) => ({ ...d, [field]: e.target.value }));
    setFormError('');
  };

  const save = (e) => {
    e.preventDefault();
    if (!details.caption.trim() || !details.location.trim() || !details.date) {
      setFormError('Please fill in the caption, location and date.');
      return;
    }
    addPhoto({
      image: uploaded.url,
      publicId: uploaded.publicId,
      caption: details.caption.trim(),
      location: details.location.trim(),
      date: details.date,
    });
    setUploaded(null);
    setDetails(EMPTY_DETAILS);
    setToast('Photo saved to the gallery!');
  };

  const handleDelete = (photo) => {
    if (window.confirm(`Delete "${photo.caption}" from the gallery?`)) {
      removePhoto(photo.id);
      setToast('Photo deleted.');
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-ocean-900 sm:text-3xl">Gallery manager</h1>
        <p className="mt-1 text-slate-600">Add new photos from your tours. They appear on the Gallery page, newest first.</p>
      </div>

      {/* Success toast */}
      {toast && (
        <div
          role="status"
          className="flex animate-fade-in items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" /> {toast}
        </div>
      )}

      {/* Step 1 & 2: upload + details */}
      <section className="card p-5 sm:p-8" aria-labelledby="upload-heading">
        <h2 id="upload-heading" className="text-xl font-semibold text-ocean-900">
          Add a new photo
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />

        {!uploaded ? (
          <div className="mt-5">
            <button
              type="button"
              id="admin-upload"
              onClick={handleOpenPicker}
              className="flex min-h-[160px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ocean-200 bg-ocean-50/50 p-6 text-ocean-700 transition hover:border-ocean-600 hover:bg-ocean-50"
            >
              <ImagePlus className="h-10 w-10" aria-hidden="true" />
              <span className="text-lg font-semibold">Upload New Photo</span>
              <span className="text-sm text-slate-500">From your phone, camera or computer (JPG, PNG, max 10 MB)</span>
            </button>
            {isCloudinaryConfigured && widgetError && <p className="mt-3 text-sm text-red-600">{widgetError}</p>}
            {localUploadError && <p className="mt-3 text-sm text-red-600">{localUploadError}</p>}
          </div>
        ) : (
          <form onSubmit={save} className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
              <img src={uploaded.url} alt="Preview of the uploaded photo" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setUploaded(null)}
                aria-label="Remove this photo and choose another"
                className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-medium text-green-700">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Photo uploaded. Now add the details:
              </p>
              <div>
                <label htmlFor="photo-caption" className="label">
                  Caption
                </label>
                <input
                  id="photo-caption"
                  className="input"
                  value={details.caption}
                  onChange={update('caption')}
                  placeholder="Describe this tour moment"
                  maxLength={120}
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="photo-location" className="label">
                  Location
                </label>
                <input
                  id="photo-location"
                  className="input"
                  value={details.location}
                  onChange={update('location')}
                  placeholder="Enter tour location"
                  maxLength={80}
                />
              </div>
              <div>
                <label htmlFor="photo-date" className="label">
                  Date
                </label>
                <input
                  id="photo-date"
                  type="date"
                  className="input"
                  value={details.date}
                  max={todayISO()}
                  onChange={update('date')}
                />
              </div>
              {formError && <p className="text-sm text-red-600">{formError}</p>}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" id="admin-save" className="btn-coral flex-1">
                  <Save className="h-5 w-5" aria-hidden="true" /> Save
                </button>
                <button type="button" onClick={() => setUploaded(null)} className="btn-ghost">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* Saved photos list */}
      <section aria-labelledby="saved-heading">
        <h2 id="saved-heading" className="text-xl font-semibold text-ocean-900">
          Your photos <span className="text-base font-normal text-slate-500">({photos.length})</span>
        </h2>

        {photos.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No photos added yet. Upload a photo above to display it in the gallery.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <li key={photo.id} className="card flex gap-4 p-3">
                <img
                  src={photo.image}
                  alt={photo.caption}
                  loading="lazy"
                  className="aspect-square h-20 w-20 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-800">{photo.caption}</p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {photo.location}
                  </p>
                  <p className="text-xs text-slate-400">{formatDate(photo.date)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(photo)}
                  aria-label={`Delete photo: ${photo.caption}`}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-xl text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
