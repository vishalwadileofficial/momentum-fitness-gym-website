import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiInstagram, FiMail, FiAward } from 'react-icons/fi';

const Trainers = () => {
  const [specialtyFilter, setSpecialtyFilter] = useState('all');

  const trainersData = [
    {
      id: 1,
      name: 'Marcus Vance',
      role: 'Head Strength Coach',
      specialty: 'strength',
      specialtyLabel: 'Power & Barbell Training',
      certs: ['CSCS *D', 'USAW Level 2', 'B.S. Exercise Science'],
      bio: 'Over 12 years of coaching national powerlifters and athletes. Specializes in structural barbell periodization.',
      initials: 'MV',
    },
    {
      id: 2,
      name: 'Sarah Rodriguez',
      role: 'Athletic Conditioning Lead',
      specialty: 'cardio',
      specialtyLabel: 'HIIT & Metabolic Conditioning',
      certs: ['NASM-PES', 'CF-L1', 'FMS Level 1'],
      bio: 'Ex-collegiate track runner. Specializes in anaerobic threshold development and high-intensity interval metrics.',
      initials: 'SR',
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Yoga & Mobility Coordinator',
      specialty: 'wellness',
      specialtyLabel: 'Active Recovery & Yoga',
      certs: ['RYT-500', 'Functional Range Conditioning (FRC)'],
      bio: 'Combines structural biomechanics with traditional yoga formats to optimize athletic recovery and joint health.',
      initials: 'ER',
    },
    {
      id: 4,
      name: 'Dmitry Petrov',
      role: 'Olympic Weightlifting Coach',
      specialty: 'strength',
      specialtyLabel: 'Olympic Weightlifting',
      certs: ['Master of Sport (Russia)', 'USAW National Coach'],
      bio: 'Former Olympic competitor. Meticulous focus on technique phases, snatch speeds, and overhead stabilization.',
      initials: 'DP',
    },
    {
      id: 5,
      name: 'Cole Vance',
      role: 'MMA Conditioning Specialist',
      specialty: 'cardio',
      specialtyLabel: 'Striking & MMA Fitness',
      certs: ['NASM-CPT', 'ISKA Kickboxing Certified'],
      bio: 'Professional mixed martial artist. Integrates striking movements with complex high-energy physical conditioning.',
      initials: 'CV',
    },
    {
      id: 6,
      name: 'Dr. Evelyn Carter',
      role: 'Sports Dietitian & Recovery Consultant',
      specialty: 'wellness',
      specialtyLabel: 'Dietary Optimization',
      certs: ['Registered Dietitian (RD)', 'Ph.D. Sports Nutrition'],
      bio: 'Manages metabolic pathways, body composition mapping, and custom performance hydration formulas.',
      initials: 'EC',
    },
  ];

  const filteredTrainers = specialtyFilter === 'all'
    ? trainersData
    : trainersData.filter(t => t.specialty === specialtyFilter);

  return (
    <>
      <Helmet>
        <title>Our Trainers | Momentum Fitness Coaching Team</title>
        <meta name="description" content="Meet the elite training staff at Momentum Fitness. Our certified strength coaches, sports dietitians, and metabolic conditioning specialists are ready to guide you." />
        <meta name="keywords" content="gym trainers, strength coach, fitness instructor, certified personal trainer, powerlifting coach" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Elite Staff</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">THE COACHING ROSTER</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            We don't employ rep-counters. Every Momentum coach is fully certified, scientifically grounded, and dedicated to target athletic metrics.
          </p>
        </div>
      </section>

      {/* Trainers Listing */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          {/* Specialty Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'strength', 'cardio', 'wellness'].map((spec) => (
              <button
                key={spec}
                onClick={() => setSpecialtyFilter(spec)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  specialtyFilter === spec
                    ? 'bg-primary text-gym-dark shadow-md'
                    : 'bg-gym-gray-800 text-gym-gray-400 hover:bg-gym-gray-700'
                }`}
              >
                {spec === 'all' ? 'All Specialties' : spec}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer) => (
              <div key={trainer.id} className="glass-card rounded-2xl border border-gym-gray-800 p-8 flex flex-col justify-between hover:border-gym-gray-700 transition-all duration-300">
                <div className="space-y-6">
                  {/* Photo Placeholder */}
                  <div className="w-20 h-20 rounded-full bg-gym-gray-800 flex items-center justify-center border-2 border-gym-gray-700 mx-auto text-2xl font-bold font-display text-primary">
                    {trainer.initials}
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold font-display text-white">{trainer.name}</h3>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">{trainer.role}</p>
                    <p className="text-[11px] text-gym-gray-400 font-medium">Specialty: {trainer.specialtyLabel}</p>
                  </div>

                  <p className="text-gym-gray-400 text-xs leading-relaxed text-center min-h-[48px]">
                    {trainer.bio}
                  </p>

                  <div className="border-t border-gym-gray-800 pt-4">
                    <p className="text-[10px] uppercase font-bold text-white tracking-wider mb-2 text-center">Credentials & Certs</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {trainer.certs.map((c, i) => (
                        <span key={i} className="text-[9px] bg-gym-gray-800 text-gym-gray-300 px-2 py-0.5 rounded border border-gym-gray-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gym-gray-800 mt-6 pt-4 flex items-center justify-center gap-4">
                  <a
                    href={`/contact?coach=${encodeURIComponent(trainer.name)}`}
                    className="px-6 py-2 bg-gym-gray-800 text-white hover:bg-gym-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 border border-gym-gray-700"
                  >
                    Request Coaching
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

export default Trainers;
