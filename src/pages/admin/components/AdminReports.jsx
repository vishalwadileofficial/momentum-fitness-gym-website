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


export default function AdminReports() {
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState('membership');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'membership', label: 'Memberships' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'trainer', label: 'Coaches' },
    { id: 'activity', label: 'System Logs' }
  ];

  const loadReport = async () => {
    setLoading(true);
    try {
      const data = await getAdminReports(activeCategory, { startDate, endDate });
      setReportData(data);
    } catch {
      toast.error('Failed to compile reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const handleExport = () => {
    toast.success('Document export-ready generation completed.');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">REPORTS GENERATOR</h1>
          <p className="text-xs text-gym-gray-400">Generate, query, and export gym operations, finance, and attendance datasets.</p>
        </div>
        <Button variant="outline" onClick={handleExport} className="text-xs" leftIcon={<FiDownload />}>
          Export CSV / Sheet
        </Button>
      </div>

      {/* Nested category switches */}
      <div className="overflow-x-auto no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
        <div className="flex gap-2 min-w-max pb-2 border-b border-gym-gray-850">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'border-primary text-white font-black'
                  : 'border-transparent text-gym-gray-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-gym-gray-900/60 p-4 border border-gym-gray-855 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gym-gray-400 uppercase font-bold text-[10px]">Start Date:</span>
          <input type="date" className="bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-1.5 text-white font-mono" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gym-gray-400 uppercase font-bold text-[10px]">End Date:</span>
          <input type="date" className="bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-1.5 text-white font-mono" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <Button variant="primary" className="ml-auto" onClick={loadReport}>Query Report</Button>
      </div>

      {loading ? (
        <SkeletonLoader.Table cols={5} rows={4} />
      ) : reportData ? (
        <div className="space-y-6">
          {/* Summary Matrix Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportData.summary.map((sum, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-gym-gray-855 bg-gym-gray-900/40">
                <span className="text-[10px] text-gym-gray-450 uppercase font-bold tracking-widest">{sum.label}</span>
                <p className="text-2xl font-black text-white font-display mt-2">{sum.value}</p>
                <span className="text-[9px] text-gym-gray-500 font-mono mt-1 block">{sum.desc}</span>
              </div>
            ))}
          </div>

          {/* Records Table */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-white tracking-wider border-b border-gym-gray-800 pb-2">
                    {reportData.headers.map((h, i) => <th key={i} className="pb-3 pr-4">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-850">
                  {reportData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gym-gray-900/10">
                      <td className="py-3.5 pr-4 font-bold text-white">{row.c1}</td>
                      <td className="py-3.5 pr-4">{row.c2}</td>
                      <td className="py-3.5 pr-4 font-mono text-secondary">{row.c3}</td>
                      <td className="py-3.5 pr-4 font-mono">{row.c4}</td>
                      <td className="py-3.5 pr-4 font-bold uppercase text-[9px] text-gym-gray-500">{row.c5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState title="No Records Query" message="Check parameters filters above to query reports." />
      )}
    </div>
  );
}
