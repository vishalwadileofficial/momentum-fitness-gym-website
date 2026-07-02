import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiUser, FiActivity, FiSettings, FiArrowRight } from 'react-icons/fi';

const Dashboard = () => {
  const portalLinks = [
    {
      title: 'Member Dashboard',
      desc: 'Access your workout plans, attendance logs, class reservations, and macro counts.',
      href: '/member-dashboard',
      tagColor: 'bg-primary/10 text-primary',
    },
    {
      title: 'Trainer Dashboard',
      desc: 'Manage your client schedules, session hours, nutrition feedbacks, and fitness logs.',
      href: '/trainer-dashboard',
      tagColor: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'Admin Dashboard',
      desc: 'Track overall gym capacity, membership statistics, system logs, and staff assignments.',
      href: '/admin-dashboard',
      tagColor: 'bg-purple-500/10 text-purple-400',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard Hub | Momentum Fitness</title>
        <meta name="description" content="Access the unified Momentum Fitness portal selector. Navigate to Member, Trainer, or Administrator environments." />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-20 bg-gym-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gym-gray-900 to-gym-dark pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Portal Selector</h1>
          <h2 className="text-4xl md:text-5xl font-black font-display text-white">DASHBOARD CENTER</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Welcome to the Momentum Fitness management portal. Select the interface below that matches your role.
          </p>
        </div>
      </section>

      {/* Selector Grid */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portalLinks.map((portal, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-gym-gray-800 flex flex-col justify-between hover:border-gym-gray-700 transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${portal.tagColor}`}>
                    Active Interface
                  </span>
                  <h3 className="text-lg font-bold text-white font-display leading-tight">{portal.title}</h3>
                  <p className="text-xs text-gym-gray-400 leading-relaxed">{portal.desc}</p>
                </div>

                <div className="mt-6">
                  <a
                    href={portal.href}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 bg-gym-gray-800 hover:bg-gym-gray-700 text-white font-bold text-xs uppercase tracking-wider rounded border border-gym-gray-700 transition-all duration-300"
                  >
                    Open Portal
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
