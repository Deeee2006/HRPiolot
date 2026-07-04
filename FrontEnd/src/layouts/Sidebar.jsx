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
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-md bg-white border border-gray-300 flex items-center justify-center text-gray-600"
      >
        <FaBars size={18} />
      </button>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-40
        w-64 h-screen
        bg-white border-r border-gray-200
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">HRPilot</h1>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">HR Management System</p>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
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
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={16} className={`shrink-0 ${active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-200 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-md">
            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-700 text-sm font-bold shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
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
