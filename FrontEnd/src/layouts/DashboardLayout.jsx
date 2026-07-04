import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, title = 'Overview' }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 text-gray-800 antialiased">

      {/* Sidebar */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header title={title} />

        {/* Scrollable Main Body */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="max-w-7xl mx-auto w-full px-6 py-8 animate-fadeInUp">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
