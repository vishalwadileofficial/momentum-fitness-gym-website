import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login | Momentum Fitness Portal</title>
        <meta name="description" content="Sign in to your Momentum Fitness member or coach portal to manage class schedules, track nutrition, and view your training log." />
        <meta name="keywords" content="gym login, member login, coach signin, athletic portal" />
      </Helmet>

      <section className="min-h-[85vh] flex items-center justify-center bg-gym-dark px-6 py-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md glass-card border border-gym-gray-800 rounded-2xl p-8 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-black font-display text-white tracking-wide">WELCOME BACK</h1>
            <p className="text-xs text-gym-gray-400">Enter your credentials to access the Momentum dashboard.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs uppercase font-bold text-gym-gray-400">Password</label>
                <a href="/forgot-password" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-wider">
                  Forgot Password?
                </a>
              </div>
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gym-gray-400 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary rounded bg-gym-gray-800 border-gym-gray-700" />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-gym-dark font-bold text-sm uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2"
            >
              Sign In to Account
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="border-t border-gym-gray-800 pt-6 text-center text-xs text-gym-gray-400">
            <span>Don't have a membership profile? </span>
            <a href="/register" className="text-primary hover:underline font-bold uppercase tracking-wider">
              Register Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
