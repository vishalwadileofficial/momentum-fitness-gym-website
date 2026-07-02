import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Momentum Fitness</title>
        <meta name="description" content="The page you requested does not exist on Momentum Fitness." />
      </Helmet>

      <section className="min-h-[85vh] flex items-center justify-center bg-gym-dark px-6 py-12 text-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-8xl md:text-9xl font-black font-display text-gradient-neon leading-none">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-wider">DRIFTED OUT OF BOUNDS</h2>
            <p className="text-sm text-gym-gray-400">
              The page you are looking for has been moved, renamed, or does not exist.
            </p>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
