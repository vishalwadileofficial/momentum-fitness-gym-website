import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiActivity, FiUser, FiZap, FiCheck, FiInfo } from 'react-icons/fi';
import Container from '@/components/common/Container';
import SectionWrapper from '@/components/common/SectionWrapper';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';

const Programs = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // 9 Required Programs
  const programsData = [
    {
      id: 'strength',
      category: 'Strength',
      title: 'Structural Strength Foundations',
      duration: '60 mins',
      difficulty: 'Beginner - Intermediate',
      trainer: 'Marcus Vance',
      description: 'Establish foundational compound mechanics. Focus on front squats, dumbbell rows, overhead presses, and core stability templates designed to construct a resilient lifting base.',
      benefits: ['Master compound lifting biomechanics', 'Increase active skeletal density', 'Develop foundational core bracing'],
      schedule: 'Mon / Wed at 08:00 & 17:00',
    },
    {
      id: 'weightloss',
      category: 'Weight Loss',
      title: 'Metabolic Fat Oxidation Split',
      duration: '50 mins',
      difficulty: 'All Levels',
      trainer: 'Sarah Rodriguez',
      description: 'Optimize lipid burning rates. This program combines high-intensity bodyweight intervals, light-load kettlebell complexes, and structural steady-state cardio splits.',
      benefits: ['Enhance resting metabolic rate', 'Support long-term fat oxidation', 'Improve baseline cardiovascular stamina'],
      schedule: 'Tue / Thu at 07:00 & 18:30',
    },
    {
      id: 'crossfit',
      category: 'CrossFit',
      title: 'CrossFit High-Intensity WODs',
      duration: '60 mins',
      difficulty: 'Intermediate - Advanced',
      trainer: 'Dmitry Petrov',
      description: 'High intensity functional fitness at its peak. Incorporates olympic barbell lifts, dynamic gymnastics movements, plyometrics, and metabolic conditioning in structured daily WODs.',
      benefits: ['Build explosive muscular power', 'Develop multi-planar movement versatility', 'Boost high-octane physical work capacity'],
      schedule: 'Mon / Wed / Fri at 06:00 & 19:00',
    },
    {
      id: 'hiit',
      category: 'HIIT',
      title: 'HIIT Metabolic Condition Track',
      duration: '45 mins',
      difficulty: 'All Levels',
      trainer: 'Sarah Rodriguez',
      description: 'High-intensity interval protocols utilizing air bikes, rowing machines, skiergs, and plyo blocks. Keep your heart rate inside peak oxygenation zones.',
      benefits: ['Maximize anaerobic threshold capacity', 'Accelerate muscular recovery speeds', 'Torch maximum calories in minimum time'],
      schedule: 'Daily at 07:30 & 12:00',
    },
    {
      id: 'yoga',
      category: 'Yoga',
      title: 'Vinyasa Flow & Kinetic Mobility',
      duration: '60 mins',
      difficulty: 'All Levels',
      trainer: 'Elena Rostova',
      description: 'Decompress neural pathways and build flexible joints. A dynamic flow of traditional yoga postures combined with target active stretching and joint mobility science.',
      benefits: ['Decompress spinal and neural tightness', 'Enhance joint range of motion (ROM)', 'Promote mental focus and deep recovery'],
      schedule: 'Tue / Thu at 09:00 & Sun at 10:00',
    },
    {
      id: 'cardio',
      category: 'Cardio',
      title: 'Cardiovascular Endurance Engine',
      duration: '60 mins',
      difficulty: 'All Levels',
      trainer: 'Cole Vance',
      description: 'Aerobic foundation work. Build your cardiovascular tank with structured runs, pacing intervals, assault bike progressions, and target heart-rate maintenance.',
      benefits: ['Lower resting resting heart rate', 'Expand systemic VO2 Max limits', 'Accelerate lactic acid clearance rates'],
      schedule: 'Wed / Fri at 08:30',
    },
    {
      id: 'powerlifting',
      category: 'Powerlifting',
      title: 'Elite Powerlifting Barbell Club',
      duration: '75 mins',
      difficulty: 'Advanced',
      trainer: 'Marcus Vance',
      description: 'For those aiming to master the Squat, Bench Press, and Deadlift. Focus on mechanical leverage, heavy loading templates, accessory hyper-trophy, and meet periodization.',
      benefits: ['Construct maximum compound loading capacity', 'Correct structural lifting leverage details', 'Program peak power competition blocks'],
      schedule: 'Mon / Thu / Sat at 18:00',
    },
    {
      id: 'bodybuilding',
      category: 'Bodybuilding',
      title: 'Target Hypertrophy & Aesthetic Split',
      duration: '60 mins',
      difficulty: 'Intermediate',
      trainer: 'Dmitry Petrov',
      description: 'Hypertrophy development using sports science volume guidelines. Focus on mechanical tension, muscle isolation angles, progressive volume tracks, and balanced growth.',
      benefits: ['Maximize lean skeletal muscle hypertrophy', 'Target specific muscular imbalances', 'Refine muscle shape and symmetry'],
      schedule: 'Tue / Fri at 16:30',
    },
    {
      id: 'functional',
      category: 'Functional Fitness',
      title: 'Multi-Planar Functional Longevity',
      duration: '50 mins',
      difficulty: 'All Levels',
      trainer: 'Elena Rostova',
      description: 'Train for real-world physical capability. Emphasizes core rotational stabilizers, single-leg load balance, kettlebell swings, and loaded carries to support daily longevity.',
      benefits: ['Build robust core rotational stabilizers', 'Promote clean multi-planar joint health', 'Improve functional balance and posture'],
      schedule: 'Mon / Wed at 10:00',
    }
  ];

  // Categories list
  const categories = ['all', 'Strength', 'Weight Loss', 'CrossFit', 'HIIT', 'Yoga', 'Cardio', 'Powerlifting', 'Bodybuilding', 'Functional Fitness'];

  const filteredPrograms = filter === 'all'
    ? programsData
    : programsData.filter(p => p.category === filter);

  const handleOpenDetail = (program) => {
    setSelectedProgram(program);
    setBookingSuccess(false);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setIsBookModalOpen(false);
      setSelectedProgram(null);
      setBookingSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Training Programs | Momentum Fitness Group Classes</title>
        <meta name="description" content="Discover our 9 engineered training programs: Strength, Weight Loss, CrossFit, HIIT, Yoga, Cardio, Powerlifting, Bodybuilding, and Functional Fitness. Book your slot." />
        <meta name="keywords" content="strength class, weight loss gym, crossfit, hiit program, yoga flow, powerlifting club, bodybuilding hypertrophy, functional fitness" />
        <link rel="canonical" href="https://momentumfitness.com/programs" />
      </Helmet>

      {/* 1. HERO HEADER */}
      <section className="relative py-28 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <Container className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Class Offerings</span>
            <h1 className="text-4xl md:text-6xl font-black font-display text-white">ENGINEERED PROGRAMS</h1>
            <p className="text-gym-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              We reject random sweat workouts. Our 9 core formats are systematically programmed to target specific physical adaptations: strength, conditioning, mobility, and muscular recovery.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 2. PROGRAM GRID SECTION */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          {/* Categories Horizontal Scroller / Filter bar */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? 'bg-primary text-gym-dark shadow-md'
                    : 'bg-gym-gray-800 text-gym-gray-400 hover:bg-gym-gray-700 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Formats' : cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog, idx) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              >
                <Card 
                  hoverable 
                  className="h-full flex flex-col justify-between p-8 border border-white/5 relative bg-gym-gray-900/40 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="space-y-5">
                    {/* Header line */}
                    <div className="flex justify-between items-center">
                      <span className="bg-primary/10 text-primary font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
                        {prog.category}
                      </span>
                      <span className="text-[10px] font-bold text-gym-gray-400 uppercase">{prog.difficulty}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-white group-hover:text-primary transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-gym-gray-400 leading-relaxed line-clamp-3">
                      {prog.description}
                    </p>

                    {/* Benefits previews */}
                    <ul className="space-y-1.5 pt-2">
                      {prog.benefits.slice(0, 2).map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2 text-[11px] text-gym-gray-300">
                          <FiCheck className="text-primary w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-6 flex flex-col gap-4">
                    <div className="flex justify-between text-xs text-gym-gray-400">
                      <span className="flex items-center gap-1"><FiClock /> {prog.duration}</span>
                      <span className="flex items-center gap-1 font-semibold text-white"><FiUser className="text-primary" /> {prog.trainer}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleOpenDetail(prog)}
                      className="w-full text-xs font-bold py-2 tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <FiInfo className="w-3.5 h-3.5" /> Details & Schedule
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. DYNAMIC CLASS BOOKING EXPLANATION */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="max-w-4xl mx-auto glass-card border border-white/5 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gym-gray-900/60">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Booking System</span>
              <h3 className="text-2xl md:text-3xl font-black font-display text-white">RESERVE PLATFORM SLOTS</h3>
              <p className="text-gym-gray-400 text-sm leading-relaxed">
                Active Standard, Premium, and Elite members can book recurring class positions. To prevent platform overcrowding, each session limits capacity to 10-15 participants maximum.
              </p>
              <ul className="space-y-2.5 text-xs text-gym-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Bookings open 7 days prior at 06:00
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Cancellations required 12 hours before start
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Standby waitlists active on all strength classes
                </li>
              </ul>
            </div>

            <div className="bg-gym-gray-950 p-6 rounded-xl border border-white/5 text-center space-y-4">
              <FiZap className="w-10 h-10 text-primary mx-auto animate-pulse" />
              <h4 className="font-bold text-white font-display uppercase tracking-wider text-sm">New Facility guest?</h4>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                You can request a single complimentary session pass to trial our Platforms, HIIT turf, and saunas.
              </p>
              <Button 
                variant="primary" 
                size="md"
                onClick={() => window.location.href = '/register'}
                className="w-full text-xs font-bold"
              >
                Claim Free Guest Pass
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. DETAILS & BOOKING MODAL */}
      <Modal
        isOpen={selectedProgram !== null}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.title}
        size="lg"
      >
        {selectedProgram && (
          <div className="space-y-6">
            {/* Meta Tags */}
            <div className="flex flex-wrap gap-4 items-center justify-between text-xs pb-4 border-b border-white/5">
              <div className="flex gap-2">
                <span className="bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded uppercase">
                  {selectedProgram.category}
                </span>
                <span className="bg-gym-gray-800 text-gym-gray-300 px-2.5 py-0.5 rounded">
                  {selectedProgram.difficulty}
                </span>
              </div>
              <div className="text-gym-gray-400 font-medium">
                Coach: <span className="text-white font-bold">{selectedProgram.trainer}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-gym-gray-400 font-bold">Program Blueprint</h4>
              <p className="text-sm text-gym-gray-300 leading-relaxed">
                {selectedProgram.description}
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-gym-gray-400 font-bold">Key Adaptations</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {selectedProgram.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-gym-gray-300">
                    <FiCheck className="text-primary w-4 h-4 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Class Duration & Schedule info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-gym-gray-950 border border-white/5 text-xs">
              <div className="space-y-1">
                <span className="text-gym-gray-400 block font-semibold uppercase tracking-wider text-[10px]">Session Duration</span>
                <span className="text-white font-bold text-sm flex items-center gap-1.5">
                  <FiClock className="text-primary" /> {selectedProgram.duration}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-gym-gray-400 block font-semibold uppercase tracking-wider text-[10px]">Scheduled Slots</span>
                <span className="text-white font-bold text-sm">
                  {selectedProgram.schedule}
                </span>
              </div>
            </div>

            {/* Class Reservation Trigger */}
            <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xs text-gym-gray-400 text-left max-w-sm">
                Need to change or cancel? Manage bookings from your member portal under class options.
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedProgram(null)}
                  className="w-full md:w-auto text-xs py-2 px-4"
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full md:w-auto text-xs py-2 px-6"
                >
                  Book Class Position
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* SECONDARY BOOKING CONFIRMATION MODAL */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Confirm Session Booking"
        size="md"
      >
        <form onSubmit={handleBookSubmit} className="space-y-6">
          <p className="text-xs text-gym-gray-300 leading-relaxed">
            You are reserving a slot for <strong className="text-white">{selectedProgram?.title}</strong> with <strong className="text-white">{selectedProgram?.trainer}</strong>. Please confirm your access details.
          </p>

          <div className="space-y-3 text-xs">
            <div className="space-y-1.5">
              <label className="text-gym-gray-400 font-bold uppercase tracking-wider block">Member ID Number</label>
              <input 
                type="text" 
                required 
                placeholder="MF-88291" 
                className="w-full p-3 rounded bg-gym-gray-800 border border-white/5 text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-gym-gray-400 font-bold uppercase tracking-wider block">Platform Preferred Date</label>
              <select className="w-full p-3 rounded bg-gym-gray-800 border border-white/5 text-white focus:outline-none focus:border-primary">
                <option>Next Available Scheduled Slot</option>
                <option>Following Scheduled Slot (+48h)</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {bookingSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-primary/10 border border-primary/20 text-primary font-bold text-xs text-center rounded"
              >
                Slot Reserved Successfully! Redirecting...
              </motion.div>
            ) : (
              <div className="flex justify-end gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsBookModalOpen(false)}
                  className="text-xs py-2 px-4"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  className="text-xs py-2 px-6"
                >
                  Confirm Reservation
                </Button>
              </div>
            )}
          </AnimatePresence>
        </form>
      </Modal>
    </>
  );
};

export default Programs;
