import React from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { FaUsers, FaCalendar, FaCheckSquare, FaDollarSign, FaChartLine, FaExclamationCircle, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const { employees } = useEmployee();

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: FaUsers,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'purple'
    },
    {
      title: 'Present Today',
      value: '18',
      icon: FaCalendar,
      color: 'from-green-400 to-green-600',
      bgColor: 'green'
    },
    {
      title: 'Pending Leaves',
      value: '3',
      icon: FaCheckSquare,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'yellow'
    },
    {
      title: 'Total Payroll',
      value: '$425K',
      icon: FaDollarSign,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'blue'
    }
  ];

  const recentActivities = [
    { action: 'New employee onboarded', employee: 'David Brown', time: 'Today, 10:30 AM', status: 'success' },
    { action: 'Leave request submitted', employee: 'Mike Johnson', time: 'Today, 9:15 AM', status: 'pending' },
    { action: 'Salary updated', employee: 'Jane Smith', time: 'Yesterday, 4:00 PM', status: 'success' },
    { action: 'Attendance marked', employee: 'Sarah Williams', time: 'Yesterday, 9:00 AM', status: 'success' }
  ];

  const departmentStats = [
    { name: 'Engineering', count: 2, percentage: 40 },
    { name: 'Marketing', count: 1, percentage: 20 },
    { name: 'Finance', count: 1, percentage: 20 },
    { name: 'Human Resources', count: 1, percentage: 20 }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-800">Admin Dashboard</h2>
        <p className="text-purple-600">Overview of your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}>
              <stat.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-purple-800">{stat.value}</h3>
            <p className="text-sm text-purple-600">{stat.title}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
            <FaChartLine size={20} />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-800">{activity.action}</p>
                  <p className="text-xs text-purple-500">{activity.employee} • {activity.time}</p>
                </div>
                <Badge variant={activity.status === 'success' ? 'success' : 'warning'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
            <FaChartBar size={20} />
            Department Distribution
          </h3>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-purple-700">{dept.name}</span>
                  <span className="text-sm text-purple-600">{dept.count} employees</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
          <FaExclamationCircle size={20} />
          Pending Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200 cursor-pointer hover:shadow-lg transition-shadow">
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-sm text-yellow-700 font-medium">Leave Requests</p>
            <p className="text-xs text-yellow-500 mt-1">Awaiting approval</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 cursor-pointer hover:shadow-lg transition-shadow">
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-sm text-blue-700 font-medium">Attendance Issues</p>
            <p className="text-xs text-blue-500 mt-1">Need review</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-2xl border-2 border-purple-200 cursor-pointer hover:shadow-lg transition-shadow">
            <p className="text-2xl font-bold text-purple-600">1</p>
            <p className="text-sm text-purple-700 font-medium">Onboarding Tasks</p>
            <p className="text-xs text-purple-500 mt-1">Incomplete</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-purple-800 mb-4">Employee Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 5).map((employee) => (
                <tr key={employee.id} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-800">{employee.name}</p>
                        <p className="text-xs text-purple-500">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-purple-600">{employee.department}</td>
                  <td className="py-3 px-4">
                    <Badge variant="default" className="capitalize">{employee.role}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
