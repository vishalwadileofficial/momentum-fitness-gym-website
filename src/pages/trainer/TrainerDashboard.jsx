import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { 
  FiUsers, FiClock, FiCalendar, FiBookOpen, FiUserCheck, 
  FiPlus, FiTrash2, FiEdit2, FiSave, FiCheckCircle, FiStar, 
  FiAward, FiBriefcase, FiActivity 
} from 'react-icons/fi';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';

// --- SUB-COMPONENTS ---

function TrainerOverview() {
  const stats = [
    { label: 'Active Clients', value: '12', icon: <FiUsers />, trend: { value: '+2', isPositive: true }, colorType: 'primary' },
    { label: 'Weekly Coaching', value: '32 hrs', icon: <FiClock />, trend: { value: '+4 hrs', isPositive: true }, colorType: 'secondary' },
    { label: 'Client Satisfaction', value: '4.95 / 5', icon: <FiStar />, description: 'Based on 48 reviews', colorType: 'pink' },
    { label: 'Daily Session Load', value: '4 / 6', icon: <FiCalendar />, description: '67% capacity today', colorType: 'primary' },
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
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">COACHING INTERFACE</h1>
          <p className="text-xs text-gym-gray-400">Welcome back. Manage clients, log workouts, and track progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => (
            <StatCard key={idx} {...st} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
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

          {/* Upcoming Schedule */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
              <FiCalendar className="text-primary" />
              Today's Briefing
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
}

function TrainerClients() {
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Ethan Caldwell', 
      goal: 'Powerlifting / Hypertrophy', 
      lastSession: 'Yesterday, 17:00', 
      status: 'On Track', 
      progress: 'Deadlift: 405 -> 425 lbs', 
      logs: [
        { date: '2026-07-03', text: 'Squat technique improved. Kept brace tight throughout.' },
        { date: '2026-06-30', text: 'Completed 5x5 squats at 315 lbs. Reps clean.' }
      ] 
    },
    { 
      id: 2, 
      name: 'Sarah Miller', 
      goal: 'Body Recomposition', 
      lastSession: 'Today, 10:00', 
      status: 'On Track', 
      progress: 'Weight: 145 -> 141 lbs', 
      logs: [
        { date: '2026-07-04', text: 'Nutrition check-in: adhering to meal plans. Macros on point.' },
        { date: '2026-07-01', text: 'Added 10 mins post-workout HIIT. HR reached 175.' }
      ] 
    },
    { 
      id: 3, 
      name: 'David Laurent', 
      goal: 'Athletic Conditioning', 
      lastSession: 'June 30, 08:00', 
      status: 'Rest Cycle', 
      progress: 'VO2 Max: 48 -> 51 ml/kg/min', 
      logs: [
        { date: '2026-06-30', text: 'Deload week started. Focus on recovery and sleep.' },
        { date: '2026-06-27', text: 'Light mobility and stretch work. Hip tightness resolving.' }
      ] 
    },
  ]);

  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [newLog, setNewLog] = useState('');
  const [goalInput, setGoalInput] = useState(clients[0].goal);
  const [progressInput, setProgressInput] = useState(clients[0].progress);
  const [statusInput, setStatusInput] = useState(clients[0].status);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setStatusInput(client.status);
    setGoalInput(client.goal);
    setProgressInput(client.progress);
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        const newLogEntry = newLog.trim() 
          ? [{ date: new Date().toISOString().split('T')[0], text: newLog.trim() }, ...c.logs]
          : c.logs;
        return {
          ...c,
          goal: goalInput || c.goal,
          progress: progressInput || c.progress,
          status: statusInput,
          logs: newLogEntry
        };
      }
      return c;
    });

    setClients(updated);
    const refreshed = updated.find(c => c.id === selectedClient.id);
    setSelectedClient(refreshed);
    setNewLog('');
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
              <FiUsers className="text-primary" /> Members Directory
            </h3>
            <div className="space-y-2.5">
              {clients.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectClient(c)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${
                    selectedClient.id === c.id
                      ? 'bg-primary/10 border-primary text-white'
                      : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-300 hover:border-gym-gray-700'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="font-bold text-xs">{c.name}</p>
                    <p className="text-[10px] text-gym-gray-400 uppercase tracking-wider">{c.goal}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    c.status === 'On Track' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                  }`}>
                    {c.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Client Details & Progress Update Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6">
              <div className="flex justify-between items-start border-b border-gym-gray-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedClient.name}</h2>
                  <p className="text-xs text-gym-gray-400">Current Goal: {selectedClient.goal}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gym-gray-500 block uppercase font-bold">Last Active</span>
                  <span className="text-xs text-secondary font-semibold">{selectedClient.lastSession}</span>
                </div>
              </div>

              {/* Progress Logbook Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Progress Logbook</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {selectedClient.logs.map((log, idx) => (
                    <div key={idx} className="p-3 bg-gym-gray-900/60 border border-gym-gray-800 rounded-xl space-y-1">
                      <span className="text-[9px] font-mono text-gym-gray-500">{log.date}</span>
                      <p className="text-xs text-gym-gray-300 font-medium leading-relaxed">{log.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Update Client Details / Add Log */}
              <form onSubmit={handleUpdateClient} className="space-y-4 pt-4 border-t border-gym-gray-800/60">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <FiEdit2 className="text-secondary" /> Log Session & Edit Parameters
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Edit Goal</label>
                    <input 
                      type="text"
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      placeholder={selectedClient.goal}
                      className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Progress Benchmark</label>
                    <input 
                      type="text"
                      value={progressInput}
                      onChange={(e) => setProgressInput(e.target.value)}
                      placeholder={selectedClient.progress}
                      className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Status</label>
                    <select
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="On Track">On Track</option>
                      <option value="Rest Cycle">Rest Cycle</option>
                      <option value="Action Required">Action Required</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Current Benchmark Val</label>
                    <div className="w-full bg-gym-gray-900 border border-gym-gray-800/40 rounded-lg p-2.5 text-xs text-gym-gray-400">
                      {selectedClient.progress}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Add New Session Progress Note</label>
                  <textarea
                    rows="3"
                    value={newLog}
                    onChange={(e) => setNewLog(e.target.value)}
                    placeholder="Log client posture, weight lifted, biomechanics check, nutrition feedback..."
                    className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none transition-colors"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FiSave /> Save Client Updates
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TrainerSchedule() {
  const [sessions, setSessions] = useState([
    { id: 1, client: 'Marcus Chen', time: '18:00 Today', focus: 'Squat Heavy Day', zone: 'Strength Platform 1', status: 'Scheduled' },
    { id: 2, client: 'Samantha Vance', time: '07:00 Tomorrow', focus: 'Unilateral Hip Work', zone: 'Performance Turf', status: 'Scheduled' },
    { id: 3, client: 'Ethan Caldwell', time: '11:00 Tomorrow', focus: 'Bench Press Volume', zone: 'Strength Platform 3', status: 'Scheduled' },
    { id: 4, client: 'Sarah Miller', time: '16:00 Day After', focus: 'Conditioning Circuits', zone: 'Cardio Loft', status: 'Scheduled' },
  ]);

  const handleCheckIn = (id) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status: 'Checked In' } : s));
  };

  const handleCancel = (id) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status: 'Cancelled' } : s));
  };

  return (
    <>
      <Helmet>
        <title>Coaching Schedule | Trainer Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">COACHING SCHEDULE</h1>
          <p className="text-xs text-gym-gray-400">Timetable of personal coaching, platform bookings, and athlete sessions.</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6">
          <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
            <FiClock className="text-secondary" /> Upcoming Classes & Personal Training
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gym-gray-400">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-white tracking-wider border-b border-gym-gray-800 pb-2">
                  <th className="pb-3">Client Name</th>
                  <th className="pb-3">Session Time</th>
                  <th className="pb-3">Focus Area</th>
                  <th className="pb-3">Coaching Zone</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gym-gray-800/40">
                {sessions.map((s) => (
                  <tr key={s.id} className="hover:bg-gym-gray-900/30 transition-colors">
                    <td className="py-4 font-semibold text-white">{s.client}</td>
                    <td className="py-4 font-medium text-secondary">{s.time}</td>
                    <td className="py-4 text-gym-gray-300">{s.focus}</td>
                    <td className="py-4">{s.zone}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.status === 'Checked In' 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : s.status === 'Cancelled'
                            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                            : 'bg-gym-gray-850 text-gym-gray-400 border border-gym-gray-700'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {s.status === 'Scheduled' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleCheckIn(s.id)}
                            className="px-2.5 py-1 bg-primary text-gym-dark font-bold text-[10px] uppercase tracking-wider rounded hover:bg-primary-dark transition-all cursor-pointer"
                          >
                            Check In
                          </button>
                          <button
                            onClick={() => handleCancel(s.id)}
                            className="px-2.5 py-1 bg-gym-gray-850 text-red-400 border border-gym-gray-700 font-bold text-[10px] uppercase tracking-wider rounded hover:bg-red-500/10 transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {s.status !== 'Scheduled' && (
                        <span className="text-[10px] text-gym-gray-500 italic">Session Handled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function TrainerExercises() {
  const defaultExercises = [
    'Barbell Squat',
    'Deadlift',
    'Bench Press',
    'Overhead Press',
    'Barbell Row',
    'Pull-Ups',
    'Dumbbell Incline Press',
    'Romanian Deadlift',
    'Leg Press',
    'Bicep Curl',
    'Lying Tricep Extension'
  ];

  const [savedWorkouts, setSavedWorkouts] = useState([
    {
      id: 1,
      name: 'Elite Power Push',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '5', rpe: '9', rest: '3 mins' },
        { name: 'Overhead Press', sets: '3', reps: '8', rpe: '8', rest: '2 mins' },
        { name: 'Lying Tricep Extension', sets: '3', reps: '10', rpe: '8', rest: '90s' }
      ]
    },
    {
      id: 2,
      name: 'Posterior Chain Hypertrophy',
      exercises: [
        { name: 'Deadlift', sets: '3', reps: '5', rpe: '8.5', rest: '3 mins' },
        { name: 'Romanian Deadlift', sets: '3', reps: '10', rpe: '8', rest: '2 mins' },
        { name: 'Pull-Ups', sets: '4', reps: '8', rpe: '9', rest: '90s' }
      ]
    }
  ]);

  const [workoutName, setWorkoutName] = useState('');
  const [selectedEx, setSelectedEx] = useState(defaultExercises[0]);
  const [sets, setSets] = useState('4');
  const [reps, setReps] = useState('8');
  const [rpe, setRpe] = useState('8');
  const [rest, setRest] = useState('2 mins');

  const [currentBuilderExercises, setCurrentBuilderExercises] = useState([]);

  const handleAddExerciseToBuilder = (e) => {
    e.preventDefault();
    const newItem = {
      name: selectedEx,
      sets,
      reps,
      rpe,
      rest
    };
    setCurrentBuilderExercises([...currentBuilderExercises, newItem]);
  };

  const handleRemoveBuilderExercise = (index) => {
    setCurrentBuilderExercises(currentBuilderExercises.filter((_, idx) => idx !== index));
  };

  const handleSaveWorkout = () => {
    if (!workoutName.trim()) {
      alert('Please enter a workout name');
      return;
    }
    if (currentBuilderExercises.length === 0) {
      alert('Please add at least one exercise to the builder');
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
  };

  const handleDeleteSavedWorkout = (id) => {
    setSavedWorkouts(savedWorkouts.filter(w => w.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Workouts Builder | Trainer Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">WORKOUT BUILDER</h1>
          <p className="text-xs text-gym-gray-400">Design custom routine templates and build workout blueprints for athletes.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Builder Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                <FiBookOpen className="text-primary" /> Active Planner
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Workout Blueprint Name</label>
                  <input 
                    type="text"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    placeholder="e.g. Strength Foundation Day 1"
                    className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Add Exercise form row */}
                <div className="p-4 bg-gym-gray-950 border border-gym-gray-800 rounded-xl space-y-4">
                  <h4 className="text-[10px] uppercase font-black text-secondary tracking-widest">Configure Exercise Slot</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold text-gym-gray-500 mb-1">Exercise</label>
                      <select
                        value={selectedEx}
                        onChange={(e) => setSelectedEx(e.target.value)}
                        className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none transition-colors"
                      >
                        {defaultExercises.map((ex, idx) => (
                          <option key={idx} value={ex}>{ex}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-gym-gray-500 mb-1">Sets</label>
                        <input 
                          type="text" 
                          value={sets} 
                          onChange={(e) => setSets(e.target.value)}
                          className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-center text-white focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-gym-gray-500 mb-1">Reps</label>
                        <input 
                          type="text" 
                          value={reps} 
                          onChange={(e) => setReps(e.target.value)}
                          className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-center text-white focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-gym-gray-500 mb-1">RPE</label>
                        <input 
                          type="text" 
                          value={rpe} 
                          onChange={(e) => setRpe(e.target.value)}
                          className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-center text-white focus:border-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-gym-gray-500 mb-1">Rest Interval</label>
                      <input 
                        type="text" 
                        value={rest} 
                        onChange={(e) => setRest(e.target.value)}
                        placeholder="e.g. 3 mins"
                        className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleAddExerciseToBuilder}
                      className="px-4 py-2 bg-gym-gray-800 hover:bg-gym-gray-700 text-white border border-gym-gray-700 font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FiPlus /> Add Exercise
                    </button>
                  </div>
                </div>

                {/* Exercises currently in builder */}
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase font-bold text-gym-gray-400">Workout Sequence</span>
                  
                  {currentBuilderExercises.length === 0 ? (
                    <div className="p-6 bg-gym-gray-900/40 border border-gym-gray-800 border-dashed rounded-xl text-center">
                      <p className="text-xs text-gym-gray-500">No exercises added to this blueprint yet.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gym-gray-800 bg-gym-gray-950 border border-gym-gray-800 rounded-xl overflow-hidden">
                      {currentBuilderExercises.map((item, idx) => (
                        <div key={idx} className="p-3.5 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-white">{item.name}</p>
                            <p className="text-[10px] text-gym-gray-400">
                              Sets: {item.sets} | Reps: {item.reps} | RPE: {item.rpe} | Rest: {item.rest}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveBuilderExercise(idx)}
                            className="text-red-400 hover:text-red-300 p-1.5 cursor-pointer"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save workout button */}
                {currentBuilderExercises.length > 0 && (
                  <div className="flex justify-end pt-4 border-t border-gym-gray-800">
                    <button
                      onClick={handleSaveWorkout}
                      className="px-5 py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FiCheckCircle /> Publish Routine Blueprint
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Saved Templates Roster */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
              <FiAward className="text-secondary" /> Saved Blueprints
            </h3>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {savedWorkouts.length === 0 ? (
                <p className="text-xs text-gym-gray-500 text-center py-4">No routines saved yet.</p>
              ) : (
                savedWorkouts.map(w => (
                  <div key={w.id} className="p-4 bg-gym-gray-900 border border-gym-gray-800 rounded-xl space-y-3 relative group">
                    <button
                      onClick={() => handleDeleteSavedWorkout(w.id)}
                      className="absolute right-3 top-3 text-gym-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <h4 className="font-bold text-xs text-white uppercase tracking-wide">{w.name}</h4>
                      <p className="text-[9px] text-gym-gray-500 uppercase tracking-wider mt-0.5">{w.exercises.length} Exercises total</p>
                    </div>
                    <div className="space-y-1.5 border-t border-gym-gray-800 pt-2.5">
                      {w.exercises.map((ex, i) => (
                        <div key={i} className="text-[10px] text-gym-gray-400 flex justify-between">
                          <span>{ex.name}</span>
                          <span className="font-mono text-[9px] text-gym-gray-500">
                            {ex.sets}x{ex.reps} @RPE{ex.rpe}
                          </span>
                        </div>
                      ))}
                    </div>
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

function TrainerProfile() {
  const [profile, setProfile] = useState({
    name: 'Marcus Vance',
    role: 'Head Strength Coach',
    bio: 'Dedicated to helping athletes unlock raw strength and mental grit. 10+ years coaching powerlifters, Olympic lifters, and field athletes.',
    experience: '12 Years',
    rating: '4.95',
    certifications: [
      'Certified Strength and Conditioning Specialist (CSCS)',
      'NASM Performance Enhancement Specialist (PES)',
      'Precision Nutrition Level 2 Coach',
      'USA Weightlifting Advanced Sports Performance Coach'
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [roleInput, setRoleInput] = useState(profile.role);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [expInput, setExpInput] = useState(profile.experience);
  const [newCert, setNewCert] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: nameInput,
      role: roleInput,
      bio: bioInput,
      experience: expInput
    });
    setIsEditing(false);
  };

  const handleAddCert = () => {
    if (newCert.trim()) {
      setProfile({
        ...profile,
        certifications: [...profile.certifications, newCert.trim()]
      });
      setNewCert('');
    }
  };

  const handleRemoveCert = (index) => {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((_, i) => i !== index)
    });
  };

  return (
    <>
      <Helmet>
        <title>Trainer Profile | Momentum Fitness Coaching</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-black font-display text-white">MY COACH BIO</h1>
            <p className="text-xs text-gym-gray-400">View and update your credentials, bio details, and staff details.</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-gym-gray-850 border border-gym-gray-700 hover:border-primary hover:text-primary transition-all text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 cursor-pointer"
          >
            {isEditing ? 'Cancel Edit' : <><FiEdit2 /> Edit Profile</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card Showcase */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 h-fit relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-4xl text-primary font-display font-black shadow-lg shadow-primary/5">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                <p className="text-xs text-primary font-semibold tracking-wider uppercase mt-0.5">{profile.role}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gym-gray-800/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gym-gray-400 uppercase font-bold text-[10px]">Coaching Career</span>
                <span className="text-white font-semibold flex items-center gap-1"><FiBriefcase className="text-secondary animate-pulse" /> {profile.experience}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gym-gray-400 uppercase font-bold text-[10px]">Client Feedback</span>
                <span className="text-white font-semibold flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400/20" /> {profile.rating} / 5</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-gym-gray-800/60">
              <span className="text-[10px] uppercase font-bold text-gym-gray-400 block">About Me</span>
              <p className="text-xs text-gym-gray-300 font-medium leading-relaxed font-sans">{profile.bio}</p>
            </div>
          </div>

          {/* Credentials and Edit area */}
          <div className="lg:col-span-2 space-y-6">
            
            {isEditing ? (
              <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6">
                <h3 className="text-sm uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-3">
                  Edit Coach Profile details
                </h3>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Coach Name</label>
                      <input 
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Title / Specialization</label>
                      <input 
                        type="text"
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Years Experience</label>
                      <input 
                        type="text"
                        value={expInput}
                        onChange={(e) => setExpInput(e.target.value)}
                        className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Bio Narrative</label>
                    <textarea 
                      rows="4"
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <FiSave /> Save Profile Details
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {/* Certifications & Badges */}
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6">
              <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
                <FiAward className="text-primary" /> Verified Certifications & Credentials
              </h3>
              
              <div className="space-y-3">
                {profile.certifications.map((cert, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3.5 bg-gym-gray-900 border border-gym-gray-800 rounded-xl">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-gym-gray-300">
                      <FiCheckCircle className="text-primary w-4.5 h-4.5 shrink-0" />
                      <span>{cert}</span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveCert(idx)}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4 border-t border-gym-gray-800/60">
                  <input 
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    placeholder="Add certification (e.g. NASM CES, CrossFit L1...)"
                    className="flex-1 bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={handleAddCert}
                    className="px-4 py-2 bg-gym-gray-850 hover:bg-gym-gray-800 border border-gym-gray-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

// --- MAIN WRAPPER ---

export default function TrainerDashboard() {
  return (
    <Routes>
      <Route index element={<TrainerOverview />} />
      <Route path="clients" element={<TrainerClients />} />
      <Route path="schedule" element={<TrainerSchedule />} />
      <Route path="exercises" element={<TrainerExercises />} />
      <Route path="profile" element={<TrainerProfile />} />
    </Routes>
  );
}
