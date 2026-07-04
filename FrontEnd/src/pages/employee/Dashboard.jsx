import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { FaUser, FaCalendar, FaFileAlt, FaDollarSign, FaClock } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Profile',
      icon: FaUser,
      description: 'View and edit your profile',
      color: 'from-purple-400 to-purple-600',
      onClick: () => navigate('/employee/profile')
    },
    {
      title: 'Attendance',
      icon: FaCalendar,
      description: 'Check your attendance records',
      color: 'from-pink-400 to-pink-600',
      onClick: () => navigate('/employee/attendance')
    },
    {
      title: 'Leave Requests',
      icon: FaFileAlt,
      description: 'Apply and track leave requests',
      color: 'from-blue-400 to-blue-600',
      onClick: () => navigate('/employee/leave')
    },
    {
      title: 'Payroll',
      icon: FaDollarSign,
      description: 'View salary details',
      color: 'from-green-400 to-green-600',
      onClick: () => navigate('/employee/payroll')
    }
  ];

  const recentActivities = [
    { action: 'Checked in', time: 'Today, 9:00 AM', status: 'success' },
    { action: 'Leave request submitted', time: 'Yesterday, 4:30 PM', status: 'pending' },
    { action: 'Profile updated', time: '2 days ago', status: 'success' },
    { action: 'Document uploaded', time: '3 days ago', status: 'success' }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-800">Welcome back, {user?.name}!</h2>
        <p className="text-purple-600">Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            className="p-6 cursor-pointer hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
            onClick={card.onClick}
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}>
              <card.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-purple-800 mb-2">{card.title}</h3>
            <p className="text-sm text-purple-600">{card.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
            <FaClock size={20} />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl">
                <div>
                  <p className="text-sm font-medium text-purple-800">{activity.action}</p>
                  <p className="text-xs text-purple-500">{activity.time}</p>
                </div>
                <Badge variant={activity.status === 'success' ? 'success' : 'warning'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
              <span className="text-sm font-medium text-green-800">Present Days (This Month)</span>
              <span className="text-lg font-bold text-green-600">18</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-2xl">
              <span className="text-sm font-medium text-red-800">Absent Days (This Month)</span>
              <span className="text-lg font-bold text-red-600">2</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-2xl">
              <span className="text-sm font-medium text-yellow-800">Leave Balance</span>
              <span className="text-lg font-bold text-yellow-600">12</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
