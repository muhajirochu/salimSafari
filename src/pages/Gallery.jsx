import { useState } from 'react';
import GalleryItem from '../components/GalleryItem';
import Lightbox from '../components/Lightbox';
import SectionTitle from '../components/SectionTitle';
import { siteConfig } from '../data/siteConfig';
import useLocalGallery from '../hooks/useLocalGallery';
import usePageTitle from '../hooks/usePageTitle';

export default function Gallery() {
  usePageTitle('Gallery', 'Photos from recent Zanzibar tours with Salim Safari — beaches, Stone Town, spice farms and more.');

  // Admin uploads + sample photos, already sorted newest first
  const { allPhotos } = useLocalGallery();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <section className="bg-gradient-to-b from-sand-100 to-sand-50 pb-2 pt-14 lg:pt-20">
        <div className="container-page">
          <SectionTitle
            as="h1"
            eyebrow="Gallery"
            title="Moments from the island"
            subtitle={`Real moments from recent tours. Follow ${siteConfig.socials.handle} for daily updates.`}
          />
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-page">
          {allPhotos.length === 0 ? (
            <p className="text-center text-slate-500">No photos yet — check back soon!</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {allPhotos.map((item, i) => (
                <GalleryItem key={item.id} item={item} onOpen={() => setLightboxIndex(i)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox
        items={allPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
}
