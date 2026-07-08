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


export default function AdminTrainers() {
  const toast = useToast();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTrainer, setNewTrainer] = useState({ name: '', specialty: '', experience: '' });

  useEffect(() => {
    // Mock simulation
    setTimeout(() => {
      setTrainers([
        { id: 't1', name: 'Marcus Vance', specialty: 'Power & Barbell Training', experience: '12 Years', rating: '4.95' },
        { id: 't2', name: 'Sarah Rodriguez', specialty: 'HIIT & Metabolic Conditioning', experience: '8 Years', rating: '5.00' }
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!newTrainer.name.trim()) return;
    const item = {
      id: Math.random().toString(),
      name: newTrainer.name.trim(),
      specialty: newTrainer.specialty.trim() || 'Coaching Specialty',
      experience: newTrainer.experience.trim() || '1 Year',
      rating: '5.00'
    };
    setTrainers([...trainers, item]);
    setNewTrainer({ name: '', specialty: '', experience: '' });
    toast.success('New trainer successfully added to roster.');
  };

  const handleDeleteTrainer = (id) => {
    setTrainers(trainers.filter(t => t.id !== id));
    toast.success('Trainer removed from staff roster.');
  };

  if (loading) return <SkeletonLoader.Grid count={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">STAFF ROSTER</h1>
        <p className="text-xs text-gym-gray-400">Roster management, add new certified coaches, or edit profile lists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleAddTrainer} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Add Trainer</h3>
          <Input label="Name" required value={newTrainer.name} onChange={e => setNewTrainer({ ...newTrainer, name: e.target.value })} />
          <Input label="Specialty" value={newTrainer.specialty} onChange={e => setNewTrainer({ ...newTrainer, specialty: e.target.value })} />
          <Input label="Experience" value={newTrainer.experience} onChange={e => setNewTrainer({ ...newTrainer, experience: e.target.value })} />
          <Button type="submit" variant="primary" className="w-full justify-center">Add Staff Coach</Button>
        </form>

        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
            <FiActivity className="text-primary" /> Active Trainers List
          </h3>
          {trainers.length === 0 ? (
            <EmptyState title="No Trainers Catalogued" message=" Roster is empty. Register coach profiles on the left panel." />
          ) : (
            <div className="space-y-3">
              {trainers.map(t => (
                <div key={t.id} className="p-4 bg-gym-dark border border-gym-gray-855 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-gym-gray-400 mt-1">{t.specialty} &bull; {t.experience} Experience</p>
                  </div>
                  <button className="text-gym-gray-500 hover:text-red-400 transition-colors cursor-pointer" onClick={() => handleDeleteTrainer(t.id)}>
                    <FiTrash2 className="w-4.5 h-4.5" />
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
