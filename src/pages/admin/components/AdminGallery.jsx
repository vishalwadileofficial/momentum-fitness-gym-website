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


export default function AdminGallery() {
  const toast = useToast();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [photoModal, setPhotoModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '', category: 'Equipment' });
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const list = await getGalleryPhotos();
        setPhotos(list);
      } catch {
        toast.error('Gallery failed to load.');
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [toast]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newPhoto.url.trim()) return;
    try {
      const res = await uploadGalleryPhoto(newPhoto);
      setPhotos([res, ...photos]);
      setNewPhoto({ url: '', caption: '', category: 'Equipment' });
      setPhotoModal(false);
      toast.success('Media reference registered.');
    } catch {
      toast.error('Upload failed.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGalleryPhoto(id);
      setPhotos(photos.filter(p => p.id !== id));
      toast.success('Gallery media index deleted.');
    } catch {
      toast.error('Delete failed.');
    }
  };

  const filtered = photos.filter(p => categoryFilter === 'all' ? true : p.category === categoryFilter);

  if (loading) return <SkeletonLoader.Grid count={4} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">GALLERY INDEX</h1>
          <p className="text-xs text-gym-gray-400">Moderate showcasing photographic references in public index.</p>
        </div>
        <Button variant="primary" onClick={() => setPhotoModal(true)} leftIcon={<FiPlus />}>
          Add Media URL
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[10px] text-gym-gray-400 uppercase tracking-widest font-black block">Sort Index Grid</span>
        <select
          className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none font-bold"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Equipment">Equipment</option>
          <option value="Amenities">Amenities</option>
          <option value="Events">Events</option>
          <option value="Classes">Classes</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No Media Loaded" message="Roster is empty. Link layout URL structures on the top right panel." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="p-3 bg-gym-gray-900/60 border border-gym-gray-855 rounded-2xl space-y-3 group hover:border-primary transition-all duration-300">
              <div className="h-44 rounded-xl overflow-hidden relative cursor-pointer" onClick={() => setLightboxPhoto(p)}>
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs uppercase font-bold tracking-wider gap-1.5">
                  <FiEye /> Lightbox View
                </div>
              </div>
              <div className="flex justify-between items-center text-xs px-1">
                <div className="min-w-0 flex-1 pr-2">
                  <span className="text-[8px] font-black uppercase text-secondary block">{p.category}</span>
                  <span className="font-bold text-white truncate block mt-0.5">{p.caption}</span>
                </div>
                <button className="text-gym-gray-500 hover:text-red-400 transition-colors p-1 cursor-pointer" onClick={() => handleDelete(p.id)}>
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      <Modal isOpen={photoModal} onClose={() => setPhotoModal(false)} title="Link Showcase Media">
        <form onSubmit={handleUpload} className="space-y-4">
          <Input label="Media URL Link" required placeholder="https://placehold.co/600x400" value={newPhoto.url} onChange={e => setNewPhoto({ ...newPhoto, url: e.target.value })} />
          <Input label="Caption / Label" required placeholder="e.g. Rack platform layouts" value={newPhoto.caption} onChange={e => setNewPhoto({ ...newPhoto, caption: e.target.value })} />
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Group Classification category</label>
            <select
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
              value={newPhoto.category}
              onChange={e => setNewPhoto({ ...newPhoto, category: e.target.value })}
            >
              <option value="Equipment">Equipment</option>
              <option value="Amenities">Amenities</option>
              <option value="Events">Events</option>
              <option value="Classes">Classes</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setPhotoModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add Photo</Button>
          </div>
        </form>
      </Modal>

      {/* Interactive Lightbox Overlay */}
      <Modal isOpen={lightboxPhoto !== null} onClose={() => setLightboxPhoto(null)} title={lightboxPhoto?.caption || 'Showcase Details'}>
        {lightboxPhoto && (
          <div className="space-y-4">
            <div className="max-h-[400px] overflow-hidden rounded-xl bg-black">
              <img src={lightboxPhoto.url} alt={lightboxPhoto.caption} className="w-full h-full object-contain mx-auto" />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gym-gray-500">Category: <strong className="text-primary font-bold">{lightboxPhoto.category}</strong></span>
              <Button variant="outline" size="sm" onClick={() => setLightboxPhoto(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
