import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { 
  FiUsers, FiTrendingUp, FiSettings, FiActivity, FiUser, 
  FiCalendar, FiCreditCard, FiBookOpen, FiImage, FiMail, 
  FiTrash2, FiPlus, FiUserCheck, FiStar, FiFileText, FiMessageSquare
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { 
  getAdminOverviewMetrics, getAdminUsers, updateAdminUser, deleteAdminUser
} from '@/services/firebase/db';

// --- SUB-COMPONENTS ---

function AdminOverview() {
  const [metrics, setMetrics] = useState({
    activeMembers: 120,
    monthlyRevenue: 10680,
    growthRate: 15.4,
    totalTrainers: 6,
    totalClassesBooked: 242
  });

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const met = await getAdminOverviewMetrics();
        setMetrics(met);
      } catch (err) {
        console.warn('Overview metrics load fallback.');
      }
    };
    loadOverview();
  }, []);

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
    { id: 2, action: 'Dietary Update Logged', target: 'for Marcus Chen', user: { name: 'Coach Sarah' }, timestamp: '10m ago', status: 'info' },
    { id: 3, action: 'Equipment Maintenance Checked', target: 'Power Racks', user: { name: 'Admin Desk' }, timestamp: '1h ago', status: 'success' },
    { id: 4, action: 'VIP Plan Upgrade Completed', target: 'for Sarah Miller', user: { name: 'Sarah Miller' }, timestamp: '3h ago', status: 'pending' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Momentum Fitness Control</title>
      </Helmet>

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
              <a href="/admin/users" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiUsers className="text-primary shrink-0" /> Manage Members Registry
              </a>
              <a href="/admin/bookings" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCalendar className="text-primary shrink-0" /> View Session Bookings
              </a>
              <a href="/admin/plans" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCreditCard className="text-primary shrink-0" /> Edit Pricing Config
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminUsers() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
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
        console.warn('Fallback users registry loaded.');
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

  return (
    <>
      <Helmet>
        <title>Manage Members | Admin Command</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black font-display text-white">USERS REGISTRY</h1>
            <p className="text-xs text-gym-gray-400">Search, filter, update credentials, or delete member profiles.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="flex-1 bg-gym-gray-900 border border-gym-gray-800 rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <select
              className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="member">Members</option>
              <option value="trainer">Trainers</option>
              <option value="admin">Admins</option>
            </select>
            <select
              className="bg-gym-gray-900 border border-gym-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

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
                        <p className="font-bold text-white">{u.name}</p>
                        <p className="text-[10px] text-gym-gray-500 font-mono">{u.email}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="bg-gym-gray-850 px-2.5 py-0.5 rounded font-bold uppercase text-[9px] border border-gym-gray-700">{u.role}</span>
                      </td>
                      <td className="py-4 pr-4">{u.plan || 'N/A'}</td>
                      <td className="py-4 pr-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
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
                          className="text-xs font-bold text-primary hover:underline uppercase"
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
              <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">User: {selectedUser.name}</h3>
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gym-gray-500">Email:</span>
                  <span className="text-white font-mono">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gym-gray-500">Role:</span>
                  <select
                    className="bg-gym-dark border border-gym-gray-800 rounded px-2 py-1 text-white text-[10px] uppercase font-bold focus:outline-none"
                    value={selectedUser.role}
                    onChange={e => handleUpdateRole(selectedUser.id, e.target.value)}
                  >
                    <option value="member">Member</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gym-gray-500">Membership status:</span>
                  <Button variant="outline" size="sm" onClick={() => handleToggleStatus(selectedUser.id)}>
                    {selectedUser.status === 'Suspended' ? 'Activate' : 'Suspend'}
                  </Button>
                </div>
                <div className="pt-4 border-t border-gym-gray-850 flex justify-between">
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
      </div>
    </>
  );
}

function AdminTrainers() {
  const toast = useToast();
  const [trainers, setTrainers] = useState([
    { id: 't1', name: 'Marcus Vance', specialty: 'Power & Barbell Training', experience: '12 Years', rating: '4.95' },
    { id: 't2', name: 'Sarah Rodriguez', specialty: 'HIIT & Metabolic Conditioning', experience: '8 Years', rating: '5.00' }
  ]);
  const [newTrainer, setNewTrainer] = useState({ name: '', specialty: '', experience: '' });

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!newTrainer.name.trim()) return;
    const item = {
      id: Math.random().toString(),
      name: newTrainer.name.trim(),
      specialty: newTrainer.specialty.trim() || 'Coaching',
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

  return (
    <>
      <Helmet>
        <title>Manage Trainers | Admin Dashboard</title>
      </Helmet>

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
            <div className="space-y-3">
              {trainers.map(t => (
                <div key={t.id} className="p-4 bg-gym-dark border border-gym-gray-850 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-gym-gray-400 mt-1">{t.specialty} &bull; {t.experience} Experience</p>
                  </div>
                  <button className="text-gym-gray-500 hover:text-red-400 transition-colors" onClick={() => handleDeleteTrainer(t.id)}>
                    <FiTrash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
    <>
      <Helmet>
        <title>Manage Plans | Admin Dashboard</title>
      </Helmet>

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
    </>
  );
}

function AdminBookings() {
  const toast = useToast();
  const [bookings, setBookings] = useState([
    { id: 1, client: 'Marcus Chen', type: 'Class Booking', details: 'Power & Barbell Club', date: 'Monday', time: '18:00', status: 'Approved' },
    { id: 2, client: 'Sarah Miller', type: 'Private Coach', details: 'with Sarah Rodriguez', date: '2026-07-06', time: '09:00', status: 'Pending' }
  ]);

  const handleAction = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    toast.success(`Booking status changed to ${newStatus}.`);
  };

  return (
    <>
      <Helmet>
        <title>Manage Bookings | Admin Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">MASTER APPOINTMENTS</h1>
          <p className="text-xs text-gym-gray-400">View and moderate all classes reservations and trainer schedules.</p>
        </div>

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
                {bookings.map((b) => (
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
                          <button onClick={() => handleAction(b.id, 'Cancelled')} className="px-2.5 py-1 bg-gym-gray-850 text-red-400 border border-gym-gray-700 font-bold text-[9px] uppercase tracking-wider rounded cursor-pointer">Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminBlogs() {
  const toast = useToast();
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Structural Hypertrophy Cycles', author: 'Coach Marcus', date: '2026-06-28' }
  ]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '' });

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newBlog.title.trim()) return;
    const item = {
      id: Date.now(),
      title: newBlog.title.trim(),
      author: newBlog.author.trim() || 'Administrator',
      date: new Date().toISOString().split('T')[0]
    };
    setBlogs([item, ...blogs]);
    setNewBlog({ title: '', author: '' });
    toast.success('Sports science blog article published.');
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
    toast.success('Blog article removed.');
  };

  return (
    <>
      <Helmet>
        <title>Manage Blogs | Admin Command</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">BLOGS PUBLISHER</h1>
          <p className="text-xs text-gym-gray-400">Compose and publish new physical optimization guides.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handlePublish} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Publish Article</h3>
            <Input label="Article Title" required value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
            <Input label="Author Name" value={newBlog.author} onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} />
            <Button type="submit" variant="primary" className="w-full justify-center">Publish Guide</Button>
          </form>

          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Published Guides</h3>
            <div className="space-y-3">
              {blogs.map(b => (
                <div key={b.id} className="p-4 bg-gym-dark border border-gym-gray-850 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{b.title}</h4>
                    <p className="text-[10px] text-gym-gray-400 mt-1">Written by {b.author} on {b.date}</p>
                  </div>
                  <button className="text-gym-gray-500 hover:text-red-400 transition-colors" onClick={() => handleDeleteBlog(b.id)}>
                    <FiTrash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminGallery() {
  const toast = useToast();
  const [photos, setPhotos] = useState([
    { id: 1, caption: 'Eleiko calibrated plates stack', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80' }
  ]);
  const [newPhoto, setNewPhoto] = useState({ caption: '', url: '' });

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.url.trim()) return;
    const item = {
      id: Date.now(),
      caption: newPhoto.caption.trim() || 'Gym Racks Layout',
      url: newPhoto.url.trim()
    };
    setPhotos([item, ...photos]);
    setNewPhoto({ caption: '', url: '' });
    toast.success('Gallery media index successfully updated.');
  };

  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
    toast.success('Gallery media reference deleted.');
  };

  return (
    <>
      <Helmet>
        <title>Manage Showcase | Admin Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">GALLERY SHOWCASE</h1>
          <p className="text-xs text-gym-gray-400">Moderate layout photographs and media links in gym showcase index.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleAddPhoto} className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Link Photo Reference</h3>
            <Input label="Media URL Link" required value={newPhoto.url} onChange={e => setNewPhoto({ ...newPhoto, url: e.target.value })} />
            <Input label="Short Caption" value={newPhoto.caption} onChange={e => setNewPhoto({ ...newPhoto, caption: e.target.value })} />
            <Button type="submit" variant="primary" className="w-full justify-center">Publish Media</Button>
          </form>

          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Active Gallery Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {photos.map(p => (
                <div key={p.id} className="p-3 bg-gym-dark border border-gym-gray-850 rounded-xl space-y-3">
                  <div className="h-32 rounded overflow-hidden">
                    <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white truncate max-w-[150px]">{p.caption}</span>
                    <button className="text-gym-gray-500 hover:text-red-400 transition-colors" onClick={() => handleDeletePhoto(p.id)}>
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
    <>
      <Helmet>
        <title>Messages Inbox | Admin Dashboard</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">INBOX MESSAGES</h1>
          <p className="text-xs text-gym-gray-400">Review corporate rate inquiries, contact queries, and site submissions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4 h-fit">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-gym-gray-800 pb-2">Messages List</h3>
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
    </>
  );
}

// --- MAIN WRAPPER ---

export default function AdminDashboard() {
  return (
    <Routes>
      <Route index element={<AdminOverview />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="trainers" element={<AdminTrainers />} />
      <Route path="plans" element={<AdminPlans />} />
      <Route path="bookings" element={<AdminBookings />} />
      <Route path="blogs" element={<AdminBlogs />} />
      <Route path="gallery" element={<AdminGallery />} />
      <Route path="messages" element={<AdminMessages />} />
    </Routes>
  );
}
