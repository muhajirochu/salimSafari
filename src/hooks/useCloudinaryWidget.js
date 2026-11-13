import { useCallback, useEffect, useRef, useState } from 'react';

const WIDGET_SCRIPT_URL = 'https://upload-widget.cloudinary.com/latest/global/all.js';

// Read from .env (see .env.example). Both must be set for uploads to work.
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
export const isCloudinaryConfigured = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);

/** Load the Cloudinary widget script once and share the promise between callers */
let scriptPromise = null;
function loadWidgetScript() {
  if (window.cloudinary) return Promise.resolve(window.cloudinary);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(window.cloudinary);
    script.onerror = () => {
      scriptPromise = null; // allow retry
      reject(new Error('Could not load the Cloudinary upload widget. Check your internet connection.'));
    };
    document.body.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Cloudinary Upload Widget hook (unsigned uploads).
 *
 * @param {(info: {url: string, publicId: string, width: number, height: number}) => void} onUpload
 *        called after a successful upload
 * @returns {{ open: () => void, ready: boolean, error: string }}
 */
export default function useCloudinaryWidget(onUpload) {
  const widgetRef = useRef(null);
  const onUploadRef = useRef(onUpload);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  // Always call the latest callback without re-creating the widget
  onUploadRef.current = onUpload;

  useEffect(() => {
    if (!isCloudinaryConfigured) {
      setError('Cloudinary is not configured yet. Add your cloud name and upload preset to the .env file.');
      return undefined;
    }

    let cancelled = false;
    loadWidgetScript()
      .then((cloudinary) => {
        if (cancelled) return;
        widgetRef.current = cloudinary.createUploadWidget(
          {
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: CLOUDINARY_UPLOAD_PRESET,
            sources: ['local', 'camera', 'url'],
            multiple: false,
            maxFiles: 1,
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'heic'],
            maxFileSize: 10_000_000, // 10 MB
            folder: 'salim-safari/gallery',
            cropping: false,
            styles: {
              palette: {
                window: '#FFFFFF',
                windowBorder: '#0E7490',
                tabIcon: '#0E7490',
                menuIcons: '#0E7490',
                textDark: '#1E293B',
                textLight: '#FFFFFF',
                link: '#0E7490',
                action: '#F97316',
                inactiveTabIcon: '#64748B',
                error: '#DC2626',
                inProgress: '#0E7490',
                complete: '#16A34A',
                sourceBg: '#FDF9F4',
              },
            },
          },
          (err, result) => {
            if (err) {
              setError(err.statusText || err.message || 'Upload failed. Please try again.');
              return;
            }
            if (result?.event === 'success') {
              const info = result.info;
              setError('');
              onUploadRef.current?.({
                // Ask Cloudinary for an auto-format, auto-quality, max 1600px version
                url: info.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_1600,c_limit/'),
                publicId: info.public_id,
                width: info.width,
                height: info.height,
              });
            }
          },
        );
        setReady(true);
      })
      .catch((e) => !cancelled && setError(e.message));

    return () => {
      cancelled = true;
      widgetRef.current?.destroy?.();
      widgetRef.current = null;
      setReady(false);
    };
  }, []);

  const open = useCallback(() => widgetRef.current?.open(), []);

  return { open, ready, error };
}
