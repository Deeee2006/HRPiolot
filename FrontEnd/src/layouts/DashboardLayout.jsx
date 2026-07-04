import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children, title = 'Overview' }) => {
  // Time onusare greeting select korar jonne (Optional, kintu dashboard-e bhalo lagbe)
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50/40 to-blue-50 text-slate-800 antialiased">
      
      {/* Sidebar Container */}
      <div className="hidden md:flex md:flex-shrink-0 border-r border-slate-100/80">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header title={title} />
        
        {/* Scrollable Main Body */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8 focus:outline-none">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            
            {/* Dynamic Premium Headings */}
            <div className="animate-fadeInUp border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {getGreeting()}, Partner! 👋
                </h1>
              </div>
              <p className="mt-1.5 text-sm md:text-base text-slate-500/90 font-medium">
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