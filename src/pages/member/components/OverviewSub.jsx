import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiAlertCircle, FiShield, FiCoffee, FiActivity, 
  FiBell, FiCalendar, FiSettings, FiCheckCircle 
} from 'react-icons/fi';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import EmptyState from '@/components/ui/EmptyState';
import { cancelClassBooking } from '@/services/firebase/db';

export default function OverviewSub({ profile, activeBookings, nutrition, notifications, announcements, toast, setActiveBookings }) {
  const caloriesConsumed = nutrition.meals
    ? nutrition.meals.filter(m => m.checked).reduce((sum, m) => sum + m.calories, 0)
    : 1174;

  const macroText = nutrition.meals
    ? `P: ${nutrition.proteinTarget}g | C: ${nutrition.carbTarget}g | F: ${nutrition.fatTarget}g`
    : 'P: 180g | C: 320g | F: 80g';

  const upcomingClasses = activeBookings.filter(b => b.type === 'class');

  const handleCancelBooking = async (id) => {
    try {
      await cancelClassBooking(profile.uid || 'guest', id);
      setActiveBookings(prev => prev.filter(b => b.id !== id));
      toast.success('Reservation successfully cancelled.');
    } catch {
      toast.error('Could not cancel booking.');
    }
  };

  const overviewLogs = notifications.slice(0, 3).map(n => ({
    id: n.id,
    action: n.title,
    target: n.message,
    timestamp: n.date,
    status: n.read ? 'info' : 'success',
    icon: <FiBell className="text-primary" />
  }));

  const urgentAnn = announcements.find(a => a.priority === 'Urgent');

  return (
    <div className="space-y-6">
      {/* Announcements Alert Banner */}
      {urgentAnn && (
        <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-2xl flex items-start gap-3 text-red-200">
          <FiAlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Broadcast Alert: {urgentAnn.title}</h4>
            <p className="text-[11px] leading-relaxed mt-1">{urgentAnn.message}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          label="Membership Level"
          value={profile.plan}
          icon={<FiShield />}
          colorType="primary"
          description="Access status: Unlimited ACTIVE"
        />
        <StatCard
          label="Calories Consumed Today"
          value={`${caloriesConsumed} / ${profile.targetCalories} kcal`}
          icon={<FiCoffee />}
          colorType="pink"
          description={macroText}
          trend={{ value: `${Math.round((caloriesConsumed / profile.targetCalories) * 100)}% Target`, isPositive: caloriesConsumed <= profile.targetCalories }}
        />
        <StatCard
          label="Attendance Metrics"
          value="18 Visits"
          icon={<FiActivity />}
          colorType="secondary"
          trend={{ value: "+12.5%", isPositive: true }}
          description="92% Consistency this month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Announcements index */}
          {announcements.length > 0 && (
            <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
              <h3 className="text-xs uppercase font-bold text-white tracking-widest flex items-center gap-1.5 border-b border-gym-gray-800 pb-3 mb-4">
                <FiBell className="text-primary" /> Active Gym Notices
              </h3>
              <div className="space-y-3">
                {announcements.map((a) => (
                  <div key={a.id} className="p-3 bg-gym-dark border border-gym-gray-855 rounded-xl space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{a.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                        a.priority === 'Urgent' ? 'bg-red-500/10 text-red-400' : 'bg-gym-gray-850 text-gym-gray-400'
                      }`}>
                        {a.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-gym-gray-400 mt-1 leading-normal">{a.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classes Table */}
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-gym-gray-800 pb-4 mb-4">
              <FiCalendar className="text-primary" /> Upcoming Class Sessions
            </h3>
            {upcomingClasses.length === 0 ? (
              <EmptyState title="No Classes Booked" message=" Roster is empty. Choose class listings under Appointments tab." />
            ) : (
              <div className="space-y-3">
                {upcomingClasses.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gym-dark border border-gym-gray-800 rounded-xl">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-white">{item.className}</p>
                      <p className="text-xs text-gym-gray-400">Coach: {item.trainer} | Room: {item.room}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-primary font-bold block">{item.date} @ {item.time}</span>
                      <button 
                        onClick={() => handleCancelBooking(item.id)}
                        className="text-[10px] text-red-400 hover:underline uppercase font-bold mt-1 cursor-pointer"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/40 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-gym-gray-800 pb-4">
              <FiSettings className="text-primary" /> Shortcuts
            </h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <Link to="appointments" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCheckCircle className="text-primary shrink-0" /> Book Class Slots
              </Link>
              <Link to="nutrition" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCheckCircle className="text-primary shrink-0" /> Log Meal Progress
              </Link>
              <Link to="progress" className="p-3 bg-gym-gray-900 rounded-xl border border-gym-gray-800 text-gym-gray-300 hover:border-primary transition-all flex items-center gap-2">
                <FiCheckCircle className="text-primary shrink-0" /> Update Biometrics
              </Link>
            </div>
          </div>

          <ActivityFeed title="Recent Alerts" activities={overviewLogs.length > 0 ? overviewLogs : [
            { id: 1, action: 'Gym membership verified', target: 'Access credential clear', timestamp: 'Just now', status: 'success', icon: <FiShield className="text-primary" /> }
          ]} />
        </div>
      </div>
    </div>
  );
}
