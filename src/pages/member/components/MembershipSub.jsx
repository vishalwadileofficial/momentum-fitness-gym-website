import React, { useState } from 'react';
import { FiAward, FiInfo } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Modal from '@/components/ui/Modal';
import { purchaseMembership, freezeMembership, createNotification } from '@/services/firebase/db';

export default function MembershipSub({ profile, setProfile, membershipHistory, setMembershipHistory, toast }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [freezeModal, setFreezeModal] = useState(false);
  const [freezeDuration, setFreezeDuration] = useState('1 month');
  const [freezeReason, setFreezeReason] = useState('');

  const plans = [
    { name: 'Basic Strength', price: 29, desc: 'Eleiko lifting yard access & locker amenities.' },
    { name: 'Standard Athletic', price: 49, desc: 'Barbells, group classes, saunas access.' },
    { name: 'Premium Athlete', price: 89, desc: 'Classes, recovery suites, nutrition guide.' },
    { name: 'Elite Performance', price: 199, desc: 'Unlimited layouts, private coaching hours.' }
  ];

  const handlePurchase = async (plan) => {
    setSelectedPlan(plan);
  };

  const confirmUpgrade = async () => {
    try {
      const res = await purchaseMembership(profile.uid || 'guest', selectedPlan.name, 'monthly');
      setProfile(prev => ({ ...prev, plan: selectedPlan.name }));
      setMembershipHistory(prev => [
        { planName: selectedPlan.name, price: selectedPlan.price, billingCycle: 'monthly', date: new Date().toISOString(), status: 'paid' },
        ...prev
      ]);
      await createNotification(profile.uid || 'guest', 'Plan Tier Upgraded', `Your membership plan tier is upgraded to ${res.planName}.`, 'success');
      setSelectedPlan(null);
      toast.success(`Success! Plan tier upgraded to ${res.planName}.`);
    } catch {
      toast.error('Purchase failed. Contact admin desk.');
    }
  };

  const handleFreeze = async (e) => {
    e.preventDefault();
    if (freezeReason.length < 5) {
      toast.error('Please write a valid reason for freezing membership.');
      return;
    }
    try {
      await freezeMembership(profile.uid || 'guest', freezeDuration, freezeReason);
      await createNotification(profile.uid || 'guest', 'Freeze Logged', `Membership freeze request logged: ${freezeDuration}.`, 'info');
      toast.success(`Request logged: freeze membership for ${freezeDuration}.`);
      setFreezeReason('');
      setFreezeModal(false);
    } catch {
      toast.error('Request failed.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] text-gym-gray-500 uppercase tracking-widest font-black block">Current Admission Tier</span>
          <h2 className="text-2xl font-black text-white font-display mt-1">{profile.plan}</h2>
          <p className="text-xs text-gym-gray-400 mt-1">Status: Active &bull; Next billing renewal date: Aug 01, 2026</p>
        </div>
        <Button variant="outline" onClick={() => setFreezeModal(true)}>Freeze Membership</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-2">
          <FiAward className="text-primary" /> Upgrade/Modify Membership Tiers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((p) => {
            const isCurrent = profile.plan.toLowerCase() === p.name.toLowerCase();
            return (
              <div key={p.name} className={`glass-card p-6 rounded-xl border flex flex-col justify-between ${isCurrent ? 'border-primary' : 'border-gym-gray-850'}`}>
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <span className="text-lg font-black text-primary font-mono">${p.price}/mo</span>
                  </div>
                  <p className="text-xs text-gym-gray-400 mt-2 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gym-gray-855/40">
                  {isCurrent ? (
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded block text-center border border-primary/20">Active Plan</span>
                  ) : (
                    <Button variant="primary" className="w-full justify-center" onClick={() => handlePurchase(p)}>Select & Upgrade</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-2">
          <FiInfo className="text-secondary" /> Billing Invoice History
        </h3>
        {membershipHistory.length === 0 ? (
          <EmptyState title="No Invoices Found" message="All transactions history clear." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gym-gray-800">
            <table className="w-full text-left text-xs text-gym-gray-300">
              <thead className="bg-gym-gray-950/40 text-[10px] font-bold text-white uppercase tracking-wider">
                <tr>
                  <th className="p-4">Plan Name</th>
                  <th className="p-4">Billing Cycle</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gym-gray-850">
                {membershipHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gym-gray-900/10">
                    <td className="p-4 font-bold text-white">{item.planName}</td>
                    <td className="p-4 uppercase">{item.billingCycle}</td>
                    <td className="p-4 font-mono">${item.price}</td>
                    <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <span className="bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded font-bold uppercase text-[9px] border border-green-500/20">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upgrade modal */}
      <Modal isOpen={selectedPlan !== null} onClose={() => setSelectedPlan(null)} title="Purchase Confirmation">
        <div className="space-y-4">
          <p className="text-xs text-gym-gray-400 leading-relaxed">
            You are upgrading your current membership tier to the <strong className="text-white">{selectedPlan?.name}</strong> at a rate of <strong className="text-primary font-mono">${selectedPlan?.price}/month</strong>. Confirm to charge mock payment credential.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setSelectedPlan(null)}>Cancel</Button>
            <Button variant="primary" onClick={confirmUpgrade}>Confirm Upgrade</Button>
          </div>
        </div>
      </Modal>

      {/* Freeze modal */}
      <Modal isOpen={freezeModal} onClose={() => setFreezeModal(false)} title="Freeze Membership Request">
        <form onSubmit={handleFreeze} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Freeze Duration</label>
            <select 
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-bold"
              value={freezeDuration} 
              onChange={(e) => setFreezeDuration(e.target.value)}
            >
              <option value="1 week">1 Week</option>
              <option value="2 weeks">2 Weeks</option>
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Reason for request</label>
            <textarea 
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary h-20 resize-none"
              placeholder="Provide a reason (injury, travel, corporate reassignment, etc.)"
              value={freezeReason}
              onChange={(e) => setFreezeReason(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setFreezeModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
