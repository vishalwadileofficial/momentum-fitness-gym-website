import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCalendar, FiTarget, FiActivity, FiSettings, FiCheckCircle } from 'react-icons/fi';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';

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

  const calorieData = [
    { label: 'Mon', value: 2750 },
    { label: 'Tue', value: 2820 },
    { label: 'Wed', value: 2790 },
    { label: 'Thu', value: 2810 },
    { label: 'Fri', value: 2850 },
    { label: 'Sat', value: 2720 },
    { label: 'Sun', value: 2800 },
  ];

  const memberActivities = [
    { id: 1, action: 'Logged dinner nutrition target', target: '680 kcal intake', timestamp: '30m ago', status: 'success', icon: <FiTarget className="text-primary" /> },
    { id: 2, action: 'Completed HIIT Strength Circuit', target: 'in 42 minutes', timestamp: '3h ago', status: 'success', icon: <FiActivity className="text-secondary" /> },
    { id: 3, action: 'Reserved Power & Barbell class', target: 'with Coach Marcus', timestamp: '5h ago', status: 'pending', icon: <FiCalendar className="text-accent-pink" /> },
  ];

  return (
    <>
      <Helmet>
        <title>Member Dashboard | Momentum Fitness</title>
        <meta name="description" content="View your personal workout programs, class bookings, dietary macros, and member settings." />
      </Helmet>

      <div className="space-y-8">
          
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
            <StatCard 
              label="Daily Energy Target"
              value={memberData.dietary.calories}
              icon={<FiTarget />}
              description={`P: ${memberData.dietary.protein} | C: ${memberData.dietary.carbs} | F: ${memberData.dietary.fats}`}
              colorType="primary"
            />

            <StatCard 
              label="Weekly Workouts Done"
              value="4 / 5 Sessions"
              icon={<FiActivity />}
              trend={{ value: "80% completed", isPositive: true }}
              colorType="secondary"
            />

            <StatCard 
              label="Access Key Code"
              value="QR ACTIVE"
              icon={<FiCheckCircle />}
              description="Scan at entrance scanner"
              colorType="pink"
            />
          </div>

          {/* Reserved Classes, Charts & Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Chart & Bookings */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Daily Energy Consumption Chart */}
              <DashboardChart 
                title="Weekly Energy Intake"
                subtitle="Calorie target intake log compared to daily threshold"
                totalValue="2,800 kcal"
                trend={{ value: "+2.4%", isPositive: true }}
                data={calorieData}
                layout="line"
                colorType="primary"
              />

              {/* Class Bookings */}
              <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 bg-gym-gray-900/60 backdrop-blur-md">
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
                        <button className="text-[10px] text-red-400 hover:underline uppercase font-bold mt-1 cursor-pointer">Cancel reservation</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Shortcuts & Activities */}
            <div className="space-y-8">
              
              {/* Shortcuts */}
              <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit bg-gym-gray-900/60 backdrop-blur-md">
                <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                  <FiSettings className="text-secondary" />
                  Portal Shortcuts
                </h3>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <a href="/programs" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                    <FiCheckCircle className="text-primary shrink-0" /> Reserve Classes
                  </a>
                  <a href="/bmi-calculator" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                    <FiCheckCircle className="text-primary shrink-0" /> Compute BMI Analysis
                  </a>
                  <a href="/nutrition" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                    <FiCheckCircle className="text-primary shrink-0" /> View Meal Blueprints
                  </a>
                </div>
              </div>

              {/* Live activity logs */}
              <ActivityFeed title="Recent Fitness Logs" activities={memberActivities} />
            </div>

          </div>

      </div>
    </>
  );
};

export default MemberDashboard;
