import React from 'react';
import { FiBell, FiTrash2 } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { markNotificationsAsRead, deleteNotification } from '@/services/firebase/db';

export default function NotificationsSub({ notifications, setNotifications, profile, toast }) {
  const handleMarkRead = async (id) => {
    try {
      await markNotificationsAsRead(profile.uid || 'guest', id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch {
      toast.error('Sync issue.');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsAsRead(profile.uid || 'guest');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read.');
    } catch {
      toast.error('Mark read failed.');
    }
  };

  const handleDeleteNotif = async (id) => {
    try {
      await deleteNotification(profile.uid || 'guest', id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      toast.success('Notification removed.');
    } catch {
      toast.error('Failed to remove.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b border-gym-gray-800 pb-3 mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
          <FiBell className="text-primary" /> Inbox Alerts
        </h3>
        {notifications.some(n => !n.read) && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>Mark All Read</Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState title="Inbox Empty" message="All alerts processed. You are all set." icon="info" />
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 rounded-xl border flex justify-between items-start gap-4 transition-all ${
                item.read 
                  ? 'bg-gym-gray-900/20 border-gym-gray-850 opacity-60' 
                  : 'bg-gym-gray-900/60 border-primary/20 shadow-[0_0_12px_rgba(204,255,0,0.05)]'
              }`}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">{item.title}</h4>
                  {!item.read && <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>}
                </div>
                <p className="text-xs text-gym-gray-400 leading-relaxed leading-normal">{item.message}</p>
                <p className="text-[9px] text-gym-gray-550 italic font-mono pt-1">{item.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {!item.read && (
                  <button 
                    onClick={() => handleMarkRead(item.id)}
                    className="text-[9px] text-primary hover:underline font-bold uppercase cursor-pointer"
                  >
                    Read
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteNotif(item.id)}
                  className="text-gym-gray-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                  aria-label="Delete notification"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
