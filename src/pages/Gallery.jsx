import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCamera, FiEye } from 'react-icons/fi';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const galleryItems = [
    {
      id: 1,
      category: 'training',
      title: 'Olympic Weightlifting Deck',
      details: 'Eleiko competition barbells and platform sets.',
    },
    {
      id: 2,
      category: 'recovery',
      title: 'Cedar Infrared Saunas',
      details: 'Maintained at 80°C for muscular repair.',
    },
    {
      id: 3,
      category: 'training',
      title: 'Assault Performance Turf',
      details: 'Weighted sled tracks, tire flips, kettlebells.',
    },
    {
      id: 4,
      category: 'social',
      title: 'Momentum Fuel Bar',
      details: 'Organic pre-workouts and custom macro shakes.',
    },
    {
      id: 5,
      category: 'recovery',
      title: 'Autonomic Cold Plunge Suite',
      details: 'Active water chilling technology at 4°C.',
    },
    {
      id: 6,
      category: 'training',
      title: 'Cardio Loft & Agility Zone',
      details: 'Assault runners, rowers, stair climbers.',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Gym Facility Gallery | Momentum Fitness Premium Studio</title>
        <meta name="description" content="Take a virtual walkthrough of Momentum Fitness. View photos of our olympic weightlifting zones, custom turf areas, cold plunges, and modern nutrition shake bar." />
        <meta name="keywords" content="gym photos, training facility, gym tour, workout images, premium gym amenities" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Virtual Tour</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">THE FACILITY GALLERY</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Take a look inside our high-performance facility. Modern lines, clean equipment, and an environment optimized for focus.
          </p>
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'training', 'recovery', 'social'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-gym-dark shadow-md'
                    : 'bg-gym-gray-800 text-gym-gray-400 hover:bg-gym-gray-700'
                }`}
              >
                {cat === 'all' ? 'All Spaces' : cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative h-80 rounded-2xl overflow-hidden border border-gym-gray-800 bg-gym-gray-900 flex flex-col justify-end p-6 hover:border-primary/45 transition-all duration-300"
              >
                {/* Fallback pattern inside image container */}
                <div className="absolute inset-0 bg-gradient-to-t from-gym-dark via-gym-dark/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gym-gray-950 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <FiCamera className="w-12 h-12 text-gym-gray-800 group-hover:text-primary/20 transition-colors" />
                </div>

                {/* Info Overlay */}
                <div className="relative z-20 space-y-2">
                  <span className="bg-primary/20 border border-primary/30 text-primary text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">{item.title}</h3>
                  <p className="text-xs text-gym-gray-400 leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
