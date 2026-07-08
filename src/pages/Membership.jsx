import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAward, FiZap, FiStar, FiPercent } from 'react-icons/fi';
import Container from '@/components/common/Container';
import SectionWrapper from '@/components/common/SectionWrapper';
import Button from '@/components/ui/Button';

const Membership = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  // Pricing Data for 4 tiers
  const plans = [
    {
      id: 'basic',
      name: 'Basic Strength',
      icon: <FiZap className="w-6 h-6 text-gym-gray-400" />,
      priceMonthly: 29,
      priceAnnual: 24,
      description: 'Ideal for independent lifters seeking access to high-quality barbell platforms and plates.',
      features: [
        'Full access to all general strength training floors',
        'Use of certified Eleiko & Hammer Strength plate sets',
        'Standard locker room and clean shower access',
        'Complimentary high-speed facility WiFi',
        '1 initial physical goals assessment session',
      ],
      notIncluded: [
        'Access to group training classes',
        'Contrast recovery suite access (sauna & cold plunges)',
        'Nutrition or dietitian-guided macro planning',
        'Dedicated 1-on-1 private trainer coaching hours',
      ],
    },
    {
      id: 'standard',
      name: 'Standard Athletic',
      icon: <FiAward className="w-6 h-6 text-secondary" />,
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'Excellent for consistent trainers wanting class access and basic health assessments.',
      features: [
        'All Basic Strength benefits included',
        '5 structured group training classes / month',
        '1 monthly body composition assessment scan',
        'Access to clean locker rooms & saunas',
        'Discounted rates on sports nutrition shake bar',
      ],
      notIncluded: [
        'Unlimited group classes (capped at 5/mo)',
        'Recovery suite cold plunge access',
        'Bespoke dietitian-designed meal plans',
        'Private 1-on-1 coach training hours',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Athlete',
      icon: <FiStar className="w-6 h-6 text-primary" />,
      priceMonthly: 89,
      priceAnnual: 69,
      description: 'Our signature tier. Unlimited classes, weekly assessments, and full contrast recovery access.',
      features: [
        'All Standard Athletic benefits included',
        'Unlimited group classes (HIIT, Yoga, CrossFit, Powerlifting)',
        'Full contrast recovery suite (4°C plunges & saunas)',
        'Weekly body composition analysis scans',
        'Standard sports nutrition diet plan templates',
        'Priority booking windows for popular platforms',
      ],
      notIncluded: [
        'Dedicated 1-on-1 private coaching sessions',
        'Daily complimentary protein shake from Fuel Bar',
      ],
      highlight: true, // popular badge
    },
    {
      id: 'elite',
      name: 'Elite Performance',
      icon: <FiAward className="w-6 h-6 text-primary-dark" />,
      priceMonthly: 199,
      priceAnnual: 159,
      description: 'The ultimate physical preparation setup. Dedicated coaching, dietitian support, and full perks.',
      features: [
        'All Premium Athlete benefits included',
        '4 private 1-on-1 coaching sessions / month',
        '1 daily post-workout protein shake from Fuel Bar',
        'Bespoke dietitian-designed monthly meal plan',
        'Complimentary gym apparel laundry service',
        '24/7 direct digital messaging access to coaching desk',
      ],
      notIncluded: [],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Memberships | Momentum Fitness Pricing Plans</title>
        <meta name="description" content="Explore membership plans at Momentum Fitness. Choose from Basic, Standard, Premium, or Elite tiers with monthly/annual billing options, recovery suite access, and coaching." />
        <meta name="keywords" content="gym membership, pricing, fitness pricing, premium gym membership, gym signup, cold plunge gym cost" />
        <link rel="canonical" href="https://momentumfitness.in/membership" />
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative py-28 bg-gym-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <Container className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Pricing Guide</span>
            <h1 className="text-4xl md:text-6xl font-black font-display text-white">CHOOSE YOUR MOMENTUM</h1>
            <p className="text-gym-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Invest in your physical longevity. Select the tier that matches your weekly training frequency, recovery, and coaching needs. Save 20% on annual billing.
            </p>

            {/* Monthly / Annual Toggle Switch */}
            <div className="flex justify-center pt-8">
              <div className="bg-gym-gray-800 p-1.5 rounded-full border border-gym-gray-700 inline-flex items-center relative">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer relative z-10 ${
                    billingCycle === 'monthly' ? 'text-gym-dark bg-primary' : 'text-gym-gray-400 hover:text-white'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer relative z-10 flex items-center gap-1 ${
                    billingCycle === 'annual' ? 'text-gym-dark bg-primary' : 'text-gym-gray-400 hover:text-white'
                  }`}
                >
                  <FiPercent className="w-3.5 h-3.5" /> Annual Billing (20% Off)
                </button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 2. PRICING CARDS SECTION */}
      <SectionWrapper bg="dark" padding="none" className="pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => {
              const displayPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`glass-card rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                    plan.highlight
                      ? 'border-primary bg-gym-gray-900/90 shadow-[0_0_35px_rgba(204,255,0,0.12)] scale-102 z-10'
                      : 'border-white/5 bg-gym-gray-900/40 hover:border-white/10'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 left-0 bg-primary text-gym-dark text-center font-bold py-1.5 text-[10px] uppercase tracking-widest">
                      Most Popular Plan
                    </div>
                  )}

                  <div className={`p-8 space-y-6 ${plan.highlight ? 'pt-12' : 'pt-8'}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold font-display text-white">{plan.name}</h3>
                      <div className="w-10 h-10 rounded-lg bg-gym-gray-800 flex items-center justify-center border border-white/5">
                        {plan.icon}
                      </div>
                    </div>

                    <p className="text-xs text-gym-gray-400 leading-relaxed min-h-[48px]">{plan.description}</p>

                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black font-display text-white">${displayPrice}</span>
                      <span className="text-gym-gray-500 text-xs font-semibold">/ month</span>
                    </div>

                    {/* Features list */}
                    <div className="border-t border-white/5 pt-6 space-y-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-white">Included Access:</p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-gym-gray-300">
                            <FiCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.notIncluded && plan.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-gym-gray-500 line-through">
                            <FiX className="w-4 h-4 text-gym-gray-700 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-gym-gray-950/60 border-t border-white/5">
                    <Button
                      variant={plan.highlight ? 'primary' : 'outline'}
                      className="w-full text-xs font-bold py-3"
                      onClick={() => window.location.href = `/register?plan=${plan.id}&billing=${billingCycle}`}
                    >
                      Select {plan.name}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-12 max-w-lg mx-auto">
            <p className="text-[11px] text-gym-gray-500 leading-relaxed">
              * Pricing is shown in USD (or equivalent local currency depending on account region). Custom quotations are available for international corporate memberships.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. COMPARISON MATRIX TABLE */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Direct Comparison</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white">MEMBERSHIP GRID</h2>
            <p className="text-gym-gray-400 text-sm">
              Review our direct feature comparison details below. For custom corporate group rates or family plans, please contact our support desk.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 shadow-2xl glass-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gym-gray-950/80 border-b border-white/5 text-xs font-bold uppercase tracking-wider text-white">
                  <th className="p-6">Features & Facilities</th>
                  <th className="p-6">Basic</th>
                  <th className="p-6">Standard</th>
                  <th className="p-6 text-primary">Premium</th>
                  <th className="p-6 text-secondary">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gym-gray-300">
                <tr>
                  <td className="p-6 font-semibold text-white">Gym Floor Access</td>
                  <td className="p-6">Yes (General Only)</td>
                  <td className="p-6">Yes</td>
                  <td className="p-6">Yes</td>
                  <td className="p-6">Yes (24/7 keycard)</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">Eleiko Barbells & Plates</td>
                  <td className="p-6">Yes</td>
                  <td className="p-6">Yes</td>
                  <td className="p-6">Yes</td>
                  <td className="p-6">Yes (Calibrated Sets)</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">Group Training Classes</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6">5 Classes / month</td>
                  <td className="p-6 text-white font-semibold">Unlimited</td>
                  <td className="p-6 text-white font-semibold">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">Sauna & Steam Suite</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6">Yes</td>
                  <td className="p-6">Yes</td>
                  <td className="p-6">Yes</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">4°C Cold Plunge Pools</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-white font-semibold">Yes</td>
                  <td className="p-6 text-white font-semibold">Yes</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">Body Composition Scans</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6">1 scan / month</td>
                  <td className="p-6">Weekly Scans</td>
                  <td className="p-6">Weekly Scans</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">Nutrition Programming</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6">Standard Templates</td>
                  <td className="p-6 text-primary font-bold">Bespoke Dietitian Plan</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">1-on-1 Personal Coaching</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6">4 Sessions / month</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">Fuel Bar Protein Shakes</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-gym-gray-500">No</td>
                  <td className="p-6 text-secondary font-bold">1 Daily (Complimentary)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. CORPORATE INQUIRIES */}
      <section className="py-24 bg-gym-dark text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        <Container className="relative z-10 max-w-xl space-y-6">
          <h3 className="text-3xl font-black font-display text-white">CORPORATE & TEAM RATES</h3>
          <p className="text-gym-gray-400 text-sm leading-relaxed">
            We partner with businesses and organizations to provide employee wellness assessments, custom group training classes, and priority keycard onboarding templates.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => window.location.href = '/contact?type=corporate'}
              className="text-xs font-bold py-3 px-6"
            >
              Contact Corporate Desk
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Membership;
