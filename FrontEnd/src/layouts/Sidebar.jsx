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
  FaTimes,
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
        aria-label="Open menu"
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-md bg-white border border-slate-300 flex items-center justify-center text-slate-600"
      >
        <FaBars size={18} />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-64 h-screen
          bg-white border-r border-slate-200
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-100">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">HRPilot</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">HR Management System</p>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
            className="lg:hidden w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${
                  active
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon
                  size={16}
                  className={`shrink-0 ${
                    active ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="text-sm font-medium">{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-md border border-slate-200">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group"
          >
            <FaSignOutAlt size={15} className="shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;