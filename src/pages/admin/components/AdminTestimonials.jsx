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


export default function AdminTestimonials() {
  const toast = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tstModal, setTstModal] = useState(false);
  const [editTst, setEditTst] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', role: '', quote: '', rating: 5, featured: false, photo: '' });

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const list = await getTestimonials();
        setTestimonials(list);
      } catch {
        toast.error('Testimonials failed to sync.');
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, [toast]);

  const handleFeaturedToggle = async (t) => {
    const featuredState = !t.featured;
    try {
      await updateTestimonial(t.id, { featured: featuredState });
      setTestimonials(testimonials.map(item => item.id === t.id ? { ...item, featured: featuredState } : item));
      toast.success(featuredState ? 'Highlight featured testimonials applied.' : 'Featured tag disabled.');
    } catch {
      toast.error('Update status failed.');
    }
  };

  const handleEditClick = (t) => {
    setEditTst(t);
    setFormData({ name: t.name, role: t.role, quote: t.quote, rating: t.rating || 5, featured: t.featured, photo: t.photo || '' });
    setTstModal(true);
  };

  const handleAddClick = () => {
    setEditTst(null);
    setFormData({ name: '', role: '', quote: '', rating: 5, featured: false, photo: '' });
    setTstModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    if (editTst) {
      try {
        await updateTestimonial(editTst.id, formData);
        setTestimonials(testimonials.map(item => item.id === editTst.id ? { ...item, ...formData } : item));
        toast.success('Testimonial summary record updated.');
        setTstModal(false);
      } catch {
        toast.error('Update failed.');
      }
    } else {
      try {
        const res = await createTestimonial(formData);
        setTestimonials([res, ...testimonials]);
        toast.success('New testimonial registered.');
        setTstModal(false);
      } catch {
        toast.error('Registration failed.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success('Testimonial removed from database.');
    } catch {
      toast.error('Deletion failed.');
    }
  };

  if (loading) return <SkeletonLoader.Grid count={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">TESTIMONIALS MANAGER</h1>
          <p className="text-xs text-gym-gray-400">Moderate member feedback and feature highlighted reviews on public site.</p>
        </div>
        <Button variant="primary" onClick={handleAddClick} leftIcon={<FiPlus />}>
          Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <EmptyState title="No Testimonials Found" message="Feedback catalog is empty. Tap Add Testimonial to log review items." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card p-6 rounded-2xl border border-gym-gray-850 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} className="fill-primary" />)}
                  </div>
                  <button 
                    onClick={() => handleFeaturedToggle(t)}
                    className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      t.featured 
                        ? 'bg-primary/25 border-primary text-primary'
                        : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-500'
                    }`}
                  >
                    Featured
                  </button>
                </div>
                <p className="text-xs text-gym-gray-300 mt-4 leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="pt-4 border-t border-gym-gray-855 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</h4>
                  <p className="text-[10px] text-gym-gray-500">{t.role}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gym-gray-400 hover:text-white p-1 transition-colors cursor-pointer" onClick={() => handleEditClick(t)}>
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="text-gym-gray-450 hover:text-red-400 p-1 transition-colors cursor-pointer" onClick={() => handleDelete(t.id)}>
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonial Form Modal */}
      <Modal isOpen={tstModal} onClose={() => setTstModal(false)} title={editTst ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input label="Member Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <Input label="Member Designation / Role" placeholder="e.g. Competitive Lifter" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Rating Score</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.rating}
                onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Featured Index</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.featured ? 'featured' : 'standard'}
                onChange={e => setFormData({ ...formData, featured: e.target.value === 'featured' })}
              >
                <option value="featured">Display Featured</option>
                <option value="standard">Standard Roster</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Quote Testimonial</label>
            <textarea
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none h-30 resize-none"
              required
              placeholder="Write the athlete's quote feedback here..."
              value={formData.quote}
              onChange={e => setFormData({ ...formData, quote: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setTstModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editTst ? 'Save Updates' : 'Add Testimonial'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
