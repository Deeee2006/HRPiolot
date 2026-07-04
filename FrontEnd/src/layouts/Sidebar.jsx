import React from 'react';
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
  FaCheckSquare
} from 'react-icons/fa';

const Sidebar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const employeeNavItems = [
    { path: '/employee/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/employee/profile', icon: FaUser, label: 'Profile' },
    { path: '/employee/attendance', icon: FaCalendar, label: 'Attendance' },
    { path: '/employee/leave', icon: FaFileAlt, label: 'Leave Requests' },
    { path: '/employee/payroll', icon: FaDollarSign, label: 'Payroll' },
  ];

  const adminNavItems = [
    { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/admin/employees', icon: FaUsers, label: 'Employees' },
    { path: '/admin/attendance', icon: FaCalendar, label: 'Attendance' },
    { path: '/admin/leave', icon: FaCheckSquare, label: 'Leave Approvals' },
    { path: '/admin/payroll', icon: FaDollarSign, label: 'Payroll' },
  ];

  const navItems = isAdmin ? adminNavItems : employeeNavItems;

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <NavLink
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-[0_4px_12px_rgba(147,51,234,0.3)]'
            : 'text-purple-700 hover:bg-purple-100'
        }`}
      >
        <item.icon size={20} />
        <span className="font-medium">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 border-r border-purple-100 p-4 flex flex-col">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          HRPilot
        </h1>
        <p className="text-sm text-purple-500 mt-1">HR Management System</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-purple-200">
        <div className="px-4 py-3 mb-4 bg-white/50 backdrop-blur-sm rounded-2xl">
          <p className="text-sm font-medium text-purple-800">{user?.name}</p>
          <p className="text-xs text-purple-500 capitalize">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-600 hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
