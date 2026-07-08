import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { 
  FiUsers, FiClock, FiCalendar, FiBookOpen, FiUserCheck, 
  FiPlus, FiTrash2, FiEdit2, FiSave, FiCheckCircle, FiStar, 
  FiAward, FiBriefcase, FiActivity, FiBell, FiSearch
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import { 
  getTrainerSchedule, updateAppointmentStatus, getAssignedClients,
  getTrainerScheduleAvailability, updateTrainerScheduleAvailability,
  getAnnouncements
} from '@/services/firebase/db';

// --- SUB-COMPONENTS ---

function TrainerOverview() {
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

function TrainerClients() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newLog, setNewLog] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [progressInput, setProgressInput] = useState('');
  const [statusInput, setStatusInput] = useState('On Track');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadClients = async () => {
      try {
        const list = await getAssignedClients(currentUser?.uid || 't1');
        setClients(list);
        if (list.length > 0) {
          setSelectedClient(list[0]);
          setStatusInput(list[0].status || 'On Track');
          setGoalInput(list[0].goal || 'Compound Powerlifts');
          setProgressInput(list[0].progress || 'Squat: 140kg -> 150kg');
        }
      } catch {
        // Client data fallback applied silently
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, [currentUser]);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setStatusInput(client.status || 'On Track');
    setGoalInput(client.goal || 'Compound Powerlifts');
    setProgressInput(client.progress || 'Squat: 140kg -> 150kg');
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    if (!selectedClient) return;

    const newLogEntry = newLog.trim() 
      ? { date: new Date().toISOString().split('T')[0], text: newLog.trim() }
      : null;

    const updatedList = clients.map(c => {
      if (c.uid === selectedClient.uid) {
        const clientLogs = c.logs || [
          { date: '2026-07-03', text: 'Squat technique improved. Kept brace tight throughout.' }
        ];
        return {
          ...c,
          goal: goalInput,
          progress: progressInput,
          status: statusInput,
          logs: newLogEntry ? [newLogEntry, ...clientLogs] : clientLogs
        };
      }
      return c;
    });

    setClients(updatedList);
    const refreshed = updatedList.find(c => c.uid === selectedClient.uid);
    setSelectedClient(refreshed);
    setNewLog('');
    toast.success('Member metrics progress logs saved.');
  };

  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <SkeletonLoader.Table cols={4} rows={3} />;

  return (
    <>
      <Helmet>
        <title>Active Clients | Trainer Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">CLIENT ROSTER</h1>
          <p className="text-xs text-gym-gray-400">Track logs, program targets, goals, and update statuses.</p>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-3.5 text-gym-gray-500" />
          <input 
            type="text" 
            placeholder="Search by client name..." 
            className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-10 py-3 text-xs text-white focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No Clients Found" message="Try searching for another client or wait for desk assignments." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                <FiUsers className="text-primary" /> Members Directory
              </h3>
              <div className="space-y-2.5">
                {filtered.map(c => (
                  <button
                    key={c.uid}
                    onClick={() => handleSelectClient(c)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center cursor-pointer ${
                      selectedClient?.uid === c.uid
                        ? 'bg-primary/10 border-primary text-white'
                        : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-300 hover:border-gym-gray-700'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold">{c.name}</h4>
                      <p className="text-[9px] text-gym-gray-500 uppercase tracking-widest mt-1 font-bold">{c.plan}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      c.status === 'On Track' ? 'bg-primary/10 text-primary' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {c.status || 'Active'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedClient && (
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleUpdateClient} className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 bg-gym-gray-900/40">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-2">
                    <FiEdit2 className="text-secondary" /> File Summary: {selectedClient.name}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Workout Goal</label>
                      <input 
                        type="text" 
                        className="w-full bg-gym-dark border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Progress Milestone</label>
                      <input 
                        type="text" 
                        className="w-full bg-gym-dark border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                        value={progressInput}
                        onChange={(e) => setProgressInput(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Session Coaching Note</label>
                    <textarea 
                      className="w-full bg-gym-dark border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary h-20 resize-none"
                      placeholder="Add coaching recommendations, loading changes, or form corrections..."
                      value={newLog}
                      onChange={(e) => setNewLog(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gym-gray-500">Status:</span>
                      <select 
                        className="bg-gym-dark border border-gym-gray-800 rounded px-2 py-1 text-white text-[10px] uppercase font-bold focus:outline-none focus:border-primary"
                        value={statusInput}
                        onChange={(e) => setStatusInput(e.target.value)}
                      >
                        <option value="On Track">On Track</option>
                        <option value="Deload">Deload</option>
                        <option value="Rest Cycle">Rest Cycle</option>
                      </select>
                    </div>
                    <Button type="submit" variant="primary">Save Updates</Button>
                  </div>
                </form>

                <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4">
                  <h4 className="text-xs uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-2">Client Logs Archive</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {(selectedClient.logs || [
                      { date: '2026-07-03', text: 'Squat technique improved. Kept brace tight throughout.' },
                      { date: '2026-06-30', text: 'Completed 5x5 squats at 315 lbs. Reps clean.' }
                    ]).map((l, i) => (
                      <div key={i} className="p-3 bg-gym-gray-900 border border-gym-gray-855 rounded-xl space-y-1">
                        <span className="text-[9px] font-mono text-gym-gray-500 font-bold block">{l.date}</span>
                        <p className="text-xs text-gym-gray-300 leading-relaxed">{l.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function TrainerSchedule() {
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

function TrainerExercises() {
  const toast = useToast();
  const defaultExercises = [
    'Barbell Squat', 'Deadlift', 'Bench Press', 'Overhead Press', 
    'Barbell Row', 'Pull-Ups', 'Romanian Deadlift', 'Leg Press'
  ];

  const [savedWorkouts, setSavedWorkouts] = useState([
    {
      id: 1,
      name: 'Elite Power Push',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '5', rpe: '9', rest: '3 mins' }
      ]
    }
  ]);

  const [workoutName, setWorkoutName] = useState('');
  const [currentBuilderExercises, setCurrentBuilderExercises] = useState([]);
  const [selectedEx, setSelectedEx] = useState(defaultExercises[0]);
  const [setsInput, setSetsInput] = useState('3');
  const [repsInput, setRepsInput] = useState('10');
  const rpeInput = '8';
  const restInput = '90s';

  const handleAddToBuilder = () => {
    const newItem = {
      name: selectedEx,
      sets: setsInput,
      reps: repsInput,
      rpe: rpeInput,
      rest: restInput
    };
    setCurrentBuilderExercises([...currentBuilderExercises, newItem]);
    toast.success('Exercise added to local build template.');
  };

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!workoutName.trim() || currentBuilderExercises.length === 0) {
      toast.error('Complete workout name and add exercises first.');
      return;
    }
    const newWorkout = {
      id: Date.now(),
      name: workoutName.trim(),
      exercises: currentBuilderExercises
    };
    setSavedWorkouts([newWorkout, ...savedWorkouts]);
    setWorkoutName('');
    setCurrentBuilderExercises([]);
    toast.success('New template routine published.');
  };

  const handleDeleteSavedWorkout = (id) => {
    setSavedWorkouts(prev => prev.filter(w => w.id !== id));
    toast.success('Template routine deleted.');
  };

  return (
    <>
      <Helmet>
        <title>Workouts Builder | Trainer Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">WORKOUT BUILDER</h1>
          <p className="text-xs text-gym-gray-400">Compile target training templates and accessory routines.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit bg-gym-gray-900/40">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Exercise Selector</h3>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-gym-gray-400 uppercase font-bold text-[9px]">Select Movement</label>
                <select 
                  className="w-full bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-2 text-white focus:outline-none font-bold"
                  value={selectedEx} 
                  onChange={(e) => setSelectedEx(e.target.value)}
                >
                  {defaultExercises.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-gym-gray-400 uppercase font-bold text-[9px]">Sets</label>
                  <input type="text" className="w-full bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-1.5 text-white" value={setsInput} onChange={e => setSetsInput(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-gym-gray-400 uppercase font-bold text-[9px]">Reps</label>
                  <input type="text" className="w-full bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-1.5 text-white" value={repsInput} onChange={e => setRepsInput(e.target.value)} />
                </div>
              </div>

              <Button variant="outline" className="w-full justify-center" onClick={handleAddToBuilder}>Add to Workout Builder</Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleAddWorkout} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Active Builder List</h3>
              
              <Input
                label="Routine / Workout Name"
                placeholder="e.g. Quad Focus Hypertrophy"
                required
                value={workoutName}
                onChange={e => setWorkoutName(e.target.value)}
              />

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {currentBuilderExercises.map((ex, idx) => (
                  <div key={idx} className="p-3 bg-gym-dark border border-gym-gray-855 rounded-xl flex justify-between text-xs text-gym-gray-300">
                    <span className="font-bold text-white">{ex.name}</span>
                    <span>{ex.sets}x{ex.reps} &bull; RPE {ex.rpe}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2 border-t border-gym-gray-855">
                <Button type="submit" variant="primary">Publish Routine Template</Button>
              </div>
            </form>

            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4">
              <h4 className="text-xs uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-2">Active Roster Templates</h4>
              {savedWorkouts.length === 0 ? (
                <EmptyState title="No Routines Created" message="You have no saved templates routines catalogued." icon="info" />
              ) : (
                <div className="space-y-4">
                  {savedWorkouts.map((w) => (
                    <div key={w.id} className="p-4 bg-gym-dark border border-gym-gray-855 rounded-xl flex justify-between items-center">
                      <div>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider">{w.name}</h5>
                        <p className="text-[10px] text-gym-gray-400 mt-1">{w.exercises.length} Exercises catalogued</p>
                      </div>
                      <button className="text-gym-gray-500 hover:text-red-400 p-1 cursor-pointer transition-colors" onClick={() => handleDeleteSavedWorkout(w.id)}>
                        <FiTrash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TrainerProfile() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState({
    name: 'Marcus Vance',
    role: 'Head Strength Coach',
    bio: 'Dedicated to helping athletes unlock raw strength and mental grit. 10+ years coaching powerlifters, Olympic lifters.',
    experience: '12 Years',
    rating: '4.95',
    certifications: [
      'Certified Strength and Conditioning Specialist (CSCS)',
      'NASM Performance Enhancement Specialist (PES)'
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [roleInput, setRoleInput] = useState(profile.role);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [expInput, setExpInput] = useState(profile.experience);
  const [newCert, setNewCert] = useState('');

  const [workingDays, setWorkingDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const avail = await getTrainerScheduleAvailability(currentUser?.uid || 't1');
        if (avail) {
          setWorkingDays(avail.workingDays);
        }
      } catch {
        // Profile availability fallback applied silently
      }
    };
    loadProfile();
  }, [currentUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: nameInput,
      role: roleInput,
      bio: bioInput,
      experience: expInput
    });
    setIsEditing(false);
    toast.success('Trainer profile information saved.');
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      setProfile(prev => ({ ...prev, certifications: [...prev.certifications, newCert.trim()] }));
      setNewCert('');
      toast.success('Certification details updated.');
    }
  };

  const handleSaveAvail = async () => {
    try {
      await updateTrainerScheduleAvailability(currentUser?.uid || 't1', {
        workingDays,
        workingHours: '08:00 - 18:00',
        activeSlots: ['09:00', '10:30', '14:00', '16:00', '17:30']
      });
      toast.success('Trainer schedule availability saved.');
    } catch {
      toast.error('Availability save failed.');
    }
  };

  const toggleDay = (day) => {
    setWorkingDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <>
      <Helmet>
        <title>Trainer Profile | Coach Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">COACH PROFILE</h1>
          <p className="text-xs text-gym-gray-400">Modify your bio credentials, specialties, and schedule availability.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 h-fit bg-gym-gray-900/40">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Availability Calendar</h3>
            <div className="space-y-4 text-xs">
              <p className="text-gym-gray-400">Select active days where you are accepting client bookings:</p>
              <div className="flex flex-col gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
                  const active = workingDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2.5 rounded-xl border font-bold text-left cursor-pointer transition-all ${
                        active 
                          ? 'bg-primary border-primary text-gym-dark shadow-md' 
                          : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-400 hover:border-gym-gray-700'
                      }`}
                    >
                      {day} {active && ' (Active)'}
                    </button>
                  );
                })}
              </div>
              <Button variant="secondary" className="w-full justify-center" onClick={handleSaveAvail}>Save Availability</Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
              <div className="flex justify-between items-center border-b border-gym-gray-800 pb-3 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                  <FiAward className="text-primary" /> Profile Credentials
                </h3>
                <button className="text-gym-gray-500 hover:text-white transition-colors cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Name" value={nameInput} onChange={e => setNameInput(e.target.value)} />
                    <Input label="Experience" value={expInput} onChange={e => setExpInput(e.target.value)} />
                  </div>
                  <Input label="Role" value={roleInput} onChange={e => setRoleInput(e.target.value)} />
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Biography</label>
                    <textarea className="w-full bg-gym-dark border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary h-20 resize-none" value={bioInput} onChange={e => setBioInput(e.target.value)} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button type="submit" variant="primary">Save Changes</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-xs leading-relaxed text-gym-gray-300">
                  <p className="text-sm font-bold text-white">{profile.name} <span className="text-[10px] bg-gym-gray-800 text-gym-gray-400 px-2 py-0.5 rounded font-mono ml-2 font-medium">{profile.experience} Exp</span></p>
                  <p className="text-[10px] text-primary uppercase font-bold tracking-widest">{profile.role}</p>
                  <p className="text-gym-gray-400">"{profile.bio}"</p>
                </div>
              )}
            </div>

            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
              <h4 className="text-xs uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-2">Certifications</h4>
              <ul className="space-y-2 text-xs text-gym-gray-300">
                {profile.certifications.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FiCheckCircle className="text-primary w-4.5 h-4.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 pt-4 border-t border-gym-gray-850">
                <input 
                  type="text" 
                  className="flex-1 bg-gym-dark border border-gym-gray-855 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Master of Sport (IWF)" 
                  value={newCert} 
                  onChange={e => setNewCert(e.target.value)}
                />
                <button className="px-4 py-2 bg-gym-gray-850 hover:bg-gym-gray-800 border border-gym-gray-700 text-white font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-all" onClick={handleAddCert}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TrainerSettings() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('account');
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    pushAlerts: true,
    timezone: 'GMT (UTC+0)',
    theme: 'dark',
    accent: 'cyan',
    language: 'en'
  });

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isPending, setIsPending] = useState(false);

  const tabs = [
    { id: 'account', label: 'Security' },
    { id: 'notifications', label: 'Alerts' },
    { id: 'appearance', label: 'Theme' },
    { id: 'language', label: 'Locale' },
    { id: 'danger', label: 'Danger Zone' }
  ];

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Confirm password does not match.');
      return;
    }
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Security password credentials updated.');
    }, 500);
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast.success('Coaching system preferences updated.');
    }, 400);
  };

  const handleResetData = () => {
    localStorage.clear();
    toast.success('Cache cleared. Reloading portal...');
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {/* Sidebar Tabs */}
      <div className="lg:col-span-1 flex flex-col gap-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === t.id
                ? 'bg-primary text-gym-dark shadow-md font-black'
                : 'bg-gym-gray-900/40 hover:bg-gym-gray-800 text-gym-gray-400 hover:text-white border border-gym-gray-855/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Contents Panel */}
      <div className="lg:col-span-3 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 min-h-[350px] flex flex-col justify-between">
        
        {/* Account Credentials */}
        {activeTab === 'account' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Coaching Security Credentials</h3>
            <div className="space-y-4">
              <Input label="Current Password" type="password" required value={passwordForm.currentPassword} onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="New Password" type="password" required value={passwordForm.newPassword} onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
                <Input label="Confirm Password" type="password" required value={passwordForm.confirmPassword} onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-855">
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        )}

        {/* Alerts Checkboxes */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSavePreferences} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Alert Configurations</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.emailAlerts} onChange={e => setPreferences({ ...preferences, emailAlerts: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Email notice on client booking requests</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.pushAlerts} onChange={e => setPreferences({ ...preferences, pushAlerts: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Push notice ping on client cancellations</span>
              </label>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button type="submit" variant="primary" disabled={isPending}>Save Preferences</Button>
            </div>
          </form>
        )}

        {/* Theme Preferences */}
        {activeTab === 'appearance' && (
          <form onSubmit={handleSavePreferences} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Visual Theme</h3>
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">System Style</label>
                <select className="bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-white focus:outline-none w-full font-bold" value={preferences.theme} onChange={e => setPreferences({ ...preferences, theme: e.target.value })}>
                  <option value="dark">Dark Luxury (Default)</option>
                  <option value="light">High Contrast Light</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Accent Color</label>
                <select className="bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-white focus:outline-none w-full font-bold" value={preferences.accent} onChange={e => setPreferences({ ...preferences, accent: e.target.value })}>
                  <option value="cyan">Electric Cyan</option>
                  <option value="neon-lime">Neon Lime</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button type="submit" variant="primary" disabled={isPending}>Save Theme</Button>
            </div>
          </form>
        )}

        {/* Language Placeholder */}
        {activeTab === 'language' && (
          <form onSubmit={handleSavePreferences} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Language Selection</h3>
            <div className="space-y-4 text-xs">
              <select className="bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-white focus:outline-none w-full font-bold" value={preferences.language} onChange={e => setPreferences({ ...preferences, language: e.target.value })}>
                <option value="en">English (UK / US)</option>
                <option value="es">Español (Spanish)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button type="submit" variant="primary" disabled={isPending}>Save Language</Button>
            </div>
          </form>
        )}

        {/* Danger Zone */}
        {activeTab === 'danger' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 border-b border-red-500/20 pb-2">Danger Zone</h3>
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-4 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-white uppercase tracking-wider">Erase Cache Records</h4>
                <p className="text-gym-gray-400 leading-normal">Purges session localStorage datasets and reinitializes configuration blocks.</p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="text-red-400 hover:bg-red-500/10 border-red-500/20" onClick={handleResetData}>Erase Cache</Button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- MAIN WRAPPER ---

export default function TrainerDashboard() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route index element={<TrainerOverview />} />
        <Route path="clients" element={<TrainerClients />} />
        <Route path="schedule" element={<TrainerSchedule />} />
        <Route path="exercises" element={<TrainerExercises />} />
        <Route path="profile" element={<TrainerProfile />} />
        <Route path="settings" element={<TrainerSettings />} />
      </Routes>
    </ErrorBoundary>
  );
}
