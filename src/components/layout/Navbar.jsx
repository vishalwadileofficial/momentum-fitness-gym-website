import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser, FiSettings, FiActivity } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

const Navbar = ({
  user = null,
  onLogout,
  onLogin,
  navItems = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
    { label: 'Trainers', href: '/trainers' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ],
  logoText = 'MOMENTUM',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const authContext = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Resolve user, logout, and login handlers from context if not passed as props
  const activeUser = user || authContext?.currentUser;
  
  const handleLogout = async () => {
    setDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else if (authContext?.logout) {
      try {
        await authContext.logout();
        navigate('/');
      } catch {
        // Logout error handled silently
      }
    }
  };

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/login');
    }
  };

  // Monitor scroll state to adjust background blur intensity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle mobile navigation body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActivePath = (href) => {
    if (href === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname.startsWith(href);
  };

  const getDashboardHref = () => {
    if (!activeUser) return '/';
    if (activeUser.role === 'admin') return '/admin';
    if (activeUser.role === 'trainer') return '/trainer';
    return '/member';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-gym-dark/75 backdrop-blur-md border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <span className="font-display font-black text-2xl tracking-widest text-white transition-colors duration-200 group-hover:text-primary">
              {logoText}
            </span>
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 relative" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active = isActivePath(item.href);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative py-1 text-sm font-display font-medium uppercase tracking-wider transition-colors duration-200 focus-visible:text-primary focus:outline-none ${
                    active ? 'text-white font-bold' : 'text-gym-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-[-18px] left-0 right-0 h-[2.5px] bg-primary rounded-full shadow-[0_0_10px_rgba(204,255,0,0.85)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Auth Action / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {activeUser ? (
              /* User authenticated dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1 px-3 rounded-full bg-gym-gray-900 border border-white/5 hover:border-primary/30 transition-all focus:outline-none focus-visible:border-primary cursor-pointer"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {activeUser.photoURL ? (
                    <img
                      src={activeUser.photoURL}
                      alt={activeUser.name || 'User'}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
                      {(activeUser.name || activeUser.email || 'U').charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-white truncate max-w-[120px]">
                    {activeUser.name || activeUser.email?.split('@')[0]}
                  </span>
                  <FiChevronDown className={`text-gym-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-lg bg-gym-gray-900 border border-white/5 shadow-2xl py-2 z-50 divide-y divide-white/5"
                    >
                      {/* User Info header */}
                      <div className="px-4 py-2.5">
                        <p className="text-xs text-gym-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{activeUser.email}</p>
                      </div>

                      {/* Menu Links */}
                      <div className="py-1">
                        <Link
                          to={`${getDashboardHref()}`}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gym-gray-400 hover:text-white hover:bg-gym-gray-800 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiUser size={16} className="text-primary" />
                          <span>My Dashboard</span>
                        </Link>
                        <Link
                          to={`${getDashboardHref()}`}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gym-gray-400 hover:text-white hover:bg-gym-gray-800 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiActivity size={16} className="text-secondary" />
                          <span>Activity Log</span>
                        </Link>
                        <Link
                          to={`${getDashboardHref()}`}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gym-gray-400 hover:text-white hover:bg-gym-gray-800 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiSettings size={16} />
                          <span>Settings</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors cursor-pointer"
                        >
                          <FiLogOut size={16} />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Non-authenticated Join Now */
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="text-sm font-display font-medium uppercase tracking-wider text-gym-gray-400 hover:text-white px-3 py-2 transition-colors focus:outline-none focus-visible:text-primary cursor-pointer"
                >
                  Login
                </button>
                <Button variant="primary" size="sm" onClick={handleLoginClick}>
                  Join Now
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            {!activeUser && (
              <Button variant="primary" size="sm" onClick={handleLoginClick} className="text-xs! px-3! py-1.5!">
                Join
              </Button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-gym-dark/95 backdrop-blur-xl border-l border-white/5 p-6 flex flex-col shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/5">
                <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2 focus:outline-none">
                  <span className="font-display font-black text-xl tracking-widest text-white">
                    {logoText}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md cursor-pointer"
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-4 py-8" aria-label="Mobile Navigation">
                {navItems.map((item) => {
                  const active = isActivePath(item.href);
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={handleLinkClick}
                      className={`text-lg font-display font-bold uppercase tracking-wider transition-colors py-2 flex items-center justify-between ${
                        active ? 'text-primary' : 'text-gym-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(204,255,0,0.8)]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Auth Panel */}
              <div className="mt-auto border-t border-white/5 pt-6">
                {activeUser ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      {activeUser.photoURL ? (
                        <img
                          src={activeUser.photoURL}
                          alt={activeUser.name || 'User'}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm uppercase">
                          {(activeUser.name || activeUser.email || 'U').charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-base font-semibold text-white truncate max-w-[180px]">
                          {activeUser.name || activeUser.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-gym-gray-400 truncate max-w-[180px]">{activeUser.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Link
                        to={`${getDashboardHref()}`}
                        onClick={handleLinkClick}
                        className="flex items-center justify-center gap-2 p-2.5 rounded bg-gym-gray-900 border border-white/5 text-sm text-gym-gray-400 hover:text-white transition-colors"
                      >
                        <FiUser size={14} />
                        Portal
                      </Link>
                      <Link
                        to={`${getDashboardHref()}`}
                        onClick={handleLinkClick}
                        className="flex items-center justify-center gap-2 p-2.5 rounded bg-gym-gray-900 border border-white/5 text-sm text-gym-gray-400 hover:text-white transition-colors"
                      >
                        <FiSettings size={14} />
                        Settings
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleLinkClick();
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 p-3 mt-2 rounded bg-red-950/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      <FiLogOut size={16} />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleLinkClick();
                        handleLoginClick();
                      }}
                      className="w-full p-3 rounded bg-gym-gray-900 text-sm font-display font-bold uppercase tracking-wider text-white border border-white/5 text-center cursor-pointer hover:bg-gym-gray-800 transition-colors"
                    >
                      Login
                    </button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        handleLinkClick();
                        handleLoginClick();
                      }}
                      className="w-full text-center"
                    >
                      Join Now
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
