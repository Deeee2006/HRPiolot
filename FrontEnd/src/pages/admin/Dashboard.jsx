import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { 
  FaUsers, FaCalendar, FaCheckSquare, FaDollarSign, 
  FaChartLine, FaExclamationCircle, FaChartBar, FaArrowRight 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { employees } = useEmployee();
  const navigate = useNavigate();

  // Pending leaves count calculated globally for reuse
  const pendingLeavesCount = employees.reduce((s, e) => s + (e.leaveRequests?.filter(r => r.status === 'pending').length || 0), 0);

  const stats = [
    { 
      title: 'Total Employees', 
      value: employees.length, 
      icon: FaUsers, 
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
      textColor: 'text-blue-700'
    },
    { 
      title: 'Present Today', 
      value: '18', 
      icon: FaCalendar, 
      bgColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      textColor: 'text-emerald-700'
    },
    { 
      title: 'Pending Leaves', 
      value: pendingLeavesCount, 
      icon: FaCheckSquare, 
      bgColor: 'bg-amber-50 text-amber-600 border-amber-100',
      textColor: 'text-amber-700'
    },
    { 
      title: 'Total Payroll', 
      value: `$${Math.round(employees.reduce((s, e) => s + e.salary, 0) / 1000)}K`, 
      icon: FaDollarSign, 
      bgColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      textColor: 'text-indigo-700'
    },
  ];

  const allLeaveReqs = employees.flatMap(e => e.leaveRequests?.map(r => ({ ...r, name: e.name, dept: e.department })) || []);
  const recentActivities = allLeaveReqs.slice(-4).reverse();

  const deptData = [...new Set(employees.map(e => e.department))].map(d => {
    const count = employees.filter(e => e.department === d).length;
    return { name: d, count, pct: Math.round((count / employees.length) * 100) };
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:p-8 bg-gray-50/40 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Admin Dashboard</h2>
          <p className="text-sm font-medium text-gray-500 mt-0.5">Real-time overview of your organizational performance</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 bg-white border border-gray-100 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] rounded-2xl transition-all hover:shadow-md hover:-translate-y-0.5 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{stat.title}</p>
                <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} border flex items-center justify-center shadow-inner shrink-0`}>
                <stat.icon size={18} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity + Department Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Leave Activity */}
        <Card className="p-6 sm:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-3 mb-6 border-b border-gray-50 pb-3">
            <span className="p-2 bg-gray-50 rounded-xl text-gray-400 border border-gray-100">
              <FaChartLine size={14} />
            </span>
            Recent Leave Activity
          </h3>
          <div className="flex flex-col gap-3">
            {recentActivities.length > 0 ? recentActivities.map((act, i) => (
              <div key={act.id || i} className="flex items-center justify-between p-4 bg-gray-50/60 hover:bg-gray-50 border border-gray-100/50 rounded-xl transition-colors">
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 font-semibold truncate">
                    {act.name} <span className="font-normal text-gray-400 mx-1.5">•</span> <span className="font-medium text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/40">{act.type}</span>
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">{act.dept}</p>
                </div>
                <Badge 
                  variant={act.status === 'approved' ? 'success' : act.status === 'rejected' ? 'danger' : 'warning'}
                  className="px-2.5 py-1 text-xs font-bold capitalize rounded-lg"
                >
                  {act.status}
                </Badge>
              </div>
            )) : (
              <div className="text-center py-10">
                <p className="text-sm font-medium text-gray-400">No recent leave history recorded</p>
              </div>
            )}
          </div>
        </Card>

        {/* Department Distribution */}
        <Card className="p-6 sm:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-3 mb-6 border-b border-gray-50 pb-3">
            <span className="p-2 bg-gray-50 rounded-xl text-gray-400 border border-gray-100">
              <FaChartBar size={14} />
            </span>
            Department Distribution
          </h3>
          <div className="flex flex-col gap-5">
            {deptData.map((dept, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{dept.name}</span>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{dept.count} members</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dept.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pending Actions Block */}
      <Card className="p-6 sm:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-3 mb-6">
          <span className="p-2 bg-amber-50 rounded-xl text-amber-500 border border-amber-100">
            <FaExclamationCircle size={14} />
          </span>
          Required Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div onClick={() => navigate('/admin/leave')} className="p-5 bg-amber-50/50 hover:bg-amber-50 border border-amber-100 cursor-pointer rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5">
            <p className="text-3xl font-extrabold text-amber-600 tracking-tight mb-1">{pendingLeavesCount}</p>
            <p className="text-sm font-bold text-amber-800">Leave Requests</p>
            <p className="text-xs font-medium text-amber-600/80 mt-0.5">Requires immediate manager approval</p>
          </div>
          <div className="p-5 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 cursor-pointer rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5">
            <p className="text-3xl font-extrabold text-blue-600 tracking-tight mb-1">2</p>
            <p className="text-sm font-bold text-blue-800">Attendance Anomalies</p>
            <p className="text-xs font-medium text-blue-600/80 mt-0.5">Missed check-outs or shift issues</p>
          </div>
          <div className="p-5 bg-gray-50/80 hover:bg-gray-50 border border-gray-200/60 cursor-pointer rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5">
            <p className="text-3xl font-extrabold text-gray-600 tracking-tight mb-1">1</p>
            <p className="text-sm font-bold text-gray-800">Onboarding Tasks</p>
            <p className="text-xs font-medium text-gray-400 mt-0.5">Profile setup pending file upload</p>
          </div>
        </div>
      </Card>

      {/* Employee Overview Table */}
      <Card className="p-6 sm:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
          <h3 className="text-base font-bold text-gray-900">Employee Directory Overview</h3>
          <button onClick={() => navigate('/admin/employees')} className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 bg-blue-50 border border-blue-100/50 px-3 py-1.5 rounded-xl">
            View Directory <FaArrowRight size={10} />
          </button>
        </div>
        <div className="overflow-x-auto -mx-6 sm:-mx-8">
          <div className="inline-block min-w-full align-middle px-6 sm:px-8">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3.5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Employee Profile</th>
                  <th className="text-left py-3.5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Department</th>
                  <th className="text-left py-3.5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Access Control</th>
                  <th className="text-left py-3.5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
                <tbody className="divide-y divide-gray-50">
                  {employees.slice(0, 5).map((employee) => (
                    <tr key={employee.id} className="group hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            {employee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{employee.name}</p>
                            <p className="text-xs font-semibold text-gray-400 mt-0.5">{employee.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-600 whitespace-nowrap">{employee.department}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge variant="default" className="capitalize bg-gray-100 text-gray-600 border border-gray-200/40 px-2.5 py-0.5 rounded-md font-semibold text-xs">
                          {employee.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge variant="success" className="px-2.5 py-0.5 rounded-md text-xs font-bold">
                          Active
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;