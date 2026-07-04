import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { 
  FiUsers, FiTrendingUp, FiSettings, FiActivity, FiUser, 
  FiCalendar, FiCreditCard, FiBookOpen, FiImage, FiMail, 
  FiTrash2, FiPlus, FiUserCheck 
} from 'react-icons/fi';
import StatCard from '@/components/dashboard/StatCard';
import DashboardChart from '@/components/dashboard/DashboardChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';

// --- SUB-COMPONENTS ---

function AdminOverview() {
  const stats = [
    { label: 'Monthly Revenue', value: '$82,430', icon: <FiTrendingUp />, trend: { value: '+8.1%', isPositive: true }, colorType: 'primary' },
    { label: 'Active Members', value: '14,820', icon: <FiUsers />, trend: { value: '+4.2%', isPositive: true }, colorType: 'secondary' },
    { label: 'Staff Coaches', value: '42', icon: <FiActivity />, description: 'All active on floor', colorType: 'pink' },
    { label: 'Gym Floor Load', value: '45%', icon: <FiSettings />, description: 'Optimal load today', colorType: 'primary' }
  ];

  const revenueData = [
    { label: 'Jan', value: 72000 },
    { label: 'Feb', value: 75000 },
    { label: 'Mar', value: 78000 },
    { label: 'Apr', value: 76000 },
    { label: 'May', value: 80000 },
    { label: 'Jun', value: 82430 }
  ];

  const memberData = [
    { label: 'Jan', value: 12000 },
    { label: 'Feb', value: 12600 },
    { label: 'Mar', value: 13100 },
    { label: 'Apr', value: 13800 },
    { label: 'May', value: 14200 },
    { label: 'Jun', value: 14820 }
  ];

  const occupancyData = [
    { label: 'Mon', value: 35 },
    { label: 'Tue', value: 45 },
    { label: 'Wed', value: 55 },
    { label: 'Thu', value: 40 },
    { label: 'Fri', value: 65 },
    { label: 'Sat', value: 50 },
    { label: 'Sun', value: 20 }
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
        <meta name="description" content="Manage gym configurations, memberships, reports, and administrative logs." />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">ADMIN COMMAND CENTER</h1>
          <p className="text-xs text-gym-gray-400">Track operations, metrics, and manage user bases.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, idx) => (
            <StatCard key={idx} {...st} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DashboardChart 
            title="Monthly Revenue Trend"
            subtitle="Gross income comparison MoM"
            totalValue="$82,430"
            trend={{ value: '+8.1%', isPositive: true }}
            data={revenueData}
            layout="line"
            colorType="primary"
          />

          <DashboardChart 
            title="Member Count Growth"
            subtitle="Active registered members index"
            totalValue="14,820"
            trend={{ value: '+4.2%', isPositive: true }}
            data={memberData}
            layout="line"
            colorType="secondary"
          />

          <div className="lg:col-span-2">
            <DashboardChart 
              title="Daily Booking Occupancy"
              subtitle="Floor capacity load per day"
              data={occupancyData}
              layout="bar"
              colorType="pink"
            />
          </div>
        </div>

        {/* Audits & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ActivityFeed title="Live System Audit" activities={adminLogs} />
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3">
              <FiSettings className="text-secondary" /> System Health
            </h3>
            <div className="space-y-3.5 text-xs text-gym-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-gym-gray-400 font-semibold">Database Connection</span>
                <span className="text-primary font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gym-gray-400 font-semibold">Server Latency</span>
                <span className="text-white font-bold">14ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gym-gray-400 font-semibold">Backup Status</span>
                <span className="text-secondary font-bold">COMPLETED (1h ago)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'James Foster', email: 'james.f@gmail.com', role: 'member', plan: 'Elite Plan', status: 'Active' },
    { id: 2, name: 'Sarah Miller', email: 's.miller@outlook.com', role: 'member', plan: 'VIP Plan', status: 'Active' },
    { id: 3, name: 'Coach Sarah Rodriguez', email: 'sarah.r@momentum.fit', role: 'trainer', plan: 'N/A', status: 'Active' },
    { id: 4, name: 'Marcus Vance', email: 'marcus.v@momentum.fit', role: 'trainer', plan: 'N/A', status: 'Active' },
    { id: 5, name: 'David Laurent', email: 'david.laurent@yahoo.com', role: 'member', plan: 'Standard Plan', status: 'Suspended' },
    { id: 6, name: 'Alistair Sterling', email: 'alistair@sterling.io', role: 'admin', plan: 'N/A', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' ? true : u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUpdateRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser({ ...selectedUser, role: newRole });
    }
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser({ ...selectedUser, status: selectedUser.status === 'Active' ? 'Suspended' : 'Active' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Users Registry | Admin Command Center</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">USERS DIRECTORY</h1>
          <p className="text-xs text-gym-gray-400">Search members, alter access authorization roles, and toggle account states.</p>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gym-gray-900 border border-gym-gray-800 p-4 rounded-xl">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Search User</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-gym-gray-950 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Filter Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-gym-gray-950 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="member">Member</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Filter Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gym-gray-950 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table list */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">System Accounts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-white border-b border-gym-gray-800 pb-2">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-800/40">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-gym-gray-900/30 transition-colors">
                      <td className="py-3">
                        <p className="font-bold text-white">{u.name}</p>
                        <p className="text-[10px] text-gym-gray-500">{u.email}</p>
                      </td>
                      <td className="py-3 uppercase text-[10px] font-bold text-secondary">{u.role}</td>
                      <td className="py-3">{u.plan}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          u.status === 'Active' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="px-2.5 py-1 bg-gym-gray-800 border border-gym-gray-700 hover:border-primary hover:text-white rounded text-[10px] font-bold uppercase transition-all cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manage Account sidebar */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
              <FiUserCheck className="text-primary" /> Authority Control
            </h3>
            
            {selectedUser ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedUser.name}</h4>
                  <p className="text-[10px] text-gym-gray-400">{selectedUser.email}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold text-gym-gray-400">Change Role</label>
                  <div className="flex gap-2">
                    {['member', 'trainer', 'admin'].map(r => (
                      <button
                        key={r}
                        onClick={() => handleUpdateRole(selectedUser.id, r)}
                        className={`flex-1 py-1 rounded text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                          selectedUser.role === r 
                            ? 'bg-primary/10 border-primary text-primary font-bold' 
                            : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-400 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gym-gray-800/60">
                  <label className="block text-[10px] uppercase font-bold text-gym-gray-400">Access Status</label>
                  <button
                    onClick={() => handleToggleStatus(selectedUser.id)}
                    className={`w-full py-2 rounded text-xs font-bold uppercase border transition-all cursor-pointer ${
                      selectedUser.status === 'Active'
                        ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                        : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/20'
                    }`}
                  >
                    {selectedUser.status === 'Active' ? 'Suspend Membership' : 'Activate Membership'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gym-gray-500 text-center py-6">Select an account from the roster directory to manage authorization parameters.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function AdminTrainers() {
  const [trainers, setTrainers] = useState([
    { id: 1, name: 'Marcus Vance', role: 'Head Strength Coach', clients: 12, rating: '4.9', schedule: 'Mon-Fri: 06:00 - 15:00' },
    { id: 2, name: 'Sarah Rodriguez', role: 'Senior Conditioning Specialist', clients: 15, rating: '4.95', schedule: 'Mon-Thu: 09:00 - 18:00' },
    { id: 3, name: 'Damian Thorne', role: 'Olympic Weightlifting Lead', clients: 8, rating: '4.85', schedule: 'Tue-Sat: 12:00 - 20:00' }
  ]);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!name || !role) return;
    const newTrainer = {
      id: Date.now(),
      name,
      role,
      clients: 0,
      rating: '5.0',
      schedule: schedule || 'Mon-Fri: 09:00 - 17:00'
    };
    setTrainers([...trainers, newTrainer]);
    setName('');
    setRole('');
    setSchedule('');
  };

  const handleRemoveTrainer = (id) => {
    setTrainers(trainers.filter(t => t.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Staff Roster | Admin Control</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">STAFF ROSTER</h1>
          <p className="text-xs text-gym-gray-400">Manage coaching staff directory, client loads, and floor shift schedules.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Trainer Roster Table */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">Coaching Staff</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-white border-b border-gym-gray-800 pb-2">
                    <th className="pb-3">Coach</th>
                    <th className="pb-3">Specialty</th>
                    <th className="pb-3">Load / Rating</th>
                    <th className="pb-3">Shift Hours</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-800/40">
                  {trainers.map(t => (
                    <tr key={t.id} className="hover:bg-gym-gray-900/30 transition-colors">
                      <td className="py-4 font-bold text-white">{t.name}</td>
                      <td className="py-4 font-semibold text-secondary">{t.role}</td>
                      <td className="py-4">
                        <p>{t.clients} Clients active</p>
                        <p className="text-yellow-400 font-bold text-[10px]">★ {t.rating}</p>
                      </td>
                      <td className="py-4 font-mono text-[10px]">{t.schedule}</td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleRemoveTrainer(t.id)}
                          className="text-red-400 hover:text-red-300 font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Coach Profile Form */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
              <FiPlus className="text-primary" /> Onboard Coach
            </h3>
            <form onSubmit={handleAddTrainer} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Coach Damien"
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Title / Specialty</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Olympic Weightlifting Specialist"
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Shift Timetable</label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="e.g. Mon-Fri: 06:00 - 15:00"
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all cursor-pointer"
              >
                Add Staff Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminPlans() {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Vanguard VIP', price: '$249', billing: 'monthly', features: ['Unrestricted 24/7 Access', '1-on-1 Dedicated Coach', 'Customized Nutrition Blueprint', 'Recovery Lounge Access'] },
    { id: 2, name: 'Elite Performance', price: '$149', billing: 'monthly', features: ['Unrestricted 24/7 Access', 'Weekly Coaching Audits', 'Standard Training Programs', 'Sauna Access'] },
    { id: 3, name: 'Standard Access', price: '$89', billing: 'monthly', features: ['Floor Access (08:00 - 22:00)', 'Locker Room Privileges', 'Basic Orientation Slot'] }
  ]);

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [priceInput, setPriceInput] = useState(plans[0].price);
  const [featuresInput, setFeaturesInput] = useState(plans[0].features.join(', '));

  const handleSelectPlan = (p) => {
    setSelectedPlan(p);
    setPriceInput(p.price);
    setFeaturesInput(p.features.join(', '));
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    const updated = plans.map(p => {
      if (p.id === selectedPlan.id) {
        return {
          ...p,
          price: priceInput,
          features: featuresInput.split(',').map(f => f.trim()).filter(Boolean)
        };
      }
      return p;
    });
    setPlans(updated);
    const refreshed = updated.find(p => p.id === selectedPlan.id);
    setSelectedPlan(refreshed);
    alert('Plan parameters updated successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Pricing Plans | Admin Control</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">MEMBERSHIP CONFIGURATOR</h1>
          <p className="text-xs text-gym-gray-400">Modify subscription prices, duration definitions, and tier privileges.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tiers List */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {plans.map(p => (
              <div 
                key={p.id}
                onClick={() => handleSelectPlan(p)}
                className={`glass-card p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                  selectedPlan.id === p.id 
                    ? 'border-primary shadow-[0_0_20px_rgba(204,255,0,0.1)] bg-gym-gray-900' 
                    : 'border-gym-gray-800 hover:border-gym-gray-700 bg-gym-gray-900/60'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-white uppercase text-xs tracking-wider">{p.name}</h3>
                    <p className="text-2xl font-black text-white font-display mt-2">{p.price} <span className="text-[10px] text-gym-gray-500">/{p.billing}</span></p>
                  </div>
                  <ul className="space-y-2 text-[10px] text-gym-gray-400">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-primary rounded-full shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="text-[9px] text-primary uppercase font-bold tracking-widest mt-6 block">Configure Tier</span>
              </div>
            ))}
          </div>

          {/* Pricing Parameters Form */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
              <FiCreditCard className="text-primary" /> Pricing Parameters
            </h3>
            
            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">{selectedPlan.name}</h4>
                <p className="text-[10px] text-gym-gray-500">Edit options for {selectedPlan.name} tier.</p>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Monthly Price</label>
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Features list (comma separated)</label>
                <textarea
                  rows="5"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all cursor-pointer"
              >
                Save Tier Changes
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

function AdminBookings() {
  const [bookings, setBookings] = useState([
    { id: 1, client: 'Marcus Chen', coach: 'Marcus Vance', time: 'Today, 18:00', type: 'Personal Coaching', status: 'Approved' },
    { id: 2, client: 'Sarah Miller', coach: 'Sarah Rodriguez', time: 'Friday, 07:00', type: 'Conditioning Class', status: 'Approved' },
    { id: 3, client: 'Ethan Caldwell', coach: 'Marcus Vance', time: 'Tomorrow, 11:00', type: 'Powerlifting Check-in', status: 'Approved' },
    { id: 4, client: 'James Foster', coach: 'Sarah Rodriguez', time: 'Today, 14:00', type: 'General Assessment', status: 'Pending Review' },
    { id: 5, client: 'David Laurent', coach: 'Damian Thorne', time: 'Monday, 10:00', type: 'Weightlifting Coaching', status: 'Approved' }
  ]);

  const [search, setSearch] = useState('');
  const [coachFilter, setCoachFilter] = useState('all');

  const filtered = bookings.filter(b => {
    const matchesSearch = b.client.toLowerCase().includes(search.toLowerCase()) || b.type.toLowerCase().includes(search.toLowerCase());
    const matchesCoach = coachFilter === 'all' ? true : b.coach === coachFilter;
    return matchesSearch && matchesCoach;
  });

  const handleApprove = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Approved' } : b));
  };

  const handleCancel = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
  };

  return (
    <>
      <Helmet>
        <title>Master Bookings | Admin Control</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">MASTER APPOINTMENTS</h1>
          <p className="text-xs text-gym-gray-400">Database of scheduled private sessions, squad classes, and trainer floor load bookings.</p>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gym-gray-900 border border-gym-gray-800 p-4 rounded-xl">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Search Client or Session</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client or session type..."
              className="w-full bg-gym-gray-950 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Filter Coach</label>
            <select
              value={coachFilter}
              onChange={(e) => setCoachFilter(e.target.value)}
              className="w-full bg-gym-gray-950 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
            >
              <option value="all">All Coaches</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Sarah Rodriguez">Sarah Rodriguez</option>
              <option value="Damian Thorne">Damian Thorne</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4">
          <h3 className="text-sm uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
            <FiCalendar className="text-primary" /> Scheduled Appointments
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gym-gray-400">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-white border-b border-gym-gray-800 pb-2">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Assigned Coach</th>
                  <th className="pb-3">Timetable Slot</th>
                  <th className="pb-3">Session Category</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gym-gray-800/40">
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-gym-gray-900/30 transition-colors">
                    <td className="py-4 font-bold text-white">{b.client}</td>
                    <td className="py-4 font-semibold text-secondary">{b.coach}</td>
                    <td className="py-4">{b.time}</td>
                    <td className="py-4 font-medium text-gym-gray-300">{b.type}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        b.status === 'Approved' 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : b.status === 'Pending Review' 
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {b.status === 'Pending Review' && (
                          <button
                            onClick={() => handleApprove(b.id)}
                            className="px-2 py-1 bg-primary text-gym-dark font-bold text-[10px] uppercase rounded hover:bg-primary-dark transition-all cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleCancel(b.id)}
                            className="px-2 py-1 bg-gym-gray-850 border border-gym-gray-700 hover:bg-red-500/10 text-red-400 rounded text-[10px] font-bold uppercase transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        {b.status === 'Cancelled' && (
                          <span className="text-[10px] text-gym-gray-500 italic">Terminated</span>
                        )}
                      </div>
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
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'The Mechanics of Squat Depth', category: 'Strength', status: 'Published', date: '2026-07-02' },
    { id: 2, title: 'Macronutrients Simplified for Fat Loss', category: 'Nutrition', status: 'Published', date: '2026-06-29' },
    { id: 3, title: 'Olympic Lifting: Pulling from the Floor', category: 'Olympic Lifting', status: 'Draft', date: '2026-06-25' }
  ]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Strength');
  const [status, setStatus] = useState('Draft');
  const [content, setContent] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title) return;
    const newBlog = {
      id: Date.now(),
      title,
      category,
      status,
      date: new Date().toISOString().split('T')[0]
    };
    setBlogs([newBlog, ...blogs]);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Articles Publisher | Admin Control</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">ARTICLE PUBLISHER</h1>
          <p className="text-xs text-gym-gray-400">Publish performance logs, athletic research, and coaching updates.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Articles list */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">Articles Index</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gym-gray-400">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-white border-b border-gym-gray-800 pb-2">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Release Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gym-gray-800/40">
                  {blogs.map(b => (
                    <tr key={b.id} className="hover:bg-gym-gray-900/30 transition-colors">
                      <td className="py-4 font-bold text-white">{b.title}</td>
                      <td className="py-4 text-secondary font-semibold uppercase text-[10px]">{b.category}</td>
                      <td className="py-4 font-mono text-[10px]">{b.date}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          b.status === 'Published' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gym-gray-800 text-gym-gray-400 border border-gym-gray-700'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="text-red-400 hover:text-red-300 font-bold uppercase text-[10px] tracking-wider cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Publisher Form */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
              <FiBookOpen className="text-primary" /> Create Post
            </h3>
            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Post Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mechanical Advantage of Deadlifts"
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Conditioning">Conditioning</option>
                    <option value="Olympic Lifting">Olympic Lifting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">State</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Article Content</label>
                <textarea
                  rows="6"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full post markdown content here..."
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all cursor-pointer"
              >
                Publish Article
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

function AdminGallery() {
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600', description: 'Strength Platform Area', tag: 'Facility' },
    { id: 2, url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600', description: 'Sprint Turf Training', tag: 'Athletes' },
    { id: 3, url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600', description: 'Power Rack Rigs', tag: 'Equipment' }
  ]);

  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('Facility');

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!url || !description) return;
    const newPhoto = {
      id: Date.now(),
      url,
      description,
      tag
    };
    setPhotos([newPhoto, ...photos]);
    setUrl('');
    setDescription('');
  };

  const handleDeletePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Gallery Manager | Admin Control</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">GALLERY MANAGER</h1>
          <p className="text-xs text-gym-gray-400">Add, tag, or delete visual showcase assets from the public website gallery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Photo Showcase Grid */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">Active Assets</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map(p => (
                <div key={p.id} className="relative group rounded-xl overflow-hidden border border-gym-gray-800 bg-gym-gray-950 flex flex-col justify-between">
                  <div className="aspect-video w-full overflow-hidden bg-gym-gray-900">
                    <img src={p.url} alt={p.description} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                  </div>
                  <div className="p-3 space-y-1">
                    <span className="text-[8px] uppercase tracking-widest font-black text-secondary">{p.tag}</span>
                    <p className="text-xs font-bold text-white truncate">{p.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePhoto(p.id)}
                    className="absolute top-2 right-2 p-1.5 bg-gym-dark/80 border border-gym-gray-800 rounded-lg text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload asset form */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest border-b border-gym-gray-800 pb-3 flex items-center gap-1.5">
              <FiPlus className="text-primary" /> Add Photo Asset
            </h3>
            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Image URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Free Weights area"
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gym-gray-400 mb-1.5">Gallery Section Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2 text-xs text-white focus:border-primary focus:outline-none"
                >
                  <option value="Facility">Facility Floor</option>
                  <option value="Athletes">Active Athletes</option>
                  <option value="Equipment">Premium Equipment</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all cursor-pointer"
              >
                Publish Photo
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

function AdminMessages() {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Jonathan Vance', email: 'vance@gmail.com', subject: 'Corporate Plan Inquiry', content: 'Do you offer custom corporate group discount packages for teams above 20?', date: 'Yesterday, 14:32', status: 'Unread' },
    { id: 2, name: 'Alice Thorne', email: 'alice.t@outlook.com', subject: 'Personal Coaching Availability', content: 'I would like to inquire about 1-on-1 private olympic lifting coaching slots with Coach Damian.', date: 'July 3, 09:12', status: 'Unread' },
    { id: 3, name: 'Robert Gable', email: 'rgable@gmail.com', subject: 'Membership Suspension Query', content: 'My membership is suspended due to travel. Can I reactivate it starting tomorrow?', date: 'July 1, 17:05', status: 'Read' }
  ]);

  const [activeMessage, setActiveMessage] = useState(messages[0]);
  const [replyInput, setReplyInput] = useState('');

  const handleSelectMessage = (m) => {
    setActiveMessage(m);
    setMessages(messages.map(item => item.id === m.id ? { ...item, status: 'Read' } : item));
  };

  const handleDeleteMessage = (id) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage(updated[0] || null);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyInput.trim()) return;
    alert(`Reply transmitted successfully to ${activeMessage.email}!`);
    setReplyInput('');
  };

  return (
    <>
      <Helmet>
        <title>Messages Inbox | Admin Control</title>
      </Helmet>

      <div className="space-y-8">
        <div className="border-b border-gym-gray-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-black font-display text-white">INBOX MESSAGES</h1>
          <p className="text-xs text-gym-gray-400">View inbound member queries, public contact forms, and support requests.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Messages list */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 h-fit">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">Inbound Queries</h3>
            <div className="space-y-3">
              {messages.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMessage(m)}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative ${
                    activeMessage && activeMessage.id === m.id
                      ? 'bg-primary/10 border-primary text-white'
                      : 'bg-gym-gray-900 border-gym-gray-800 text-gym-gray-300 hover:border-gym-gray-700'
                  }`}
                >
                  {m.status === 'Unread' && (
                    <span className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  )}
                  <div className="space-y-1">
                    <p className="font-bold text-xs truncate pr-4">{m.subject}</p>
                    <p className="text-[10px] text-gym-gray-400 truncate">From: {m.name}</p>
                    <p className="text-[9px] text-gym-gray-500 font-mono">{m.date}</p>
                  </div>
                </button>
              ))}
              {messages.length === 0 && (
                <p className="text-xs text-gym-gray-500 text-center py-4">No inquiries logged.</p>
              )}
            </div>
          </div>

          {/* Message Reader & Response */}
          <div className="lg:col-span-2 space-y-6">
            {activeMessage ? (
              <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-start border-b border-gym-gray-800 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-white">{activeMessage.subject}</h2>
                    <p className="text-xs text-gym-gray-400">From: {activeMessage.name} ({activeMessage.email})</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteMessage(activeMessage.id)}
                      className="p-2 bg-gym-gray-900 border border-gym-gray-800 rounded-lg text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 bg-gym-gray-900/40 border border-gym-gray-850 rounded-xl">
                  <p className="text-xs text-gym-gray-300 font-medium leading-relaxed font-sans whitespace-pre-wrap">{activeMessage.content}</p>
                </div>

                {/* Simulation Reply form */}
                <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t border-gym-gray-800/60">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Transmit Outbound Reply</h3>
                  <textarea
                    rows="4"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder={`Compose email response to ${activeMessage.name}...`}
                    className="w-full bg-gym-gray-900 border border-gym-gray-800 rounded-lg p-2.5 text-xs text-white focus:border-primary focus:outline-none"
                    required
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-primary text-gym-dark font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-dark transition-all cursor-pointer"
                    >
                      Send Message response
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="glass-card p-12 rounded-2xl border border-gym-gray-800 text-center">
                <p className="text-xs text-gym-gray-500">Select an inbound inquiry from the inbox list to read the content details.</p>
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
