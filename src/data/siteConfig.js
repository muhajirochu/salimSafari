/**
 * Central business configuration.
 * Values can also be overridden dynamically via localStorage ('salim_safari_config').
 */
const GUIDING_SINCE = 2018;

const defaultSiteConfig = {
  businessName: 'Salim Safari',
  guideName: 'Salim Said',
  guideFirstName: 'Salim',
  guidePhoto: '/images/salim.jpg',
  tagline: 'Your Local Guide in Zanzibar',
  location: 'Zanzibar, Tanzania',

  // WhatsApp number in international format, digits only (no "+")
  whatsappNumber: '255675994717',
  whatsappDisplay: '+255 675 994 717',

  // Email intentionally empty — WhatsApp is the primary contact channel
  email: '',

  socials: {
    instagram: 'https://instagram.com/salimsafari',
    tiktok: 'https://tiktok.com/@salimsafari',
    facebook: 'https://facebook.com/salimsafari',
    handle: '@salimsafari',
  },

  // Guide profile details (About page) — yearsExperience computed dynamically from start year
  guidingSince: GUIDING_SINCE,
  yearsExperience: Math.max(1, new Date().getFullYear() - GUIDING_SINCE),
  languages: ['English', 'Swahili'],
  license: 'ZCT Licensed Tour Guide',
  licenseAuthority: 'Zanzibar Commission for Tourism',
  responseTime: 'Usually replies within an hour',
  availability: 'Available 7 days a week',
};

function loadSiteConfig() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('salim_safari_config') : null;
    if (!raw) return defaultSiteConfig;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultSiteConfig;
    const guidingSince = Number(parsed.guidingSince) || defaultSiteConfig.guidingSince;
    return {
      ...defaultSiteConfig,
      ...parsed,
      socials: { ...defaultSiteConfig.socials, ...(parsed.socials || {}) },
      yearsExperience:
        typeof parsed.yearsExperience === 'number'
          ? parsed.yearsExperience
          : Math.max(1, new Date().getFullYear() - guidingSince),
    };
  } catch {
    return defaultSiteConfig;
  }
}

export const siteConfig = loadSiteConfig();

/**
 * Build a wa.me link with an optional pre-filled message.
 * @param {string} [message] - text to pre-fill in WhatsApp
 * @returns {string} full WhatsApp URL
 */
export function whatsappLink(message = '') {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Default greeting used by generic "Book via WhatsApp" buttons */
export const DEFAULT_WHATSAPP_MESSAGE = `Hi ${siteConfig.guideFirstName}, I found you on ${siteConfig.businessName} and I'd like to book a tour in ${siteConfig.location.split(',')[0]}.`;
