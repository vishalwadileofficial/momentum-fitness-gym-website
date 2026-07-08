import React, { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { createNotification } from '@/services/firebase/db';
import { useAuth } from '@/context/AuthContext';

export default function ProfileSub({ profile, setProfile, toast }) {
  const { changePassword } = useAuth();
  const [formData, setFormData] = useState({ ...profile });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Display image size must be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        toast.success('Display picture updated locally.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone coordinate is required.';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Validation errors found.');
      return;
    }
    
    setProfile({ ...formData });
    try {
      await createNotification(profile.uid || 'guest', 'Profile Updated', 'Your profile details and biometrics targets have been updated.', 'info');
      toast.success('Personal profile details logged successfully.');
    } catch {
      toast.success('Profile saved locally.');
    }
  };

  const handlePasswordSubmit = async (e) => {
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
    try {
      await changePassword(passwordForm.newPassword);
      toast.success('Security password credentials updated.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.message || 'Password update failed.');
    } finally {
      setIsPending(false);
    }
  };

  // Generate initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 text-center flex flex-col items-center justify-center space-y-4">
        <span className="text-[10px] text-gym-gray-500 uppercase tracking-widest font-black block">Avatar Photo</span>
        <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-primary bg-gym-gray-950 flex items-center justify-center">
          {profile.avatar ? (
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-black text-gym-gray-600">{getInitials(profile.name)}</span>
          )}
          <label className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200 cursor-pointer text-[10px] font-bold uppercase tracking-wider gap-1">
            <span>Change Photo</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
          </label>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">{profile.name}</h4>
          <p className="text-[10px] text-gym-gray-400 uppercase tracking-widest">{profile.plan} Plan</p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <form onSubmit={handleSaveProfile} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-2">
            <FiUser className="text-primary" /> Profile Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            <Input
              label="Phone Coordinate"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
            />
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                className="w-full bg-gym-dark border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Height (cm)</label>
              <input
                type="number"
                className="w-full bg-gym-dark border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>

        <form onSubmit={handlePasswordSubmit} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-2">
            <FiLock className="text-secondary" /> Change Password
          </h3>
          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              required
              disabled={isPending}
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="New Password"
                type="password"
                required
                disabled={isPending}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                disabled={isPending}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" variant="outline" isDisabled={isPending}>
              {isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
