import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { updateNutritionLog } from '@/services/firebase/db';

export default function NutritionSub({ nutrition, setNutrition, profile, toast }) {
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' });
  const [mealModal, setMealModal] = useState(false);

  const toggleMeal = async (mealId) => {
    const updatedMeals = nutrition.meals.map(m => m.id === mealId ? { ...m, checked: !m.checked } : m);
    const updatedLog = { ...nutrition, meals: updatedMeals };
    setNutrition(updatedLog);
    try {
      await updateNutritionLog(profile.uid || 'guest', updatedLog);
    } catch {
      toast.error('Failed to sync logs.');
    }
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!newMeal.name.trim() || !newMeal.calories) {
      toast.error('Please enter a meal name and calories target.');
      return;
    }

    const item = {
      id: Math.random().toString(36).substr(2, 9),
      name: newMeal.name,
      checked: false,
      calories: parseInt(newMeal.calories) || 0,
      protein: parseInt(newMeal.protein) || 0,
      carbs: parseInt(newMeal.carbs) || 0,
      fats: parseInt(newMeal.fats) || 0
    };

    const updatedLog = { ...nutrition, meals: [...(nutrition.meals || []), item] };
    setNutrition(updatedLog);
    setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
    setMealModal(false);
    toast.success('Custom meal added to plan checklist.');
    
    try {
      await updateNutritionLog(profile.uid || 'guest', updatedLog);
    } catch {
      // Offline sync — silently handled
    }
  };

  const caloriesConsumed = nutrition.meals
    ? nutrition.meals.filter(m => m.checked).reduce((sum, m) => sum + m.calories, 0)
    : 0;

  const proteinConsumed = nutrition.meals
    ? nutrition.meals.filter(m => m.checked).reduce((sum, m) => sum + m.protein, 0)
    : 0;

  const carbsConsumed = nutrition.meals
    ? nutrition.meals.filter(m => m.checked).reduce((sum, m) => sum + m.carbs, 0)
    : 0;

  const fatsConsumed = nutrition.meals
    ? nutrition.meals.filter(m => m.checked).reduce((sum, m) => sum + m.fats, 0)
    : 0;

  const handleWater = async (amount) => {
    const val = Math.max(0, parseFloat((nutrition.waterIntake + amount).toFixed(1)));
    const updatedLog = { ...nutrition, waterIntake: val };
    setNutrition(updatedLog);
    try {
      await updateNutritionLog(profile.uid || 'guest', updatedLog);
    } catch {
      // Sync pending — silently handled
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gym-gray-900 border border-gym-gray-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-gym-gray-500 uppercase font-bold tracking-widest">Energy Intake</span>
          <p className="text-xl font-black text-white font-mono">{caloriesConsumed} / {profile.targetCalories} kcal</p>
        </div>
        <div className="bg-gym-gray-900 border border-gym-gray-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-gym-gray-500 uppercase font-bold tracking-widest">Protein Target</span>
          <p className="text-xl font-black text-primary font-mono">{proteinConsumed} / {nutrition.proteinTarget}g</p>
        </div>
        <div className="bg-gym-gray-900 border border-gym-gray-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-gym-gray-500 uppercase font-bold tracking-widest">Carbohydrates</span>
          <p className="text-xl font-black text-secondary font-mono">{carbsConsumed} / {nutrition.carbTarget}g</p>
        </div>
        <div className="bg-gym-gray-900 border border-gym-gray-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-gym-gray-500 uppercase font-bold tracking-widest">Fats Target</span>
          <p className="text-xl font-black text-accent-pink font-mono">{fatsConsumed} / {nutrition.fatTarget}g</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
          <div className="flex justify-between items-center border-b border-gym-gray-800 pb-3 mb-4">
            <h3 className="text-xs uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
              Meal Checklist Tracker
            </h3>
            <Button variant="outline" size="sm" onClick={() => setMealModal(true)}>Add Custom Food</Button>
          </div>

          <div className="space-y-2">
            {nutrition.meals?.map((m) => (
              <div 
                key={m.id}
                onClick={() => toggleMeal(m.id)}
                className="flex items-start gap-3 p-3.5 bg-gym-dark border border-gym-gray-850 hover:border-gym-gray-700 rounded-xl transition-all cursor-pointer select-none"
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-all ${
                  m.checked ? 'bg-primary border-primary text-gym-dark' : 'border-gym-gray-600'
                }`}>
                  <FiCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold leading-relaxed ${m.checked ? 'line-through text-gym-gray-500' : 'text-white'}`}>{m.name}</p>
                  <p className="text-[9px] text-gym-gray-500 mt-1 uppercase font-bold tracking-wider font-mono">
                    {m.calories} kcal &bull; P: {m.protein}g | C: {m.carbs}g | F: {m.fats}g
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Water widget */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 text-center">
            <span className="text-[10px] text-gym-gray-500 uppercase font-bold tracking-widest block">Hydration Target</span>
            <p className="text-3xl font-black text-white font-display">{nutrition.waterIntake} / {nutrition.waterTarget} L</p>
            
            <div className="flex justify-center gap-2 pt-2">
              <Button variant="outline" onClick={() => handleWater(0.25)}>+250ml</Button>
              <Button variant="outline" onClick={() => handleWater(0.5)}>+500ml</Button>
              <Button variant="outline" onClick={() => handleWater(-0.25)}>&minus;250ml</Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-3 text-xs">
            <span className="text-[10px] text-gym-gray-500 uppercase tracking-widest font-black block border-b border-gym-gray-800 pb-2">Macros Breakdown</span>
            <p className="text-gym-gray-400 leading-relaxed">
              Consistently hit within 10g of your protein target to maximize muscle hypertrophy repairs. Custom updates log directly.
            </p>
          </div>
        </div>
      </div>

      {/* Add Custom Meal modal */}
      <Modal isOpen={mealModal} onClose={() => setMealModal(false)} title="Add Food Log">
        <form onSubmit={handleAddMeal} className="space-y-4">
          <Input
            label="Meal / Food Name"
            placeholder="e.g. Greek Yogurt & Honey"
            required
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Calories (kcal)"
              type="number"
              required
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
            />
            <Input
              label="Protein (g)"
              type="number"
              value={newMeal.protein}
              onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
            />
            <Input
              label="Carbohydrates (g)"
              type="number"
              value={newMeal.carbs}
              onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
            />
            <Input
              label="Fats (g)"
              type="number"
              value={newMeal.fats}
              onChange={(e) => setNewMeal({ ...newMeal, fats: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setMealModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add Meal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
