import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheck, 
  FiAward, 
  FiHeart, 
  FiTrendingUp, 
  FiPlus, 
  FiMinus, 
  FiClock, 
  FiUser, 
  FiStar, 
  FiShield, 
  FiZap,
  FiActivity
} from 'react-icons/fi';
import Container from '@/components/common/Container';
import SectionWrapper from '@/components/common/SectionWrapper';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const Home = () => {
  // 1. Billing Cycle Toggle
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  // 2. BMI Calculator State
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);

  // 3. FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Calculate BMI
  const bmiScore = (weight / ((height / 100) ** 2)).toFixed(1);
  
  let bmiCategory;
  let bmiAdvice;
  let bmiColor;
  let bmiPercentage;

  const numericBmi = parseFloat(bmiScore);
  if (numericBmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiAdvice = 'Focus on muscle hypertrophy and positive energy balance. We recommend our Strength & Power program with a protein-heavy macro plan.';
    bmiColor = 'text-sky-400';
    bmiPercentage = Math.max(10, ((numericBmi - 10) / (18.5 - 10)) * 30);
  } else if (numericBmi >= 18.5 && numericBmi < 25) {
    bmiCategory = 'Normal Weight';
    bmiAdvice = 'Optimal metabolic balance! Maintain your physical condition. Engage in our HIIT Performance Track and Olympic weightlifting protocols.';
    bmiColor = 'text-primary';
    bmiPercentage = 30 + ((numericBmi - 18.5) / (25 - 18.5)) * 35;
  } else if (numericBmi >= 25 && numericBmi < 30) {
    bmiCategory = 'Overweight';
    bmiAdvice = 'Enhance lipid oxidation and lean body mass. We recommend integrating 3-4 HIIT sessions per week coupled with a controlled deficit.';
    bmiColor = 'text-amber-400';
    bmiPercentage = 65 + ((numericBmi - 25) / (30 - 25)) * 20;
  } else {
    bmiCategory = 'Obese';
    bmiAdvice = 'Prioritize joint-safe cardiovascular conditioning, progressive strength training, and guided nutritional modifications.';
    bmiColor = 'text-rose-500';
    bmiPercentage = Math.min(95, 85 + ((numericBmi - 30) / (40 - 30)) * 15);
  }

  // FAQ Data
  const faqs = [
    {
      question: 'What are the operating hours for Momentum Fitness?',
      answer: 'Our main gym floor is open 24/7 for active members. Staffed reception hours are 06:00 to 22:00 Monday-Friday, and 08:00 to 20:00 on Saturdays & Sundays.',
    },
    {
      question: 'Can I trial the facility before committing to a membership?',
      answer: 'Yes! We offer a complimentary 1-Day Guest Pass which includes full access to the strength yard, cardiovascular deck, and a brief body composition scan.',
    },
    {
      question: 'How does the class booking system work?',
      answer: 'Active members can reserve classes up to 7 days in advance via the Member Dashboard. Because we limit class size to ensure quality coaching, booking is highly recommended.',
    },
    {
      question: 'Is parking available at the gym?',
      answer: 'Absolutely. We provide secure, complimentary multi-level parking for all members with active access credentials, located directly behind the main entrance.',
    },
    {
      question: 'How do I cancel or freeze my membership?',
      answer: 'You can request a membership freeze (up to 3 months per year) or cancel your plan through the billing settings on your dashboard or by emailing support. Cancellations require a 5-day notice prior to the next billing cycle.',
    }
  ];

  // Membership Plans Data
  const plans = [
    {
      name: 'Basic',
      price: billingCycle === 'monthly' ? 29 : 24,
      desc: 'Access to general strength zones and premium machinery.',
      popular: false,
      features: ['General strength floor access', 'Standard locker rooms & showers', 'Complimentary High-speed WiFi', '1 free personal coaching assessment'],
    },
    {
      name: 'Standard',
      price: billingCycle === 'monthly' ? 49 : 39,
      desc: 'Perfect for regular lifters who want access to classes.',
      popular: false,
      features: ['All Basic tier benefits', '5 group training classes/month', 'Sauna and steam room access', '1 monthly body composition scan'],
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? 89 : 69,
      desc: 'Full athletic experience with unlimited group classes & recovery suite.',
      popular: true,
      features: ['All Standard tier benefits', 'Unlimited HIIT, Yoga & Strength classes', 'Full recovery suite (Cold plunges & saunas)', 'Weekly body composition scans', 'Premium nutrition templates'],
    },
    {
      name: 'Elite',
      price: billingCycle === 'monthly' ? 199 : 159,
      desc: 'Bespoke high-performance athlete packaging with private coaching.',
      popular: false,
      features: ['All Premium tier benefits', '4 private 1-on-1 coaching sessions/mo', 'Daily post-workout protein shake', 'Dietitian-designed bespoke meal plan', 'Gym apparel laundry service', '24/7 direct coach messaging access'],
    }
  ];

  return (
    <>
      <Helmet>
        <title>Momentum Fitness | Premium Gym & High-Performance Center</title>
        <meta name="description" content="Welcome to Momentum Fitness, the ultimate premium strength, performance, and wellness center. Access Eleiko gear, cold plunges, saunas, and certified coaching. Start today." />
        <meta name="keywords" content="gym, premium fitness, strength training, personal trainer, bodybuilding, cardio, nutrition, wellness, cold plunge, sauna" />
        <link rel="canonical" href="https://momentumfitness.com/" />
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-gym-dark pt-24 pb-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-7 text-left space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gym-gray-800 border border-gym-gray-700 text-xs font-semibold tracking-wider text-primary uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                The Ultimate high-performance facility
              </div>

              <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight leading-[1.05] text-white">
                DOMINATE <br />
                YOUR <span className="text-gradient-neon">LIMITS</span>
              </h1>

              <p className="text-gym-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
                Step onto a premium training floor engineered for athletes. Outfit with competition barbells, customized recovery suites, and sports science-grounded coaching.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  rightIcon={<FiArrowRight className="w-5 h-5" />}
                  onClick={() => window.location.href = '/membership'}
                >
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/programs'}
                >
                  Explore Programs
                </Button>
              </div>

              {/* Stat Badges under Hero CTA */}
              <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black font-display text-white">24/7</h4>
                  <p className="text-xs text-gym-gray-400 uppercase tracking-wider mt-1">Gym Floor Access</p>
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-black font-display text-primary">12+</h4>
                  <p className="text-xs text-gym-gray-400 uppercase tracking-wider mt-1">Olympic Racks</p>
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-black font-display text-secondary">4°C</h4>
                  <p className="text-xs text-gym-gray-400 uppercase tracking-wider mt-1">Active Cold Plunges</p>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive Image/Floating Card Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-2xl glass-card group">
                <div className="absolute inset-0 bg-gradient-to-t from-gym-dark via-transparent to-transparent z-10"></div>
                
                {/* Fallback Graphic */}
                <div className="absolute inset-0 bg-gym-gray-900 flex items-center justify-center">
                  <div className="text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary animate-pulse">
                      <FiActivity className="w-8 h-8" />
                    </div>
                    <p className="text-xl font-bold tracking-wide uppercase text-white font-display">Momentum Yard</p>
                    <p className="text-xs text-gym-gray-400">Hammer Strength & Eleiko Plates</p>
                  </div>
                </div>

                {/* Floating Performance Indicator Card */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute top-6 left-6 z-20 glass-card p-4 rounded-xl border border-white/10 flex items-center gap-3 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                    100%
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Scientific Method</h5>
                    <p className="text-[10px] text-gym-gray-400">Zero guess-work training</p>
                  </div>
                </motion.div>

                {/* Floating Member Stat Card */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 2, ease: 'easeInOut' }}
                  className="absolute bottom-32 right-6 z-20 glass-card p-4 rounded-xl border border-white/10 flex items-center gap-3 shadow-lg"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Live Gym Status</h5>
                    <p className="text-[10px] text-gym-gray-400">Optimal Training Floor Density</p>
                  </div>
                </motion.div>

                {/* Featured Bottom Details */}
                <div className="absolute bottom-6 left-6 right-6 z-20 glass-card p-5 rounded-xl border border-white/5">
                  <p className="text-xs uppercase tracking-wider text-primary font-bold">Daily Protocol</p>
                  <h3 className="text-lg font-bold text-white mt-1">Olympic Lifting Technique</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gym-gray-400 font-medium">Billed Daily at 18:30</span>
                    <Link to="/programs" className="text-primary hover:text-white text-xs font-bold inline-flex items-center gap-1 transition-colors">
                      Book Spot <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. WHY CHOOSE US */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Uncompromising Quality</h2>
              <h3 className="text-3xl md:text-5xl font-black font-display leading-tight text-white">
                WE DO NOT BUILD COMPROMISE. WE BUILD RESULTS.
              </h3>
              <p className="text-gym-gray-400 leading-relaxed">
                We stripped away the neon clutter, the salespeople, and the corporate gimmicks to compile the ultimate physical development infrastructure.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                    <FiShield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Competition-Grade Equipment</h4>
                    <p className="text-sm text-gym-gray-400 mt-1">
                      Our facility is stacked with calibrated Eleiko barbell plates, Hammer Strength weight stacks, and elite multi-angle racks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-1">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Elite Contrast Recovery Suite</h4>
                    <p className="text-sm text-gym-gray-400 mt-1">
                      Contrast thermal therapy zones. 4°C custom cold plunges, dry cedar saunas, and active myofascial compression spaces.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                    <FiHeart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Sports Science Certified Coaching</h4>
                    <p className="text-sm text-gym-gray-400 mt-1">
                      No generic personal training. Our coaches hold exercise science degrees and active CSCS certifications to engineer real adaptation cycles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Premium Layout Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 hover:border-primary/20 transition-all duration-300">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">Lifting Platform</span>
                <h4 className="text-lg font-bold font-display text-white">Eleiko Yard</h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  12 competition platforms, calibrated plates, needle-bearing bars, and rubber shock absorbing bases.
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 translate-y-6 hover:border-secondary/20 transition-all duration-300">
                <span className="text-xs uppercase tracking-wider text-secondary font-bold">Conditioning Turf</span>
                <h4 className="text-lg font-bold font-display text-white">Assault Track</h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  30m sled turf, weighted prowlers, assault bikes, premium rogue rowers, and dynamic climbing ropes.
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 hover:border-primary/20 transition-all duration-300">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">Contrast Therapy</span>
                <h4 className="text-lg font-bold font-display text-white">Cold Plunges</h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  Dual high-filtration plunges constant at 4°C to down-regulate nervous system states after high strain.
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 translate-y-6 hover:border-secondary/20 transition-all duration-300">
                <span className="text-xs uppercase tracking-wider text-secondary font-bold">Macro Nutrition</span>
                <h4 className="text-lg font-bold font-display text-white">Fuel Shake Bar</h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  Targeted protein isolates, hydration electrolytes, and bespoke post-workout macros blended to order.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. PROGRAMS PREVIEW */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-xl space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Target Training Formats</h2>
              <h3 className="text-3xl md:text-5xl font-black font-display text-white">ENGINEERED PROTOCOLS</h3>
              <p className="text-gym-gray-400">
                Whether your target is raw compound power, functional cardiovascular threshold, or active recovery, we run scheduled group classes with professional trainers.
              </p>
            </div>
            <Link to="/programs" className="inline-flex items-center gap-2 text-primary hover:text-white font-bold text-sm uppercase tracking-wider transition-colors mt-6 md:mt-0 group">
              View All 9 Programs <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hoverable className="h-full flex flex-col justify-between p-8 border border-white/5 relative group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FiAward className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold font-display text-white">Strength & Powerlifting</h4>
                <p className="text-sm text-gym-gray-400 leading-relaxed">
                  Compound mechanics, linear periodization templates, and accessory target hypertrophy. Billed for squat, bench, deadlift mastery.
                </p>
              </div>
              <div className="pt-8 flex items-center justify-between text-xs text-gym-gray-400 border-t border-white/5 mt-6">
                <span>60 Mins</span>
                <span className="text-primary font-semibold">Intermediate-Advanced</span>
              </div>
            </Card>

            <Card hoverable className="h-full flex flex-col justify-between p-8 border border-white/5 relative group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold font-display text-white">Athletic Conditioning (HIIT)</h4>
                <p className="text-sm text-gym-gray-400 leading-relaxed">
                  High output interval training leveraging assault tools, prowler tracks, and core stabilizers. Engineered to build high cardiovascular output.
                </p>
              </div>
              <div className="pt-8 flex items-center justify-between text-xs text-gym-gray-400 border-t border-white/5 mt-6">
                <span>45 Mins</span>
                <span className="text-secondary font-semibold">All Levels</span>
              </div>
            </Card>

            <Card hoverable className="h-full flex flex-col justify-between p-8 border border-white/5 relative group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FiHeart className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold font-display text-white">Holistic Mobility & Yoga</h4>
                <p className="text-sm text-gym-gray-400 leading-relaxed">
                  Nervous system down-regulation, kinetic alignment, structural range of motion progression, and deep myofascial recovery.
                </p>
              </div>
              <div className="pt-8 flex items-center justify-between text-xs text-gym-gray-400 border-t border-white/5 mt-6">
                <span>60 Mins</span>
                <span className="text-primary font-semibold">All Levels</span>
              </div>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. SUCCESS STATS */}
      <section className="bg-gym-gray-900 border-y border-white/5 py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-6xl font-black font-display text-primary">15k+</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2 font-semibold">Active Members</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-black font-display text-secondary">45+</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2 font-semibold">Certified Trainers</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-black font-display text-white">120+</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2 font-semibold">Weekly Classes</p>
            </div>
            <div>
              <p className="text-4xl md:text-6xl font-black font-display text-primary">99.2%</p>
              <p className="text-xs uppercase tracking-wider text-gym-gray-400 mt-2 font-semibold">Goal Achievement</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. INTERACTIVE BMI PREVIEW WIDGET */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Calculation Card */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Metrics Assessment</h2>
              <h3 className="text-3xl md:text-5xl font-black font-display text-white">CHECK YOUR HEALTH METRIC</h3>
              <p className="text-gym-gray-400 text-sm md:text-base leading-relaxed">
                Body Mass Index (BMI) is a reliable starting metric to evaluate weight relative to height. Move the sliders below to calculate your score and receive a recommendation from our training desk.
              </p>

              <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-8">
                {/* Height Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Height</span>
                    <span className="text-primary font-bold font-display text-base">{height} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="120" 
                    max="220" 
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full accent-primary bg-gym-gray-800 rounded-lg cursor-pointer h-2" 
                  />
                </div>

                {/* Weight Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Weight</span>
                    <span className="text-primary font-bold font-display text-base">{weight} kg</span>
                  </div>
                  <input 
                    type="range" 
                    min="40" 
                    max="150" 
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full accent-primary bg-gym-gray-800 rounded-lg cursor-pointer h-2" 
                  />
                </div>
              </div>
            </div>

            {/* Results Presentation Card */}
            <div className="lg:col-span-6">
              <div className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[380px] bg-gym-gray-900/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="space-y-6">
                  <h4 className="text-xs uppercase tracking-wider text-gym-gray-400 font-bold">Calculated Assessment</h4>
                  
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl md:text-7xl font-black font-display ${bmiColor}`}>
                      {bmiScore}
                    </span>
                    <span className={`text-xl font-bold uppercase tracking-wider ${bmiColor}`}>
                      {bmiCategory}
                    </span>
                  </div>

                  {/* Visual Meter Bar */}
                  <div className="space-y-2">
                    <div className="h-2 bg-gym-gray-800 rounded-full relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${bmiPercentage}%` }}
                        transition={{ type: 'spring', stiffness: 80 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gym-gray-500 font-bold uppercase">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 space-y-4">
                  <p className="text-xs text-gym-gray-300 leading-relaxed italic">
                    "{bmiAdvice}"
                  </p>

                  <div className="flex gap-4">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => window.location.href = '/register'}
                      className="text-xs py-2 px-4"
                    >
                      Book Professional Assessment
                    </Button>
                    <Link 
                      to="/bmi-calculator" 
                      className="text-xs text-gym-gray-400 hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      Advanced Calculator <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 6. MEMBERSHIP PLANS PREVIEW */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Invest in Performance</h2>
            <h3 className="text-3xl md:text-5xl font-black font-display text-white">MEMBERSHIP PRICING</h3>
            <p className="text-gym-gray-400 text-sm">
              Select the tier that aligns with your weekly intensity and recovery requirements. Toggle to annual billing to secure 20% savings.
            </p>

            {/* Toggle Billing Cycle */}
            <div className="flex justify-center pt-4">
              <div className="bg-gym-gray-800 p-1.5 rounded-full border border-gym-gray-700 inline-flex items-center relative">
                <button 
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 relative z-10 ${billingCycle === 'monthly' ? 'text-gym-dark bg-primary' : 'text-gym-gray-400 hover:text-white'}`}
                >
                  Monthly Billed
                </button>
                <button 
                  onClick={() => setBillingCycle('annual')}
                  className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 relative z-10 ${billingCycle === 'annual' ? 'text-gym-dark bg-primary' : 'text-gym-gray-400 hover:text-white'}`}
                >
                  Annually Billed (Save 20%)
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`glass-card rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                  plan.popular 
                    ? 'border-primary shadow-[0_0_25px_rgba(204,255,0,0.1)] bg-gym-gray-900/90 scale-102 z-10' 
                    : 'border-white/5 bg-gym-gray-900/40 hover:border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-gym-dark font-bold text-[10px] tracking-widest uppercase text-center py-1">
                    Most Popular Tier
                  </div>
                )}
                
                <div className={`p-6 space-y-4 ${plan.popular ? 'pt-8' : 'pt-6'}`}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold font-display text-white">{plan.name}</h4>
                    {plan.popular ? <FiStar className="text-primary w-5 h-5" /> : <FiZap className="text-gym-gray-400 w-5 h-5" />}
                  </div>
                  <p className="text-xs text-gym-gray-400 min-h-[32px]">{plan.desc}</p>
                  
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-4xl font-black font-display text-white">${plan.price}</span>
                    <span className="text-gym-gray-500 text-xs">/ mo</span>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-white/5 text-xs">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gym-gray-300">
                        <FiCheck className="text-primary w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-gym-gray-950/40 border-t border-white/5">
                  <Link 
                    to={`/register?plan=${plan.name.toLowerCase()}`}
                    className={`w-full text-center inline-block py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-primary text-gym-dark hover:bg-primary-dark shadow-md' 
                        : 'bg-gym-gray-800 text-white hover:bg-gym-gray-700'
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 max-w-md mx-auto space-y-4">
            <p className="text-[10px] text-gym-gray-500 leading-relaxed">
              * Prices are shown in USD (or equivalent local currency depending on account region). Custom quotations are available for international corporate memberships.
            </p>
            <div className="pt-2">
              <Link to="/membership" className="text-gym-gray-400 hover:text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
                Compare Full Features Table <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 7. MEET TRAINERS PREVIEW */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-xl space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Elite Staffing</h2>
              <h3 className="text-3xl md:text-5xl font-black font-display text-white">THE PERFORMANCE ROSTER</h3>
              <p className="text-gym-gray-400 text-sm">
                Every Momentum staff coach maintains active sports science certifications, with years of physical training and competitive success behind them.
              </p>
            </div>
            <Link to="/trainers" className="inline-flex items-center gap-2 text-primary hover:text-white font-bold text-sm uppercase tracking-wider transition-colors mt-6 md:mt-0 group">
              View All 6 Coaches <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trainer 1 */}
            <Card className="p-8 border border-white/5 relative text-center flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-full bg-gym-gray-800 border-2 border-primary/20 mx-auto flex items-center justify-center text-primary font-bold font-display text-2xl">
                  MV
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display text-white">Marcus Vance</h4>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">Head Strength Coach</p>
                  <p className="text-[10px] text-gym-gray-400 mt-0.5">Specialization: Barbell Periodization</p>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400">
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <span className="text-white font-bold ml-1">4.9 / 5</span>
                </div>
                <p className="text-xs text-gym-gray-400 leading-relaxed min-h-[40px]">
                  "Tailored mechanics and structural periodization keys to break plateaus."
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                <Link 
                  to="/trainers"
                  className="w-full text-center inline-block py-2 bg-gym-gray-800 text-white hover:bg-gym-gray-700 font-bold text-xs uppercase tracking-wider rounded border border-white/5"
                >
                  Book Session
                </Link>
              </div>
            </Card>

            {/* Trainer 2 */}
            <Card className="p-8 border border-white/5 relative text-center flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-full bg-gym-gray-800 border-2 border-secondary/20 mx-auto flex items-center justify-center text-secondary font-bold font-display text-2xl">
                  SR
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display text-white">Sarah Rodriguez</h4>
                  <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-1">Conditioning Lead</p>
                  <p className="text-[10px] text-gym-gray-400 mt-0.5">Specialization: Aerobic Capacity</p>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400">
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <span className="text-white font-bold ml-1">5.0 / 5</span>
                </div>
                <p className="text-xs text-gym-gray-400 leading-relaxed min-h-[40px]">
                  "Anaerobic thresholds and dynamic VO2 max markers optimized structurally."
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                <Link 
                  to="/trainers"
                  className="w-full text-center inline-block py-2 bg-gym-gray-800 text-white hover:bg-gym-gray-700 font-bold text-xs uppercase tracking-wider rounded border border-white/5"
                >
                  Book Session
                </Link>
              </div>
            </Card>

            {/* Trainer 3 */}
            <Card className="p-8 border border-white/5 relative text-center flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-full bg-gym-gray-800 border-2 border-primary/20 mx-auto flex items-center justify-center text-primary font-bold font-display text-2xl">
                  ER
                </div>
                <div>
                  <h4 className="text-xl font-bold font-display text-white">Elena Rostova</h4>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">Recovery Coordinator</p>
                  <p className="text-[10px] text-gym-gray-400 mt-0.5">Specialization: Mobility Science</p>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400">
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <FiStar className="fill-amber-400" />
                  <span className="text-white font-bold ml-1">4.8 / 5</span>
                </div>
                <p className="text-xs text-gym-gray-400 leading-relaxed min-h-[40px]">
                  "Down-regulate structural neural fatigue and unlock kinetic ranges."
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                <Link 
                  to="/trainers"
                  className="w-full text-center inline-block py-2 bg-gym-gray-800 text-white hover:bg-gym-gray-700 font-bold text-xs uppercase tracking-wider rounded border border-white/5"
                >
                  Book Session
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      {/* 8. TRANSFORMATION STORIES PREVIEW */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Proven Adapters</h2>
            <h3 className="text-3xl md:text-5xl font-black font-display text-white">TRANSFORMATION METRICS</h3>
            <p className="text-gym-gray-400 text-sm">
              Success is recorded in statistics, load variables, and muscle mass markers. Check out genuine member improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold font-display text-white">Ethan Caldwell</h4>
                  <span className="text-primary font-bold text-xs bg-primary/10 px-2.5 py-1 rounded">6 Months</span>
                </div>
                <p className="text-xs text-gym-gray-400">Goal: Body Recomposition & Compound Power</p>
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 text-center">
                  <div>
                    <span className="block text-white font-bold text-sm">-12kg</span>
                    <span className="text-[10px] text-gym-gray-400">Fat Loss</span>
                  </div>
                  <div>
                    <span className="block text-primary font-bold text-sm">+4kg</span>
                    <span className="text-[10px] text-gym-gray-400">Muscle</span>
                  </div>
                  <div>
                    <span className="block text-secondary font-bold text-sm">+45kg</span>
                    <span className="text-[10px] text-gym-gray-400">Squat</span>
                  </div>
                </div>
                <p className="text-xs text-gym-gray-400 italic leading-relaxed pt-2">
                  "Marcus restructured my compound setup and macronutrient ratios. I dropped body fat in half while packing load onto my squat."
                </p>
              </div>
            </div>

            {/* Story 2 */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold font-display text-white">Samantha Vance</h4>
                  <span className="text-secondary font-bold text-xs bg-secondary/10 px-2.5 py-1 rounded">9 Months</span>
                </div>
                <p className="text-xs text-gym-gray-400">Goal: Athletic Conditioning & VO2 Max</p>
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 text-center">
                  <div>
                    <span className="block text-white font-bold text-sm">-8kg</span>
                    <span className="text-[10px] text-gym-gray-400">Fat Loss</span>
                  </div>
                  <div>
                    <span className="block text-primary font-bold text-sm">+18%</span>
                    <span className="text-[10px] text-gym-gray-400">VO2 Max</span>
                  </div>
                  <div>
                    <span className="block text-secondary font-bold text-sm">+30kg</span>
                    <span className="text-[10px] text-gym-gray-400">Deadlift</span>
                  </div>
                </div>
                <p className="text-xs text-gym-gray-400 italic leading-relaxed pt-2">
                  "Working with Sarah resolved my chronic runners knee and built kinetic joint stabilization. Put minutes off my personal best."
                </p>
              </div>
            </div>

            {/* Story 3 */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold font-display text-white">Liam Sterling</h4>
                  <span className="text-primary font-bold text-xs bg-primary/10 px-2.5 py-1 rounded">12 Months</span>
                </div>
                <p className="text-xs text-gym-gray-400">Goal: Hypertrophy & Active Longevity</p>
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 text-center">
                  <div>
                    <span className="block text-white font-bold text-sm">+7kg</span>
                    <span className="text-[10px] text-gym-gray-400">Lean Mass</span>
                  </div>
                  <div>
                    <span className="block text-primary font-bold text-sm">-6%</span>
                    <span className="text-[10px] text-gym-gray-400">Body Fat</span>
                  </div>
                  <div>
                    <span className="block text-secondary font-bold text-sm">+25kg</span>
                    <span className="text-[10px] text-gym-gray-400">Bench</span>
                  </div>
                </div>
                <p className="text-xs text-gym-gray-400 italic leading-relaxed pt-2">
                  "As a corporate executive, this training floor provided physical reset and structure. Dietitian planning optimized my recovery."
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/transformation-stories" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-primary-dark transition-all duration-300">
              Explore All Transformation Cases
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* 9. TESTIMONIALS */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-secondary font-bold">Member Feedback</h2>
            <h3 className="text-3xl md:text-5xl font-black font-display text-white">ATHLETE TESTIMONIALS</h3>
            <p className="text-gym-gray-400 text-sm">
              Read how Momentum reshapes training behaviors, physical results, and long-term health metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
              <p className="text-gym-gray-400 italic text-sm leading-relaxed">
                "Momentum is clean, focused, and completely optimized. Zero casual crowding, top-tier barbell plates, and an environment that demands hard work. The sauna is the best post-workout protocol."
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gym-gray-800 text-primary font-bold font-display flex items-center justify-center">
                  JK
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">James Kendrick</h5>
                  <p className="text-[10px] text-gym-gray-400">Competitive Powerlifter</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
              <p className="text-gym-gray-400 italic text-sm leading-relaxed">
                "I joined for the recovery options but stayed for the incredible coaching staff. The dietitian profile helped me solve chronic low energy issues and structural fat loss blocks within 90 days."
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gym-gray-800 text-secondary font-bold font-display flex items-center justify-center">
                  ML
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Michelle Lin</h5>
                  <p className="text-[10px] text-gym-gray-400">Triathlete</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
              <p className="text-gym-gray-400 italic text-sm leading-relaxed">
                "Finding a facility with 24/7 keycard access, clean layouts, specialized turf zones, and a cold plunge tub has saved my training consistency. Worth every dollar of the Premium tier."
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gym-gray-800 text-primary font-bold font-display flex items-center justify-center">
                  TH
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">Thomas Hales</h5>
                  <p className="text-[10px] text-gym-gray-400">Managing Director</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 10. LATEST BLOGS PREVIEW */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-xl space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Scientific Analysis</h2>
              <h3 className="text-3xl md:text-5xl font-black font-display text-white">THE SPORTS SCIENCE BLOG</h3>
              <p className="text-gym-gray-400 text-sm">
                Get biomechanical and nutrition analyses written by our certified training coaches.
              </p>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-white font-bold text-sm uppercase tracking-wider transition-colors mt-6 md:mt-0 group">
              View All Articles <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="glass-card rounded-2xl border border-white/5 p-6 flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">Strength</span>
                  <span>June 28, 2026</span>
                </div>
                <h4 className="text-lg font-bold font-display text-white hover:text-primary transition-colors cursor-pointer leading-snug">
                  <Link to="/blog">Structural Hypertrophy: Building Block Cycles</Link>
                </h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  Understand progressive mechanical tension, loading variables, and targeted periodization splits.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 mt-6 flex justify-between text-[10px] text-gym-gray-500 font-bold uppercase">
                <span>By Coach Marcus</span>
                <span>6 min read</span>
              </div>
            </article>

            <article className="glass-card rounded-2xl border border-white/5 p-6 flex flex-col justify-between hover:border-secondary/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">
                  <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded">Nutrition</span>
                  <span>June 22, 2026</span>
                </div>
                <h4 className="text-lg font-bold font-display text-white hover:text-primary transition-colors cursor-pointer leading-snug">
                  <Link to="/blog">Unlocking Anabolic Windows: Pre & Post Workouts</Link>
                </h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  A science-backed guide to amino timing, rapid glycogen replenishment, and hydration metrics.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 mt-6 flex justify-between text-[10px] text-gym-gray-500 font-bold uppercase">
                <span>By Dr. Evelyn</span>
                <span>8 min read</span>
              </div>
            </article>

            <article className="glass-card rounded-2xl border border-white/5 p-6 flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">Recovery</span>
                  <span>June 18, 2026</span>
                </div>
                <h4 className="text-lg font-bold font-display text-white hover:text-primary transition-colors cursor-pointer leading-snug">
                  <Link to="/blog">The Neural Impact of Cold Plunges</Link>
                </h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  How contrast thermal shocks accelerate nervous recovery and decrease structural soreness.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 mt-6 flex justify-between text-[10px] text-gym-gray-500 font-bold uppercase">
                <span>By Coach Elena</span>
                <span>5 min read</span>
              </div>
            </article>
          </div>
        </Container>
      </SectionWrapper>

      {/* 11. FAQ ACCORDION */}
      <SectionWrapper bg="dark" padding="default">
        <Container className="max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Common Queries</h2>
            <h3 className="text-3xl md:text-5xl font-black font-display text-white">FREQUENTLY ASKED</h3>
            <p className="text-gym-gray-400 text-sm">
              Find quick answers regarding club access, billing structures, dynamic coaching models, and trial opportunities.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="glass-card rounded-xl border border-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center text-white hover:text-primary transition-colors font-display font-bold text-sm md:text-base"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1.5 rounded-full bg-gym-gray-800 border border-white/5 text-gym-gray-400">
                      {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <p className="px-6 pb-6 text-xs md:text-sm text-gym-gray-400 leading-relaxed bg-gym-gray-950/20 pt-1">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/faq" className="text-gym-gray-400 hover:text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
              Visit Full FAQ Page <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </SectionWrapper>

      {/* FINAL JOIN CTA */}
      <section className="py-24 bg-gym-gray-900 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        <Container className="relative z-10 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">READY TO STEP INTO MOMENTUM?</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-base md:text-lg">
            Stop putting your physical longevity on hold. Register online today and claim your customized macro evaluation.
          </p>
          <div className="pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => window.location.href = '/register'}
              rightIcon={<FiArrowRight className="w-5 h-5" />}
            >
              Sign Up Online Now
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
