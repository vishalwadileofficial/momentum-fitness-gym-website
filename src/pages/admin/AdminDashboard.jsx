import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  FiUsers, FiTrendingUp, FiSettings, FiActivity, FiUser, 
  FiCalendar, FiCreditCard, FiBookOpen, FiImage, FiMail, 
  FiTrash2, FiPlus, FiUserCheck, FiStar, FiFileText, FiMessageSquare,
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
import ErrorBoundary from '@/components/ui/ErrorBoundary';

import { 
  getAdminOverviewMetrics, getAdminUsers, updateAdminUser, deleteAdminUser,
  getAnnouncements, createAnnouncement, deleteAnnouncement,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getBlogArticles, createBlogArticle, updateBlogArticle, deleteBlogArticle,
  getGalleryPhotos, uploadGalleryPhoto, deleteGalleryPhoto,
  getAdminReports
} from '@/services/firebase/db';

import AdminOverview from './components/AdminOverview';
import AdminUsers from './components/AdminUsers';
import AdminTrainers from './components/AdminTrainers';
import AdminPlans from './components/AdminPlans';
import AdminBookings from './components/AdminBookings';
import AdminBlogs from './components/AdminBlogs';
import AdminGallery from './components/AdminGallery';
import AdminMessages from './components/AdminMessages';
import AdminReports from './components/AdminReports';
import AdminTestimonials from './components/AdminTestimonials';
import AdminAnnouncements from './components/AdminAnnouncements';
import AdminSettings from './components/AdminSettings';

// --- MAIN WRAPPER ---


export default function AdminDashboard() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="trainers" element={<AdminTrainers />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </ErrorBoundary>
  );
}
