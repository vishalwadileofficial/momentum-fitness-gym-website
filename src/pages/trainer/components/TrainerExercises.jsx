import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiTrash2 } from 'react-icons/fi';
import { useToast } from '@/context/ToastContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import EmptyState from '@/components/ui/EmptyState';

export default function TrainerExercises() {
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
