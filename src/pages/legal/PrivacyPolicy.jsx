import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Momentum Fitness Club</title>
        <meta name="description" content="Read the official Privacy Policy guidelines for Momentum Fitness, protecting member personal details and payment systems." />
      </Helmet>

      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-3xl space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-display text-white">PRIVACY POLICY</h1>
          <p className="text-xs text-gym-gray-400">Effective Date: July 02, 2026</p>
        </div>
      </section>

      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6 max-w-3xl text-sm text-gym-gray-400 leading-relaxed space-y-8">
          
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">1. Information Collection</h2>
            <p>
              We collect information that you submit directly when registering, booking facility tours, filling out nutrition surveys, or paying for subscriptions. This includes names, addresses, payment logs, and phone numbers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">2. How We Use Your Data</h2>
            <p>
              We process data to manage membership settings, deliver scheduled coaching plans, compute custom macronutrient assessments, process payment renewals, and notify you regarding schedule alterations.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">3. Security Standards</h2>
            <p>
              We prioritize the safety of your credentials. All digital payment profiles are processed through secure, PCI-compliant gateways. We do not store full credit card credentials on local club databases.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">4. Cookies & Trackers</h2>
            <p>
              We use functional cookies to verify portal session logins and remember dashboard preferences. You can disable browser tracking tools, though some dashboard parts may load incorrectly.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
