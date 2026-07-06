import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiCalendar, FiActivity, FiLogOut, FiHome, FiGrid, 
  FiBookOpen, FiClock, FiSettings, FiMenu, FiX, FiShield,
  FiUsers, FiAward, FiCoffee, FiTrendingUp, FiBell, FiPackage,
  FiFileText, FiImage, FiMessageSquare, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

/**
 * DashboardSidebar - Renders a side navigation menu.
 * Supports desktop horizontal collapsibility and mobile drawer state.
 */
export default function DashboardSidebar({ 
  role, 
  isCollapsed = false, 
  setIsCollapsed = () => {}, 
  mobileOpen = false, 
  setMobileOpen = () => {} 
}) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
          { to: '/admin', label: 'Dashboard', icon: <FiShield /> },
          { to: '/admin/users', label: 'Members', icon: <FiUsers /> },
          { to: '/admin/trainers', label: 'Trainers', icon: <FiUser /> },
          { to: '/admin/plans', label: 'Plans', icon: <FiPackage /> },
          { to: '/admin/bookings', label: 'Appointments', icon: <FiCalendar /> },
          { to: '/admin/blogs', label: 'Blogs', icon: <FiFileText /> },
          { to: '/admin/gallery', label: 'Gallery', icon: <FiImage /> },
          { to: '/admin/messages', label: 'Messages', icon: <FiMessageSquare /> },
          { to: '/admin/reports', label: 'Reports', icon: <FiTrendingUp /> },
          { to: '/admin/testimonials', label: 'Testimonials', icon: <FiAward /> },
          { to: '/admin/announcements', label: 'Announcements', icon: <FiBell /> },
        ];
      case 'trainer':
        return [
          { to: '/trainer', label: 'Dashboard', icon: <FiGrid /> },
          { to: '/trainer/clients', label: 'Clients', icon: <FiUsers /> },
          { to: '/trainer/schedule', label: 'Schedule', icon: <FiClock /> },
          { to: '/trainer/exercises', label: 'Workouts', icon: <FiBookOpen /> },
          { to: '/trainer/profile', label: 'Profile', icon: <FiUser /> },
        ];
      case 'member':
      default:
        return [
          { to: '/member', label: 'Dashboard', icon: <FiGrid /> },
          { to: '/member/profile', label: 'Profile', icon: <FiUser /> },
          { to: '/member/membership', label: 'Membership', icon: <FiAward /> },
          { to: '/member/workouts', label: 'Workout Plan', icon: <FiActivity /> },
          { to: '/member/nutrition', label: 'Nutrition Plan', icon: <FiCoffee /> },
          { to: '/member/appointments', label: 'Appointments', icon: <FiCalendar /> },
          { to: '/member/progress', label: 'Progress', icon: <FiTrendingUp /> },
          { to: '/member/notifications', label: 'Notifications', icon: <FiBell /> },
          { to: '/member/settings', label: 'Settings', icon: <FiSettings /> },
        ];
    }
  };

  const links = getLinks();

  const sidebarContent = (isMobile = false) => {
    // If mobile, we never render collapsed style
    const collapsed = !isMobile && isCollapsed;
    
    return (
      <div className="h-full flex flex-col justify-between bg-gym-gray-900 border-r border-gym-gray-800 text-white p-4 transition-all duration-300">
        <div className="space-y-6">
          {/* Brand header */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} h-10`}>
            {collapsed ? (
              <Link to="/" className="flex items-center justify-center group" title="Momentum Fitness">
                <span className="font-display font-black tracking-wider text-xl text-primary">
                  M
                </span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              </Link>
            ) : (
              <Link to="/" className="flex items-center gap-2 group">
                <span className="font-display font-black tracking-widest text-lg text-white group-hover:text-primary transition-colors">
                  MOMENTUM
                </span>
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              </Link>
            )}

            {/* Mobile close button / Desktop collapse button */}
            {isMobile ? (
              <button 
                className="text-gym-gray-400 hover:text-white" 
                onClick={() => setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <FiX className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-gym-gray-800 border border-gym-gray-700 hover:border-primary text-gym-gray-400 hover:text-white transition-all duration-200"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <FiChevronRight className="w-3.5 h-3.5" /> : <FiChevronLeft className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* User Card */}
          <div className={`flex items-center ${collapsed ? 'justify-center p-1' : 'gap-3 p-3'} bg-gym-dark/50 border border-gym-gray-800 rounded-xl transition-all duration-300`}>
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold shrink-0">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : 'A'}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate">{currentUser?.name || 'Athlete'}</h4>
                <p className="text-[9px] font-bold text-primary uppercase tracking-wider mt-0.5">{currentUser?.role || role}</p>
              </div>
            )}
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-4'} py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-primary text-gym-dark shadow-[0_4px_15px_rgba(204,255,0,0.2)]'
                      : 'text-gym-gray-400 hover:bg-gym-gray-800 hover:text-white'
                  }`
                }
                title={collapsed ? link.label : undefined}
                onClick={isMobile ? () => setMobileOpen(false) : undefined}
              >
                <span className="text-base shrink-0">{link.icon}</span>
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-4 border-t border-gym-gray-800">
          <Link 
            to="/" 
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-4'} py-2 text-xs font-semibold text-gym-gray-400 hover:text-white transition-colors`}
            title={collapsed ? "Back to Public Site" : undefined}
          >
            <FiHome className="text-base shrink-0" />
            {!collapsed && <span>Back to Public Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-4'} py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20`}
            title={collapsed ? "Logout Session" : undefined}
          >
            <FiLogOut className="text-base shrink-0" />
            {!collapsed && <span>Logout Session</span>}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar (Fixed left) */}
      <aside 
        className={`hidden lg:block fixed top-0 bottom-0 left-0 z-30 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent(false)}
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
              {sidebarContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
