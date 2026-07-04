import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const DashboardLayout = ({ children, title = 'Overview' }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-linear-to-br from-purple-50 via-pink-50/40 to-blue-50 text-slate-800 antialiased">
      
      {/* Sidebar Container */}
      <div className="hidden md:flex md:flex-shrink-0 border-r border-slate-100/80">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header title={title} />
        
        {/* Scrollable Main Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 focus:outline-none">
          <div className="max-w-7xl mx-auto w-full space-y-8">
            
            {/* Dynamic Premium Headings */}
            <div className="animate-fadeInUp border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {getGreeting()}, Partner!
                </h1>
              </div>
              <p className="mt-2 text-sm md:text-base text-slate-500/90 font-medium">
                Here's what is happening with your store and projects today.
              </p>
            </div>

            {/* Main Children Component Content */}
            <div className="animate-fadeInUp [animation-delay:200ms]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
