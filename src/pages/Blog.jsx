import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiClock, FiUser, FiSearch, FiBookOpen } from 'react-icons/fi';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      category: 'strength',
      title: 'Structural Hypertrophy: Building Block Cycles',
      summary: 'Explore structural periodization for muscle mass, outlining progressive volume and mechanical tension mechanics.',
      author: 'Marcus Vance',
      date: 'June 28, 2026',
      readTime: '6 min read',
    },
    {
      id: 2,
      category: 'nutrition',
      title: 'Unlocking Anabolic Windows: Pre & Post Workouts',
      summary: 'A science-backed guide to protein timing, carbohydrate loads, and optimal hydration parameters around high intensity training.',
      author: 'Dr. Evelyn Carter',
      date: 'June 22, 2026',
      readTime: '8 min read',
    },
    {
      id: 3,
      category: 'recovery',
      title: 'The Neural Impact of Cold Plunges',
      summary: 'How contrast therapy and cold exposures regulate heart rate variability (HRV), reduce soreness, and accelerate recovery.',
      author: 'Elena Rostova',
      date: 'June 18, 2026',
      readTime: '5 min read',
    },
    {
      id: 4,
      category: 'strength',
      title: 'Biomechanics of the Conventional Deadlift',
      summary: 'Correct your setup. Learn proper hip-hinge patterns, lat activation, and leg-drive physics to increase pull capabilities.',
      author: 'Dmitry Petrov',
      date: 'June 10, 2026',
      readTime: '10 min read',
    },
    {
      id: 5,
      category: 'nutrition',
      title: 'Navigating Micronutrient Deficiencies',
      summary: 'Understand how iron, magnesium, and vitamin D levels directly dictate muscle contraction efficiency and daily energy states.',
      author: 'Dr. Evelyn Carter',
      date: 'June 05, 2026',
      readTime: '7 min read',
    },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Fitness & Nutrition Blog | Momentum Articles</title>
        <meta name="description" content="Read expert articles on strength development, macro nutrition planning, active recovery, and sports science written by Momentum coaches." />
        <meta name="keywords" content="fitness blog, bodybuilding advice, macro nutrition articles, cold plunge research, training biomechanics" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Scientific Insights</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">THE PERFORMANCE BLOG</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Read regular articles covering biomechanics, nutrition strategies, and recovery science from our professional training staff.
          </p>
        </div>
      </section>

      {/* Main Blog Body */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'strength', 'nutrition', 'recovery'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-primary text-gym-dark shadow-md'
                    : 'bg-gym-gray-800 text-gym-gray-400 hover:bg-gym-gray-700'
                }`}
              >
                {cat === 'all' ? 'All Posts' : cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="glass-card rounded-2xl border border-gym-gray-800 p-8 flex flex-col justify-between hover:border-gym-gray-700 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      post.category === 'strength' ? 'bg-primary/10 text-primary' :
                      post.category === 'nutrition' ? 'bg-secondary/10 text-secondary' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-gym-gray-400">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white hover:text-primary transition-colors cursor-pointer leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gym-gray-400 text-xs leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="border-t border-gym-gray-800 mt-6 pt-4 flex items-center justify-between text-xs text-gym-gray-400">
                  <div className="flex items-center gap-1">
                    <FiUser className="w-3.5 h-3.5 text-primary" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
