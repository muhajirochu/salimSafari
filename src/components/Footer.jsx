import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { siteConfig, whatsappLink } from '../data/siteConfig';
import { tours } from '../data/tours';
import { FacebookIcon, InstagramIcon, LogoMark, TikTokIcon } from './Icons';

/** Social links reused in Footer and Contact page */
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: siteConfig.socials.instagram, Icon: InstagramIcon },
  { name: 'TikTok', href: siteConfig.socials.tiktok, Icon: TikTokIcon },
  { name: 'Facebook', href: siteConfig.socials.facebook, Icon: FacebookIcon },
];

/** Site footer: logo, quick links, tours, contact & socials, copyright */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ocean-900 text-ocean-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2.5 rounded-lg">
            <LogoMark className="h-10 w-10" />
            <span className="text-xl font-bold text-white">{siteConfig.businessName}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ocean-200">
            {siteConfig.tagline}. Private and small-group tours with {siteConfig.guideName}, a
            licensed guide born and raised on the island.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {[
              ['/about', `About ${siteConfig.guideFirstName}`],
              ['/tours', 'All Tours'],
              ['/gallery', 'Gallery'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="inline-flex min-h-[36px] items-center rounded transition hover:text-coral-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tours */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Tours</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {tours.map((tour) => (
              <li key={tour.id}>
                <Link
                  to={`/tours/${tour.id}`}
                  className="inline-flex min-h-[36px] items-center rounded transition hover:text-coral-400"
                >
                  {tour.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded transition hover:text-coral-400"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {siteConfig.location}
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.businessName} on ${name}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-coral-500"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-ocean-200 sm:flex-row">
          <p>
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>
          <p>
            {siteConfig.socials.handle} · {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
