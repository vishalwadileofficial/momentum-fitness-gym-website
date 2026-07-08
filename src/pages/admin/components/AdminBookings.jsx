import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

export default function AdminBookings() {
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setBookings([
        { id: 1, client: 'Marcus Chen', type: 'Class Booking', details: 'Power & Barbell Club', date: 'Monday', time: '18:00', status: 'Approved' },
        { id: 2, client: 'Sarah Miller', type: 'Private Coach', details: 'with Sarah Rodriguez', date: '2026-07-10', time: '09:00', status: 'Pending' }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  const handleAction = useCallback((id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    toast.success(`Booking status changed to ${newStatus}.`);
  }, [toast]);

  const filtered = useMemo(() => {
    return bookings.filter(b => b.client.toLowerCase().includes(search.toLowerCase()) || b.details.toLowerCase().includes(search.toLowerCase()));
  }, [bookings, search]);

  if (loading) return <SkeletonLoader.Table cols={5} rows={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">MASTER APPOINTMENTS</h1>
        <p className="text-xs text-gym-gray-400">View and moderate all classes reservations and trainer schedules.</p>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-3 top-3.5 text-gym-gray-500" />
        <input 
          type="text" 
          placeholder="Search by member name or details..." 
          className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-10 py-3 text-xs text-white focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No Bookings Found" message="Try searching for another booking or check back later." />
      ) : (
        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gym-gray-400">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-white tracking-wider border-b border-gym-gray-800 pb-2">
                  <th className="pb-3 pr-4">Member Name</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Session Details</th>
                  <th className="pb-3 pr-4">Date/Time</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gym-gray-850">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gym-gray-900/10">
                    <td className="py-4 pr-4 font-semibold text-white">{b.client}</td>
                    <td className="py-4 pr-4 font-bold uppercase text-[9px] text-gym-gray-500">{b.type}</td>
                    <td className="py-4 pr-4 text-gym-gray-300">{b.details}</td>
                    <td className="py-4 pr-4">{b.date} @ {b.time}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                        b.status === 'Approved' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : b.status === 'Cancelled'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {b.status === 'Pending' && (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleAction(b.id, 'Approved')} className="px-2.5 py-1 bg-primary text-gym-dark font-bold text-[9px] uppercase tracking-wider rounded border border-primary/20 cursor-pointer">Approve</button>
                          <button onClick={() => handleAction(b.id, 'Cancelled')} className="px-2.5 py-1 bg-gym-gray-855 text-red-400 border border-gym-gray-700 font-bold text-[9px] uppercase tracking-wider rounded cursor-pointer">Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
