import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiClock, FiCalendar, FiStar, FiBell } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import { getAssignedClients, getTrainerSchedule, getAnnouncements } from '@/services/firebase/db';

export default function TrainerOverview() {
  const { currentUser } = useAuth();
  const [activeClients, setActiveClients] = useState(12);
  const weeklyHours = 32;
  const [schedule, setSchedule] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const clientsList = await getAssignedClients(currentUser?.uid || 't1');
        setActiveClients(clientsList.length);

        const list = await getTrainerSchedule(currentUser?.uid || 't1');
        setSchedule(list.slice(0, 3));

        const anns = await getAnnouncements();
        const todayStr = new Date().toISOString().split('T')[0];
        setAnnouncements(anns.filter(a => !a.expirationDate || a.expirationDate >= todayStr));
      } catch {
        // Fallback data applied silently
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, [currentUser]);

  if (loading) return <SkeletonLoader.Grid count={4} />;

  const stats = [
    { label: 'Active Clients', value: `${activeClients}`, icon: <FiUsers />, trend: { value: '+2', isPositive: true }, colorType: 'primary' },
    { label: 'Weekly Coaching', value: `${weeklyHours} hrs`, icon: <FiClock />, trend: { value: '+4 hrs', isPositive: true }, colorType: 'secondary' },
    { label: 'Client Satisfaction', value: '4.95 / 5', icon: <FiStar />, description: 'Based on 48 reviews', colorType: 'pink' },
    { label: 'Daily Session Load', value: `${schedule.length} / 6`, icon: <FiCalendar />, description: 'Capacity details', colorType: 'primary' },
  ];

  const chartData = [
    { label: 'Mon', value: 4 },
    { label: 'Tue', value: 6 },
    { label: 'Wed', value: 8 },
    { label: 'Thu', value: 5 },
    { label: 'Fri', value: 7 },
    { label: 'Sat', value: 2 },
    { label: 'Sun', value: 0 }
  ];

  return (
    <>
      <Helmet>
        <title>Trainer Dashboard | Momentum Fitness Coaching</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">COACHING INTERFACE</h1>
          <p className="text-xs text-gym-gray-400">Welcome back. Manage clients, log workouts, and track progress.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => (
            <StatCard key={idx} {...st} />
          ))}
        </div>

        {announcements.length > 0 && (
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5 border-b border-gym-gray-800 pb-3 mb-4">
              <FiBell className="text-primary" /> Active Broadcast Notices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements.map((a) => (
                <div key={a.id} className="p-3 bg-gym-dark border border-gym-gray-855 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{a.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                      a.priority === 'Urgent' ? 'bg-red-500/10 text-red-400' : 'bg-gym-gray-850 text-gym-gray-400'
                    }`}>
                      {a.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-gym-gray-400 mt-1 leading-normal">{a.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DashboardChart 
              title="Coaching Hours Trend"
              subtitle="Weekly coached sessions distribution"
              totalValue="32 Hours"
              trend={{ value: '+12%', isPositive: true }}
              data={chartData}
              layout="line"
              colorType="secondary"
            />
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 bg-gym-gray-900/40">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
              <FiCalendar className="text-primary" />
              Today's Briefing
            </h3>
            <div className="space-y-4">
              {schedule.length === 0 ? (
                <EmptyState title="No Sessions Booked" message="No coaching sessions scheduled for today." icon="info" />
              ) : (
                schedule.map((sch, i) => (
                  <div key={i} className="p-4 bg-gym-gray-900 border border-gym-gray-800 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{sch.userName}</span>
                      <span className="text-primary font-semibold">{sch.time}</span>
                    </div>
                    <p className="text-[11px] text-gym-gray-400">Focus: {sch.focus}</p>
                    <p className="text-[10px] text-gym-gray-500">Status: {sch.status}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
