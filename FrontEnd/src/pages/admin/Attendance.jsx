import React, { useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { FaCalendar, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaFilter } from 'react-icons/fa';

const AdminAttendance = () => {
  const { employees } = useEmployee();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Present', 'Absent', 'Leave'];

  const mockAttendanceData = employees.map(emp => ({
    ...emp,
    todayStatus: ['present', 'present', 'present', 'absent', 'leave'][Math.floor(Math.random() * 5)],
    checkIn: ['09:00', '09:15', '08:45', null, null][Math.floor(Math.random() * 5)],
    checkOut: ['18:00', '18:30', '17:45', null, null][Math.floor(Math.random() * 5)]
  }));

  const filteredData = selectedFilter === 'All' 
    ? mockAttendanceData 
    : mockAttendanceData.filter(emp => emp.todayStatus === selectedFilter.toLowerCase());

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <Badge variant="success">Present</Badge>;
      case 'absent':
        return <Badge variant="danger">Absent</Badge>;
      case 'leave':
        return <Badge variant="warning">Leave</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <FaCheckCircle className="text-green-500" size={20} />;
      case 'absent':
        return <FaTimesCircle className="text-red-500" size={20} />;
      case 'leave':
        return <FaExclamationCircle className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };

  const stats = {
    present: mockAttendanceData.filter(e => e.todayStatus === 'present').length,
    absent: mockAttendanceData.filter(e => e.todayStatus === 'absent').length,
    leave: mockAttendanceData.filter(e => e.todayStatus === 'leave').length,
    total: mockAttendanceData.length
  };

  const attendanceRate = Math.round((stats.present / stats.total) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-purple-800">Attendance Overview</h2>
        <div className="flex items-center gap-3">
          <FaCalendar className="text-purple-400" size={20} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-purple-200 text-purple-900 focus:outline-none focus:border-purple-400 transition-all duration-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <FaCheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              <p className="text-sm text-green-700">Present</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <FaTimesCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-sm text-red-700">Absent</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <FaExclamationCircle className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{stats.leave}</p>
              <p className="text-sm text-yellow-700">On Leave</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <FaCalendar className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{attendanceRate}%</p>
              <p className="text-sm text-purple-700">Attendance Rate</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-purple-800">Employee Attendance</h3>
          <div className="flex items-center gap-2">
            <FaFilter className="text-purple-400" size={18} />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-purple-200 text-purple-900 focus:outline-none focus:border-purple-400 transition-all duration-300"
            >
              {filters.map(filter => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100">
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Check In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Check Out</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-purple-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((employee) => (
                <tr key={employee.id} className="border-b border-purple-50 hover:bg-purple-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow-[0_4px_8px_rgba(147,51,234,0.2)]">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{employee.name}</p>
                        <p className="text-xs text-purple-500">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-purple-600">{employee.department}</td>
                  <td className="py-4 px-4 text-sm text-purple-600">{employee.checkIn || '--:--'}</td>
                  <td className="py-4 px-4 text-sm text-purple-600">{employee.checkOut || '--:--'}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(employee.todayStatus)}
                      {getStatusBadge(employee.todayStatus)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <FaCalendar size={48} className="text-purple-300 mx-auto mb-4" />
            <p className="text-purple-500">No attendance records found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminAttendance;
