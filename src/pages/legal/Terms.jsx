import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Momentum Fitness</title>
        <meta name="description" content="Read the Terms and Conditions agreement rules for gym access, safety codes, and billing cancellations at Momentum Fitness." />
      </Helmet>

      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-3xl space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-display text-white">TERMS & CONDITIONS</h1>
          <p className="text-xs text-gym-gray-400">Effective Date: July 02, 2026</p>
        </div>
      </section>

      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6 max-w-3xl text-sm text-gym-gray-400 leading-relaxed space-y-8">
          
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">1. Membership Agreement</h2>
            <p>
              By accessing the Momentum Fitness facility or using our online portals, you agree to comply with all safety protocols, trainer instructions, and general club regulations. Members must be at least 18 years of age.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">2. Billing & Cancellation Policies</h2>
            <p>
              Subscription charges occur automatically each month or year based on your selected plan. To cancel a renewal, submit a cancel request via the Member Portal at least five (5) business days prior to your next scheduled billing date.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">3. Training Liability Waiver</h2>
            <p>
              Strength and conditioning operations involve inherent physical risks. You acknowledge that you assume all risks associated with weightlifting, high-intensity intervals, and recovery contrast amenities at the facility.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">4. Club Facility Guidelines</h2>
            <p>
              All members must re-rack weight plates after usage, wipe down machinery, and maintain respectful conduct towards other athletes and coaching staff. Egos are left at the door.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Terms;
