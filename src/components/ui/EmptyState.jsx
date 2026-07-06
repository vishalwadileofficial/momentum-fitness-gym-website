import React from 'react';
import { FiInbox, FiAlertCircle, FiInfo } from 'react-icons/fi';
import Button from './Button';

export default function EmptyState({ 
  title = 'No records found', 
  message = 'Try adjusting your search filters or add a new entry to get started.', 
  icon = 'inbox', 
  actionLabel = '', 
  onAction = null 
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'alert':
        return <FiAlertCircle className="w-10 h-10 text-red-500/80" />;
      case 'info':
        return <FiInfo className="w-10 h-10 text-secondary/80" />;
      case 'inbox':
      default:
        return <FiInbox className="w-10 h-10 text-primary/80" />;
    }
  };

  return (
    <div className="glass-card p-12 rounded-2xl border border-gym-gray-800 text-center bg-gym-gray-900/20 flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
      <div className="w-16 h-16 bg-gym-gray-950/60 rounded-full flex items-center justify-center border border-gym-gray-800">
        {renderIcon()}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
        <p className="text-xs text-gym-gray-400 leading-relaxed max-w-sm">{message}</p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
