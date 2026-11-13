/**
 * Tour catalogue.
 * Images live in /public/images and are referenced by absolute path.
 * Prices are per person in USD.
 * Can also be overridden dynamically via localStorage ('salim_safari_tours').
 */
const defaultTours = [
  {
    id: 'stone-town-walking-tour',
    title: 'Stone Town Walking Tour',
    duration: '3 hours',
    price: 25,
    location: 'Stone Town, Zanzibar',
    image: '/images/stone-town.jpg',
    imageAlt: 'Narrow alley in Stone Town with carved wooden Zanzibari doors',
    shortDescription:
      'Wander the winding alleys of a UNESCO World Heritage Site and hear the stories behind its carved doors, markets and palaces.',
    fullDescription:
      "Stone Town is the beating heart of Zanzibar — a maze of narrow streets where Swahili, Arab, Persian, Indian and European influences meet. On this relaxed walking tour I'll take you beyond the guidebook: past the famous carved doors, into the bustling Darajani Market, and to the sites that tell the story of the island's spice and trade history, including the Old Fort, the House of Wonders and the former slave market memorial at the Anglican Cathedral. We'll finish near the Forodhani Gardens waterfront, perfect for sunset and street food.",
    itinerary: [
      'Hotel pickup or meet at Forodhani Gardens',
      'Old Fort and the House of Wonders (exterior)',
      'Darajani Market — spices, fruit and fish sections',
      'Anglican Cathedral & former slave market memorial',
      'Hidden alleys, carved doors and Freddie Mercury House',
      'Finish at the Forodhani waterfront',
    ],
    included: [
      'Licensed local guide (English or Swahili)',
      'Bottled water',
      'Entrance fee to the slave market memorial',
      'Hotel pickup within Stone Town',
    ],
  },
  {
    id: 'beach-dhow-safari-mnemba',
    title: 'Beach & Dhow Safari (Mnemba)',
    duration: '6 hours',
    price: 60,
    location: 'Mnemba Atoll, Zanzibar',
    image: '/images/mnemba.jpg',
    imageAlt: 'Traditional wooden dhow sailing over turquoise water near Mnemba Island',
    shortDescription:
      'Sail a traditional dhow to the Mnemba Atoll, snorkel among tropical fish and look out for wild dolphins.',
    fullDescription:
      "Experience Zanzibar's most beautiful waters aboard a traditional wooden dhow. We set off from the northeast coast towards the protected Mnemba Atoll, where crystal-clear water and coral gardens are home to turtles, starfish and hundreds of colourful reef fish. Pods of dolphins are often seen along the way. After snorkelling, we relax on a white sandbank and enjoy fresh tropical fruit before sailing back to shore. Suitable for families and first-time snorkellers.",
    itinerary: [
      'Early pickup from your hotel',
      'Board the dhow at Matemwe or Muyuni beach',
      'Dolphin spotting on the way to the atoll',
      'Guided snorkelling at the Mnemba coral reef',
      'Relax on the sandbank with fresh fruit',
      'Sail back and transfer to your hotel',
    ],
    included: [
      'Return hotel transfers',
      'Traditional dhow boat trip',
      'Snorkelling mask, snorkel and fins',
      'Fresh seasonal fruit and bottled water',
      'Mnemba marine conservation fee',
    ],
  },
  {
    id: 'spice-farm-tour',
    title: 'Spice Farm Tour',
    duration: '4 hours',
    price: 35,
    location: 'Kizimbani, Zanzibar',
    image: '/images/spice-farm.jpg',
    imageAlt: 'Fresh cloves, cinnamon and nutmeg on a banana leaf at a Zanzibar spice farm',
    shortDescription:
      'Discover why Zanzibar is called the Spice Island — touch, smell and taste cloves, vanilla, cinnamon and more.',
    fullDescription:
      "Zanzibar's history was shaped by spices, and this tour takes you right to the source. At a family-run organic farm, you'll see how cloves, nutmeg, black pepper, vanilla, cinnamon and lemongrass grow, and learn how locals use them in cooking and traditional medicine. Taste tropical fruits in season like jackfruit, rambutan and mangosteen, watch a farmer climb a coconut palm, and enjoy a cup of spiced tea. You can also buy fresh spices directly from the farmers.",
    itinerary: [
      'Hotel pickup and drive into the countryside',
      'Guided walk through the spice plantation',
      'Spice identification — smell, touch and taste',
      'Seasonal tropical fruit tasting',
      'Coconut tree climbing demonstration',
      'Spiced tea and return to your hotel',
    ],
    included: [
      'Return hotel transfers',
      'Licensed local guide',
      'Farm entrance fee',
      'Fruit tasting and spiced tea',
    ],
  },
  {
    id: 'kazimbani-countryside-tour',
    title: 'Kazimbani & Countryside Tour',
    duration: '5 hours',
    price: 45,
    location: 'Kazimbani, Zanzibar',
    image: '/images/countryside.jpg',
    imageAlt: 'Zanzibar countryside village with palm trees and red earth road',
    shortDescription:
      'Leave the tourist trail behind and experience authentic village life, local farms and the green heart of the island.',
    fullDescription:
      "This is the Zanzibar most visitors never see. We travel through the island's lush interior to Kazimbani and the surrounding villages, where daily life follows the rhythm of farming, fishing and community. Meet local families, see how rice, cassava and bananas are grown, visit a village school or workshop, and learn a few words of Swahili along the way. We stop for a home-style Zanzibari lunch prepared by a local family. A meaningful, slow-travel experience that directly supports the community.",
    itinerary: [
      'Hotel pickup and scenic drive inland',
      'Walk through Kazimbani village with a local host',
      'Visit rice paddies and small family farms',
      'Local craft or village workshop visit',
      'Home-cooked Zanzibari lunch',
      'Return drive to your hotel',
    ],
    included: [
      'Return hotel transfers',
      'Licensed local guide',
      'Traditional Zanzibari lunch',
      'Bottled water',
      'Community contribution',
    ],
  },
];

function loadTours() {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('salim_safari_tours') : null;
    if (!raw) return defaultTours;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultTours;
  } catch {
    return defaultTours;
  }
}

export const tours = loadTours();

/** Find a single tour by its URL id */
export function getTourById(id) {
  return loadTours().find((tour) => tour.id === id);
}
