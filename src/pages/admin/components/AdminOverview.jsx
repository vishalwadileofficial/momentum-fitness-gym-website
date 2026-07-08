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


export default function AdminOverview() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const met = await getAdminOverviewMetrics();
        setMetrics(met);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, []);

  if (loading) return <SkeletonLoader.Grid count={4} />;
  if (error) return <ErrorDisplay title="Database Warning" message={error} />;

  const stats = [
    { label: 'Monthly Revenue', value: `$${metrics.monthlyRevenue.toLocaleString()}`, icon: <FiTrendingUp />, trend: { value: `+${metrics.growthRate}%`, isPositive: true }, colorType: 'primary' },
    { label: 'Active Members', value: `${metrics.activeMembers}`, icon: <FiUsers />, trend: { value: '+4.2%', isPositive: true }, colorType: 'secondary' },
    { label: 'Staff Coaches', value: `${metrics.totalTrainers || 6}`, icon: <FiActivity />, description: 'All active on floor', colorType: 'pink' },
    { label: 'Gym Floor Load', value: '45%', icon: <FiSettings />, description: 'Optimal load today', colorType: 'primary' }
  ];

  const revenueData = [
    { label: 'Jan', value: 72000 },
    { label: 'Feb', value: 75000 },
    { label: 'Mar', value: 78000 },
    { label: 'Apr', value: 76000 },
    { label: 'May', value: 80000 },
    { label: 'Jun', value: metrics.monthlyRevenue }
  ];

  const memberData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 105 },
    { label: 'Mar', value: 110 },
    { label: 'Apr', value: 115 },
    { label: 'May', value: 118 },
    { label: 'Jun', value: metrics.activeMembers }
  ];

  const adminLogs = [
    { id: 1, action: 'Member Joined', target: 'Elite Plan', user: { name: 'James Foster' }, timestamp: 'Just now', status: 'success' },
    { id: 2, action: 'Dietary Log Synced', target: 'for Marcus Chen', user: { name: 'Coach Sarah' }, timestamp: '10m ago', status: 'info' },
    { id: 3, action: 'Contrast Suite Check', target: 'Recovery plumbing verified', user: { name: 'Admin Desk' }, timestamp: '1h ago', status: 'success' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">ADMIN COMMAND CENTER</h1>
        <p className="text-xs text-gym-gray-400">Track operations, metrics, and manage user bases.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, idx) => (
          <StatCard key={idx} {...st} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardChart 
          title="Monthly Revenue Trend"
          subtitle="Gross income comparison MoM"
          totalValue={`$${metrics.monthlyRevenue.toLocaleString()}`}
          trend={{ value: `+${metrics.growthRate}%`, isPositive: true }}
          data={revenueData}
          layout="line"
          colorType="primary"
        />

        <DashboardChart 
          title="Member Count Growth"
          subtitle="Active registered members index"
          totalValue={`${metrics.activeMembers}`}
          trend={{ value: '+4.2%', isPositive: true }}
          data={memberData}
          layout="line"
          colorType="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityFeed title="Live System Audit" activities={adminLogs} />
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit bg-gym-gray-900/40">
          <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
            <FiSettings className="text-primary" /> Command Shortcuts
          </h3>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <Link to="users" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
              <FiUsers className="text-primary shrink-0" /> Manage Members Registry
            </Link>
            <Link to="bookings" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
              <FiCalendar className="text-primary shrink-0" /> View Session Bookings
            </Link>
            <Link to="reports" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
              <FiTrendingUp className="text-primary shrink-0" /> Generate Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
