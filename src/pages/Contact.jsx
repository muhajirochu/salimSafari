import { useState } from 'react';
import { Clock, MapPin, Send } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { SOCIAL_LINKS } from '../components/Footer';
import { WhatsAppIcon } from '../components/Icons';
import { siteConfig, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../data/siteConfig';
import usePageTitle from '../hooks/usePageTitle';

const EMPTY_FORM = { name: '', email: '', message: '' };

export default function Contact() {
  usePageTitle('Contact', `Contact ${siteConfig.guideName} on WhatsApp to book your Zanzibar tour.`);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  /** Basic validation — email is optional because the reply comes via WhatsApp */
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please write a short message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /** Build a WhatsApp message from the form and open it in a new tab */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [`Hi ${siteConfig.guideFirstName}, my name is ${form.name.trim()}.`];
    if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
    lines.push('', form.message.trim());
    const text = lines.join('\n');

    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
    setForm(EMPTY_FORM);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-sand-100 to-sand-50 pb-2 pt-14 lg:pt-20">
        <div className="container-page">
          <SectionTitle
            as="h1"
            eyebrow="Contact"
            title="Let's plan your Zanzibar adventure"
            subtitle="WhatsApp is the fastest way to reach me. Ask anything — availability, prices, or custom ideas."
          />
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-page grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left: WhatsApp + socials */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-br from-ocean-600 to-ocean-800 p-6 text-white shadow-lift sm:p-8">
              <h2 className="text-2xl font-bold">Chat on WhatsApp</h2>
              <p className="mt-2 text-ocean-100">Tap below and send me a message. I usually reply within the hour.</p>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-6 w-full !py-4 text-lg"
              >
                <WhatsAppIcon className="h-6 w-6" /> {siteConfig.whatsappDisplay}
              </a>
              <ul className="mt-6 space-y-2 text-sm text-ocean-100">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" /> {siteConfig.location}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" /> {siteConfig.availability}
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-lg font-semibold text-ocean-900">Follow {siteConfig.socials.handle}</h2>
              <ul className="mt-4 grid gap-3">
                {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.businessName} on ${name}`}
                      className="flex min-h-[52px] items-center gap-3 rounded-xl border border-slate-200 px-4 transition hover:border-coral-500 hover:bg-sand-50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean-50 text-ocean-700">
                        <Icon />
                      </span>
                      <span className="font-medium text-slate-700">{name}</span>
                      <span className="ml-auto text-sm text-slate-400">{siteConfig.socials.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: form that opens WhatsApp */}
          <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8 lg:col-span-3">
            <h2 className="text-2xl font-bold text-ocean-900">Send a message</h2>
            <p className="mt-1 text-slate-600">Fill this in and it will open WhatsApp with your message ready to send.</p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div>
                <label htmlFor="contact-name" className="label">
                  Your name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  className="input"
                  placeholder="Enter your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="label">
                  Email <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  className="input"
                  placeholder="Enter your email address"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="label">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  className="input resize-y"
                  placeholder="Which tour are you interested in? Your dates and number of people help me reply faster."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" id="contact-submit" className="btn-whatsapp w-full sm:w-auto">
                <Send className="h-5 w-5" aria-hidden="true" /> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
