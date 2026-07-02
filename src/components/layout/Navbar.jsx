import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiUser, FiSettings, FiActivity } from 'react-icons/fi';
import Button from '@/components/ui/Button';

const Navbar = ({
  user = null, // e.g., { name: 'Alex Rivera', email: 'alex.fit@momentum.com', avatar: null }
  onLogout,
  onLogin,
  navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Classes', href: '#classes' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  logoText = 'MOMENTUM',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-gym-dark/80 backdrop-blur-lg border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group focus:outline-none">
            <span className="font-display font-black text-2xl tracking-widest text-white transition-colors duration-200 group-hover:text-primary">
              {logoText}
            </span>
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-display font-medium uppercase tracking-wider text-gym-gray-400 hover:text-white transition-colors duration-200 focus-visible:text-primary focus:outline-none"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Section: Auth Action / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              /* User authenticated dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1 px-3 rounded-full bg-gym-gray-900 border border-white/5 hover:border-primary/30 transition-all focus:outline-none focus-visible:border-primary"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-white truncate max-w-[120px]">{user.name}</span>
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
                        <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                      </div>

                      {/* Menu Links */}
                      <div className="py-1">
                        <a
                          href="#profile"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gym-gray-400 hover:text-white hover:bg-gym-gray-800 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiUser size={16} className="text-primary" />
                          <span>My Profile</span>
                        </a>
                        <a
                          href="#workout-plan"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gym-gray-400 hover:text-white hover:bg-gym-gray-800 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiActivity size={16} className="text-secondary" />
                          <span>Workout Schedule</span>
                        </a>
                        <a
                          href="#settings"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gym-gray-400 hover:text-white hover:bg-gym-gray-800 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiSettings size={16} />
                          <span>Settings</span>
                        </a>
                      </div>

                      {/* Logout */}
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setDropdownOpen(false);
                            onLogout?.();
                          }}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
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
                  onClick={onLogin}
                  className="text-sm font-display font-medium uppercase tracking-wider text-gym-gray-400 hover:text-white px-3 py-2 transition-colors focus:outline-none focus-visible:text-primary"
                >
                  Login
                </button>
                <Button variant="primary" size="sm" onClick={onLogin}>
                  Join Now
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            {!user && (
              <Button variant="primary" size="sm" onClick={onLogin} className="text-xs! px-3! py-1.5!">
                Join
              </Button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-[72px] bg-gym-dark z-30 flex flex-col p-6 border-t border-white/5 md:hidden overflow-y-auto"
          >
            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-6 py-4" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-xl font-display font-bold uppercase tracking-wider text-gym-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Auth Panel */}
            <div className="mt-auto border-t border-white/5 pt-6 pb-12">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm uppercase">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-base font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-gym-gray-400">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <a
                      href="#profile"
                      onClick={handleLinkClick}
                      className="flex items-center justify-center gap-2 p-2.5 rounded bg-gym-gray-900 border border-white/5 text-sm text-gym-gray-400 hover:text-white"
                    >
                      <FiUser size={14} />
                      Profile
                    </a>
                    <a
                      href="#settings"
                      onClick={handleLinkClick}
                      className="flex items-center justify-center gap-2 p-2.5 rounded bg-gym-gray-900 border border-white/5 text-sm text-gym-gray-400 hover:text-white"
                    >
                      <FiSettings size={14} />
                      Settings
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleLinkClick();
                      onLogout?.();
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 mt-2 rounded bg-red-950/20 border border-red-500/20 text-red-400 hover:text-red-300"
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
                      onLogin?.();
                    }}
                    className="w-full p-3 rounded bg-gym-gray-900 text-sm font-display font-bold uppercase tracking-wider text-white border border-white/5 text-center"
                  >
                    Login
                  </button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      handleLinkClick();
                      onLogin?.();
                    }}
                    className="w-full text-center"
                  >
                    Join Now
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
