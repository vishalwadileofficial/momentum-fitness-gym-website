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


export default function AdminPlans() {
  const toast = useToast();
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Strength', price: 29, cycle: 'monthly' },
    { id: 2, name: 'Standard Athletic', price: 49, cycle: 'monthly' },
    { id: 3, name: 'Premium Athlete', price: 89, cycle: 'monthly' },
    { id: 4, name: 'Elite Performance', price: 199, cycle: 'monthly' }
  ]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [priceInput, setPriceInput] = useState('');

  const handleEditClick = (p) => {
    setEditingPlan(p);
    setPriceInput(p.price.toString());
  };

  const handleSavePrice = (e) => {
    e.preventDefault();
    if (!priceInput || isNaN(priceInput)) return;
    setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, price: parseInt(priceInput) } : p));
    setEditingPlan(null);
    toast.success('Membership rate configurations saved.');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">PRICING PLANS CONFIG</h1>
        <p className="text-xs text-gym-gray-400">Modify subscription costs, parameters, and billing models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 bg-gym-gray-900/40">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{p.name}</h4>
            <p className="text-3xl font-black text-primary font-mono">${p.price}<span className="text-xs text-gym-gray-500 font-semibold font-sans">/{p.cycle}</span></p>
            <Button variant="outline" className="w-full justify-center text-xs" onClick={() => handleEditClick(p)}>Edit Cost Rate</Button>
          </div>
        ))}
      </div>

      <Modal isOpen={editingPlan !== null} onClose={() => setEditingPlan(null)} title={`Edit Plan: ${editingPlan?.name}`}>
        <form onSubmit={handleSavePrice} className="space-y-4">
          <Input label="New Price Rate ($/mo)" type="number" required value={priceInput} onChange={e => setPriceInput(e.target.value)} />
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
