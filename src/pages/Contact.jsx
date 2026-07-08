import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Momentum Fitness Location & Support</title>
        <meta name="description" content="Get in touch with the Momentum Fitness team. Find our address, phone numbers, reception hours, or send an email regarding membership packages." />
        <meta name="keywords" content="gym location, gym phone, gym email, contact momentum, support team" />
        <link rel="canonical" href="https://momentumfitness.in/contact" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Get In Touch</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">CONTACT MOMENTUM</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Have questions about our facility, membership tiers, or corporate wellness partnerships? Send a message to our support desk.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Details & Map */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Call Our Desk</h4>
                  <p className="text-xs text-gym-gray-400 font-medium">+1 (555) 769-0120</p>
                </div>

                <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-3">
                  <div className="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Send Email</h4>
                  <p className="text-xs text-gym-gray-400 font-medium">support@momentumfit.com</p>
                </div>

                <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Facility Location</h4>
                  <p className="text-xs text-gym-gray-400 font-medium">780 Performance Way, Austin, TX</p>
                </div>

                <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-3">
                  <div className="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Staff Hours</h4>
                  <p className="text-xs text-gym-gray-400 font-medium">06:00 - 22:00 (Mon - Sun)</p>
                </div>
              </div>

              {/* Mock Map */}
              <div className="h-64 rounded-2xl bg-gym-gray-900 border border-gym-gray-800 flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
                <FiMapPin className="w-10 h-10 text-primary animate-bounce" />
                <h5 className="font-bold text-white text-sm">Map View</h5>
                <p className="text-[11px] text-gym-gray-400">Momentum Athletic HQ Center</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card border border-gym-gray-800 p-8 rounded-2xl h-fit">
              <h3 className="text-xl font-bold font-display text-white mb-6 uppercase tracking-wider">Send Inquiry</h3>
              {submitted ? (
                <div className="p-6 bg-primary/10 border border-primary/20 text-primary text-xs rounded-xl text-center space-y-2">
                  <p className="font-bold">THANK YOU FOR REACHING OUT.</p>
                  <p className="text-gym-gray-400">Our support desk will review your details and contact you within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Chen"
                      className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@email.com"
                      className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Subject</label>
                    <select className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary">
                      <option>General Membership Inquiry</option>
                      <option>Personal Coaching Request</option>
                      <option>Corporate Partnership</option>
                      <option>Facility Tour Booking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Message Content</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Write your questions or feedback..."
                      className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-gym-dark font-bold text-sm uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
