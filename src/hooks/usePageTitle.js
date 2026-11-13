import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

/**
 * Set the document title (and optional meta description) per page for SEO.
 * Pass `null` to use the default site title.
 */
export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${siteConfig.businessName}`
      : `${siteConfig.businessName} | ${siteConfig.tagline}`;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
  }, [title, description]);
}
