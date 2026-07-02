import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiShield, FiArrowLeft } from 'react-icons/fi';

const Unauthorized = () => {
  return (
    <>
      <Helmet>
        <title>Unauthorized Access | Momentum Fitness</title>
        <meta name="description" content="Access Restricted. You do not have permission to view this resource." />
      </Helmet>

      <section className="min-h-[80vh] flex items-center justify-center bg-gym-dark px-6 py-12 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <FiShield className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black font-display text-white">ACCESS RESTRICTED</h1>
            <p className="text-sm text-gym-gray-400">
              You do not have the required role permissions to access this specific dashboard environment.
            </p>
          </div>

          <div>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gym-gray-800 border border-gym-gray-700 text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-gym-gray-700 transition-all duration-300"
            >
              <FiArrowLeft className="w-4.5 h-4.5" />
              Return to Login
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Unauthorized;
