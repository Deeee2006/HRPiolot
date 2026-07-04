import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaTachometerAlt, 
  FaUser, 
  FaCalendar, 
  FaFileAlt, 
  FaDollarSign, 
  FaUsers, 
  FaSignOutAlt,
  FaCheckSquare,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Sidebar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const employeeNavItems = [
    { path: '/employee/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/employee/profile', icon: FaUser, label: 'Profile' },
    { path: '/employee/attendance', icon: FaCalendar, label: 'Attendance' },
    { path: '/employee/leave', icon: FaFileAlt, label: 'Leave' },
    { path: '/employee/payroll', icon: FaDollarSign, label: 'Payroll' },
  ];

  const adminNavItems = [
    { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/employees', icon: FaUsers, label: 'Employees' },
    { path: '/admin/attendance', icon: FaCalendar, label: 'Attendance' },
    { path: '/admin/leave', icon: FaCheckSquare, label: 'Leave' },
    { path: '/admin/payroll', icon: FaDollarSign, label: 'Payroll' },
  ];

  const navItems = isAdmin ? adminNavItems : employeeNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md border border-purple-200 shadow-md flex items-center justify-center text-purple-600"
      >
        <FaBars size={18} />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-40
        w-64 min-h-screen
        bg-linear-to-b from-purple-50/90 via-pink-50/80 to-purple-50/90
        backdrop-blur-xl border-r border-purple-100/60
        p-4 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-6 px-3">
          <div>
            <h1 className="text-2xl font-extrabold gradient-text tracking-tight">
              HRPilot
            </h1>
            <p className="text-[11px] text-purple-400 mt-0.5 font-medium">HR Management System</p>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-xl bg-purple-100/60 flex items-center justify-center text-purple-500 hover:bg-purple-200/80 transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-1">
          {navItems.map((item, i) => {
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group ${
                  active
                    ? 'bg-linear-to-r from-purple-500 to-purple-600 text-white shadow-[0_4px_12px_rgba(147,51,234,0.25)]'
                    : 'text-purple-600/80 hover:bg-purple-100/60 hover:text-purple-700'
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <item.icon size={17} className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-sm font-semibold">{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-purple-200/60 space-y-3 px-1">
          <div className="px-3.5 py-3 bg-white/40 backdrop-blur-sm rounded-xl border border-purple-100/50">
            <p className="text-sm font-semibold text-purple-800 truncate">{user?.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <p className="text-xs text-purple-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3.5 py-2.5 w-full rounded-xl text-red-500/80 hover:bg-red-50/80 hover:text-red-600 transition-all duration-200 group"
          >
            <FaSignOutAlt size={17} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
