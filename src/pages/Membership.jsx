import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiX, FiAward, FiZap, FiStar } from 'react-icons/fi';

const Membership = () => {
  const plans = [
    {
      id: 'base',
      name: 'Base Club',
      icon: <FiZap className="w-6 h-6 text-gym-gray-400" />,
      price: '49',
      description: 'Perfect for independent lifters seeking access to premium machinery and gym floors.',
      features: [
        'Full access to all cardio & strength training zones',
        'Locker room & private shower access',
        'Complimentary high-speed WiFi',
        '1 Free fitness evaluation session',
      ],
      notIncluded: [
        'Access to recovery suite (sauna & cold plunges)',
        'Unlimited group training classes',
        'Custom nutrition & macro templates',
        '1-on-1 private coach monthly hours',
      ],
    },
    {
      id: 'elite',
      name: 'Elite Performance',
      icon: <FiAward className="w-6 h-6 text-primary" />,
      price: '89',
      description: 'Our most popular tier. Designed for active athletes who want recovery amenities and classes.',
      features: [
        'Full access to all strength & turf zones',
        'Unlimited classes (HIIT, Yoga, Mobility, Conditioning)',
        'Full recovery suite access (Cedar saunas & cold plunges)',
        'Monthly body composition scan & printout',
        'Standard custom nutrition templates',
      ],
      notIncluded: [
        '1-on-1 private trainer dedicated hours',
        'Complimentary protein shake per workout',
      ],
      highlight: true,
    },
    {
      id: 'vip',
      name: 'Momentum VIP',
      icon: <FiStar className="w-6 h-6 text-secondary" />,
      price: '199',
      description: 'The ultimate bespoke experience. 1-on-1 coaching, bespoke nutrition, and full lounge perks.',
      features: [
        'All Elite tier access and benefits',
        '4 private 1-on-1 personal training hours/month',
        'Daily post-workout premium protein shake from Fuel Bar',
        'Bespoke dietitian-designed monthly meal plan',
        'Complimentary laundry service for gym apparel',
        '24/7 digital access to your coaching team',
      ],
      notIncluded: [],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Memberships | Momentum Fitness Pricing Plans</title>
        <meta name="description" content="Explore membership plans at Momentum Fitness. Choose from Base Club, Elite Performance, or VIP templates to matches your goals, complete with premium benefits, recovery suite, and private coaching." />
        <meta name="keywords" content="gym membership, pricing, fitness pricing, premium gym membership, gym signup" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Select Your Plan</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">CHOOSE YOUR MOMENTUM</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Invest in your physical potential. Select the membership tier that aligns with your intensity, schedule, and recovery needs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`glass-card rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                  plan.highlight
                    ? 'border-primary shadow-[0_0_30px_rgba(204,255,0,0.15)] bg-gym-gray-900/90 transform lg:-translate-y-4'
                    : 'border-gym-gray-800 bg-gym-gray-900/50 hover:border-gym-gray-700'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 left-0 bg-primary text-gym-dark text-center font-bold py-1.5 text-xs uppercase tracking-wider">
                    Most Popular Choice
                  </div>
                )}
                
                <div className="p-8 space-y-6 pt-12">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold font-display text-white">{plan.name}</h3>
                    <div className="w-10 h-10 rounded-lg bg-gym-gray-800 flex items-center justify-center border border-gym-gray-700">
                      {plan.icon}
                    </div>
                  </div>

                  <p className="text-gym-gray-400 text-sm leading-relaxed min-h-[48px]">{plan.description}</p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black font-display text-white">${plan.price}</span>
                    <span className="text-gym-gray-400 text-sm">/ month</span>
                  </div>

                  <div className="border-t border-gym-gray-800 pt-6 space-y-4">
                    <p className="text-xs uppercase tracking-widest font-bold text-white">What's Included:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gym-gray-300">
                          <FiCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.notIncluded && plan.notIncluded.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-gym-gray-500 line-through">
                          <FiX className="w-4 h-4 text-gym-gray-700 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-8 bg-gym-gray-950/80 border-t border-gym-gray-800">
                  <a
                    href={`/register?plan=${plan.id}`}
                    className={`w-full inline-flex items-center justify-center py-3 font-bold rounded-lg transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-primary text-gym-dark hover:bg-primary-dark shadow-lg shadow-primary/15'
                        : 'bg-gym-gray-800 text-white hover:bg-gym-gray-700 border border-gym-gray-700'
                    }`}
                  >
                    Select Plan & Sign Up
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h3 className="text-3xl font-black font-display text-white">MEMBERSHIP COMPARISON</h3>
            <p className="text-gym-gray-400 text-sm">
              Review our direct plan grid details below. Contact our sales desk for custom corporate options or family group rates.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gym-gray-800 glass-card">
              <thead>
                <tr className="bg-gym-gray-950 border-b border-gym-gray-800">
                  <th className="p-5 text-sm font-bold text-white uppercase tracking-wider">Features</th>
                  <th className="p-5 text-sm font-bold text-white uppercase tracking-wider">Base</th>
                  <th className="p-5 text-sm font-bold text-primary uppercase tracking-wider">Elite</th>
                  <th className="p-5 text-sm font-bold text-secondary uppercase tracking-wider">VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gym-gray-800">
                <tr>
                  <td className="p-5 text-sm font-semibold text-white">Gym Floor Access</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="p-5 text-sm font-semibold text-white">Premium Equipment Usage</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="p-5 text-sm font-semibold text-white">Class Scheduling</td>
                  <td className="p-5 text-sm text-gym-gray-500">Pay per class</td>
                  <td className="p-5 text-sm text-gym-gray-300">Unlimited</td>
                  <td className="p-5 text-sm text-gym-gray-300">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-5 text-sm font-semibold text-white">Contrast Recovery Suite</td>
                  <td className="p-5 text-sm text-gym-gray-500">No</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                  <td className="p-5 text-sm text-gym-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="p-5 text-sm font-semibold text-white">Custom Nutrition Templates</td>
                  <td className="p-5 text-sm text-gym-gray-500">No</td>
                  <td className="p-5 text-sm text-gym-gray-300">Basic</td>
                  <td className="p-5 text-sm text-gym-gray-300">Bespoke Dietitian Plan</td>
                </tr>
                <tr>
                  <td className="p-5 text-sm font-semibold text-white">Personal Training Sessions</td>
                  <td className="p-5 text-sm text-gym-gray-500">No</td>
                  <td className="p-5 text-sm text-gym-gray-500">Discounted rate</td>
                  <td className="p-5 text-sm text-gym-gray-300">4 Sessions / month</td>
                </tr>
                <tr>
                  <td className="p-5 text-sm font-semibold text-white">Fuel Bar Free Shake</td>
                  <td className="p-5 text-sm text-gym-gray-500">No</td>
                  <td className="p-5 text-sm text-gym-gray-500">No</td>
                  <td className="p-5 text-sm text-gym-gray-300">1 Daily</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Corporate Inquiries */}
      <section className="py-20 bg-gym-dark text-center">
        <div className="container mx-auto px-6 max-w-xl space-y-6">
          <h3 className="text-2xl font-black font-display text-white">CORPORATE & TEAM RATES</h3>
          <p className="text-gym-gray-400 text-sm">
            We partner with enterprises to keep teams physically fit, mentally sharp, and highly energized. Get customized onboarding templates, wellness seminars, and private team-building workouts.
          </p>
          <div>
            <a
              href="/contact?type=corporate"
              className="inline-flex justify-center px-8 py-3 bg-gym-gray-900 border border-gym-gray-800 text-white font-bold rounded-lg hover:bg-gym-gray-800 transition-all duration-300"
            >
              Contact Corporate Desk
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Membership;
