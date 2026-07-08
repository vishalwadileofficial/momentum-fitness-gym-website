import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTrendingUp, FiUsers, FiActivity, FiSettings, 
  FiCalendar, FiPlus, FiTrash2, FiStar, 
  FiBell, FiEye, FiCheck, FiX, FiFilter, FiDownload, FiSearch
} from 'react-icons/fi';
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

import { 
  getAdminOverviewMetrics, getAdminUsers, updateAdminUser, deleteAdminUser,
  getAnnouncements, createAnnouncement, deleteAnnouncement,
  getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getBlogArticles, createBlogArticle, updateBlogArticle, deleteBlogArticle,
  getGalleryPhotos, uploadGalleryPhoto, deleteGalleryPhoto,
  getAdminReports
} from '@/services/firebase/db';

export default function AdminUsers() {
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

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' ? true : (u.status || 'Active') === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const handleUpdateRole = useCallback(async (id, newRole) => {
    try {
      await updateAdminUser(id, { role: newRole });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
      if (selectedUser && selectedUser.id === id) {
        setSelectedUser(prev => ({ ...prev, role: newRole }));
      }
      toast.success('User role successfully updated in registry.');
    } catch {
      toast.error('Role update failed.');
    }
  }, [selectedUser, toast]);

  const handleToggleStatus = useCallback(async (id) => {
    const target = users.find(u => u.id === id);
    if (!target) return;
    const nextStatus = target.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await updateAdminUser(id, { status: nextStatus });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: nextStatus } : u));
      if (selectedUser && selectedUser.id === id) {
        setSelectedUser(prev => ({ ...prev, status: nextStatus }));
      }
      toast.success(`User account status updated to ${nextStatus}.`);
    } catch {
      toast.error('Status toggle failed.');
    }
  }, [users, selectedUser, toast]);

  const handleDeleteUser = useCallback(async (id) => {
    try {
      await deleteAdminUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      setSelectedUser(null);
      toast.success('User account removed from database.');
    } catch {
      toast.error('Deletion failed.');
    }
  }, [toast]);

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
