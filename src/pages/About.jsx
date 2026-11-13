import { Award, BadgeCheck, Calendar, Heart, Languages, MapPin, UserRound } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { WhatsAppIcon } from '../components/Icons';
import { siteConfig, whatsappLink } from '../data/siteConfig';
import usePageTitle from '../hooks/usePageTitle';

const VALUES = [
  {
    icon: Heart,
    title: 'Tourism that gives back',
    text: 'I work with local families, farmers and boat captains so your visit supports the community directly.',
  },
  {
    icon: UserRound,
    title: 'Personal attention',
    text: 'Small groups and private tours only — we go at your pace and change plans whenever you like.',
  },
  {
    icon: MapPin,
    title: 'Beyond the guidebook',
    text: 'Hidden alleys, village kitchens and quiet beaches that big tour buses never reach.',
  },
];

export default function About() {
  usePageTitle(
    `About ${siteConfig.guideFirstName}`,
    `Meet ${siteConfig.guideName}, a ZCT-licensed local tour guide in ${siteConfig.location.split(',')[0]}.`,
  );

  const initials = siteConfig.guideName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const facts = [
    { icon: Calendar, label: 'Experience', value: `${siteConfig.yearsExperience}+ years guiding` },
    { icon: Languages, label: 'Languages', value: siteConfig.languages.join(' & ') },
    { icon: MapPin, label: 'Based in', value: siteConfig.location },
  ];

  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-b from-sand-100 to-sand-50 pb-4 pt-14 lg:pt-20">
        <div className="container-page">
          <SectionTitle
            as="h1"
            eyebrow="About me"
            title={`Jambo! I'm ${siteConfig.guideName}`}
            subtitle="Your friendly local guide, born and raised on the Spice Island."
          />
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-page grid items-start gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Photo + license badge */}
          <div className="relative mx-auto w-full max-w-sm lg:col-span-2 lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-500 to-ocean-800 shadow-lift">
              {siteConfig.guidePhoto ? (
                <img
                  src={siteConfig.guidePhoto}
                  alt={`${siteConfig.guideName}, local tour guide in ${siteConfig.location.split(',')[0]}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-white">
                  <span className="flex h-28 w-28 items-center justify-center rounded-full bg-white/15 text-4xl font-bold">
                    {initials}
                  </span>
                  <span className="text-sm text-ocean-100">Photo of {siteConfig.guideName}</span>
                </div>
              )}
            </div>

            {/* ZCT license badge */}
            <div className="absolute -bottom-6 left-1/2 flex w-[85%] -translate-x-1/2 items-center gap-3 rounded-2xl bg-white p-4 shadow-lift sm:w-auto sm:left-auto sm:right-[-1rem] sm:translate-x-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-coral-500 text-white">
                <Award className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ocean-900">{siteConfig.license}</span>
                <span className="block text-xs text-slate-500">{siteConfig.licenseAuthority}</span>
              </span>
            </div>
          </div>

          {/* Story */}
          <div className="pt-6 lg:col-span-3 lg:pt-0">
            <h2 className="text-2xl font-bold text-ocean-900 sm:text-3xl">My story</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-slate-700">
              <p>
                I grew up between the busy streets of Stone Town and my grandparents&apos; farm in the countryside,
                where cloves and lemongrass dried in the sun outside the house. As a boy I would follow visitors
                through the alleys, listening to the old men tell stories of sultans, traders and dhows sailing in
                on the monsoon winds.
              </p>
              <p>
                Today I share those same stories as a licensed guide. For more than {siteConfig.yearsExperience}{' '}
                years I have welcomed travellers from all over the world — couples on honeymoon, families with
                young children, solo adventurers — and shown them the Zanzibar that I love: warm, colourful and full
                of life.
              </p>
              <p>
                My tours are relaxed and personal. I don&apos;t rush you from stop to stop. We taste street food
                at Forodhani, chat with spice farmers, and find a quiet beach when you need one. My goal is simple:
                that you leave Zanzibar feeling like you visited a friend, not just a destination.
              </p>
            </div>

            {/* Quick facts */}
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-sand-200 bg-white p-4">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <Icon className="h-4 w-4 text-coral-500" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-1 font-semibold text-ocean-900">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink(
                  `Hi ${siteConfig.guideFirstName}, I read about you on your website and I'd like to plan a tour.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" /> Message me on WhatsApp
              </a>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                <BadgeCheck className="h-4 w-4 text-ocean-600" aria-hidden="true" /> {siteConfig.responseTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-sand-100/60">
        <div className="container-page">
          <SectionTitle eyebrow="How I guide" title="What you can expect" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6 lg:p-8">
                <Icon className="h-8 w-8 text-coral-500" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-ocean-900">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
