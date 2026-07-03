import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiInstagram, 
  FiMail, 
  FiAward, 
  FiStar, 
  FiClock, 
  FiCheck, 
  FiCalendar,
  FiBookOpen
} from 'react-icons/fi';
import Container from '@/components/common/Container';
import SectionWrapper from '@/components/common/SectionWrapper';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';

const Trainers = () => {
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    sessionType: '1-on-1 Strength Coaching',
    notes: ''
  });

  const trainersData = [
    {
      id: 1,
      name: 'Marcus Vance',
      role: 'Head Strength Coach',
      specialty: 'strength',
      specialtyLabel: 'Power & Barbell Training',
      experience: '12 Years',
      rating: '4.9',
      certs: ['CSCS *D (NSCA)', 'USAW Level 2 National Coach', 'B.S. Exercise Science'],
      bio: 'Marcus has coached national-level powerlifters and collegiate athletes for over a decade. He specializes in barbell biomechanics, corrective periodization, and raw physical structural power.',
      initials: 'MV',
      socials: { instagram: '#', email: 'marcus@momentumfitness.com' }
    },
    {
      id: 2,
      name: 'Sarah Rodriguez',
      role: 'Athletic Conditioning Lead',
      specialty: 'cardio',
      specialtyLabel: 'HIIT & Metabolic Conditioning',
      experience: '8 Years',
      rating: '5.0',
      certs: ['NASM-PES', 'CrossFit Level 2 (CF-L2)', 'FMS Level 1 Specialist'],
      bio: 'A former Division 1 track athlete, Sarah focuses on cardiovascular development, anaerobic metabolic threshold protocols, and high-intensity interval training grids to burn fat safely.',
      initials: 'SR',
      socials: { instagram: '#', email: 'sarah@momentumfitness.com' }
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Yoga & Mobility Coordinator',
      specialty: 'wellness',
      specialtyLabel: 'Active Recovery & Yoga',
      experience: '10 Years',
      rating: '4.8',
      certs: ['RYT-500 Certified Yoga Teacher', 'FRCms (Functional Range Mobility)'],
      bio: 'Elena bridges the gap between scientific athletic recovery and dynamic yoga flow. She programs routines to restore joint ranges of motion, deactivate stress pathways, and heal tissues.',
      initials: 'ER',
      socials: { instagram: '#', email: 'elena@momentumfitness.com' }
    },
    {
      id: 4,
      name: 'Dmitry Petrov',
      role: 'Olympic Weightlifting Coach',
      specialty: 'strength',
      specialtyLabel: 'Olympic Weightlifting',
      experience: '15 Years',
      rating: '4.9',
      certs: ['Master of Sport (Russia)', 'USAW National Weightlifting Coach'],
      bio: 'An international competitor in Olympic weightlifting, Dmitry focuses on clean and jerk technique phases, rapid snatch velocities, and overhead barbell lock-out mechanics.',
      initials: 'DP',
      socials: { instagram: '#', email: 'dmitry@momentumfitness.com' }
    },
    {
      id: 5,
      name: 'Cole Vance',
      role: 'MMA Conditioning Specialist',
      specialty: 'cardio',
      specialtyLabel: 'Striking & MMA Fitness',
      experience: '6 Years',
      rating: '4.9',
      certs: ['NASM-CPT', 'ISKA Kickboxing Certified Instructor'],
      bio: 'An active regional featherweight competitor, Cole designs high-energy conditioning circuits that blend boxing mitt drills, heavy bag combinations, and core rotational bracing.',
      initials: 'CV',
      socials: { instagram: '#', email: 'cole@momentumfitness.com' }
    },
    {
      id: 6,
      name: 'Dr. Evelyn Carter',
      role: 'Sports Dietitian & Nutritionist',
      specialty: 'wellness',
      specialtyLabel: 'Dietary Optimization & Macros',
      experience: '9 Years',
      rating: '5.0',
      certs: ['Registered Dietitian (RD)', 'Ph.D. Sports Nutrition Science'],
      bio: 'Evelyn manages metabolic pathways, body composition mapping, and custom hydration formulas. She matches dietary inputs precisely to training volume output.',
      initials: 'EC',
      socials: { instagram: '#', email: 'evelyn@momentumfitness.com' }
    }
  ];

  const filteredTrainers = specialtyFilter === 'all'
    ? trainersData
    : trainersData.filter(t => t.specialty === specialtyFilter);

  const handleOpenBooking = (trainer) => {
    setSelectedTrainer(trainer);
    setBookingSuccess(false);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setSelectedTrainer(null);
      setBookingSuccess(false);
      setBookingDetails({
        date: '',
        time: '',
        sessionType: '1-on-1 Strength Coaching',
        notes: ''
      });
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Our Trainers | Momentum Fitness Coaching Team</title>
        <meta name="description" content="Meet the certified personal trainers and strength coaches at Momentum. Schedule 1-on-1 sessions for powerlifting, HIIT conditioning, recovery, or sports nutrition." />
        <meta name="keywords" content="strength coach, certified trainer, personal training, powerlifting coach, sports dietitian, fitness instructor" />
        <link rel="canonical" href="https://momentumfitness.com/trainers" />
      </Helmet>

      {/* 1. HERO HEADER */}
      <section className="relative py-28 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <Container className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Elite Staff</span>
            <h1 className="text-4xl md:text-6xl font-black font-display text-white">THE COACHING ROSTER</h1>
            <p className="text-gym-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              We employ zero "rep counters." Every coach on the Momentum floor is fully credentialed, scientifically grounded, and active in competitive athletic disciplines.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 2. TRAINERS GRID SECTION */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          {/* Specialty Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { id: 'all', label: 'All Specialties' },
              { id: 'strength', label: 'Strength & Power' },
              { id: 'cardio', label: 'Conditioning & HIIT' },
              { id: 'wellness', label: 'Mobility & Nutrition' }
            ].map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSpecialtyFilter(spec.id)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  specialtyFilter === spec.id
                    ? 'bg-primary text-gym-dark shadow-md'
                    : 'bg-gym-gray-800 text-gym-gray-400 hover:bg-gym-gray-700 hover:text-white'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer, idx) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              >
                <Card className="h-full flex flex-col justify-between p-8 border border-white/5 relative bg-gym-gray-900/40 hover:border-primary/20 transition-all duration-300">
                  <div className="space-y-6">
                    {/* Header: Photo Placeholder & Rating badge */}
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-full bg-gym-gray-800 border border-white/5 flex items-center justify-center font-bold text-xl font-display text-primary shadow-inner">
                        {trainer.initials}
                      </div>
                      <div className="flex items-center gap-1 bg-gym-gray-800/80 border border-white/5 px-2.5 py-1 rounded text-xs text-amber-400 font-bold">
                        <FiStar className="fill-amber-400" />
                        <span>{trainer.rating}</span>
                      </div>
                    </div>

                    {/* Trainer Identity */}
                    <div>
                      <h3 className="text-xl font-bold font-display text-white">{trainer.name}</h3>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-0.5">{trainer.role}</p>
                      <p className="text-[10px] text-gym-gray-400 mt-1 font-medium">Experience: <strong className="text-white">{trainer.experience}</strong></p>
                    </div>

                    {/* Biography */}
                    <p className="text-xs text-gym-gray-400 leading-relaxed min-h-[64px]">
                      {trainer.bio}
                    </p>

                    {/* Credentials List */}
                    <div className="space-y-2 pt-4 border-t border-white/5">
                      <span className="text-[10px] uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
                        <FiAward className="text-primary" /> Credentials
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {trainer.certs.map((c, cIdx) => (
                          <span key={cIdx} className="text-[9px] bg-gym-gray-950 text-gym-gray-300 px-2 py-0.5 rounded border border-white/5">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Social Links */}
                  <div className="border-t border-white/5 mt-6 pt-6 flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      <a 
                        href={`mailto:${trainer.socials.email}`} 
                        className="p-2 rounded bg-gym-gray-800 border border-white/5 text-gym-gray-400 hover:text-white hover:border-primary/20 transition-all"
                        aria-label="Email coach"
                      >
                        <FiMail className="w-4 h-4" />
                      </a>
                      <a 
                        href={trainer.socials.instagram} 
                        className="p-2 rounded bg-gym-gray-800 border border-white/5 text-gym-gray-400 hover:text-white hover:border-primary/20 transition-all"
                        aria-label="Instagram coach"
                      >
                        <FiInstagram className="w-4 h-4" />
                      </a>
                    </div>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => handleOpenBooking(trainer)}
                      className="text-xs font-bold py-2 tracking-wider"
                    >
                      Book Session
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. DYNAMIC BOOKING MODAL */}
      <Modal
        isOpen={selectedTrainer !== null}
        onClose={() => setSelectedTrainer(null)}
        title={`Book Session: ${selectedTrainer?.name}`}
        size="md"
      >
        {selectedTrainer && (
          <form onSubmit={handleBookSubmit} className="space-y-6">
            <p className="text-xs text-gym-gray-400 leading-relaxed">
              Schedule a 1-on-1 performance consultation or active training slot. Selected trainer will confirm availability within 12 hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-gym-gray-400 font-bold uppercase tracking-wider block">Target Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    required 
                    value={bookingDetails.date}
                    onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                    className="w-full p-3 rounded bg-gym-gray-800 border border-white/5 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-gym-gray-400 font-bold uppercase tracking-wider block">Target Time Slot</label>
                <input 
                  type="time" 
                  required 
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                  className="w-full p-3 rounded bg-gym-gray-800 border border-white/5 text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Session Type */}
            <div className="space-y-1.5 text-xs">
              <label className="text-gym-gray-400 font-bold uppercase tracking-wider block">Coaching Discipline</label>
              <select 
                value={bookingDetails.sessionType}
                onChange={(e) => setBookingDetails({...bookingDetails, sessionType: e.target.value})}
                className="w-full p-3 rounded bg-gym-gray-800 border border-white/5 text-white focus:outline-none focus:border-primary"
              >
                <option value="1-on-1 Strength Coaching">1-on-1 Strength Coaching</option>
                <option value="Metabolic Conditioning Split">Metabolic Conditioning Split</option>
                <option value="Active Range Mobility Work">Active Range Mobility Work</option>
                <option value="Dietary Intake Consultation">Dietary Intake Consultation</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5 text-xs">
              <label className="text-gym-gray-400 font-bold uppercase tracking-wider block">Injuries / Goals (Brief)</label>
              <textarea 
                rows="3"
                value={bookingDetails.notes}
                onChange={(e) => setBookingDetails({...bookingDetails, notes: e.target.value})}
                placeholder="List any physical blocks, spinal tightness, or specific load targets..."
                className="w-full p-3 rounded bg-gym-gray-800 border border-white/5 text-white focus:outline-none focus:border-primary text-xs"
              />
            </div>

            {/* Feedback / Success alerts */}
            <AnimatePresence>
              {bookingSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-primary/10 border border-primary/20 text-primary font-bold text-xs text-center rounded"
                >
                  Request Logged! Coach will email confirmation.
                </motion.div>
              ) : (
                <div className="flex justify-end gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedTrainer(null)}
                    className="text-xs py-2 px-4"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="text-xs py-2 px-6"
                  >
                    Request Coaching Slot
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </form>
        )}
      </Modal>
    </>
  );
};

export default Trainers;
