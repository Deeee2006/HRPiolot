import { useState, useMemo } from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import {
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaFilter,
  FaSearch,
} from 'react-icons/fa';

const STATUSES = ['present', 'present', 'present', 'absent', 'leave'];
const TIMES = ['09:00', '09:15', '08:45', null];

const AdminAttendance = () => {
  const { employees } = useEmployee();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['All', 'Present', 'Absent', 'Leave'];

  const mockAttendanceData = useMemo(
    () =>
      employees.map((emp, i) => ({
        ...emp,
        todayStatus: STATUSES[i % STATUSES.length],
        checkIn: TIMES[i % TIMES.length],
        checkOut: TIMES[(i + 1) % TIMES.length],
      })),
    [employees]
  );

  const filteredData = mockAttendanceData.filter((emp) => {
    const matchesFilter = selectedFilter === 'All' || emp.todayStatus === selectedFilter.toLowerCase();
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
        return <FaCheckCircle className="text-emerald-500" size={18} />;
      case 'absent':
        return <FaTimesCircle className="text-red-500" size={18} />;
      case 'leave':
        return <FaExclamationCircle className="text-amber-500" size={18} />;
      default:
        return null;
    }
  };

  const stats = {
    present: mockAttendanceData.filter((e) => e.todayStatus === 'present').length,
    absent: mockAttendanceData.filter((e) => e.todayStatus === 'absent').length,
    leave: mockAttendanceData.filter((e) => e.todayStatus === 'leave').length,
    total: mockAttendanceData.length,
  };
  const rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Attendance Overview</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track daily attendance across your team</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendar className="text-gray-400" size={15} />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-9 px-3 rounded-md bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <FaCheckCircle className="text-emerald-600" size={17} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{stats.present}</p>
              <p className="text-xs text-gray-500 font-medium">Present</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <FaTimesCircle className="text-red-600" size={17} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{stats.absent}</p>
              <p className="text-xs text-gray-500 font-medium">Absent</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <FaExclamationCircle className="text-amber-600" size={17} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{stats.leave}</p>
              <p className="text-xs text-gray-500 font-medium">On Leave</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <FaCalendar className="text-blue-600" size={17} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{rate}%</p>
              <p className="text-xs text-gray-500 font-medium">Attendance Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Employee Attendance Table */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-base font-semibold text-gray-900">Employee Attendance</h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <FaSearch size={13} />
              </span>
              <input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 pr-3 w-48 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <FaFilter size={13} />
              </span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="h-9 pl-9 pr-8 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all appearance-none minimal-select"
              >
                {filters.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm shrink-0">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{employee.department}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{employee.checkIn || '—'}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 font-mono">{employee.checkOut || '—'}</td>
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
            <FaCalendar size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No attendance records found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminAttendance;
