import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import Button from '@/components/ui/Button';

export default function WorkoutsSub({ toast }) {
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Barbell Back Squat', sets: 5, reps: '5 reps', weight: 140, completed: [false, false, false, false, false] },
    { id: 2, name: 'Barbell Bench Press', sets: 4, reps: '8 reps', weight: 100, completed: [false, false, false, false] },
    { id: 3, name: 'Weighted Pull-ups', sets: 3, reps: '6 reps', weight: 15, completed: [false, false, false] },
    { id: 4, name: 'Romanian Deadlift', sets: 3, reps: '10 reps', weight: 120, completed: [false, false, false] }
  ]);

  const toggleSet = (exerciseId, setIdx) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        const completedCopy = [...ex.completed];
        completedCopy[setIdx] = !completedCopy[setIdx];
        return { ...ex, completed: completedCopy };
      }
      return ex;
    }));
  };

  const handleWeightChange = (id, weightVal) => {
    setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, weight: parseInt(weightVal) || 0 } : ex));
  };

  const handleLogWorkout = () => {
    toast.success('Workout log updated in Firestore progress history.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
        <div className="flex justify-between items-center border-b border-gym-gray-800 pb-4 mb-4">
          <div>
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest block">Active Phase Block</span>
            <h3 className="text-lg font-bold text-white">Strength & Hypertrophy Phase 2</h3>
          </div>
          <Button variant="primary" onClick={handleLogWorkout}>Log Session Progress</Button>
        </div>

        <div className="space-y-4">
          {exercises.map((ex) => (
            <div key={ex.id} className="p-4 bg-gym-dark border border-gym-gray-850 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{ex.name}</h4>
                  <p className="text-[10px] text-gym-gray-500 mt-0.5">{ex.sets} Sets &bull; {ex.reps}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gym-gray-400 font-bold uppercase">Weight:</span>
                  <input
                    type="number"
                    className="w-16 bg-gym-gray-900 border border-gym-gray-800 rounded px-2.5 py-1 text-xs text-white text-center focus:outline-none focus:border-primary font-mono font-bold"
                    value={ex.weight}
                    onChange={(e) => handleWeightChange(ex.id, e.target.value)}
                  />
                  <span className="text-[10px] text-gym-gray-500 font-bold uppercase">kg</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-gym-gray-855/40">
                {ex.completed.map((val, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleSet(ex.id, idx)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border font-mono text-xs font-bold transition-all cursor-pointer ${
                      val 
                        ? 'bg-primary border-primary text-gym-dark shadow-[0_2px_8px_rgba(204,255,0,0.15)] font-black' 
                        : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-400 hover:border-gym-gray-700'
                    }`}
                  >
                    {val ? <FiCheck className="w-3.5 h-3.5" /> : idx + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
