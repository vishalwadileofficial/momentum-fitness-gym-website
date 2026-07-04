import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertTriangle, FiInfo, FiActivity } from 'react-icons/fi';

/**
 * ActivityFeed component displays a timeline of recent logs or activities.
 * 
 * @param {string} [title] - Title of the feed card
 * @param {Array} activities - List of activity objects:
 *   [
 *     {
 *       id: 1,
 *       user: { name: 'John Doe', avatar: 'optional_url' },
 *       action: 'Completed a workout session',
 *       target: 'Leg Day Routine',
 *       timestamp: '2 hours ago',
 *       status: 'success' | 'pending' | 'warning' | 'info',
 *       icon: <FiActivity />
 *     }
 *   ]
 */
export default function ActivityFeed({ 
  title = 'Recent Activity', 
  activities = [] 
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case 'success':
        return {
          icon: <FiCheckCircle className="text-primary" />,
          bg: 'bg-primary/10 border-primary/20',
          badgeText: 'text-primary bg-primary/10 border-primary/20',
        };
      case 'pending':
        return {
          icon: <FiClock className="text-secondary" />,
          bg: 'bg-secondary/10 border-secondary/20',
          badgeText: 'text-secondary bg-secondary/10 border-secondary/20',
        };
      case 'warning':
        return {
          icon: <FiAlertTriangle className="text-accent-pink" />,
          bg: 'bg-accent-pink/10 border-accent-pink/20',
          badgeText: 'text-accent-pink bg-accent-pink/10 border-accent-pink/20',
        };
      case 'info':
      default:
        return {
          icon: <FiInfo className="text-blue-400" />,
          bg: 'bg-blue-500/10 border-blue-500/20',
          badgeText: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        };
    }
  };

  return (
    <div className="glass-card relative p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/60 backdrop-blur-md w-full h-full flex flex-col justify-between overflow-hidden">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gym-gray-400 mb-6">
          {title}
        </h3>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gym-gray-500">
            <FiActivity className="w-8 h-8 mb-2 opacity-50 animate-pulse" />
            <p className="text-xs font-semibold">No recent activity found.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative border-l border-gym-gray-800 ml-3.5 space-y-6"
          >
            {activities.map((activity, index) => {
              const statusDetails = getStatusDetails(activity.status);
              return (
                <motion.div 
                  key={activity.id || index} 
                  variants={itemVariants}
                  className="relative pl-7 group"
                >
                  {/* Timeline bullet / Icon node */}
                  <span className={`absolute -left-3.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border bg-gym-dark transition-all duration-300 group-hover:scale-110 ${statusDetails.bg}`}>
                    {activity.icon || statusDetails.icon}
                  </span>

                  {/* Activity Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gym-gray-800/20 hover:bg-gym-gray-800/40 border border-transparent hover:border-gym-gray-800 p-3 rounded-xl transition-all duration-200">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {/* User Avatar Initial / Indicator */}
                        {activity.user && (
                          <div className="w-5 h-5 rounded-full bg-gym-gray-800 flex items-center justify-center text-[9px] font-bold text-white uppercase border border-gym-gray-700">
                            {activity.user.name ? activity.user.name[0] : 'U'}
                          </div>
                        )}
                        <span className="text-xs font-bold text-white">
                          {activity.user?.name || 'System'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gym-gray-400 mt-1 font-medium leading-relaxed">
                        {activity.action}{' '}
                        {activity.target && (
                          <span className="text-white font-bold">{activity.target}</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
                      {/* Status Badge */}
                      {activity.status && (
                        <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusDetails.badgeText}`}>
                          {activity.status}
                        </span>
                      )}
                      {/* Timestamp */}
                      <span className="text-[10px] text-gym-gray-500 font-bold shrink-0 font-mono">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
