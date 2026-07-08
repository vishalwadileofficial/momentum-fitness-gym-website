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
import ProfileSub from './components/ProfileSub';
import MembershipSub from './components/MembershipSub';
import WorkoutsSub from './components/WorkoutsSub';
import NutritionSub from './components/NutritionSub';
import AppointmentsSub from './components/AppointmentsSub';
import ProgressSub from './components/ProgressSub';
import NotificationsSub from './components/NotificationsSub';
import SettingsSub from './components/SettingsSub';
import OverviewSub from './components/OverviewSub';

import { 
  purchaseMembership, getMembershipHistory, freezeMembership,
  getAvailableClasses, bookClass, cancelClassBooking,
  getTrainersRoster, requestTrainerAppointment, getMemberBookings,
  saveMemberProgress, getMemberProgressHistory,
  getNutritionLog, updateNutritionLog,
  getMemberNotifications, markNotificationsAsRead, deleteNotification,
  getAnnouncements, createNotification
} from '@/services/firebase/db';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=Athlete&background=ccff00&color=111&size=256';

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
                  setProfile={setProfile}
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


















