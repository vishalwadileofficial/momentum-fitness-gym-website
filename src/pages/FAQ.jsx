import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      category: 'general',
      question: 'What are the operating hours for Momentum Fitness?',
      answer: 'Our main gym floor is open 24/7 for active members. Staffed hours and reception desks are open from 06:00 to 22:00 Monday through Friday, and 08:00 to 20:00 on Saturdays and Sundays.',
    },
    {
      category: 'membership',
      question: 'How do I cancel my membership renewal?',
      answer: 'You can cancel your subscription with no penalty by going to the Member Dashboard under billing settings or submitting a request form to support. Please cancel at least 5 days prior to your billing date.',
    },
    {
      category: 'classes',
      question: 'Do I need to book group classes in advance?',
      answer: 'Yes. Due to structured capacity ceilings (to ensure proper trainer feedback), slots must be reserved. Bookings open 7 days prior to class start times via the member dashboard or mobile portal.',
    },
    {
      category: 'coaching',
      question: 'What is included in the initial fitness evaluation?',
      answer: 'The initial session includes a full body composition analysis, physical movement profiling to detect mobility blocks, and a basic compound movement instruction session to evaluate form.',
    },
    {
      category: 'general',
      question: 'Is parking available at the facility?',
      answer: 'Yes, we provide secure, complimentary multi-level parking for all members with active access cards, located directly behind the main entrance building.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Momentum Fitness Frequently Asked Questions</title>
        <meta name="description" content="Find answers to billing, class schedules, membership cancellations, 1-on-1 coaching details, and gym operating hours at Momentum Fitness." />
        <meta name="keywords" content="gym faq, support, membership cancel, gym hours, class booking faq" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Support Center</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">FREQUENTLY ASKED</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Quick answers regarding policies, group reservations, coaching models, and billing cycles.
          </p>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-xl border border-gym-gray-800 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full text-left p-6 flex justify-between items-center text-white hover:text-primary transition-colors focus:outline-none"
                  >
                    <span className="font-bold text-sm md:text-base font-display">{item.question}</span>
                    <span className="shrink-0 ml-4 p-1.5 rounded-full bg-gym-gray-800 border border-gym-gray-700 text-gym-gray-400">
                      {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-60 border-t border-gym-gray-800' : 'max-h-0'
                    }`}
                  >
                    <p className="p-6 text-xs md:text-sm text-gym-gray-400 leading-relaxed bg-gym-gray-950/40">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
