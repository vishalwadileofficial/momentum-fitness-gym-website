import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiClock, FiCalendar, FiBookOpen, FiUserCheck } from 'react-icons/fi';

const TrainerDashboard = () => {
  const trainerData = {
    name: 'Marcus Vance',
    role: 'Head Strength Coach',
    activeClients: 12,
    hoursCoached: 32,
  };

  const clientList = [
    { id: 1, name: 'Ethan Caldwell', goal: 'Powerlifting / Hypertrophy', lastSession: 'Yesterday, 17:00', status: 'On Track' },
    { id: 2, name: 'Sarah Miller', goal: 'Body Recomposition', lastSession: 'Today, 10:00', status: 'On Track' },
    { id: 3, name: 'David Laurent', goal: 'Athletic Conditioning', lastSession: 'June 30, 08:00', status: 'Rest Cycle' },
  ];

  const schedule = [
    { client: 'Marcus Chen', time: '18:00 Today', focus: 'Squat Heavy Day', zone: 'Strength Platform 1' },
    { client: 'Samantha Vance', time: '07:00 Tomorrow', focus: 'Unilateral Hip Work', zone: 'Performance Turf' },
  ];

  return (
    <>
      <Helmet>
        <title>Trainer Dashboard | Momentum Fitness Coaching</title>
        <meta name="description" content="Manage client workout lists, log session details, update macronutrients, and view schedules." />
      </Helmet>

      <div className="space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gym-gray-800 pb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black font-display text-white">COACHING INTERFACE</h1>
              <p className="text-xs text-gym-gray-400">Coach: {trainerData.name} ({trainerData.role})</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-black text-primary font-display">{trainerData.activeClients}</p>
                <p className="text-[10px] text-gym-gray-400 uppercase tracking-widest font-bold">Active Clients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-secondary font-display">{trainerData.hoursCoached}</p>
                <p className="text-[10px] text-gym-gray-400 uppercase tracking-widest font-bold">Hours This Week</p>
              </div>
            </div>
          </div>

          {/* Coach Schedule & Client Roster */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Active Clients */}
            <div className="lg:col-span-2 glass-card p-6 rounded-xl border border-gym-gray-800 space-y-6">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                <FiUsers className="text-primary" />
                Active Client Roster
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gym-gray-400">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-white tracking-wider border-b border-gym-gray-800 pb-2">
                      <th className="pb-3">Client Name</th>
                      <th className="pb-3">Training Goal</th>
                      <th className="pb-3">Last Session</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gym-gray-800/40">
                    {clientList.map((client) => (
                      <tr key={client.id} className="hover:bg-gym-gray-900/30 transition-colors">
                        <td className="py-3 font-semibold text-white">{client.name}</td>
                        <td className="py-3">{client.goal}</td>
                        <td className="py-3">{client.lastSession}</td>
                        <td className="py-3 text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                            {client.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Coach Calendar */}
            <div className="glass-card p-6 rounded-xl border border-gym-gray-800 space-y-6 h-fit">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                <FiCalendar className="text-secondary" />
                Coaching Schedule
              </h3>
              <div className="space-y-4">
                {schedule.map((sch, i) => (
                  <div key={i} className="p-4 bg-gym-gray-900 border border-gym-gray-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{sch.client}</span>
                      <span className="text-primary font-semibold">{sch.time}</span>
                    </div>
                    <p className="text-[11px] text-gym-gray-400">Focus: {sch.focus}</p>
                    <p className="text-[10px] text-gym-gray-500">Location: {sch.zone}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

      </div>
    </>
  );
};

export default TrainerDashboard;
