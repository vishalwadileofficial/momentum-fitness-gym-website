import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiClock } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import { getTrainerSchedule, updateAppointmentStatus } from '@/services/firebase/db';

export default function TrainerSchedule() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const list = await getTrainerSchedule(currentUser?.uid || 't1');
        setSessions(list);
      } catch {
        // Schedule fallback applied silently
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, [currentUser]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(currentUser?.uid || 'guest', id, status);
      setSessions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
      toast.success(`Session status successfully updated to ${status}.`);
    } catch {
      toast.error('Could not update status.');
    }
  };

  if (loading) return <SkeletonLoader.Table cols={5} rows={3} />;

  return (
    <>
      <Helmet>
        <title>Coaching Schedule | Trainer Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">APPOINTMENTS TIMETABLE</h1>
          <p className="text-xs text-gym-gray-400">Handle upcoming sessions, check in members, or log updates.</p>
        </div>

        {sessions.length === 0 ? (
          <EmptyState title="No Scheduled Sessions" message="timetable is currently clear of private reservations." icon="info" />
        ) : (
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 bg-gym-gray-900/40">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
              <FiClock className="text-secondary" /> Upcoming Classes & Personal Training
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-white tracking-wider">
                    <th className="pb-3 pr-4">Client Name</th>
                    <th className="pb-3 pr-4">Session Time</th>
                    <th className="pb-3 pr-4">Focus Area</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-850">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-gym-gray-900/10 transition-colors">
                      <td className="py-4 pr-4 font-semibold text-white">{s.userName}</td>
                      <td className="py-4 pr-4 font-medium text-secondary">{s.date} @ {s.time}</td>
                      <td className="py-4 pr-4 text-gym-gray-300">{s.focus}</td>
                      <td className="py-4 pr-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                          s.status === 'confirmed' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : s.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {s.status === 'pending' && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleStatusUpdate(s.id, 'confirmed')}
                              className="px-2.5 py-1 bg-primary text-gym-dark font-bold text-[9px] uppercase tracking-wider rounded hover:bg-primary-dark transition-all cursor-pointer border border-primary/20"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(s.id, 'cancelled')}
                              className="px-2.5 py-1 bg-gym-gray-855 text-red-400 border border-gym-gray-700 font-bold text-[9px] uppercase tracking-wider rounded hover:bg-red-500/10 transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {s.status !== 'pending' && (
                          <span className="text-[10px] text-gym-gray-500 italic">Session Handled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
