import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Users } from 'lucide-react';
import TourCard from '../components/TourCard';
import { WhatsAppIcon } from '../components/Icons';
import { getTourById, tours } from '../data/tours';
import { siteConfig, whatsappLink } from '../data/siteConfig';
import usePageTitle from '../hooks/usePageTitle';
import NotFound from './NotFound';

export default function TourDetail() {
  const { id } = useParams();
  const tour = getTourById(id);
  usePageTitle(tour?.title ?? 'Tour not found', tour?.shortDescription);

  if (!tour) return <NotFound />;

  // Pre-filled WhatsApp message required by the brief
  const bookingLink = whatsappLink(`Hi ${siteConfig.guideFirstName}, I'm interested in the ${tour.title} tour`);
  const otherTours = tours.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate">
        <div className="aspect-[4/3] min-h-[320px] w-full sm:aspect-[16/9] lg:aspect-[21/8]">
          <img src={tour.image} alt={tour.imageAlt} fetchpriority="high" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-page pb-6 lg:pb-12">
            <Link
              to="/tours"
              className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-medium text-white/90 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All tours
            </Link>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{tour.title}</h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ocean-50 sm:text-base">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" /> {tour.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {tour.location || siteConfig.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" aria-hidden="true" /> Private or small group
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CONTENT + BOOKING SIDEBAR ---------- */}
      <section className="py-10 lg:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-ocean-900">About this tour</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{tour.fullDescription}</p>

            {/* Itinerary as a vertical timeline */}
            <h2 className="mt-12 text-2xl font-bold text-ocean-900">Itinerary</h2>
            <ol className="mt-6 space-y-0">
              {tour.itinerary.map((step, i) => (
                <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Connector line */}
                  {i < tour.itinerary.length - 1 && (
                    <span className="absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-0.5 bg-ocean-100" aria-hidden="true" />
                  )}
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-slate-700">{step}</p>
                </li>
              ))}
            </ol>

            {/* What's included */}
            <h2 className="mt-12 text-2xl font-bold text-ocean-900">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {tour.included.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp-dark" aria-hidden="true" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop sticky booking card */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-lift">
              <p className="text-sm text-slate-500">From</p>
              <p className="text-4xl font-extrabold text-coral-500">
                ${tour.price}
                <span className="text-base font-medium text-slate-500"> / person</span>
              </p>
              <dl className="mt-5 space-y-3 border-y border-slate-100 py-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Duration</dt>
                  <dd className="font-semibold text-slate-800">{tour.duration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Guide</dt>
                  <dd className="font-semibold text-slate-800">{siteConfig.guideName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Languages</dt>
                  <dd className="font-semibold text-slate-800">{siteConfig.languages.join(', ')}</dd>
                </div>
              </dl>
              <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6 w-full">
                <WhatsAppIcon className="h-5 w-5" /> Book via WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-slate-500">Free to ask questions · Quick replies</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- OTHER TOURS ---------- */}
      <section className="bg-sand-100/60 py-14 pb-28 lg:py-20">
        <div className="container-page">
          <h2 className="mb-8 text-2xl font-bold text-ocean-900 sm:text-3xl">You might also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherTours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile/tablet sticky bottom booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <p className="leading-tight">
            <span className="block text-xs text-slate-500">From</span>
            <span className="text-2xl font-bold text-coral-500">${tour.price}</span>
            <span className="text-xs text-slate-500"> / person</span>
          </p>
          <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1 sm:flex-none">
            <WhatsAppIcon className="h-5 w-5" /> Book via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
