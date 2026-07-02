import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiCheck, FiPlay, FiAward, FiHeart, FiTrendingUp } from 'react-icons/fi';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Momentum Fitness | Premium Gym & Strength Center</title>
        <meta name="description" content="Welcome to Momentum Fitness, the ultimate premium strength, performance, and wellness center. Join today to crush your fitness goals with certified trainers, top-tier equipment, and custom nutrition plans." />
        <meta name="keywords" content="gym, premium fitness, strength training, personal trainer, bodybuilding, cardio, nutrition, wellness" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gym-dark pt-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
          <div className="text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gym-gray-800 border border-gym-gray-700 text-xs font-semibold tracking-wider text-primary uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              The Ultimate Fitness Experience
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight leading-none text-white">
              DOMINATE <br />
              YOUR <span className="text-gradient-neon">LIMITS</span>
            </h1>
            <p className="text-gym-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
              Unlock your peak potential with state-of-the-art facilities, world-class athletic coaching, and a driven community supporting your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/membership"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-gym-dark font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Start Your Journey
                <FiArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gym-gray-900 border border-gym-gray-800 text-white font-bold rounded-lg hover:bg-gym-gray-800 transition-all duration-300"
              >
                Explore Programs
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-gym-gray-800 shadow-2xl glass-card">
              <div className="absolute inset-0 bg-gradient-to-t from-gym-dark via-transparent to-transparent z-10"></div>
              {/* Fallback pattern in case image isn't loaded */}
              <div className="absolute inset-0 bg-gym-gray-900 flex items-center justify-center">
                <div className="text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-primary animate-bounce">
                    <FiTrendingUp className="w-8 h-8" />
                  </div>
                  <p className="text-xl font-bold tracking-wide uppercase text-white font-display">Momentum Strength Club</p>
                  <p className="text-xs text-gym-gray-400">Premium Athletic Training Facility</p>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-20 glass-card p-6 rounded-xl border border-white/5">
                <p className="text-xs uppercase tracking-wider text-primary font-bold">Featured Workout</p>
                <h3 className="text-lg font-bold text-white mt-1">High-Intensity Performance Training</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gym-gray-400">Daily at 07:00 & 18:00</span>
                  <a href="/programs" className="text-primary hover:underline text-xs font-bold inline-flex items-center gap-1">
                    Book Spot <FiArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gym-gray-900 border-y border-gym-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-black font-display text-primary">15k+</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2">Active Members</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black font-display text-secondary">45+</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2">Certified Trainers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black font-display text-white">120+</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2">Weekly Classes</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black font-display text-primary">99%</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Programs */}
      <section className="py-24 bg-gym-dark relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Programs Engineered for You</h2>
            <h3 className="text-3xl md:text-5xl font-black font-display">CHOOSE YOUR PATH</h3>
            <p className="text-gym-gray-400">Whether you want to build raw strength, burn fat, improve flexibility, or master martial arts, we have the ideal programs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="glass-card glass-card-hover p-8 rounded-2xl border border-gym-gray-800 flex flex-col justify-between h-[320px]">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  <FiAward className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-display mb-3">Strength & Power</h4>
                <p className="text-gym-gray-400 text-sm leading-relaxed">
                  Powerlifting, olympic lifting, and target hypertrophy templates designed to pack on lean muscle and massive strength.
                </p>
              </div>
              <a href="/programs" className="inline-flex items-center gap-2 text-primary font-bold text-sm group">
                Learn More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Program 2 */}
            <div className="glass-card glass-card-hover p-8 rounded-2xl border border-gym-gray-800 flex flex-col justify-between h-[320px]">
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-6">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-display mb-3">Athletic Conditioning</h4>
                <p className="text-gym-gray-400 text-sm leading-relaxed">
                  High intensity functional HIIT, cardio conditioning, and agility courses to maximize calorie burn and increase stamina.
                </p>
              </div>
              <a href="/programs" className="inline-flex items-center gap-2 text-primary font-bold text-sm group">
                Learn More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Program 3 */}
            <div className="glass-card glass-card-hover p-8 rounded-2xl border border-gym-gray-800 flex flex-col justify-between h-[320px]">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  <FiHeart className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-display mb-3">Holistic Wellness</h4>
                <p className="text-gym-gray-400 text-sm leading-relaxed">
                  Yoga flows, active mobility routines, and meditation workshops to restore harmony, recover fully, and improve performance.
                </p>
              </div>
              <a href="/programs" className="inline-flex items-center gap-2 text-primary font-bold text-sm group">
                Learn More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gym-gray-900 border-t border-gym-gray-800 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Unmatched Quality</h2>
              <h3 className="text-3xl md:text-5xl font-black font-display leading-tight">WHY ELITE ATHLETES CHOOSE MOMENTUM</h3>
              <p className="text-gym-gray-400">
                We don't do average. Momentum is built for those who demand the absolute best from their training environments.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <FiCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-white">Premium Hammer Strength & Eleiko Gear</strong>
                    <p className="text-gym-gray-400 text-sm">We outfit our training floor with competition-grade weightlifting equipment.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <FiCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-white">Professional Medical & Nutrition Consultants</strong>
                    <p className="text-gym-gray-400 text-sm">Get real nutritional plans and body composition tracking from absolute professionals.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <FiCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-white">Recovery Zone & Cold Plunges</strong>
                    <p className="text-gym-gray-400 text-sm">Contrast therapy, modern saunas, and compression sleeves to accelerate your recovery.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card rounded-2xl border border-gym-gray-800 p-8 flex flex-col justify-center text-center space-y-6 relative overflow-hidden h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
              <h4 className="text-2xl font-black font-display">MEMBERSHIP SPECIAL</h4>
              <p className="text-gym-gray-400 max-w-sm mx-auto">
                Join this week and secure a customized nutritional assessment, plus zero enrollment fees.
              </p>
              <div className="text-4xl font-black font-display text-white">
                $49<span className="text-sm font-normal text-gym-gray-400"> / month</span>
              </div>
              <div>
                <a
                  href="/membership"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-gym-dark font-bold rounded-lg hover:bg-primary-dark transition-all duration-300"
                >
                  Claim Offer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold">Client Success</h2>
            <h3 className="text-3xl md:text-5xl font-black font-display">ATHLETES OF MOMENTUM</h3>
            <p className="text-gym-gray-400">Real people. Extraordinary results. Check out what our members have accomplished.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl border border-gym-gray-800 flex flex-col justify-between">
              <p className="text-gym-gray-400 italic text-sm leading-relaxed">
                "Joining Momentum completely reshaped my physique and mentality. The trainers don't just count reps; they analyze movement patterns and program tailored cycles. I've put 45kg on my squat in a year."
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gym-gray-800">
                <div className="w-12 h-12 rounded-full bg-gym-gray-800 flex items-center justify-center font-bold text-primary">
                  MC
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Marcus Chen</h5>
                  <p className="text-xs text-gym-gray-400">Competitive Powerlifter</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-gym-gray-800 flex flex-col justify-between">
              <p className="text-gym-gray-400 italic text-sm leading-relaxed">
                "The atmosphere here is pure electric focus. There is no commercial fluff. You walk in, hear the metal clanging, and immediately find another gear. The contrast recovery facility is an absolute gamechanger."
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gym-gray-800">
                <div className="w-12 h-12 rounded-full bg-gym-gray-800 flex items-center justify-center font-bold text-secondary">
                  SR
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Sarah Rodriguez</h5>
                  <p className="text-xs text-gym-gray-400">Marathon Runner & Athlete</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-gym-gray-800 flex flex-col justify-between">
              <p className="text-gym-gray-400 italic text-sm leading-relaxed">
                "As a busy executive, I need zero friction. The corporate VIP package gives me personal coaching, customized macro-aligned meals waiting for me at the shake bar, and pristine private lockers. Simply exceptional."
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gym-gray-800">
                <div className="w-12 h-12 rounded-full bg-gym-gray-800 flex items-center justify-center font-bold text-primary">
                  DL
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">David Laurent</h5>
                  <p className="text-xs text-gym-gray-400">CEO & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black font-display">READY TO START YOUR BUILD?</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Stop waiting for 'next Monday'. Join Momentum Fitness today and step into the high-performance lifestyle.
          </p>
          <div>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-gym-dark font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300"
            >
              Sign Up Online Now
              <FiArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
