import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiInfo } from 'react-icons/fi';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or annual

  const plans = [
    {
      name: 'Base Club',
      price: billingCycle === 'monthly' ? 49 : 39,
      desc: 'Full floor & locker facilities.',
      features: ['Full gym floor access', 'Standard locker amenities', '1 Free coach evaluation'],
    },
    {
      name: 'Elite Performance',
      price: billingCycle === 'monthly' ? 89 : 75,
      desc: 'Classes, saunas, and custom metrics.',
      features: ['All gym floor access', 'Unlimited group classes', 'Contrast saunas & cold plunges', 'Monthly body composition scan'],
      highlight: true,
    },
    {
      name: 'VIP Athlete',
      price: billingCycle === 'monthly' ? 199 : 169,
      desc: 'Bespoke 1-on-1 coaching.',
      features: ['All Elite access', '4 Private training sessions/mo', 'Dietitian nutrition programming', 'Daily post-workout recovery shake'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Pricing & Packages | Momentum Fitness</title>
        <meta name="description" content="View transparent pricing options for Momentum memberships. Save up to 20% on annual billing cycles, including custom group training packages." />
        <meta name="keywords" content="gym membership price, fitness club cost, dynamic fitness billing, annual gym discount" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Pricing Guide</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">MEMBERSHIP RATES</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Transparent pricing without enrollment hooks or hidden maintenance fees. Pick your tier and cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gym-gray-800 p-1.5 rounded-full border border-gym-gray-700 mt-6 relative z-20">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-primary text-gym-dark' : 'bg-transparent text-gym-gray-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-primary text-gym-dark' : 'bg-transparent text-gym-gray-400'
              }`}
            >
              Annual Billing
              <span className="bg-secondary/15 text-secondary text-[8px] font-extrabold px-1.5 py-0.5 rounded">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Rates Cards */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`glass-card p-8 rounded-2xl border transition-all flex flex-col justify-between ${
                  p.highlight ? 'border-primary shadow-[0_0_20px_rgba(204,255,0,0.1)]' : 'border-gym-gray-800'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold font-display text-white">{p.name}</h3>
                    {p.highlight && <span className="bg-primary text-gym-dark text-[9px] font-bold px-2 py-0.5 rounded uppercase">Best Value</span>}
                  </div>
                  <p className="text-xs text-gym-gray-400 leading-relaxed">{p.desc}</p>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black font-display text-white">${p.price}</span>
                    <span className="text-gym-gray-400 text-xs">/ month</span>
                  </div>

                  <ul className="space-y-2.5 pt-6 border-t border-gym-gray-800">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gym-gray-300">
                        <FiCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <a
                    href={`/register?plan=${p.name.split(' ')[0].toLowerCase()}&cycle=${billingCycle}`}
                    className={`w-full inline-flex justify-center py-2.5 font-bold text-xs uppercase tracking-wider rounded transition-all ${
                      p.highlight
                        ? 'bg-primary text-gym-dark hover:bg-primary-dark shadow-md'
                        : 'bg-gym-gray-800 text-white hover:bg-gym-gray-700 border border-gym-gray-700'
                    }`}
                  >
                    Select & Proceed
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12 space-y-4">
            <h3 className="text-2xl font-black font-display text-white">BILLING QUESTIONS</h3>
            <p className="text-gym-gray-400 text-xs">Essential information regarding billing schedules and membership terms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gym-gray-400 leading-relaxed">
            <div className="space-y-2.5 p-6 glass-card rounded-xl border border-gym-gray-800">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <FiInfo className="text-primary" /> Can I change plans later?
              </h4>
              <p>Yes. You can upgrade or downgrade your membership tier directly from your member dashboard. Changes take effect on the subsequent billing cycle.</p>
            </div>
            <div className="space-y-2.5 p-6 glass-card rounded-xl border border-gym-gray-800">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <FiInfo className="text-primary" /> Are there cancellation fees?
              </h4>
              <p>No. We do not lock members into long contract forms (unless you explicitly select an annual billing discount). Cancel at least 5 days prior to billing renewal.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
