import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { FaUsers, FaCalendar, FaCheckSquare, FaDollarSign, FaChartLine, FaExclamationCircle, FaChartBar, FaArrowRight } from 'react-icons/fa';

const AdminDashboard = () => {
  const { employees } = useEmployee();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Employees', value: employees.length, icon: FaUsers, color: 'bg-blue-600' },
    { title: 'Present Today', value: '18', icon: FaCalendar, color: 'bg-emerald-600' },
    { title: 'Pending Leaves', value: employees.reduce((s, e) => s + (e.leaveRequests?.filter(r => r.status === 'pending').length || 0), 0), icon: FaCheckSquare, color: 'bg-amber-500' },
    { title: 'Total Payroll', value: `$${Math.round(employees.reduce((s, e) => s + e.salary, 0) / 1000)}K`, icon: FaDollarSign, color: 'bg-blue-600' },
  ];

  const allLeaveReqs = employees.flatMap(e => e.leaveRequests?.map(r => ({ ...r, name: e.name, dept: e.department })) || []);
  const recentActivities = allLeaveReqs.slice(-4).reverse();

  const deptData = [...new Set(employees.map(e => e.department))].map(d => {
    const count = employees.filter(e => e.department === d).length;
    return { name: d, count, pct: Math.round((count / employees.length) * 100) };
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
          <p className="text-sm text-gray-500 mt-0.5">Overview of your organization</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-md ${stat.color} flex items-center justify-center text-white shrink-0`}>
                <stat.icon size={17} />
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium">{stat.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity + Department */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <FaChartLine size={15} className="text-gray-400" />
            Recent Leave Activity
          </h3>
          <div className="flex flex-col gap-2">
            {recentActivities.length > 0 ? recentActivities.map((act, i) => (
              <div key={act.id || i} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm text-gray-700"><span className="font-medium">{act.name}</span> — {act.type}</p>
                  <p className="text-xs text-gray-500">{act.dept}</p>
                </div>
                <Badge variant={act.status === 'approved' ? 'success' : act.status === 'rejected' ? 'danger' : 'warning'}>
                  {act.status}
                </Badge>
              </div>
            )) : <p className="text-sm text-gray-500 text-center py-8">No recent activity</p>}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <FaChartBar size={15} className="text-gray-400" />
            Department Distribution
          </h3>
          <div className="flex flex-col gap-4">
            {deptData.map((dept, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                  <span className="text-xs text-gray-500">{dept.count} employees</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${dept.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pending Actions */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <FaExclamationCircle size={15} className="text-amber-500" />
          Pending Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div onClick={() => navigate('/admin/leave')} className="p-4 bg-amber-50 rounded-lg border border-amber-200 cursor-pointer hover:border-amber-300 transition-all">
            <p className="text-2xl font-semibold text-amber-600 mb-1">{employees.reduce((s, e) => s + (e.leaveRequests?.filter(r => r.status === 'pending').length || 0), 0)}</p>
            <p className="text-sm font-medium text-amber-800">Leave Requests</p>
            <p className="text-xs text-amber-600 mt-0.5">Awaiting approval</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:border-blue-300 transition-all">
            <p className="text-2xl font-semibold text-blue-600 mb-1">2</p>
            <p className="text-sm font-medium text-blue-800">Attendance Issues</p>
            <p className="text-xs text-blue-600 mt-0.5">Need review</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-all">
            <p className="text-2xl font-semibold text-gray-600 mb-1">1</p>
            <p className="text-sm font-medium text-gray-800">Onboarding Tasks</p>
            <p className="text-xs text-gray-500 mt-0.5">Incomplete</p>
          </div>
        </div>
      </Card>

      {/* Employee Overview Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Employee Overview</h3>
          <button onClick={() => navigate('/admin/employees')} className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
            View All <FaArrowRight size={10} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 5).map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white text-sm font-medium shrink-0">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{employee.department}</td>
                  <td className="py-3 px-4"><Badge variant="default" className="capitalize">{employee.role}</Badge></td>
                  <td className="py-3 px-4"><Badge variant="success">Active</Badge></td>
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
