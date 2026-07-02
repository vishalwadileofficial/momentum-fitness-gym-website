import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Momentum Fitness Recovery</title>
        <meta name="description" content="Recover your password credentials for your Momentum Fitness member or trainer portal." />
        <meta name="keywords" content="password reset, recover account, gym login support" />
      </Helmet>

      <section className="min-h-[85vh] flex items-center justify-center bg-gym-dark px-6 py-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md glass-card border border-gym-gray-800 rounded-2xl p-8 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black font-display text-white tracking-wide">RESET PASSWORD</h1>
            <p className="text-xs text-gym-gray-400">Enter your registered email address to receive recovery instructions.</p>
          </div>

          {submitted ? (
            <div className="p-6 bg-primary/10 border border-primary/20 text-primary text-xs rounded-xl text-center space-y-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <FiCheck className="w-5 h-5" />
              </div>
              <p className="font-bold">RECOVERY EMAIL DISPATCHED</p>
              <p className="text-gym-gray-400">Please review your inbox (and spam folder) for dynamic instructions to configure your new password.</p>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-5">
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

              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-gym-dark font-bold text-sm uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300"
              >
                Send Reset Link
              </button>
            </form>
          )}

          <div className="border-t border-gym-gray-800 pt-6 text-center">
            <a href="/login" className="inline-flex items-center gap-2 text-xs text-gym-gray-400 hover:text-white font-bold uppercase tracking-wider transition-colors">
              <FiArrowLeft className="w-4 h-4" />
              Back to Sign In
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
