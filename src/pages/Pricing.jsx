import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiInfo, FiMail, FiPhone, FiLayers } from 'react-icons/fi';
import Container from '@/components/common/Container';
import SectionWrapper from '@/components/common/SectionWrapper';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const Pricing = () => {
  const [quoteDetails, setQuoteDetails] = useState({
    name: '',
    email: '',
    company: '',
    employeeCount: '10-50',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteDetails.name || !quoteDetails.email) return;
    setSubmitted(true);
  };

  const trainingPacks = [
    {
      name: 'Starter Package',
      sessions: '5 Private Sessions',
      price: 250,
      desc: 'Perfect for beginners needing guidance on basic barbell lifts and movement mechanics.',
      features: [
        '1-on-1 private coaching',
        'Initial movement assessment',
        'Custom homework workout template',
        'Basic nutritional goal setup',
      ],
    },
    {
      name: 'Athlete Development',
      sessions: '12 Private Sessions',
      price: 540,
      desc: 'Our most popular coaching block. Focuses on strength cycle progression and body re-composition.',
      features: [
        '1-on-1 private coaching',
        'Detailed bio-mechanical analysis',
        'Custom periodization templates',
        'Full custom sports nutrition meal plans',
        'Weekly body metrics scans',
      ],
      highlight: true,
    },
    {
      name: 'Championship Cycle',
      sessions: '24 Private Sessions',
      price: 960,
      desc: 'Bespoke athlete preparation for powerlifters, olympic weightlifters, or competitive sports.',
      features: [
        'All Athlete Development features',
        'Competition phase programming',
        'Direct coach video analysis access',
        'Post-workout recovery suite access',
        'Complimentary laundry & towel service',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Training Packages & Rates | Momentum Fitness</title>
        <meta name="description" content="Explore personal coaching blocks, drop-in session passes, and request corporate membership rates at Momentum Fitness." />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-28 bg-gym-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <Container className="relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Coaching Rates</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">TRAINING PACKAGES</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Invest in dedicated 1-on-1 coaching blocks, buy drop-in class passes, or request a custom quote for corporate wellness programs.
          </p>
        </Container>
      </section>

      {/* 1-on-1 Coaching Section */}
      <SectionWrapper bg="dark" padding="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold">1-on-1 Private Coaching</span>
            <h3 className="text-3xl font-black font-display text-white">PERSONAL TRAINING PACKS</h3>
            <p className="text-gym-gray-400 text-sm">
              Work 1-on-1 with our elite certified trainers. Session credits can be used flexibly over a 12-month period.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {trainingPacks.map((pack, idx) => (
              <div
                key={idx}
                className={`glass-card p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  pack.highlight ? 'border-primary shadow-[0_0_20px_rgba(204,255,0,0.1)]' : 'border-white/5'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold font-display text-white">{pack.name}</h4>
                      <span className="text-[10px] text-primary uppercase font-bold tracking-widest">{pack.sessions}</span>
                    </div>
                    {pack.highlight && <span className="bg-primary text-gym-dark text-[9px] font-bold px-2 py-0.5 rounded uppercase">Best Value</span>}
                  </div>
                  <p className="text-xs text-gym-gray-400 leading-relaxed">{pack.desc}</p>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black font-display text-white">${pack.price}</span>
                    <span className="text-gym-gray-500 text-xs font-semibold">USD</span>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-white/5">
                    {pack.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gym-gray-300">
                        <FiCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    variant={pack.highlight ? 'primary' : 'outline'}
                    className="w-full justify-center"
                    onClick={() => window.location.href = `/contact?subject=coaching&pack=${pack.name}`}
                  >
                    Purchase Package
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Class Pass Rates */}
      <SectionWrapper bg="gray" padding="default">
        <Container className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Class Pass Credits</span>
              <h3 className="text-3xl font-black font-display text-white">GROUP SESSIONS PASS</h3>
              <p className="text-gym-gray-400 text-sm leading-relaxed">
                Not ready for a monthly membership? Purchase single session drop-ins or multi-class packs to access our scheduled HIIT, Yoga, and mobility tracks.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-5 glass-card rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-widest block">Single Session</span>
                  <p className="text-2xl font-black text-white font-display">$15 <span className="text-xs text-gym-gray-500 font-semibold">USD</span></p>
                  <p className="text-[10px] text-gym-gray-500">Expires 30 days from purchase</p>
                </div>
                <div className="p-5 glass-card rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-widest block">10-Class Card</span>
                  <p className="text-2xl font-black text-primary font-display">$120 <span className="text-xs text-gym-gray-500 font-semibold">USD</span></p>
                  <p className="text-[10px] text-gym-gray-500">Expires 6 months from purchase</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-6">
              <h4 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <FiLayers className="text-primary" />
                CORPORATE RATE REQUEST
              </h4>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Provide wellness access for your company team. Enter details below to request a tailored corporate contract with custom billing.
              </p>

              {submitted ? (
                <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl text-center space-y-3">
                  <h5 className="font-bold text-primary text-sm uppercase">Request Logged</h5>
                  <p className="text-xs text-gym-gray-300">
                    Our corporate accounts desk will compile a quote and follow up within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <Input
                    label="Contact Name"
                    placeholder="e.g. John Doe"
                    required
                    value={quoteDetails.name}
                    onChange={(e) => setQuoteDetails({ ...quoteDetails, name: e.target.value })}
                  />
                  <Input
                    label="Work Email"
                    type="email"
                    placeholder="e.g. corporate@company.com"
                    required
                    value={quoteDetails.email}
                    onChange={(e) => setQuoteDetails({ ...quoteDetails, email: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Company Name"
                      placeholder="e.g. Acme Corp"
                      value={quoteDetails.company}
                      onChange={(e) => setQuoteDetails({ ...quoteDetails, company: e.target.value })}
                    />
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gym-gray-400">Team Size</label>
                      <select
                        className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                        value={quoteDetails.employeeCount}
                        onChange={(e) => setQuoteDetails({ ...quoteDetails, employeeCount: e.target.value })}
                      >
                        <option value="5-10">5 - 10 Employees</option>
                        <option value="10-50">10 - 50 Employees</option>
                        <option value="50-200">50 - 200 Employees</option>
                        <option value="200+">200+ Employees</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit" variant="primary" className="w-full justify-center text-xs py-3 mt-4">
                    Request Corporate Proposal
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default Pricing;
