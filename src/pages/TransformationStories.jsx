import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiTrendingUp, FiArrowRight, FiCheck } from 'react-icons/fi';

const TransformationStories = () => {
  const stories = [
    {
      id: 1,
      name: 'Ethan Caldwell',
      age: 29,
      goal: 'Body Recomposition & Strength',
      duration: '6 Months',
      stats: {
        weight: '-12 kg (Fat Loss)',
        muscle: '+4 kg (Muscle Gain)',
        squat: '+45 kg (Strength)',
      },
      story: 'Ethan worked with Coach Marcus Vance to structuralize his powerlifts and correct dynamic posture alignment. Under bespoke macro coaching, he successfully dropped body fat percentage from 24% to 12% while increasing compound lift volume.',
      initials: 'EC',
    },
    {
      id: 2,
      name: 'Samantha Vance',
      age: 34,
      goal: 'Athletic Conditioning & Endurance',
      duration: '9 Months',
      stats: {
        weight: '-8 kg (Fat Loss)',
        vo2: '+18% (VO2 Max)',
        deadlift: '+30 kg (Strength)',
      },
      story: 'As a marathon runner, Samantha suffered from chronic knee pain. Working with Sarah Rodriguez, she integrated unilateral single-leg strength exercises and targeted posterior chain drills, resolving joint pains and setting a marathon PR.',
      initials: 'SV',
    },
    {
      id: 3,
      name: 'Liam Sterling',
      age: 41,
      goal: 'Muscle Hypertrophy & Longevity',
      duration: '12 Months',
      stats: {
        weight: '+7 kg (Lean Mass)',
        bodyFat: '-6% (Fat Loss)',
        bench: '+25 kg (Strength)',
      },
      story: 'Liam felt stuck in a career plateau with high stress levels. Under VIP dietitian Evelyn Carter, he established consistent sleep patterns, meal-prep structures, and a 4-day linear hypertrophy split. His body fat dropped while building lean mass.',
      initials: 'LS',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Transformation Stories | Momentum Fitness Success</title>
        <meta name="description" content="Read inspiring success stories and transformation reviews from Momentum Fitness members. See real results in weight loss, muscle gain, and strength progression." />
        <meta name="keywords" content="gym success stories, body transformations, weight loss results, strength gains, muscle building" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Client Success</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">TRANSFORMATION STORIES</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Real people. Genuine, science-backed athletic progression. Discover the results our members have achieved through absolute commitment.
          </p>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {stories.map((s) => (
              <div key={s.id} className="glass-card rounded-2xl border border-gym-gray-800 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center hover:border-gym-gray-700 transition-all duration-300">
                
                {/* Visual Placeholder */}
                <div className="flex flex-col items-center justify-center space-y-4 py-8 border-b lg:border-b-0 lg:border-r border-gym-gray-800">
                  <div className="w-24 h-24 rounded-full bg-gym-gray-800 flex items-center justify-center text-3xl font-bold font-display text-primary border border-gym-gray-700">
                    {s.initials}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white">{s.name}</h3>
                    <p className="text-xs text-gym-gray-400">Age: {s.age} | Goal: {s.goal}</p>
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">Duration: {s.duration}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-bold text-white tracking-widest">Key Accomplishments</h4>
                  <ul className="space-y-2.5">
                    <li className="flex items-center gap-2 text-xs text-gym-gray-300">
                      <FiCheck className="w-4 h-4 text-primary" />
                      <span>Weight Shift: <strong className="text-white">{s.stats.weight}</strong></span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gym-gray-300">
                      <FiCheck className="w-4 h-4 text-primary" />
                      {s.stats.muscle ? (
                        <span>Lean Muscle: <strong className="text-white">{s.stats.muscle}</strong></span>
                      ) : (
                        <span>Cardio Metric: <strong className="text-white">{s.stats.vo2}</strong></span>
                      )}
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gym-gray-300">
                      <FiCheck className="w-4 h-4 text-primary" />
                      <span>Compound Strength: <strong className="text-white">{s.stats.squat || s.stats.deadlift || s.stats.bench}</strong></span>
                    </li>
                  </ul>
                </div>

                {/* Client Narrative */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-bold text-white tracking-widest">The Athlete Journey</h4>
                  <p className="text-xs text-gym-gray-400 leading-relaxed italic">
                    "{s.story}"
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action CTA */}
      <section className="py-20 bg-gym-gray-900 border-t border-gym-gray-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black font-display text-white">WRITE YOUR OWN STORY</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base">
            No matter your starting fitness level, our structured guidance and premium community can take you to your goals. Let's design your blueprint today.
          </p>
          <div>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-gym-dark font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-all duration-300"
            >
              Begin Your Transformation
              <FiArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default TransformationStories;
