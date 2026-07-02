import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiClock, FiActivity, FiUser, FiZap, FiBookOpen } from 'react-icons/fi';

const Programs = () => {
  const [filter, setFilter] = useState('all');

  const programsData = [
    {
      id: 1,
      category: 'strength',
      title: 'Power & Barbell Club',
      duration: '60 mins',
      difficulty: 'Intermediate - Advanced',
      trainer: 'Marcus Vance',
      description: 'Focus on compound barbell operations: squat, bench press, deadlift, and overhead press. Master structural mechanics and periodization principles.',
    },
    {
      id: 2,
      category: 'cardio',
      title: 'HIIT Performance Track',
      duration: '45 mins',
      difficulty: 'All Levels',
      trainer: 'Sarah Rodriguez',
      description: 'High-octane metabolic intervals using air bikes, rowers, dumbells, and bodyweight. Built to torch calories and maximize aerobic capacity.',
    },
    {
      id: 3,
      category: 'wellness',
      title: 'Vinyasa Flow & Mobility',
      duration: '60 mins',
      difficulty: 'Beginner - Intermediate',
      trainer: 'Elena Rostova',
      description: 'Unwind neural tension, increase multi-planar range of motion, and build foundational core strength through aligned yoga sequences.',
    },
    {
      id: 4,
      category: 'strength',
      title: 'Olympic Weightlifting Foundation',
      duration: '75 mins',
      difficulty: 'Advanced',
      trainer: 'Dmitry Petrov',
      description: 'Refine the technical phases of the Snatch and Clean & Jerk. Includes specialized pull drills, mobility protocols, and safety maneuvers.',
    },
    {
      id: 5,
      category: 'cardio',
      title: 'Strike Boxing & MMA Conditioning',
      duration: '50 mins',
      difficulty: 'All Levels',
      trainer: 'Cole Vance',
      description: 'Combine heavy bag combinations, mit drills, core bracing, and shadow-boxing rounds for a full-body cardiovascular workout.',
    },
    {
      id: 6,
      category: 'wellness',
      title: 'Active Hypertrophy Recovery',
      duration: '45 mins',
      difficulty: 'Beginner',
      trainer: 'Dr. Evelyn Carter',
      description: 'Low-intensity recovery drills, myofascial trigger-point release, and targeted muscle activation routines to facilitate repair.',
    },
  ];

  const filteredPrograms = filter === 'all' 
    ? programsData 
    : programsData.filter(p => p.category === filter);

  return (
    <>
      <Helmet>
        <title>Training Programs | Momentum Fitness Group Classes</title>
        <meta name="description" content="Discover professional fitness programs at Momentum. Filter through Strength training, Cardio HIIT, and Wellness/Yoga classes scheduled daily with our elite coaches." />
        <meta name="keywords" content="strength training programs, gym classes, yoga, HIIT, boxing class, fitness programs" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Class Offerings</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">ENGINEERED PROGRAMS</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Our classes are meticulously programmed to avoid random activity and focus on target, measurable physical adaptations.
          </p>
        </div>
      </section>

      {/* Programs List with Filter */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'strength', 'cardio', 'wellness'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? 'bg-primary text-gym-dark shadow-md shadow-primary/10'
                    : 'bg-gym-gray-800 text-gym-gray-400 hover:bg-gym-gray-700'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => (
              <div key={prog.id} className="glass-card rounded-2xl border border-gym-gray-800 p-8 flex flex-col justify-between hover:border-gym-gray-700 transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      prog.category === 'strength' ? 'bg-primary/15 text-primary border border-primary/20' :
                      prog.category === 'cardio' ? 'bg-secondary/15 text-secondary border border-secondary/20' :
                      'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                    }`}>
                      {prog.category}
                    </span>
                    <span className="text-xs font-semibold text-gym-gray-400">{prog.difficulty}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white">{prog.title}</h3>
                  <p className="text-gym-gray-400 text-sm leading-relaxed">{prog.description}</p>
                </div>

                <div className="border-t border-gym-gray-800 mt-8 pt-4 flex items-center justify-between text-xs text-gym-gray-400">
                  <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4 text-gym-gray-400" />
                    <span>{prog.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiUser className="w-4 h-4 text-primary" />
                    <span>Coach: {prog.trainer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Schedule Info */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto glass-card border border-gym-gray-800 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-black font-display text-white">RESERVE YOUR CLASS</h3>
              <p className="text-gym-gray-400 text-sm leading-relaxed">
                Active Elite and VIP members can reserve class slots directly from the dashboard up to 7 days in advance. Make sure to sign in 10 minutes prior to session start.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs text-gym-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Morning Slots: 06:00 - 09:00
                </li>
                <li className="flex items-center gap-2 text-xs text-gym-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Midday Slots: 12:00 - 13:30
                </li>
                <li className="flex items-center gap-2 text-xs text-gym-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Evening Slots: 17:00 - 20:30
                </li>
              </ul>
            </div>
            <div className="bg-gym-gray-950 p-6 rounded-xl border border-gym-gray-800 text-center space-y-4">
              <FiZap className="w-10 h-10 text-primary mx-auto animate-pulse" />
              <h4 className="font-bold text-white font-display">New to the Momentum Facility?</h4>
              <p className="text-xs text-gym-gray-400">
                You can try your first class completely free. Register a temporary guest profile to start.
              </p>
              <a
                href="/register"
                className="w-full inline-flex justify-center py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300"
              >
                Claim Guest Pass
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
