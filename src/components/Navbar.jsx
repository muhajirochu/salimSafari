import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../data/siteConfig';
import { LogoMark, WhatsAppIcon } from './Icons';

// Public navigation links (Admin is intentionally NOT listed)
const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/tours', label: 'Tours' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

/**
 * Sticky top navigation.
 * - Desktop (lg+): inline links + "Book Now" WhatsApp button
 * - Mobile/tablet: hamburger button that opens a full-width drawer
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Add a stronger shadow once the user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll + allow Escape to close while the mobile menu is open
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
      isActive ? 'text-ocean-700' : 'text-slate-600 hover:text-ocean-700'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-soft' : ''
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between lg:h-20" aria-label="Main">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 rounded-lg" aria-label={`${siteConfig.businessName} home`}>
          <LogoMark className="h-9 w-9 lg:h-10 lg:w-10" />
          <span className="leading-tight">
            <span className="block text-lg font-bold text-ocean-800 lg:text-xl">{siteConfig.businessName}</span>
            <span className="hidden text-xs text-slate-500 sm:block">{siteConfig.tagline}</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Active underline indicator */}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-coral-500 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp hidden !py-2.5 lg:inline-flex"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ocean-800 transition hover:bg-ocean-50 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 animate-fade-in overflow-y-auto bg-white lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex min-h-[52px] items-center rounded-xl px-4 text-lg font-medium transition ${
                      isActive ? 'bg-ocean-50 text-ocean-700' : 'text-slate-700 hover:bg-sand-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-4">
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Book via WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
