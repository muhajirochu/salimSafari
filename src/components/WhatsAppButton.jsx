import { useLocation } from 'react-router-dom';
import { siteConfig, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../data/siteConfig';
import { WhatsAppIcon } from './Icons';

/**
 * Floating WhatsApp button (bottom-right) shown on all public pages.
 * Hidden on tour detail pages, which render their own sticky booking bar
 * with a tour-specific pre-filled message.
 */
export default function WhatsAppButton({ message = DEFAULT_WHATSAPP_MESSAGE }) {
  const { pathname } = useLocation();
  const isTourDetail = /^\/tours\/[^/]+/.test(pathname);
  if (isTourDetail) return null;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${siteConfig.guideFirstName} on WhatsApp`}
      className="group fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition-transform duration-200 hover:scale-110 hover:bg-whatsapp-dark sm:bottom-6 sm:right-6 lg:h-16 lg:w-16"
    >
      {/* Soft pulsing ring to draw attention */}
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" aria-hidden="true" />
      <WhatsAppIcon className="relative h-7 w-7 lg:h-8 lg:w-8" />
      {/* Desktop tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 lg:block">
        Chat with {siteConfig.guideFirstName}
      </span>
    </a>
  );
}
