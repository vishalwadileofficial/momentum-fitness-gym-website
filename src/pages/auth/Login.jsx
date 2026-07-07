import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiMail, FiArrowRight, FiShield, FiUser, FiActivity } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import Button from '@/components/ui/Button';

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please input your credentials.');
      return;
    }
    
    setIsPending(true);
    try {
      await login(email.trim(), password);
      toast.success('Successfully logged in!');
      // Navigate is automatically handled by AuthContext listener in AppRoutes.jsx,
      // but let's redirect depending on credentials to be safe.
      if (email.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else if (email.toLowerCase().includes('trainer')) {
        navigate('/trainer');
      } else {
        navigate('/member');
      }
    } catch (err) {
      // Offline fallback check: if Firebase is not configured or fails
      if (err.message?.includes('API key') || err.message?.includes('network') || err.message?.includes('configuration')) {
        handleOfflineLogin(email, password);
      } else {
        toast.error(err.message || 'Invalid email or password credentials.');
        setIsPending(false);
      }
    }
  };

  const handleOfflineLogin = (mailInput, _pwdInput) => {
    // Save a mock user token inside localStorage
    const lowerEmail = mailInput.toLowerCase();
    let role = 'member';
    let name = 'Marcus Chen';
    let path = '/member';

    if (lowerEmail.includes('admin')) {
      role = 'admin';
      name = 'Admin Director';
      path = '/admin';
    } else if (lowerEmail.includes('trainer')) {
      role = 'trainer';
      name = 'Coach Marcus';
      path = '/trainer';
    }

    const mockUser = {
      uid: `offline-${role}-${Date.now()}`,
      email: mailInput,
      name,
      role,
      plan: 'Elite Performance'
    };

    localStorage.setItem('momentum_user', JSON.stringify(mockUser));
    // Force a page reload or state sync
    toast.success(`Offline Fallback Active: Welcome, ${name}!`);
    setTimeout(() => {
      window.location.href = path;
    }, 800);
  };

  const handleQuickLogin = (roleType) => {
    setIsPending(true);
    let demoEmail = 'marcus.chen@gmail.com';
    let demoPass = 'Password123!';
    
    if (roleType === 'admin') {
      demoEmail = 'admin@momentumfitness.in';
    } else if (roleType === 'trainer') {
      demoEmail = 'trainer.marcus@momentumfitness.in';
    }

    setEmail(demoEmail);
    setPassword(demoPass);

    setTimeout(() => {
      handleOfflineLogin(demoEmail, demoPass);
    }, 500);
  };

  return (
    <>
      <Helmet>
        <title>Sign In | Momentum Fitness Portal</title>
        <meta name="description" content="Access member dashboards, schedule 1-on-1 coaching, track nutrition progress." />
      </Helmet>

      <section className="min-h-[85vh] flex items-center justify-center bg-gym-dark px-6 py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md glass-card border border-gym-gray-800 rounded-2xl p-8 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-black font-display text-white tracking-wide uppercase">WELCOME BACK</h1>
            <p className="text-xs text-gym-gray-400">Enter credentials or select a one-click profile simulation below.</p>
          </div>

          {/* Quick simulation accounts */}
          <div className="grid grid-cols-3 gap-2 bg-gym-gray-900/50 p-2 rounded-xl border border-gym-gray-850">
            <button
              onClick={() => handleQuickLogin('member')}
              disabled={isPending}
              className="flex flex-col items-center gap-1.5 p-2 bg-gym-dark hover:bg-gym-gray-800 text-gym-gray-300 hover:text-white rounded-lg transition-all text-center cursor-pointer disabled:opacity-50"
            >
              <FiUser className="w-4 h-4 text-primary" />
              <span className="text-[9px] uppercase font-black tracking-wider">Member</span>
            </button>
            <button
              onClick={() => handleQuickLogin('trainer')}
              disabled={isPending}
              className="flex flex-col items-center gap-1.5 p-2 bg-gym-dark hover:bg-gym-gray-800 text-gym-gray-300 hover:text-white rounded-lg transition-all text-center cursor-pointer disabled:opacity-50"
            >
              <FiActivity className="w-4 h-4 text-secondary" />
              <span className="text-[9px] uppercase font-black tracking-wider">Coach</span>
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              disabled={isPending}
              className="flex flex-col items-center gap-1.5 p-2 bg-gym-dark hover:bg-gym-gray-800 text-gym-gray-300 hover:text-white rounded-lg transition-all text-center cursor-pointer disabled:opacity-50"
            >
              <FiShield className="w-4 h-4 text-accent-pink" />
              <span className="text-[9px] uppercase font-black tracking-wider">Admin</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary font-bold"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs uppercase font-bold text-gym-gray-400">Password</label>
                <Link to="/forgot-password" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-wider">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary font-mono font-bold"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3.5 font-bold uppercase tracking-wider flex items-center gap-2"
                disabled={isPending}
              >
                {isPending ? 'Authenticating...' : 'Sign In to Account'}
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="border-t border-gym-gray-800 pt-6 text-center text-xs text-gym-gray-400">
            <span>Don't have a membership profile? </span>
            <Link to="/register" className="text-primary hover:underline font-bold uppercase tracking-wider">
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
