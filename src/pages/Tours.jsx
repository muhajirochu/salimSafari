import TourCard from '../components/TourCard';
import SectionTitle from '../components/SectionTitle';
import { WhatsAppIcon } from '../components/Icons';
import { tours } from '../data/tours';
import { siteConfig, whatsappLink } from '../data/siteConfig';
import usePageTitle from '../hooks/usePageTitle';

export default function Tours() {
  usePageTitle(
    'Zanzibar Tours',
    'Stone Town walking tours, Mnemba dhow safaris, spice farm visits and countryside tours with a licensed local guide.',
  );

  return (
    <>
      <section className="bg-gradient-to-b from-sand-100 to-sand-50 pb-2 pt-14 lg:pt-20">
        <div className="container-page">
          <SectionTitle
            as="h1"
            eyebrow="Tours"
            title="Explore Zanzibar your way"
            subtitle="All tours include hotel pickup and can be booked as private or small-group experiences. Prices are per person."
          />
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-page">
          {/* 1 column mobile / 2 tablet / 3 desktop */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* Custom tour CTA */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-sand-200 bg-white p-6 text-center shadow-soft sm:p-8 lg:flex-row lg:text-left">
            <div>
              <h2 className="text-xl font-bold text-ocean-900 sm:text-2xl">Looking for something different?</h2>
              <p className="mt-2 text-slate-600">
                Combine tours, add Jozani Forest or Prison Island, or plan a full custom day — just ask.
              </p>
            </div>
            <a
              href={whatsappLink(
                `Hi ${siteConfig.guideFirstName}, I'd like to plan a custom tour in ${siteConfig.location.split(',')[0]}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shrink-0"
            >
              <WhatsAppIcon className="h-5 w-5" /> Plan a custom tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
