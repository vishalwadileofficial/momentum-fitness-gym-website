import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FiTarget, 
  FiShield, 
  FiHeart, 
  FiTrendingUp, 
  FiAward, 
  FiCheck, 
  FiClock, 
  FiBookOpen, 
  FiActivity 
} from 'react-icons/fi';
import Container from '@/components/common/Container';
import SectionWrapper from '@/components/common/SectionWrapper';


const About = () => {
  // Timeline Data
  const timelineEvents = [
    {
      year: '2018',
      title: 'The Platform Project',
      desc: 'Momentum Fitness was founded in a 1,200 sq.ft warehouse with 3 barbell platforms, a single turf strip, and a commitment to raw sports science training.',
    },
    {
      year: '2020',
      title: 'Expansion & Hammer Strength Integration',
      desc: 'Relocated to a 10,000 sq.ft industrial space, integrating full Hammer Strength plate-loaded equipment lines and recruiting certified CSCS coaches.',
    },
    {
      year: '2022',
      title: 'Contrast Thermal Spa Launch',
      desc: 'Constructed our active recovery zone complete with custom cedar saunas, 4°C cold plunges, and compression areas to manage member systemic recovery.',
    },
    {
      year: '2024',
      title: 'Digital Ecosystem & Elite Affiliate',
      desc: 'Launched the integrated Member Portal tracking strength metrics, body composition mapping, and macro nutrients under sports dietitian consultation.',
    }
  ];

  // Achievements Data
  const achievements = [
    {
      metric: '100+',
      label: '220+ kg Squat Club',
      desc: 'Over a hundred active members have crossed the 220 kg (485 lbs) raw squat threshold under our training guidance.',
    },
    {
      metric: 'Top 3',
      label: 'Performance Facilities',
      desc: 'Voted as a top high-performance strength facility in the national athletic training directories.',
    },
    {
      metric: '15,000+',
      label: 'Body Scans Performed',
      desc: 'Accurate muscle mass and lipid balance assessments to drive scientific dietary corrections.',
    },
    {
      metric: '100%',
      label: 'CSCS & Degree Staff',
      desc: 'Every single strength coach holds an exercise science degree and active CSCS credentials.',
    }
  ];

  // Values Data
  const values = [
    {
      title: 'Science First',
      desc: 'We discard the fitness influencer trends. All programs are engineered based on proven mechanical tension, progressive overload, and energy pathways.',
    },
    {
      title: 'Integrity of Effort',
      desc: 'We do not sell membership cards to collect dust. We design our environment to get you through the door, moving heavy iron, and tracking actual output.',
    },
    {
      title: 'Zero Egos Allowed',
      desc: 'From competitive powerlifters pulling 700 lbs to beginners completing their first goblet squat, our floor is built on mutual support and hard work.',
    },
    {
      title: 'Long-Term Longevity',
      desc: 'True performance includes structural health. We weave mobility science, joint range mechanics, and cold recovery into regular program cycles.',
    }
  ];

  // Certifications Data
  const certifications = [
    { name: 'NSCA CSCS', desc: 'Certified Strength & Conditioning Specialists' },
    { name: 'USA Weightlifting', desc: 'USAW Level 1 & 2 Olympic Coaching' },
    { name: 'NASM PES', desc: 'Performance Enhancement Specialization' },
    { name: 'FRCms', desc: 'Functional Range Conditioning Mobility Specialists' },
    { name: 'ACSM EP-C', desc: 'Certified Exercise Physiologists' },
    { name: 'RD / LD', desc: 'Registered & Licensed Sports Dietitians' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Momentum Fitness Premium Strength Facility</title>
        <meta name="description" content="Discover the story, timeline, values, and elite coaching credentials of Momentum Fitness. Learn how we build premium performance environments." />
        <meta name="keywords" content="about momentum fitness, gym legacy, timeline, certified trainers, CSCS coaches, gym values" />
        <link rel="canonical" href="https://momentumfitness.in/about" />
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
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Legacy</span>
            <h1 className="text-4xl md:text-6xl font-black font-display text-white">THE MOMENTUM STRUCTURE</h1>
            <p className="text-gym-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Founded to eliminate corporate gym clutter, Momentum provides competition-grade platforms, scientific program structures, and verified athletic results.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 2. THE STORY */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Narrative */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Founding Principles</span>
              <h2 className="text-3xl md:text-5xl font-black font-display text-white leading-tight">
                WE DO NOT BELIEVE IN AVERAGE SUBSCRIPTION MODELS.
              </h2>
              <p className="text-gym-gray-400 leading-relaxed">
                Most commercial gyms design their layout to discourage attendance, hoping you sign a contract and never show up. We built Momentum with the opposite objective. We want you on our platform, lifting heavy loads, down-regulating stress in the recovery zone, and tracking body composition.
              </p>
              <p className="text-gym-gray-400 leading-relaxed">
                Every detail of our gym floor—from the type of shock-absorbing rubber beneath the platforms to the high-filtration water dispensers and custom carbon air filters—is chosen to support intense, repeatable athletic work.
              </p>
              <div className="pt-4 flex gap-4">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold text-white">No Sales Gimmicks</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold text-white">Calibrated Heavy Iron</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-primary w-5 h-5 shrink-0" />
                  <span className="text-sm font-semibold text-white">Dietetic Science</span>
                </div>
              </div>
            </motion.div>

            {/* Right Mission/Vision Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 grid grid-cols-1 gap-6"
            >
              <div className="glass-card p-6 rounded-xl border border-white/5 space-y-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <FiTarget className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-white">Our Mission</h3>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  To supply competition-grade machinery, certified sports-science coaching, and direct recovery systems that maximize athletic consistency and physical power.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl border border-white/5 space-y-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                  <FiTrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-white">Our Vision</h3>
                <p className="text-xs text-gym-gray-400 leading-relaxed">
                  To establish the gold standard for high-performance training centers globally, transforming casual gym-goers into highly capable, pain-free athletes.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 3. TIMELINE SECTION */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Progress Timeline</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white">MOMENTUM PROGRESSION</h2>
            <p className="text-gym-gray-400 text-sm">
              Our history is marked by expansion of equipment and science interfaces to support member results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  <span className="text-3xl font-black font-display text-primary block group-hover:scale-105 transition-transform duration-300">
                    {event.year}
                  </span>
                  <h4 className="font-bold text-white font-display text-base leading-snug">{event.title}</h4>
                  <p className="text-xs text-gym-gray-400 leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 4. ACHIEVEMENTS SECTION */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold">Our Numbers</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white">RECORDS & ACCOMPLISHMENTS</h2>
            <p className="text-gym-gray-400 text-sm">
              We track progress variables. Check out the collective statistics of our high-intensity training floor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, idx) => (
              <div 
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/5 text-center space-y-3"
              >
                <div className="text-4xl md:text-5xl font-black font-display text-primary">
                  {item.metric}
                </div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider">{item.label}</h4>
                <p className="text-xs text-gym-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 5. FACILITIES BREAKDOWN */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Facilities Detail</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white">THE PLATFORM BLUEPRINT</h2>
            <p className="text-gym-gray-400 text-sm">
              Clean layout, filtered air systems, and specialized training floors constructed for progressive loading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 group">
              <div className="h-60 rounded-xl bg-gym-gray-800 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none"></div>
                <FiActivity className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">The Heavy lifting platform</h3>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Stacked with 12 Eleiko custom power racks, calibrated weight sets, competitive barbells (weightlifting and powerlifting spec), and 2-inch high-density impact rubber platforms.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="h-60 rounded-xl bg-gym-gray-800 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-300 pointer-events-none"></div>
                <FiAward className="w-12 h-12 text-secondary animate-pulse" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Turf Conditioning strip</h3>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                30 meters of premium dense artificial grass strip with multi-angle prowler sleds, Rogue rowing stations, Assault fitness bikes, and dynamic heavy rope anchor points.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="h-60 rounded-xl bg-gym-gray-800 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none"></div>
                <FiHeart className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Active Recovery Zone</h3>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Includes dual high-filtration cold plunge tanks kept constant at 4°C, dry cedar saunas (85°C), and active compression recliners to flush metabolic waste and manage joints.
              </p>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* 6. CORE VALUES */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Mindset</span>
            <h2 className="text-3xl md:text-5xl font-black font-display text-white">THE MOMENTUM CODE</h2>
            <p className="text-gym-gray-400 text-sm">
              We live by a set of strict training standards that dictate how we coach, design plans, and maintain the facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx}
                className="glass-card p-8 rounded-2xl border border-white/5 flex gap-4 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold font-display shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold font-display text-white">{val.title}</h4>
                  <p className="text-xs text-gym-gray-400 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* 7. STAFF CERTIFICATIONS */}
      <SectionWrapper bg="gray" padding="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">Verified Expertise</span>
              <h2 className="text-3xl md:text-5xl font-black font-display text-white leading-tight">
                CERTIFIED ATHLETIC COACHING
              </h2>
              <p className="text-gym-gray-400 text-sm md:text-base leading-relaxed">
                We do not hire generic weekend-course personal trainers. Every coach on our gym floor undergoes scientific vetting and holds recognized exercise physiology certifications.
              </p>
              <p className="text-gym-gray-400 text-xs leading-relaxed">
                This guarantees your lifting cycles are programmed using precise fatigue monitoring, proper load progressions, and clean safety guidelines to prevent training injuries.
              </p>
            </div>

            {/* Right Certifications grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div 
                  key={idx}
                  className="glass-card p-5 rounded-xl border border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all duration-300"
                >
                  <h4 className="text-base font-bold text-white font-display uppercase tracking-wider">{cert.name}</h4>
                  <p className="text-[10px] text-gym-gray-400 mt-2 leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* FINAL CTA */}
      <section className="py-20 bg-gym-dark text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        <Container className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black font-display text-white">EXPERIENCE MOMENTUM IN PERSON</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Book a complimentary facility tour. We will show you our training zones, run a free InBody composition evaluation, and map out your initial strength targets.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-flex justify-center px-10 py-4 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-primary-dark transition-all duration-300"
            >
              Book Facility Walkthrough
            </a>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;
