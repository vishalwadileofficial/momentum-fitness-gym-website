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


export default function AdminMessages() {
  const toast = useToast();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'David Laurent', email: 'david@laurent.com', subject: 'Corporate wellness rates query', body: 'Requesting rate information for Acme corp employees group coaching packages.', date: 'Today' }
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    setSelectedMessage(null);
    toast.success('Inquiry archive logs deleted.');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">INBOX MESSAGES</h1>
        <p className="text-xs text-gym-gray-400">Review corporate rate inquiries, contact queries, and site submissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Messages List</h3>
          {messages.length === 0 ? (
            <EmptyState title="Inbox Empty" message="All inquiry logs processed. Nice work!" />
          ) : (
            <div className="space-y-2">
              {messages.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMessage(m)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    selectedMessage?.id === m.id
                      ? 'bg-primary/10 border-primary text-white'
                      : 'bg-gym-gray-900 border-gym-gray-850 text-gym-gray-300 hover:border-gym-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold">
                    <span className="truncate max-w-[120px]">{m.sender}</span>
                    <span className="text-[9px] text-gym-gray-500 font-normal">{m.date}</span>
                  </div>
                  <p className="text-[10px] text-gym-gray-400 truncate mt-1">{m.subject}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-6">
              <div className="flex justify-between items-start border-b border-gym-gray-800 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{selectedMessage.subject}</h3>
                  <p className="text-xs text-gym-gray-400 mt-1">From: {selectedMessage.sender} ({selectedMessage.email})</p>
                </div>
                <button className="text-gym-gray-500 hover:text-red-400 p-1 cursor-pointer transition-colors" onClick={() => handleDeleteMessage(selectedMessage.id)}>
                  <FiTrash2 className="w-4.5 h-4.5" />
                </button>
              </div>
              <p className="text-xs text-gym-gray-300 leading-relaxed font-sans select-text">{selectedMessage.body}</p>
            </div>
          ) : (
            <div className="glass-card p-12 rounded-2xl border border-gym-gray-800 text-center bg-gym-gray-900/40">
              <p className="text-xs text-gym-gray-500">Select an inbound message to view its body contents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
