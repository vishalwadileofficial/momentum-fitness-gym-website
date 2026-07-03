import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiCalendar, FiActivity, FiLogOut, FiHome, FiGrid, 
  FiBookOpen, FiClock, FiSettings, FiMenu, FiX, FiShield 
} from 'react-icons/fi';

export default function DashboardSidebar({ role }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { to: '/admin', label: 'Admin Panel', icon: <FiShield /> },
          { to: '/admin/users', label: 'Users Directory', icon: <FiUser /> },
          { to: '/admin/bookings', label: 'All Appts', icon: <FiCalendar /> },
          { to: '/admin/metrics', label: 'Analytics', icon: <FiActivity /> },
        ];
      case 'trainer':
        return [
          { to: '/trainer', label: 'Trainer Portal', icon: <FiGrid /> },
          { to: '/trainer/clients', label: 'My Clients', icon: <FiUser /> },
          { to: '/trainer/schedule', label: 'Schedule', icon: <FiClock /> },
          { to: '/trainer/exercises', label: 'Workouts Lib', icon: <FiBookOpen /> },
        ];
      case 'member':
      default:
        return [
          { to: '/member', label: 'Dashboard', icon: <FiGrid /> },
          { to: '/member/workouts', label: 'My Program', icon: <FiActivity /> },
          { to: '/member/classes', label: 'Class Schedule', icon: <FiCalendar /> },
          { to: '/member/settings', label: 'Profile Settings', icon: <FiSettings /> },
        ];
    }
  };

  const links = getLinks();

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-gym-gray-900 border-r border-gym-gray-800 text-white p-6">
      <div className="space-y-8">
        {/* Brand header */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-black tracking-widest text-xl text-white group-hover:text-primary transition-colors">
              MOMENTUM
            </span>
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
          </Link>
          <button className="lg:hidden text-gym-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-3 bg-gym-dark/50 border border-gym-gray-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{currentUser?.name || 'Athlete'}</h4>
            <p className="text-[9px] font-bold text-primary uppercase tracking-wider">{currentUser?.role || role}</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-primary text-gym-dark shadow-[0_4px_15px_rgba(204,255,0,0.2)]'
                    : 'text-gym-gray-400 hover:bg-gym-gray-800 hover:text-white'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-3 pt-6 border-t border-gym-gray-800">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-4 py-2 text-xs font-semibold text-gym-gray-400 hover:text-white transition-colors"
        >
          <FiHome className="text-base" />
          Back to Public Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20"
        >
          <FiLogOut className="text-base" />
          Logout Session
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header Nav bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gym-gray-900 border-b border-gym-gray-800 px-6 flex items-center justify-between z-40">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="font-display font-black tracking-widest text-lg text-white">MOMENTUM</span>
          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
        </Link>
        <button onClick={() => setMobileOpen(true)} className="text-white hover:text-primary transition-colors">
          <FiMenu className="w-6 h-6" />
        </button>
      </header>

      {/* Desktop Sidebar (Fixed left) */}
      <aside className="hidden lg:block fixed top-0 bottom-0 left-0 w-64 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-45"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-72 z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
