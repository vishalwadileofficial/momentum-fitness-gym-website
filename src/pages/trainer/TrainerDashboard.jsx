import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { 
  FiUsers, FiClock, FiCalendar, FiBookOpen, FiUserCheck, 
  FiPlus, FiTrash2, FiEdit2, FiSave, FiCheckCircle, FiStar, 
  FiAward, FiBriefcase, FiActivity, FiBell, FiSearch
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import TrainerOverview from './components/TrainerOverview';
import TrainerClients from './components/TrainerClients';
import TrainerSchedule from './components/TrainerSchedule';
import TrainerExercises from './components/TrainerExercises';
import TrainerProfile from './components/TrainerProfile';
import TrainerSettings from './components/TrainerSettings';

// --- SUB-COMPONENTS ---



// --- MAIN WRAPPER ---

export default function TrainerDashboard() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route index element={<TrainerOverview />} />
        <Route path="clients" element={<TrainerClients />} />
        <Route path="schedule" element={<TrainerSchedule />} />
        <Route path="exercises" element={<TrainerExercises />} />
        <Route path="profile" element={<TrainerProfile />} />
        <Route path="settings" element={<TrainerSettings />} />
      </Routes>
    </ErrorBoundary>
  );
}
