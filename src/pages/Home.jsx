import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Languages, MapPinned, Wallet } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import FeatureCard from '../components/FeatureCard';
import TourCard from '../components/TourCard';
import GalleryItem from '../components/GalleryItem';
import Lightbox from '../components/Lightbox';
import TestimonialCard from '../components/TestimonialCard';
import { WhatsAppIcon } from '../components/Icons';
import { tours } from '../data/tours';
import { siteConfig, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../data/siteConfig';
import useLocalGallery from '../hooks/useLocalGallery';
import usePageTitle from '../hooks/usePageTitle';

const TESTIMONIALS_STORAGE_KEY = 'salim_safari_testimonials';

function readTestimonials() {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const FEATURES = [
  {
    icon: MapPinned,
    title: 'Local Expert',
    description: `Born and raised in ${siteConfig.location.split(',')[0]}. I know the hidden alleys, quiet beaches and the best local food spots.`,
  },
  {
    icon: BadgeCheck,
    title: 'Licensed Guide',
    description: `Officially registered with the ${siteConfig.licenseAuthority} (ZCT), so you travel safely and legally.`,
  },
  {
    icon: Wallet,
    title: 'Flexible Prices',
    description: 'Fair, transparent prices with no hidden fees. Private and group options to fit your budget.',
  },
  {
    icon: Languages,
    title: siteConfig.languages.join(' & '),
    description: "Clear explanations in English, and I'll happily teach you a few Swahili words along the way.",
  },
];

export default function Home() {
  usePageTitle(null); // uses default site title
  const { allPhotos } = useLocalGallery();
  const recent = allPhotos.slice(0, 6);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [testimonials, setTestimonials] = useState(readTestimonials);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === TESTIMONIALS_STORAGE_KEY) setTestimonials(readTestimonials());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden lg:min-h-[calc(100svh-5rem)]">
        {/* Hero image is above the fold, so it loads eagerly with high priority */}
        <img
          src="/images/hero.jpg"
          alt="Traditional dhow sailing at sunset off a palm-lined Zanzibar beach"
          fetchpriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-900/85 via-ocean-900/60 to-ocean-900/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-sand-50 to-transparent" />

        <div className="container-page py-20">
          <div className="max-w-2xl animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-coral-400" aria-hidden="true" />
              {siteConfig.tagline}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Discover Zanzibar with a <span className="text-coral-400">Local Guide</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ocean-50 sm:text-xl">
              Spice farms, turquoise lagoons and the winding streets of Stone Town — explored with{' '}
              {siteConfig.guideName}, who calls this island home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/tours" className="btn-coral text-lg">
                Explore Tours <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-lg"
              >
                <WhatsAppIcon className="h-5 w-5" /> Book via WhatsApp
              </a>
            </div>

            {/* Quick trust stats */}
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-white">
              {[
                [`${siteConfig.yearsExperience}+`, 'Years guiding'],
                [String(tours.length), 'Signature tours'],
                [String(siteConfig.languages.length), 'Languages'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-2xl font-bold sm:text-3xl">{value}</dd>
                  <dd className="text-xs text-ocean-100 sm:text-sm">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE ME ---------- */}
      <section className="section">
        <div className="container-page">
          <SectionTitle
            eyebrow="Why choose me"
            title="Travel with someone who knows the island"
            subtitle="Personal, relaxed tours designed around you — not a crowded bus schedule."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- POPULAR TOURS ---------- */}
      <section className="section bg-sand-100/60">
        <div className="container-page">
          <SectionTitle
            eyebrow="Popular tours"
            title="Favourite Zanzibar experiences"
            subtitle="From cultural walks to ocean adventures — every tour is private or small-group."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {tours.slice(0, 3).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/tours" className="btn-primary">
              See all tours <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- RECENT MOMENTS ---------- */}
      <section className="section">
        <div className="container-page">
          <SectionTitle
            eyebrow="Recent moments"
            title="Snapshots from recent tours"
            subtitle={`Follow along on Instagram, TikTok and Facebook: ${siteConfig.socials.handle}`}
          />
          {recent.length === 0 ? (
            <p className="text-center text-slate-500">No photos yet — check back soon!</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
              {recent.map((item, i) => (
                <GalleryItem key={item.id} item={item} compact onOpen={() => setLightboxIndex(i)} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-ghost">
              View full gallery <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <Lightbox items={recent} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="section bg-ocean-50/60">
        <div className="container-page">
          <SectionTitle eyebrow="Guest stories" title="What travellers say" />
          {testimonials.length === 0 ? (
            <p className="text-center text-slate-500">No guest reviews yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id || t.name} {...t} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="section">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-600 via-ocean-700 to-ocean-900 px-6 py-14 text-center shadow-lift sm:px-12 lg:py-20">
            {/* Decorative blurred circles */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral-500/30 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-ocean-200/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Ready to explore Zanzibar?</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-ocean-100">
                Send me a message on WhatsApp — I usually reply within the hour and can tailor any tour to your plans.
              </p>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-8 text-lg"
              >
                <WhatsAppIcon className="h-6 w-6" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
