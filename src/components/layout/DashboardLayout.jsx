import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBell, FiMenu, FiChevronRight, FiChevronDown, 
  FiUser, FiSettings, FiLogOut, FiHome, FiMessageSquare
} from 'react-icons/fi';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

/**
 * DashboardLayout - Master layout wrapper for all member, trainer, and admin dashboards.
 * Integrates:
 * 1. Desktop collapsible sidebar & mobile drawer sidebar.
 * 2. Responsive topbar.
 * 3. Dynamic breadcrumbs reflecting current path.
 * 4. Interactive notifications menu with unread badges.
 * 5. Quick action user avatar menu.
 */
export default function DashboardLayout({ role }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Sidebar collapsibility states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dropdown states
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  // Notifications demo state
  const demoLogs = {
    admin: [
      { id: 1, text: 'System Alert: High sign-up volume detected today', time: '10m ago', unread: true },
      { id: 2, text: 'New trainer application submitted by Elena R.', time: '2h ago', unread: true },
      { id: 3, text: 'Contact request: Corporate booking inquiry from Apex Corp', time: '1d ago', unread: true },
    ],
    trainer: [
      { id: 1, text: 'Client Sarah Jenkins uploaded a nutrition log', time: '15m ago', unread: true },
      { id: 2, text: 'New booking request: Personal coaching session on Monday', time: '3h ago', unread: true },
      { id: 3, text: 'Performance milestone: client John D. hit his target weight', time: '1d ago', unread: true },
    ],
    member: [
      { id: 1, text: 'New workout plan assigned by Coach Marcus', time: '5m ago', unread: true },
      { id: 2, text: 'Booking confirmed: Body Composition Analysis', time: '4h ago', unread: true },
      { id: 3, text: 'Limited Offer: 20% discount on momentum-protein supplements', time: '1d ago', unread: true },
    ]
  };

  const [notifications, setNotifications] = useState(() => demoLogs[role] || demoLogs.member);
  const unreadCount = notifications.filter(n => n.unread).length;

  const notificationRef = useRef(null);
  const avatarRef = useRef(null);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      // Logout error handled silently
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Dynamic breadcrumbs generation
  const pathnames = location.pathname.split('/').filter(x => x);
  const renderBreadcrumbs = () => {
    return (
      <div className="flex items-center space-x-1.5 text-xs text-gym-gray-400 font-bold tracking-wide">
        <Link 
          to={`/${role}`} 
          className="hover:text-primary transition-colors flex items-center gap-1 uppercase"
        >
          <span className="text-[10px] bg-gym-gray-800 text-gym-gray-400 px-1.5 py-0.5 rounded font-mono">
            {role}
          </span>
        </Link>
        {pathnames.slice(1).map((value, index) => {
          const to = `/${pathnames.slice(0, index + 2).join('/')}`;
          const isLast = index === pathnames.length - 2;
          const formattedValue = value.replace(/-/g, ' ');

          return (
            <React.Fragment key={to}>
              <FiChevronRight className="text-gym-gray-600 w-3 h-3 shrink-0" />
              {isLast ? (
                <span className="text-white font-black uppercase text-[10px] tracking-wider truncate">
                  {formattedValue}
                </span>
              ) : (
                <Link 
                  to={to} 
                  className="hover:text-primary transition-colors uppercase text-[10px] truncate"
                >
                  {formattedValue}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gym-dark text-white flex flex-col">
      {/* Sidebar Navigation */}
      <DashboardSidebar 
        role={role} 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Header / Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-gym-gray-900/80 backdrop-blur-md border-b border-gym-gray-800/80 flex items-center justify-between px-4 sm:px-6">
          
          {/* Left: Mobile hamburger & breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button 
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden text-gym-gray-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="Open sidebar"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block min-w-0">
              {renderBreadcrumbs()}
            </div>
            <div className="sm:hidden font-display font-black tracking-widest text-sm text-white flex items-center gap-1">
              <span>MOMENTUM</span>
              <span className="w-1 h-1 bg-primary rounded-full"></span>
            </div>
          </div>

          {/* Right: Notification bell & User avatar */}
          <div className="flex items-center gap-4 shrink-0">
            
            {/* Notification Bell Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg bg-gym-gray-800/40 border border-gym-gray-800 hover:border-gym-gray-700 text-gym-gray-400 hover:text-white transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
              >
                <FiBell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-gym-dark text-[9px] font-black rounded-full flex items-center justify-center animate-pulse border border-gym-dark">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 glass-card bg-gym-gray-900 border border-gym-gray-800 rounded-2xl shadow-2xl z-30"
                  >
                    <div className="p-4 border-b border-gym-gray-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase text-white">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="text-[9px] bg-primary/15 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-black">
                            {unreadCount} NEW
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button 
                          type="button"
                          onClick={handleMarkAllRead}
                          className="text-[10px] text-primary hover:text-primary-dark font-extrabold transition-colors cursor-pointer rounded px-1 py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y divide-gym-gray-800/40">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-3.5 hover:bg-gym-gray-800/20 transition-all flex items-start gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${notif.unread ? 'bg-primary' : 'bg-transparent'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gym-gray-300 leading-relaxed break-words">{notif.text}</p>
                            <span className="text-[9px] text-gym-gray-500 font-mono block mt-1">{notif.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 text-center border-t border-gym-gray-800/80">
                      <Link
                        to={`/${role}/notifications`}
                        onClick={() => setNotificationsOpen(false)}
                        className="text-[10px] font-bold text-gym-gray-400 hover:text-white uppercase tracking-wider block"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={avatarRef}>
              <button
                type="button"
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gym-gray-800/30 transition-all text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="User profile options"
                aria-expanded={avatarOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-display font-bold">
                  {currentUser?.name ? currentUser.name[0].toUpperCase() : 'A'}
                </div>
                <FiChevronDown className="w-3.5 h-3.5 text-gym-gray-400 hidden sm:block" />
              </button>

              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 glass-card bg-gym-gray-900 border border-gym-gray-800 rounded-2xl shadow-2xl z-30 overflow-hidden"
                  >
                    {/* User summary */}
                    <div className="p-4 bg-gym-gray-900 border-b border-gym-gray-800/85">
                      <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Athlete'}</p>
                      <p className="text-[10px] text-gym-gray-400 truncate mt-0.5">{currentUser?.email || 'athletic@momentum.com'}</p>
                      <span className="inline-block mt-2 text-[9px] bg-primary text-gym-dark px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                        {role}
                      </span>
                    </div>

                    {/* Menu links */}
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        to={`/${role}/profile`}
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-gym-gray-400 hover:text-white hover:bg-gym-gray-800/50 transition-all"
                      >
                        <FiUser className="w-3.5 h-3.5" />
                        My Profile
                      </Link>
                      <Link
                        to={`/${role}/settings`}
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-gym-gray-400 hover:text-white hover:bg-gym-gray-800/50 transition-all"
                      >
                        <FiSettings className="w-3.5 h-3.5" />
                        Settings
                      </Link>
                      <Link
                        to="/"
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-gym-gray-400 hover:text-white hover:bg-gym-gray-800/50 transition-all"
                      >
                        <FiHome className="w-3.5 h-3.5" />
                        Go to Home
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-1.5 border-t border-gym-gray-800/80 bg-gym-gray-900/60">
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                      >
                        <FiLogOut className="w-3.5 h-3.5" />
                        Logout Session
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* Dynamic Main Workspace Area */}
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
