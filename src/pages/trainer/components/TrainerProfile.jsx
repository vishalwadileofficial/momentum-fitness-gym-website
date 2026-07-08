import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiAward, FiEdit2, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getTrainerScheduleAvailability, updateTrainerScheduleAvailability } from '@/services/firebase/db';

export default function TrainerProfile() {
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
