const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'pages', 'admin', 'AdminDashboard.jsx');
const compDir = path.join(__dirname, 'src', 'pages', 'admin', 'components');

if (!fs.existsSync(compDir)) {
  fs.mkdirSync(compDir, { recursive: true });
}

const content = fs.readFileSync(file, 'utf8');

const mainWrapperSplit = content.split('// --- MAIN WRAPPER ---');
const topAndComponents = mainWrapperSplit[0];
const mainWrapper = mainWrapperSplit[1];

const subSplit = topAndComponents.split('// --- SUB-COMPONENTS ---');
const topImports = subSplit[0].trim();
let componentsPart = subSplit[1];

// Also remove React import if they need link from react-router-dom etc.
const commonImports = `import React, { useState, useEffect } from 'react';
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
`;

const components = [
  'AdminOverview', 'AdminUsers', 'AdminTrainers', 'AdminPlans',
  'AdminBookings', 'AdminBlogs', 'AdminGallery', 'AdminMessages',
  'AdminReports', 'AdminTestimonials', 'AdminAnnouncements', 'AdminSettings'
];

// Use regex to find each component block
let extractedNames = [];
components.forEach((compName) => {
  // Matches from `function CompName()` up to the next `/* ===` or end of string
  const regex = new RegExp(`(function ${compName}\\(\\) {[\\s\\S]*?)(?=\\/\\* ===|$)`);
  const match = componentsPart.match(regex);
  if (match) {
    const compCode = match[1].trim();
    const finalCode = `${commonImports}\n\nexport default ${compCode}\n`;
    fs.writeFileSync(path.join(compDir, `${compName}.jsx`), finalCode, 'utf8');
    extractedNames.push(compName);
  } else {
    console.log(`Failed to find ${compName}`);
  }
});

// Re-write AdminDashboard.jsx
let newDashboard = topImports + '\n\n';
extractedNames.forEach(comp => {
  newDashboard += `import ${comp} from './components/${comp}';\n`;
});
newDashboard += '\n// --- MAIN WRAPPER ---\n' + mainWrapper;

fs.writeFileSync(file, newDashboard, 'utf8');
console.log('Done extracting admin components.');
