import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  FiCalendar, FiTarget, FiActivity, FiSettings, FiCheckCircle, 
  FiUser, FiAward, FiCoffee, FiTrendingUp, FiBell, FiTrash2, 
  FiInfo, FiLock, FiShield, FiPlus, FiCheck, FiX, FiLayers, FiAlertCircle
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

import { 
  purchaseMembership, getMembershipHistory, freezeMembership,
  getAvailableClasses, bookClass, cancelClassBooking,
  getTrainersRoster, requestTrainerAppointment, getMemberBookings,
  saveMemberProgress, getMemberProgressHistory,
  getNutritionLog, updateNutritionLog,
  getMemberNotifications, markNotificationsAsRead, deleteNotification,
  getAnnouncements, createNotification
} from '@/services/firebase/db';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80';

export default function MemberDashboard() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const location = useLocation();

  // Shared States (synchronized with Firestore/localStorage)
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Marcus Chen',
    email: currentUser?.email || 'marcus.chen@gmail.com',
    phone: '+44 (20) 7946 0192',
    plan: currentUser?.plan || 'Elite Performance',
    id: 'MM-48201',
    weight: 84.2,
    height: 182,
    bodyFat: 14.5,
    targetCalories: 2800,
    avatar: ''
  });

  const [activeBookings, setActiveBookings] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [progressHistory, setProgressHistory] = useState([]);
  const [nutrition, setNutrition] = useState({
    proteinTarget: 180,
    carbTarget: 320,
    fatTarget: 80,
    waterTarget: 3.5,
    waterIntake: 1.5,
    meals: []
  });
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [membershipHistory, setMembershipHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync user values
  useEffect(() => {
    if (currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        plan: currentUser.plan || prev.plan,
        uid: currentUser.uid
      }));
    }
  }, [currentUser]);

  // Load database values
  useEffect(() => {
    if (!currentUser?.uid) return;
    
    const loadData = async () => {
      setLoading(true);
      try {
        const memHist = await getMembershipHistory(currentUser.uid);
        setMembershipHistory(memHist);

        const appts = await getMemberBookings(currentUser.uid);
        setActiveBookings(appts);

        const cl = await getAvailableClasses();
        setAvailableClasses(cl);

        const tr = await getTrainersRoster();
        setTrainers(tr);

        const prog = await getMemberProgressHistory(currentUser.uid);
        setProgressHistory(prog);

        const nutr = await getNutritionLog(currentUser.uid);
        if (nutr) setNutrition(nutr);

        const notifs = await getMemberNotifications(currentUser.uid);
        setNotifications(notifs);

        const anns = await getAnnouncements();
        // filter expired announcements
        const todayStr = new Date().toISOString().split('T')[0];
        const activeAnns = anns.filter(a => !a.expirationDate || a.expirationDate >= todayStr);
        setAnnouncements(activeAnns);
      } catch {
        setError('Connection interrupted. Displaying offline datasets.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser]);

  const activeTab = location.pathname.split('/member/')[1] || '';

  const tabs = [
    { path: '', label: 'Overview', icon: <FiLayers /> },
    { path: 'profile', label: 'Profile', icon: <FiUser /> },
    { path: 'membership', label: 'Membership', icon: <FiAward /> },
    { path: 'workouts', label: 'Workout Plan', icon: <FiActivity /> },
    { path: 'nutrition', label: 'Nutrition Plan', icon: <FiCoffee /> },
    { path: 'appointments', label: 'Appointments', icon: <FiCalendar /> },
    { path: 'progress', label: 'Progress', icon: <FiTrendingUp /> },
    { path: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { path: 'settings', label: 'Settings', icon: <FiSettings /> }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <SkeletonLoader.Line width="w-1/4" height="h-8" />
        <SkeletonLoader.Grid count={3} />
        <SkeletonLoader.Table cols={4} rows={3} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Athlete Portal | Momentum Fitness</title>
      </Helmet>

      <ErrorBoundary>
        <div className="space-y-6">
          {error && <ErrorDisplay title="Database Sync Warning" message={error} onClose={() => setError(null)} />}

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gym-gray-800 pb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black font-display text-white tracking-tight uppercase">
                ATHLETE PORTAL
              </h1>
              <p className="text-xs text-gym-gray-400 mt-1">
                Welcome back, <span className="text-white font-bold">{profile.name}</span> (ID: {profile.id})
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gym-gray-900 border border-gym-gray-800 px-4 py-2 rounded-xl">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(204,255,0,0.8)]"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {profile.plan} Plan Active
              </span>
            </div>
          </div>

          {/* Nested Nav */}
          <div className="overflow-x-auto no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex gap-2 min-w-max pb-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.path;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path === '' ? '/member' : `/member/${tab.path}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-gym-dark border-primary shadow-[0_4px_15px_rgba(204,255,0,0.25)]'
                        : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-400 hover:text-white hover:border-gym-gray-700'
                    }`}
                  >
                    <span className="text-sm shrink-0">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {tab.path === 'notifications' && unreadCount > 0 && (
                      <span className={`ml-1 w-5 h-5 flex items-center justify-center rounded-full text-[9px] font-black ${
                        isActive ? 'bg-gym-dark text-primary' : 'bg-primary text-gym-dark'
                      }`}>
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Dashboard Subpaths Router */}
          <div className="mt-4">
            <Routes>
              <Route index element={
                <OverviewSub 
                  profile={profile} 
                  activeBookings={activeBookings} 
                  nutrition={nutrition} 
                  notifications={notifications}
                  announcements={announcements}
                  toast={toast}
                  setActiveBookings={setActiveBookings}
                />
              } />
              <Route path="profile" element={
                <ProfileSub 
                  profile={profile} 
                  setProfile={setProfile} 
                  toast={toast}
                />
              } />
              <Route path="membership" element={
                <MembershipSub 
                  profile={profile} 
                  setProfile={setProfile} 
                  membershipHistory={membershipHistory}
                  setMembershipHistory={setMembershipHistory}
                  toast={toast}
                />
              } />
              <Route path="workouts" element={
                <WorkoutsSub 
                  toast={toast}
                />
              } />
              <Route path="nutrition" element={
                <NutritionSub 
                  nutrition={nutrition} 
                  setNutrition={setNutrition} 
                  profile={profile}
                  toast={toast}
                />
              } />
              <Route path="appointments" element={
                <AppointmentsSub 
                  activeBookings={activeBookings} 
                  setActiveBookings={setActiveBookings}
                  availableClasses={availableClasses}
                  trainers={trainers}
                  profile={profile}
                  toast={toast}
                />
              } />
              <Route path="progress" element={
                <ProgressSub 
                  progressHistory={progressHistory} 
                  setProgressHistory={setProgressHistory}
                  profile={profile}
                  toast={toast}
                />
              } />
              <Route path="notifications" element={
                <NotificationsSub 
                  notifications={notifications} 
                  setNotifications={setNotifications} 
                  profile={profile}
                  toast={toast}
                />
              } />
              <Route path="settings" element={
                <SettingsSub 
                  profile={profile}
                  toast={toast}
                />
              } />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

/* ============================================================================
   SUBPAGE 1: OVERVIEW SUB COMPONENT
   ============================================================================ */
function OverviewSub({ profile, activeBookings, nutrition, notifications, announcements, toast, setActiveBookings }) {
  const caloriesConsumed = nutrition.meals
    ? nutrition.meals.filter(m => m.checked).reduce((sum, m) => sum + m.calories, 0)
    : 1174;

  const macroText = nutrition.meals
    ? `P: ${nutrition.proteinTarget}g | C: ${nutrition.carbTarget}g | F: ${nutrition.fatTarget}g`
    : 'P: 180g | C: 320g | F: 80g';

  const upcomingClasses = activeBookings.filter(b => b.type === 'class');

  const handleCancelBooking = async (id) => {
    try {
      await cancelClassBooking(profile.uid || 'guest', id);
      setActiveBookings(prev => prev.filter(b => b.id !== id));
      toast.success('Reservation successfully cancelled.');
    } catch {
      toast.error('Could not cancel booking.');
    }
  };

  const overviewLogs = notifications.slice(0, 3).map(n => ({
    id: n.id,
    action: n.title,
    target: n.message,
    timestamp: n.date,
    status: n.read ? 'info' : 'success',
    icon: <FiBell className="text-primary" />
  }));

  const urgentAnn = announcements.find(a => a.priority === 'Urgent');

  return (
    <div className="space-y-6">
      {/* Announcements Alert Banner */}
      {urgentAnn && (
        <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-2xl flex items-start gap-3 text-red-200">
          <FiAlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Broadcast Alert: {urgentAnn.title}</h4>
            <p className="text-[11px] leading-relaxed mt-1">{urgentAnn.message}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          label="Membership Level"
          value={profile.plan}
          icon={<FiShield />}
          colorType="primary"
          description="Access status: Unlimited ACTIVE"
        />
        <StatCard
          label="Calories Consumed Today"
          value={`${caloriesConsumed} / ${profile.targetCalories} kcal`}
          icon={<FiCoffee />}
          colorType="pink"
          description={macroText}
          trend={{ value: `${Math.round((caloriesConsumed / profile.targetCalories) * 100)}% Target`, isPositive: caloriesConsumed <= profile.targetCalories }}
        />
        <StatCard
          label="Attendance Metrics"
          value="18 Visits"
          icon={<FiActivity />}
          colorType="secondary"
          trend={{ value: "+12.5%", isPositive: true }}
          description="92% Consistency this month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Announcements index */}
          {announcements.length > 0 && (
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
              <h3 className="text-xs uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3 mb-4">
                <FiBell className="text-primary" /> Active Gym Notices
              </h3>
              <div className="space-y-3">
                {announcements.map((a) => (
                  <div key={a.id} className="p-3 bg-gym-dark border border-gym-gray-855 rounded-xl space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{a.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        a.priority === 'Urgent' ? 'bg-red-500/10 text-red-400' : 'bg-gym-gray-850 text-gym-gray-400'
                      }`}>
                        {a.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-gym-gray-400 mt-1 leading-normal">{a.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classes Table */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-gym-gray-800 pb-4 mb-4">
              <FiCalendar className="text-primary" /> Upcoming Class Sessions
            </h3>
            {upcomingClasses.length === 0 ? (
              <EmptyState title="No Classes Booked" message=" Roster is empty. Choose class listings under Appointments tab." />
            ) : (
              <div className="space-y-3">
                {upcomingClasses.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gym-dark border border-gym-gray-800 rounded-xl">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-white">{item.className}</p>
                      <p className="text-xs text-gym-gray-400">Coach: {item.trainer} | Room: {item.room}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-primary font-bold block">{item.date} @ {item.time}</span>
                      <button 
                        onClick={() => handleCancelBooking(item.id)}
                        className="text-[10px] text-red-400 hover:underline uppercase font-bold mt-1 cursor-pointer"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-gym-gray-800 pb-4">
              <FiSettings className="text-primary" /> Shortcuts
            </h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <Link to="appointments" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCheckCircle className="text-primary shrink-0" /> Book Class Slots
              </Link>
              <Link to="nutrition" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCheckCircle className="text-primary shrink-0" /> Log Meal Progress
              </Link>
              <Link to="progress" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCheckCircle className="text-primary shrink-0" /> Update Biometrics
              </Link>
            </div>
          </div>

          <ActivityFeed title="Recent Alerts" activities={overviewLogs.length > 0 ? overviewLogs : [
            { id: 1, action: 'Gym membership verified', target: 'Access credential clear', timestamp: 'Just now', status: 'success', icon: <FiShield className="text-primary" /> }
          ]} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SUBPAGE 2: PROFILE SUB COMPONENT
   ============================================================================ */
function ProfileSub({ profile, setProfile, toast }) {
  const [formData, setFormData] = useState({ ...profile });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
    toast.success('Security password credentials updated.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 text-center flex flex-col items-center justify-center space-y-4">
        <span className="text-[10px] text-gym-gray-500 uppercase tracking-widest font-black block">Avatar Photo</span>
        <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-primary bg-gym-gray-950">
          <img 
            src={profile.avatar || DEFAULT_AVATAR} 
            alt={profile.name} 
            className="w-full h-full object-cover"
          />
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
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="New Password"
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" variant="outline">Update Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================================
   SUBPAGE 3: MEMBERSHIP SUB COMPONENT
   ============================================================================ */
function MembershipSub({ profile, setProfile, membershipHistory, setMembershipHistory, toast }) {
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

/* ============================================================================
   SUBPAGE 4: WORKOUT PLANS SUB COMPONENT
   ============================================================================ */
function WorkoutsSub({ toast }) {
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

/* ============================================================================
   SUBPAGE 5: NUTRITION PLANS SUB COMPONENT
   ============================================================================ */
function NutritionSub({ nutrition, setNutrition, profile, toast }) {
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
      console.warn('Offline local sync applied.');
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
      console.warn('Sync pending.');
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

/* ============================================================================
   SUBPAGE 6: APPOINTMENTS SUB COMPONENT
   ============================================================================ */
function AppointmentsSub({ activeBookings, setActiveBookings, availableClasses, trainers, profile, toast }) {
  const [activeSegment, setActiveSegment] = useState('classes'); // classes or private
  const [classBookingModal, setClassBookingModal] = useState(null);
  
  const [coachBookingModal, setCoachBookingModal] = useState(null);
  const [apptDetails, setApptDetails] = useState({ date: '', time: '', focus: '' });

  const handleBookClass = async () => {
    try {
      const res = await bookClass(profile.uid || 'guest', profile.name, classBookingModal);
      setActiveBookings(prev => [{ ...res, id: Math.random().toString() }, ...prev]);
      await createNotification(profile.uid || 'guest', 'Class Booked', `You reserved a spot in ${classBookingModal.name}.`, 'success');
      setClassBookingModal(null);
      toast.success(`Success! Spot reserved in ${classBookingModal.name}.`);
    } catch {
      toast.error('Booking failed.');
    }
  };

  const handleBookCoach = async (e) => {
    e.preventDefault();
    if (!apptDetails.date || !apptDetails.time || !apptDetails.focus.trim()) {
      toast.error('Please fill in appointment details.');
      return;
    }

    try {
      const res = await requestTrainerAppointment(profile.uid || 'guest', profile.name, {
        trainerId: coachBookingModal.id,
        trainerName: coachBookingModal.name,
        date: apptDetails.date,
        time: apptDetails.time,
        focus: apptDetails.focus
      });
      setActiveBookings(prev => [res, ...prev]);
      await createNotification(profile.uid || 'guest', 'Trainer Requested', `1-on-1 private coaching session requested with ${coachBookingModal.name}.`, 'info');
      setCoachBookingModal(null);
      setApptDetails({ date: '', time: '', focus: '' });
      toast.success(`Private coaching session requested with ${coachBookingModal.name}.`);
    } catch {
      toast.error('Request failed.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex border-b border-gym-gray-800">
        <button
          onClick={() => setActiveSegment('classes')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
            activeSegment === 'classes' ? 'border-primary text-white' : 'border-transparent text-gym-gray-500 hover:text-white'
          }`}
        >
          Scheduled Classes Roster
        </button>
        <button
          onClick={() => setActiveSegment('private')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
            activeSegment === 'private' ? 'border-primary text-white' : 'border-transparent text-gym-gray-500 hover:text-white'
          }`}
        >
          Book 1-on-1 Personal Trainer
        </button>
      </div>

      {activeSegment === 'classes' ? (
        <div className="space-y-4">
          {availableClasses.map((item) => {
            const isBooked = activeBookings.some(b => b.type === 'class' && b.classId === item.id);
            return (
              <div key={item.id} className="glass-card p-5 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{item.name}</h4>
                  <p className="text-xs text-gym-gray-400">Coach: {item.trainer} &bull; Room: {item.room}</p>
                  <p className="text-[10px] text-gym-gray-500">Day: {item.date} &bull; Time: {item.time} &bull; Capacity: {item.booked}/{item.capacity}</p>
                </div>
                <div>
                  {isBooked ? (
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded block text-center border border-primary/20">Reserved</span>
                  ) : (
                    <Button variant="primary" onClick={() => setClassBookingModal(item)}>Reserve Spot</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainers.map((tr) => (
            <div key={tr.id} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white">{tr.name}</h4>
                  <span className="text-[10px] text-primary font-bold">Rating: {tr.rating}</span>
                </div>
                <p className="text-[10px] text-gym-gray-400 uppercase tracking-wider mt-1">{tr.specialty}</p>
                <p className="text-xs text-gym-gray-500 mt-2 italic">"{tr.bio}"</p>
                <p className="text-[10px] text-gym-gray-550 mt-2 font-bold uppercase">Experience: {tr.experience}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gym-gray-855/40">
                <Button variant="secondary" className="w-full justify-center" onClick={() => setCoachBookingModal(tr)}>Request Booking</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Class Confirmation modal */}
      <Modal isOpen={classBookingModal !== null} onClose={() => setClassBookingModal(null)} title="Class Reservation">
        <div className="space-y-4">
          <p className="text-xs text-gym-gray-400 leading-relaxed">
            Confirm your reservation for <strong className="text-white">{classBookingModal?.name}</strong> led by coach <strong className="text-white">{classBookingModal?.trainer}</strong>. Room: {classBookingModal?.room}.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setClassBookingModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleBookClass}>Confirm Booking</Button>
          </div>
        </div>
      </Modal>

      {/* Trainer Booking modal */}
      <Modal isOpen={coachBookingModal !== null} onClose={() => setCoachBookingModal(null)} title={`Book Session with ${coachBookingModal?.name}`}>
        <form onSubmit={handleBookCoach} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Session Date</label>
              <input 
                type="date"
                required
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono font-bold"
                value={apptDetails.date}
                onChange={(e) => setApptDetails({ ...apptDetails, date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Session Time</label>
              <input 
                type="time"
                required
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary font-mono font-bold"
                value={apptDetails.time}
                onChange={(e) => setApptDetails({ ...apptDetails, time: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Focus / Goals of Session</label>
            <textarea 
              required
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary h-20 resize-none"
              placeholder="e.g. Back squat sticking point biomechanics"
              value={apptDetails.focus}
              onChange={(e) => setApptDetails({ ...apptDetails, focus: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setCoachBookingModal(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Confirm Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================================================================
   SUBPAGE 7: PROGRESS SUB COMPONENT
   ============================================================================ */
function ProgressSub({ progressHistory, setProgressHistory, profile, toast }) {
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

/* ============================================================================
   SUBPAGE 8: NOTIFICATIONS SUB COMPONENT
   ============================================================================ */
function NotificationsSub({ notifications, setNotifications, profile, toast }) {
  const handleMarkRead = async (id) => {
    try {
      await markNotificationsAsRead(profile.uid || 'guest', id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch {
      toast.error('Sync issue.');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsAsRead(profile.uid || 'guest');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read.');
    } catch {
      toast.error('Mark read failed.');
    }
  };

  const handleDeleteNotif = async (id) => {
    try {
      await deleteNotification(profile.uid || 'guest', id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      toast.success('Notification removed.');
    } catch {
      toast.error('Failed to remove.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b border-gym-gray-800 pb-3 mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
          <FiBell className="text-primary" /> Inbox Alerts
        </h3>
        {notifications.some(n => !n.read) && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark All Read</Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="Inbox Empty" message="All alerts processed. You are all set." icon="info" />
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 rounded-xl border flex justify-between items-start gap-4 transition-all ${
                item.read 
                  ? 'bg-gym-gray-900/20 border-gym-gray-850 opacity-60' 
                  : 'bg-gym-gray-900/60 border-primary/20 shadow-[0_0_12px_rgba(204,255,0,0.05)]'
              }`}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">{item.title}</h4>
                  {!item.read && <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>}
                </div>
                <p className="text-xs text-gym-gray-400 leading-relaxed leading-normal">{item.message}</p>
                <p className="text-[9px] text-gym-gray-550 italic font-mono pt-1">{item.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {!item.read && (
                  <button 
                    onClick={() => handleMarkRead(item.id)}
                    className="text-[9px] text-primary hover:underline font-bold uppercase cursor-pointer"
                  >
                    Read
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteNotif(item.id)}
                  className="text-gym-gray-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                  aria-label="Delete notification"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   SUBPAGE 9: SETTINGS SUB COMPONENT
   ============================================================================ */
function SettingsSub({ profile, setProfile, toast }) {
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
