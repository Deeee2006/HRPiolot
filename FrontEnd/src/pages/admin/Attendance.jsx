import { useState, useMemo } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { FaCalendar, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaFilter, FaSearch } from 'react-icons/fa';

const STATUSES = ['present', 'present', 'present', 'absent', 'leave'];
const TIMES = ['09:00', '09:15', '08:45', null];

const AdminAttendance = () => {
  const { employees } = useEmployee();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['All', 'Present', 'Absent', 'Leave'];

  const mockAttendanceData = useMemo(() => employees.map((emp, i) => ({
    ...emp,
    todayStatus: STATUSES[i % STATUSES.length],
    checkIn: TIMES[i % TIMES.length],
    checkOut: TIMES[(i + 1) % TIMES.length]
  })), [employees]);

  const filteredData = mockAttendanceData.filter(emp => {
    const matchesFilter = selectedFilter === 'All' || emp.todayStatus === selectedFilter.toLowerCase();
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present': return <Badge variant="success">Present</Badge>;
      case 'absent': return <Badge variant="danger">Absent</Badge>;
      case 'leave': return <Badge variant="warning">Leave</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <FaCheckCircle className="text-emerald-500" size={18} />;
      case 'absent': return <FaTimesCircle className="text-red-500" size={18} />;
      case 'leave': return <FaExclamationCircle className="text-amber-500" size={18} />;
      default: return null;
    }
  };

  const stats = {
    present: mockAttendanceData.filter(e => e.todayStatus === 'present').length,
    absent: mockAttendanceData.filter(e => e.todayStatus === 'absent').length,
    leave: mockAttendanceData.filter(e => e.todayStatus === 'leave').length,
    total: mockAttendanceData.length
  };
  const rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-800">Attendance Overview</h2>
        <div className="flex items-center gap-3">
          <FaCalendar className="text-purple-400" size={18} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 focus:outline-none focus:border-purple-400 transition-all duration-300 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center">
              <FaCheckCircle className="text-emerald-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-600">{stats.present}</p>
              <p className="text-xs text-emerald-700 font-medium">Present</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center">
              <FaTimesCircle className="text-red-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-xs text-red-700 font-medium">Absent</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center">
              <FaExclamationCircle className="text-amber-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-amber-600">{stats.leave}</p>
              <p className="text-xs text-amber-700 font-medium">On Leave</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-2xl flex flex-col justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center">
              <FaCalendar className="text-purple-600" size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">{rate}%</p>
              <p className="text-xs text-purple-700 font-medium">Attendance Rate</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-purple-800">Employee Attendance</h3>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-48">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={13} />
              <input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 text-sm placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-purple-400" size={14} />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-purple-200/60 text-purple-900 text-sm focus:outline-none focus:border-purple-400 transition-all appearance-none glass-select"
              >
                {filters.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100/60">
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Check In</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Check Out</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((employee) => (
                <tr key={employee.id} className="border-b border-purple-50/60 hover:bg-purple-50/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_8px_rgba(147,51,234,0.2)]">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{employee.name}</p>
                        <p className="text-xs text-purple-400">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-purple-500">{employee.department}</td>
                  <td className="py-3 px-4 text-sm text-purple-500 font-mono">{employee.checkIn || '--:--'}</td>
                  <td className="py-3 px-4 text-sm text-purple-500 font-mono">{employee.checkOut || '--:--'}</td>
                  <td className="py-3 px-4">
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
            <FaCalendar size={36} className="text-purple-300 mx-auto mb-3" />
            <p className="text-purple-400 text-sm">No attendance records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendance;
