import React, { useState } from 'react';
import { FiActivity } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DashboardChart from '@/components/dashboard/DashboardChart';
import { saveMemberProgress, createNotification } from '@/services/firebase/db';

export default function ProgressSub({ progressHistory, setProgressHistory, profile, toast }) {
  const [newProgress, setNewProgress] = useState({ weight: '', bodyFat: '', chest: '', waist: '', arms: '' });

  const handleLogProgress = async (e) => {
    e.preventDefault();
    if (!newProgress.weight) {
      toast.error('Weight is a required progress parameter.');
      return;
    }

    const payload = {
      weight: parseFloat(newProgress.weight),
      bodyFat: parseFloat(newProgress.bodyFat) || 0,
      chest: parseFloat(newProgress.chest) || 0,
      waist: parseFloat(newProgress.waist) || 0,
      arms: parseFloat(newProgress.arms) || 0
    };

    try {
      await saveMemberProgress(profile.uid || 'guest', payload);
      setProgressHistory(prev => [{ ...payload, date: new Date().toISOString().split('T')[0] }, ...prev]);
      await createNotification(profile.uid || 'guest', 'Biometrics Update', `Biometrics weight logged at ${payload.weight} kg.`, 'info');
      setNewProgress({ weight: '', bodyFat: '', chest: '', waist: '', arms: '' });
      toast.success('Biometrics changes successfully saved.');
    } catch {
      toast.error('Progress log failed.');
    }
  };

  const chartData = [...progressHistory].reverse().map(item => ({
    label: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    value: item.weight
  }));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handleLogProgress} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-2">
            <FiActivity className="text-primary" /> Log Body Stats
          </h3>
          <Input
            label="Weight (kg)"
            type="number"
            step="0.1"
            required
            value={newProgress.weight}
            onChange={(e) => setNewProgress({ ...newProgress, weight: e.target.value })}
          />
          <Input
            label="Body Fat (%)"
            type="number"
            step="0.1"
            value={newProgress.bodyFat}
            onChange={(e) => setNewProgress({ ...newProgress, bodyFat: e.target.value })}
          />
          <div className="grid grid-cols-3 gap-2">
            <Input
              label="Chest"
              type="number"
              value={newProgress.chest}
              onChange={(e) => setNewProgress({ ...newProgress, chest: e.target.value })}
            />
            <Input
              label="Waist"
              type="number"
              value={newProgress.waist}
              onChange={(e) => setNewProgress({ ...newProgress, waist: e.target.value })}
            />
            <Input
              label="Arms"
              type="number"
              value={newProgress.arms}
              onChange={(e) => setNewProgress({ ...newProgress, arms: e.target.value })}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full justify-center">Log Stats</Button>
        </form>

        <div className="lg:col-span-2 space-y-6">
          {chartData.length > 1 && (
            <DashboardChart
              title="Weight Progress Log"
              subtitle="Weight fluctuation tracking metrics"
              totalValue={`${progressHistory[0]?.weight || 84} kg`}
              data={chartData}
              layout="line"
              colorType="primary"
            />
          )}

          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">History logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] font-bold text-white uppercase tracking-wider">
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Weight</th>
                    <th className="pb-3 pr-4">Body Fat</th>
                    <th className="pb-3 pr-4">Chest</th>
                    <th className="pb-3 pr-4">Waist</th>
                    <th className="pb-3">Arms</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-850">
                  {progressHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 pr-4 text-white font-bold">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="py-2.5 pr-4 font-mono">{item.weight} kg</td>
                      <td className="py-2.5 pr-4 font-mono">{item.bodyFat}%</td>
                      <td className="py-2.5 pr-4 font-mono">{item.chest} cm</td>
                      <td className="py-2.5 pr-4 font-mono">{item.waist} cm</td>
                      <td className="py-2.5 font-mono">{item.arms} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
