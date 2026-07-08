import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTrendingUp, FiUsers, FiActivity, FiSettings, 
  FiCalendar, FiPlus, FiTrash2, FiStar, 
  FiBell, FiEye, FiCheck, FiX, FiFilter, FiDownload, FiSearch
} from 'react-icons/fi';
import { useToast } from '@/context/ToastContext';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import ErrorDisplay from '@/components/ui/ErrorDisplay';

import { 
  getAdminOverviewMetrics, getAdminUsers, updateAdminUser, deleteAdminUser,
  getAnnouncements, createAnnouncement, deleteAnnouncement,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getBlogArticles, createBlogArticle, updateBlogArticle, deleteBlogArticle,
  getGalleryPhotos, uploadGalleryPhoto, deleteGalleryPhoto,
  getAdminReports
} from '@/services/firebase/db';


export default function AdminAnnouncements() {
  const toast = useToast();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAnn, setNewAnn] = useState({ title: '', message: '', priority: 'Normal', expirationDate: '' });

  useEffect(() => {
    const loadAnn = async () => {
      try {
        const list = await getAnnouncements();
        setAnnouncements(list);
      } catch {
        toast.error('Announcements failed to sync.');
      } finally {
        setLoading(false);
      }
    };
    loadAnn();
  }, [toast]);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newAnn.title.trim() || !newAnn.message.trim()) return;

    try {
      const res = await createAnnouncement({
        ...newAnn,
        publishDate: new Date().toISOString().split('T')[0]
      });
      setAnnouncements([res, ...announcements]);
      setNewAnn({ title: '', message: '', priority: 'Normal', expirationDate: '' });
      toast.success('Announcement broadcast published to users.');
    } catch {
      toast.error('Failed to broadcast.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter(a => a.id !== id));
      toast.success('Announcement deleted from broadcast list.');
    } catch {
      toast.error('Deletion failed.');
    }
  };

  if (loading) return <SkeletonLoader.Table cols={4} rows={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">ANNOUNCEMENTS BROADCASTER</h1>
        <p className="text-xs text-gym-gray-400">Compose and publish notifications alerts broadcasts to members and coaches portals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handlePublish} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Publish Notice</h3>
          <Input label="Notice Title" required value={newAnn.title} onChange={e => setNewAnn({ ...newAnn, title: e.target.value })} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Priority</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={newAnn.priority}
                onChange={e => setNewAnn({ ...newAnn, priority: e.target.value })}
              >
                <option value="Normal">Normal</option>
                <option value="Medium">Medium</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Expiration Date</label>
              <input
                type="date"
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none font-mono"
                value={newAnn.expirationDate}
                onChange={e => setNewAnn({ ...newAnn, expirationDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Message Content</label>
            <textarea
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none h-24 resize-none"
              placeholder="Write the notice statement details here..."
              required
              value={newAnn.message}
              onChange={e => setNewAnn({ ...newAnn, message: e.target.value })}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center">Publish Broadcast</Button>
        </form>

        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
            <FiBell className="text-primary" /> Active Broadcasts List
          </h3>
          {announcements.length === 0 ? (
            <EmptyState title="No Active Notices" message="Broadcasting board is empty. Write alerts on the left panel." />
          ) : (
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="p-4 bg-gym-dark border border-gym-gray-855 rounded-xl flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">{a.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                        a.priority === 'Urgent' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : a.priority === 'Medium'
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            : 'bg-gym-gray-850 text-gym-gray-450 border-gym-gray-700'
                      }`}>
                        {a.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gym-gray-300 leading-relaxed leading-normal mt-1.5">{a.message}</p>
                    <p className="text-[9px] text-gym-gray-550 font-mono pt-1">
                      Published: {a.publishDate} &bull; Expiration: {a.expirationDate || 'Never'}
                    </p>
                  </div>
                  <button className="text-gym-gray-500 hover:text-red-400 transition-colors p-1 cursor-pointer" onClick={() => handleDelete(a.id)}>
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('account');
  const [preferences, setPreferences] = useState({
    emailOnSignup: true,
    emailOnPayment: true,
    pushOnSupport: false,
    theme: 'dark',
    accent: 'neon-lime',
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
      toast.success('System configuration parameters saved.');
    }, 400);
  };

  const handleResetData = () => {
    localStorage.clear();
    toast.success('System Cache Cleared. Reloading...');
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Administrative Security</h3>
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">System Notification Rules</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.emailOnSignup} onChange={e => setPreferences({ ...preferences, emailOnSignup: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Email digest on new athlete registrations</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.emailOnPayment} onChange={e => setPreferences({ ...preferences, emailOnPayment: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Email notice on plan transactions approvals</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" className="accent-primary" checked={preferences.pushOnSupport} onChange={e => setPreferences({ ...preferences, pushOnSupport: e.target.checked })} />
                <span className="text-xs text-gym-gray-300">Push notice on new support contact requests</span>
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
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">System Skin Style</h3>
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">System Style</label>
                <select className="bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-white focus:outline-none w-full font-bold" value={preferences.theme} onChange={e => setPreferences({ ...preferences, theme: e.target.value })}>
                  <option value="dark">Dark Luxury (Default)</option>
                  <option value="light">High Contrast Light</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">System Accent Color</label>
                <select className="bg-gym-dark border border-gym-gray-800 rounded px-3 py-2 text-white focus:outline-none w-full font-bold" value={preferences.accent} onChange={e => setPreferences({ ...preferences, accent: e.target.value })}>
                  <option value="neon-lime">Neon Lime (Primary)</option>
                  <option value="cyan">Electric Cyan (Secondary)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-2 border-t border-gym-gray-850">
              <Button type="submit" variant="primary" disabled={isPending}>Save Theme</Button>
            </div>
          </form>
        )}

        {/* Language Selection */}
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
