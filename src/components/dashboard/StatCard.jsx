import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

/**
 * StatCard component displays key dashboard metrics.
 * 
 * @param {string} label - The descriptive title of the stat
 * @param {string|number} value - The main number/value to display
 * @param {React.ReactNode} icon - Icon component corresponding to the stat
 * @param {object} [trend] - Object containing: value (e.g. "+12.5%"), isPositive (boolean)
 * @param {string} [description] - Small description or context text below value
 * @param {string} [colorType] - 'primary' (neon lime) | 'secondary' (cyber cyan) | 'pink' (neon pink)
 */
export default function StatCard({ 
  label, 
  value, 
  icon, 
  trend, 
  description, 
  colorType = 'primary' 
}) {
  // Determine color theme classes
  const colorMap = {
    primary: {
      border: 'hover:border-primary/40',
      shadow: 'hover:shadow-[0_0_30px_rgba(204,255,0,0.15)]',
      text: 'text-primary',
      bg: 'bg-primary/10',
      glow: 'shadow-[0_0_15px_rgba(204,255,0,0.1)]',
    },
    secondary: {
      border: 'hover:border-secondary/40',
      shadow: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
      text: 'text-secondary',
      bg: 'bg-secondary/10',
      glow: 'shadow-[0_0_15px_rgba(0,240,255,0.1)]',
    },
    pink: {
      border: 'hover:border-accent-pink/40',
      shadow: 'hover:shadow-[0_0_30px_rgba(255,0,127,0.15)]',
      text: 'text-accent-pink',
      bg: 'bg-accent-pink/10',
      glow: 'shadow-[0_0_15px_rgba(255,0,127,0.1)]',
    }
  };

  const currentTheme = colorMap[colorType] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`glass-card relative overflow-hidden p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/60 backdrop-blur-md transition-all duration-300 ${currentTheme.border} ${currentTheme.shadow}`}
    >
      {/* Glow Ambient Light inside card */}
      <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-3xl opacity-20 transition-all duration-300 ${currentTheme.bg}`} />

      <div className="flex items-start justify-between">
        <div>
          {/* Label */}
          <span className="text-xs font-semibold uppercase tracking-wider text-gym-gray-400">
            {label}
          </span>
          {/* Value */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold tracking-tight text-white">
              {value}
            </span>
          </div>
        </div>

        {/* Icon container */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-gym-gray-800 ${currentTheme.bg} ${currentTheme.text} ${currentTheme.glow}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>

      {/* Footer Info (Trend / Description) */}
      {(trend || description) && (
        <div className="mt-4 flex items-center justify-between border-t border-gym-gray-800/60 pt-3">
          {trend ? (
            <div className="flex items-center gap-1">
              <span className={`flex items-center gap-0.5 text-xs font-bold ${trend.isPositive ? 'text-primary' : 'text-red-500'}`}>
                {trend.isPositive ? <FiTrendingUp className="w-3.5 h-3.5" /> : <FiTrendingDown className="w-3.5 h-3.5" />}
                {trend.value}
              </span>
              <span className="text-[10px] text-gym-gray-400 font-medium">vs last month</span>
            </div>
          ) : (
            <div />
          )}

          {description && (
            <span className="text-[11px] text-gym-gray-400 font-medium font-sans">
              {description}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
