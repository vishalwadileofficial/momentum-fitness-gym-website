import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  FiUsers, FiTrendingUp, FiSettings, FiActivity, FiUser, 
  FiCalendar, FiCreditCard, FiBookOpen, FiImage, FiMail, 
  FiTrash2, FiPlus, FiUserCheck, FiStar, FiFileText, FiMessageSquare,
  FiBell, FiEye, FiCheck, FiX, FiFilter, FiDownload, FiSearch
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
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

// --- SUB-COMPONENTS ---

/* ============================================================================
   1. OVERVIEW
   ============================================================================ */
function AdminOverview() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const met = await getAdminOverviewMetrics();
        setMetrics(met);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadOverview();
  }, []);

  if (loading) return <SkeletonLoader.Grid count={4} />;
  if (error) return <ErrorDisplay title="Database Warning" message={error} />;

  const stats = [
    { label: 'Monthly Revenue', value: `$${metrics.monthlyRevenue.toLocaleString()}`, icon: <FiTrendingUp />, trend: { value: `+${metrics.growthRate}%`, isPositive: true }, colorType: 'primary' },
    { label: 'Active Members', value: `${metrics.activeMembers}`, icon: <FiUsers />, trend: { value: '+4.2%', isPositive: true }, colorType: 'secondary' },
    { label: 'Staff Coaches', value: `${metrics.totalTrainers || 6}`, icon: <FiActivity />, description: 'All active on floor', colorType: 'pink' },
    { label: 'Gym Floor Load', value: '45%', icon: <FiSettings />, description: 'Optimal load today', colorType: 'primary' }
  ];

  const revenueData = [
    { label: 'Jan', value: 72000 },
    { label: 'Feb', value: 75000 },
    { label: 'Mar', value: 78000 },
    { label: 'Apr', value: 76000 },
    { label: 'May', value: 80000 },
    { label: 'Jun', value: metrics.monthlyRevenue }
  ];

  const memberData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 105 },
    { label: 'Mar', value: 110 },
    { label: 'Apr', value: 115 },
    { label: 'May', value: 118 },
    { label: 'Jun', value: metrics.activeMembers }
  ];

  const adminLogs = [
    { id: 1, action: 'Member Joined', target: 'Elite Plan', user: { name: 'James Foster' }, timestamp: 'Just now', status: 'success' },
    { id: 2, action: 'Dietary Log Synced', target: 'for Marcus Chen', user: { name: 'Coach Sarah' }, timestamp: '10m ago', status: 'info' },
    { id: 3, action: 'Contrast Suite Check', target: 'Recovery plumbing verified', user: { name: 'Admin Desk' }, timestamp: '1h ago', status: 'success' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">ADMIN COMMAND CENTER</h1>
        <p className="text-xs text-gym-gray-400">Track operations, metrics, and manage user bases.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, idx) => (
          <StatCard key={idx} {...st} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardChart 
          title="Monthly Revenue Trend"
          subtitle="Gross income comparison MoM"
          totalValue={`$${metrics.monthlyRevenue.toLocaleString()}`}
          trend={{ value: `+${metrics.growthRate}%`, isPositive: true }}
          data={revenueData}
          layout="line"
          colorType="primary"
        />

        <DashboardChart 
          title="Member Count Growth"
          subtitle="Active registered members index"
          totalValue={`${metrics.activeMembers}`}
          trend={{ value: '+4.2%', isPositive: true }}
          data={memberData}
          layout="line"
          colorType="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityFeed title="Live System Audit" activities={adminLogs} />
        </div>

        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit bg-gym-gray-900/40">
          <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
            <FiSettings className="text-primary" /> Command Shortcuts
          </h3>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <Link to="users" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
              <FiUsers className="text-primary shrink-0" /> Manage Members Registry
            </Link>
            <Link to="bookings" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
              <FiCalendar className="text-primary shrink-0" /> View Session Bookings
            </Link>
            <Link to="reports" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
              <FiTrendingUp className="text-primary shrink-0" /> Generate Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   2. USERS REGISTRY
   ============================================================================ */
function AdminUsers() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const list = await getAdminUsers();
        setUsers(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' ? true : (u.status || 'Active') === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUpdateRole = async (id, newRole) => {
    try {
      await updateAdminUser(id, { role: newRole });
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
      if (selectedUser && selectedUser.id === id) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
      toast.success('User role successfully updated in registry.');
    } catch {
      toast.error('Role update failed.');
    }
  };

  const handleToggleStatus = async (id) => {
    const target = users.find(u => u.id === id);
    if (!target) return;
    const nextStatus = target.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await updateAdminUser(id, { status: nextStatus });
      setUsers(users.map(u => u.id === id ? { ...u, status: nextStatus } : u));
      if (selectedUser && selectedUser.id === id) {
        setSelectedUser({ ...selectedUser, status: nextStatus });
      }
      toast.success(`User account status updated to ${nextStatus}.`);
    } catch {
      toast.error('Status toggle failed.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteAdminUser(id);
      setUsers(users.filter(u => u.id !== id));
      setSelectedUser(null);
      toast.success('User account removed from database.');
    } catch {
      toast.error('Deletion failed.');
    }
  };

  if (loading) return <SkeletonLoader.Table cols={5} rows={6} />;
  
  return (
    <div className="space-y-8">
      {error && <ErrorDisplay title="Connection Alert" message={error} onClose={() => setError(null)} />}
      
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">USERS REGISTRY</h1>
        <p className="text-xs text-gym-gray-400">Search, filter, update credentials, or delete member profiles.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3.5 text-gym-gray-500" />
          <input
            type="text"
            className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-10 py-3 text-xs text-white focus:outline-none focus:border-primary"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-primary font-bold"
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="member">Members</option>
            <option value="trainer">Trainers</option>
            <option value="admin">Admins</option>
          </select>
          <select
            className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-primary font-bold"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState title="No Users Found" message="Try searching for another user or resetting your role/status filters." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-white tracking-wider border-b border-gym-gray-800 pb-2">
                    <th className="pb-3 pr-4">User Details</th>
                    <th className="pb-3 pr-4">Role</th>
                    <th className="pb-3 pr-4">Plan / Level</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-850">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gym-gray-900/10">
                      <td className="py-4 pr-4">
                        <p className="font-bold text-white text-sm">{u.name}</p>
                        <p className="text-[10px] text-gym-gray-500 font-mono mt-0.5">{u.email}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="bg-gym-gray-850 px-2.5 py-0.5 rounded font-bold uppercase text-[9px] border border-gym-gray-700">{u.role}</span>
                      </td>
                      <td className="py-4 pr-4 font-semibold text-gym-gray-300">{u.plan || 'N/A'}</td>
                      <td className="py-4 pr-4">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase border ${
                          (u.status || 'Active') === 'Active' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {u.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="text-xs font-bold text-primary hover:underline uppercase cursor-pointer"
                        >
                          Manage &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedUser && (
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 h-fit bg-gym-gray-900/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">User details</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-gym-gray-550 block text-[9px] uppercase font-bold">Email address</span>
                  <span className="text-white font-mono font-bold mt-1 block">{selectedUser.email}</span>
                </div>
                <div>
                  <span className="text-gym-gray-550 block text-[9px] uppercase font-bold">Role Level</span>
                  <select
                    className="bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-1.5 text-white text-xs uppercase font-bold mt-1 focus:outline-none w-full"
                    value={selectedUser.role}
                    onChange={e => handleUpdateRole(selectedUser.id, e.target.value)}
                  >
                    <option value="member">Member</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gym-gray-500">Access Privileges:</span>
                  <Button variant="outline" size="sm" onClick={() => handleToggleStatus(selectedUser.id)}>
                    {selectedUser.status === 'Suspended' ? 'Activate Account' : 'Suspend Account'}
                  </Button>
                </div>
                <div className="pt-4 border-t border-gym-gray-850 flex justify-between items-center">
                  <button 
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="text-red-400 hover:text-red-300 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <FiTrash2 /> Delete Profile
                  </button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedUser(null)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   3. TRAINERS ROSTER
   ============================================================================ */
function AdminTrainers() {
  const toast = useToast();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTrainer, setNewTrainer] = useState({ name: '', specialty: '', experience: '' });

  useEffect(() => {
    // Mock simulation
    setTimeout(() => {
      setTrainers([
        { id: 't1', name: 'Marcus Vance', specialty: 'Power & Barbell Training', experience: '12 Years', rating: '4.95' },
        { id: 't2', name: 'Sarah Rodriguez', specialty: 'HIIT & Metabolic Conditioning', experience: '8 Years', rating: '5.00' }
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!newTrainer.name.trim()) return;
    const item = {
      id: Math.random().toString(),
      name: newTrainer.name.trim(),
      specialty: newTrainer.specialty.trim() || 'Coaching Specialty',
      experience: newTrainer.experience.trim() || '1 Year',
      rating: '5.00'
    };
    setTrainers([...trainers, item]);
    setNewTrainer({ name: '', specialty: '', experience: '' });
    toast.success('New trainer successfully added to roster.');
  };

  const handleDeleteTrainer = (id) => {
    setTrainers(trainers.filter(t => t.id !== id));
    toast.success('Trainer removed from staff roster.');
  };

  if (loading) return <SkeletonLoader.Grid count={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">STAFF ROSTER</h1>
        <p className="text-xs text-gym-gray-400">Roster management, add new certified coaches, or edit profile lists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleAddTrainer} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Add Trainer</h3>
          <Input label="Name" required value={newTrainer.name} onChange={e => setNewTrainer({ ...newTrainer, name: e.target.value })} />
          <Input label="Specialty" value={newTrainer.specialty} onChange={e => setNewTrainer({ ...newTrainer, specialty: e.target.value })} />
          <Input label="Experience" value={newTrainer.experience} onChange={e => setNewTrainer({ ...newTrainer, experience: e.target.value })} />
          <Button type="submit" variant="primary" className="w-full justify-center">Add Staff Coach</Button>
        </form>

        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
            <FiActivity className="text-primary" /> Active Trainers List
          </h3>
          {trainers.length === 0 ? (
            <EmptyState title="No Trainers Catalogued" message=" Roster is empty. Register coach profiles on the left panel." />
          ) : (
            <div className="space-y-3">
              {trainers.map(t => (
                <div key={t.id} className="p-4 bg-gym-dark border border-gym-gray-855 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-gym-gray-400 mt-1">{t.specialty} &bull; {t.experience} Experience</p>
                  </div>
                  <button className="text-gym-gray-500 hover:text-red-400 transition-colors cursor-pointer" onClick={() => handleDeleteTrainer(t.id)}>
                    <FiTrash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   4. PLANS
   ============================================================================ */
function AdminPlans() {
  const toast = useToast();
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Strength', price: 29, cycle: 'monthly' },
    { id: 2, name: 'Standard Athletic', price: 49, cycle: 'monthly' },
    { id: 3, name: 'Premium Athlete', price: 89, cycle: 'monthly' },
    { id: 4, name: 'Elite Performance', price: 199, cycle: 'monthly' }
  ]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [priceInput, setPriceInput] = useState('');

  const handleEditClick = (p) => {
    setEditingPlan(p);
    setPriceInput(p.price.toString());
  };

  const handleSavePrice = (e) => {
    e.preventDefault();
    if (!priceInput || isNaN(priceInput)) return;
    setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, price: parseInt(priceInput) } : p));
    setEditingPlan(null);
    toast.success('Membership rate configurations saved.');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">PRICING PLANS CONFIG</h1>
        <p className="text-xs text-gym-gray-400">Modify subscription costs, parameters, and billing models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 bg-gym-gray-900/40">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{p.name}</h4>
            <p className="text-3xl font-black text-primary font-mono">${p.price}<span className="text-xs text-gym-gray-500 font-semibold font-sans">/{p.cycle}</span></p>
            <Button variant="outline" className="w-full justify-center text-xs" onClick={() => handleEditClick(p)}>Edit Cost Rate</Button>
          </div>
        ))}
      </div>

      <Modal isOpen={editingPlan !== null} onClose={() => setEditingPlan(null)} title={`Edit Plan: ${editingPlan?.name}`}>
        <form onSubmit={handleSavePrice} className="space-y-4">
          <Input label="New Price Rate ($/mo)" type="number" required value={priceInput} onChange={e => setPriceInput(e.target.value)} />
          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================================================================
   5. APPOINTMENTS / BOOKINGS
   ============================================================================ */
function AdminBookings() {
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setBookings([
        { id: 1, client: 'Marcus Chen', type: 'Class Booking', details: 'Power & Barbell Club', date: 'Monday', time: '18:00', status: 'Approved' },
        { id: 2, client: 'Sarah Miller', type: 'Private Coach', details: 'with Sarah Rodriguez', date: '2026-07-10', time: '09:00', status: 'Pending' }
      ]);
      setLoading(false);
    }, 300);
  }, []);

  const handleAction = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    toast.success(`Booking status changed to ${newStatus}.`);
  };

  const filtered = bookings.filter(b => b.client.toLowerCase().includes(search.toLowerCase()) || b.details.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <SkeletonLoader.Table cols={5} rows={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">MASTER APPOINTMENTS</h1>
        <p className="text-xs text-gym-gray-400">View and moderate all classes reservations and trainer schedules.</p>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-3 top-3.5 text-gym-gray-500" />
        <input 
          type="text" 
          placeholder="Search by member name or details..." 
          className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-10 py-3 text-xs text-white focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No Bookings Found" message="Try searching for another booking or check back later." />
      ) : (
        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gym-gray-400">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-white tracking-wider border-b border-gym-gray-800 pb-2">
                  <th className="pb-3 pr-4">Member Name</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Session Details</th>
                  <th className="pb-3 pr-4">Date/Time</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gym-gray-850">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gym-gray-900/10">
                    <td className="py-4 pr-4 font-semibold text-white">{b.client}</td>
                    <td className="py-4 pr-4 font-bold uppercase text-[9px] text-gym-gray-500">{b.type}</td>
                    <td className="py-4 pr-4 text-gym-gray-300">{b.details}</td>
                    <td className="py-4 pr-4">{b.date} @ {b.time}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                        b.status === 'Approved' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : b.status === 'Cancelled'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {b.status === 'Pending' && (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleAction(b.id, 'Approved')} className="px-2.5 py-1 bg-primary text-gym-dark font-bold text-[9px] uppercase tracking-wider rounded border border-primary/20 cursor-pointer">Approve</button>
                          <button onClick={() => handleAction(b.id, 'Cancelled')} className="px-2.5 py-1 bg-gym-gray-855 text-red-400 border border-gym-gray-700 font-bold text-[9px] uppercase tracking-wider rounded cursor-pointer">Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   6. BLOG MANAGEMENT
   ============================================================================ */
function AdminBlogs() {
  const toast = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [blogModal, setBlogModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', category: 'Training', content: '', published: true });

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const list = await getBlogArticles();
        setBlogs(list);
      } catch {
        toast.error('Blogs failed to sync.');
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, [toast]);

  const handlePublishToggle = async (b) => {
    const targetState = !b.published;
    try {
      await updateBlogArticle(b.id, { published: targetState });
      setBlogs(blogs.map(item => item.id === b.id ? { ...item, published: targetState } : item));
      toast.success(targetState ? 'Blog article published.' : 'Blog article unpublished.');
    } catch {
      toast.error('Update failed.');
    }
  };

  const handleEditClick = (b) => {
    setEditBlog(b);
    setFormData({ title: b.title, author: b.author, category: b.category, content: b.content || '', published: b.published });
    setBlogModal(true);
  };

  const handleAddClick = () => {
    setEditBlog(null);
    setFormData({ title: '', author: '', category: 'Training', content: '', published: true });
    setBlogModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editBlog) {
      try {
        await updateBlogArticle(editBlog.id, formData);
        setBlogs(blogs.map(item => item.id === editBlog.id ? { ...item, ...formData } : item));
        toast.success('Blog article updated.');
        setBlogModal(false);
      } catch {
        toast.error('Update failed.');
      }
    } else {
      try {
        const res = await createBlogArticle(formData);
        setBlogs([res, ...blogs]);
        toast.success('Sports science blog article published.');
        setBlogModal(false);
      } catch {
        toast.error('Publish failed.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlogArticle(id);
      setBlogs(blogs.filter(b => b.id !== id));
      toast.success('Blog article removed.');
    } catch {
      toast.error('Deletion failed.');
    }
  };

  const filtered = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.content?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' ? true : b.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  if (loading) return <SkeletonLoader.Grid count={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">BLOGS PUBLISHER</h1>
          <p className="text-xs text-gym-gray-400">Compose, publish, or edit physical conditioning guides.</p>
        </div>
        <Button variant="primary" onClick={handleAddClick}>
          <FiPlus /> Create Article
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3.5 text-gym-gray-500" />
          <input 
            type="text" 
            placeholder="Search article titles or content..." 
            className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-10 py-3 text-xs text-white focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none font-bold"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Training">Training</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Recovery">Recovery</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No Articles Found" message="Roster is empty. Tap Create Article to publish science guides." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <div key={b.id} className="glass-card p-6 rounded-2xl border border-gym-gray-850 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded tracking-wider border border-primary/20">{b.category}</span>
                  <span className="text-[10px] text-gym-gray-550 font-mono font-medium">{b.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-2.5 leading-normal">{b.title}</h4>
                <p className="text-[10px] text-gym-gray-400 mt-1">By {b.author}</p>
                <p className="text-xs text-gym-gray-500 mt-3 line-clamp-3 leading-relaxed">{b.content || 'No description preview available.'}</p>
              </div>

              <div className="pt-4 border-t border-gym-gray-850 flex justify-between items-center text-xs">
                <button 
                  onClick={() => handlePublishToggle(b)}
                  className={`font-black uppercase tracking-widest text-[9px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                    b.published 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/25'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/25'
                  }`}
                >
                  {b.published ? 'Published' : 'Draft'}
                </button>
                <div className="flex gap-2">
                  <button className="text-gym-gray-400 hover:text-white p-1 transition-colors cursor-pointer" onClick={() => handleEditClick(b)}>
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="text-gym-gray-450 hover:text-red-400 p-1 transition-colors cursor-pointer" onClick={() => handleDelete(b.id)}>
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal isOpen={blogModal} onClose={() => setBlogModal(false)} title={editBlog ? 'Edit Article' : 'Create Article'}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input label="Title" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <Input label="Author" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Category</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Training">Training</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Recovery">Recovery</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Status</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.published ? 'published' : 'draft'}
                onChange={e => setFormData({ ...formData, published: e.target.value === 'published' })}
              >
                <option value="published">Publish Immediately</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Article Content</label>
            <textarea
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none h-40 resize-none"
              placeholder="Write the sports science or nutrition advice content here..."
              required
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setBlogModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editBlog ? 'Save Updates' : 'Publish Article'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================================================================
   7. GALLERY SHOWCASE
   ============================================================================ */
function AdminGallery() {
  const toast = useToast();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [photoModal, setPhotoModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '', category: 'Equipment' });
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const list = await getGalleryPhotos();
        setPhotos(list);
      } catch {
        toast.error('Gallery failed to load.');
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [toast]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newPhoto.url.trim()) return;
    try {
      const res = await uploadGalleryPhoto(newPhoto);
      setPhotos([res, ...photos]);
      setNewPhoto({ url: '', caption: '', category: 'Equipment' });
      setPhotoModal(false);
      toast.success('Media reference registered.');
    } catch {
      toast.error('Upload failed.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGalleryPhoto(id);
      setPhotos(photos.filter(p => p.id !== id));
      toast.success('Gallery media index deleted.');
    } catch {
      toast.error('Delete failed.');
    }
  };

  const filtered = photos.filter(p => categoryFilter === 'all' ? true : p.category === categoryFilter);

  if (loading) return <SkeletonLoader.Grid count={4} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">GALLERY INDEX</h1>
          <p className="text-xs text-gym-gray-400">Moderate showcasing photographic references in public index.</p>
        </div>
        <Button variant="primary" onClick={() => setPhotoModal(true)}>
          <FiPlus /> Add Media URL
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[10px] text-gym-gray-400 uppercase tracking-widest font-black block">Sort Index Grid</span>
        <select
          className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none font-bold"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Equipment">Equipment</option>
          <option value="Amenities">Amenities</option>
          <option value="Events">Events</option>
          <option value="Classes">Classes</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No Media Loaded" message="Roster is empty. Link layout URL structures on the top right panel." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="p-3 bg-gym-gray-900/60 border border-gym-gray-850 rounded-2xl space-y-3 group hover:border-primary transition-all duration-300">
              <div className="h-44 rounded-xl overflow-hidden relative cursor-pointer" onClick={() => setLightboxPhoto(p)}>
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs uppercase font-bold tracking-wider gap-1.5">
                  <FiEye /> Lightbox View
                </div>
              </div>
              <div className="flex justify-between items-center text-xs px-1">
                <div className="min-w-0 flex-1 pr-2">
                  <span className="text-[8px] font-black uppercase text-secondary block">{p.category}</span>
                  <span className="font-bold text-white truncate block mt-0.5">{p.caption}</span>
                </div>
                <button className="text-gym-gray-500 hover:text-red-400 transition-colors p-1 cursor-pointer" onClick={() => handleDelete(p.id)}>
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Photo Modal */}
      <Modal isOpen={photoModal} onClose={() => setPhotoModal(false)} title="Link Showcase Media">
        <form onSubmit={handleUpload} className="space-y-4">
          <Input label="Media URL Link" required placeholder="https://images.unsplash.com/..." value={newPhoto.url} onChange={e => setNewPhoto({ ...newPhoto, url: e.target.value })} />
          <Input label="Caption / Label" required placeholder="e.g. Rack platform layouts" value={newPhoto.caption} onChange={e => setNewPhoto({ ...newPhoto, caption: e.target.value })} />
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Group Classification category</label>
            <select
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
              value={newPhoto.category}
              onChange={e => setNewPhoto({ ...newPhoto, category: e.target.value })}
            >
              <option value="Equipment">Equipment</option>
              <option value="Amenities">Amenities</option>
              <option value="Events">Events</option>
              <option value="Classes">Classes</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setPhotoModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add Photo</Button>
          </div>
        </form>
      </Modal>

      {/* Interactive Lightbox Overlay */}
      <Modal isOpen={lightboxPhoto !== null} onClose={() => setLightboxPhoto(null)} title={lightboxPhoto?.caption || 'Showcase Details'}>
        {lightboxPhoto && (
          <div className="space-y-4">
            <div className="max-h-[400px] overflow-hidden rounded-xl bg-black">
              <img src={lightboxPhoto.url} alt={lightboxPhoto.caption} className="w-full h-full object-contain mx-auto" />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gym-gray-500">Category: <strong className="text-primary font-bold">{lightboxPhoto.category}</strong></span>
              <Button variant="outline" size="sm" onClick={() => setLightboxPhoto(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ============================================================================
   8. MESSAGES INBOX
   ============================================================================ */
function AdminMessages() {
  const toast = useToast();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'David Laurent', email: 'david@laurent.com', subject: 'Corporate wellness rates query', body: 'Requesting rate information for Acme corp employees group coaching packages.', date: 'Today' }
  ]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    setSelectedMessage(null);
    toast.success('Inquiry archive logs deleted.');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">INBOX MESSAGES</h1>
        <p className="text-xs text-gym-gray-400">Review corporate rate inquiries, contact queries, and site submissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Messages List</h3>
          {messages.length === 0 ? (
            <EmptyState title="Inbox Empty" message="All inquiry logs processed. Nice work!" />
          ) : (
            <div className="space-y-2">
              {messages.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMessage(m)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    selectedMessage?.id === m.id
                      ? 'bg-primary/10 border-primary text-white'
                      : 'bg-gym-gray-900 border-gym-gray-850 text-gym-gray-300 hover:border-gym-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold">
                    <span className="truncate max-w-[120px]">{m.sender}</span>
                    <span className="text-[9px] text-gym-gray-500 font-normal">{m.date}</span>
                  </div>
                  <p className="text-[10px] text-gym-gray-400 truncate mt-1">{m.subject}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-6">
              <div className="flex justify-between items-start border-b border-gym-gray-800 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{selectedMessage.subject}</h3>
                  <p className="text-xs text-gym-gray-400 mt-1">From: {selectedMessage.sender} ({selectedMessage.email})</p>
                </div>
                <button className="text-gym-gray-500 hover:text-red-400 p-1 cursor-pointer transition-colors" onClick={() => handleDeleteMessage(selectedMessage.id)}>
                  <FiTrash2 className="w-4.5 h-4.5" />
                </button>
              </div>
              <p className="text-xs text-gym-gray-300 leading-relaxed font-sans select-text">{selectedMessage.body}</p>
            </div>
          ) : (
            <div className="glass-card p-12 rounded-2xl border border-gym-gray-800 text-center bg-gym-gray-900/40">
              <p className="text-xs text-gym-gray-500">Select an inbound message to view its body contents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   9. REPORTS MODULE [NEW]
   ============================================================================ */
function AdminReports() {
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState('membership');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'membership', label: 'Memberships' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'trainer', label: 'Coaches' },
    { id: 'activity', label: 'System Logs' }
  ];

  const loadReport = async () => {
    setLoading(true);
    try {
      const data = await getAdminReports(activeCategory, { startDate, endDate });
      setReportData(data);
    } catch {
      toast.error('Failed to compile reports.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const handleExport = () => {
    toast.success('Document export-ready generation completed.');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">REPORTS GENERATOR</h1>
          <p className="text-xs text-gym-gray-400">Generate, query, and export gym operations, finance, and attendance datasets.</p>
        </div>
        <Button variant="outline" onClick={handleExport} className="flex items-center gap-1.5 text-xs">
          <FiDownload /> Export CSV / Sheet
        </Button>
      </div>

      {/* Nested category switches */}
      <div className="overflow-x-auto no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
        <div className="flex gap-2 min-w-max pb-2 border-b border-gym-gray-850">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'border-primary text-white font-black'
                  : 'border-transparent text-gym-gray-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Filter */}
      <div className="flex flex-wrap items-center gap-3 bg-gym-gray-900/60 p-4 border border-gym-gray-850 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gym-gray-400 uppercase font-bold text-[10px]">Start Date:</span>
          <input type="date" className="bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-1.5 text-white font-mono" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gym-gray-400 uppercase font-bold text-[10px]">End Date:</span>
          <input type="date" className="bg-gym-dark border border-gym-gray-800 rounded px-2.5 py-1.5 text-white font-mono" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <Button variant="primary" className="ml-auto" onClick={loadReport}>Query Report</Button>
      </div>

      {loading ? (
        <SkeletonLoader.Table cols={5} rows={4} />
      ) : reportData ? (
        <div className="space-y-6">
          {/* Summary Matrix Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportData.summary.map((sum, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-gym-gray-850 bg-gym-gray-900/40">
                <span className="text-[10px] text-gym-gray-450 uppercase font-bold tracking-widest">{sum.label}</span>
                <p className="text-2xl font-black text-white font-display mt-2">{sum.value}</p>
                <span className="text-[9px] text-gym-gray-500 font-mono mt-1 block">{sum.desc}</span>
              </div>
            ))}
          </div>

          {/* Records Table */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-white tracking-wider border-b border-gym-gray-800 pb-2">
                    {reportData.headers.map((h, i) => <th key={i} className="pb-3 pr-4">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-850">
                  {reportData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gym-gray-900/10">
                      <td className="py-3.5 pr-4 font-bold text-white">{row.c1}</td>
                      <td className="py-3.5 pr-4">{row.c2}</td>
                      <td className="py-3.5 pr-4 font-mono text-secondary">{row.c3}</td>
                      <td className="py-3.5 pr-4 font-mono">{row.c4}</td>
                      <td className="py-3.5 pr-4 font-bold uppercase text-[9px] text-gym-gray-500">{row.c5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState title="No Records Query" message="Check parameters filters above to query reports." />
      )}
    </div>
  );
}

/* ============================================================================
   10. TESTIMONIALS [NEW]
   ============================================================================ */
function AdminTestimonials() {
  const toast = useToast();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tstModal, setTstModal] = useState(false);
  const [editTst, setEditTst] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', role: '', quote: '', rating: 5, featured: false, photo: '' });

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const list = await getTestimonials();
        setTestimonials(list);
      } catch {
        toast.error('Testimonials failed to sync.');
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, [toast]);

  const handleFeaturedToggle = async (t) => {
    const featuredState = !t.featured;
    try {
      await updateTestimonial(t.id, { featured: featuredState });
      setTestimonials(testimonials.map(item => item.id === t.id ? { ...item, featured: featuredState } : item));
      toast.success(featuredState ? 'Highlight featured testimonials applied.' : 'Featured tag disabled.');
    } catch {
      toast.error('Update status failed.');
    }
  };

  const handleEditClick = (t) => {
    setEditTst(t);
    setFormData({ name: t.name, role: t.role, quote: t.quote, rating: t.rating || 5, featured: t.featured, photo: t.photo || '' });
    setTstModal(true);
  };

  const handleAddClick = () => {
    setEditTst(null);
    setFormData({ name: '', role: '', quote: '', rating: 5, featured: false, photo: '' });
    setTstModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    if (editTst) {
      try {
        await updateTestimonial(editTst.id, formData);
        setTestimonials(testimonials.map(item => item.id === editTst.id ? { ...item, ...formData } : item));
        toast.success('Testimonial summary record updated.');
        setTstModal(false);
      } catch {
        toast.error('Update failed.');
      }
    } else {
      try {
        const res = await createTestimonial(formData);
        setTestimonials([res, ...testimonials]);
        toast.success('New testimonial registered.');
        setTstModal(false);
      } catch {
        toast.error('Registration failed.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success('Testimonial removed from database.');
    } catch {
      toast.error('Deletion failed.');
    }
  };

  if (loading) return <SkeletonLoader.Grid count={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">TESTIMONIALS MANAGER</h1>
          <p className="text-xs text-gym-gray-400">Moderate member feedback and feature highlighted reviews on public site.</p>
        </div>
        <Button variant="primary" onClick={handleAddClick}>
          <FiPlus /> Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <EmptyState title="No Testimonials Found" message="Feedback catalog is empty. Tap Add Testimonial to log review items." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card p-6 rounded-2xl border border-gym-gray-850 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} className="fill-primary" />)}
                  </div>
                  <button 
                    onClick={() => handleFeaturedToggle(t)}
                    className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      t.featured 
                        ? 'bg-primary/25 border-primary text-primary'
                        : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-500'
                    }`}
                  >
                    Featured
                  </button>
                </div>
                <p className="text-xs text-gym-gray-300 mt-4 leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="pt-4 border-t border-gym-gray-850 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</h4>
                  <p className="text-[10px] text-gym-gray-500">{t.role}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gym-gray-400 hover:text-white p-1 transition-colors cursor-pointer" onClick={() => handleEditClick(t)}>
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="text-gym-gray-450 hover:text-red-400 p-1 transition-colors cursor-pointer" onClick={() => handleDelete(t.id)}>
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonial Form Modal */}
      <Modal isOpen={tstModal} onClose={() => setTstModal(false)} title={editTst ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input label="Member Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <Input label="Member Designation / Role" placeholder="e.g. Competitive Lifter" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Rating Score</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.rating}
                onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Featured Index</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={formData.featured ? 'featured' : 'standard'}
                onChange={e => setFormData({ ...formData, featured: e.target.value === 'featured' })}
              >
                <option value="featured">Display Featured</option>
                <option value="standard">Standard Roster</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Quote Testimonial</label>
            <textarea
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none h-30 resize-none"
              required
              placeholder="Write the athlete's quote feedback here..."
              value={formData.quote}
              onChange={e => setFormData({ ...formData, quote: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gym-gray-800">
            <Button variant="outline" onClick={() => setTstModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editTst ? 'Save Updates' : 'Add Testimonial'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ============================================================================
   11. ANNOUNCEMENTS [NEW]
   ============================================================================ */
function AdminAnnouncements() {
  const toast = useToast();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAnn, setNewAnn] = useState({ title: '', message: '', priority: 'Normal', expirationDate: '' });

  useEffect(() => {
    const loadAnn = async () => {
      try {
        const list = await getAnnouncements();
        setAnnouncements(list);
      } catch {
        toast.error('Announcements failed to sync.');
      } finally {
        setLoading(false);
      }
    };
    loadAnn();
  }, [toast]);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newAnn.title.trim() || !newAnn.message.trim()) return;

    try {
      const res = await createAnnouncement({
        ...newAnn,
        publishDate: new Date().toISOString().split('T')[0]
      });
      setAnnouncements([res, ...announcements]);
      setNewAnn({ title: '', message: '', priority: 'Normal', expirationDate: '' });
      toast.success('Announcement broadcast published to users.');
    } catch {
      toast.error('Failed to broadcast.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter(a => a.id !== id));
      toast.success('Announcement deleted from broadcast list.');
    } catch {
      toast.error('Deletion failed.');
    }
  };

  if (loading) return <SkeletonLoader.Table cols={4} rows={3} />;

  return (
    <div className="space-y-8">
      <div className="border-b border-gym-gray-800 pb-6">
        <h1 className="text-2xl md:text-3xl font-black font-display text-white">ANNOUNCEMENTS BROADCASTER</h1>
        <p className="text-xs text-gym-gray-400">Compose and publish notifications alerts broadcasts to members and coaches portals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handlePublish} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Publish Notice</h3>
          <Input label="Notice Title" required value={newAnn.title} onChange={e => setNewAnn({ ...newAnn, title: e.target.value })} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Priority</label>
              <select
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none"
                value={newAnn.priority}
                onChange={e => setNewAnn({ ...newAnn, priority: e.target.value })}
              >
                <option value="Normal">Normal</option>
                <option value="Medium">Medium</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Expiration Date</label>
              <input
                type="date"
                className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none font-mono"
                value={newAnn.expirationDate}
                onChange={e => setNewAnn({ ...newAnn, expirationDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gym-gray-400 font-bold uppercase tracking-wider">Message Content</label>
            <textarea
              className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none h-24 resize-none"
              placeholder="Write the notice statement details here..."
              required
              value={newAnn.message}
              onChange={e => setNewAnn({ ...newAnn, message: e.target.value })}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center">Publish Broadcast</Button>
        </form>

        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
            <FiBell className="text-primary" /> Active Broadcasts List
          </h3>
          {announcements.length === 0 ? (
            <EmptyState title="No Active Notices" message="Broadcasting board is empty. Write alerts on the left panel." />
          ) : (
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="p-4 bg-gym-dark border border-gym-gray-855 rounded-xl flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">{a.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${
                        a.priority === 'Urgent' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                          : a.priority === 'Medium'
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            : 'bg-gym-gray-850 text-gym-gray-450 border-gym-gray-700'
                      }`}>
                        {a.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gym-gray-300 leading-relaxed leading-normal mt-1.5">{a.message}</p>
                    <p className="text-[9px] text-gym-gray-550 font-mono pt-1">
                      Published: {a.publishDate} &bull; Expiration: {a.expirationDate || 'Never'}
                    </p>
                  </div>
                  <button className="text-gym-gray-500 hover:text-red-400 transition-colors p-1 cursor-pointer" onClick={() => handleDelete(a.id)}>
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
      </Routes>
    </ErrorBoundary>
  );
}
