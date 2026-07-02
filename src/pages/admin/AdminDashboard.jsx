import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiTrendingUp, FiSettings, FiActivity, FiFolder, FiCheckCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const stats = [
    { label: 'Active Members', value: '14,820', icon: <FiUsers className="w-5 h-5 text-primary" />, change: '+4.2% MoM' },
    { label: 'Monthly Revenue', value: '$82,430', icon: <FiTrendingUp className="w-5 h-5 text-secondary" />, change: '+8.1% MoM' },
    { label: 'Staff Coaches', value: '42', icon: <FiActivity className="w-5 h-5 text-purple-400" />, change: '0 Change' },
    { label: 'Gym Floor Load', value: '45%', icon: <FiSettings className="w-5 h-5 text-yellow-400" />, change: 'Optimal' },
  ];

  const adminLogs = [
    { id: 1, action: 'Member Joined (Elite Plan)', user: 'James Foster', date: 'Just now' },
    { id: 2, action: 'Dietary Update Logged', user: 'Coach Sarah', date: '10 mins ago' },
    { id: 3, action: 'Equipment Maintenance Checked', user: 'Admin Desk', date: '1 hour ago' },
    { id: 4, action: 'VIP Plan Upgrade Completed', user: 'Sarah Miller', date: '3 hours ago' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Momentum Fitness Control</title>
        <meta name="description" content="Manage gym configurations, memberships, reports, and administrative logs." />
      </Helmet>

      <div className="min-h-screen bg-gym-dark pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gym-gray-800 pb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black font-display text-white">ADMIN COMMAND CENTER</h1>
              <p className="text-xs text-gym-gray-400">Manage operations, track memberships, and audit system events.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-gym-dark font-bold text-xs rounded uppercase tracking-wider hover:bg-primary-dark transition-all">
                Export Reports
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((st, idx) => (
              <div key={idx} className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gym-gray-400 uppercase tracking-wider">{st.label}</span>
                  <div className="w-9 h-9 rounded-lg bg-gym-gray-800 flex items-center justify-center border border-gym-gray-700">
                    {st.icon}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black font-display text-white">{st.value}</p>
                  <p className="text-[10px] text-primary font-bold">{st.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Logs Table */}
            <div className="lg:col-span-2 glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
                <FiActivity className="text-primary" />
                Live System Audit
              </h3>
              <div className="divide-y divide-gym-gray-800">
                {adminLogs.map((log) => (
                  <div key={log.id} className="py-3 flex justify-between items-center text-xs">
                    <div className="space-y-0.5">
                      <p className="font-bold text-white">{log.action}</p>
                      <p className="text-gym-gray-500">By: {log.user}</p>
                    </div>
                    <span className="text-gym-gray-400 text-[10px]">{log.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-4 h-fit">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
                <FiFolder className="text-secondary" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                <button className="w-full text-left p-3 rounded bg-gym-gray-800 border border-gym-gray-700 text-xs font-semibold text-gym-gray-300 hover:border-primary hover:text-white transition-all flex items-center gap-2">
                  <FiCheckCircle className="text-primary" /> Add New Member Profile
                </button>
                <button className="w-full text-left p-3 rounded bg-gym-gray-800 border border-gym-gray-700 text-xs font-semibold text-gym-gray-300 hover:border-primary hover:text-white transition-all flex items-center gap-2">
                  <FiCheckCircle className="text-primary" /> Create Gym Class Slot
                </button>
                <button className="w-full text-left p-3 rounded bg-gym-gray-800 border border-gym-gray-700 text-xs font-semibold text-gym-gray-300 hover:border-primary hover:text-white transition-all flex items-center gap-2">
                  <FiCheckCircle className="text-primary" /> Trigger Maintenance Alert
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
