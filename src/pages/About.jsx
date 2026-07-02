import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiTarget, FiShield, FiHeart, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Momentum Fitness Premium Gym</title>
        <meta name="description" content="Discover the story behind Momentum Fitness. Learn about our mission, elite coaching staff, state-of-the-art facilities, and core values that drive our high-performance community." />
        <meta name="keywords" content="about momentum fitness, gym history, fitness mission, premium gym values" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Our Legacy</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">THE MOMENTUM STORY</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Founded in 2018, Momentum Fitness was established with a singular focus: to strip away the commercial distractions and construct the ultimate environment for athletic progression.
          </p>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-20 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-4xl font-black font-display text-gradient">WE DO NOT BELIEVE IN AVERAGE</h3>
              <p className="text-gym-gray-400 text-sm md:text-base leading-relaxed">
                Most commercial gyms design their clubs to minimize actual usage, banking on members who sign up and never show. We do the exact opposite. We build programs, schedule classes, and hire trainers with the express goal of getting you inside our doors, moving heavy weights, and realizing your true physiological capacity.
              </p>
              <p className="text-gym-gray-400 text-sm md:text-base leading-relaxed">
                Whether you are a seasoned competitor prepping for your next powerlifting meet, a runner aiming to trim minutes off your personal best, or a beginner looking to take control of your long-term health, Momentum provides the equipment and coaching to ensure your effort yields results.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl border border-gym-gray-800">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <FiTarget className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white mb-2">Our Mission</h4>
                <p className="text-xs text-gym-gray-400">
                  To provide competition-grade equipment, elite level training, and comprehensive nutrition models to maximize athletic longevity and strength.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-gym-gray-800">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4">
                  <FiTrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white mb-2">Our Vision</h4>
                <p className="text-xs text-gym-gray-400">
                  To lead the high-performance fitness movement globally, turning everyday gym-goers into strong, resilient athletes.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-gym-gray-800">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <FiShield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white mb-2">Our Value</h4>
                <p className="text-xs text-gym-gray-400">
                  Science-based methodologies, absolute transparency, zero egos, and a collaborative community that pushes you forward.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-gym-gray-800">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4">
                  <FiHeart className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white mb-2">Our Support</h4>
                <p className="text-xs text-gym-gray-400">
                  From customized lifting cycles to nutrition assessments and active recovery tools, we support your entire fitness ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-primary font-bold">Uncompromising Standards</h3>
            <h4 className="text-3xl md:text-5xl font-black font-display text-white">THE FACILITY BREAKDOWN</h4>
            <p className="text-gym-gray-400 text-sm">
              We invite you to check our layout. Clean lines, open spaces, and premium materials designed to help you focus on performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="h-48 rounded-xl bg-gym-gray-800 border border-gym-gray-700 flex items-center justify-center">
                <p className="text-gym-gray-400 font-bold uppercase tracking-wider text-sm">Main Lifting Zone</p>
              </div>
              <h5 className="text-lg font-bold text-white">The Heavy Metal Yard</h5>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Featuring 12 Eleiko custom power racks, competition barbell plates, and rubberized impact flooring so you can pull and press without restriction.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-48 rounded-xl bg-gym-gray-800 border border-gym-gray-700 flex items-center justify-center">
                <p className="text-gym-gray-400 font-bold uppercase tracking-wider text-sm">HIIT & Athletic Turf</p>
              </div>
              <h5 className="text-lg font-bold text-white">The Performance Track</h5>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                30 meters of premium synthetic sled turf, kettlebell stands, rowers, assault bikes, and climbing ropes for raw conditioning sessions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-48 rounded-xl bg-gym-gray-800 border border-gym-gray-700 flex items-center justify-center">
                <p className="text-gym-gray-400 font-bold uppercase tracking-wider text-sm">Recovery Suite</p>
              </div>
              <h5 className="text-lg font-bold text-white">Contrast & Recovery</h5>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Complete with two custom cold plunge tubs (maintained at 4°C), dry cedar saunas, and a dedicated compression zone with massage chairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gym-dark text-center">
        <div className="container mx-auto px-6 max-w-xl space-y-6">
          <h3 className="text-3xl font-black font-display text-white">SEE MOMENTUM IN ACTION</h3>
          <p className="text-gym-gray-400 text-sm">
            Book a complimentary club walkthrough. Our staff will show you the equipment, run a free body-composition printout, and outline custom programs.
          </p>
          <div>
            <a
              href="/contact"
              className="inline-flex justify-center px-8 py-3.5 bg-primary text-gym-dark font-bold rounded-lg hover:bg-primary-dark transition-all duration-300"
            >
              Book Facility Tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
