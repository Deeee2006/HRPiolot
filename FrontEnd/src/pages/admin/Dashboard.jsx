import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { FaUsers, FaCalendar, FaCheckSquare, FaDollarSign, FaChartLine, FaExclamationCircle, FaChartBar, FaArrowRight } from 'react-icons/fa';

const AdminDashboard = () => {
  const { employees } = useEmployee();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Employees', value: employees.length, icon: FaUsers, gradient: 'from-purple-500 to-purple-600', shadow: 'rgba(147,51,234,0.25)' },
    { title: 'Present Today', value: '18', icon: FaCalendar, gradient: 'from-emerald-400 to-emerald-600', shadow: 'rgba(16,185,129,0.25)' },
    { title: 'Pending Leaves', value: employees.reduce((s, e) => s + (e.leaveRequests?.filter(r => r.status === 'pending').length || 0), 0), icon: FaCheckSquare, gradient: 'from-amber-400 to-amber-600', shadow: 'rgba(245,158,11,0.25)' },
    { title: 'Total Payroll', value: `$${Math.round(employees.reduce((s, e) => s + e.salary, 0) / 1000)}K`, icon: FaDollarSign, gradient: 'from-blue-400 to-blue-600', shadow: 'rgba(59,130,246,0.25)' },
  ];

  const allLeaveReqs = employees.flatMap(e => e.leaveRequests?.map(r => ({ ...r, name: e.name, dept: e.department })) || []);
  const recentActivities = allLeaveReqs.slice(-4).reverse();

  const deptData = [...new Set(employees.map(e => e.department))].map(d => {
    const count = employees.filter(e => e.department === d).length;
    return { name: d, count, pct: Math.round((count / employees.length) * 100) };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-800">Admin Dashboard</h2>
          <p className="text-purple-500 text-sm">Overview of your organization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="h-full p-4 rounded-2xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
            <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient} flex items-center justify-center text-white shadow-[0_4px_12px_${stat.shadow}]`}>
              <stat.icon size={20} />
            </div>
            <p className="text-xl font-bold text-purple-800">{stat.value}</p>
            <p className="text-xs text-purple-500 font-medium">{stat.title}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
          <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
            <FaChartLine size={16} />
            Recent Leave Activity
          </h3>
          <div className="flex flex-col gap-2">
            {recentActivities.length > 0 ? recentActivities.map((act, i) => (
              <div key={act.id || i} className="flex items-center justify-between p-3 bg-purple-50/60 rounded-xl">
                <div>
                  <p className="text-sm text-purple-700"><span className="font-semibold">{act.name}</span> — {act.type}</p>
                  <p className="text-xs text-purple-400">{act.dept}</p>
                </div>
                <Badge variant={act.status === 'approved' ? 'success' : act.status === 'rejected' ? 'danger' : 'warning'}>
                  {act.status}
                </Badge>
              </div>
            )) : <p className="text-sm text-purple-400 text-center py-6">No recent activity</p>}
          </div>
        </Card>

        <Card className="p-4 rounded-2xl flex flex-col gap-4 h-full">
          <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
            <FaChartBar size={16} />
            Department Distribution
          </h3>
          <div className="flex flex-col gap-3">
            {deptData.map((dept, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-purple-700">{dept.name}</span>
                  <span className="text-xs text-purple-400">{dept.count} employees</span>
                </div>
                <div className="w-full bg-purple-100/60 rounded-full h-2">
                  <div className="bg-linear-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dept.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4 rounded-2xl flex flex-col gap-4">
        <h3 className="text-base font-bold text-purple-800 flex items-center gap-2">
          <FaExclamationCircle size={16} />
          Pending Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div onClick={() => navigate('/admin/leave')} className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/60 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
            <p className="text-2xl font-bold text-amber-600">{employees.reduce((s, e) => s + (e.leaveRequests?.filter(r => r.status === 'pending').length || 0), 0)}</p>
            <p className="text-sm text-amber-700 font-medium">Leave Requests</p>
            <p className="text-xs text-amber-500">Awaiting approval</p>
          </div>
          <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200/60 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
            <p className="text-2xl font-bold text-blue-600">2</p>
            <p className="text-sm text-blue-700 font-medium">Attendance Issues</p>
            <p className="text-xs text-blue-500">Need review</p>
          </div>
          <div className="p-4 bg-purple-50/80 rounded-xl border border-purple-200/60 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
            <p className="text-2xl font-bold text-purple-600">1</p>
            <p className="text-sm text-purple-700 font-medium">Onboarding Tasks</p>
            <p className="text-xs text-purple-500">Incomplete</p>
          </div>
        </div>
      </Card>

      <div className="bg-white rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-purple-800">Employee Overview</h3>
          <button onClick={() => navigate('/admin/employees')} className="text-xs font-semibold text-purple-500 hover:text-purple-700 transition-colors flex items-center gap-1">
            View All <FaArrowRight size={10} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-purple-100/60">
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Role</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-purple-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 5).map((employee) => (
                <tr key={employee.id} className="border-b border-purple-50/60 hover:bg-purple-50/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-800">{employee.name}</p>
                        <p className="text-xs text-purple-400">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-purple-500">{employee.department}</td>
                  <td className="py-3 px-4"><Badge variant="default" className="capitalize">{employee.role}</Badge></td>
                  <td className="py-3 px-4"><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
