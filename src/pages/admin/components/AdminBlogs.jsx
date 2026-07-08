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

export default function AdminBlogs() {
  const toast = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [blogModal, setBlogModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', category: 'Training', content: '', published: true });

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const list = await getBlogArticles();
        setBlogs(list);
      } catch {
        toast.error('Blogs failed to sync.');
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, [toast]);

  const handlePublishToggle = useCallback(async (b) => {
    const targetState = !b.published;
    try {
      await updateBlogArticle(b.id, { published: targetState });
      setBlogs(prev => prev.map(item => item.id === b.id ? { ...item, published: targetState } : item));
      toast.success(targetState ? 'Blog article published.' : 'Blog article unpublished.');
    } catch {
      toast.error('Update failed.');
    }
  }, [toast]);

  const handleEditClick = useCallback((b) => {
    setEditBlog(b);
    setFormData({ title: b.title, author: b.author, category: b.category, content: b.content || '', published: b.published });
    setBlogModal(true);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditBlog(null);
    setFormData({ title: '', author: '', category: 'Training', content: '', published: true });
    setBlogModal(true);
  }, []);

  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editBlog) {
      try {
        await updateBlogArticle(editBlog.id, formData);
        setBlogs(prev => prev.map(item => item.id === editBlog.id ? { ...item, ...formData } : item));
        toast.success('Blog article updated.');
        setBlogModal(false);
      } catch {
        toast.error('Update failed.');
      }
    } else {
      try {
        const res = await createBlogArticle(formData);
        setBlogs(prev => [res, ...prev]);
        toast.success('Sports science blog article published.');
        setBlogModal(false);
      } catch {
        toast.error('Publish failed.');
      }
    }
  }, [formData, editBlog, toast]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteBlogArticle(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
      toast.success('Blog article removed.');
    } catch {
      toast.error('Deletion failed.');
    }
  }, [toast]);

  const filtered = useMemo(() => {
    return blogs.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.content?.toLowerCase().includes(search.toLowerCase());
      const matchesCat = categoryFilter === 'all' ? true : b.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [blogs, search, categoryFilter]);

  if (loading) return <SkeletonLoader.Grid count={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">BLOGS PUBLISHER</h1>
          <p className="text-xs text-gym-gray-400">Compose, publish, or edit physical conditioning guides.</p>
        </div>
        <Button variant="primary" onClick={handleAddClick} leftIcon={<FiPlus />}>
          Create Article
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3.5 text-gym-gray-500" />
          <input 
            type="text" 
            placeholder="Search article titles or content..." 
            className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-10 py-3 text-xs text-white focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none font-bold"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Training">Training</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Recovery">Recovery</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No Articles Found" message="Roster is empty. Tap Create Article to publish science guides." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <div key={b.id} className="glass-card p-6 rounded-2xl border border-gym-gray-850 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded tracking-wider border border-primary/20">{b.category}</span>
                  <span className="text-[10px] text-gym-gray-550 font-mono font-medium">{b.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-2.5 leading-normal">{b.title}</h4>
                <p className="text-[10px] text-gym-gray-400 mt-1">By {b.author}</p>
                <p className="text-xs text-gym-gray-500 mt-3 line-clamp-3 leading-relaxed">{b.content || 'No description preview available.'}</p>
              </div>

              <div className="pt-4 border-t border-gym-gray-850 flex justify-between items-center text-xs">
                <button 
                  onClick={() => handlePublishToggle(b)}
                  className={`font-black uppercase tracking-widest text-[9px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                    b.published 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/25'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/25'
                  }`}
                >
                  {b.published ? 'Published' : 'Draft'}
                </button>
                <div className="flex gap-2">
                  <button className="text-gym-gray-400 hover:text-white p-1 transition-colors cursor-pointer" onClick={() => handleEditClick(b)}>
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="text-gym-gray-450 hover:text-red-400 p-1 transition-colors cursor-pointer" onClick={() => handleDelete(b.id)}>
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal isOpen={blogModal} onClose={() => setBlogModal(false)} title={editBlog ? 'Edit Article' : 'Create Article'}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input label="Title" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <Input label="Author" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Category</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Training">Training</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Recovery">Recovery</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Status</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.published ? 'published' : 'draft'}
                onChange={e => setFormData({ ...formData, published: e.target.value === 'published' })}
              >
                <option value="published">Publish Immediately</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Article Content</label>
            <textarea
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none h-40 resize-none"
              placeholder="Write the sports science or nutrition advice content here..."
              required
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setBlogModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editBlog ? 'Save Updates' : 'Publish Article'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
