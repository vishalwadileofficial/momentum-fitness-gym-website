import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout({ role }) {
  return (
    <div className="min-h-screen bg-gym-dark text-white flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <DashboardSidebar role={role} />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pt-16 lg:pt-0 lg:pl-64 min-h-screen flex flex-col">
        <div className="flex-grow p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
