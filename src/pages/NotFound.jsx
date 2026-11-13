import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

/** 404 page — also used by TourDetail when the tour id doesn't exist */
export default function NotFound() {
  usePageTitle('Page not found');

  return (
    <section className="section">
      <div className="container-page flex flex-col items-center text-center">
        <Compass className="h-16 w-16 text-coral-500" aria-hidden="true" />
        <h1 className="mt-6 text-3xl font-bold text-ocean-900 sm:text-4xl">Looks like you&apos;re lost at sea</h1>
        <p className="mt-3 max-w-md text-slate-600">
          The page you were looking for doesn&apos;t exist. Let&apos;s get you back on course.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/tours" className="btn-ghost">
            Browse tours
          </Link>
        </div>
      </div>
    </section>
  );
}
