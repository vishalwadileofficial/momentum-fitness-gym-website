import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register | Momentum Fitness Membership</title>
        <meta name="description" content="Create your member profile at Momentum Fitness. Select your training plan, input your email, and prepare to begin your physical transformations." />
        <meta name="keywords" content="gym registration, gym signup, join gym, create fitness profile" />
      </Helmet>

      <section className="min-h-[90vh] flex items-center justify-center bg-gym-dark px-6 py-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-lg glass-card border border-gym-gray-800 rounded-2xl p-8 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-black font-display text-white tracking-wide">START YOUR BUILD</h1>
            <p className="text-xs text-gym-gray-400">Fill in the fields below to register your club credentials.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                <input
                  type="text"
                  required
                  placeholder="Marcus Chen"
                  className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="marcus@email.com"
                  className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Select Plan Tier</label>
              <select className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary">
                <option value="base">Base Club Plan ($49/mo)</option>
                <option value="elite" selected>Elite Performance Plan ($89/mo)</option>
                <option value="vip">VIP Athlete Plan ($199/mo)</option>
              </select>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-gym-gray-400 cursor-pointer select-none">
              <input type="checkbox" required className="accent-primary rounded bg-gym-gray-800 border-gym-gray-700 mt-0.5" />
              <span>I confirm I am over 18, and agree to the Terms of Service & Privacy Policy.</span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-gym-dark font-bold text-sm uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2"
            >
              Submit & Register
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="border-t border-gym-gray-800 pt-6 text-center text-xs text-gym-gray-400">
            <span>Already have an active account? </span>
            <a href="/login" className="text-primary hover:underline font-bold uppercase tracking-wider">
              Log In
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
