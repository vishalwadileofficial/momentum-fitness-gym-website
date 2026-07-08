import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

export default function SettingsSub({ profile, setProfile, toast }) {
  const { changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [preferences, setPreferences] = useState({
    timezone: 'GMT (UTC+0)',
    units: 'Metric (kg/cm)',
    emailAlerts: true,
    pushAlerts: false,
    smsAlerts: false,
    publicProfile: false,
    theme: 'dark',
    accent: 'neon-lime',
    language: 'en'
  });

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [isPending, setIsPending] = useState(false);
  const [dangerModal, setDangerModal] = useState(false);
  const [confirmDeleteInput, setConfirmDeleteInput] = useState('');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Alerts' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'appearance', label: 'Theme' },
    { id: 'language', label: 'Locale' },
    { id: 'danger', label: 'Danger Zone' }
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setProfile({ ...profileForm });
      setIsPending(false);
      toast.success('Profile preferences successfully logged.');
    }, 500);
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
      if (changePassword) {
        await changePassword(passwordForm.newPassword);
      }
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Security password credentials updated.');
    } catch (err) {
      toast.error(err.message || 'Failed to update password.');
    } finally {
      setIsPending(false);
    }
  };

  const handleSavePreferences = (e) => {
    if (e) e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast.success('Application configuration updated.');
    }, 400);
  };

  const handleDownloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ profile, preferences }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "momentum_member_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Personal profile data JSON file exported.');
  };

  const handleResetData = () => {
    localStorage.clear();
    toast.success('LocalStorage cache cleared. Reloading portal...');
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleDeleteAccount = () => {
    if (confirmDeleteInput !== 'DELETE') {
      toast.error('Verification code mismatch.');
      return;
    }
    setDangerModal(false);
    toast.success('Deletion request logged. Account scheduled for purge.');
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
                : 'bg-gym-gray-900/40 hover:bg-gym-gray-800 text-gym-gray-400 hover:text-white border border-gym-gray-850/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Contents Panel */}
      <div className="lg:col-span-3 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 min-h-[350px] flex flex-col justify-between">
        
        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Profile Timelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" required value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} />
              <Input label="Phone Coordinate" required value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} />
              <div className="space-y-1.5">
                <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Weight (kg)</label>
                <input type="number" step="0.1" className="w-full bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-primary" value={profileForm.weight} onChange={e => setProfileForm({ ...profileForm, weight: parseFloat(e.target.value) })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Height (cm)</label>
                <input type="number" className="w-full bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-primary" value={profileForm.height} onChange={e => setProfileForm({ ...profileForm, height: parseInt(e.target.value) })} />
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? 'Logging...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        )}

        {/* Account Credentials */}
        {activeTab === 'account' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Security Account</h3>
            <div className="space-y-2">
              <span className="text-[10px] text-gym-gray-500 uppercase tracking-widest block font-bold">Registered email</span>
              <span className="text-xs font-mono text-white select-text font-bold block bg-gym-dark/50 p-2.5 rounded border border-gym-gray-850">{profile.email}</span>
            </div>
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
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Alert Configurations</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.emailAlerts} onChange={e => setPreferences({ ...preferences, emailAlerts: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Receive Weekly Fitness Summaries via Email</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.pushAlerts} onChange={e => setPreferences({ ...preferences, pushAlerts: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Enable In-App Audio Dashboard Alerts Pings</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.smsAlerts} onChange={e => setPreferences({ ...preferences, smsAlerts: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Receive Class Schedules Confirmations via SMS</span>
              </label>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button variant="primary" onClick={handleSavePreferences} disabled={isPending}>Save Preferences</Button>
            </div>
          </div>
        )}

        {/* Privacy settings */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Privacy & Visibility</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.publicProfile} onChange={e => setPreferences({ ...preferences, publicProfile: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Allow trainers to discover my biometrics history logs</span>
              </label>
              <div className="bg-gym-gray-950/40 p-4 border border-gym-gray-850 rounded-xl space-y-2 text-xs">
                <p className="text-gym-gray-400">Export a complete dossier of your account parameters in JSON format:</p>
                <Button variant="outline" size="sm" onClick={handleDownloadData}>Download Dossier</Button>
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button variant="primary" onClick={handleSavePreferences} disabled={isPending}>Save Preferences</Button>
            </div>
          </div>
        )}

        {/* Theme Preferences */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
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
                <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Accent Accent Color</label>
                <select className="bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-white focus:outline-none w-full font-bold" value={preferences.accent} onChange={e => setPreferences({ ...preferences, accent: e.target.value })}>
                  <option value="neon-lime">Neon Lime (Primary)</option>
                  <option value="cyan">Electric Cyan (Secondary)</option>
                  <option value="pink">Athletic Pink (Accent)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button variant="primary" onClick={handleSavePreferences} disabled={isPending}>Save Theme</Button>
            </div>
          </div>
        )}

        {/* Locale Translations */}
        {activeTab === 'language' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Language Selection</h3>
            <div className="space-y-4 text-xs">
              <p className="text-gym-gray-400">Choose primary portal display translations:</p>
              <select className="bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-white focus:outline-none w-full font-bold" value={preferences.language} onChange={e => setPreferences({ ...preferences, language: e.target.value })}>
                <option value="en">English (UK / US)</option>
                <option value="es">Español (Spanish)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ru">Русский (Russian)</option>
              </select>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button variant="primary" onClick={handleSavePreferences} disabled={isPending}>Save Language</Button>
            </div>
          </div>
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

              <div className="border-t border-red-500/10 pt-4 space-y-1">
                <h4 className="font-bold text-white uppercase tracking-wider">Purge Account Profile</h4>
                <p className="text-gym-gray-400 leading-normal">Request complete deletion of your athlete biometrics, memberships logs, and account files.</p>
                <div className="pt-2">
                  <button onClick={() => setDangerModal(true)} className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">Purge Profile</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Danger Modal */}
      <Modal isOpen={dangerModal} onClose={() => setDangerModal(false)} title="Confirm Profile Deletion">
        <div className="space-y-4">
          <p className="text-xs text-gym-gray-400 leading-relaxed">
            This action is irreversible. All of your custom workout plans, biometrics histories, classes bookings, and billing credentials will be deleted immediately.
          </p>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Type <strong className="text-white font-mono select-none">DELETE</strong> to confirm:</label>
            <input type="text" className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none" value={confirmDeleteInput} onChange={e => setConfirmDeleteInput(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setDangerModal(false)}>Cancel</Button>
            <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 hover:bg-red-650 text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors">Confirm Deletion</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
