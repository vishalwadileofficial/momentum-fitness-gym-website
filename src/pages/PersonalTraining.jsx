import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiTarget, FiActivity, FiCompass, FiShield } from 'react-icons/fi';

const PersonalTraining = () => {
  return (
    <>
      <Helmet>
        <title>Personal Training | Momentum Fitness Coaching</title>
        <meta name="description" content="Achieve your fitness goals faster with 1-on-1 personal training at Momentum. Our certified coaches program custom biomechanics, strength training, and nutrition cycles." />
        <meta name="keywords" content="personal trainer, 1-on-1 training, gym coach, strength coaching, fitness consultant" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-secondary font-bold">Bespoke Coaching</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">1-ON-1 TRAINING</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Eliminate speculation. Partner with a dedicated high-performance coach to build custom athletic pathways.
          </p>
        </div>
      </section>

      {/* Structured Process */}
      <section className="py-16 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h3 className="text-3xl font-black font-display text-white">THE MOMENTUM METHOD</h3>
            <p className="text-gym-gray-400 text-sm">
              We design training using a systematic, results-oriented methodology. Here is what your cycle includes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">01</div>
              <h4 className="font-bold text-white font-display">Biomechanics Screen</h4>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                We analyze your joint angles, mobility restrictions, dynamic stability, and past injury profiles to establish a baseline.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary font-bold">02</div>
              <h4 className="font-bold text-white font-display">Periodized Plan</h4>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                We build block periodization routines balancing intensity, volume, and recovery curves aligned to your specific targets.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">03</div>
              <h4 className="font-bold text-white font-display">Nutrition Setup</h4>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Receive customized caloric, macro-nutrient, and supplementation targets with ongoing reviews from your training desk.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary font-bold">04</div>
              <h4 className="font-bold text-white font-display">Weekly Adaptation</h4>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                We track training loads, autonomic nervous system recovery, and progress milestones to fine-tune your programming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Stats */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-black font-display text-white">WHY WORK WITH A COACH?</h3>
              <p className="text-gym-gray-400 text-sm leading-relaxed">
                Independent training can lead to plateau patterns. A personal coach provides the structured execution and physical corrections necessary to make continuous gains.
              </p>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5">
                  <FiCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-white">Absolute Technique Integrity</span>
                    <p className="text-xs text-gym-gray-400">Eliminate injury risk. Learn correct bracing, bar paths, and posture structures.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <FiCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-white">Consistent Accountability</span>
                    <p className="text-xs text-gym-gray-400">No skipped sets or missed sessions. We keep you focused on your physical targets.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <FiCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-white">Effort Optimization</span>
                    <p className="text-xs text-gym-gray-400">Ensure every single workout set operates at the correct rate of perceived exertion (RPE).</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Consult Form */}
            <div className="glass-card border border-gym-gray-800 p-8 rounded-2xl">
              <h4 className="text-xl font-bold font-display text-white mb-6">REQUEST TRAINING CONSULT</h4>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Chen"
                    className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@email.com"
                      className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Primary Target</label>
                    <select className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary">
                      <option>Strength & Muscle Gain</option>
                      <option>Fat Loss & Tone</option>
                      <option>Athletic Performance</option>
                      <option>Injury Rehabilitation</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Training Experience</label>
                  <select className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary">
                    <option>Beginner (Less than 1 year)</option>
                    <option>Intermediate (1 - 3 years)</option>
                    <option>Advanced (3+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Message / Goal details</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your fitness history and goals..."
                    className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-gym-dark font-bold text-sm uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300"
                >
                  Submit Consult Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PersonalTraining;
