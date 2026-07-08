import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiPieChart, FiShoppingBag, FiHeart, FiTrendingUp } from 'react-icons/fi';

const Nutrition = () => {
  const plans = [
    {
      id: 1,
      title: 'Macro Assessment',
      price: '$59',
      frequency: 'one-time',
      description: 'Ideal for self-directed athletes needing precise starting numbers.',
      perks: [
        'Custom caloric & macronutrient calculations',
        'Fueling strategy guide (pre/post-workout)',
        'Sample grocery checklist',
      ],
    },
    {
      id: 2,
      title: 'Performance Nutrition',
      price: '$129',
      frequency: 'month',
      description: 'Ongoing alignment for athletes looking to build muscle or drop fat systematically.',
      perks: [
        'Weekly online check-ins & macro adjustments',
        'Custom 7-day meal plan templates',
        'Supplementation guidance & recommendations',
        'Direct email access to your dietitian',
      ],
      highlight: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nutrition Coaching | Momentum Fitness Meal Plans</title>
        <meta name="description" content="Fuel your performance with custom nutrition plans from Momentum. Get tailored macro-nutrient layouts, supplementation guides, and coaching from certified sports dietitians." />
        <meta name="keywords" content="gym nutrition, sports dietitian, meal plan, macros tracker, calorie calculator, performance diet" />
        <link rel="canonical" href="https://momentumfitness.in/nutrition" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Fuel Performance</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">NUTRITION COACHING</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Training is only half the battle. Optimize your dietary intake to accelerate recovery, increase power output, and restructure your physique.
          </p>
        </div>
      </section>

      {/* Philosophy Details */}
      <section className="py-16 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl border border-gym-gray-800 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FiPieChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Bespoke Caloric Targets</h3>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                We calculate your base metabolic rate (BMR) and total daily energy expenditure (TDEE) to customize target carbs, proteins, and fats.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl border border-gym-gray-800 space-y-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                <FiShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Structured Grocery Lists</h3>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Take the stress out of shopping. Get organized lists of high-yield whole foods broken down by macro categories.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl border border-gym-gray-800 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FiHeart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Sustainable Habits</h3>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                No extreme crash diets. We emphasize consistent dietary adjustments that seamlessly integrate with your career and family life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Dietitians */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-secondary font-bold">Scientific Authority</h3>
            <h4 className="text-3xl md:text-5xl font-black font-display text-white">CERTIFIED DIETITIANS</h4>
            <p className="text-gym-gray-400 text-sm">
              Our nutrition team holds accredited university degrees in human kinetics and sports nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-2xl border border-gym-gray-800 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-full bg-gym-gray-800 flex items-center justify-center text-primary font-bold shrink-0 border border-gym-gray-700">
                EC
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h5 className="text-lg font-bold text-white">Dr. Evelyn Carter, RD</h5>
                <p className="text-xs text-primary font-bold uppercase tracking-wider">Chief Sports Nutritionist</p>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  Specializes in micronutrient optimization, metabolic repair, and athletic hydration protocols for endurance competitors.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-gym-gray-800 flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-full bg-gym-gray-800 flex items-center justify-center text-secondary font-bold shrink-0 border border-gym-gray-700">
                LR
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h5 className="text-lg font-bold text-white">Liam Reynolds, MS</h5>
                <p className="text-xs text-secondary font-bold uppercase tracking-wider">Performance Nutrition Coach</p>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  Focuses on skeletal muscle hypertrophy, amino acid utilization, and caloric structure for strength athletes and bodybuilders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-20 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h3 className="text-3xl font-black font-display text-white">COACHING PACKAGES</h3>
            <p className="text-gym-gray-400 text-sm">Select the nutrition tier that fits your level of execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.id}
                className={`glass-card p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  p.highlight ? 'border-primary shadow-[0_0_20px_rgba(204,255,0,0.1)]' : 'border-gym-gray-800'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-white font-display">{p.title}</h4>
                    {p.highlight && <span className="bg-primary text-gym-dark text-[10px] font-bold px-2 py-0.5 rounded uppercase">Highly Recommended</span>}
                  </div>
                  <p className="text-xs text-gym-gray-400">{p.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black font-display text-white">{p.price}</span>
                    <span className="text-gym-gray-400 text-xs">/ {p.frequency}</span>
                  </div>
                  <ul className="space-y-2.5 pt-4 border-t border-gym-gray-800">
                    {p.perks.map((prk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gym-gray-300">
                        <FiCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{prk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="/contact?type=nutrition"
                    className="w-full inline-flex justify-center py-2.5 bg-gym-gray-800 hover:bg-gym-gray-700 text-white font-bold text-xs uppercase tracking-wider rounded border border-gym-gray-700 transition-all duration-300"
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Nutrition;
