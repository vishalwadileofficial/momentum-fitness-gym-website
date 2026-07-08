import React from 'react';
import { FiAlertTriangle, FiXCircle } from 'react-icons/fi';

export default function ErrorDisplay({ 
  title = 'Connection Alert', 
  message = 'Failed to load live database data. Showing offline local updates.', 
  type = 'warning',
  onClose = null
}) {
  const isError = type === 'error';
  
  return (
    <div
      role="status"
      className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
      isError 
        ? 'bg-red-500/10 border-red-500/20 text-red-200' 
        : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-200'
    }`}>
      {isError ? (
        <FiXCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      ) : (
        <FiAlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white">{title}</h4>
        <p className="text-[11px] opacity-90 mt-1 leading-normal">{message}</p>
      </div>
      {onClose && (
        <button 
          type="button"
          onClick={onClose}
          className="text-gym-gray-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded px-1.5 py-0.5"
          aria-label="Dismiss alert"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
