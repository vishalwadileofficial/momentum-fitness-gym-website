import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCalendar, FiTarget, FiActivity, FiSettings, FiCheckCircle } from 'react-icons/fi';

const MemberDashboard = () => {
  const memberData = {
    name: 'Marcus Chen',
    plan: 'Elite Performance',
    id: 'MM-48201',
    dietary: { calories: '2,800 kcal', protein: '180g', carbs: '320g', fats: '80g' },
  };

  const reservations = [
    { class: 'Power & Barbell Club', trainer: 'Marcus Vance', date: 'Today, 18:00', room: 'Strength Zone 1' },
    { class: 'HIIT Performance Track', trainer: 'Sarah Rodriguez', date: 'Friday, 07:00', room: 'Athletic Turf' },
  ];

  return (
    <>
      <Helmet>
        <title>Member Dashboard | Momentum Fitness</title>
        <meta name="description" content="View your personal workout programs, class bookings, dietary macros, and member settings." />
      </Helmet>

      <div className="min-h-screen bg-gym-dark pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gym-gray-800 pb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black font-display text-white">ATHLETE PORTAL</h1>
              <p className="text-xs text-gym-gray-400">Welcome back, {memberData.name} ({memberData.id})</p>
            </div>
            <div className="flex items-center gap-3 bg-gym-gray-900 border border-gym-gray-800 px-4 py-2 rounded-xl">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">{memberData.plan} Plan Active</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-3">
              <div className="flex justify-between items-center text-xs text-gym-gray-400 uppercase font-bold tracking-wider">
                <span>Daily Energy Target</span>
                <FiTarget className="text-primary w-4.5 h-4.5" />
              </div>
              <p className="text-3xl font-black font-display text-white">{memberData.dietary.calories}</p>
              <div className="text-[10px] text-gym-gray-400">
                P: {memberData.dietary.protein} | C: {memberData.dietary.carbs} | F: {memberData.dietary.fats}
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-3">
              <div className="flex justify-between items-center text-xs text-gym-gray-400 uppercase font-bold tracking-wider">
                <span>Weekly Workouts Done</span>
                <FiActivity className="text-secondary w-4.5 h-4.5" />
              </div>
              <p className="text-3xl font-black font-display text-white">4 / 5 Sessions</p>
              <div className="w-full bg-gym-gray-800 h-2 rounded overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary h-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-3 flex flex-col justify-center text-center items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20">
                QR
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white mt-2">Access Key Code</span>
              <p className="text-[9px] text-gym-gray-500">Scan at entrance scanner</p>
            </div>
          </div>

          {/* Reserved Classes & Workout Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Class Bookings */}
            <div className="lg:col-span-2 glass-card p-6 rounded-xl border border-gym-gray-800 space-y-6">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                <FiCalendar className="text-primary" />
                Reserved Class Bookings
              </h3>
              <div className="space-y-4">
                {reservations.map((res, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gym-gray-900 border border-gym-gray-800 rounded-xl hover:border-gym-gray-700 transition-all">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-white">{res.class}</p>
                      <p className="text-xs text-gym-gray-400">Coach: {res.trainer} | Room: {res.room}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-primary font-bold block">{res.date}</span>
                      <button className="text-[10px] text-red-400 hover:underline uppercase font-bold mt-1">Cancel reservation</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Settings / Links */}
            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4 h-fit">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                <FiSettings className="text-secondary" />
                Portal Shortcuts
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <a href="/programs" className="p-3 bg-gym-gray-900 rounded border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                  <FiCheckCircle className="text-primary shrink-0" /> Reserve Classes
                </a>
                <a href="/bmi-calculator" className="p-3 bg-gym-gray-900 rounded border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                  <FiCheckCircle className="text-primary shrink-0" /> Compute BMI Analysis
                </a>
                <a href="/nutrition" className="p-3 bg-gym-gray-900 rounded border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                  <FiCheckCircle className="text-primary shrink-0" /> View Meal Blueprints
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default MemberDashboard;
