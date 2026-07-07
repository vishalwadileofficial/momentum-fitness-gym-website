import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import Button from '@/components/ui/Button';

export default function Register() {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [plan, setPlan] = useState('Standard Athletic Plan');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error('You must accept the Terms of Service & Privacy Policy.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setIsPending(true);
    try {
      await register(email.trim(), password, name.trim());
      toast.success('Registration successful! Welcome to Momentum Fitness!');
      navigate('/member');
    } catch (err) {
      if (err.message?.includes('API key') || err.message?.includes('network') || err.message?.includes('configuration')) {
        handleOfflineRegister();
      } else {
        toast.error(err.message || 'Registration failed.');
        setIsPending(false);
      }
    }
  };

  const handleOfflineRegister = () => {
    const mockUser = {
      uid: `offline-member-${Date.now()}`,
      email: email.trim(),
      name: name.trim(),
      role: 'member',
      plan: plan
    };
    localStorage.setItem('momentum_user', JSON.stringify(mockUser));
    toast.success(`Offline Registration Active: Welcome, ${name.trim()}!`);
    setTimeout(() => {
      window.location.href = '/member';
    }, 800);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Momentum Fitness Portal</title>
        <meta name="description" content="Register your athlete profile, select your membership plan, and begin your training." />
      </Helmet>

      <section className="min-h-[90vh] flex items-center justify-center bg-gym-dark px-6 py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-lg glass-card border border-gym-gray-800 rounded-2xl p-8 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-black font-display text-white tracking-wide uppercase">START YOUR BUILD</h1>
            <p className="text-xs text-gym-gray-400">Fill in the fields below to register your club credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                <input
                  type="text"
                  required
                  placeholder="Marcus Chen"
                  className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary font-bold"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="marcus@email.com"
                  className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary font-bold"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Password</label>
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

              <div>
                <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gym-gray-400 w-4 h-4" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 pl-11 text-sm text-white focus:outline-none focus:border-primary font-mono font-bold"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-1.5">Select Plan Tier</label>
              <select
                className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary font-bold"
                value={plan}
                onChange={e => setPlan(e.target.value)}
                disabled={isPending}
              >
                <option value="Basic Strength Plan">Basic Strength Plan ($29/mo)</option>
                <option value="Standard Athletic Plan">Standard Athletic Plan ($49/mo)</option>
                <option value="Premium Athlete Plan">Premium Athlete Plan ($89/mo)</option>
                <option value="Elite Performance Plan">Elite Performance Plan ($199/mo)</option>
              </select>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-gym-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                className="accent-primary rounded bg-gym-gray-800 border-gym-gray-700 mt-0.5"
                checked={acceptTerms}
                onChange={e => setAcceptTerms(e.target.checked)}
                disabled={isPending}
              />
              <span>I confirm I am over 18, and agree to the Terms of Service & Privacy Policy.</span>
            </label>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3.5 font-bold uppercase tracking-wider flex items-center gap-2"
                disabled={isPending}
              >
                {isPending ? 'Processing Registration...' : 'Submit & Register'}
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="border-t border-gym-gray-800 pt-6 text-center text-xs text-gym-gray-400">
            <span>Already have an active account? </span>
            <Link to="/login" className="text-primary hover:underline font-bold uppercase tracking-wider">
              Log In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
